"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // src/heap/index.ts
  var heap_exports = {};
  __export(heap_exports, {
    HeapNumber: () => Heap_default,
    HeapObject: () => HeapObject_default
  });

  // src/heap/Heap.ts
  var HeapNumber = class {
  };
  var Heap_default = HeapNumber;

  // src/heap/HeapObject.ts
  var HeapObject = class {
  };
  var HeapObject_default = HeapObject;

  // src/index.ts
  var src_default = {
    ...heap_exports
  };
  if (typeof window) {
    window.BDS = {
      Heap: heap_exports
    };
  }
})();
//# sourceMappingURL=bundle.iife.js.map
