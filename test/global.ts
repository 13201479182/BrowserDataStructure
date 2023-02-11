import type { TestGlobal } from './type';

// 预定义测试时的全部全局变量
const testGlobal: TestGlobal = {
    count: 1,
};

// 复写测试时需要响应式处理的变量
let count = 1;
Object.defineProperties(testGlobal, {
    count: {
        get() {
            return count++;
        },
    },
});

export default testGlobal;
