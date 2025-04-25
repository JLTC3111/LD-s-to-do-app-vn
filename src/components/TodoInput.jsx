import { useState } from "react";

export function TodoInput(props) {
  const { handleAddTodo } = props;
  const [inputValue, setInputValue] = useState("");

  function submitTask() {
    if (!inputValue.trim()) return;
    handleAddTodo(inputValue);
    setInputValue("");
  }

  return (
    <div className="input-container">
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add Task"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            submitTask();
          }
        }}
      />
      <button onClick={submitTask}>
        <i className="fa-solid fa-plus"></i>
      </button>
    </div>
  );
}