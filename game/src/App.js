import React, { Component } from "react";
import Grid from "./Grid";
import Timer from "./Timer";
import generateBlocks from "./utility/generateBlocks";
import generateNeighbors from "./utility/generateNeighbors";
import randomNumber from "./utility/randomNumber";

class App extends Component {
  state = {
    blocks: [],
    nextBlocks: [],
    neighbors: {},
    generation: 0,
    paused: false,
    timer: 50
  };
  componentDidMount() {
    this.initializeGrid();
  }

  toggleBlock = id => {
    if (this.state.generation === 0) {
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
        }),
        nextBlocks: this.state.blocks.map(block => {
          if (block.id === id) {
            return {
              ...block,
              alive: !block.alive
            };
          }
          return block;
        })
      });
    }
  };

  initializeGrid() {
    const blocks = generateBlocks(20, 20);
    const flattened = blocks.reduce((acc, val) => acc.concat(val));
    const neighbors = generateNeighbors(blocks);
    this.setState({
      ...this.state,
      blocks: flattened,
      nextBlocks: flattened,
      neighbors
    });
  }

  beginGame = () => {
    if (this.state.generation === 0) {
      const nextBuffer = this.nextGrid(this.state.blocks, this.state.neighbors);
      this.setState({
        ...this.state,
        paused: false,
        nextBlocks: nextBuffer
      });
      const timer = setInterval(() => {
        if (this.state.paused) {
          clearInterval(timer);
        }
        this.switchBuffers();
        const { blocks, neighbors } = this.state;
        const newBlocks = this.nextGrid(blocks, neighbors);
        this.setState({
          ...this.state,
          nextBlocks: newBlocks
        });
      }, this.state.timer);
    } else if (this.state.generation > 0 && this.state.paused) {
      this.setState({
        ...this.state,
        paused: false
      });
      const timer = setInterval(() => {
        if (this.state.paused) {
          clearInterval(timer);
        }
        this.switchBuffers();
        const { blocks, neighbors } = this.state;
        const newBlocks = this.nextGrid(blocks, neighbors);
        this.setState({
          ...this.state,
          nextBlocks: newBlocks
        });
      }, this.state.timer);
    }
  };

  stepForward = () => {
    const { blocks, neighbors } = this.state;
    const newBlocks = this.nextGrid(blocks, neighbors);
    this.setState({
      ...this.state,
      nextBlocks: newBlocks,
      paused: true
    });
    this.switchBuffers();
  };

  nextGrid = (blocks, neighbors) => {
    return blocks.map(block => {
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
  };

  switchBuffers = () => {
    this.setState(prevState => ({
      ...prevState,
      blocks: prevState.nextBlocks,
      generation: prevState.generation + 1
    }));
  };

  restartGame = () => {
    if (this.state.paused) {
      const blocks = generateBlocks(20, 20);
      const flattened = blocks.reduce((acc, val) => acc.concat(val));
      this.setState({
        ...this.state,
        blocks: flattened,
        nextBlocks: flattened,
        generation: 0,
        paused: false
      });
    } else {
      const blocks = generateBlocks(20, 20);
      const flattened = blocks.reduce((acc, val) => acc.concat(val));
      this.setState({
        ...this.state,
        blocks: flattened,
        nextBlocks: flattened,
        generation: -1,
        paused: true
      });
    }
  };

  pauseGame = () => {
    this.setState({
      paused: !this.state.paused
    });
  };

  populateGrid = () => {
    const { blocks, generation } = this.state;
    if (generation === 0) {
      const randomNumbers = randomNumber(Date.now(), blocks.length);
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
        blocks: newBlocks,
        nextBlocks: newBlocks
      }));
    }
  };

  changeHandler = e => {
    e.preventDefault();
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { blocks, generation, timer } = this.state;
    if (blocks.length > 0) {
      return (
        <div className="app-container">
          <h4>Generation number: {generation}</h4>
          <Grid blocks={blocks} toggleBlock={this.toggleBlock} />
          <div className="buttons">
            <button onClick={this.beginGame}>Start</button>
            <button onClick={this.pauseGame}>Pause</button>
            <button onClick={this.stepForward}>Step</button>
            <button onClick={this.restartGame}>Restart</button>
            <button onClick={this.populateGrid}>Randomize</button>
          </div>
          <Timer timer={timer} changeHandler={this.changeHandler} />
        </div>
      );
    }
    return <h1>Generating Grid...</h1>;
  }
}

export default App;
