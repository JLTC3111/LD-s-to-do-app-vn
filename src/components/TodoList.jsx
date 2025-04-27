import { useEffect, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { TodoCard } from "./TodoCard";
import gsap from "gsap";

export function TodoList(props) {
  const {
    todos,
    selectedTab,
    setTodos,
    handleEditTodo,
    handleDeleteTodo,
    handleCompleteTodo,
  } = props;

  const listRef = useRef(null);

  // 👇 Filter logic
  const filteredTodos =
    selectedTab === 'Tất Cả'
      ? todos
      : selectedTab === 'Đã Làm'
      ? todos.filter((val) => val.complete)
      : todos.filter((val) => !val.complete);


  const onDragEnd = (result) => {
    if (!result.destination) return;

    const newTodos = [...todos];
    const [movedItem] = newTodos.splice(result.source.index, 1);
    newTodos.splice(result.destination.index, 0, movedItem);

    setTodos(newTodos);
    localStorage.setItem('todo-app', JSON.stringify({ todos: newTodos }));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="todo-list">
        {(provided) => (
          <div
            className="todo-List"
            {...provided.droppableProps}
            ref={(node) => {
              listRef.current = node;
              provided.innerRef(node);
            }}
          >
            {filteredTodos.map((todo, index) => (
              <Draggable key={todo.id} draggableId={String(todo.id)} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TodoCard
                      todo={todo}
                      todoId={todo.id} // ✅ Pass the ID
                      handleEditTodo={handleEditTodo}
                      handleDeleteTodo={handleDeleteTodo}
                      handleCompleteTodo={handleCompleteTodo}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}