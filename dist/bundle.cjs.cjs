"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  default: () => src_default
});
module.exports = __toCommonJS(src_exports);

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
//# sourceMappingURL=bundle.cjs.cjs.map
