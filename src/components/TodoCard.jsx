import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

export function TodoCard(props) {
  const { todo, todoId, handleDeleteTodo, handleCompleteTodo, handleEditTodo } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.input);

  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(cardRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" });
  }, []);

  function saveEdit() {
    if (!editedText.trim()) return;
    handleEditTodo(todoId, editedText);
    setIsEditing(false);
  }

  function cancelEdit() {
    setEditedText(todo.input);
    setIsEditing(false);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') saveEdit();
    if (e.key === 'Escape') cancelEdit();
  }

  function handleDelete() {
    gsap.to(cardRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => handleDeleteTodo(todoId),
    });
  }

  function handleComplete() {
    gsap.to(cardRef.current, {
      duration: 0.5,
      ease: "power1.out"
    });
    handleCompleteTodo(todoId);
  }

  function handleEdit() {
    gsap.to(cardRef.current, {
      duration: 0.5,
      ease: "power1.out"
    });
    handleEditTodo(todoId);
  }

  const handleButtonHover = (e) => {
    gsap.to(e.currentTarget, { scale: 1.3, duration: 0.2 });
  };

  const handleButtonLeave = (e) => {
    gsap.to(e.currentTarget, { scale: 1, duration: 0.2 });
  };

  return (
    <div className={`card todo-item ${todo.complete ? 'completed-task' : ''}`}>
      {isEditing ? (
        <input
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={saveEdit}
          autoFocus
        />
      ) : (
        <p style={{ textDecoration: todo.complete ? "line-through" : "none" }}>
          {todo.input}
        </p>
      )}

      <div className="todo-buttons">
        {isEditing ? (
          <>
            <button onClick={saveEdit} onMouseEnter={handleButtonHover} onMouseLeave={handleButtonLeave}>
              <h6>Lưu</h6>
            </button>

            <button onClick={cancelEdit} onMouseEnter={handleButtonHover} onMouseLeave={handleButtonLeave}>
              <h6>Huỷ</h6>
            </button>
          </>
        ) : (
          <>
          
            
            <button onClick={() => handleComplete(todoId)} disabled={todo.complete} onMouseEnter={handleButtonHover} onMouseLeave={handleButtonLeave} >
            <h6>Xong</h6></button>
              
            <button className="delete-button" onClick={() => handleDelete(todoId)} onMouseEnter={handleButtonHover} onMouseLeave={handleButtonLeave}>
            <h6>Xoá</h6>
            </button>

            <button onClick={() => setIsEditing(true)} disabled={todo.complete} onMouseEnter={handleButtonHover} onMouseLeave={handleButtonLeave}>
              <h6>Sửa</h6>
            </button>
             
              
          </>
        )}
      </div>
    </div>
  );
}