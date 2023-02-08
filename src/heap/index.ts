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

    // 依据small插入数据
    insert(num: number) {
        if (typeof num !== 'number') {
            return 'insert value only support number';
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
}

const global: MyGlobal = window;
global.heap = new Heap([3, 10, 19, 8, 6]);

export default Heap;
