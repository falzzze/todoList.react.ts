import React from "react";
import { TodoContext } from "./TodoContext";

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

interface TodoProviderProps {
  children: React.ReactNode;
}

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [todos, setTodos] = React.useState(DEFAULT_TODO_LIST);
  const [todoIdForEdit, setTodoIdForEdit] = React.useState<Todo["id"] | null>(
    null
  );

  const selectTodoIdForEdit = (id: Todo["id"]) => {
    setTodoIdForEdit(id);
  };

  const addTodo = ({ name, description }: Omit<Todo, "checked" | "id">) => {
    if (name) {
      setTodos([
        ...todos,
        {
          id: todos[todos.length - 1].id + 1,
          description,
          name,
          checked: false,
        },
      ]);
    }
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
    if (name) {
      setTodos(
        todos.map((todo) => {
          if (todo.id === todoIdForEdit) {
            return { ...todo, name, description };
          }
          return todo;
        })
      );
    }
    setTodoIdForEdit(null);
  };

  const value = React.useMemo(
    () => ({
      todos,
      deleteTodo,
      changeTodo,
      checkTodo,
      selectTodoIdForEdit,
      addTodo,
      todoIdForEdit,
    }),
    [
      todos,
      deleteTodo,
      changeTodo,
      checkTodo,
      selectTodoIdForEdit,
      addTodo,
      todoIdForEdit,
    ]
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
