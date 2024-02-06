import { createSlice, configureStore } from "@reduxjs/toolkit";
import { getUserId } from "../util/auth";

interface AuthState {
  isOpen: boolean;
  isLoged: boolean;
}

interface PostState {
  isOpen: boolean;
}

const initialAuthState: AuthState = { isOpen: false, isLoged: false };

const initialNewPostState: PostState = { isOpen: false };

const token = getUserId();

if (token) {
  initialAuthState.isLoged = true;
}

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    toggleFormOn(state) {
      state.isOpen = true;
    },
    toggleFormOff(state) {
      state.isOpen = false;
    },
    toggleIsLogedOn(state) {
      state.isLoged = true;
    },
    toggleIsLoggedOf(state) {
      state.isLoged = false;
    },
  },
});

const newPostSlice = createSlice({
  name: "newPost",
  initialState: initialNewPostState,
  reducers: {
    toggleFormOn(state) {
      state.isOpen = true;
    },
    toggleFormOff(state) {
      state.isOpen = false;
    },
  },
});

const store = configureStore({
  reducer: { auth: authSlice.reducer, newPost: newPostSlice.reducer },
});

export const authSliceActions = authSlice.actions;
export const newPostSliceActions = newPostSlice.actions;

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
