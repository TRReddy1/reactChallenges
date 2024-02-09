import React, { useEffect, useState } from "react";

const Trafficlight = () => {
  const [lights, setLights] = useState({
    red: "gray",
    green: "gray",
    yellow: "gray",
  });

  const recursive = async (color, time) => {
    if (color === "red") {
      setLights({ red: color, green: "gray", yellow: "gray" });
      setTimeout(() => {
        return recursive("green", 3000);
      }, time);
    }
    if (color === "green") {
      setLights({ red: "gray", green: color, yellow: "gray" });
      setTimeout(() => {
        return recursive("yellow", 3000);
      }, time);
    }
    if (color === "yellow") {
      setLights({ red: "gray", green: "gray", yellow: color });
      setTimeout(() => {
        return recursive("red", 3000);
      }, time);
    }
  };

  useEffect(() => {
    recursive("red", 3000);
  }, []);
  return (
    <div>
      <div
        style={{
          height: "50px",
          width: "50px",
          border: "1px solid",
          borderRadius: "50%",
          backgroundColor: lights.red,
        }}
      ></div>
      <div
        style={{
          height: "50px",
          width: "50px",
          border: "1px solid",
          borderRadius: "50%",
          backgroundColor: lights.green,
        }}
      ></div>
      <div
        style={{
          height: "50px",
          width: "50px",
          border: "1px solid",
          borderRadius: "50%",
          backgroundColor: lights.yellow,
        }}
      ></div>
    </div>
  );
};

export default Trafficlight;
