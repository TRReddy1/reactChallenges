import React, { useState, useEffect } from "react";

const ProgressBar = () => {
  const [filled, setFilled] = useState(0);
  const [isRunning, setisRunning] = useState(false);

  useEffect(() => {
    let id = null;
    if (filled < 100 && isRunning) {
      id = setInterval(() => {
        setFilled((prev) => prev + 1);
      }, 100);
    }

    return () => {
      clearInterval(id);
    };
  }, [filled, isRunning]);

  return (
    <div>
      <div
        style={{
          width: "300px",
          height: "20px",
          border: " 1px solid",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${filled}%`,
            height: "100%",
            backgroundColor: "green",
          }}
        >
          {" "}
          <span>{filled}</span>
        </div>
      </div>
      <button onClick={() => setisRunning(true)}>start</button>
      <button onClick={() => setisRunning(false)}>stop</button>
      <button
        onClick={() => {
          setisRunning(false);
          setFilled(0);
        }}
      >
        reset
      </button>
    </div>
  );
};

export default ProgressBar;
