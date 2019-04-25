import * as React from 'react'
import * as ReactDOM from 'react-dom'

import 'src/modules/badEvents/views/editor/assets/icons/icons.woff'

import App from './App'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<App />, document.getElementById('root'))

registerServiceWorker()
