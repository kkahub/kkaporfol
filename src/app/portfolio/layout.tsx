import React from "react";

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section id="Portfolio" className="portfolio">
      <div className="inner">{children}</div>
    </section>
  );
}
