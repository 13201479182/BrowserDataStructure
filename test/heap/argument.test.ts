// 当前文件用于堆构造函数参数的测试
import { Heap } from '../../src/index';

let count = 1;
describe(`heap:constructor test argument`, () => {
    test(`${count++}. 测试参数是否支持可选`, () => {
        const heap = new Heap();
        expect(heap).toBeInstanceOf(Heap);
    });

    test(`${count++}. 测试参数是否支持number[]`, () => {
        const heap = new Heap([3, 5, 1, 7, 4]);
        expect(heap).toBeInstanceOf(Heap);
    });

    test(`${count++}. 测试参数是否支持配置大堆`, () => {
        const heap = new Heap([3, 5, 1, 7, 4], false);
        expect(heap.data).toStrictEqual([7, 5, 1, 3, 4]);
    });

    test(`${count++}. 测试参数是否支持配置小堆`, () => {
        const heap = new Heap([3, 5, 1, 7, 4], true);
        expect(heap.data).toStrictEqual([1, 4, 3, 7, 5]);
    });

    test(`${count++}. 测试参数是否支持配置Object[]&priority`, () => {
        const heap = new Heap(
            [
                { name: '一号', age: 1 },
                { name: '二号', age: 3 },
                { name: '三号', age: 5 },
            ],
            false,
            'age',
        );
        expect(heap).toBeInstanceOf(Heap);
    });

    test(`${count++}. 测试参数是否支持配置Object[]&大堆&priority`, () => {
        const heap = new Heap(
            [
                { name: '一号', age: 1 },
                { name: '二号', age: 3 },
                { name: '三号', age: 5 },
            ],
            false,
            'age',
        );
        expect(heap.data).toStrictEqual([
            { name: '三号', age: 5 },
            { name: '二号', age: 3 },
            { name: '一号', age: 1 },
        ]);
    });

    test(`${count++}. 测试参数是否支持配置Object[]&小堆&priority`, () => {
        const heap = new Heap(
            [
                { name: '三号', age: 5 },
                { name: '二号', age: 3 },
                { name: '一号', age: 1 },
            ],
            true,
            'age',
        );
        expect(heap.data).toStrictEqual([
            { name: '一号', age: 1 },
            { name: '二号', age: 3 },
            { name: '三号', age: 5 },
        ]);
    });
});
