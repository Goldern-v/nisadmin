import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Breadcrumb, Button } from 'antd'
import store, { appStore } from 'src/stores'
import { nurseFileDetailViewModal } from '../NurseFileDetailViewModal'
import { observer } from 'mobx-react-lite'
import createModal from 'src/libs/createModal'
import DeptChangeModal from '../modal/DeptChangeModal'
import LeaveModal from '../modal/LeaveModal'

import qs from 'qs'
import { nurseFilesService } from '../../../services/NurseFilesService'
export interface Props extends RouteComponentProps {}

const BG = require('../../../images/顶部背景.png')

const DEFAULT_HEADIMG = require('../../../images/护士默认头像.png')

const WARNNING_ICON = require('../../../images/注意.png')

export default observer(function TopCon() {
  const deptChangeModal = createModal(DeptChangeModal)
  const leaveModal = createModal(LeaveModal)
  let history = store.appStore.history
  let { empName, post, deptName, nurseHierarchy, nearImageUrl } = nurseFileDetailViewModal.nurserInfo

  const openLeaveModalModal = () => {
    leaveModal.show({
      info: appStore.queryObj,
      callback: refreshNursingInfo
    })
  }
  const openDeptChangeModal = () => {
    deptChangeModal.show({
      info: appStore.queryObj,
      callback: refreshNursingInfo
    })
  }

  /** 更新护士信息 */
  const refreshNursingInfo = () => {
    nurseFilesService.nurseInformation(appStore.queryObj.empNo).then((res) => {
      store.appStore.history.replace(store.appStore.match.url + '?' + qs.stringify(res.data))
    })
  }
  return (
    <Wrapper>
      <BreadcrumbCon>
        <Breadcrumb>
          <Breadcrumb.Item>
            <A onClick={() => history.push('/nurseFile/onTheJob')}>护士档案</A>
          </Breadcrumb.Item>
          <Breadcrumb.Item>档案详情</Breadcrumb.Item>
        </Breadcrumb>
      </BreadcrumbCon>
      <HeadImg src={nearImageUrl || DEFAULT_HEADIMG} />
      <Name>{empName}</Name>
      <Info>
        {post} | {nurseHierarchy} | {deptName}
      </Info>
      <DeptChangeBtn1 onClick={() => openLeaveModalModal()}>离职/退休</DeptChangeBtn1>

      <DeptChangeBtn2 onClick={() => openDeptChangeModal()}>科室调动</DeptChangeBtn2>
      {nurseFileDetailViewModal.badgeTotal ? (
        <Tip>
          <img src={WARNNING_ICON} alt='' />

          <span>
            {' '}
            注意：{empName}有{nurseFileDetailViewModal.badgeTotal}条未审核信息，点击
            <ClickSpan onClick={() => appStore.history.push(`/nurseAudit?${appStore.query}`)}>这里</ClickSpan>
            进行审核
          </span>
        </Tip>
      ) : (
        <Tip />
        // <Tip>你没有待审核的信息</Tip>
      )}
      <deptChangeModal.Component />
      <leaveModal.Component />
    </Wrapper>
  )
})
const Wrapper = styled.div`
  height: 135px;
  background: url(${BG});
  background-size: cover;
  box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #dbe0e4;
  font-size: 13px;
  position: relative;
`
const BreadcrumbCon = styled.div`
  padding: 12px 15px;
`

const A = styled.span`
  color: #666666;
  cursor: pointer;
  &:hover {
    color: #333;
  }
`

const HeadImg = styled.img`
  position: absolute;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  left: 15px;
  bottom: 15px;
  object-fit: cover;
`

const Name = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  top: 58px;
  left: 100px;
  position: absolute;
`
const Info = styled.div`
  font-size: 13px;
  color: #666;
  top: 88px;
  left: 100px;
  position: absolute;
`

const Tip = styled.div`
  font-size: 13px;
  color: #333;
  position: absolute;
  right: 20px;
  bottom: 30px;
  img {
    width: 14px;
    margin-right: 4px;
    margin-top: -4px;
  }
`
const ClickSpan = styled.span`
  cursor: pointer;
  color: #5472c4;
  margin: 0px 4px;
  display: inline-block;
  border-bottom: 1px solid #5472c4;
`

const DeptChangeBtn1 = styled(Button)`
  position: absolute !important;
  right: 120px;
  top: 34px;
`
const DeptChangeBtn2 = styled(Button)`
  position: absolute !important;
  right: 20px;
  top: 34px;
`
