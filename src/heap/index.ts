import { DataObj, DataItem, HeapData, HeapDataArguments } from './type';

class Heap {
    public data: HeapData;
    public length: number;
    public priority: string;
    public small: boolean;

    /**
     * @param data      数据源
     * @param small     当前堆是否为小堆
     * @param priority  当data中每一项为对象时,此字符串代指其中可以决定堆顺序的key
     */
    constructor(data: HeapDataArguments, small = false, priority?: string) {
        small = this.small = Boolean(small);
        priority = this.priority = priority ? priority : '';

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
                },
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
                },
            },
        });
    }

    /**
     * 调整为大堆
     * @param parentIndex   调整的父节点索引
     * @param data          调整的堆的物理存储
     * @param priority      数据优先级的key值
     */
    static adjustBigHeap(parentIndex: number, data: HeapData, priority: string) {
        const childIndex = 2 * parentIndex + 1;
        let parentPriority = 0;
        let leftPriority = 0;
        let rightPriority = 0;

        let maxChildIndex = childIndex;
        let maxChildPriority = 0;

        // 向下调整堆临界条件为左子节点存在
        if (childIndex >= data.length) return;

        // 更新父节点左右子节点的priority
        if (priority && typeof data[0] === 'object') {
            const parentNode = data[parentIndex] as DataObj;
            const leftNode = data[childIndex] as DataObj;
            const rightNode = data[childIndex + 1] as DataObj;
            parentPriority = parentNode[priority];
            leftPriority = leftNode[priority];
            maxChildPriority = leftPriority;
            rightNode ? (rightPriority = rightNode[priority]) : null;
        } else {
            parentPriority = data[parentIndex] as number;
            leftPriority = data[childIndex] as number;
            maxChildPriority = leftPriority;
            data[childIndex + 1] ? (rightPriority = data[childIndex + 1] as number) : null;
        }

        // 在右子节点优先级大于左子节点优先级的情况下更新maxChildPriority
        if (data[childIndex + 1] && rightPriority > leftPriority) {
            maxChildIndex = childIndex + 1;
            maxChildPriority = rightPriority;
        }

        // 在父节点优先级小于最大子节点优先级的情况下需要递归处理
        if (parentPriority < maxChildPriority) {
            const temp = data[parentIndex];
            data[parentIndex] = data[maxChildIndex];
            data[maxChildIndex] = temp;
            // 递归处理子节点
            Heap.adjustBigHeap(maxChildIndex, data, priority);
        }
    }

    /**
     * 调整为小堆
     * @param parentIndex   调整的父节点索引
     * @param data          调整的堆的物理存储
     * @param priority      数据优先级的key值
     */
    static adjustSmallHeap(parentIndex: number, data: HeapData, priority: string) {
        const childIndex = 2 * parentIndex + 1;
        let parentPriority = 0;
        let leftPriority = 0;
        let rightPriority = 0;

        let minChildIndex = childIndex;
        let minChildPriority = 0;

        // 向下调整堆临界条件为左子节点存在
        if (childIndex >= data.length) return;

        // 更新父节点左右子节点的priority
        if (priority && typeof data[0] === 'object') {
            const parentNode = data[parentIndex] as DataObj;
            const leftNode = data[childIndex] as DataObj;
            const rightNode = data[childIndex + 1] as DataObj;
            parentPriority = parentNode[priority];
            leftPriority = leftNode[priority];
            minChildPriority = leftPriority;
            rightNode ? (rightPriority = rightNode[priority]) : null;
        } else {
            parentPriority = data[parentIndex] as number;
            leftPriority = data[childIndex] as number;
            minChildPriority = leftPriority;
            data[childIndex + 1] ? (rightPriority = data[childIndex + 1] as number) : null;
        }

        // 在右子节点优先级大于左子节点优先级的情况下更新maxChildPriority
        if (data[childIndex + 1] && rightPriority > leftPriority) {
            minChildIndex = childIndex + 1;
            minChildPriority = rightPriority;
        }

        // 在父节点优先级小于最大子节点优先级的情况下需要递归处理
        if (parentPriority < minChildPriority) {
            const temp = data[parentIndex];
            data[parentIndex] = data[minChildIndex];
            data[minChildIndex] = temp;
            // 递归处理子节点
            Heap.adjustBigHeap(minChildIndex, data, priority);
        }
    }

    /**
     * 大堆插入元素后,需要向上递归更新元素位置
     * @param index     待更新元素的索引
     * @param data      调整的堆的物理存储
     * @param priority  数据优先级的key值
     */
    static adjustInsertBigHeap(index: number, data: HeapData, priority: string) {
        const parentIndex = Math.floor((index - 1) / 2);
        let curPriority = 0;
        let parentPriority = 0;

        // 向上调整堆临界条件为节点数小于两个
        if (parentIndex < 2) return;

        // 更新父节点和当前节点优先级
        if (priority && typeof data[0] === 'object') {
            const parentNode = data[parentIndex] as DataObj;
            const curNode = data[index] as DataObj;
            parentPriority = parentNode[priority];
            curPriority = curNode[priority];
        } else {
            parentPriority = data[parentIndex] as number;
            curPriority = data[index] as number;
        }

        // 大堆,仅当当前节点优先级大于父节点时,需要向上调整
        if (curPriority > parentPriority) {
            const temp = data[parentIndex];
            data[parentIndex] = data[index];
            data[index] = temp;
            Heap.adjustInsertBigHeap(parentIndex, data, priority);
        }
    }

    /**
     * 小堆插入元素后,需要向上递归更新元素位置
     * @param index     待更新元素的索引
     * @param data      调整的堆的物理存储
     * @param priority  数据优先级的key值
     */
    static adjustInsertSmallHeap(index: number, data: HeapData, priority: string) {
        const parentIndex = Math.floor((index - 1) / 2);
        let curPriority = 0;
        let parentPriority = 0;

        // 向上调整堆临界条件为节点数小于两个
        if (parentIndex <= 2) return;

        // 更新父节点和当前节点优先级
        if (priority && typeof data[0] === 'object') {
            const parentNode = data[parentIndex] as DataObj;
            const curNode = data[index] as DataObj;
            parentPriority = parentNode[priority];
            curPriority = curNode[priority];
        } else {
            parentPriority = data[parentIndex] as number;
            curPriority = data[index] as number;
        }

        // 小堆,仅当当前节点小于父节点时,需要向上调整
        if (curPriority < parentPriority) {
            const temp = data[parentIndex];
            data[parentIndex] = data[index];
            data[index] = temp;
            Heap.adjustInsertSmallHeap(parentIndex, data, priority);
        }
    }

    // 依据data&small初始化堆
    initHeap() {
        if (this.data.length < 2) {
            return;
        } else {
            // 获取尾节点的父节点索引
            let i = Math.floor((this.data.length - 2) / 2);
            // 依次对i以下的节点进行顺序调整
            while (i >= 0) {
                this.small
                    ? Heap.adjustSmallHeap(i, this.data, this.priority)
                    : Heap.adjustBigHeap(i, this.data, this.priority);
                i--;
            }
            // 返回实例自身,以支持链式操作
            return this;
        }
    }

    // 单个元素插入
    insertElement(item: DataItem) {
        // 容错处理
        if (typeof item !== 'number' && typeof item !== 'object') {
            return console.error('insert error: the element must be a number or object!');
        }
        if (typeof item === 'object' && !item[this.priority]) {
            return console.error(
                'insert error: the element must has priority key when as a object!',
            );
        }

        /**
         * 插入堆核心思路
         * 1. 将元素插入至堆尾部
         * 2. 将元素向上递归晋升
         */
        this.length = this.data.push(item);
        if (this.length > 1) {
            if (this.small) {
                Heap.adjustInsertSmallHeap(this.length - 1, this.data, this.priority);
            } else {
                Heap.adjustInsertBigHeap(this.length - 1, this.data, this.priority);
            }
        }
        // 返回实例自身,以支持链式操作
        return this;
    }

    // 批量插入
    insertElements(numArr: HeapData) {
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
        let result: null | number | DataObj = null;
        const data = this.data;

        if (!data.length) {
            console.error('popMax error: heap is empty now!');
        } else if (data.length === 1) {
            result = data.shift() as DataObj;
        } else {
            /**
             * 出堆核心思路
             * 1. 将首尾元素交换
             * 2. 尾部元素出堆
             * 3. 首部元素递归向下调整顺序
             */
            result = data[0];
            data[0] = data[data.length - 1];
            data.pop();

            this.small
                ? Heap.adjustSmallHeap(0, this.data, this.priority)
                : Heap.adjustBigHeap(0, this.data, this.priority);
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
