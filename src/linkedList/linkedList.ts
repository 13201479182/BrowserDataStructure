type LinkedListData = DataItem[];
type NextNode = DataItem | null;

/**
 * 单向链表节点
 */
class LinkedListNode {
    public value: DataItem;
    public next: NextNode;

    constructor(value: DataItem, next: NextNode) {
        this.value = value;
        this.next = next || null;
    }
}

/**
 * 单向链表实现
 */
class LinkedList {}

export default LinkedList;
