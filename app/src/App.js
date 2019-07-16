import React, { Component } from "react";

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

  render() {
    return <div className="App" />;
  }
}

function generateBlocks() {
  const array = [];
  let subArray = [];
  let counter = 0;
  for (let i = 0; i < 400; i++) {
    let object = {
      id: i,
      alive: false
    };
    subArray.push(object);
    counter += 1;
    if (counter === 20) {
      array.push(subArray);
      subArray = [];
      counter = 0;
    }
  }
  return array;
}

function generateNeighbors(array) {
  const length = array.length;
  const graph = {};
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      let object = array[i][j];
      let item = object.id;
      graph[item] = new Set();
      let left = j - 1;
      let right = j + 1;
      let top = i - 1;
      let bottom = i + 1;
      if (array[i][left]) {
        graph[item].add(array[i][left].id);
      }
      if (array[i][right]) {
        graph[item].add(array[i][right].id);
      }
      if (array[top]) {
        graph[item].add(array[top][j].id);
        if (array[top][left]) {
          graph[item].add(array[top][left].id);
        }
        if (array[top][right]) {
          graph[item].add(array[top][right].id);
        }
      }
      if (array[bottom]) {
        graph[item].add(array[bottom][j].id);
        if (array[bottom][left]) {
          graph[item].add(array[bottom][left].id);
        }
        if (array[bottom][right]) {
          graph[item].add(array[bottom][right].id);
        }
      }
    }
  }
  return graph;
}

export default App;
