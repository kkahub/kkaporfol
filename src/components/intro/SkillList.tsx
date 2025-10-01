import { motion, Variants } from "framer-motion";

const skills = [
  { title: "View", items: ["React.js", "Next.js"], custom: 1 },
  { title: "State Management", items: ["Redux", "Redux-toolkit"], custom: 1.1 },
  { title: "Javascript", items: ["ES6", "Typescript"], custom: 1.2 },
  {
    title: "CSS",
    items: ["SASS(SCSS)", "styled-components", "반응형"],
    custom: 1.3,
  },
  { title: "Build Tool", items: ["Webpack"], custom: 1.4 },
  {
    title: "Coding Convention",
    items: ["Husky", "lint-staged", "ESLint", "Prettier"],
    custom: 1.5,
  },
  { title: "Configuration Management", items: ["Git", "Github"], custom: 1.6 },
  {
    title: "그 외",
    items: ["MUI (Material UI)", "Swiper", "Lodash"],
    custom: 1.8,
  },
];

const delay = 0.1;

export default function SkillList({ variants }: { variants: Variants }) {
  return (
    <ul className="skill_list">
      {skills.map(({ title, items }, index) => (
        <motion.li
          key={title}
          variants={variants}
          custom={1 + index * delay}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
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
