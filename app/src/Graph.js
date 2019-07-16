import React from "react";
import Block from "./Block";

const Graph = ({ blocks }) => {
  return (
    <div className="graph-container">
      {blocks.map(block => (
        <Block key={block.id} block={block} />
      ))}
    </div>
  );
};

export default Graph;
