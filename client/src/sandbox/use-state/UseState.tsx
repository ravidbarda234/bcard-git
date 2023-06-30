import { useState } from "react";

const UseState = () => {
  let [counter, setCounter] = useState(1);

  // const state = {
  //   counter: 0,
  //   setCounter() {
  //     return (this.counter = this.counter + 1);
  //   },
  // };

  return (
    <div style={{ padding: 16, backgroundColor: "#999" }}>
      <p>{counter}</p>
      <p>hallo</p>
      {/* <button
        style={{ padding: 2, margin: 1 }}
        onClick={() => setCounter((counter = counter + 1))}>
        +
      </button> */}

      {/* <button
        style={{ padding: 2, margin: 1 }}
        onClick={() => {
          counter = counter + 1;
          console.log(counter);
        }}>
        +
      </button> */}

      <button
        style={{ padding: 2, margin: 1 }}
        onClick={() => setCounter(prev => prev + 1)}>
        +
      </button>

      <button
        style={{ padding: 2, margin: 1 }}
        onClick={() => setCounter(prev => prev - 1)}>
        -
      </button>

      <button
        style={{ padding: 2, margin: 1 }}
        onClick={() => setCounter(prev => prev * 2)}>
        multiple
      </button>

      <button style={{ padding: 2, margin: 1 }} onClick={() => setCounter(0)}>
        reset
      </button>
    </div>
  );
};

export default UseState;
