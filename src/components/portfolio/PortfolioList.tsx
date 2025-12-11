import React from "react";

import { useAppSelector } from "@modules/hooks";
import { BasicFade } from "@styles/motion";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

import type { PortfolioType } from "../../types/portfolio";

export default function PortfolioList({
  onClickModal,
  keyModal,
}: {
  onClickModal: (item: PortfolioType) => void;
  keyModal: (
    e: React.KeyboardEvent<HTMLDivElement>,
    item: PortfolioType,
  ) => void;
}) {
  const searchData = useAppSelector((state) => state.searchReducer);

  return (
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
                onClick={() => onClickModal(portfolio)}
                onKeyDown={(e) => keyModal(e, portfolio)}
                role="button"
              >
                <div className="thum_wrap">
                  <Image
                    className="responsive_size"
                    src={portfolio.view}
                    alt={portfolio.alt}
                    fill
                    priority
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
    </>
  );
}
