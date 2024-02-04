import { createSlice, configureStore } from "@reduxjs/toolkit";

interface AuthState {
  isOpen: boolean;
  isLoged: boolean;
}

const initialAuthState: AuthState = { isOpen: false, isLoged: false };

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

const store = configureStore({
  reducer: { auth: authSlice.reducer },
});

export const authSliceActions = authSlice.actions;

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
