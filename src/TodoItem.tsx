import React from "react";
import { Todo } from "./types";

type Props = {
  todo: Todo;
  updateIsDone: (id: string, value: boolean) => void;
  remove: (id: string) => void;
};

const TodoItem = (props: Props) => {
  const todo = props.todo;
  return (
    <div key={todo.id}>
      <input
        type="checkbox"
        checked={todo.isDone}
        onChange={(e) => props.updateIsDone(todo.id, e.target.checked)}
        className="mr-1.5 cursor-pointer"
      />
      {todo.name} 優先度: {todo.priority}
      <button
        onClick={() => props.remove(todo.id)}
        className="rounded-md bg-slate-200 px-2 py-1 text-sm font-bold text-white hover:bg-red-500"
      >
        削除
      </button>
    </div>
  );
};

export default TodoItem;
