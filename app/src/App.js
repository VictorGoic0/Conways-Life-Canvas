import React, { Component } from "react";

class App extends Component {
  state = {
    blocks: []
  };
  componentDidMount() {
    const blocks = generateBlocks();
    this.setState({
      blocks: blocks
    });
  }

  render() {
    return <div className="App" />;
  }
}

function generateBlocks() {
  const array = new Array(400);
  for (let i = 0; i < 400; i++) {
    let object = {
      id: i,
      alive: false
    };
    array[i] = object;
  }
  return array;
}

export default App;
