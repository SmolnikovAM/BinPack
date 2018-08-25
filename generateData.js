const fs = require("fs");

function data01(CAP, boxs) {
  // const CAP = 100;
  const percent = 0.8;
  const percentMin = 0.1;

  const arr = [];
  for (let i = 0; i < boxs; i += 1) {
    let cap = CAP;
    while (cap) {
      d = ~~(percent * CAP * (Math.random() + percentMin));
      if (cap - d >= 0) {
        arr.push(d);
        cap -= d;
      } else {
        arr.push(cap);
        cap = 0;
      }
    }
  }
  return arr;
}

const cap = 100;
const ans = 7;
const arr = data01(cap, ans).sort(() => Math.random() - 0.5);
const data = `${arr.length}\n${100}\n${arr.join("\n")}`;
fs.writeFileSync(`./test/set_rnd_ans_${ans}_itm_${arr.length}.txt`, data);
