import { useRef, useState } from "react";
import { TodoListElementType } from "./types";

type TodoListElementProps = {
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string) => void;
  onError: () => void;
} & TodoListElementType;

export const TodoListElement: React.FC<TodoListElementProps> = ({
  id,
  title,
  onDelete,
  onEdit,
  onError,
}) => {
  const [isEditing, toggleEditing] = useState<boolean>(false);
  // const inputRef = useRef<HTMLInputElement | null>(null);
  const [editedTitle, setEditedTitle] = useState<string>(title);

  const handleEditClick = () => {
    toggleEditing(true);
  };

  const handleSaveTitleClick = () => {
    if (editedTitle.length) {
      onEdit(id, editedTitle);
      return;
    }
    onError();
  };

  const handleDeleteClick = () => onDelete(id);

  return (
    <div className="flex justify-between py-2 px-4 rounded border-solid border-2 border-zinc-300">
      <div>{title}</div>
      <div className="flex gap-2">
        {/* edit */}
        <button onClick={handleEditClick} className="hover:text-blue-500">
          edit
        </button>
        {/* delete */}
        <button onClick={handleDeleteClick} className="hover:text-red-400">
          delete
        </button>
      </div>
    </div>
  );
};
