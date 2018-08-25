const fs = require("fs");
const path = require("path");

const algo = require("./algo");
const ivan = require("./ivan");

const methods = { ...algo /* ivan */ };

const PATH = path.resolve("./test");
// const PATH = path.resolve("./input");
// const PATH = path.resolve("./large");

function readData(data) {
  const [count, binMaxWeight, ...rest] = data
    .toString()
    .split("\n")
    .filter(x => x)
    .map(x => Number(x));

  const items = JSON.stringify(rest.map((x, i) => ({ weight: x, id: i })));

  const results = {};
  Object.entries(methods).forEach(([name, fn]) => {
    const itemsData = JSON.parse(items);
    const timeFrom = Date.now();
    const bins = fn(itemsData, binMaxWeight);
    const delta = Date.now() - timeFrom;
    results[name] = { delta, length: bins.length };
  });

  return results;
}

const files = fs.readdirSync(PATH);
files
  .map(file => ({ file, data: fs.readFileSync(path.join(PATH, file)) }))
  .map(({ file, data }) => {
    console.log("\x1b[33m" + file + "\x1b[0m");
    let before = null;
    Object.entries(readData(data)).forEach(([algoName, val]) => {
      console.log(
        `    ${algoName}: ${val.length}  time: ${val.delta} ${
          val.length !== before && before !== null
            ? "\x1b[31m !!!! \x1b[0m"
            : ""
        }`
      );
      before = val.length;
    });
  });
