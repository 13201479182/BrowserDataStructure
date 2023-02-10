import heap from '../__mocks__/stack.data';

test('add:', () => {
    expect(heap.add(2, 3)).toBe(5);
});
