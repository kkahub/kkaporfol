"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header id="header">
      <div className="inner">
        <h1>
          <Link href="/">KKA</Link>
        </h1>
        <nav id="nav">
          <div className="burgur">
            <span className="bar1"> </span>
            <span className="bar2"> </span>
            <span className="bar3"> </span>
          </div>
          <ul className="gnb">
            <li className={pathname === "/" ? "on" : ""}>
              <Link href="/">INTRO</Link>
            </li>
            <li className={pathname === "/profile" ? "on" : ""}>
              <Link href="/profile">PROFILE</Link>
            </li>
            <li className={pathname === "/skill" ? "on" : ""}>
              <Link href="/skill">SKILL</Link>
            </li>
            <li className={pathname === "/portfolio" ? "on" : ""}>
              <Link href="/portfolio">PORTFOLIO</Link>
            </li>
            <li className={pathname === "/preview" ? "on" : ""}>
              <Link href="/preview">PREVIEW</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
