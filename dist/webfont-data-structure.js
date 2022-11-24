"use strict";
(() => {
  // src/heap/index.ts
  var Heap = class {
    constructor() {
      console.log("Heap");
    }
  };
  var heap_default = {
    Heap
  };

  // src/stack/index.ts
  var Stack = class {
    constructor() {
      console.log("Stack");
    }
  };
  var stack_default = {
    Stack
  };

  // src/index.ts
  var dataStructor = {
    ...heap_default,
    ...stack_default
  };
  if (typeof window) {
    const extendWindow = window;
    extendWindow.dataStructor = dataStructor;
  }
})();
//# sourceMappingURL=webfont-data-structure.js.map
