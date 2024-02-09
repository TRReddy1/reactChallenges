import React, { useState } from "react";
// import Buttons from "./Components/Buttons";
// import styles from "./TransferListApp.module.css";
// import { countriesData } from "./MockData/transferListData.js";
// import ListContainer from "./Components/ListContainer";

export const countriesData = [
  {
    value: "USA",
    id: "usa",
  },
  {
    value: "UAE",
    id: "uae",
  },
  {
    value: "India",
    id: "ind",
  },
  {
    value: "Australia",
    id: "aus",
  },
  {
    value: "Canada",
    id: "can",
  },
];

function getListState() {
  return countriesData.map((item) => ({
    ...item,
    selected: false,
    direction: "left",
  }));
}

const TransferListApp = () => {
  const [items, setItems] = useState(getListState);
  const leftItems = items.filter((item) => item.direction === "left");
  const rightItems = items.filter((item) => item.direction === "right");
  const selectedLeftItems = leftItems.filter((item) => item.selected);
  const selectedRightItems = rightItems.filter((item) => item.selected);

  const onToggle = (id) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          selected: !item.selected,
        };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const moveItems = (from, to) => {
    const movedItems = items.map((item) => {
      if (item.selected && item.direction === from) {
        return {
          ...item,
          selected: false,
          direction: to,
        };
      }
      return item;
    });
    setItems(movedItems);
  };

  const moveItemsTo = (to) => {
    const movedItems = items.map((item) => {
      return {
        ...item,
        direction: to,
      };
    });
    setItems(movedItems);
  };

  return (
    <div className={styles["TransferListContainer"]}>
      <ListContainer items={leftItems} onToggle={onToggle} />
      <Buttons
        leftClickHandler={() => moveItems("left", "right")}
        rightClickHandler={() => moveItems("right", "left")}
        leftClickHandlerAll={() => moveItemsTo("right")}
        rightClickHandlerAll={() => moveItemsTo("left")}
        disableLeftBtn={selectedLeftItems.length === 0}
        disableRightBtn={selectedRightItems.length === 0}
        disableLeftBtnAll={leftItems.length === 0}
        disableRightBtnAll={rightItems.length === 0}
      />
      <ListContainer items={rightItems} onToggle={onToggle} />
    </div>
  );
};

export default TransferListApp;

import styles from "../TransferListApp.module.css";

const ListItem = ({ id, value, selected, onToggle }) => {
  return (
    <div className={styles["inputWrapper"]}>
      <input
        type="checkbox"
        id={id}
        value={value}
        checked={selected}
        onChange={() => onToggle(id)}
      />
      <label htmlFor={id}>{value}</label>
    </div>
  );
};

// export default ListItem;

import React from "react";
import styles from "../TransferListApp.module.css";
import ListItem from "./ListItem";

const ListContainer = ({ items, onToggle }) => {
  return (
    <div className={styles["list-container"]}>
      <div className={styles["list-items"]}>
        {items.map((item) => (
          <ListItem
            key={item.id}
            id={item.id}
            value={item.value}
            selected={item.selected}
            onToggle={onToggle}
          />
        ))}
      </div>
    </div>
  );
};

// export default ListContainer;

import React from "react";
import styles from "../TransferListApp.module.css";

const Buttons = ({
  leftClickHandler,
  rightClickHandler,
  leftClickHandlerAll,
  rightClickHandlerAll,
  disableLeftBtn,
  disableRightBtn,
  disableLeftBtnAll,
  disableRightBtnAll,
}) => {
  return (
    <div className={styles["buttons-container"]}>
      <button onClick={leftClickHandlerAll} disabled={disableLeftBtnAll}>
        {">>"}
      </button>
      <button onClick={leftClickHandler} disabled={disableLeftBtn}>
        {">"}
      </button>
      <button onClick={rightClickHandler} disabled={disableRightBtn}>
        {"<"}
      </button>
      <button onClick={rightClickHandlerAll} disabled={disableRightBtnAll}>
        {"<<"}
      </button>
    </div>
  );
};
