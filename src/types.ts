export type Todo = {
  id: string;
  name: string;
  isDone: boolean;
  delay: boolean;
  priority: number;
  deadline: Date | null; // 注意
};
