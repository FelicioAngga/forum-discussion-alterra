import { useEffect } from "react";

export default function useOutsideClick(ref: any, containerRef:any, onClickOutside: () => void) {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target) && !containerRef.current.contains(event.target)) {
        onClickOutside()
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}