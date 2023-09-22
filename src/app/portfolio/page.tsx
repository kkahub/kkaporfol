"use client";

import React, { useState } from "react";
import Image from "next/image";
import { BasicFade } from "@styles/motion";
import { motion } from "framer-motion";
import Modal from "@components/modal/modal-contents";
import PortfolioList from "../../data/portfolio.json";

export default function Portfolio() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalIndex, setModalIndex] = useState<string>("0");
  const modalOpen = (i: string) => {
    setShowModal(!showModal);
    setModalIndex(i);
  };
  const onClickModal = (i: string) => {
    modalOpen(i);
  };
  const keyModal = (e: React.KeyboardEvent<HTMLElement>, i: string) => {
    if (e.key === "Enter") {
      modalOpen(i);
    }
  };

  return (
    <section id="Portfolio" className="portfolio">
      <div className="inner">
        <motion.h2
          className="title"
          variants={BasicFade}
          animate="show"
          custom={0.2}
        >
          PORTFOLIO
        </motion.h2>
        <motion.p
          variants={BasicFade}
          initial="hide"
          animate="show"
          custom={0.3}
        >
          * 로그인을 해야 볼 수 있거나 더 이상 볼 수 없는 사이트의 경우 샘플
          페이지로 대체했습니다.
        </motion.p>
        <div className="content">
          <motion.ul
            className="list_wrap portfolio_wrap grid"
            variants={BasicFade}
          >
            {PortfolioList.portfolios.map((portfolio, index) => (
              <motion.li
                className={`item${portfolio.id} grid-item`}
                key={portfolio.id}
                variants={BasicFade}
                initial="hide"
                animate="show"
                custom={index + 0.1}
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
                    <h3>{portfolio.title}</h3>
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
          </motion.ul>
        </div>
      </div>
      {showModal && (
        <Modal onClickModal={onClickModal} modalIndex={modalIndex} />
      )}
    </section>
  );
}
