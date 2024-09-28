"use client";

import { FC, useRef, useState } from "react";
import { InputText } from "../input-text/input-text";
import { TodoListElementType } from "./types";

type TodoListElementProps = {
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string) => void;
  onError: () => void;
} & TodoListElementType;

export const TodoListElement: FC<TodoListElementProps> = ({
  id,
  title,
  onDelete,
  onEdit,
  onError,
}) => {
  const [isEditing, toggleEditing] = useState<boolean>(false);
  const editInputRef = useRef<HTMLInputElement | null>(null);
  const [editedTitle, setEditedTitle] = useState<string>(title);

  const handleEditClick = () => {
    toggleEditing(true);
    setTimeout(() => {
      // when click occurs, the input does not exist in the DOM yet.
      editInputRef.current?.focus();
    }, 0);
  };

  const handleSaveTitleClick = () => {
    toggleEditing(false);
    if (!editedTitle.length) {
      setEditedTitle(title);
      return onError();
    }
    onEdit(id, editedTitle);
  };

  const handleEditedTitleChange = (v: string) => {
    setEditedTitle(v);
  };

  const handleDeleteClick = () => onDelete(id);

  return (
    <div className="flex justify-between py-2 px-4 rounded border-solid border-2 border-zinc-300">
      <div className="h-full">
        {isEditing ? (
          <InputText
            ref={editInputRef}
            value={editedTitle}
            onChange={handleEditedTitleChange}
            onSubmit={handleSaveTitleClick}
            className="h-full w-full text-gray-700"
          />
        ) : (
          <div>{title}</div>
        )}
      </div>
      <div className="flex gap-2 pl-2">
        {isEditing ? (
          // save
          <button
            onClick={handleSaveTitleClick}
            className="hover:text-blue-500"
          >
            save
          </button>
        ) : (
          // edit
          <button onClick={handleEditClick} className="hover:text-blue-500">
            edit
          </button>
        )}

        {/* delete */}
        <button onClick={handleDeleteClick} className="hover:text-red-400">
          delete
        </button>
      </div>
    </div>
  );
};
