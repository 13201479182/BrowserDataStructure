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
var Heap = class {
  constructor() {
    console.log("Heap");
  }
};
var heap_default = Heap;

// src/stack/index.ts
var Stack = class {
  constructor() {
    console.log("Stack");
  }
  add(num1, num2) {
    return num1 + num2;
  }
};
var stack_default = Stack;

// src/index.ts
var dataStructor = {
  Heap: heap_default,
  Stack: stack_default
};
var src_default = dataStructor;
//# sourceMappingURL=bundle.cjs.cjs.map
