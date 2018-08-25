class Bin {
  constructor(x, maxWeight) {
    this.elem = [x];
    this.totalWeight = x.weight;
    this.cnt = 1;
    this.maxWeight = maxWeight;
    this.getBin = () => this;
    x.getBin = this.getBin;
  }

  take(elem) {
    const idx = this.elem.indexOf(elem);
    if (idx !== -1) {
      if (elem.getBin && elem.getBin() === this) elem.getBin = null;
      this.totalWeight -= elem.weight;
      this.cnt -= 1;
      return this.elem.splice(idx, 1)[0];
    }
    return null;
  }

  add(elem) {
    let currentBin = null;
    if (elem.getBin) currentBin = elem.getBin();
    if (elem && this.totalWeight + elem.weight <= this.maxWeight) {
      this.elem.push(elem);
      this.totalWeight += elem.weight;
      this.cnt += 1;
      if (currentBin) {
        currentBin.take(elem);
      }
      elem.getBin = this.getBin;
      return true;
    }
    return false;
  }

  getSqrWeight() {
    return this.totalWeight ** 2;
  }

  getSwapItem(id, param) {
    const idx = param > 0 ? this.elem.length - id : id;
    return this.elem[idx];
  }
}

module.exports = Bin;
