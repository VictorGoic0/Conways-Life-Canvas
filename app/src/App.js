import React, { Component } from "react";
import Graph from "./Graph";
import generateBlocks from "./utility/generateBlocks";
import generateNeighbors from "./utility/generateNeighbors";

class App extends Component {
  state = {
    blocks: [],
    neighbors: {}
  };
  componentDidMount() {
    this.initializeGraph();
  }

  initializeGraph() {
    const blocks = generateBlocks();
    const flattened = blocks.reduce((acc, val) => acc.concat(val));
    const neighbors = generateNeighbors(blocks);
    this.setState({
      ...this.state,
      blocks: flattened,
      neighbors
    });
  }

  beginGame() {
    let ongoing = true;
    const { blocks, neighbors } = this.state;
    while (ongoing) {
      for (let block of blocks) {
        let aliveNeighbors = 0;
        let neighbors = neighbors[block.id];
        neighbors.forEach(index => {
          if (blocks[index].alive) {
            aliveNeighbors += 1;
          }
        });
        if (aliveNeighbors >= 3) {
          if (!block.alive) {
            block = { ...block, alive: true };
          }
        } else {
          if (block.alive) {
            block = { ...block, alive: false };
          }
        }
      }
    }
  }

  render() {
    const { blocks } = this.state;
    if (blocks.length > 0) {
      return (
        <div className="app-container">
          <Graph blocks={blocks} />
        </div>
      );
    }
    return <h1>Generating graph...</h1>;
  }
}

export default App;
