import React, { useEffect, useState } from "react";
import { v4 } from "uuid";

const Child = ({ id, updateKey, updateValue, deleteChild }) => {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [subchild, setSubchild] = useState([]);

  const updateSubKey = (id, value) => {
    setSubchild(
      subchild.map((o) => {
        if (o.id === id) {
          return { ...o, key: value };
        }
        return o;
      })
    );
  };

  const updateSubValue = (id, value) => {
    setSubchild(
      subchild.map((o) => {
        if (o.id === id) {
          return { ...o, value: value };
        }
        return o;
      })
    );
  };

  const deleteSubChild = (id) => {
    setSubchild(subchild.filter((o) => o.id !== id));
  };

  useEffect(() => {
    updateValue(
      id,
      subchild.reduce((ans, curr) => {
        if (curr.key !== "" && curr.value !== "") {
          ans[curr.key] = curr.value;
        }
        return ans;
      }, {})
    );
  }, [subchild]);

  return (
    <>
      <div>
        {" "}
        key:{" "}
        <input
          type="text"
          value={key}
          onChange={(e) => {
            setKey(e.target.value);
            updateKey(id, e.target.value);
          }}
        />
        value:{" "}
        <input
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            updateValue(id, e.target.value);
          }}
        />
        <button
          onClick={() =>
            setSubchild((old) => [...old, { id: v4(), key: "", value: "" }])
          }
        >
          +
        </button>
        <button onClick={() => deleteChild(id)}>-</button>
      </div>
      {subchild.map((sub) => {
        return (
          <Child
            id={sub.id}
            updateKey={updateSubKey}
            updateValue={updateSubValue}
            deleteChild={deleteSubChild}
          />
        );
      })}
    </>
  );
};

export default Child;
