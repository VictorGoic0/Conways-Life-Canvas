import React from "react";

const Block = ({ block, toggleBlock }) => {
  return (
    <div
      className={`block ${block.alive ? `alive` : ``}`}
      onClick={() => toggleBlock(block.id)}
    />
  );
};

export default Block;
