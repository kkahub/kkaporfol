"use client";

import { useState, useLayoutEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { BasicFade } from "@styles/motion";
import useResize from "@hooks/useResize";

export default function Header() {
  const pathname = usePathname();
  const [windowSize, setWindowSize] = useState<number>(0);
  const [isOpen, setNavToggle] = useState<boolean>(false);

  useLayoutEffect(() => {
    setWindowSize(window.innerWidth);
  }, []);

  useResize((w: number) => {
    setWindowSize(w);
    return w > 1000 ? setNavToggle(true) : setNavToggle(false);
  });

  return (
    <header id="header">
      <div className="inner">
        <h1>
          <Link href="/">KKA</Link>
        </h1>
        <motion.nav id="nav" className={isOpen ? "on" : ""}>
          <button
            type="button"
            className="burgur"
            onClick={() => setNavToggle(!isOpen)}
          >
            <span className="bar1"> </span>
            <span className="bar2"> </span>
            <span className="bar3"> </span>
          </button>
          <motion.ul className="gnb">
            <motion.li
              variants={BasicFade}
              animate={windowSize > 1000 || isOpen ? "show" : "hide"}
              custom={0.1}
              className={pathname === "/" ? "on" : ""}
              onClick={() => setNavToggle(!isOpen)}
            >
              <Link href="/">INTRO</Link>
            </motion.li>
            <motion.li
              variants={BasicFade}
              animate={windowSize > 1000 || isOpen ? "show" : "hide"}
              custom={0.2}
              className={pathname === "/profile" ? "on" : ""}
              onClick={() => setNavToggle(!isOpen)}
            >
              <Link href="/profile">PROFILE</Link>
            </motion.li>
            <motion.li
              variants={BasicFade}
              animate={windowSize > 1000 || isOpen ? "show" : "hide"}
              custom={0.3}
              className={pathname === "/skill" ? "on" : ""}
              onClick={() => setNavToggle(!isOpen)}
            >
              <Link href="/skill">SKILL</Link>
            </motion.li>
            <motion.li
              variants={BasicFade}
              animate={windowSize > 1000 || isOpen ? "show" : "hide"}
              custom={0.4}
              className={pathname === "/portfolio" ? "on" : ""}
              onClick={() => setNavToggle(!isOpen)}
            >
              <Link href="/portfolio">PORTFOLIO</Link>
            </motion.li>
            <motion.li
              variants={BasicFade}
              animate={windowSize > 1000 || isOpen ? "show" : "hide"}
              custom={0.5}
              className={pathname === "/preview" ? "on" : ""}
              onClick={() => setNavToggle(!isOpen)}
            >
              <Link href="/preview">PREVIEW</Link>
            </motion.li>
          </motion.ul>
        </motion.nav>
      </div>
    </header>
  );
}
