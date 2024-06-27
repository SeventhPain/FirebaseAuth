import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  appDarkMode: false,
};

export const themeSlice = createSlice({
  name: 'themeSlice',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.appDarkMode = !state.appDarkMode;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
