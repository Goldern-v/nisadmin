# 推荐代码段

`CTRL+SHIFT+P`打开命令工具，输入`snippets`，执行`Preferences: Configure User Snippets`，选择`typescriptreact.json`，在相应位置插入：

```json
"Typescript React Component with StyledComponents": {
  "prefix": "trcs",
  "body": [
    "import * as React from 'react'",
    "import styled from 'styled-components'",
    "",
    "export interface Props {$3}",
    "",
    "export interface State {$4}",
    "",
    "export default class ${1:${TM_FILENAME_BASE}} extends React.Component<Props, State> {",
    "",
    "  public constructor (props: Props) {",
    "    super(props)",
    "",
    "    this.state = {}",
    "  }",
    "",
    "  public render () {",
    "    const {} = this.props",
    "",
    "    return (",
    "      <Wrapper>${1:TM_FILENAME_BASE }</Wrapper>",
    "    )",
    "  }",
    "",
    "}",
    "",
    "const Wrapper = styled.div``",
    ""
  ],
  "description": "Typescript React Component"
},

"styled component": {
  "prefix": "styl",
  "body": "const ${1:Wrapper} = styled.${2:div}`$3`"
},
```

### printing 打印ant-table 会出现间隔过大的问题
a:
ant-table 在打印时 .ant-spin-nested-loading 的高度默认100%
添加以下内容在css中
.ant-spin-nested-loading {
  height: auto !important;
}
```tsx
printing(ref, {
  injectGlobalCss: true,
  scanStyles: false,
  css: ` 
    .ant-spin-nested-loading {
      height: auto !important;
    }
  `
}
```
在config-overrides.js做项目配置

## 配置新医院
1. .env.cmdrc 增加新医院配置
2. package.json 增加脚本
3. src/stores/AppStore.ts 的 hisIds 增加类型声明 REACT_APP_HOSPITAL_ID的值
4. src/layouts/components 文件夹增加标签栏配置文件
5. src/layouts/components/NavBar.tsx 引入新配置
6. [在下面] (#specialConfig)
7. 如果知道测试服务器上的端口和地址名称，可以在 publish.js 加上判断
  
## 配置新医院， /home路由白屏
<div name='specialConfig'>在这</div>
需要在src/configs/routerConfig/specialModule.ts 页面进行新医院的配置

## 审核模块档案
需要在src\layouts\MainLayout.tsx页面进行新医院的配置
