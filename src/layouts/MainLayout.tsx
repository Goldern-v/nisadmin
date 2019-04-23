import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import NavBar from './components/NavBar'
import RouterView, { RouteComponentProps } from 'src/components/RouterView'
import store from 'src/stores'
import service from 'src/services/api'
import { observer } from 'mobx-react-lite'

export interface Props extends RouteComponentProps {}

export default observer(function MainLayout (props: Props) {
  /** 数据初始化 */
  store.appStore.history = props.history
  store.appStore.match = props.match
  store.appStore.location = props.location
  useEffect(() => {
    service.homeDataApiServices.getListDepartment().then((res) => {
      if (res && res.data) {
        store.authStore.deptList = res.data.deptList || []
      }
    })
  }, [])
  return (
    <Wrapper>
      <Header />
      <NavBar {...props} />
      {/* {store.authStore.selectedDeptName} */}
      <RouterViewCon>
        <RouterView routes={props.routes} />
      </RouterViewCon>
    </Wrapper>
  )
})
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  background: #f8f8f8;
`
const RouterViewCon = styled.div`
  flex: 1;
  overflow: auto;
`
