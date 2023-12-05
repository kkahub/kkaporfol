import React from "react";

export default function IntroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div id="Intro" className="visual_group">
      {children}
    </div>
  );
}
