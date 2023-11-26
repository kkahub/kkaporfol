"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { BasicFade } from "@styles/motion";
import Link from "next/link";

import { asyncCountries } from "@modules/chartSlice";
import { useAppDispatch, useAppSelector } from "@modules/hooks";
import BarChart from "@/components/chart/bar";
import { DataProps } from "./types";

export default function Chart() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(asyncCountries());
  }, [dispatch]);

  // 랜덤 국가 선택
  const countriesSelect: number[] = [];
  const countriesList: DataProps[] = [];
  const count = 7;
  const total = useAppSelector((state) => state.chartReducer.total);
  const chartData = useAppSelector((state) => {
    while (countriesSelect.length < count) {
      const random: number = Math.floor(Math.random() * total);
      countriesSelect.push(random);
    }
    if (countriesList.length < count) {
      countriesSelect.map((num) =>
        countriesList.push(state.chartReducer.countries[num]),
      );
    }
    return countriesList;
  });

  return (
    <section id="PreviewChart" className="preview_chart">
      <div className="inner">
        <motion.h2
          className="title"
          variants={BasicFade}
          initial="hide"
          animate="show"
          custom={0.2}
        >
          CHART
        </motion.h2>
        <motion.p
          className="title_desc"
          variants={BasicFade}
          initial="hide"
          animate="show"
          custom={0.3}
        >
          {total}개의 국가 중에 {count}개 국가를 랜덤으로 데이터를 불러와 인구
          수를 그래프로 그렸습니다.
          <br />
          그래프 바에 마우스를 올리면 정보가 표시됩니다.
        </motion.p>
        <motion.div
          className="title_desc skill_point"
          variants={BasicFade}
          initial="hide"
          animate="show"
          custom={0.3}
        >
          <p>
            <b>핵심 기술</b>
          </p>
          <motion.ul className="pill_group">
            <motion.li
              variants={BasicFade}
              initial="hide"
              animate="show"
              custom={0.5}
            >
              D3.js
            </motion.li>
            <motion.li
              variants={BasicFade}
              initial="hide"
              animate="show"
              custom={0.5}
            >
              SVG
            </motion.li>
            <motion.li
              variants={BasicFade}
              initial="hide"
              animate="show"
              custom={0.5}
            >
              반응형
            </motion.li>
            <motion.li
              variants={BasicFade}
              initial="hide"
              animate="show"
              custom={0.5}
            >
              styled-components
            </motion.li>
            <motion.li
              variants={BasicFade}
              initial="hide"
              animate="show"
              custom={0.5}
            >
              Redux
            </motion.li>
            <motion.li
              variants={BasicFade}
              initial="hide"
              animate="show"
              custom={0.5}
            >
              Redux-Toolkit
            </motion.li>
          </motion.ul>
        </motion.div>
        <motion.p
          className="title_desc"
          variants={BasicFade}
          initial="hide"
          animate="show"
          custom={0.4}
        >
          <b>데이터 출저</b>
          <Link
            href="https://restcountries.com"
            target="_blank"
            rel="noopener noreferrer"
            passHref
            className="link"
          >
            https://restcountries.com
          </Link>
        </motion.p>
        <motion.p
          className="title_desc"
          variants={BasicFade}
          initial="hide"
          animate="show"
          custom={0.5}
        >
          <b>Github</b>
          <Link
            href="https://github.com/kkahub/kkaporfol/blob/main/src/components/chart/bar.tsx"
            target="_blank"
            rel="noopener noreferrer"
            passHref
            className="link"
          >
            코드 소스 보기
          </Link>
        </motion.p>

        {chartData[0] !== undefined && <BarChart data={chartData} />}
      </div>
    </section>
  );
}
