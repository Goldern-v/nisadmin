# React Typescript Boilerplate

## 一、使用方法

1. 克隆仓库

```shell
git clone http://dev.cr-health.com:380/huangwenhao/react-typescript-boilerplate.git
```

2. 安装依赖

```shell
npm install
```

3. 运行项目

```shell
# mock模式（区别请看FAQ）
npm run mock

# 正常模式
npm run start
```

## 二、技术栈

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

## 三、项目结构

```shell
├── .vscode                             // vscode配置
├── config-overrides                    // react-app-rewired配置
├── public                              // 静态页面
├── src                                 // 源代码
    ├── assets                          // 静态资源 [说明1]
    ├── components                      // 通用组件 [说明2]
        ├── Base.tsx                    // 基础类 [说明3]
        ├── RouterView.tsx              // 路由组件封装 [说明4]
    ├── configs                         // 配置文件
        ├── mocks                       // 模拟数据配置
        ├── routes.ts                   // 路由配置
    ├── libs                            // 函数库
        ├── http                        // http请求客户端
        ├── mock.ts                     // mock装饰器
        ├── to.ts                       // await异常转换器
    ├── models                          // 模型定义
    ├── services                        // 服务类 [说明5]
        ├── BaseApiService.ts           // 基础Api服务类 [说明6]
    ├── stores                          // 全局状态
    ├── styles                          // 全局样式
    ├── types                           // typescript声明
    ├── views                           // 页面组件 [说明7]
    ├── App.test.tsx                    // 根组件测试文件
    ├── App.tsx                         // 根组件
    ├── index.tsx                       // 入口文件
    ├── registerServiceWorker.ts        // PWA服务
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

**[说明1]** `assets`用于存放全局使用的静态资源，如图片、字体等，对于局部使用的图片资源，请放置在`views`中对应的页面组件`images`目录内。

**[说明2]** `components`用于存放全局使用的组件，对于局部使用的组件，请放置在`views`中对应的页面组件`components`目录内。

**[说明3]** `Base.tsx`为基础类，定义`className`属性和常用方法，请务必确保所有自定义的组件都继承这个类，并实现`className`传入到组件节点上。

**[说明4]** `RouterView.tsx`封装了一个类似vue中的RouterView用法的组件，配合`routes.ts`中的配置使用。

**[说明5]** `services`用于存放服务类，目前更多的是`ApiService`，请看[说明6]。

**[说明6]** `BaseApiService.ts`基础Api服务类，定义了http中的`get`、`post`、等方法和返回值的类型优化，所有的http请求请统一使用该类实现。

**[说明7]** `views`存放页面组件，对于大型项目，推荐划分模块，并根据模块或页面细分`components`、`images`、`services`等目录。

## 四、FAQ

* Q: 什么是`mock模式`？

  A: 通过`npm run mock`运行mock模式，项目中所有`@Mock(fn)`修饰的函数，都会被替换成`fn`执行。其中一个应用就是用来模拟接口数据，当后端接口还没来得及写，或者出了问题在花时间调试，这时，可以使用模拟接口，保证前端可以不受影响继续开发。

  如果需要在正常模式临时开启mock模式，请使用`@Mock(fn, true)`，即传入第二个参数`true`，无需重启项目。

* Q: 路由跳转了，为什么但是没有渲染对应的子组件，或者渲染的是错误的子组件？

  A: 前者可能是父路由组件没有放置`<RouterView routes={routes}/>`。后者可能是路由匹配优先级问题，例如有如下路由配置：

  ```js
  const routes = [
    {
      path: '/',
      component: ViewHome,
    },
    {
      path: '/login',
      component: ViewLogin,
    }
  ]
  ```

  例如当前的pathname是`/login`，根据路由配置的顺序，会有限匹配到`/`即`ViewHome`，如果希望匹配到`/login`，请将`/login`对应的配置移到前面。

* Q: `mobx`状态不会响应？

  A: 是不是忘加`@action`或组件上少了`@observer`

* Q: `styled-components`修饰一个自定义组件，样式没有效果？

  A: `styled-components`原理是随机生成一个类名，并把类名应用到组件上，所以请确保该组件是支持传入`className`属性的，本项目中推荐所有自定义组件继承`Base`类，并自行将`props`中的`className`传入到节点上。例如：

  ```jsx
  class Button extends Base {            // 推荐直接继承Base类
    render () {
      const { className, children } = this.props
      return (
        <button className={className}>   // 必须将className传入到节点上
          {children}
        </button>
      )
    }
  }

  const StyledButton = styled(Button)`
    blackround: blue;
  `
  ```

## 五、已知问题

1. 在styled-components中使用泛型后，语法高亮失效，这是插件的[问题](https://github.com/styled-components/vscode-styled-components/issues/114)

## 六、更多

- [react / styled-components相关snippets](./SNIPPETS.md)

- [推荐vscode插件（打开项目时会提示安装）](./.vscode/extensions.json)
