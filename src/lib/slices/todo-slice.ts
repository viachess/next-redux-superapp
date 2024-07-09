import { TodoListElementType } from "@/components/ui";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TodoSliceState = {
  todos: TodoListElementType[];
};

const initialState: TodoSliceState = {
  todos: [],
};

type DeleteTodoAction = PayloadAction<{ id: string }>;
type UpdateTodoAction = PayloadAction<{ id: string; newTitle: string }>;

const todoSlice = createSlice({
  name: "todo-slice",
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<{ id: string; title: string }>) {
      state.todos.push(action.payload);
    },
    deleteTodo(state, action: DeleteTodoAction) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
    },
    updateTodo(state, action: UpdateTodoAction) {
      const { newTitle, id } = action.payload;
      const i = state.todos.findIndex((el) => el.id === id);
      if (i !== -1) {
        state.todos[i].title = newTitle;
      }
    },
  },
});

export const todoSliceReducer = todoSlice.reducer;
export const { addTodo, deleteTodo, updateTodo } = todoSlice.actions;
