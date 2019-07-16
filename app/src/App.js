import React, { Component } from "react";
import Grid from "./Grid";
import generateBlocks from "./utility/generateBlocks";
import generateNeighbors from "./utility/generateNeighbors";

class App extends Component {
  state = {
    blocks: [],
    neighbors: {}
  };
  componentDidMount() {
    this.initializeGrid();
  }

  initializeGrid() {
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
    const newBlocks = blocks.concat();
    while (ongoing) {
      for (let block of newBlocks) {
        let aliveNeighbors = 0;
        let neighborIndices = neighbors[block.id];
        neighborIndices.forEach(index => {
          if (newBlocks[index].alive) {
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
          <Grid blocks={blocks} />
        </div>
      );
    }
    return <h1>Generating Grid...</h1>;
  }
}

export default App;
