import React, { Component } from "react";
import Grid from "./Grid";
import generateBlocks from "./utility/generateBlocks";
import generateNeighbors from "./utility/generateNeighbors";
import randomNumber from "./utility/randomNumber";

class App extends Component {
  state = {
    blocks: [],
    nextBlocks: [],
    neighbors: {},
    generation: 0,
    paused: false
  };
  componentDidMount() {
    this.initializeGrid();
  }

  toggleBlock = id => {
    this.setState({
      ...this.state,
      blocks: this.state.blocks.map(block => {
        if (block.id === id) {
          return {
            ...block,
            alive: !block.alive
          };
        }
        return block;
      })
    });
  };

  initializeGrid() {
    const blocks = generateBlocks(20, 20);
    const flattened = blocks.reduce((acc, val) => acc.concat(val));
    const neighbors = generateNeighbors(blocks);
    this.setState({
      ...this.state,
      blocks: flattened,
      neighbors
    });
  }

  beginGame = () => {
    if (this.state.generation === 0) {
      const timer = setInterval(this.nextGrid, 200);
    }
  };

  nextGrid = () => {
    console.log(this.state.generation);
    const { blocks, neighbors } = this.state;
    const newBlocks = blocks.map(block => {
      let aliveNeighbors = 0;
      let neighborIndices = neighbors[block.id];
      neighborIndices.forEach(index => {
        if (blocks[index].alive) {
          aliveNeighbors += 1;
        }
      });
      if (block.alive) {
        if (aliveNeighbors === 2 || aliveNeighbors === 3) {
          return block;
        }
        block = { ...block, alive: false };
        return block;
      } else {
        if (aliveNeighbors === 3) {
          block = { ...block, alive: true };
          return block;
        }
        return block;
      }
    });
    this.setState({
      ...this.state,
      generation: this.state.generation + 1,
      blocks: newBlocks
    });
  };

  switchBuffers = () => {
    this.setState({
      ...this.state,
      blocks: this.state.nextBlocks,
      nextBlocks: []
    });
  };

  restartGame = () => {
    const blocks = generateBlocks();
    const flattened = blocks.reduce((acc, val) => acc.concat(val));
    this.setState({
      ...this.state,
      blocks: flattened,
      generation: 0
    });
  };

  pauseGame = () => {
    this.setState({
      paused: !this.state.paused
    });
  };

  populateGrid = () => {
    const { blocks } = this.state;
    const randomNumbers = randomNumber(Date.now(), blocks.length);
    console.log(randomNumbers);
    const newBlocks = blocks.concat();
    const length = randomNumbers.length;
    for (let i = 0; i < length; i++) {
      const current = randomNumbers[i];
      if (current in newBlocks) {
        newBlocks[current] = {
          ...newBlocks[current],
          alive: true
        };
      }
    }
    this.setState(prevState => ({
      ...prevState,
      blocks: newBlocks
    }));
  };

  render() {
    const { blocks, generation } = this.state;
    if (blocks.length > 0) {
      return (
        <div className="app-container">
          <p>Generation number {generation}</p>
          <Grid blocks={blocks} toggleBlock={this.toggleBlock} />
          <button onClick={this.beginGame}>Start</button>
          <button onClick={this.pauseGame}>Pause</button>
          <button onClick={this.restartGame}>Restart</button>
          <button onClick={this.populateGrid}>Randomize</button>
        </div>
      );
    }
    return <h1>Generating Grid...</h1>;
  }
}

export default App;
