// 当前文件用于堆的公共方法测试
import { Heap } from '../../src/index';

describe('heap:method test pulic method', () => {
    let insertCount = 1;
    let insertsCount = 1;
    let popCount = 1;
    let popsCount = 1;
    let sortCount = 1;

    describe('method:insertElement test insertElement', () => {
        test(`${insertCount++}. 测试priority未配置下,堆为空时,大堆中插入元素`, () => {
            const heap = new Heap();
            expect(heap.insertElement(10).data).toStrictEqual([10]);
        });

        test(`${insertCount++}. 测试priority未配置下,堆不为空时,大堆中插入元素`, () => {
            const heap = new Heap([10]);
            expect(heap.insertElement(32).data).toStrictEqual([32, 10]);
        });

        test(`${insertCount++}. 测试priority未配置下,堆不为空时,小堆中插入元素`, () => {
            const heap = new Heap([10], true);
            expect(heap.insertElement(32).data).toStrictEqual([10, 32]);
        });

        test(`${insertCount++}. 测试priority配置下,堆为空时,大堆中插入元素`, () => {
            const heap = new Heap([], false, 'age');
            expect(
                heap.insertElement({
                    name: '一号',
                    age: 1,
                }).data,
            ).toStrictEqual([
                {
                    name: '一号',
                    age: 1,
                },
            ]);
        });

        test(`${insertCount++}. 测试priority配置下,堆为不空时,大堆中插入元素`, () => {
            const data = { name: '一号', age: 1 };
            const heap = new Heap([data], false, 'age');
            expect(
                heap.insertElement({
                    name: '二号',
                    age: 3,
                }).data,
            ).toStrictEqual([
                {
                    name: '二号',
                    age: 3,
                },
                {
                    name: '一号',
                    age: 1,
                },
            ]);
        });

        test(`${insertCount++}. 测试priority配置下,堆为不空时,小堆中插入元素`, () => {
            const data = { name: '一号', age: 1 };
            const heap = new Heap([data], true, 'age');
            expect(
                heap.insertElement({
                    name: '二号',
                    age: 3,
                }).data,
            ).toStrictEqual([
                {
                    name: '一号',
                    age: 1,
                },
                {
                    name: '二号',
                    age: 3,
                },
            ]);
        });
    });

    describe('method:insertElements test insertElements', () => {
        test(`${insertsCount++}. 测试priority未配置下,大堆批量插入元素`, () => {
            const heap = new Heap();
            expect(heap.insertElement(10).data).toStrictEqual([10]);
        });

        test(`${insertsCount++}. 测试priority未配置下,小堆批量插入元素`, () => {
            const heap = new Heap([], true);
            expect(heap.insertElements([10, 8, 32, 64, 5]).data).toStrictEqual([5, 8, 32, 64, 10]);
        });

        test(`${insertsCount++}. 测试priority配置下,大堆批量插入元素`, () => {
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

        test(`${insertsCount++}. 测试priority配置下,小堆批量插入元素`, () => {
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
    });

    describe('method:popElement test popElement', () => {
        test(`${popCount++}. 测试priority未配置下,大堆堆顶元素出顶`, () => {
            const heap = new Heap([10, 8, 32, 64, 5]);
            expect(heap.popElement()).toBe(64);
        });

        test(`${popCount++}. 测试priority未配置下,小堆堆顶元素出顶`, () => {
            const heap = new Heap([10, 8, 32, 64, 5], true);
            expect(heap.popElement()).toBe(5);
        });

        test(`${popCount++}. 测试priority配置下,大堆堆顶元素出顶`, () => {
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

        test(`${popCount++}. 测试priority配置下,小堆堆顶元素出顶`, () => {
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
    });

    describe('method:popElements test popElements', () => {
        test(`${popsCount++}. 测试priority未配置下,大堆堆顶元素批量出顶`, () => {
            const heap = new Heap([10, 8, 32, 64, 5]);
            expect(heap.popElements(3)).toStrictEqual([64, 32, 10]);
        });

        test(`${popsCount++}. 测试priority未配置下,小堆堆顶元素批量出顶`, () => {
            const heap = new Heap([10, 8, 32, 64, 5], true);
            expect(heap.popElements(3)).toStrictEqual([5, 8, 10]);
        });

        test(`${popsCount++}. 测试priority配置下,大堆堆顶元素批量出顶`, () => {
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

        test(`${popsCount++}. 测试priority配置下,小堆堆顶元素批量出顶`, () => {
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
    });

    describe('method:sort test sort', () => {
        test(`${sortCount++}. 测试priority未配置下,大堆堆排序`, () => {
            const heap = new Heap([10, 8, 32, 64, 5]);
            expect(heap.sort().data).toStrictEqual([5, 8, 10, 32, 64]);
        });

        test(`${sortCount++}. 测试priority未配置下,小堆堆排序`, () => {
            const heap = new Heap([10, 8, 32, 64, 5], true);
            expect(heap.sort().data).toStrictEqual([64, 32, 10, 8, 5]);
        });

        test(`${sortCount++}. 测试priority配置下,大堆堆排序`, () => {
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

        test(`${sortCount++}. 测试priority配置下,小堆堆排序`, () => {
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
    });
});
