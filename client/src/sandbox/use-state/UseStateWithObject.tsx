import { useState } from "react";

const UseStateWithObject = () => {
  const INITIAL_NAME = {
    first: "",
    last: "",
  };

  const [name, setName] = useState(INITIAL_NAME);

  return (
    <form style={{ padding: 16 }}>
      <h5>
        Your name is: {name.first} {name.last}
      </h5>

      <input
        type="text"
        placeholder="Enter first name"
        onChange={event =>
          setName(prev => ({ ...prev, first: event.target.value }))
        }
      />
      <br />
      <input
        type="text"
        placeholder="Enter last name"
        onChange={e => setName(prev => ({ ...prev, last: e.target.value }))}
      />
    </form>
  );
};

export default UseStateWithObject;
