import * as React from 'react'
import * as ReactDOM from 'react-dom'
import 'src/modules/badEvents/views/editor/assets/icons/icons.woff'
import App from './App'
import autoUpdate from './utils/autoUpdate'
import { appStore } from './stores'
// import registerServiceWorker from './registerServiceWorker'
/** 自动更新 */
!process.env.NODE_ENV === 'development' as any && autoUpdate()
ReactDOM.render(<App />, document.getElementById('root'))
// ReactDOM.createRoot(document.getElementById('root')).render(<App />);
let preLoader: any = document!.getElementById('pre-loader')
preLoader.parentNode.removeChild(preLoader)
// registerServiceWorker()

//更改标题
if (process.env.REACT_APP_ONLY_BAD_EVENT) document.title = '不良事件管理系统'