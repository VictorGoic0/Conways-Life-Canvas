const randomNumber = (seed, max) => {
  function random(seed) {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  }
  let array = new Array(Math.round(max / 3));
  const length = array.length;
  for (let i = 0; i < length; i++) {
    const num = Math.round(random(seed + i) * max);
    array[i] = num;
  }
  return array;
};

export default randomNumber;
