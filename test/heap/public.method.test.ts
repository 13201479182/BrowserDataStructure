import { Heap } from '../../src/index';
import global from '../global';

/**
 * 堆公有方法测试
 */
// 1. 测试priority未配置下,堆为空时插入元素
test(`${global.count}heap:insertElement 测试priority未配置下,堆为空时插入元素`, () => {
    const heap = new Heap();
    expect(heap.insertElement(10).data).toStrictEqual([10]);
});

// 2. 测试priority未配置下,堆不为空时,大堆中插入元素
test(`${global.count}heap:insertElement 测试priority未配置下,堆不为空时,大堆中插入元素`, () => {
    const heap = new Heap([10]);
    expect(heap.insertElement(32).data).toStrictEqual([32, 10]);
});

// 3. 测试priority未配置下,堆不为空时,小堆中插入元素
test(`${global.count}heap:insertElement 测试priority未配置下,堆不为空时,小堆中插入元素`, () => {
    const heap = new Heap([10], true);
    expect(heap.insertElement(32).data).toStrictEqual([10, 32]);
});

// 4. 测试priority配置下,堆为空时插入元素
test(`${global.count}heap:insertElement 测试priority配置下,堆为空时插入元素`, () => {
    const heap = new Heap([], false, 'age');
    expect(
        heap.insertElement({
            name: 'sansan',
            age: 33,
        }).data,
    ).toStrictEqual([
        {
            name: 'sansan',
            age: 33,
        },
    ]);
});

// 5. 测试priority配置下,堆不为空时,大堆中插入元素
test(`${global.count}heap:insertElement 测试priority配置下,堆不为空时,大堆中插入元素`, () => {
    const heap = new Heap(
        [
            {
                name: 'sansan',
                age: 33,
            },
        ],
        false,
        'age',
    );
    expect(
        heap.insertElement({
            name: 'sisi',
            age: 100,
        }).data,
    ).toStrictEqual([
        {
            name: 'sisi',
            age: 100,
        },
        {
            name: 'sansan',
            age: 33,
        },
    ]);
});

// 6. 测试priority配置下,堆不为空时,小堆中插入元素
test(`${global.count}heap:insertElement 测试priority配置下,堆不为空时,小堆中插入元素`, () => {
    const heap = new Heap(
        [
            {
                name: 'sansan',
                age: 33,
            },
        ],
        true,
        'age',
    );
    expect(
        heap.insertElement({
            name: 'sisi',
            age: 100,
        }).data,
    ).toStrictEqual([
        {
            name: 'sansan',
            age: 33,
        },
        {
            name: 'sisi',
            age: 100,
        },
    ]);
});

// 7. 测试priority未配置下,大堆批量插入元素
test(`${global.count}heap:insertElements 测试priority未配置下,大堆批量插入元素`, () => {
    const heap = new Heap();
    expect(heap.insertElements([10, 8, 32, 64, 5]).data).toStrictEqual([64, 32, 10, 8, 5]);
});

// 8. 测试priority未配置下,小堆批量插入元素
test(`${global.count}heap:insertElements 测试priority未配置下,小堆批量插入元素`, () => {
    const heap = new Heap([], true);
    expect(heap.insertElements([10, 8, 32, 64, 5]).data).toStrictEqual([5, 8, 32, 64, 10]);
});

// 9. 测试priority配置下,大堆批量插入元素
test(`${global.count}heap:insertElements 测试priority配置下,大堆批量插入元素`, () => {
    const heap = new Heap([], false, 'age');
    expect(
        heap.insertElements([
            { name: '一号', age: 10 },
            { name: '二号', age: 8 },
            { name: '三号', age: 32 },
            { name: '四号', age: 64 },
            { name: '五号', age: 5 },
        ]).data,
    ).toStrictEqual([
        { name: '四号', age: 64 },
        { name: '三号', age: 32 },
        { name: '一号', age: 10 },
        { name: '二号', age: 8 },
        { name: '五号', age: 5 },
    ]);
});

// 9. 测试priority配置下,小堆批量插入元素
test(`${global.count}heap:insertElements 测试priority配置下,小堆批量插入元素`, () => {
    const heap = new Heap([], true, 'age');
    expect(
        heap.insertElements([
            { name: '一号', age: 10 },
            { name: '二号', age: 8 },
            { name: '三号', age: 32 },
            { name: '四号', age: 64 },
            { name: '五号', age: 5 },
        ]).data,
    ).toStrictEqual([
        { name: '五号', age: 5 },
        { name: '二号', age: 8 },
        { name: '三号', age: 32 },
        { name: '四号', age: 64 },
        { name: '一号', age: 10 },
    ]);
});

// 10. 测试priority未配置下,大堆堆顶元素出顶
test(`${global.count}heap:popElement 测试priority未配置下,大堆堆顶元素出顶`, () => {
    const heap = new Heap([10, 8, 32, 64, 5]);
    expect(heap.popElement()).toBe(64);
});

