"use strict";

import { MinHeap } from "../lib/min-heap.js";
import { logEntryMinHeapProxyHandler } from "../proxies/log-source-proxies.js";

// This controls ratio of min heap size we print so we don't run out of memory
// Mathematically this can not be too big as we will print in wrong order before
// older dates are added to the heap
const PRINT_RATIO = 0.2; 

const runPopAsync = async (array, minHeap) => {
  return Promise.all(
    array.map((item) =>
      item.popAsync().then((result) => {
        const secondMin = minHeap.peekSecond();
        if (secondMin && result.date <= secondMin.date) {
          return item;
        }
        minHeap.insert(result);
        return null;
      })
    )
  );
};

const asyncSolution = async (logSources, printer) => {
  let filteredLogSources = logSources.filter(
    (logSource) => logSource.last || !logSources.drained
  );
  const logPrintMinHeap = new MinHeap();
  logPrintMinHeap.proxy = new Proxy(
    logPrintMinHeap.heap,
    logEntryMinHeapProxyHandler
  );
  logPrintMinHeap.initialize(filteredLogSources.map((i) => i.last));

  while (logPrintMinHeap.peek() || filteredLogSources.length) {
    await runPopAsync(filteredLogSources, logPrintMinHeap).then(
      async (result) => {
        const subTasks = result.filter((i) => i);
        if (subTasks.length) {
          await runPopAsync(subTasks, logPrintMinHeap);
        }
      }
    );
    for (let i = 0; i < Math.floor(filteredLogSources.length*PRINT_RATIO); ++i) {
      const cur = logPrintMinHeap.remove();
      if (!cur) break;
      printer.print(cur);
    }
    filteredLogSources = filteredLogSources.filter((item) => !item.drained);
    if (!filteredLogSources.length) {
      while (logPrintMinHeap.peek()) printer.print(logPrintMinHeap.remove());
    }
  }
  for (const [key, value] of Object.entries(process.memoryUsage())) {
    console.log(`Memory usage by ${key}, ${value / 1000000}MB `);
  }
  printer.done();
  return Promise.resolve(console.log("Async sort complete."));
};

export default asyncSolution;