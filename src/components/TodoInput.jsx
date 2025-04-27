import { useState } from "react";

export function TodoInput(props) {
  const { selectedTab, setSelectedTab, handleAddTodo } = props;
  const [inputValue, setInputValue] = useState("");

  function submitInput() {
    if (!inputValue.trim()) return;
    
    if (selectedTab === 'Đã Làm' || selectedTab === 'Tất Cả') {
      setSelectedTab('Chưa Làm');
      setTimeout(() => { 
        handleAddTodo(inputValue.trim());
      }, 50);
    } else {
      handleAddTodo(inputValue.trim());
    }
  
    setInputValue(""); // ✅ Clear after adding
  }

  return (
    <div className="input-container">
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Thêm"
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            submitInput();
          }
        }}
      />
      <button onClick={submitInput}>
        <i className="fa-solid fa-plus"></i>
      </button>
    </div>
  );
}