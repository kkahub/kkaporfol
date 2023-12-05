"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { BasicFade } from "@styles/motion";

export default function Profile() {
  return (
    <>
      <motion.h2
        className="title"
        variants={BasicFade}
        animate="show"
        custom={0.2}
      >
        PROFILE
      </motion.h2>
      <div className="content">
        <div className="photo">
          <motion.div
            variants={BasicFade}
            initial="hide"
            animate="show"
            custom={0.8}
          >
            <Image
              src="./images/profile_photo.png"
              alt="KKA photo"
              width={240}
              height={240}
            />
          </motion.div>
        </div>
        <div className="profile_con">
          <motion.ul variants={BasicFade}>
            <motion.li
              variants={BasicFade}
              initial="hide"
              animate="show"
              custom={1.2}
            >
              <b>Name</b> 김근애
            </motion.li>
            <motion.li
              variants={BasicFade}
              initial="hide"
              animate="show"
              custom={1.6}
            >
              <b>E-Main</b> oceco@naver.com
            </motion.li>
            <motion.li
              variants={BasicFade}
              initial="hide"
              animate="show"
              custom={1.8}
            >
              <b>Web Designer</b> 2012.04~
            </motion.li>
            <motion.li
              variants={BasicFade}
              initial="hide"
              animate="show"
              custom={2}
            >
              <b>Web Publisher</b> 2014.04~
            </motion.li>
          </motion.ul>
        </div>
      </div>
    </>
  );
}
