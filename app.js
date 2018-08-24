const fs = require("fs");
const path = require("path");

const andreiFuncion = require("./andr");
const ivanFuncion = require("./ivan");

function readData(data) {
  const [count, binMaxWeight, ...rest] = data
    .toString()
    .split("\n")
    .filter(x => x)
    .map(x => Number(x));

  const items = rest
    .map((x, i) => ({ weight: x, id: i, bin: null }))
    .sort(({ weight: a }, { weight: b }) => b - a);

  const time1 = Date.now();
  const andr = andreiFuncion(items, binMaxWeight).length;
  const time2 = Date.now();
  const ivan = ivanFuncion(items, binMaxWeight).length;
  const time3 = Date.now();
  return { andr, ivan, andrTime: time2 - time1, ivanTime: time3 - time2 };
}

const PATH = path.resolve("./input");
const files = fs.readdirSync(PATH);
files
  .map(file => ({ file, data: fs.readFileSync(path.join(PATH, file)) }))
  .map(({ file, data }) => console.log(file, readData(data)));
