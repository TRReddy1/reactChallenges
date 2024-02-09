import React, { useState } from "react";
import Item from "./Item";

const TransferList = () => {
  const [items, setItems] = useState([
    { id: "java", name: "java", selected: false, direction: "left" },
    { id: "js", name: "js", selected: false, direction: "left" },
    { id: "react", name: "react", selected: false, direction: "left" },
    { id: "sql", name: "sql", selected: false, direction: "left" },
  ]);
  const leftItems = items.filter((item) => item.direction === "left");
  const rightItems = items.filter((item) => item.direction === "right");

  const moveItems = (to) => {
    const up = items.map((item) => {
      return {
        ...item,
        direction: to,
      };
    });
    setItems(up);
  };

  const handleToggle = (id) => {
    // setItems((old) => {
    //   return old.map((i) => {
    //     if (i.id === id) {
    //       return {
    //         ...i,
    //         selected: !i.selected,
    //       };
    //     }
    //     return i;
    //   });
    // });

    const f = items;
    var t = [];
    items.map((e) => {
      if (e.id === id) {
        e.selected = !e.selected;
      }
      t.push(e);
    });
    setItems(t);
  };

  const moveItemsFR = (from, to) => {
    const up = items.map((item) => {
      if (item.selected && item.direction === from) {
        return {
          ...item,
          selected: false,
          direction: to,
        };
      }
      return item;
    });
    setItems(up);
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ display: "flex", border: "solid" }}>
        {leftItems.map((item) => {
          return <Item key={item.id} item={item} handleToggle={handleToggle} />;
        })}
      </div>
      <div>
        <button onClick={() => moveItems("right")}>{">>"}</button>
        <button onClick={() => moveItems("left")}>{"<<"}</button>
        <button onClick={() => moveItemsFR("left", "right")}>{">"}</button>
        <button onClick={() => moveItemsFR("right", "left")}>{"<"}</button>
      </div>
      <div style={{ display: "flex", border: "solid" }}>
        {rightItems.map((item) => {
          return <Item key={item.id} item={item} handleToggle={handleToggle} />;
        })}
      </div>
    </div>
  );
};

export default TransferList;
