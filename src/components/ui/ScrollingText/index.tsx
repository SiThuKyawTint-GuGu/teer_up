import "@/styles/scrolling-text.css"; // Import the stylesheet
import { useEffect, useRef } from "react";

const ScrollingText = ({ text }: any) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current as any;

    if (container.scrollWidth > container.clientWidth) {
      // Apply scrolling styles only if the content overflows
      container.classList.add("scrolling-container");
    } else {
      container.classList.remove("scrolling-container");
    }
  }, [text]);

  return (
    <div ref={containerRef}>
      <div className="scrolling-text">{text}</div>
    </div>
  );
};

export default ScrollingText;
