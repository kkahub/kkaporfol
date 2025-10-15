import React from "react";

import { motion } from "framer-motion";
import Image from "next/image";

import { BasicFade } from "@styles/motion";

import SkillSet from "../../data/skill.json";

export default function SkillList() {
  return (
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
            src={`./images/skill/skill_num${skill.id}.png`}
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
  );
}
