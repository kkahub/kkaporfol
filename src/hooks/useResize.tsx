import { useLayoutEffect } from "react";
// import { debounce } from "lodash";

export default function useResize(callback: (w: number) => void) {
  useLayoutEffect(() => {
    const handleResize = () => {
      const innerW = window.innerWidth;
      callback(innerW);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  // useLayoutEffect(function mount() {
  // const handleResize = debounce(() => {
  // 	const innerW = window.innerWidth;
  // 	callback(innerW);
  // }, 2500);
}
