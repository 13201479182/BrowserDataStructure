type LinkedListData = DataItem[];
type LinkedListConstructorData = LinkedListData | undefined;

/**
 * 链表对应的每个节点
 */
class LinkedNodeList {
    public value: DataItem;
    public next: DataItem;

    constructor(value: DataItem, next: DataItem) {
        this.value = value;
        this.next = next;
    }
}

/**
 * 链表实现
 */
class LinkedList {}

export default LinkedList;
