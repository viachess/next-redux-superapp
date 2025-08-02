import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalId } from "./modal-ids";

interface ModalStoreState {
  openedModal: ModalId | null;
}

const initialState: ModalStoreState = {
  openedModal: null,
};

const modalSlice = createSlice({
  name: "modal-slice",
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<ModalId>) {
      state.openedModal = action.payload;
    },
    closeModal(state) {
      state.openedModal = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const modalSliceReducer = modalSlice.reducer;
