"use strict";
import process from 'process';
import { MinHeap } from '../lib/min-heap.js';
import { logSourceMinHeapProxyHandler } from '../proxies/log-source-proxies.js';

const syncSolution = (logSources, printer) => {
  const logSourceMinHeap = new MinHeap();
  logSourceMinHeap.proxy = new Proxy(logSourceMinHeap.heap, logSourceMinHeapProxyHandler);
  logSourceMinHeap.initialize(logSources.filter(logSource => logSource.last || !logSources.drained));
  while(logSourceMinHeap.peek()){
    const cur = logSourceMinHeap.peek();
    printer.print(cur.last);
    cur.pop();
    if(cur.drained){
      logSourceMinHeap.remove();
    }

    if(!logSourceMinHeap.isMinHeap()){
      logSourceMinHeap.heapify();
    }
  }

  for (const [key,value] of Object.entries(process.memoryUsage())){
      console.log(`Memory usage by ${key}, ${value/1000000}MB `);
  }
  printer.done();
  return console.log("Sync sort complete.");
};

export default syncSolution;