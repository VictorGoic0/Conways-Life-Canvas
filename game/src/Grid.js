import React from "react";
import Block from "./Block";

const Grid = ({ blocks, toggleBlock }) => {
  return (
    <div className="grid-container">
      {blocks.map(block => (
        <Block key={block.id} block={block} toggleBlock={toggleBlock} />
      ))}
    </div>
  );
};

export default Grid;
