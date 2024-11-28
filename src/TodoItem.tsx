import React from "react";
import { Todo } from "./types";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";

type Props = {
  todo: Todo;
  updateIsDone: (id: string, value: boolean) => void;
  remove: (id: string) => void;
  edit: (id: string) => void;
};

const TodoItem = (props: Props) => {
  const todo = props.todo;
  const currentDate = dayjs();
  return (
    <div
      key={todo.id}
      className="flex items-center justify-between rounded-md border-2 p-2"
    >
      <div
        className={twMerge(
          "mr - 1.5",
          todo.isDone
            ? "text-blue-500"
            : currentDate > dayjs(todo.deadline)
              ? "text-red-500"
              : Math.abs(currentDate.diff(dayjs(todo.deadline), "hour")) <= 24
                ? "text-yellow-500"
                : ""
        )}
      >
        <div>
          <label className="flex cursor-pointer items-center space-x-2">
            <input
              type="checkbox"
              checked={todo.isDone}
              onChange={(e) => {
                props.updateIsDone(todo.id, e.target.checked);
              }}
            />
            <span>{todo.name}</span>
          </label>
        </div>
        <div
          className={twMerge(
            "ml-5 space-x-3 text-xs",
            todo.isDone
              ? ""
              : currentDate > dayjs(todo.deadline)
                ? ""
                : Math.abs(currentDate.diff(dayjs(todo.deadline), "hour")) <= 24
                  ? ""
                  : "text-gray-500"
          )}
        >
          {""}優先度:{" "}
          {"★".repeat(4 - todo.priority) + "　".repeat(todo.priority - 1)} 期日:{" "}
          {(todo.deadline
            ? dayjs(todo.deadline).format("YYYY-MM-DD HH:mm")
            : "期限なし") +
            " " +
            (!todo.isDone
              ? todo.deadline
                ? currentDate > dayjs(todo.deadline)
                  ? "期限切れ"
                  : "期日まであと" +
                    (Math.abs(currentDate.diff(dayjs(todo.deadline), "hour")) <=
                    24
                      ? Math.abs(
                          currentDate.diff(dayjs(todo.deadline), "hour")
                        ) + "時間"
                      : Math.abs(
                          currentDate.diff(dayjs(todo.deadline), "day")
                        ) + "日")
                : ""
              : todo.delay
                ? "遅れて提出済み"
                : "提出済み")}
        </div>
      </div>
      <div className="space-x-2">
        <button
          onClick={() => props.remove(todo.id)}
          className="rounded-md bg-red-500 px-2 py-1 text-sm font-bold text-white hover:bg-red-600"
        >
          削除
        </button>
        <button
          onClick={() => props.edit(todo.id)}
          className="rounded-md bg-green-500 px-2 py-1 text-sm font-bold text-white hover:bg-green-600"
        >
          編集
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
