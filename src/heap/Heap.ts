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

        // 依次验证,利用错误中断机制
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
     * @param maxIndex 向下调整时支持的最大索引(边界)
     * @returns
     */
    static adjustDownHeap(
        parentIndex: number,
        data: HeapData,
        priority: string,
        small: boolean,
        maxIndex?: number,
    ) {
        const childIndex = parentIndex * 2 + 1;
        let childExtrenum = 0;
        let childExtrenumIndex = childIndex;

        /**
         * 初始化向下调整的最大边界
         * 1. 不存在最大边界时,最大边界初始化数组的最后一个元素的索引
         * 2. 存在最大边界时,最大边界初始化maxIndex
         * 3. 当元素的左子节点超出最大边界时,不需要向下调整
         */
        maxIndex = typeof maxIndex === 'number' ? maxIndex : data.length - 1;
        if (childIndex > maxIndex) return;

        // 计算且返回父节点,左子节点,右子节点的权重
        const { parentPriority, leftPriority, rightPriority } = Heap.calcuPriority(
            data[parentIndex],
            data[childIndex],
            data[childIndex + 1],
            priority,
        );
        childExtrenum = leftPriority;

        /**
         * 更新极值为右节点的权重
         * 1. 右节点权重存在
         * 2. 右节点索引在最大边界内
         */
        if (rightPriority && childIndex + 1 <= maxIndex) {
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
                Heap.adjustDownHeap(childExtrenumIndex, data, priority, small, maxIndex);
            }
        } else {
            if (parentPriority < childExtrenum) {
                const temp = data[parentIndex];
                data[parentIndex] = data[childExtrenumIndex];
                data[childExtrenumIndex] = temp;
                // 递归处理子节点
                Heap.adjustDownHeap(childExtrenumIndex, data, priority, small, maxIndex);
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
        // 返回实例自身,以支持链式操作
        return this;
    }

    /**
     * 从堆顶移除元素
     * 1. 将首尾元素交换
     * 2. 尾部元素出堆
     * 3. 首部元素递归向下调整顺序
     */
    popElement() {
        const data = this.data;
        const len = data.length;

        if (!len) {
            throw new Error(`'pop error: heap now is empty, popElement is invalid!'`);
        } else if (len === 1) {
            return data.pop();
        } else {
            // 元素个数大于两个
            const temp = data[0];
            data[0] = data[len - 1];
            data[len - 1] = temp;
            // 向下递归调整堆顶的位置
            Heap.adjustDownHeap(0, data, this.priority, this.small, len - 2);

            return data.pop();
        }
    }

    /**
     * 从堆顶批量移除元素
     */
    popElements(count: number) {
        const data = this.data;
        const results: HeapData = [];

        if (typeof count !== 'number' || count < 1)
            return new Error(
                `pop error: popElements argument must be a integer that greater than 0!`,
            );
        if (count > data.length)
            return new Error(`popMaxs error: argument count greater than heap size!`);

        // 执行count次出顶操作,且保存结果集
        for (let i = 0; i < count; i++) {
            const heapTop = this.popElement() as DataItem;
            results.push(heapTop);
        }
        return results;
    }

    /**
     * 堆排序
     * 1. 利用插入排序思想,进行length-1次首尾元素顺序交换
     * 2. 每次交换需要递归调整堆顶的位置
     * 3. 递归调整时不需要考虑已经调整好的元素
     */
    sort() {
        const data = this.data;
        let len = data.length;

        /**
         * 小堆排序: 产生降序,优先级高的可以pop出来
         * 大堆排序: 产生升序,优先级高的可以pop出来
         */
        while (len > 1) {
            // 交换顺序
            const temp = data[0];
            data[0] = data[len - 1];
            data[len - 1] = temp;

            // 向下调整堆顶点位置
            Heap.adjustDownHeap(0, data, this.priority, this.small, len - 2);
            len--;
        }
        // 返回实例自身,以支持链式操作
        return this;
    }

    // 用于动态配置small的方法
    setSmall(val: boolean) {
        this.small = Boolean(val);
        return this;
    }

    // 用于动态配置priority的方法
    setPriority(val: string) {
        if (val) this.priority = String(val);
        return this;
    }
}

export default Heap;
