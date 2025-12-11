import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface CountriesThunk {
  countries: never[];
  selectCountries: never[];
  total: number;
  isLoading: string;
  error: string | undefined | null;
}

const initialState: CountriesThunk = {
  countries: [],
  selectCountries: [],
  total: 0,
  isLoading: "false",
  error: null,
};

// thunk 생성
export const asyncCountries = createAsyncThunk(
  "chart/getCountries",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.get(
        "https://restcountries.com/v3.1/all?fields=translations,population,name",
      );
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

// 리듀서
const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {
    setData: (state, action) => ({
      ...state,
      countries: action.payload,
    }),
    sortData: (state, action) => ({
      ...state,
      selectCountries: action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncCountries.pending, (state) => {
        state.isLoading = "pending";
      })
      .addCase(asyncCountries.fulfilled, (state, action) => {
        state.isLoading = "fulfilled";

        state.countries = action.payload;

        state.total = action.payload.length;
      })
      .addCase(asyncCountries.rejected, (state, action) => {
        state.isLoading = "rejected";

        state.error = action.error.message;
      });
  },
});

export const chart = chartSlice.name;
export const { setData, sortData } = chartSlice.actions;
export const chartReducer = chartSlice.reducer;
export default chartSlice;
