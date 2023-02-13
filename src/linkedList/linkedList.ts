/* eslint-disable  @typescript-eslint/no-explicit-any */
type DataItem = any;
type ListNode = LinkedListNode | null;

/**
 * 单向链表节点
 */
class LinkedListNode {
    public value: DataItem;
    public next: ListNode;

    constructor(value: DataItem, next: ListNode) {
        this.value = value;
        this.next = next || null;
    }
}

/**
 * 单向链表实现
 */
class LinkedList {
    public length: number;
    public head: ListNode;

    constructor() {
        this.length = 0;
        this.head = null;
    }
}

export default LinkedList;
