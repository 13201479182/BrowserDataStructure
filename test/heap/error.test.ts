// 当前文件用于堆的错误测试
import { Heap } from '../../src/index';

let count = 1;
describe('heap:error test possible error in Heap', () => {
    test(`${count++}. 测试在配置priorty属性的情况,向堆中插入number`, () => {
        const heap = new Heap([], false, 'age');
        expect(() => heap.insertElement(1)).toThrow(
            'valid error: 在属性priority提供的情况下,新插入的元素,必须为对象类型!',
        );
    });

    test(`${count++}. 测试在配置priorty属性的情况,向堆中插入不包含priority的object`, () => {
        const heap = new Heap([], false, 'age');
        expect(() => heap.insertElement({ name: 1 })).toThrow(
            'valid error: 在属性priority提供的情况下,新插入的元素,必须提供属性age,且值为number类型!',
        );
    });

    test(`${count++}. 测试在未配置priorty属性的情况,向堆中插入object`, () => {
        const heap = new Heap([], false);
        expect(() => heap.insertElement({ name: 1, age: 5 })).toThrow(
            'valid error: 在属性priority未提供的情况下,新插入的元素,必须是number类型!',
        );
    });

    test(`${count++}. 测试堆为空时,继续pop出顶`, () => {
        const heap = new Heap([], false);
        expect(() => heap.popElement()).toThrow(
            'pop error: heap now is empty, popElement is invalid!',
        );
    });

    test(`${count++}. 测试堆不为空时,批量出顶参数小于0`, () => {
        const heap = new Heap([3, 1], false);
        expect(() => heap.popElements(-3)).toThrow(
            'pop error: popElements argument must be a integer that greater than 0!',
        );
    });

    test(`${count++}. 测试堆不为空时,批量出顶元素超过其size`, () => {
        const heap = new Heap([3, 1], false);
        expect(() => heap.popElements(3)).toThrow(
            'popMaxs error: argument count greater than heap size!',
        );
    });
});
