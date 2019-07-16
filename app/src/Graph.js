import React from "react";
import Block from "./Block";

const Graph = ({ blocks, neighbors }) => {
  return (
    <div className="graph-container">
      {blocks.map(block => (
        <Block key={block.id} />
      ))}
    </div>
  );
};

export default Graph;
