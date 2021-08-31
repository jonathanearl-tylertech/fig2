import { configureStore } from '@reduxjs/toolkit'
import SessionReducer from './feature/sessionslice'
import LoginReducer from './feature/loginSlice';

const store = configureStore({
  reducer: {
    session: SessionReducer,
    login: LoginReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch