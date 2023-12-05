import React from "react";

export default function SkillLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section id="Skill" className="skill">
      <div className="inner">{children}</div>
    </section>
  );
}
