// src/heap/index.ts
var Heap = class {
  constructor(data, small = false, priority) {
    small = this.small = Boolean(small);
    priority = this.priority = priority ? priority : "";
    if (data && data.length) {
      this.length = data.length;
      this.data = data;
      this.initHeap();
    } else {
      this.length = 0;
      this.data = [];
    }
    Object.defineProperties(this, {
      small: {
        get() {
          return small;
        },
        set(val) {
          if (val && Boolean(val) !== small) {
            small = Boolean(val);
            this.initHeap();
          }
        }
      },
      priority: {
        get() {
          return priority;
        },
        set(val) {
          if (val && String(val) !== priority) {
            priority = String(val);
            this.initHeap();
          }
        }
      }
    });
  }
  static adjustBigHeap(parentIndex, data, priority, downIndex) {
    const childIndex = 2 * parentIndex + 1;
    let parentPriority = 0;
    let leftPriority = 0;
    let rightPriority = 0;
    let maxChildIndex = childIndex;
    let maxChildPriority = 0;
    if (childIndex >= data.length)
      return;
    if (typeof downIndex === "number" && childIndex > downIndex)
      return;
    if (priority && typeof data[0] === "object") {
      const parentNode = data[parentIndex];
      const leftNode = data[childIndex];
      const rightNode = data[childIndex + 1];
      parentPriority = parentNode[priority];
      leftPriority = leftNode[priority];
      maxChildPriority = leftPriority;
      rightNode ? rightPriority = rightNode[priority] : null;
    } else {
      parentPriority = data[parentIndex];
      leftPriority = data[childIndex];
      maxChildPriority = leftPriority;
      data[childIndex + 1] ? rightPriority = data[childIndex + 1] : null;
    }
    if (data[childIndex + 1] && rightPriority > leftPriority) {
      if (typeof downIndex === "undefined" || typeof downIndex === "number" && childIndex + 1 <= downIndex) {
        maxChildIndex = childIndex + 1;
        maxChildPriority = rightPriority;
      }
    }
    if (parentPriority < maxChildPriority) {
      const temp = data[parentIndex];
      data[parentIndex] = data[maxChildIndex];
      data[maxChildIndex] = temp;
      Heap.adjustBigHeap(maxChildIndex, data, priority, downIndex);
    }
  }
  static adjustSmallHeap(parentIndex, data, priority, downIndex) {
    const childIndex = 2 * parentIndex + 1;
    let parentPriority = 0;
    let leftPriority = 0;
    let rightPriority = 0;
    let minChildIndex = childIndex;
    let minChildPriority = 0;
    if (childIndex >= data.length)
      return;
    if (typeof downIndex === "number" && childIndex > downIndex)
      return;
    if (priority && typeof data[0] === "object") {
      const parentNode = data[parentIndex];
      const leftNode = data[childIndex];
      const rightNode = data[childIndex + 1];
      parentPriority = parentNode[priority];
      leftPriority = leftNode[priority];
      minChildPriority = leftPriority;
      rightNode ? rightPriority = rightNode[priority] : null;
    } else {
      parentPriority = data[parentIndex];
      leftPriority = data[childIndex];
      minChildPriority = leftPriority;
      data[childIndex + 1] ? rightPriority = data[childIndex + 1] : null;
    }
    if (data[childIndex + 1] && rightPriority < leftPriority) {
      if (typeof downIndex === "undefined" || typeof downIndex === "number" && childIndex + 1 <= downIndex) {
        minChildIndex = childIndex + 1;
        minChildPriority = rightPriority;
      }
    }
    if (parentPriority > minChildPriority) {
      const temp = data[parentIndex];
      data[parentIndex] = data[minChildIndex];
      data[minChildIndex] = temp;
      Heap.adjustSmallHeap(minChildIndex, data, priority, downIndex);
    }
  }
  static adjustInsertBigHeap(index, data, priority) {
    const parentIndex = Math.floor((index - 1) / 2);
    let curPriority = 0;
    let parentPriority = 0;
    if (parentIndex < 2)
      return;
    if (priority && typeof data[0] === "object") {
      const parentNode = data[parentIndex];
      const curNode = data[index];
      parentPriority = parentNode[priority];
      curPriority = curNode[priority];
    } else {
      parentPriority = data[parentIndex];
      curPriority = data[index];
    }
    if (curPriority > parentPriority) {
      const temp = data[parentIndex];
      data[parentIndex] = data[index];
      data[index] = temp;
      Heap.adjustInsertBigHeap(parentIndex, data, priority);
    }
  }
  static adjustInsertSmallHeap(index, data, priority) {
    const parentIndex = Math.floor((index - 1) / 2);
    let curPriority = 0;
    let parentPriority = 0;
    if (parentIndex <= 2)
      return;
    if (priority && typeof data[0] === "object") {
      const parentNode = data[parentIndex];
      const curNode = data[index];
      parentPriority = parentNode[priority];
      curPriority = curNode[priority];
    } else {
      parentPriority = data[parentIndex];
      curPriority = data[index];
    }
    if (curPriority < parentPriority) {
      const temp = data[parentIndex];
      data[parentIndex] = data[index];
      data[index] = temp;
      Heap.adjustInsertSmallHeap(parentIndex, data, priority);
    }
  }
  initHeap() {
    if (this.data.length < 2) {
      return;
    } else {
      let i = Math.floor((this.data.length - 2) / 2);
      while (i >= 0) {
        this.small ? Heap.adjustSmallHeap(i, this.data, this.priority) : Heap.adjustBigHeap(i, this.data, this.priority);
        i--;
      }
      return this;
    }
  }
  insertElement(item) {
    if (typeof item !== "number" && typeof item !== "object") {
      return console.error("insert error: the element must be a number or object!");
    }
    if (typeof item === "object" && !item[this.priority]) {
      return console.error(
        "insert error: the element must has priority key when as a object!"
      );
    }
    this.length = this.data.push(item);
    if (this.length > 1) {
      if (this.small) {
        Heap.adjustInsertSmallHeap(this.length - 1, this.data, this.priority);
      } else {
        Heap.adjustInsertBigHeap(this.length - 1, this.data, this.priority);
      }
    }
    return this;
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
  popElement() {
    let result = null;
    const data = this.data;
    if (!data.length) {
      console.error("popMax error: heap is empty now!");
    } else if (data.length === 1) {
      result = data.shift();
    } else {
      result = data[0];
      data[0] = data[data.length - 1];
      data.pop();
      this.small ? Heap.adjustSmallHeap(0, this.data, this.priority) : Heap.adjustBigHeap(0, this.data, this.priority);
    }
    return result;
  }
  popElements(count) {
    const results = [];
    if (typeof count !== "number" || count <= 0) {
      console.error("popMaxs error: argument count must be a integer greater than 0!");
    } else if (count > this.data.length) {
      console.error("popMaxs error: argument count greater than heap size!");
    } else {
      for (let i = 0; i < count; i++) {
        results.push(this.popElement());
      }
    }
    return results;
  }
  sort() {
    const data = this.data;
    let len = data.length;
    while (len > 1) {
      const temp = data[0];
      data[0] = data[len - 1];
      data[len - 1] = temp;
      this.small ? Heap.adjustSmallHeap(0, data, this.priority, len - 2) : Heap.adjustBigHeap(0, data, this.priority, len - 2);
      len--;
    }
    return this;
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
export {
  src_default as default
};
//# sourceMappingURL=bundle.esm.js.map
