"use client";

import { FC, FormEvent, useRef, useState } from "react";
import { TodoListElement, TodoListElementType } from "../todo-list-element";
import { nanoid } from "nanoid";
import { TodoListErrorEnum } from "./types";

export const TodoList: FC = () => {
  const [list, setList] = useState<TodoListElementType[]>([]);
  const [error, setError] = useState<TodoListErrorEnum | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = inputRef?.current?.value;
    if (value) {
      setList((prev) => {
        return [...prev, { id: nanoid(), title: value }];
      });
      setError(null);
    } else {
      setError(TodoListErrorEnum.EMPTY_INPUT_ERROR);
    }
  };

  const handleDelete = (id: string) => {
    setList((prev) => prev.filter((el) => el.id !== id));
  };

  const handleEdit = (id: string, newTitle: string) => {
    setList((prev) =>
      prev.map((el) => (el.id === id ? { id, title: newTitle } : el))
    );
  };

  const handleError = () => {
    setError(TodoListErrorEnum.EMPTY_INPUT_ERROR);
  };

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
        {list.map((item) => {
          return (
            <TodoListElement
              key={item.id}
              id={item.id}
              title={item.title}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onError={handleError}
            />
          );
        })}
      </div>
    </div>
  );
};
