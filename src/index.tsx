import * as React from 'react'
import * as ReactDOM from 'react-dom'
import 'src/modules/badEvents/views/editor/assets/icons/icons.woff'
import App from './App'
import autoUpdate from './utils/autoUpdate'
import { appStore } from './stores'
// import registerServiceWorker from './registerServiceWorker'
/** 自动更新 */
!appStore.isDev && autoUpdate()
ReactDOM.render(<App />, document.getElementById('root'))
// ReactDOM.createRoot(document.getElementById('root')).render(<App />);
let preLoader: any = document!.getElementById('pre-loader')
preLoader.parentNode.removeChild(preLoader)
// registerServiceWorker()
