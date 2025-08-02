import { RootState } from "../../types";

export const selectOpenedModal = (state: RootState) =>
  state.modalSlice.openedModal;
