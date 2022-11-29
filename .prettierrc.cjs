module.exports = {
    printWidth: 100, // 单行长度
    tabWidth: 4, // 缩进长度
    useTabs: false, // 是否使用空格代替tab缩进
    semi: true, // 句末使用分号
    singleQuote: true, // 使用单引号
    quoteProps: 'as-needed', // 仅在必需时为对象的key添加引号
    trailingComma: 'all', // 多行时尽可能打印尾随逗号
    bracketSpacing: true, // 在对象前后添加空格
    arrowParens: 'always', // 单参数箭头函数参数周围使用圆括号
    requirePragma: false, // 无需顶部注释即可格式化
    insertPragma: false, // 在已被preitter格式化的文件顶部加上标注
    endOfLine: 'auto', // 结束行形式
};
