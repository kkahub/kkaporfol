import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import PortfolioList from "../data/portfolio.json";

interface PortfolioType {
  id: string;
  title: string;
  view: string;
  alt: string;
  skills?: string[];
  participation: string;
  url: { sample?: string[]; service?: string[] };
  desc?: string;
}

interface SearchType {
  keyword: string;
  result: PortfolioType[];
  totalPage: number;
  page: number;
  sliceList: PortfolioType[];
}

const pageUnit = 12;
const pageCount = (item: number) => Math.ceil(item / pageUnit);

const initialState: SearchType = {
  keyword: "",
  result: PortfolioList.portfolios,
  totalPage: pageCount(PortfolioList.portfolios.length),
  page: 1,
  sliceList: PortfolioList.portfolios.slice(0, pageUnit),
};

// 리듀서
export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setKeyword: (state: SearchType, action: PayloadAction<string>) => ({
      ...state,
      keyword: action.payload,
    }),
    searchList: (state: SearchType) => ({
      ...state,
      result: PortfolioList.portfolios.filter((item) => {
        if (state.keyword === "") {
          return item;
        }
        if (item.title.toLowerCase().includes(state.keyword)) {
          return item;
        }
        return null;
      }),
    }),
    setTotalPage: (state) => ({
      ...state,
      totalPage: pageCount(state.result.length),
    }),
    setPage: (state, action) => ({
      ...state,
      page: action.payload,
    }),
    setSliceList: (state: SearchType) => ({
      ...state,
      sliceList:
        state.totalPage === 1
          ? state.result.slice(pageUnit * (state.page - 1))
          : state.result.slice(
              pageUnit * (state.page - 1),
              pageUnit * (state.page - 1) + pageUnit,
            ),
    }),
  },
});

export const search = searchSlice.name;
export const { setKeyword, searchList, setTotalPage, setPage, setSliceList } =
  searchSlice.actions;
export const searchReducer = searchSlice.reducer;
