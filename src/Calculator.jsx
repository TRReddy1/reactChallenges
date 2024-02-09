import React, { useState } from "react";

const Calculator = () => {
  const [val, setValue] = useState("");
  const [res, SetRes] = useState(0);

  const handleClick = (e) => {
    // console.log(e.target.innerText);
    setValue((old) => old + e.target.innerText);
  };

  const handleCal = () => {
    if (val.includes("+")) {
      let nums1 = val.split("+");
      SetRes(() => {
        const resul = parseInt(nums1[0]) + parseInt(nums1[1]);
        setValue(resul.toString());
        return resul;
      });
    }
    if (val.includes("-")) {
      let nums2 = val.split("-");
      SetRes(() => {
        const resul = parseInt(nums2[0]) - parseInt(nums2[1]);
        setValue(resul.toString());
        return resul;
      });
    }
    if (val.includes("*")) {
      let nums3 = val.split("*");
      SetRes(() => {
        const resul = parseInt(nums3[0]) * parseInt(nums3[1]);
        setValue(resul.toString());
        return resul;
      });
    }
    if (val.includes("/")) {
      let nums4 = val.split("/");
      SetRes(() => {
        const resul = parseInt(nums4[0]) / parseInt(nums4[1]);
        setValue(resul.toString());
        return resul;
      });
    }
  };

  const handleClear = () => {
    SetRes(0);
    setValue("");
  };

  const handleDel = () => {
    setValue(val.slice(0, val.length - 1));
  };

  return (
    <>
      <div style={{ width: "10rem", backgroundColor: "black", color: "white" }}>
        {val}
        <div>{res}</div>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "10rem",
          gap: "9px",
        }}
      >
        <button style={{ height: "2rem", width: "2rem" }} onClick={handleDel}>
          del
        </button>
        <button style={{ height: "2rem", width: "2rem" }} onClick={handleClear}>
          cle
        </button>
        <button style={{ height: "2rem", width: "2rem" }} onClick={handleClick}>
          9
        </button>
        <button style={{ height: "2rem", width: "2rem" }} onClick={handleClick}>
          8
        </button>
        <button style={{ height: "2rem", width: "2rem" }} onClick={handleClick}>
          7
        </button>
        <button style={{ height: "2rem", width: "2rem" }} onClick={handleClick}>
          6
        </button>
        <button style={{ height: "2rem", width: "2rem" }} onClick={handleClick}>
          5
        </button>
        <button style={{ height: "2rem", width: "2rem" }} onClick={handleClick}>
          4
        </button>
        <button style={{ height: "2rem", width: "2rem" }} onClick={handleClick}>
          3
        </button>
        <button style={{ height: "2rem", width: "2rem" }} onClick={handleClick}>
          2
        </button>
        <button style={{ height: "2rem", width: "2rem" }} onClick={handleClick}>
          1
        </button>
        <button style={{ height: "2rem", width: "2rem" }} onClick={handleClick}>
          0
        </button>
        <button style={{ height: "2rem", width: "2rem" }} onClick={handleClick}>
          +
        </button>
        <button style={{ height: "2rem", width: "2rem" }} onClick={handleClick}>
          -
        </button>
        <button style={{ height: "2rem", width: "2rem" }} onClick={handleClick}>
          *
        </button>
        <button style={{ height: "2rem", width: "2rem" }} onClick={handleClick}>
          /
        </button>
        <button style={{ height: "2rem", width: "2rem" }} onClick={handleCal}>
          =
        </button>
      </div>
    </>
  );
};

export default Calculator;
