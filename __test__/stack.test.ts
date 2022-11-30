import { stack } from '../__mocks__/stack.data';

test('add:', () => {
    expect(stack.add(2, 3)).toBe(5);
});
