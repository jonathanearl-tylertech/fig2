import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: 'login',

  initialState: {
    isOpen: false
  },

  reducers: {
    openLogin(state) {
      state.isOpen = true;
    },
    closeLogin(state) {
      state.isOpen = false;
    }
  }
})

export const { openLogin, closeLogin } = loginSlice.actions;

export default loginSlice.reducer;