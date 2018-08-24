function calculate(items, maxBoxWeight) {
  function compactBoxes() {
    let totalActions = 0;
    let actions;
    do {
      actions = 0;
      boxes.slice().sort((a, b) => a.weight - b.weight);
      boxes.forEach((box1, index1) => {
        spaceLeft = maxBoxWeight - box1.weight;
        let box,
          item,
          boxes1 = boxes.slice(index1 + 1);
        do {
          boxes1.forEach((box2, index2) => {
            box2.items.sort((a, b) => a.weight - b.weight);
            let item2 = box2.items.find(item => item.weight < spaceLeft);
            if (item2 && (!item || item2.weight > item.weight)) {
              box = box2;
              item = item2;
            }
          });
          if (item) {
            box.items.splice(box.items.indexOf(item), 1);
            box.weight -= item.weight;
            box1.weight += item.weight;
            box1.items.push(item);
            actions++;
          }
        } while (item);
      });
      totalActions += actions;
    } while (actions);
    return totalActions;
  }

  function calc() {
    // console.clear();
    // reset the boxes
    boxes = [];
    // create items
    let box;
    // items = new Array(
    //   Math.round(Math.random() * (maxItems - minItems) + minItems)
    // )
    //   .fill(0)
    //   .map((n, index) => ({
    //     id: index,
    //     weight: +(
    //       Math.random() * (maxItemSize - minItemSize) +
    //       minItemSize
    //     ).toFixed(3)
    //   })),
    let itemsWeight = +items
      .reduce((acc, item) => acc + item.weight, 0)
      .toFixed(3);
    let minBoxesCount = Math.ceil(itemsWeight / maxBoxWeight);

    items.forEach(item => {
      if (!box || box.weight + item.weight > maxBoxWeight) {
        boxes.push((box = { weight: 0, items: [] }));
      }
      box.weight = +(box.weight + item.weight).toFixed(3);
      box.items.push(item);
    });
    // console.log("itemsWeight:", itemsWeight);
    // console.log('items:', items);
    // console.log('boxes:', boxes);
    // console.log("min boxes1:", minBoxesCount);
    // console.log("extra boxes1:", boxes.length - minBoxesCount);

    // sort the items so descending
    items.sort((a, b) => b.weight - a.weight);
    // reset the boxes
    boxes = [];
    // add items to boxes
    items.forEach(item => {
      let box;
      do {
        box = boxes.find(box => box.weight + item.weight < maxBoxWeight);
      } while (boxes.length && (!box && compactBoxes()));
      // console.log('box', box);
      if (box) {
        box.items.push(item);
        box.weight += item.weight;
      } else {
        // console.log('add box');
        boxes.push({ weight: item.weight, items: [item] });
      }
    });

    // console.log("items:", items.reduce((a, { weight }) => weight + a, 0));
    // console.log(
    //   "boxes:",
    //   // JSON.stringify(boxes),
    //   boxes.reduce((a, { weight }) => weight + a, 0)
    // );
    // console.log("min boxes2:", minBoxesCount);
    // console.log("extra boxes2:", boxes.length - minBoxesCount);
    // console.log(boxes.map(({ weight }) => weight));
    return boxes;
  }

  let boxes;

  return calc();
}

module.exports = calculate;
