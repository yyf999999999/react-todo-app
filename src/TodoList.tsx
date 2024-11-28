import React from "react";
import { Todo } from "./types";
import TodoItem from "./TodoItem.tsx";

type Props = {
  todos: Todo[];
  updateIsDone: (id: string, value: boolean) => void;
  remove: (id: string) => void; // ◀◀ 追加
  edit: (id: string) => void;
  condition: (todo: Todo) => boolean;
  isAscend: boolean;
  sortType: string;
};

const TodoList = (props: Props) => {
  //const todos = [...props.todos].sort((a, b) => a.priority - b.priority);
  const filteredTodos = props.todos.filter(props.condition);
  let sortedTodos = filteredTodos;
  if (props.sortType !== "none") {
    if (props.sortType === "deadline") {
      sortedTodos = [...filteredTodos].sort((a, b) => {
        if (a.deadline === null && b.deadline === null) return 0;
        if (a.deadline === null) return 1;
        if (b.deadline === null) return -1;
        return a.deadline.getTime() - b.deadline.getTime();
      });
    } else {
      sortedTodos = [...filteredTodos].sort((a, b) => a.priority - b.priority);
    }
  }
  let todos = sortedTodos;
  if (props.isAscend) {
    todos = sortedTodos.reverse();
  }

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
          edit={props.edit}
          updateIsDone={props.updateIsDone}
        />
      ))}
    </div>
  );
};

export default TodoList;
