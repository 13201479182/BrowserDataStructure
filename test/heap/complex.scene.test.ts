import { Heap } from '../../src/index';
import global from '../global';

/**
 * 堆构复杂应用场景测试
 */

/**
 * 测试priority未配置下,大堆(组合操作)
 * 1. 初始化出空大堆,依次向堆中插入元素1, 10, 8, 5, 32
 * 2. 将堆配置为小堆
 * 3. 批量向堆中插入元素[7, 8]
 * 4. 查看结果集是否满足预期
 */
test(`${global.count}heap:complexScene 测试priority未配置下,大堆(组合操作)`, () => {
    const heap = new Heap();
    expect(
        heap
            .insertElement(1)
            .insertElement(10)
            .insertElement(8)
            .insertElement(5)
            .insertElement(32)
            .setSmall(true)
            .insertElements([7, 8]).data,
    ).toStrictEqual([1, 5, 7, 10, 32, 8, 8]);
});

/**
 * 测试priority未配置下,小堆(组合操作)
 * 1. 初始化出空小堆,依次向堆中插入元素1, 10, 8, 5, 32
 * 2. 将堆配置为大堆
 * 3. 批量向堆中插入元素[7, 8]
 * 4. 将堆排序
 * 5. 查看结果集是否满足预期
 */
test(`${global.count}heap:complexScene 测试priority未配置下,小堆(组合操作)`, () => {
    const heap = new Heap([], true);
    expect(
        heap
            .insertElement(1)
            .insertElement(10)
            .insertElement(8)
            .insertElement(5)
            .insertElement(32)
            .setSmall(false)
            .insertElements([7, 8])
            .sort().data,
    ).toStrictEqual([1, 5, 7, 8, 8, 10, 32]);
});

/**
 * 测试priority配置下,大堆(组合操作)
 * 1. 初始化出空大堆,依次向堆中插入元素{name: 44, age: 1}{name: 11, age: 2}{name: 22, age: 3}{name: 33, age: 4}
 * 2. 将堆配置为小堆
 * 3. 将priority配置为name
 * 4. 批量向堆中批量插入元素[{name: 66, age: 5}, {name: 55, age: 6}]
 * 4. 查看结果集是否满足预期
 */
test(`${global.count}heap:complexScene 测试priority配置下(组合操作)`, () => {
    const heap = new Heap([], false, 'age');
    expect(
        heap
            .insertElement({
                name: 44,
                age: 1,
            })
            .insertElement({
                name: 11,
                age: 2,
            })
            .insertElement({
                name: 22,
                age: 3,
            })
            .insertElement({
                name: 33,
                age: 4,
            })
            .setSmall(true)
            .setPriority('name')
            .insertElements([
                { name: 66, age: 5 },
                { name: 55, age: 6 },
            ]).data,
    ).toStrictEqual([
        { name: 11, age: 2 },
        { name: 22, age: 3 },
        { name: 44, age: 1 },
        { name: 33, age: 4 },
        { name: 66, age: 5 },
        { name: 55, age: 6 },
    ]);
});
