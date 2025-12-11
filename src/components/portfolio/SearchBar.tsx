import React from "react";

import { useAppDispatch, useAppSelector } from "@modules/hooks";
import { setKeyword } from "@modules/searchSlice";
import { BasicFade } from "@styles/motion";
import { motion } from "framer-motion";

export default function SearchBar() {
  const dispatch = useAppDispatch();
  const searchData = useAppSelector((state) => state.searchReducer);

  const searchValChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setKeyword(e.target.value.toLowerCase()));
  };

  return (
    <motion.div
      className="search_wrap"
      variants={BasicFade}
      initial="hide"
      animate="show"
      custom={0.4}
    >
      <input
        type="text"
        name="keyword"
        placeholder="제목으로 검색하기"
        value={searchData.keyword}
        onChange={searchValChange}
      />
      <button className="btn_search" type="submit">
        검색
      </button>
    </motion.div>
  );
}
