import type { NumberItem, ObjectItem, DataItem, HeapData, HeapDataArguments } from './type';

/**
 * 堆实现
 */
class Heap {
    public data: HeapData;
    public small: boolean;
    public priority: string;

    /**
     * 验证数据合法性和一致性
     *  1. 数组中的每一个元素都为number类型
     *  2. 数组中的每一个元素都为object类型,且其对应的priority值为number类型
     * @param data
     * @param priority
     * @returns boolean
     */
    static validateHeapData(data: HeapData, priority: string) {
        const len = data.length;

        // 不存在元素时,验证通过
        if (len === 0) return true;

        // 依次验证,利用错误终端机制
        for (let i = 0; i < len; i++) {
            Heap.validateDataItem(data[i], priority, i);
        }
        // 验证通过
        return true;
    }

    /**
     * 验证单条数据合法性
     * @param item
     * @param priority
     * @param i
     */
    static validateDataItem(item: DataItem, priority: string, i?: number) {
        const index = typeof i === 'number' ? i : '';
        const msg = index ? `索引为${index}` : '新插入';

        if (priority) {
            // 数据项为对象类型
            item = item as ObjectItem;
            if (typeof item !== 'object') {
                throw new Error(`
                    valid error: 在属性priority提供的情况下,${msg}的元素,必须为对象类型!
                `);
            }
            if (typeof item[priority] !== 'number') {
                throw new Error(
                    `valid error: 在属性priority提供的情况下,${msg}的元素,必须提供属性${priority},且值为number类型!`,
                );
            }
        } else {
            // 数据项为数字类型
            item = item as NumberItem;
            if (typeof item !== 'number') {
                throw new Error(
                    `valid error: 在属性priority未提供的情况下,${msg}的元素,必须是number类型!`,
                );
            }
        }
    }

    /**
     * 计算父节点,左子节点,右子节点的权重且返回
     * @param parentNode
     * @param leftChildrenNode
     * @param rightChildrenNode
     * @param priority
     * @returns
     */
    static calcuPriority(
        parentNode: DataItem,
        leftChildrenNode: DataItem,
        rightChildrenNode: DataItem | undefined,
        priority: string,
    ) {
        let parentPriority: number;
        let leftPriority: number;
        let rightPriority: number | null;

        if (priority) {
            parentNode = parentNode as ObjectItem;
            leftChildrenNode = leftChildrenNode as ObjectItem;
            rightChildrenNode = rightChildrenNode as ObjectItem;
            parentPriority = parentNode[priority];
            leftPriority = leftChildrenNode[priority];
            rightPriority = rightChildrenNode ? rightChildrenNode[priority] : null;
        } else {
            parentNode = parentNode as number;
            leftChildrenNode = leftChildrenNode as number;
            rightChildrenNode = rightChildrenNode as number;
            parentPriority = parentNode;
            leftPriority = leftChildrenNode;
            rightPriority = rightChildrenNode ? rightChildrenNode : null;
        }

        return {
            parentPriority,
            leftPriority,
            rightPriority,
        };
    }

    /**
     * 向下调整父节点
     * @param parentIndex
     * @param data
     * @param priority
     * @param small
     * @returns
     */
    static adjustDownHeap(parentIndex: number, data: HeapData, priority: string, small: boolean) {
        const childIndex = parentIndex * 2 + 1;
        let childExtrenum = 0;
        let childExtrenumIndex = childIndex;

        // 当不存在左子节点时,不需要进行下调
        if (childIndex > data.length - 1) return;

        // 计算且返回父节点,左子节点,右子节点的权重
        const { parentPriority, leftPriority, rightPriority } = Heap.calcuPriority(
            data[parentIndex],
            data[childIndex],
            data[childIndex + 1],
            priority,
        );
        childExtrenum = leftPriority;

        // 更新左右节点中的极值
        if (rightPriority) {
            if (small) {
                // 小堆更新极值为左右节点中最小的
                if (rightPriority < leftPriority) {
                    childExtrenum = rightPriority;
                    childExtrenumIndex = childIndex + 1;
                }
            } else {
                // 大堆更新极值为左右节点中最大的
                if (rightPriority > leftPriority) {
                    childExtrenum = rightPriority;
                    childExtrenumIndex = childIndex + 1;
                }
            }
        }

        // 调整父节点与子节点的位置
        if (small) {
            if (parentPriority > childExtrenum) {
                const temp = data[parentIndex];
                data[parentIndex] = data[childExtrenumIndex];
                data[childExtrenumIndex] = temp;
                // 递归调整交换后的子节点的位置
                Heap.adjustDownHeap(childExtrenumIndex, data, priority, small);
            }
        } else {
            if (parentPriority < childExtrenum) {
                const temp = data[parentIndex];
                data[parentIndex] = data[childExtrenumIndex];
                data[childExtrenumIndex] = temp;
                // 递归处理子节点
                Heap.adjustDownHeap(childExtrenumIndex, data, priority, small);
            }
        }
    }

