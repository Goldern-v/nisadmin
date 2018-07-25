# React Typescript Boilerplate

## 技术栈

- [typescript](https://www.tslang.cn/docs/home.html)
- [react](https://reactjs.org/tutorial/tutorial.html)
- [react-router](https://reacttraining.com/react-router)
- [mobx](https://mobx.js.org/)
- [styled-components](https://www.styled-components.com/docs)
- [jest](https://jestjs.io) / [react-testing-library](https://github.com/kentcdodds/react-testing-library)
- [axios](https://github.com/axios/axios)

### TypeScript / TSLint

TypeScript作为一门强类型语言，一方面，能够将大多数运行时错误暴露在编译过程，极大降低运行时的错误方式率。另一方面，强类型的提示在主流的编辑器中都有非常好的支持，有效减少开发过程中频繁查看文档、源码的次数。

tslint等同于eslint的作用，严格限制编码规范，也能在一定程度上避免一些薄弱代码的形成。项目中使用`husky + lint-staged`，在提交代码之前自动执行`tslint --fix`，防止将不符合tslint规则的代码提交到远端仓库。

### React

[为什么选择React，而不是Vue？](./WHY_REACT.md)

### Mobx

使用mobx做全局状态管理。相比redux，它更易理解和学习，并且对TypeScript也相当友好。

如果仅仅是父子组件状态传递，推荐用props或context，确保全局状态尽可能简洁。

### Styled Components

CSS类名重复问题一直没有一个标准解决方案，却又是大型项目中不可回避的问题，总结下来不外乎这几种解决方案：

- CSS命名规范（BEM、OSSCSS、SMACSS……）：纯手活，还需要很好的团队配合

- 类似Vue中的scoped指定作用域：在React中的实现就是CSS in JS

- CSS Modules：create-react-app@1.x中不支持，同时TypeScript支持不是很好

- CSS in JS：除了写法上需要作少许改变，说不上其他缺点

CSS in JS的实现方案有[太多太多](https://github.com/MicheleBertoli/css-in-js)，其中最活跃和完善的只有几个，本项目中选用styled-components，以下列举一些明显的优势：

- 保证CSS类名唯一性，同时又保留继承复用的特点

- 结合TypeScript对CSS属性能有很好的提示和类型判定

- 支持变量、嵌套等等，几乎Less等预编译支持的都支持，支持更换主题

- 与js/ts文件写在一起，因为它本身就是js，对React的支持几乎是量身定做

- 友好调试，支持React Dev Tool

- 支持lint

### Jest

Jest作为React配套测试框架，主要有以下特点：

- 零配置，开箱即用

- 支持统计测试覆盖率

- 对TypeScript有良好支持

主要用作公共组件和工具库的测试，确保添加新功能时不会对原本模块的影响。

## 目录结构

```shell
├── .vscode                             // vscode配置
├── config-overrides                    // react-app-rewired配置
├── public                              // 静态页面
├── src                                 // 源代码
    ├── assets                          // 静态资源
    ├── components                      // 通用组件
    ├── configs                         // 配置文件
    ├── libs                            // 函数库
    ├── models                          // 模型定义
    ├── services                        // 服务类
    ├── stores                          // 全局状态
    ├── types                           // typescript声明
    ├── views                           // 页面组件
    ├── App.test.tsx                    // 根组件测试文件
    ├── App.tsx                         // 根组件
    ├── index.tsx                       // 入口文件
    ├── registerServiceWorker.ts        // PWA服务
    ├── routes.ts                       // 路由配置
    ├── styles.ts                       // 全局样式
├── .editorconfig                       // 通用编辑器配置
├── .env                                // 环境变量
├── .env.development                    // 环境变量（开发环境）
├── .env.production                     // 环境变量（生产环境）
├── .gitignore                          // git忽略文件配置
├── .npmrc                              // npm配置
├── .stylelintrc                        // stylelint配置
├── package.json                        // 项目依赖
├── README.md                           // 项目说明
├── tsconfig.json                       // typescript配置
└── tslint.json                         // tslint配置
```

## 已知问题

1. 在styled-components中使用泛型后，语法高亮失效，这是插件的[问题](https://github.com/styled-components/vscode-styled-components/issues/114)

## 更多

- [react / styled-components相关snippets](./SNIPPETS.md)

- [推荐vscode插件（打开项目时会提示安装）](./.vscode/extensions.json)
