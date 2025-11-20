"use client";

import React, { useState, useCallback, useEffect } from "react";

import Pagination from "@mui/material/Pagination";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

import PortfolioList from "@/components/portfolio/PortfolioList";
import SearchBar from "@/components/portfolio/SearchBar";
import { useAppDispatch, useAppSelector } from "@modules/hooks";
import {
  searchList,
  setTotalPage,
  setPage,
  setSliceList,
} from "@modules/searchSlice";
import { BasicFade } from "@styles/motion";

import type { PortfolioType } from "../../types/portfolio";

// eslint-disable-next-line import/newline-after-import
const Modal = dynamic(() => import("@components/modal/modal-contents"));

export default function PortfolioPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalItem, setModalItem] = useState<PortfolioType>(
    {} as PortfolioType,
  );
  const [lastSearchKeyword, setLastSearchKeyword] = useState<string>("");

  const dispatch = useAppDispatch();
  const searchData = useAppSelector((state) => state.searchReducer);

  const handlePage = useCallback(
    (e: React.ChangeEvent<unknown>, p: number) => {
      dispatch(setPage(p));
      dispatch(setSliceList());
    },
    [dispatch],
  );

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isLoading && searchData.keyword !== lastSearchKeyword) {
      setIsLoading(true);
      setLastSearchKeyword(searchData.keyword);
      dispatch(searchList());
    }
  };

  // searchList 완료 후 후속 처리
  useEffect(() => {
    if (isLoading) {
      dispatch(setPage(1));
      dispatch(setTotalPage());
      dispatch(setSliceList());
      setIsLoading(false);
    }
  }, [searchData.result, isLoading, dispatch]);

  const modalOpen = (item: PortfolioType) => {
    setShowModal(!showModal);
    setModalItem(item);
  };
  const onClickModal = (item: PortfolioType) => {
    modalOpen(item);
  };
  const keyModal = (
    e: React.KeyboardEvent<HTMLElement>,
    item: PortfolioType,
  ) => {
    if (e.key === "Enter") modalOpen(item);
  };

  return (
    <>
      <motion.h2
        className="title"
        variants={BasicFade}
        initial="hide"
        animate="show"
        custom={0.2}
      >
        {/* PORTFOLIO */}
      </motion.h2>
      <motion.p
        className="title_desc"
        variants={BasicFade}
        initial="hide"
        animate="show"
        custom={0.3}
      >
        * 로그인을 해야 볼 수 있거나 더 이상 볼 수 없는 사이트의 경우 샘플
        페이지로 대체했습니다.
      </motion.p>
      <div className="content">
        <form onSubmit={onSubmit}>
          <SearchBar />

          {/* Portfolio List */}
          {isLoading ? (
            <div className="wrap_loading">
              <div className="loading"></div>
            </div>
          ) : (
            <>
              {searchData.sliceList.length > 0 ? (
                <>
                  <PortfolioList
                    onClickModal={onClickModal}
                    keyModal={keyModal}
                  />
                  <Pagination
                    count={searchData.totalPage}
                    defaultPage={1}
                    page={searchData.page}
                    boundaryCount={6}
                    variant="outlined"
                    color="primary"
                    sx={{ margin: 2 }}
                    onChange={handlePage}
                  />
                </>
              ) : (
                <div className="no_data">검색 결과가 없습니다.</div>
              )}
            </>
          )}
          {/* //Portfolio List */}
        </form>
      </div>
      {showModal && <Modal onClickModal={onClickModal} modalItem={modalItem} />}
    </>
  );
}
