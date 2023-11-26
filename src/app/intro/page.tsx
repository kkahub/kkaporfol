"use client";

import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import Link from "next/link";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import useResize from "@hooks/useResize";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../styles/swiper.scss";

const swiperFade: Variants = {
  show: (i) => {
    const delay = i;
    return {
      opacity: 1,
      scale: 1,
      transition: {
        delay,
        duration: 1,
        ease: [0, 0.71, 0.2, 1.01],
      },
    };
  },
  hide: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.1,
      delay: 1,
    },
  },
};

const draw: Variants = {
  show: (i) => {
    const delay = i;
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
        opacity: { delay, duration: 0.01 },
      },
    };
  },
  hide: {
    pathLength: 0,
    opacity: 0,
    transition: {
      delay: 1,
    },
  },
};

export default function Intro() {
  const navPrevRef = useRef<HTMLDivElement>(null);
  const navNextRef = useRef<HTMLDivElement>(null);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(0);
  const [windowSize, setWindowSize] = useState(0);

  useResize((w: number) => {
    setWindowSize(w);
  });

  useLayoutEffect(() => {
    setWindowSize(window.innerWidth);
  }, []);

  useEffect(() => {
    setPageLoaded(true);
  }, [pageLoaded]);

  return (
    <div id="Intro" className="visual_group">
      {/* Visual Group */}
      <Swiper
        id="slider"
        modules={[Autoplay, Navigation, Pagination]}
        pagination={{ clickable: true }}
        navigation={{
          prevEl: navPrevRef.current,
          nextEl: navNextRef.current,
        }}
        onBeforeInit={(s: any) => {
          const swiper = s;
          swiper.params.navigation.prevEl = navPrevRef.current;
          swiper.params.navigation.nextEl = navNextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        speed={1000}
        loop
        onSlideChange={(swiper) => {
          setIsVisible(swiper.realIndex);
        }}
      >
        <SwiperSlide className="visual1">
          <div className="visual_inner">
            <div className="visual_title">
              <AnimatePresence>
                {isVisible === 0 && (
                  <motion.svg
                    initial="hide"
                    animate="show"
                    exit="hide"
                    width={windowSize < 640 ? "240" : "300"}
                    height={windowSize < 640 ? "240" : "300"}
                    viewBox="0 0 300 300"
                  >
                    <motion.circle
                      cx="150"
                      cy="150"
                      r="147"
                      stroke="#ddd"
                      variants={draw}
                      custom={0.5}
                    />
                  </motion.svg>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {isVisible === 0 && (
                  <motion.h1
                    variants={swiperFade}
                    initial="hide"
                    animate="show"
                    exit="hide"
                    custom={1}
                  >
                    <strong>
                      <span>K</span>
                      <span>K</span>
                      <span>A</span>
                    </strong>
                    프론트엔드
                    <br /> 포트폴리오
                  </motion.h1>
                )}
              </AnimatePresence>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="visual2">
          <div className="visual_inner">
            <div className="visual_title">
              <AnimatePresence>
                {isVisible === 1 && (
                  <motion.h1
                    variants={swiperFade}
                    initial="hide"
                    animate="show"
                    exit="hide"
                    custom={1}
                  >
                    이렇게 만들었어요
                  </motion.h1>
                )}
              </AnimatePresence>
            </div>

            <AnimatePresence>
              {isVisible === 1 && (
                <motion.ul
                  className="skill_list"
                  variants={swiperFade}
                  initial="hide"
                  animate="show"
                  exit="hide"
                  custom={1}
                >
                  <motion.li variants={swiperFade} custom={1}>
                    <h2>View</h2>
                    <ul className="pill_group">
                      <li>React.js</li>
                      <li>Next.js</li>
                    </ul>
                  </motion.li>
                  <motion.li variants={swiperFade} custom={1.1}>
                    <h2>State Management</h2>
                    <ul className="pill_group">
                      <li>Redux</li>
                      <li>Redux-toolkit</li>
                    </ul>
                  </motion.li>
                  <motion.li variants={swiperFade} custom={1.2}>
                    <h2>Javascript</h2>
                    <ul className="pill_group">
                      <li>ES6</li>
                      <li>typescript</li>
                    </ul>
                  </motion.li>
                  <motion.li variants={swiperFade} custom={1.3}>
                    <h2>CSS</h2>
                    <ul className="pill_group">
                      <li>SASS(SCSS)</li>
                      <li>styled-components</li>
                      <li>반응형</li>
                    </ul>
                  </motion.li>
                  <motion.li variants={swiperFade} custom={1.4}>
                    <h2>Build Tool</h2>
                    <ul className="pill_group">
                      <li>Webpack</li>
                    </ul>
                  </motion.li>
                  <motion.li variants={swiperFade} custom={1.5}>
                    <h2>Coding Convention</h2>
                    <ul className="pill_group">
                      <li>Husky</li>
                      <li>lint-staged</li>
                      <li>ESLint</li>
                      <li>Prettier</li>
                    </ul>
                  </motion.li>
                  <motion.li variants={swiperFade} custom={1.6}>
                    <h2>Configuration Management</h2>
                    <ul className="pill_group">
                      <li>Git</li>
                      <li>Github</li>
                    </ul>
                  </motion.li>
                  <motion.li variants={swiperFade} custom={1.8}>
                    <h2>그 외</h2>
                    <ul className="pill_group">
                      <li>MUI (Material UI)</li>
                      <li>Lodash</li>
                    </ul>
                  </motion.li>
                </motion.ul>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {isVisible === 1 && (
                <motion.div
                  variants={swiperFade}
                  initial="hide"
                  animate="show"
                  exit="hide"
                  custom={1.8}
                >
                  <Link
                    className="btn md basic"
                    href="https://github.com/kkahub/kkaporfol"
                    target="blank"
                  >
                    Github로 소스보기
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </SwiperSlide>
        <div ref={navPrevRef} className=" swiper-button swiper-button-prev">
          Prev
        </div>
        <div ref={navNextRef} className="swiper-button swiper-button-next">
          Next
        </div>
      </Swiper>
      {/* //Visual Group */}
    </div>
  );
}
