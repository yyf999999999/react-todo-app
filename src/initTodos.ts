import { Todo } from "./types";
import { v4 as uuid } from "uuid"; // v4 を uuid という名前でインポート

export const initTodos: Todo[] = [
  {
    id: uuid(), // UUID v4 を生成してIDにセット
    name: "解析2の宿題",
    isDone: false,
    priority: 2,
    deadline: new Date(2024, 10, 2, 17, 30),
  },
  {
    id: uuid(),
    name: "TypeScriptの勉強 (復習)",
    isDone: true,
    priority: 3,
    deadline: null, // このTodoには期限を設定しない
  },
  {
    id: uuid(),
    name: "基礎物理学3の宿題",
    isDone: false,
    priority: 1,
    deadline: new Date(2024, 10, 11),
  },
];
