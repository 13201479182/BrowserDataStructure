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
  constructor(data, small) {
    this.small = Boolean(small);
    if (data && data.length) {
      this.length = data.length;
      this.data = data;
      this.initHeap();
    } else {
      this.length = 0;
      this.data = [];
    }
    Object.defineProperty(this, "small", {
      get() {
        return Boolean(small);
      },
      set(val) {
        small = Boolean(val);
        this.initHeap();
      }
    });
  }
  static adjustBigHeap(parentIndex, data) {
    let childIndex = 2 * parentIndex + 1;
    if (data[childIndex] && data[childIndex + 1] && data[childIndex + 1] > data[childIndex]) {
      childIndex = childIndex + 1;
    }
    if (data[parentIndex] < data[childIndex]) {
      const temp = data[parentIndex];
      data[parentIndex] = data[childIndex];
      data[childIndex] = temp;
      Heap.adjustBigHeap(childIndex, data);
    }
  }
  static adjustSmallHeap(parentIndex, data) {
    let childIndex = 2 * parentIndex + 1;
    if (data[childIndex] && data[childIndex + 1] && data[childIndex + 1] < data[childIndex]) {
      childIndex = childIndex + 1;
    }
    if (data[parentIndex] > data[childIndex]) {
      const temp = data[parentIndex];
      data[parentIndex] = data[childIndex];
      data[childIndex] = temp;
      Heap.adjustSmallHeap(childIndex, data);
    }
  }
  static adjustInsertBigHeap(index, data) {
    const parentIndex = Math.floor((index - 1) / 2);
    if (data[index] > data[parentIndex]) {
      const temp = data[parentIndex];
      data[parentIndex] = data[index];
      data[index] = temp;
      Heap.adjustInsertBigHeap(parentIndex, data);
    }
  }
  static adjustInsertSmallHeap(index, data) {
    const parentIndex = Math.floor((index - 1) / 2);
    if (data[index] < data[parentIndex]) {
      const temp = data[parentIndex];
      data[parentIndex] = data[index];
      data[index] = temp;
      Heap.adjustInsertSmallHeap(parentIndex, data);
    }
  }
  initHeap() {
    if (!this.data.length) {
      return;
    } else {
      let i = Math.floor((this.data.length - 2) / 2);
      while (i >= 0) {
        this.small ? Heap.adjustSmallHeap(i, this.data) : Heap.adjustBigHeap(i, this.data);
        i--;
      }
      return this;
    }
  }
  insert(num) {
    if (typeof num !== "number") {
      return "insert value only support number";
    } else {
      this.length = this.data.push(num);
      if (this.length > 1) {
        if (this.small) {
          Heap.adjustInsertSmallHeap(this.length - 1, this.data);
        } else {
          Heap.adjustInsertBigHeap(this.length - 1, this.data);
        }
      }
      return this;
    }
  }
};
var global = window;
global.heap = new Heap([3, 10, 19, 8, 6]);
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
var src_default = {
  Heap: heap_default,
  Stack: stack_default
};
//# sourceMappingURL=bundle.cjs.cjs.map
