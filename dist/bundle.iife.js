"use strict";
(() => {
  // src/heap/Heap.ts
  var Heap = class {
    constructor() {
      console.log("my name is heap!");
    }
  };
  var Heap_default = Heap;

  // src/index.ts
  if (typeof window) {
    window.BDS = {
      Heap: Heap_default
    };
  }
})();
//# sourceMappingURL=bundle.iife.js.map
