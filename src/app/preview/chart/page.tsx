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
          {total}개의 국가 중에 {count}개 국가를 랜덤으로 선택해 인구 수를
          그래프로 그렸습니다.
          <br />
        </motion.p>
        <motion.p
          className="title_desc"
          variants={BasicFade}
          initial="hide"
          animate="show"
          custom={0.3}
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
        <motion.div
          className="title_desc skill_point"
          variants={BasicFade}
          initial="hide"
          animate="show"
          custom={0.4}
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

        {chartData[0] !== undefined && <BarChart data={chartData} />}
      </div>
    </section>
  );
}
