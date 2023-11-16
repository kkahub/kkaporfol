"use client";

import React from "react";
import { motion } from "framer-motion";
import { BasicFade } from "@styles/motion";
import Link from "next/link";

export default function Chart() {
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
          국가의 국토 면적을 그래프로 표현합니다.
          <br />
          데이터 출저 :&nbsp;
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
        <motion.div variants={BasicFade} custom={0.4}>
          - 작업중 -
        </motion.div>
      </div>
    </section>
  );
}
