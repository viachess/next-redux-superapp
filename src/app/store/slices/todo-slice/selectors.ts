import { RootState } from "@/app/store";

export const selectAllTodos = (state: RootState) => state.todoSlice.todos;
