import React, { useEffect, useState } from "react";
import WaterCan from "./WaterCan";

const WaterBalancer = () => {
  const [waterCans, setWaterCans] = useState([
    { id: 1, filled: 0, isRunning: false },
  ]);

  useEffect(() => {
    let id = null;
    // setWaterCans((prev) => {
    //   return prev.map((p) => {
    //     if (p.filled < 100 && p.isRunning) {
    //       id = setInterval(() => {
    //         p.filled += 1;
    //       }, 100);
    //     }
    //     return p;
    //   });
    // });
    const find = waterCans.find((w) => w.isRunning);
    console.log(find);
    if (find.filled < 100) {
      id = setInterval(() => {
        find.filled += 1;
        setWaterCans((prev) => {
          return prev.map((p) => {
            if (p.id === find.id) {
              return find;
            } else {
              return p;
            }
          });
        });
      }, 100);
    }
    return () => {
      clearInterval(id);
    };
  }, [waterCans]);

  const handleAdd = (id) => {
    console.log("clicked");
    setWaterCans((prev) => {
      return prev.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            isRunning: true,
          };
        }
        return p;
      });
    });
  };
  return (
    <div>
      {waterCans.map((water) => {
        return <WaterCan water={water} addFun={handleAdd} />;
      })}
    </div>
  );
};

export default WaterBalancer;
