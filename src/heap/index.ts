import { heapData, heapDataArguments } from './type';
class Heap {
    public size: number;
    public small: boolean;
    public data: heapData;

    constructor(data: heapDataArguments, small?: boolean) {
        this.small = Boolean(small);

        if (data && data.length) {
            this.size = data.length;
            this.data = data;
            this.initHeap();
        } else {
            this.size = 0;
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

    // 初始化堆
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
        }
    }
}

export default Heap;
