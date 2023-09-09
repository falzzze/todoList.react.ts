import { useState, ChangeEvent } from "react";

import styles from "./TodoPanel.module.css";
import { Button } from "../Button/Button";

const DEFAULT_TODO = {
  name: "",
  description: "",
};

interface AddTodoPanelProps {
  mode: "add";
  addTodo: ({ name, description }: Omit<Todo, "checked" | "id">) => void;
}

interface EditTodoPanelProps {
  mode: "edit";
  editTodo: Omit<Todo, "id" | "checked">;
  changeTodo: ({ name, description }: Omit<Todo, "checked" | "id">) => void;
}

type TodoPanelProps = AddTodoPanelProps | EditTodoPanelProps;

export const TodoPanel: React.FC<TodoPanelProps> = (props) => {
  const isEdit = props.mode === "edit";
  const [todo, setTodo] = useState(isEdit ? props.editTodo : DEFAULT_TODO);

  const onChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTodo({ ...todo, [name]: value });
  };

  const onClick = () => {
    const todoItem = { name: todo.name, description: todo.description };
    if (isEdit) return props.changeTodo(todoItem);
    props.addTodo(todoItem);
    setTodo(DEFAULT_TODO);
  };

  return (
    <div className={styles.todo_panel_container}>
      <div className={styles.fields_container}>
        <div className={styles.field_container}>
          <label htmlFor="name">
            <div>Наименование</div>
            <input
              type="text"
              id="name"
              name="name"
              value={todo.name}
              onChange={onChangeValue}
            />
          </label>
        </div>
        <div className={styles.field_container}>
          <label htmlFor="description">
            <div>Описание</div>
            <input
              type="text"
              id="name"
              name="description"
              value={todo.description}
              onChange={onChangeValue}
            />
          </label>
        </div>
      </div>
      <div className={styles.button_container}>
        {!isEdit && (
          <Button color="blue" onClick={onClick}>
            Добавить задачу
          </Button>
        )}
        {isEdit && (
          <Button color="orange" onClick={onClick}>
            Редактировать задачу
          </Button>
        )}
      </div>
    </div>
  );
};
