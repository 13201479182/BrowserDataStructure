import { Heap } from '../../src/index';
import global from '../global';

/**
 * 堆构造函数参数测试
 */
// 1. 测试参数是否支持可选
test(`${global.count}heap:arguments 测试实例化时arguments可选`, () => {
    const heap = new Heap();
    expect(heap).toBeInstanceOf(Heap);
});

// 2. 测试参数是否支持number[]
test(`${global.count}heap:arguments 测试实例化时arguments支持number[]`, () => {
    const heap = new Heap([3, 5, 1, 7, 4]);
    expect(heap).toBeInstanceOf(Heap);
});

// 3. 测试参数是否支持大堆配置
test(`${global.count}heap:arguments 测试实例化时arguments支持配置大堆`, () => {
    const heap = new Heap([3, 5, 1, 7, 4], false);
    expect(heap.data).toStrictEqual([7, 5, 1, 3, 4]);
});

// 4. 测试参数是否支持小堆配置
test(`${global.count}heap:arguments 测试实例化时arguments支持配置小堆`, () => {
    const heap = new Heap([3, 5, 1, 7, 4], true);
    expect(heap.data).toStrictEqual([1, 4, 3, 7, 5]);
});

// 5. 测试参数是否支持Object[]&priority的配合使用
test(`${global.count}heap:arguments 测试实例化时arguments支持配置object[]和priority`, () => {
    const heap = new Heap(
        [
            { name: '二号', age: 3 },
            { name: '二号', age: 5 },
            { name: '三号', age: 1 },
            { name: '四号', age: 7 },
            { name: '五号', age: 4 },
        ],
        false,
        'age',
    );
    expect(heap).toBeInstanceOf(Heap);
});

// 6. 测试参数是否支持Object[]&大堆&priority的配合使用
test(`${global.count}heap:arguments 测试实例化时arguments支持配置object[]和大堆和priority`, () => {
    const heap = new Heap(
        [
            { name: '二号', age: 3 },
            { name: '二号', age: 5 },
            { name: '三号', age: 1 },
            { name: '四号', age: 7 },
            { name: '五号', age: 4 },
        ],
        false,
        'age',
    );
    expect(heap.data).toStrictEqual([
        { name: '四号', age: 7 },
        { name: '二号', age: 5 },
        { name: '三号', age: 1 },
        { name: '二号', age: 3 },
        { name: '五号', age: 4 },
    ]);
});

// 7. 测试参数是否支持Object[]&小堆&priority的配合使用
test(`${global.count}heap:arguments 测试实例化时arguments支持配置object[]和小堆和priority`, () => {
    const heap = new Heap(
        [
            { name: '二号', age: 3 },
            { name: '二号', age: 5 },
            { name: '三号', age: 1 },
            { name: '四号', age: 7 },
            { name: '五号', age: 4 },
        ],
        true,
        'age',
    );
    expect(heap.data).toStrictEqual([
        { name: '三号', age: 1 },
        { name: '五号', age: 4 },
        { name: '二号', age: 3 },
        { name: '四号', age: 7 },
        { name: '二号', age: 5 },
    ]);
});
