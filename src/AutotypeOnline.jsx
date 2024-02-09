import React, { useEffect, useState } from "react";
import { githubUsers } from "./api";
import { useDebounce } from "./hooks/useDebounce";

const AutotypeOnline = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const debouncedSearch = useDebounce(name);
  const [selectedIdx, setSelectedIdx] = useState(-1);
  const [selected, setSelected] = useState("");
  const [hovered, setHovered] = useState("");

  useEffect(() => {
    if (name !== "" && selected === "" && hovered === "") {
      githubUsers(debouncedSearch).then((res) => setData(res.items));
      setSelectedIdx(-1);
    }

    if (name === "") {
      setData([]);
      setSelected("");
      setHovered("");
    }
  }, [debouncedSearch]);

  const handleDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIdx((prev) => {
        var curr = selectedIdx < data.length - 1 ? prev + 1 : 0;
        setSelected(data[curr]);
        setName(data[curr]);
        return curr;
      });
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIdx((prev) => {
        var curr = selectedIdx < 0 ? data.length - 1 : prev - 1;
        setSelected(data[curr]);
        setName(data[curr]);
        return curr;
      });
    }
  };

  const handleHover = (e) => {
    setHovered(e.target.innerText);
    setName(e.target.innerText);
  };
  // const handleFocus = (e) => {
  //    console.log("focused");
  // };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form>
        <input
          type="text"
          placeholder="search for github user"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setHovered("");
            setSelected("");
          }}
          // onFocus={handleFocus}
          onKeyDown={handleDown}
          style={{ width: "500px" }}
        />
      </form>
      <ul style={{ listStyle: "none", margin: "0", padding: "0" }}>
        {data.length > 0
          ? data.map((d, idx) => {
              return (
                <li
                  style={{
                    width: "500px",
                    backgroundColor:
                      selectedIdx === idx || hovered === d
                        ? "lightblue"
                        : "lightgrey",
                    border:
                      selectedIdx === idx || hovered === d
                        ? "2px solid"
                        : "none",
                    marginBottom: "5px",
                    cursor: "pointer",
                  }}
                  onMouseOver={handleHover}
                  onMouseLeave={() => setHovered("")}
                  key={d}
                >
                  {d}
                </li>
              );
            })
          : "nothing to display"}
      </ul>
    </div>
  );
};

export default AutotypeOnline;
