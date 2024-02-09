import React, { useEffect, useRef, useState } from "react";
import { countryList } from "./countryList";

const AutotypeOffline = () => {
  const [name, setName] = useState("");
  const [hovered, setHovered] = useState("");
  const [res, setRes] = useState([]);
  const [selectedIdx, setSelectedIdx] = useState(-1);
  const [selected, setSelected] = useState("");

  // const inputRef = useRef(null);

  useEffect(() => {
    if (name !== "" && hovered === "" && selected === "") {
      setRes(
        countryList.filter((country) =>
          country.toLowerCase().includes(name.toLowerCase())
        )
      );
      setSelectedIdx(-1);
    }

    if (name === "") {
      setRes([]);
      setHovered("");
      setSelected("");
    }
    // inputRef.current.focus();
  }, [name]);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      // Move selection up
      e.preventDefault();
      setSelectedIdx((prevIdx) => {
        var idx = prevIdx < 0 ? res.length - 1 : prevIdx - 1;
        setSelected(res[idx]);
        setName(res[idx]);
        return idx;
      });

      //   if (selectedIdx) {
      //     //   console.log(countryList[selectedIdx]);
      //   }
    } else if (e.key === "ArrowDown") {
      // Move selection down
      e.preventDefault();
      setSelectedIdx((prevIdx) => {
        var idx = prevIdx < res.length - 1 ? prevIdx + 1 : 0;
        setSelected(res[idx]);
        setName(res[idx]);
        return idx;
      });
      //   if (selectedIdx) {
      //     //   console.log(countryList[selectedIdx]);
      //   }
    }
  };

  const handleOver = (e) => {
    setHovered(e.target.innerText);
    setName(e.target.innerText);
    // setTimeout(() => {
    //   inputRef.current.focus();
    // }, 0);
  };

  const handleLeave = () => {
    setHovered("");
  };
  //   const handleFocus = (e) => {
  //     e.target.setSelectionRange(e.target.value.length, e.target.value.length);
  //     console.log("in");
  //   };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "2rem",
      }}
    >
      <form>
        <input
          type="text"
          // ref={inputRef}
          placeholder="search for a country"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setHovered("");
            setSelected("");
          }}
          onKeyDown={handleKeyDown}
          //   onFocus={handleFocus}
          style={{ width: "500px" }}
        />
      </form>
      <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
        {res.map((country, idx) => {
          return (
            <li
              key={country}
              style={{
                backgroundColor:
                  selectedIdx === idx || hovered === country
                    ? "lightblue"
                    : "lightgray",
                border:
                  selectedIdx === idx || hovered === country
                    ? "2px solid"
                    : "none",
                cursor: "pointer",
                marginBottom: "5px",
                width: "500px",
              }}
              onMouseOver={handleOver}
              onMouseLeave={handleLeave}
            >
              {country}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AutotypeOffline;
