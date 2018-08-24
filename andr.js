class Bin {
  constructor(x, maxWeight) {
    this.elem = [x];
    this.totalWeight = x.weight;
    this.cnt = 1;
    this.maxWeight = maxWeight;
    x.bin = this;
  }
  take(elem) {
    const idx = this.elem.indexOf(elem);
    if (idx !== -1) {
      if (elem.bin === this) elem.bin = null;
      this.totalWeight -= elem.weight;
      this.cnt -= 1;
      return this.elem.splice(idx, 1)[0];
    }
    return null;
  }
  add(elem) {
    if (
      elem &&
      this.totalWeight + elem.weight <= this.maxWeight &&
      elem.bin === null
    ) {
      this.elem.push(elem);
      this.totalWeight += elem.weight;
      this.cnt += 1;
      elem.bin = this;
      return true;
    }
    return false;
  }
  getSqrWeight() {
    return this.totalWeight ** 2;
  }
  getSwapItem(id, param) {
    const idx = param < 0 ? this.elem.length - id : id;
    return this.elem[idx];
  }
}

function swap(b1, b2, id1, id2, param) {
  let b1Item = b1.getSwapItem(id1, param);
  let b2Item = b2.getSwapItem(id2, param);
  if (!b1Item && !b2Item) return false;
  const beforeChange = b1.getSqrWeight() + b2.getSqrWeight();

  if (b2Item && !b1Item) {
    b2.take(b2Item);
    const goodAdd = b1.add(b2Item);
    beforeChange, b1.getSqrWeight(), b2.getSqrWeight();
    if (!goodAdd || beforeChange >= b1.getSqrWeight() + b2.getSqrWeight()) {
      b1.take(b2Item);
      b2.add(b2Item);
      return false;
    }
    return true;
  }

  if (!b2Item && b1Item) {
    b1.take(b1Item);
    const goodAdd = b2.add(b1Item);
    if (!goodAdd || beforeChange > b1.getSqrWeight() + b2.getSqrWeight()) {
      b2.take(b1Item);
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

function calulate(items, binMaxWeight) {
  let bins = [];

  items.forEach(x => {
    for (let i = 0; i < bins.length; i += 1) {
      if (bins[i].add(x)) break;
    }
    if (!x.bin) bins.push(new Bin(x, binMaxWeight));
  });

  bins.forEach(bin => bin.elem.sort(({ weight: a }, { weight: b }) => b - a));

  for (let p1 = 0; p1 <= 2; p1 += 1)
    for (let p2 = p1; p2 <= 2; p2 += 1)
      for (let i = 0; i < bins.length - 1; i += 1)
        for (let j = i + 1; j < bins.length; j += 1) {
          swap(bins[i], bins[j], p1, p2, +1);
          // swap(bins[i], bins[j], p1, p2, -1);
        }

  bins = bins.filter(bin => bin.totalWeight > 0.00001);

  return bins;
}

module.exports = calulate;
