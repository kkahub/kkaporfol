import { BasicFade } from "@styles/motion";
import { motion } from "framer-motion";

import type { ProfileType } from "../../types/profile";

const profile = [
  { title: "Name", content: "김근애" },
  { title: "E-Mail", content: "oceco@naver.com" },
  { title: "Web Designer", content: "2012.04~" },
  { title: "Web Publisher", content: "2014.04~" },
  { title: "Web Front-end", content: "2024.04~" },
];

const delay = 0.2;

export default function ProfileList() {
  return (
    <motion.ul variants={BasicFade}>
      {profile.map((profile, index) => (
        <ProfileItem key={profile.title} profile={profile} index={index} />
      ))}
    </motion.ul>
  );
}

export function ProfileItem({ profile, index }: ProfileType) {
  return (
    <motion.li
      key={profile.title}
      variants={BasicFade}
      initial="hide"
      animate="show"
      custom={1.2 + index * delay}
    >
      <b>{profile.title}</b> {profile.content}
    </motion.li>
  );
}
