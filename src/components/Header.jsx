export function Header({ todos }) {
    const incompleteTodos = todos.filter(todo => !todo.complete).length;
    const taskOrTasks = incompleteTodos !== 1 ? 'Tasks' : 'Task';

    return (
        <header>
            <h1 className="text-gradient">
                Có <span className="font-bold text-4xl text-red-500">{incompleteTodos} Việc Chưa Làm </span> 
            </h1>
        </header>
    );
}
