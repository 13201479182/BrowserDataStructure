"use strict";
(() => {
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
      if (childIndex >= data.length)
        return;
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
      if (childIndex >= data.length)
        return;
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
      if (parentIndex < 0)
        return;
      if (data[index] > data[parentIndex]) {
        const temp = data[parentIndex];
        data[parentIndex] = data[index];
        data[index] = temp;
        Heap.adjustInsertBigHeap(parentIndex, data);
      }
    }
    static adjustInsertSmallHeap(index, data) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (parentIndex < 0)
        return;
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
    insertElement(num) {
      if (typeof num !== "number") {
        console.error("insert error: the element must be a number!");
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
    insertElements(numArr) {
      if (Array.isArray(numArr)) {
        for (let i = 0, l = numArr.length; i < l; i++) {
          if (typeof numArr[i] === "number") {
            this.insertElement(numArr[i]);
          } else {
            console.error(`insert error: the index ${i} must be a number!`);
          }
        }
        return this;
      } else {
        console.error("insert error: the elements must be a number array!");
      }
    }
    popMax() {
      let result = null;
      if (!this.data.length) {
        console.error("popMax error: heap is empty now!");
      } else {
        result = this.data.shift();
        if (this.data.length > 1) {
          const last = this.data.pop();
          this.data.unshift(last);
          this.small ? Heap.adjustSmallHeap(0, this.data) : Heap.adjustBigHeap(0, this.data);
        }
      }
      return result;
    }
    popMaxs(count) {
      const results = [];
      if (typeof count !== "number" || count <= 0) {
        console.error("popMaxs error: argument count must be a integer greater than 0!");
      } else if (count > this.data.length) {
        console.error("popMaxs error: argument count greater than heap size!");
      } else {
        for (let i = 0; i < count; i++) {
          results.push(this.popMax());
        }
      }
      return results;
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
  if (typeof window) {
    window.BDS = {
      Heap: heap_default,
      Stack: stack_default
    };
  }
})();
//# sourceMappingURL=bundle.iife.js.map
