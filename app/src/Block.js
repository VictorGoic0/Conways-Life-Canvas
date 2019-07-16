import React from "react";

const Block = ({ block, toggleBlock }) => {
  return (
    <div className="block" onClick={() => toggleBlock(block.id)}>
      Block
    </div>
  );
};

export default Block;
