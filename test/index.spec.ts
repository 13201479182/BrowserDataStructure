import dataStructor from '../src/index';

const { Stack } = dataStructor;
const a = new Stack();

test('add:', () => {
    expect(a.add(2, 3)).toBe(5);
});