    /**
     * 向上调整当前节点
     * @param index
     * @param data
     * @param priority
     * @param small
     */
    static adjustUpHeap(index: number, data: HeapData, priority: string, small: boolean) {
        const parentIndex = Math.floor((index - 1) / 2);

        // 向上调整边界为当前节点不是堆顶
        if (index <= 0) return;

        // 获取父节点的权重和当前节点的权重
        const { parentPriority, leftPriority } = Heap.calcuPriority(
            data[parentIndex],
            data[index],
            undefined,
            priority,
        );

        // 依据堆类型来来调整父子节点
        if (small) {
            // 小堆: 父节点权重大时需要向下调整位置
            if (parentPriority > leftPriority) {
                const temp = data[parentIndex];
                data[parentIndex] = data[index];
                data[index] = temp;
                // 递归向上调整父节点位置
                Heap.adjustUpHeap(parentIndex, data, priority, small);
            }
        } else {
            // 小堆: 父节点权重小时需要向下调整位置
            if (parentPriority < leftPriority) {
                const temp = data[parentIndex];
                data[parentIndex] = data[index];
                data[index] = temp;
                // 递归向上调整父节点位置
                Heap.adjustUpHeap(parentIndex, data, priority, small);
            }
        }
    }

    /**
     *
     * @param data      依据data初始化堆
     * @param small     是否为小顶堆
     * @param priority  当data中数据项为对象时,此属性的值决定堆中元素的顺序
     */
    constructor(data?: HeapDataArguments, small?: boolean, priority?: string) {
        // 初始化实例属性
        this.data = [];
        small = this.small = small ? true : false;
        priority = this.priority = priority ? priority : '';

        // 代理small&priority至实例上,变更时构建堆
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
                    }
                },
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
                    }
                },
            },
        });

        // 数据一致性校验
        if (Array.isArray(data) && Heap.validateHeapData(data, priority)) {
            this.data = data;
            this.initHeap(true);
        }
    }

    /**
     * 构建堆思想
     * 1. 找出尾节点的父节点索引
     * 2. 依次对其父节点及其上面的节点进行位置调整
     * 3. 父节点与其左右子节点进行比对,在合适条件下调整
     * 4. 每次调整后需要向下递归调整
     *
     * @param isVerify  在执行此操作前,数据是否经过合法化校验
     */
    initHeap(isVerify = false) {
        const isValid = isVerify ? true : Heap.validateHeapData(this.data, this.priority);
        const data = this.data;

        if (isValid && data.length > 1) {
            // 获取尾节点的父节点索引
            let i = Math.floor((data.length - 2) / 2);
            // 依次对0~i的节点位置调整
            while (i >= 0) {
                Heap.adjustDownHeap(i, data, this.priority, this.small);
                i--;
            }
        }
        // 返回实例自身,以支持链式操作
        return this;
    }

    /**
     * 插入元素核心思路
     * 1. 将元素插入至堆尾部
     * 2. 将元素递归向上调整
     * @param element
     */
    insertElement(element: DataItem) {
        if (!element)
            throw new Error(
                `insert error: insertElement must have a element, that type is number or object!`,
            );

        const data = this.data;

        // 验证element合法性
        Heap.validateDataItem(element, this.priority);

        // 执行插入操作
        data.push(element);
        // 递归向上调整元素
        data.length > 1
            ? Heap.adjustUpHeap(data.length - 1, data, this.priority, this.small)
            : null;
        // 返回实例自身,以支持链式操作
        return this;
    }

    /**
     * 批量插入元素
     * @param elements
     */
    insertElements(elements: HeapData) {
        if (!elements || !Array.isArray(elements))
            throw new Error(`insert error: insertElements argument must be a element array!`);

        // 依次对元素使用插入操作
        elements.forEach((element) => {
            this.insertElement(element);
        });
    }
}

const global: MyGlobal = window;
global.heap = new Heap([3, 10, 19, 8, 6]);

export default Heap;