// 11. 测试priority未配置下,大堆堆顶元素出顶
test(`${global.count}heap:popElement 测试priority未配置下,小堆堆顶元素出顶`, () => {
    const heap = new Heap([10, 8, 32, 64, 5], true);
    expect(heap.popElement()).toBe(5);
});

// 12. 测试priority配置下,大堆堆顶元素出顶
test(`${global.count}heap:popElement 测试priority配置下,大堆堆顶元素出顶`, () => {
    const heap = new Heap(
        [
            { name: '一号', age: 10 },
            { name: '二号', age: 8 },
            { name: '三号', age: 32 },
            { name: '四号', age: 64 },
            { name: '五号', age: 5 },
        ],
        false,
        'age',
    );
    expect(heap.popElement()).toStrictEqual({ name: '四号', age: 64 });
});

// 12. 测试priority配置下,小堆堆顶元素出顶
test(`${global.count}heap:popElement 测试priority配置下,小堆堆顶元素出顶`, () => {
    const heap = new Heap(
        [
            { name: '一号', age: 10 },
            { name: '二号', age: 8 },
            { name: '三号', age: 32 },
            { name: '四号', age: 64 },
            { name: '五号', age: 5 },
        ],
        true,
        'age',
    );
    expect(heap.popElement()).toStrictEqual({ name: '五号', age: 5 });
});

// 13. 测试priority未配置下,大堆堆顶元素批量出顶
test(`${global.count}heap:popElements 测试priority未配置下,大堆堆顶元素批量出顶`, () => {
    const heap = new Heap([10, 8, 32, 64, 5]);
    expect(heap.popElements(3)).toStrictEqual([64, 32, 10]);
});

// 14. 测试priority未配置下,小堆堆顶元素批量出顶
test(`${global.count}heap:popElements 测试priority未配置下,小堆堆顶元素批量出顶`, () => {
    const heap = new Heap([10, 8, 32, 64, 5], true);
    expect(heap.popElements(3)).toStrictEqual([5, 8, 10]);
});

// 15. 测试priority配置下,大堆堆顶元素批量出顶
test(`${global.count}heap:popElements 测试priority配置下,大堆堆顶元素批量出顶`, () => {
    const heap = new Heap(
        [
            { name: '一号', age: 10 },
            { name: '二号', age: 8 },
            { name: '三号', age: 32 },
            { name: '四号', age: 64 },
            { name: '五号', age: 5 },
        ],
        false,
        'age',
    );
    expect(heap.popElements(3)).toStrictEqual([
        { name: '四号', age: 64 },
        { name: '三号', age: 32 },
        { name: '一号', age: 10 },
    ]);
});

// 16. 测试priority配置下,小堆堆顶元素批量出顶
test(`${global.count}heap:popElements 测试priority配置下,小堆堆顶元素批量出顶`, () => {
    const heap = new Heap(
        [
            { name: '一号', age: 10 },
            { name: '二号', age: 8 },
            { name: '三号', age: 32 },
            { name: '四号', age: 64 },
            { name: '五号', age: 5 },
        ],
        true,
        'age',
    );
    expect(heap.popElements(3)).toStrictEqual([
        { name: '五号', age: 5 },
        { name: '二号', age: 8 },
        { name: '一号', age: 10 },
    ]);
});

// 17. 测试priority未配置下,大堆堆排序
test(`${global.count}heap:sort 测试priority未配置下,大堆堆排序`, () => {
    const heap = new Heap([10, 8, 32, 64, 5]);
    expect(heap.sort().data).toStrictEqual([5, 8, 10, 32, 64]);
});

// 18. 测试priority未配置下,大堆堆排序
test(`${global.count}heap:sort 测试priority未配置下,小堆堆排序`, () => {
    const heap = new Heap([10, 8, 32, 64, 5], true);
    expect(heap.sort().data).toStrictEqual([64, 32, 10, 8, 5]);
});

// 19. 测试priority配置下,大堆堆排序
test(`${global.count}heap:sort 测试priority配置下,大堆堆排序`, () => {
    const heap = new Heap(
        [
            { name: '一号', age: 10 },
            { name: '二号', age: 8 },
            { name: '三号', age: 32 },
            { name: '四号', age: 64 },
            { name: '五号', age: 5 },
        ],
        false,
        'age',
    );
    expect(heap.sort().data).toStrictEqual([
        { name: '五号', age: 5 },
        { name: '二号', age: 8 },
        { name: '一号', age: 10 },
        { name: '三号', age: 32 },
        { name: '四号', age: 64 },
    ]);
});

// 20. 测试priority配置下,小堆排序
test(`${global.count}heap:sort 测试priority配置下,小堆排序`, () => {
    const heap = new Heap(
        [
            { name: '一号', age: 10 },
            { name: '二号', age: 8 },
            { name: '三号', age: 32 },
            { name: '四号', age: 64 },
            { name: '五号', age: 5 },
        ],
        true,
        'age',
    );
    expect(heap.sort().data).toStrictEqual([
        { name: '四号', age: 64 },
        { name: '三号', age: 32 },
        { name: '一号', age: 10 },
        { name: '二号', age: 8 },
        { name: '五号', age: 5 },
    ]);
});
