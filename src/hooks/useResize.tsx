import { useLayoutEffect } from "react";
import debounce from "lodash/debounce";

export default function useResize(callback: (w: number) => void) {
  useLayoutEffect(() => {
    const handleResize = debounce(() => {
      const innerW = window.innerWidth;
      callback(innerW);
    }, 300);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
}
