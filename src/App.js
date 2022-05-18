import "./App.css";
import { v4 as uuidv4 } from "uuid";
import React, { useEffect, useRef, useState } from "react";

function App() {
  const firstRender = useRef(true);
  const [inputValue, setInputValue] = useState("");
  const [todos, setToDos] = useState([]);

  const addToDo = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;
    setToDos([
      ...todos,
      {
        text: inputValue,
        id: uuidv4(),
      },
    ]);
    setInputValue("");
  };

  const removeToDo = (id) => {
    setToDos(todos.filter((todo) => todo.id !== id));
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      localStorage.setItem("Todo", JSON.stringify([...todos]));
    }
  }, [todos]);

  useEffect(() => {
    if (localStorage.getItem("Todo") !== null) {
      const newTodos = localStorage.getItem("Todo");
      setToDos(JSON.parse([...todos, newTodos]));
    }
  }, []);

  return (
    <div className="App">
      <div className="container">
        <form onSubmit={addToDo}>
          <input
            text="text"
            placeholder="Add a task..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>
        {todos.map((todo) => (
          <div className="todo" key={todo.id}>
            <p>{todo.text}</p>
            <i
              className="far fa-trash-alt"
              onClick={() => removeToDo(todo.id)}
            ></i>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
