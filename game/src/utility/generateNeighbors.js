function generateNeighbors(array) {
  const length = array.length;
  const graph = {};
  const levelLength = array[0].length;
  for (let i = 0; i < length; i++) {
    let level = array[i];
    let top = i - 1;
    let bottom = i + 1;
    for (let j = 0; j < levelLength; j++) {
      let item = level[j].id;
      graph[item] = new Set();
      let left = j - 1;
      let right = j + 1;
      if (level[left]) {
        graph[item].add(level[left].id);
      }
      if (level[right]) {
        graph[item].add(level[right].id);
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
