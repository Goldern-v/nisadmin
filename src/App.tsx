import React, { Suspense } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { HashRouter as Router } from 'react-router-dom'
import { hot } from 'react-hot-loader'

import RouterView from 'src/components/RouterView'
import routes from 'src/configs/routes'

import GlobalStyle from './styles/global'
import { theme } from './styles/theme'
import './styles/iconfont.css'

import zhCN from 'antd/lib/locale-provider/zh_CN'
import { LocaleProvider, Icon } from 'antd'
import ComponentDidCatch from './components/ComponentDidCatch'
import moment from 'moment'
import 'antd/dist/antd.less'
import 'moment/locale/zh-cn'
import NavBar from './layouts/components/NavBar'
import { Provider as KeepAliveProvider } from 'react-keep-alive'
moment.locale('zh-cn')
import {initAstrict} from "src/utils/loginTimeOut/astrict"
import version from './version.json'
//登录超时
initAstrict();
export interface Props { }

export interface State { }
const NavBar2: any = NavBar
export class App extends React.Component<Props, State> {
  componentDidMount(): void {
    if (process.env.NODE_ENV === 'production') {
      console.log('test-version', version)
    }
  }
  public render() {
    return (
      <ComponentDidCatch>
        <LocaleProvider locale={zhCN}>
          <ThemeProvider theme={theme}>
            <KeepAliveProvider max={1}>
              <Wrapper>
                <Inner>
                  <Suspense
                    fallback={
                      <React.Fragment>
                        <NavBar2 style={{ position: 'fixed', top: -1, left: 0, right: 0 }} />
                        <LoadingCon>
                          <Icon type="loading" />
                        </LoadingCon>
                      </React.Fragment>
                    }>
                    <Router>
                      <RouterView routes={routes} />
                    </Router>
                  </Suspense>
                </Inner>
                <GlobalStyle />
              </Wrapper>
            </KeepAliveProvider>
          </ThemeProvider>
        </LocaleProvider>
      </ComponentDidCatch>
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

const LoadingCon = styled.div`
  position: fixed;
  left:0;
  top:48px;
  width: 100%;
  bottom:0;
  background-color: #eee;
  color: #999;
  cursor: wait;
  .anticon{
    font-size: 50px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
`
