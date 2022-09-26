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

## 配置新医院， /home路由白屏

需要在src/configs/routerConfig/specialModule.ts 页面进行新医院的配置

## 审核模块档案
需要在src\layouts\MainLayout.tsx页面进行新医院的配置
