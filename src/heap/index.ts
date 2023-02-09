import { heapData, heapDataArguments } from './type';
class Heap {
    public length: number;
    public small: boolean;
    public data: heapData;

    constructor(data: heapDataArguments, small?: boolean) {
        this.small = Boolean(small);

        if (data && data.length) {
            this.length = data.length;
            this.data = data;
            this.initHeap();
        } else {
            this.length = 0;
            this.data = [];
        }

        Object.defineProperty(this, 'small', {
            get() {
                return Boolean(small);
            },
            set(val) {
                small = Boolean(val);
                this.initHeap();
            },
        });
    }

    /**
     * 调整为大堆
     * @param parentIndex   调整的父节点索引
     * @param data          调整的堆的物理存储
     */
    static adjustBigHeap(parentIndex: number, data: heapData) {
        let childIndex = 2 * parentIndex + 1;

        // 向下调整堆临界条件为左子节点存在
        if (childIndex >= data.length) return;

        // 在右子节点大于左子节点的情况下更新childIndex为右子节点的索引
        if (data[childIndex] && data[childIndex + 1] && data[childIndex + 1] > data[childIndex]) {
            childIndex = childIndex + 1;
        }

        // 在父节点小于子节点的情况下需要递归处理
        if (data[parentIndex] < data[childIndex]) {
            const temp = data[parentIndex];
            data[parentIndex] = data[childIndex];
            data[childIndex] = temp;
            // 递归处理子节点
            Heap.adjustBigHeap(childIndex, data);
        }
    }

    /**
     * 调整为小堆
     * @param parentIndex   调整的父节点索引
     * @param data          调整的堆的物理存储
     */
    static adjustSmallHeap(parentIndex: number, data: heapData) {
        let childIndex = 2 * parentIndex + 1;

        // 向下调整堆临界条件为子节点存在
        if (childIndex >= data.length) return;

        // 在右子节点小于左子节点的情况下更新childIndex为右子节点的索引
        if (data[childIndex] && data[childIndex + 1] && data[childIndex + 1] < data[childIndex]) {
            childIndex = childIndex + 1;
        }

        // 在父节点大于子节点的情况下需要递归处理
        if (data[parentIndex] > data[childIndex]) {
            const temp = data[parentIndex];
            data[parentIndex] = data[childIndex];
            data[childIndex] = temp;
            // 递归处理子节点
            Heap.adjustSmallHeap(childIndex, data);
        }
    }

    /**
     * 大堆插入元素后,需要向上递归更新元素位置
     * @param index 待更新元素的索引
     * @param data  调整的堆的物理存储
     */
    static adjustInsertBigHeap(index: number, data: heapData) {
        const parentIndex = Math.floor((index - 1) / 2);

        // 向上调整堆临界条件为父节点存在
        if (parentIndex < 0) return;

        // 大堆,仅当子节点大于父节点时,需要向上调整
        if (data[index] > data[parentIndex]) {
            const temp = data[parentIndex];
            data[parentIndex] = data[index];
            data[index] = temp;
            Heap.adjustInsertBigHeap(parentIndex, data);
        }
    }

    /**
     * 小堆插入元素后,需要向上递归更新元素位置
     * @param index 待更新元素的索引
     * @param data  调整的堆的物理存储
     */
    static adjustInsertSmallHeap(index: number, data: heapData) {
        const parentIndex = Math.floor((index - 1) / 2);

        // 向上调整堆临界条件为父节点存在
        if (parentIndex < 0) return;

        // 小堆,仅当子节点小于父节点时,需要向上调整
        if (data[index] < data[parentIndex]) {
            const temp = data[parentIndex];
            data[parentIndex] = data[index];
            data[index] = temp;
            Heap.adjustInsertSmallHeap(parentIndex, data);
        }
    }

    // 依据data&small初始化堆
    initHeap() {
        if (!this.data.length) {
            return;
        } else {
            // 获取尾节点的父节点索引
            let i = Math.floor((this.data.length - 2) / 2);
            // 依次对i以下的节点进行顺序调整
            while (i >= 0) {
                this.small ? Heap.adjustSmallHeap(i, this.data) : Heap.adjustBigHeap(i, this.data);
                i--;
            }
            // 返回实例自身,以支持链式操作
            return this;
        }
    }

    // 单个元素插入
    insertElement(num: number) {
        if (typeof num !== 'number') {
            console.error('insert error: the element must be a number!');
        } else {
            this.length = this.data.push(num);

            if (this.length > 1) {
                if (this.small) {
                    Heap.adjustInsertSmallHeap(this.length - 1, this.data);
                } else {
                    Heap.adjustInsertBigHeap(this.length - 1, this.data);
                }
            }
            // 返回实例自身,以支持链式操作
            return this;
        }
    }

    // 批量插入
    insertElements(numArr: number[]) {
        if (Array.isArray(numArr)) {
            for (let i = 0, l = numArr.length; i < l; i++) {
                if (typeof numArr[i] === 'number') {
                    this.insertElement(numArr[i]);
                } else {
                    console.error(`insert error: the index ${i} must be a number!`);
                }
            }
            return this;
        } else {
            console.error('insert error: the elements must be a number array!');
        }
    }

    // 单次堆顶出堆
    popMax() {
        let result: null | number = null;

        if (!this.data.length) {
            console.error('popMax error: heap is empty now!');
        } else {
            result = this.data.shift() as number;

            if (this.data.length > 1) {
                const last = this.data.pop() as number;
                // 将尾部元素移动至首部
                this.data.unshift(last);
                // 向下调整根节点元素
                this.small ? Heap.adjustSmallHeap(0, this.data) : Heap.adjustBigHeap(0, this.data);
            }
        }
        return result;
    }

    // 多次堆顶出堆
    popMaxs(count: number) {
        const results = [];

        if (typeof count !== 'number' || count <= 0) {
            console.error('popMaxs error: argument count must be a integer greater than 0!');
        } else if (count > this.data.length) {
            console.error('popMaxs error: argument count greater than heap size!');
        } else {
            for (let i = 0; i < count; i++) {
                results.push(this.popMax());
            }
        }
        return results;
    }
}

const global: MyGlobal = window;
global.heap = new Heap([3, 10, 19, 8, 6]);

export default Heap;
