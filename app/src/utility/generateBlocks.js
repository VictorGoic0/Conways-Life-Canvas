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
export default generateBlocks;
