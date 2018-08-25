const Bin = require("./bin.class");

function swap(b1, b2, id1, id2, param) {
  let b1Item = b1.getSwapItem(id1, param);
  let b2Item = b2.getSwapItem(id2, param);
  if (!b1Item && !b2Item) return false;
  const beforeChange = b1.getSqrWeight() + b2.getSqrWeight();

  if (b2Item && !b1Item) {
    const goodAdd = b1.add(b2Item);
    beforeChange, b1.getSqrWeight(), b2.getSqrWeight();
    if (!goodAdd || beforeChange >= b1.getSqrWeight() + b2.getSqrWeight()) {
      b2.add(b2Item);
      return false;
    }
    return true;
  }

  if (!b2Item && b1Item) {
    const goodAdd = b2.add(b1Item);
    if (!goodAdd || beforeChange > b1.getSqrWeight() + b2.getSqrWeight()) {
      b1.add(b1Item);
      return false;
    }
    return true;
  }

  if (b2Item && b1Item) {
    b1.take(b1Item);
    b2.take(b2Item);
    let goodAdd = b1.add(b2Item);
    goodAdd &= b2.add(b1Item);
    if (
      !goodAdd ||
      beforeChange + 0.00001 > b1.getSqrWeight() + b2.getSqrWeight()
    ) {
      b2.take(b1Item);
      b1.take(b2Item);
      b2.add(b2Item);
      b1.add(b1Item);
      return false;
    }
    return true;
  }
}

function swapAlgo(items, binMaxWeight) {
  let bins = FFD(items, binMaxWeight);
  console.log(bins.map(({ totalWeight }) => totalWeight).join(", "));
  bins.forEach(bin => bin.elem.sort(({ weight: a }, { weight: b }) => b - a));
  bins.sort(({ totalWeight: a }, { totalWeight: b }) => b - a);
  for (let m = 0; m < 2; m += 1)
    for (let p1 = 0; p1 <= 2; p1 += 1)
      for (let p2 = 0; p2 <= 2; p2 += 1)
        for (let i = 1; i < bins.length - 1; i += 1)
          for (let j = i + 1; j < bins.length; j += 1) {
            swap(bins[i], bins[j], p1, p2, +1);
          }

  for (let i = bins.length - 1; i >= 0; i -= 1)
    if (bins[i].totalWeight <= 0.0001) bins.splice(i, 1);

  console.log(bins.map(({ totalWeight }) => totalWeight).join(", "));
  return bins;
}

function FFD(items, binMaxWeight) {
  items.sort(({ weight: a }, { weight: b }) => b - a);
  const bins = [];
  items.forEach(x => {
    let pushFlag;
    for (let i = 0; i < bins.length; i += 1) {
      pushFlag = bins[i].add(x);
      if (pushFlag) break;
    }
    if (!pushFlag) bins.push(new Bin(x, binMaxWeight));
  });
  return bins;
}

function BFD(items, binMaxWeight) {
  items.sort(({ weight: a }, { weight: b }) => b - a);
  const bins = [];
  items.forEach(x => {
    bins.sort(({ totalWeight: a }, { totalWeight: b }) => b - a);
    let pushFlag;
    for (let i = 0; i < bins.length; i += 1) {
      pushFlag = bins[i].add(x);
      if (pushFlag) break;
    }
    if (!pushFlag) bins.push(new Bin(x, binMaxWeight));
  });
  return bins;
}

module.exports = { FFD, BFD, swapAlgo };
