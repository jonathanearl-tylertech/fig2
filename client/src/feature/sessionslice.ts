import { createSlice } from "@reduxjs/toolkit";

export enum SessionState {
  uninitialized = 'uninitialized',
  isActive = 'isActive',
  isInactive = 'isInactive',
}

const sessionSlice = createSlice({
  name: 'session',

  initialState: {
    hasSession: SessionState.uninitialized,
    userInfo: null,
  },

  reducers: {
    startUserSession(state, action) {
      state.userInfo = action.payload;
      state.hasSession = SessionState.isActive;
    },

    endUserSession(state) {
      state.userInfo = null;
      state.hasSession = SessionState.isInactive;
    }
  }
});

export const { startUserSession, endUserSession } = sessionSlice.actions;

export default sessionSlice.reducer;