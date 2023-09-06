"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../styles/plugin.scss";

const varFade: Variants = {
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
        onBeforeInit={(swiper: any) => {
          // console.log(swiper);
          swiper.params.navigation.prevEl = navPrevRef.current;
          swiper.params.navigation.nextEl = navNextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        speed={1000}
        loop={true}
        onSlideChange={(swiper) => {
          setIsVisible(swiper.realIndex);
        }}
      >
        <SwiperSlide className="visual1">
          <div className="visual_inner">
            <div className="visual_title">
              <AnimatePresence>
                {isVisible == 0 && (
                  <motion.svg
                    initial="hide"
                    animate="show"
                    exit="hide"
                    width="300"
                    height="300"
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
                {isVisible == 0 && (
                  <motion.h1
                    variants={varFade}
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
                {isVisible == 1 && (
                  <motion.h1
                    variants={varFade}
                    initial="hide"
                    animate="show"
                    exit="hide"
                    custom={1}
                  >
                    이렇게
                    <br />
                    만들었어요
                  </motion.h1>
                )}
              </AnimatePresence>
            </div>

            <AnimatePresence>
              {isVisible == 1 && (
                <motion.ul
                  className="skill_list"
                  variants={varFade}
                  initial="hide"
                  animate="show"
                  exit="hide"
                  custom={1.5}
                >
                  <motion.li variants={varFade} custom={0.2}>
                    React.js
                  </motion.li>
                  <motion.li variants={varFade} custom={0.4}>
                    Next.js
                  </motion.li>
                  <motion.li variants={varFade} custom={0.6}>
                    typescript
                  </motion.li>
                  <motion.li variants={varFade} custom={0.2}>
                    반응형
                  </motion.li>
                  <motion.li variants={varFade} custom={0.2}>
                    SASS(SCSS)
                  </motion.li>
                </motion.ul>
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
