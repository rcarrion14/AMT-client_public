import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export type languageCode = "por" | "esp" | "eng";
interface sessionState {
  language: languageCode;
}

const initialState: sessionState = {
  language: "por",
};

export const setLanguage = createAsyncThunk(
  "session/setLanguage",
  async (language: languageCode) => {
    return { language };
  }
);

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setLanguage.fulfilled, (state, action) => {
      state.language = action.payload.language;
    });
  },
});

export const sessionSliceActions = sessionSlice.actions;
export default sessionSlice.reducer;
