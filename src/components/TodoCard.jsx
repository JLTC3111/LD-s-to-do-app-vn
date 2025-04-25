import { useState } from "react";

export function TodoCard(props) {
  const {
    todo,
    handleDeleteTodo,
    todoIndex,
    handleCompleteTodo,
    handleEditTodo,
  } = props;

  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.input);

  return (
    <div className="card todo-item">
  {isEditing ? (
    <input
      value={editedText}
      onChange={(e) => setEditedText(e.target.value)}
    />
  ) : (
    <p className={todo.complete ? "completed" : ""}>{todo.input}</p>
  )}

  <div className="todo-buttons">
    {isEditing ? (
      <>
        <button
          onClick={() => {
            if (!editedText.trim()) return;
            handleEditTodo(todoIndex, editedText);
            setIsEditing(false);
          }}
        >
          <h6>Lưu</h6>
        </button>
        <button onClick={() => setIsEditing(false)}>
          <h6>Huỷ</h6>
        </button>
      </>
    ) : (
      <>
        <button
          onClick={() => handleCompleteTodo(todoIndex)}
          disabled={todo.complete}
        >
          <h6>Xong</h6>
        </button>

        <button
          className="delete-button"
          onClick={() => handleDeleteTodo(todoIndex)}
        >
          <h6>Xoá</h6>
        </button>

        <button
          onClick={() => setIsEditing(true)}
          disabled={todo.complete} // 👈 disable edit if complete
          style={{ opacity: todo.complete ? 0.5 : 1 }}
        >
          <h6>Sửa</h6>
        </button>
      </>
    )}
  </div>
</div>
  );
}