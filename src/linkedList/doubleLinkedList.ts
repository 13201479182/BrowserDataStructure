/* eslint-disable  @typescript-eslint/no-explicit-any */
type DataItem = any;
type ListNode = DoubleLinkedListNode | null;

/**
 * 双向链表节点
 */
class DoubleLinkedListNode {
    public value: DataItem;
    public prev: ListNode;
    public next: ListNode;

    constructor(value: DataItem, prev: ListNode, next: ListNode) {
        this.value = value;
        this.prev = prev || null;
        this.next = next || null;
    }
}

/**
 * 双向链表实现
 */
class DoubleLinkedList {
    public length: number;
    public head: ListNode;
    public tail: ListNode;

    constructor() {
        this.length = 0;
        this.head = null;
        this.tail = null;
    }
}

export default DoubleLinkedList;
