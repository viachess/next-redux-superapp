import { RootState } from "@/lib/redux-store";

export const selectAllTodos = (state: RootState) => state.todoSlice.todos;
