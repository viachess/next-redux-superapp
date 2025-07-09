import { RootState } from "@/lib/store";

export const selectAllTodos = (state: RootState) => state.todoSlice.todos;
