import React, { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrash, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "./App.scss";

function App() {
  let [inputValue, setValue] = useState("");
  let [tasks, setTask] = useState([
    {
      id: 50,
      label: "Clean fish tanks",
      done: true
    },
    {
      id: 1,
      label: "Wash hands",
      done: false
    },
    {
      id: 2,
      label: "Re-wash hands...eww",
      done: false
    }
  ]);

  const removeTask = taskId => {
    const currentTasks = [...tasks];
    const targetIdx = currentTasks.findIndex(task => task.id === taskId);
    currentTasks.splice(targetIdx, 1);
    return setTask(currentTasks);
  };

  const changeStatus = taskId => {
    const currentTasks = [...tasks];
    const targetIdx = currentTasks.findIndex(task => task.id === taskId);
    currentTasks.splice(targetIdx, 1, {
      ...currentTasks[targetIdx],
      done: !currentTasks[targetIdx].done
    });
    return setTask(currentTasks);
  };

  /* ########### */
  const addTask = () => {
    if (inputValue.length > 0) {
      let newTask = {
        id: Date.now(),
        label: inputValue,
        done: false
      };

      setTask([...tasks, newTask]);
      return setValue("");
    }
  };

  /* ########### */
  const handleKeyUp = event => {
    if (event.key === "Enter") {
      console.log("ENTER");
      addTask();
    }
  };

  /* ########### */
  const onCh = e => {
    console.log(e.target.value);
    setValue(e.target.value);
  };

  return (
    <>
      <div id="todoList">
        {/* DUMP ALL TASKS IN LIST */}
        <ul>
          {tasks.length > 0 ? (
            tasks.map((task, i) => (
              <li key={"k" + i} className={task.done ? "done" : ""}>
                {/* CHECKBOX */}
                <FontAwesomeIcon
                  icon={faCheck}
                  className={task.done ? "checkBox done" : "checkBox"}
                  onClick={() => changeStatus(task.id)}
                />

                {/* DELETE icon */}
                <FontAwesomeIcon icon={faTrash} className="fa fa-trash" onClick={() => removeTask(task.id)} />

                {/* CONTENT */}
                <span>
                  {task.label} <span className="tiny">(ID: {task.id}) </span>
                </span>
              </li>
            ))
          ) : (
            <li>
              No tasks!{" "}
              <span role="img" aria-label="smilemoji">
                😃
              </span>
            </li>
          )}
        </ul>
      </div>

      <div id="newTask">
        <input onChange={onCh} type="text" placeholder="inputValue" value={inputValue} onKeyUp={handleKeyUp} />

        <button onClick={addTask}>
          <span>+</span>
        </button>
      </div>
    </>
  );
}

export default App;
