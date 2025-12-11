import { Suspense } from "react";

import Intro from "@/components/intro/Intro";

export default function IntroPage() {
  return (
    <div id="Intro" className="visual_group">
      <Suspense
        fallback={
          <div className="wrap_loading">
            <div className="loading"></div>
          </div>
        }
      >
        <Intro />
      </Suspense>
    </div>
  );
}
