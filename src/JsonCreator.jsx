import React, { useState } from "react";
import Child from "./Child";
import { v4 } from "uuid";

const JsonCreator = () => {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [child, setChild] = useState([]);
  const [final, setFinal] = useState("");

  const updateKey = (id, value) => {
    setChild(
      child.map((c) => {
        if (c.id === id) {
          return { ...c, key: value };
        }
        return c;
      })
    );
  };

  const updateValue = (id, value) => {
    setChild(
      child.map((c) => {
        if (c.id === id) {
          return { ...c, value: value };
        }
        return c;
      })
    );
  };

  const deleteChild = (id) => {
    setChild(child.filter((o) => o.id !== id));
  };

  return (
    <>
      key :
      <input type="text" value={key} onChange={(e) => setKey(e.target.value)} />
      value:
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        onClick={() =>
          setChild((old) => [...old, { id: v4(), key: "", value: "" }])
        }
      >
        +
      </button>
      {child.map((ch) => {
        return (
          <Child
            id={ch.id}
            updateKey={updateKey}
            updateValue={updateValue}
            deleteChild={deleteChild}
          />
        );
      })}
      <button
        onClick={() => {
          let result = { [key]: value };
          let sub = {};
          sub = child.reduce((ans, curr) => {
            if (curr.key !== "" && curr.value !== "") {
              ans[curr.key] = curr.value;
            }
            return ans;
          }, {});

          if (child.length !== 0) result = { [key]: { ...sub } };
          setFinal(JSON.stringify(result));
        }}
      >
        getjson
      </button>
      {final}
    </>
  );
};
export default JsonCreator;
