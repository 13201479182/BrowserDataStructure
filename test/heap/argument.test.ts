import { Heap } from '../../src/index';
import global from '../global';

/**
 * 堆构造函数参数校验
 */
test(`${global.count}---heap:argument 实例化时argument可选`, () => {
    const heap = new Heap();
    expect(heap).toBeInstanceOf(Heap);
});

test(`${global.count}---heap:argument 实例化时argument支持number[]`, () => {
    const heap = new Heap([3, 5, 1, 7, 4]);
    expect(heap).toBeInstanceOf(Heap);
});
