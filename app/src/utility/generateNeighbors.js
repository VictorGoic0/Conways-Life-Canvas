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

export default generateNeighbors;
