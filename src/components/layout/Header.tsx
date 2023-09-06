"use client";

import Link from "next/link";

export default function Header() {
    return (
        <>
            <header id="header">
                <div className="inner">
                    <h1>
                        <Link href="/">KKA</Link>
                    </h1>
                    <nav id="nav">
                        <div className="burgur">
                            <span className="bar1"></span>
                            <span className="bar2"></span>
                            <span className="bar3"></span>
                        </div>
                        <ul className="gnb">
                            <li className="on">
                                <Link href="/">INTRO</Link>
                            </li>
                            <li>
                                <Link href="./profile">PROFILE</Link>
                            </li>
                            <li>
                                <Link href="/skill">SKILL</Link>
                            </li>
                            <li>
                                <Link href="/portfolio">PORTFOLIO</Link>
                            </li>
                            <li>
                                <Link href="/preview">PREVIEW</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    );
}
