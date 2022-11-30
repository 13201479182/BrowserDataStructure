/**
 * 当前模块用于导出各种栈的实例
 * 用于jest测试使用
 */
import dataStructor from '../src/index';
const { Stack } = dataStructor;

// 普通栈
export const stack = new Stack();
