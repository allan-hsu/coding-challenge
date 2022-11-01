export class MinHeap {
  constructor() {
    this._heap = [];
    this.proxy = null;
  }

  get heap() {
    return this.proxy ? this.proxy : this._heap;
  }

  // O(n) time | O(1) space
  initialize(array = []) {
    array.forEach((value) => this.insert(value));
  }

  // O(log(n)) time | O(1) space
  siftDown(currentIdx, endIdx, heap) {
    let childOneIdx = currentIdx * 2 + 1;
    while (childOneIdx <= endIdx) {
      const childTwoIdx =
        currentIdx * 2 + 2 <= endIdx ? currentIdx * 2 + 2 : -1;
      let idxToSwap;
      if (childTwoIdx !== -1 && heap[childTwoIdx] < heap[childOneIdx]) {
        idxToSwap = childTwoIdx;
      } else {
        idxToSwap = childOneIdx;
      }

      if (heap[idxToSwap] < heap[currentIdx]) {
        this.swap(currentIdx, idxToSwap);
        currentIdx = idxToSwap;
        childOneIdx = currentIdx * 2 + 1;
      } else {
        return;
      }
    }
  }

  siftUp(currentIdx, heap) {
    let parentIdx = Math.floor((currentIdx - 1) / 2);
    while (currentIdx > 0 && heap[currentIdx] < heap[parentIdx]) {
      this.swap(currentIdx, parentIdx);
      currentIdx = parentIdx;
      parentIdx = Math.floor((currentIdx - 1) / 2);
    }
  }

  // O(1)  time | O(1) space
  peek() {
    return this._heap?.[0] ?? false;
  }

  peekSecond() {
    return this._heap?.[1] < this._heap?.[2]
      ? this._heap?.[1]
      : this._heap?.[2] ?? false;
  }

  // O(log(n)) time | O(1) space
  remove() {
    this.swap(0, this.heap.length - 1);
    const valueToRemove = this._heap.pop();
    this.siftDown(0, this.heap.length - 1, this.heap);
    return valueToRemove;
  }

  // O(log(n)) time | O(1) space
  insert(value) {
    if (!value) return;
    this.heap.push(value);
    this.siftUp(this.heap.length - 1, this.heap);
  }

  swap(i, j, heap = this._heap) {
    [heap[i], heap[j]] = [heap[j], heap[i]];
  }

  isMinHeap() {
    const cur = this.heap[0];
    if (!cur) return false;
    const childOne = this.heap[1];
    const childTwo = this.heap[2];
    const isSmallerThanChildOne = !childOne || cur <= childOne;
    const isSmallerThanchildTwo = !childTwo || cur <= childTwo;
    return isSmallerThanChildOne && isSmallerThanchildTwo;
  }

  heapify() {
    this.siftDown(0, this.heap.length - 1, this.heap);
  }
}
