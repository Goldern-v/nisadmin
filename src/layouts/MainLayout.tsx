import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import Header from './components/Header'
import NavBar from './components/NavBar'
import RouterView, { RouteComponentProps } from 'src/components/RouterView'
import store, { appStore, authStore } from 'src/stores'
import service from 'src/services/api'
import { observer } from 'mobx-react-lite'
import AduitModal from '../global/modal/AduitModal'
import createModal from 'src/libs/createModal'
import { globalModal } from 'src/global/globalModal'
import GroupsAduitModal from 'src/global/modal/GroupsAduitModal'
import GroupsAduitModalWh from 'src/global/modal/AduitModal-wh'
export interface Props extends RouteComponentProps {}

export default observer(function MainLayout(props: Props) {
  /** 数据初始化 */
  store.appStore.history = props.history
  store.appStore.match = props.match
  store.appStore.location = props.location
  const aduitModalRef: any = React.createRef()
  const groupsAduitModalRef: any = React.createRef()

  /** 审核模块区分 */
  const aduitModal = createModal(AduitModal)

  let groupsAduitModal = createModal(GroupsAduitModal)
  if (appStore.HOSPITAL_ID == 'wh') {
    groupsAduitModal = createModal(GroupsAduitModalWh)
  }

  useEffect(() => {
    service.homeDataApiServices.getListDepartment().then((res: any) => {
      if (res && res.data && res.data.deptList) {
        store.authStore.deptList = res.data.deptList || []
        if (!store.authStore.defaultDeptCode) {
          store.authStore.defaultDeptCode = store.authStore.deptList[0].code
          store.authStore.selectedDeptCode = store.authStore.deptList[0].code
        }
      }
    })

    if (!authStore.user || (authStore.user && authStore.user.roleManage != '1')) {
      appStore.history.push('/login')
    }
  }, [])

  useLayoutEffect(() => {
    globalModal.auditModal = aduitModalRef.current
    globalModal.groupsAduitModal = groupsAduitModalRef.current
  })

  return (
    <Wrapper>
      {/* <Header /> */}
      <NavBar {...props} />
      {/* {store.authStore.selectedDeptName} */}
      <RouterViewCon>
        <RouterView routes={props.routes} />
      </RouterViewCon>
      <aduitModal.Component ref={aduitModalRef} />
      <groupsAduitModal.Component ref={groupsAduitModalRef} />
    </Wrapper>
  )
})
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 100%;
  left: 0;
  right: 0;
  top: -1px;
  bottom: 0;
  background: #eee;
`
const RouterViewCon = styled.div`
  flex: 1;
  overflow: auto;
`
