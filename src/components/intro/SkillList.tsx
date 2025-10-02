import { motion, Variants } from "framer-motion";

const skills = [
  { title: "View", items: ["React.js", "Next.js"] },
  { title: "State Management", items: ["Redux", "Redux-toolkit"] },
  { title: "Javascript", items: ["ES6", "Typescript"] },
  { title: "CSS", items: ["SASS(SCSS)", "styled-components", "반응형"] },
  { title: "Build Tool", items: ["Webpack"] },
  {
    title: "Coding Convention",
    items: ["Husky", "lint-staged", "ESLint", "Prettier"],
  },
  { title: "Configuration Management", items: ["Git", "Github"] },
  { title: "그 외", items: ["MUI (Material UI)", "Swiper", "Lodash"] },
];

const delay = 0.1;

export default function SkillList({ variants }: { variants: Variants }) {
  return (
    <ul className="skill_list">
      {skills.map(({ title, items }, index) => (
        <motion.li
          key={title}
          variants={variants}
          initial="hide"
          animate="show"
          exit="hide"
          custom={1 + index * delay}
        >
          <h2>{title}</h2>
          <ul className="pill_group">
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </motion.li>
      ))}
    </ul>
  );
}
