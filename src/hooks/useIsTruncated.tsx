import { useEffect, useState } from "react";

export const useIsTruncated = (element: React.RefObject<any>) => {
  const determineIsTruncated = () => {
    if (!element.current) return false;
    return element.current.scrollHeight > element.current.clientHeight;
  };
  useEffect(() => {
    if (element.current) {
      return setIsTruncated(element.current.scrollHeight > element.current.clientHeight);
    }
  }, element.current);
  const [isTruncated, setIsTruncated] = useState(determineIsTruncated());

  useEffect(() => {
    const resizeListener = () => setIsTruncated(determineIsTruncated());
    window.addEventListener("resize", resizeListener);
    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []);
  return isTruncated;
};
