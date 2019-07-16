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
      // Life algorithm goes here
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
