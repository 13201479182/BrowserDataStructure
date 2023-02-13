type DoubleLinkedListData = DataItem[];
type PrevNode = DataItem | null;
type NextNode = DataItem | null;

/**
 * 双向链表节点
 */
class DoubleLinkedListNode {
    public value: DataItem;
    public prev: PrevNode;
    public next: NextNode;

    constructor(value: DataItem, prev: PrevNode, next: NextNode) {
        this.value = value;
        this.next = next || null;
        this.prev = prev || null;
    }
}

/**
 * 双向链表实现
 */
class DoubleLinkedList {}

export default DoubleLinkedList;
