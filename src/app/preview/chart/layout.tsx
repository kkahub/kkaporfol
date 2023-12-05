import React from "react";

export default function ChartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section id="PreviewChart" className="preview_chart">
      <div className="inner">{children}</div>
    </section>
  );
}
