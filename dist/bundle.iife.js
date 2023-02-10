"use strict";
(() => {
  // src/heap/Heap.ts
  var Heap = class {
    static validateHeapData(data, priority) {
      const len = data.length;
      if (len === 0)
        return true;
      for (let i = 0; i < len; i++) {
        Heap.validateDataItem(data[i], priority, i);
      }
      return true;
    }
    static validateDataItem(item, priority, i) {
      const index = typeof i === "number" ? i : "";
      const msg = index ? `\u7D22\u5F15\u4E3A${index}` : "\u65B0\u63D2\u5165";
      if (priority) {
        item = item;
        if (typeof item !== "object") {
          throw new Error(`
                    valid error: \u5728\u5C5E\u6027priority\u63D0\u4F9B\u7684\u60C5\u51B5\u4E0B,${msg}\u7684\u5143\u7D20,\u5FC5\u987B\u4E3A\u5BF9\u8C61\u7C7B\u578B!
                `);
        }
        if (typeof item[priority] !== "number") {
          throw new Error(
            `valid error: \u5728\u5C5E\u6027priority\u63D0\u4F9B\u7684\u60C5\u51B5\u4E0B,${msg}\u7684\u5143\u7D20,\u5FC5\u987B\u63D0\u4F9B\u5C5E\u6027${priority},\u4E14\u503C\u4E3Anumber\u7C7B\u578B!`
          );
        }
      } else {
        item = item;
        if (typeof item !== "number") {
          throw new Error(
            `valid error: \u5728\u5C5E\u6027priority\u672A\u63D0\u4F9B\u7684\u60C5\u51B5\u4E0B,${msg}\u7684\u5143\u7D20,\u5FC5\u987B\u662Fnumber\u7C7B\u578B!`
          );
        }
      }
    }
    static calcuPriority(parentNode, leftChildrenNode, rightChildrenNode, priority) {
      let parentPriority;
      let leftPriority;
      let rightPriority;
      if (priority) {
        parentNode = parentNode;
        leftChildrenNode = leftChildrenNode;
        rightChildrenNode = rightChildrenNode;
        parentPriority = parentNode[priority];
        leftPriority = leftChildrenNode[priority];
        rightPriority = rightChildrenNode ? rightChildrenNode[priority] : null;
      } else {
        parentNode = parentNode;
        leftChildrenNode = leftChildrenNode;
        rightChildrenNode = rightChildrenNode;
        parentPriority = parentNode;
        leftPriority = leftChildrenNode;
        rightPriority = rightChildrenNode ? rightChildrenNode : null;
      }
      return {
        parentPriority,
        leftPriority,
        rightPriority
      };
    }
    static adjustDownHeap(parentIndex, data, priority, small) {
      const childIndex = parentIndex * 2 + 1;
      let childExtrenum = 0;
      let childExtrenumIndex = childIndex;
      if (childIndex > data.length - 1)
        return;
      const { parentPriority, leftPriority, rightPriority } = Heap.calcuPriority(
        data[parentIndex],
        data[childIndex],
        data[childIndex + 1],
        priority
      );
      childExtrenum = leftPriority;
      if (rightPriority) {
        if (small) {
          if (rightPriority < leftPriority) {
            childExtrenum = rightPriority;
            childExtrenumIndex = childIndex + 1;
          }
        } else {
          if (rightPriority > leftPriority) {
            childExtrenum = rightPriority;
            childExtrenumIndex = childIndex + 1;
          }
        }
      }
      if (small) {
        if (parentPriority > childExtrenum) {
          const temp = data[parentIndex];
          data[parentIndex] = data[childExtrenumIndex];
          data[childExtrenumIndex] = temp;
          Heap.adjustDownHeap(childExtrenumIndex, data, priority, small);
        }
      } else {
        if (parentPriority < childExtrenum) {
          const temp = data[parentIndex];
          data[parentIndex] = data[childExtrenumIndex];
          data[childExtrenumIndex] = temp;
          Heap.adjustDownHeap(childExtrenumIndex, data, priority, small);
        }
      }
    }
    static adjustUpHeap(index, data, priority, small) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (index <= 0)
        return;
      const { parentPriority, leftPriority } = Heap.calcuPriority(
        data[parentIndex],
        data[index],
        void 0,
        priority
      );
      if (small) {
        if (parentPriority > leftPriority) {
          const temp = data[parentIndex];
          data[parentIndex] = data[index];
          data[index] = temp;
          Heap.adjustUpHeap(parentIndex, data, priority, small);
        }
      } else {
        if (parentPriority < leftPriority) {
          const temp = data[parentIndex];
          data[parentIndex] = data[index];
          data[index] = temp;
          Heap.adjustUpHeap(parentIndex, data, priority, small);
        }
      }
    }
    constructor(data, small, priority) {
      this.data = [];
      small = this.small = small ? true : false;
      priority = this.priority = priority ? priority : "";
      Object.defineProperties(this, {
        small: {
          get() {
            return small;
          },
          set(newVal) {
            newVal = Boolean(newVal);
            if (small !== newVal) {
              small = newVal;
              this.initHeap();
              return this;
            }
          }
        },
        priority: {
          get() {
            return priority;
          },
          set(newVal) {
            newVal = String(newVal);
            if (newVal && priority !== newVal) {
              priority = newVal;
              this.initHeap();
              return this;
            }
          }
        }
      });
      if (Array.isArray(data) && Heap.validateHeapData(data, priority)) {
        this.data = data;
        this.initHeap(true);
      }
    }
    initHeap(isVerify = false) {
      const isValid = isVerify ? true : Heap.validateHeapData(this.data, this.priority);
      const data = this.data;
      if (isValid && data.length > 1) {
        let i = Math.floor((data.length - 2) / 2);
        while (i >= 0) {
          Heap.adjustDownHeap(i, data, this.priority, this.small);
          i--;
        }
      }
      return this;
    }
    insertElement(element) {
      if (!element)
        throw new Error(
          `insert error: insertElement must have a element, that type is number or object!`
        );
      const data = this.data;
      Heap.validateDataItem(element, this.priority);
      data.push(element);
      data.length > 1 ? Heap.adjustUpHeap(data.length - 1, data, this.priority, this.small) : null;
      return this;
    }
  };
  var global = window;
  global.heap = new Heap([3, 10, 19, 8, 6]);
  var Heap_default = Heap;

  // src/index.ts
  if (typeof window) {
    window.BDS = {
      Heap: Heap_default
    };
  }
})();
//# sourceMappingURL=bundle.iife.js.map
