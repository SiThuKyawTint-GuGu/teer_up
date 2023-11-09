import React from "react";

const ContentStart: React.FC = () => {
  return (
    <button
      onClick={() => {
        localStorage.setItem("content", "1");
      }}
    ></button>
  );
};

export default ContentStart;
