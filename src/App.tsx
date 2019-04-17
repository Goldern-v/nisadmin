import * as React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { HashRouter as Router } from 'react-router-dom'
import { hot } from 'react-hot-loader'

import RouterView from 'src/components/RouterView'
import routes from 'src/configs/routes'

import GlobalStyle from './styles/global'
import { theme } from './styles/theme'
import './styles/iconfont.css'

import zhCN from 'antd/lib/locale-provider/zh_CN'
import { LocaleProvider } from 'antd'

export interface Props {}

export interface State {}

export class App extends React.Component<Props, State> {
  public render () {
    return (
      <LocaleProvider locale={zhCN}>
        <ThemeProvider theme={theme}>
          <Wrapper>
            <Inner>
              <Router>
                <RouterView routes={routes} />
              </Router>
            </Inner>
            <GlobalStyle />
          </Wrapper>
        </ThemeProvider>
      </LocaleProvider>
    )
  }
}

export default hot(module)(App)

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  background: #fff;
`

const Inner = styled.div`
  /* position: absolute;
  top: 45%;
  left: 50%;
  width: 600px;
  background: white;
  box-shadow: 8px 14px 38px rgba(39, 44, 49, 0.06),
    1px 3px 8px rgba(39, 44, 49, 0.03);
  border-radius: 3px;
  transform: translate(-50%, -50%); */
`
