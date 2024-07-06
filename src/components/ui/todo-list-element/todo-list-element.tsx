import { TodoListElementProps } from "./types";

export const TodoListElement: React.FC<TodoListElementProps> = ({ title }) => {
  return <div className="py-2 px-4 bg-orange-200 rounded">{title}</div>;
};
