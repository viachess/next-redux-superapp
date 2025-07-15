"use client";

import { FC, FormEvent, memo, useCallback, useRef, useState } from "react";
import { TodoListElement } from "./todo-list-element";
import { nanoid } from "nanoid";
import { TodoListErrorEnum } from "./types";
import {
  addTodo,
  deleteTodo,
  selectAllTodos,
  updateTodo,
  useAppDispatch,
  useAppSelector,
} from "@/app/store";

export const TodoList: FC = memo(() => {
  const todos = useAppSelector(selectAllTodos);
  const dispatch = useAppDispatch();

  const [error, setError] = useState<TodoListErrorEnum | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current?.value) {
      dispatch(addTodo({ id: nanoid(), title: inputRef.current.value }));
      setError(null);
      inputRef.current.value = "";
    } else {
      setError(TodoListErrorEnum.EMPTY_INPUT_ERROR);
    }
  };

  const handleDelete = useCallback(
    (id: string) => dispatch(deleteTodo({ id })),
    [dispatch]
  );

  const handleEdit = useCallback(
    (id: string, newTitle: string) => {
      dispatch(updateTodo({ id, newTitle }));
    },
    [dispatch]
  );

  const handleError = useCallback(() => {
    setError(TodoListErrorEnum.EMPTY_INPUT_ERROR);
  }, []);

  return (
    <div className="flex-col pt-4 max-w-96 mx-auto">
      <form className="py-3 flex gap-2" onSubmit={handleSubmit}>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="todo"
          type="text"
          placeholder="Enter todo"
          ref={inputRef}
        />
        <button
          type="submit"
          className="py-2 px-4 border-2 rounded border-gray-200 text-gray-600 hover:text-gray-900"
        >
          Add
        </button>
      </form>
      {error && <p className="text-red-500 text-m">{error}</p>}
      <div className="flex flex-col gap-2 py-3">
        {todos.map((todo) => {
          return (
            <TodoListElement
              key={todo.id}
              id={todo.id}
              title={todo.title}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onError={handleError}
            />
          );
        })}
      </div>
    </div>
  );
});

TodoList.displayName = "TodoList";
