import React from "react";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section id="Profile" className="profile">
      <div className="inner">{children}</div>
    </section>
  );
}
