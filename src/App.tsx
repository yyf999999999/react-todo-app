import { useState, useEffect } from "react";
import { Todo } from "./types";
import { initTodos } from "./initTodos";
import WelcomeMessage from "./WelcomeMessage";
import TodoList from "./TodoList";
import Modal from "./Modal";
import { v4 as uuid } from "uuid";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge"; // ◀◀ 追加
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // ◀◀ 追加
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons"; // ◀◀ 追加

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]); // ◀◀ 編集
  const [newId, setNewId] = useState(uuid());
  const [newTodoName, setNewTodoName] = useState("");
  const [newTodoPriority, setNewTodoPriority] = useState(3);
  const [newTodoDeadline, setNewTodoDeadline] = useState<Date | null>(null);
  const [newTodoNameError, setNewTodoNameError] = useState("");
  const [initialized, setInitialized] = useState(false); // ◀◀ 追加
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [type, setType] = useState("");
  const [todosType, setTodosType] = useState("all");
  const [isAscend, setIsAscend] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [sortType, setSortType] = useState("none");
  const [todosFilter, setTodosFilter] = useState<(todo: Todo) => boolean>(
    () => (todo: Todo) => true
  );
  const localStorageKey = "TodoApp"; // ◀◀ 追加

  useEffect(() => {
    const todoJsonStr = localStorage.getItem(localStorageKey);
    if (todoJsonStr && todoJsonStr !== "[]") {
      const storedTodos: Todo[] = JSON.parse(todoJsonStr);
      const convertedTodos = storedTodos.map((todo) => ({
        ...todo,
        deadline: todo.deadline ? new Date(todo.deadline) : null,
      }));
      setTodos(convertedTodos);
    } else {
      // LocalStorage にデータがない場合は initTodos をセットする
      setTodos([]);
    }
    setInitialized(true);
  }, []);

  // 状態 todos または initialized に変更があったときTodoデータを保存
  useEffect(() => {
    if (initialized) {
      localStorage.setItem(localStorageKey, JSON.stringify(todos));
    }
  }, [todos, initialized]);

  const uncompletedCount = todos.filter((todo: Todo) => !todo.isDone).length;

  // ▼▼ 追加
  const isValidTodoName = (name: string): string => {
    if (name.length < 2 || name.length > 32) {
      return "2文字以上、32文字以内で入力してください";
    } else {
      return "";
    }
  };

  const updateIsDone = (id: string, value: boolean) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        if (dayjs() > dayjs(todo.deadline)) {
          return { ...todo, isDone: value, delay: true };
        } else {
          return { ...todo, isDone: value };
        }
      } else {
        return todo;
      }
    });
    setTodos(updatedTodos);
  };

  const removeDisplayedTodos = () => {
    const updatedTodos = todos.filter((todo) => !todosFilter(todo));
    setTodos(updatedTodos);
  };

  const remove = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const edit = (id: string) => {
    setType("編集");
    const chosenTodo = todos.filter((todo) => todo.id === id)[0];
    setNewId(id);
    setNewTodoName(chosenTodo.name);
    setNewTodoPriority(chosenTodo.priority);
    setNewTodoDeadline(chosenTodo.deadline);
    setIsAddModalOpen(true);
  };

  const updateNewTodoName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoNameError(isValidTodoName(e.target.value)); // ◀◀ 追加
    setNewTodoName(e.target.value);
  };

  const updateNewTodoPriority = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoPriority(Number(e.target.value));
  };

  const updateDeadline = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dt = e.target.value; // UIで日時が未設定のときは空文字列 "" が dt に格納される
    console.log(`UI操作で日時が "${dt}" (${typeof dt}型) に変更されました。`);
    setNewTodoDeadline(dt === "" ? null : new Date(dt));
  };

  const changeTodosType = (
    type: string,
    condition: (todo: Todo) => boolean
  ) => {
    setTodosType(type);
    setTodosFilter(() => condition);
  };

  const addNewTodo = (id: string) => {
    // ▼▼ 編集
    const err = isValidTodoName(newTodoName);
    if (err !== "") {
      setNewTodoNameError(err);
      return;
    }
    const newTodo: Todo = {
      id: id,
      name: newTodoName,
      isDone: false,
      delay: false,
      priority: newTodoPriority,
      deadline: newTodoDeadline,
    };
    const updatedTodos = [...todos.filter((todo) => todo.id !== id), newTodo];
    setTodos(updatedTodos);
    /*setNewTodoName("");
    setNewTodoPriority(3);
    setNewTodoDeadline(null);*/
  };

  const openAddModal = () => {
    setType("追加");
    setNewId(uuid());
    setIsAddModalOpen(true);
  };
  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setNewTodoName("");
    setNewTodoPriority(3);
    setNewTodoDeadline(null);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="mx-4 mt-10 max-w-2xl md:mx-auto">
      <h1 className="mb-4 text-2xl font-bold">TodoApp</h1>
      <div className="mb-4">
        <WelcomeMessage
          name="寝屋川タヌキ"
          uncompletedCount={uncompletedCount}
        />
      </div>
      <div className="mb-2 flex items-center gap-x-4">
        <div className="text-xl font-bold">ソート</div>
        <div className="flex gap-x-2">
          <label className="flex cursor-pointer items-center space-x-1">
            <input
              type="radio"
              checked={isAscend}
              onChange={(e) => {
                if (e.target.checked) {
                  setIsAscend(true);
                }
              }}
            />
            <span>昇順</span>
          </label>
          <label className="flex cursor-pointer items-center space-x-1">
            <input
              type="radio"
              checked={!isAscend}
              onChange={(e) => {
                if (e.target.checked) {
                  setIsAscend(false);
                }
              }}
            />
            <span>降順</span>
          </label>
        </div>
        <div className="relative">
          <button
            className="w-28 border border-gray-300 bg-white px-2 py-1 text-left text-sm"
            onClick={() => {
              setDropDown(!dropDown);
            }}
          >
            {sortType === "none"
              ? "追加順でソート"
              : sortType === "deadline"
                ? "期日でソート"
                : "優先度でソート"}
          </button>

          {dropDown && (
            <div className="absolute top-full w-28 border border-gray-300 bg-white text-sm shadow-lg">
              <ul>
                <li
                  className="p-2 hover:bg-gray-100"
                  onClick={() => {
                    setSortType("none");
                    setDropDown(false);
                  }}
                >
                  <a>追加順でソート</a>
                </li>
                <li
                  className="p-2 hover:bg-gray-100"
                  onClick={() => {
                    setSortType("deadline");
                    setDropDown(false);
                  }}
                >
                  <a>期日でソート</a>
                </li>
                <li
                  className="p-2 hover:bg-gray-100"
                  onClick={() => {
                    setSortType("priority");
                    setDropDown(false);
                  }}
                >
                  <a>優先度でソート</a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="mb-2 flex items-center justify-between">
        <button
          type="button"
          onClick={() => changeTodosType("all", (todo) => true)}
          className={twMerge(
            "flex-1 border-b-2 border-r-2 p-2 text-center text-xl text-gray-300 font-bold",
            todosType === "all" && "text-black border-black"
          )}
        >
          全て
        </button>
        <button
          type="button"
          onClick={() => changeTodosType("working", (todo) => !todo.isDone)}
          className={twMerge(
            "flex-1 border-x-2 border-b-2 p-2 text-center text-xl text-gray-300 font-bold",
            todosType === "working" && "text-black border-black"
          )}
        >
          取り組み中のみ
        </button>
        <button
          type="button"
          onClick={() => changeTodosType("submitted", (todo) => todo.isDone)}
          className={twMerge(
            "flex-1 border-b-2 border-l-2 p-2 text-center text-xl text-gray-300 font-bold",
            todosType === "submitted" && "text-black border-black"
          )}
        >
          提出済みのみ
        </button>
      </div>
      <TodoList
        todos={todos}
        updateIsDone={updateIsDone}
        remove={remove}
        edit={edit}
        condition={todosFilter}
        isAscend={isAscend}
        sortType={sortType}
      />

      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => {
            if (todos.filter(todosFilter).length) {
              openDeleteModal();
            }
          }}
          className={twMerge(
            "mt-5 rounded-md bg-red-500 px-3 py-1 font-bold text-white hover:bg-red-600",
            !todos.filter(todosFilter).length &&
              "bg-slate-200 hover:bg-slate-200"
          )}
        >
          表示されている全タスクの削除
        </button>
        <button
          type="button"
          onClick={openAddModal}
          className={twMerge(
            "mt-5 rounded-md bg-indigo-500 px-3 py-1 font-bold text-white hover:bg-indigo-600",
            newTodoNameError && "cursor-not-allowed opacity-50"
          )}
        >
          新しいタスクの追加
        </button>
      </div>

      <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal} type="null">
        <div className="mt-5 space-y-2 rounded-md border p-3 md:mx-auto">
          <h2 className="text-lg font-bold">表示されている全タスクの削除</h2>
          <div>現在のタブに表示されているタスクがすべて消えます。</div>
          <div className="text-xs text-red-500">
            ※一度実行すると元には戻せません
          </div>
          <div className="flex items-center justify-between gap-x-2">
            <button
              type="button"
              onClick={closeDeleteModal}
              className="mt-5 rounded-md bg-indigo-500 px-3 py-1 font-bold text-white hover:bg-indigo-600"
            >
              キャンセル
            </button>
            <button
              type="button"
              onClick={() => {
                closeDeleteModal();
                removeDisplayedTodos();
              }}
              className="mt-5 rounded-md bg-red-500 px-3 py-1 font-bold text-white hover:bg-red-600"
            >
              削除
            </button>
          </div>
        </div>
      </Modal>
      <Modal isOpen={isAddModalOpen} onClose={closeAddModal} type={type}>
        <div className="mt-5 space-y-2 rounded-md border p-3 md:mx-auto">
          <h2 className="text-lg font-bold">
            {type === "追加" ? "新しいタスクの追加" : "タスクの編集"}
          </h2>
          {/* 編集: ここから... */}
          <div>
            <div className="flex items-center space-x-2">
              <label className="font-bold" htmlFor="newTodoName">
                名前
              </label>
              <input
                id="newTodoName"
                type="text"
                value={newTodoName}
                onChange={updateNewTodoName}
                className={twMerge(
                  "grow rounded-md border p-2",
                  newTodoNameError && "border-red-500 outline-red-500"
                )}
                placeholder="2文字以上、32文字以内で入力してください"
              />
            </div>
            {newTodoNameError && (
              <div className="ml-10 flex items-center space-x-1 text-sm font-bold text-red-500 ">
                <FontAwesomeIcon
                  icon={faTriangleExclamation}
                  className="mr-0.5"
                />
                <div>{newTodoNameError}</div>
              </div>
            )}
          </div>
          {/* ...ここまで */}

          <div className="flex gap-5">
            <div className="font-bold">優先度</div>
            {[1, 2, 3].map((value) => (
              <label key={value} className="flex items-center space-x-1">
                <input
                  id={`priority-${value}`}
                  name="priorityGroup"
                  type="radio"
                  value={value}
                  checked={newTodoPriority === value}
                  onChange={updateNewTodoPriority}
                />
                <span>{value}</span>
              </label>
            ))}
          </div>

          <div className="flex items-center gap-x-2">
            <label htmlFor="deadline" className="font-bold">
              期限
            </label>
            <input
              type="datetime-local"
              id="deadline"
              value={
                newTodoDeadline
                  ? dayjs(newTodoDeadline).format("YYYY-MM-DDTHH:mm:ss")
                  : ""
              }
              onChange={updateDeadline}
              className="rounded-md border border-gray-400 px-2 py-0.5"
            />
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={closeAddModal}
              className={twMerge(
                "mt-5 rounded-md bg-red-500 px-3 py-1 font-bold text-white hover:bg-red-600",
                newTodoNameError && "cursor-not-allowed opacity-50"
              )}
            >
              キャンセル
            </button>
            <button
              type="button"
              onClick={() => {
                addNewTodo(newId);
                closeAddModal();
              }}
              className={twMerge(
                "mt-5 rounded-md bg-indigo-500 px-3 py-1 font-bold text-white hover:bg-indigo-600",
                newTodoNameError && "cursor-not-allowed opacity-50"
              )}
            >
              {type}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default App;
