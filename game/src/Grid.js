import React, { Component } from "react";

class Grid extends Component {
  setPixels = () => {
    const blocks = this.props.blocks;
    const coordinates = [];
    const length = blocks.length;
    // const canvas = this.refs.canvas;
    // const ctx = canvas.getContext("2d");
    // const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    // const w = imageData.width; // Conveniently the width is here
    // const h = imageData.height;
    // let x = 0;
    // let y = 0;
    for (let i = 0; i < length; i++) {
      let current = this.props.blocks[i];
      if (current.alive) {
        let set = [current.x, current.y];
        coordinates.push(set);
      }
    }
    console.log(coordinates);
    // Compute index within the array
    // const index = (w * y + x) * 4;
  };
  render() {
    this.setPixels();
    return (
      <div className="grid-container">
        <canvas ref="canvas" width={600} height={600} />
      </div>
    );
  }
}

export default Grid;
