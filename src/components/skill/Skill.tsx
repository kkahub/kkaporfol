"use client";

import React from "react";

import { motion } from "framer-motion";

import { BasicFade } from "@styles/motion";

import SkillList from "./SkillList";

export default function Skill() {
  return (
    <>
      <motion.h2
        className="title"
        variants={BasicFade}
        animate="show"
        custom={0.2}
      >
        SKILL
      </motion.h2>
      <div className="content">
        <SkillList />
      </div>
    </>
  );
}
