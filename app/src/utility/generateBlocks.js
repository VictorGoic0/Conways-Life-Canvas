function generateBlocks(width, height) {
  const array = new Array(height);
  let subArray = new Array(width);
  let counter = 0;
  let mainCounter = 0;
  const length = width * height;
  for (let i = 0; i < length; i++) {
    let object = {
      id: i,
      alive: false
    };
    subArray[counter] = object;
    counter += 1;
    if (counter === width) {
      array[mainCounter] = subArray;
      subArray = new Array(width);
      counter = 0;
      mainCounter += 1;
    }
  }
  return array;
}
export default generateBlocks;
