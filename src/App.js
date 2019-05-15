import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./App.scss";
import axios from "axios";

function App() {
  let [inputValue, setValue] = useState(``); // new item data
  let [todos, setTodos] = useState({ hits: [] }); // the current list
  let [dataType, setDataType] = useState(`todos`); // fetch endpoint, todo or post
  let [isLoading, setIsLoading] = useState(false); // show "loading" during fetch

  /* ## fetch handler ## */
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const URL = `https://jsonplaceholder.typicode.com/${dataType}`;
      const result = await axios(URL);

      setTodos(result.data.slice(0, 10)); // grab first 10 for now
    }
    fetchData();
    setIsLoading(false);
  }, [dataType]); //! in a fetch, 2nd param must be '[optional]' to avoid fetching every update

  /* ########### */
  const removeTodo = todoId => {
    const currentTodos = [...todos];
    const targetIdx = currentTodos.findIndex(todo => todo.id === todoId);
    currentTodos.splice(targetIdx, 1);
    return setTodos(currentTodos);
  };

  /* ########### */
  const changeStatus = todoId => {
    const currentTodos = [...todos];
    const targetIdx = currentTodos.findIndex(todo => todo.id === todoId);
    currentTodos.splice(targetIdx, 1, {
      ...currentTodos[targetIdx],
      completed: !currentTodos[targetIdx].completed
    });
    return setTodos(currentTodos);
  };

  /* ########### */
  const addTodo = () => {
    if (inputValue.length > 0) {
      let newTodo = {
        id: Date.now(),
        title: inputValue,
        completed: false
      };

      setTodos([...todos, newTodo]);
      return setValue("");
    }
  };

  /* ########### */
  const handleKeyUp = event => {
    if (event.key === "Enter") {
      console.log("ENTER");
      addTodo();
    }
  };

  /* ########### */
  const onCh = e => {
    console.log(e.target.value);
    setValue(e.target.value);
  };

  const onChangeDataType = () => {
    setDataType(dataType === "posts" ? "todos" : "posts");
  };

  return (
    <>
      <div id="todoList">
        {isLoading ? (
          <div>Loading ...</div>
        ) : (
          <ul>
            {/* DUMP ALL ToDos IN LIST */}
            {todos.length > 0 ? (
              todos.map((todo, i) => (
                <li key={"k" + i} className={todo.completed ? "done" : ""}>
                  {/* CHECKBOX */}
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={todo.completed ? "checkBox done" : "checkBox"}
                    onClick={() => changeStatus(todo.id)}
                  />

                  {/* DELETE icon */}
                  <FontAwesomeIcon icon={faTrash} className="fa fa-trash" onClick={() => removeTodo(todo.id)} />

                  {/* CONTENT */}
                  <span>
                    {todo.title} <span className="tiny">(ID: {todo.id}) </span>
                  </span>
                </li>
              ))
            ) : (
              <li>
                No todos!{" "}
                <span role="img" aria-label="smilemoji">
                  😃
                </span>
              </li>
            )}
          </ul>
        )}
      </div>

      <div id="newTodo">
        <input onChange={onCh} type="text" placeholder="inputValue" value={inputValue} onKeyUp={handleKeyUp} />

        <button onClick={addTodo}>
          <span>+</span>
        </button>
        <button type="button" onClick={onChangeDataType}>
          {dataType}
        </button>
      </div>
    </>
  );
}

export default App;
