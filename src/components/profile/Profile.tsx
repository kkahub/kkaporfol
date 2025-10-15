"use client";

import React from "react";

import { motion } from "framer-motion";
import Image from "next/image";

import ProfileList from "@/components/profile/ProfileList";
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
          <ProfileList />
        </div>
      </div>
    </>
  );
}
