import React from "react";
import { Todo } from "./types";
import TodoItem from "./TodoItem.tsx";

type Props = {
  todos: Todo[];
  updateIsDone: (id: string, value: boolean) => void;
  remove: (id: string) => void; // ◀◀ 追加
};

const TodoList = (props: Props) => {
  //const todos = [...props.todos].sort((a, b) => a.priority - b.priority);
  const todos = props.todos;

  if (todos.length === 0) {
    return (
      <div className="text-red-500">
        現在、登録されているタスクはありません。
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          remove={props.remove}
          updateIsDone={props.updateIsDone}
        />
      ))}
    </div>
  );
};

export default TodoList;
