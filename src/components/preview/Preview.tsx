"use client";

import React from "react";

import { BasicFade } from "@styles/motion";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Preview() {
  return (
    <section id="Preview" className="preview">
      <div className="inner">
        <motion.h2
          className="title"
          variants={BasicFade}
          initial="hide"
          animate="show"
          custom={0.2}
        >
          PREVIEW
        </motion.h2>
        <motion.p
          className="title_desc"
          variants={BasicFade}
          initial="hide"
          animate="show"
          custom={0.3}
        >
          기술 프리뷰 페이지는 제가 사용 할 수 있는 스킬로 만든 페이지 입니다.
          <br />
          작업하는 데로 조금씩 페이지를 업데이트할 예정입니다.
        </motion.p>
        <motion.ul className="preview_menu">
          <motion.li
            variants={BasicFade}
            initial="hide"
            animate="show"
            custom={0.4}
          >
            <Link href="/preview/chart" className="preview_item">
              Chart(D3.js)
            </Link>
          </motion.li>
        </motion.ul>
      </div>
    </section>
  );
}
