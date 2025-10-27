"use client";

import React, { useState, useCallback, useEffect } from "react";

import Pagination from "@mui/material/Pagination";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";

import { useAppDispatch, useAppSelector } from "@modules/hooks";
import {
  setKeyword,
  searchList,
  setTotalPage,
  setPage,
  setSliceList,
} from "@modules/searchSlice";
import { BasicFade } from "@styles/motion";

// eslint-disable-next-line import/newline-after-import
const Modal = dynamic(() => import("@components/modal/modal-contents"));

export default function PortfolioPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalIndex, setModalIndex] = useState<string>("0");
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

  const searchValChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setKeyword(e.target.value.toLowerCase()));
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(searchData.result);
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

  const modalOpen = (i: string) => {
    setShowModal(!showModal);
    setModalIndex(i);
  };
  const onClickModal = (i: string) => {
    modalOpen(i);
  };
  const keyModal = (e: React.KeyboardEvent<HTMLElement>, i: string) => {
    if (e.key === "Enter") modalOpen(i);
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
          {/* Portfolio List */}
          {isLoading ? (
            <div className="wrap_loading">
              <div className="loading"></div>
            </div>
          ) : (
            <>
              {searchData.sliceList.length > 0 && (
                <>
                  <motion.ul className="list_wrap portfolio_wrap grid">
                    <AnimatePresence>
                      {searchData.sliceList.map((portfolio, index) => (
                        <motion.li
                          className={`item${portfolio.id} grid-item`}
                          key={portfolio.id}
                          variants={BasicFade}
                          initial="hide"
                          animate="show"
                          exit="hide"
                          custom={index}
                        >
                          <div
                            className="list_con"
                            tabIndex={index}
                            onClick={() => onClickModal(portfolio.id)}
                            onKeyDown={(e) => keyModal(e, portfolio.id)}
                            role="button"
                          >
                            <div className="thum_wrap">
                              <Image
                                className="responsive_size"
                                src={portfolio.view}
                                alt={portfolio.alt}
                                fill
                              />
                            </div>
                            <div className="info_wrap">
                              <h3> {portfolio.title} </h3>
                              {portfolio.skills && (
                                <ul className="keyword">
                                  {portfolio.skills.map((skill) => (
                                    <li className="pill" key={skill}>
                                      {skill}
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          </div>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </motion.ul>
                  {/* Pagination */}
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
                  {/* //Pagination  */}
                </>
              )}
              {searchData.sliceList.length === 0 && (
                <div className="no_data">검색 결과가 없습니다.</div>
              )}
            </>
          )}
          {/* //Portfolio List */}
        </form>
      </div>
      {showModal && (
        <Modal onClickModal={onClickModal} modalIndex={modalIndex} />
      )}
    </>
  );
}
