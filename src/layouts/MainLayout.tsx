import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import Header from './components/Header'
import NavBar from './components/NavBar'
import RouterView, { RouteComponentProps } from 'src/components/RouterView'
import store from 'src/stores'
import service from 'src/services/api'
import { observer } from 'mobx-react-lite'
import AduitModal from '../global/modal/AduitModal'
import createModal from 'src/libs/createModal'
import { globalModal } from 'src/global/globalModal'
export interface Props extends RouteComponentProps {}

export default observer(function MainLayout (props: Props) {
  /** 数据初始化 */
  store.appStore.history = props.history
  store.appStore.match = props.match
  store.appStore.location = props.location
  const aduitModalRef: any = React.createRef()
  const aduitModal = createModal(AduitModal)
  useEffect(() => {
    service.homeDataApiServices.getListDepartment().then((res: any) => {
      if (res && res.data && res.data.deptList) {
        store.authStore.deptList = res.data.deptList || []
        if (!store.authStore.defaultDeptCode) {
          store.authStore.defaultDeptCode = store.authStore.deptList[0].code
          store.authStore.selectedDeptCode = store.authStore.deptList[0].code
          console.log(store.authStore.selectedDeptCode, 'store.authStore.selectedDeptCode')
        }
      }
    })
  }, [])

  useLayoutEffect(() => {
    globalModal.auditModal = aduitModalRef.current
    setTimeout(() => {
      // console.log(globalModal!.auditModal, 'globalModal!.auditModal')
      // globalModal!.auditModal && globalModal!.auditModal!.show()
    }, 200)
  })

  return (
    <Wrapper>
      <Header />
      <NavBar {...props} />
      {/* {store.authStore.selectedDeptName} */}
      <RouterViewCon>
        <RouterView routes={props.routes} />
      </RouterViewCon>
      <aduitModal.Component ref={aduitModalRef} />
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
