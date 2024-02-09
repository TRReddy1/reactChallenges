import React from "react";

const Item = ({ item, handleToggle }) => {
  return (
    <div>
      <input
        type="checkbox"
        id={item.id}
        onChange={() => handleToggle(item.id)}
      />
      {item.name}
    </div>
  );
};

export default Item;
