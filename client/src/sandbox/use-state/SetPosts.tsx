import { useState, MouseEvent } from "react";

interface Post {
  title: string;
  subtitle: string;
  author: string;
  createdAt: string;
}

const SetPosts = () => {
  const INITIAL_POST: Post = {
    title: "",
    subtitle: "",
    author: "",
    createdAt: "",
  };

  const [isLogged, setLog] = useState(false);
  const [post, setPost] = useState(INITIAL_POST);
  const [posts, setPosts] = useState<[] | Post[]>([]);

  type Event = MouseEvent<HTMLButtonElement>;

  const createNewPost = (e: Event) => {
    e.preventDefault();
    setPosts(prev => [
      ...prev,
      { ...post, createdAt: new Date().toLocaleString() },
    ]);
    return setPost(INITIAL_POST);
  };

  return (
    <div>
      <button onClick={() => setLog(prev => !prev)}>
        {isLogged ? "logout" : "login"}
      </button>

      {isLogged && (
        <form>
          <h5>
            Post title: {post.title} {post.subtitle} {post.author}
          </h5>
          <input
            type="text"
            placeholder="Enter title"
            onChange={e =>
              setPost(prev => ({ ...prev, title: e.target.value }))
            }
            value={post.title}
          />
          <br />
          <input
            type="text"
            placeholder="Enter subtitle"
            onChange={e =>
              setPost(prev => ({ ...prev, subtitle: e.target.value }))
            }
            value={post.subtitle}
          />
          <br />
          <input
            type="text"
            placeholder="Enter auther"
            onChange={e =>
              setPost(prev => ({ ...prev, author: e.target.value }))
            }
            value={post.author}
          />
          <br />
          <button
            onClick={createNewPost}
            disabled={!post.title || !post.subtitle || !post.author}>
            Create
          </button>
        </form>
      )}
      <br />
      {isLogged && !!posts.length && (
        <table border={1}>
          <thead>
            <tr>
              <th>no.</th>
              <th>title</th>
              <th>subtitle</th>
              <th>author</th>
              <th>created at</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{post.title}</td>
                <td>{post.subtitle}</td>
                <td>{post.author}</td>
                <td>{post.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SetPosts;
