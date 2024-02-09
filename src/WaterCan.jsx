import React from "react";

const WaterCan = ({ water, addFun }) => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "150px",
        }}
      >
        <button onClick={() => addFun(water.id)}>add</button>
        <button>empty</button>
        <div
          style={{
            border: "1px solid",
            height: "300px",
            width: "150px",
            backgroundColor: "lightblue",
            overflow: "hidden",
            // transform: "translateY(50%,50%)",
          }}
        >
          <div
            style={{
              width: "100%",
              height: `${water.filled}`,
              backgroundColor: "white",
              transform: "scale(1,1)",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default WaterCan;
