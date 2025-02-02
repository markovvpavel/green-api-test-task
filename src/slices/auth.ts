import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
  isAuthenticated: boolean;
}

const initialState: State = {
  isAuthenticated: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuthenticated: (state: State, { payload }: PayloadAction<boolean>) => {
      state.isAuthenticated = payload;
    },
  },
});

export const { setIsAuthenticated } = slice.actions;

export default slice.reducer;
