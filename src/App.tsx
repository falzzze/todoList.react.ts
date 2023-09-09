import { useState } from "react";
import { Header } from "./components/Header/Header";
import styles from "./App.module.css";
import { TodoPanel } from "./components/TodoPanel/TodoPanel";
import { TodoList } from "./components/TodoList/TodoList";

const DEFAULT_TODO_LIST = [
  { id: 1, name: "Покушать", description: "еду", checked: false },
  { id: 2, name: "Поспать", description: "в кроватке", checked: false },
  {
    id: 3,
    name: "Проснуться",
    description: "работать",
    checked: true,
  },
];

export const App = () => {
  const [todos, setTodos] = useState(DEFAULT_TODO_LIST);
  const [todoIdForEdit, setTodoIdForEdit] = useState<Todo["id"] | null>(null);

  const selectTodoIdForEdit = (id: Todo["id"]) => {
    setTodoIdForEdit(id);
  };

  const addTodo = ({ name, description }: Omit<Todo, "checked" | "id">) => {
    setTodos([
      ...todos,
      { id: todos[todos.length - 1].id + 1, description, name, checked: false },
    ]);
  };

  const checkTodo = (id: Todo["id"]) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, checked: !todo.checked };
        }
        return todo;
      })
    );
  };

  const deleteTodo = (id: Todo["id"]) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const changeTodo = ({ name, description }: Omit<Todo, "checked" | "id">) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === todoIdForEdit) {
          return { ...todo, name, description };
        }
        return todo;
      })
    );
    setTodoIdForEdit(null);
  };

  return (
    <div className={styles.app_container}>
      <div className={styles.container}>
        <Header todoCount={todos.length} />
        <TodoPanel mode="add" addTodo={addTodo} />
        <TodoList
          todos={todos}
          todoIdForEdit={todoIdForEdit}
          checkTodo={checkTodo}
          deleteTodo={deleteTodo}
          selectTodoIdForEdit={selectTodoIdForEdit}
          changeTodo={changeTodo}
        />
      </div>
    </div>
  );
};
