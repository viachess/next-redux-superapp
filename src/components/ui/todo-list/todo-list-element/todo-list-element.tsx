"use client";

import { memo, useRef, useState } from "react";
import { TodoListElementType } from "./types";
import { TextArea } from "../../textarea/textarea";

type TodoListElementProps = {
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string) => void;
  onError: () => void;
} & TodoListElementType;

export const TodoListElement = memo<TodoListElementProps>(
  ({ id, title, onDelete, onEdit, onError }) => {
    const [isEditing, toggleEditing] = useState<boolean>(false);
    const editTextAreaRef = useRef<HTMLTextAreaElement | null>(null);
    const [editedTitle, setEditedTitle] = useState<string>(title);

    const handleEditClick = () => {
      toggleEditing(true);
      setTimeout(() => {
        // when click occurs, state hasn't updated in current iteration of event loop yet
        editTextAreaRef.current?.focus();
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

    const handleDeleteBtnClick = () => onDelete(id);

    const handleLeftBtnClick = () => {
      if (isEditing) {
        handleSaveTitleClick();
        return;
      }
      handleEditClick();
    };

    return (
      <div className="flex justify-between py-2 px-4 rounded border-solid border-2 border-zinc-300">
        <TextArea
          ref={editTextAreaRef}
          value={isEditing ? editedTitle : title}
          disabled={!isEditing}
          onChange={handleEditedTitleChange}
          onSubmit={handleSaveTitleClick}
          className="w-full text-gray-700"
        />
        <div className="flex gap-2 pl-2">
          <button onClick={handleLeftBtnClick} className="hover:text-blue-500">
            {isEditing ? "save" : "edit"}
          </button>
          <button onClick={handleDeleteBtnClick} className="hover:text-red-400">
            delete
          </button>
        </div>
      </div>
    );
  }
);

TodoListElement.displayName = "TodoListElement";
