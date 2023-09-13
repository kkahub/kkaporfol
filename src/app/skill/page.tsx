"use client";

import React from "react";
import Image from "next/image";
import { BasicFade } from "@styles/motion.tsx";
import { motion } from "framer-motion";
import SkillSet from "../../data/skill.json";

export default function Skill() {
  return (
    <section id="Skill" className="skill">
      <div className="inner">
        <motion.h2
          className="title"
          variants={BasicFade}
          animate="show"
          custom={0.2}
        >
          SKILL
        </motion.h2>
        <div className="content">
          <motion.ol className="list_wrap skill_list grid" variants={BasicFade}>
            {SkillSet.skills.map((skill) => (
              <motion.li
                className={`item${skill.id} grid-item`}
                key={skill.id}
                variants={BasicFade}
                animate="show"
                custom={skill.id}
              >
                <Image
                  src={`/images/skill/skill_num${skill.id}.png`}
                  alt={`${skill.id}`}
                  width={50}
                  height={35}
                />
                <div className="card">
                  <h3>{skill.title}</h3>
                  <p className="desc">{skill.desc}</p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}
