import React from "react";
import Block from "./Block";

const Grid = ({ blocks }) => {
  return (
    <div className="grid-container">
      {blocks.map(block => (
        <Block key={block.id} block={block} />
      ))}
    </div>
  );
};

export default Grid;
