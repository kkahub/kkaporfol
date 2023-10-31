"use client";

import { Variants } from "framer-motion";

const BasicFade: Variants = {
  show: (i) => {
    const delay = i * 0.2;
    return {
      opacity: 1,
      transition: {
        delay,
        duration: 1,
      },
    };
  },
  hide: {
    opacity: 0,
    transition: {
      duration: 0.1,
    },
  },
};

const Draw: Variants = {
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

export { BasicFade, Draw };
