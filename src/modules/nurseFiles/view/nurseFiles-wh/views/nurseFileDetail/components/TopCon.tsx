import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Breadcrumb, Button } from 'antd'
import store, { appStore, authStore } from 'src/stores'
import { nurseFileDetailViewModal } from '../NurseFileDetailViewModal'
import { observer } from 'mobx-react-lite'
import createModal from 'src/libs/createModal'
import DeptChangeModal from '../modal/DeptChangeModal'
import LeaveModal from '../modal/LeaveModal'
import { nurseFilesService } from '../../../services/NurseFilesService'
import { isSelf } from '../views/BaseInfo'
import ExportNurseFileWh from './../../exportNurseFileWh/ExportNurseFileWh'

export interface Props extends RouteComponentProps { }

const BG = require('../../../images/顶部背景.png')

const WARNNING_ICON = require('../../../images/注意.png')

export default observer(function TopCon() {
  const deptChangeModal = createModal(DeptChangeModal)
  const leaveModal = createModal(LeaveModal)
  const [exportVisible, setExportVisible] = useState(false)
  let history = store.appStore.history
  let { empName, post, deptName, nurseHierarchy, nearImageUrl } = nurseFileDetailViewModal.nurserInfo
  const openLeaveModalModal = () => {
    leaveModal.show({
      info: nurseFileDetailViewModal.nurserInfo,
      callback: refreshNursingInfo
    })
  }
  const openDeptChangeModal = () => {
    deptChangeModal.show({
      info: nurseFileDetailViewModal.nurserInfo,
      callback: refreshNursingInfo
    })
  }
  /** 更新护士信息 */
  const refreshNursingInfo = () => {
    nurseFilesService.nurseInformation(appStore.queryObj.empNo).then((res) => {
      nurseFilesService.nurseInformation(appStore.queryObj.empNo).then((res) => {
        nurseFileDetailViewModal.nurserInfo = res.data
        store.appStore.history.replace(store.appStore.match.url + '?empNo=' + res.data.empNo)
      })
    })
  }

  const btnTitle = () => {
    switch (appStore.HOSPITAL_ID) {
      case "gxjb":
      case 'dghm':
        return "院内调动"
      case "wjgdszd":
        return "科室调动"
      default:
        return "片区内调动"
    }
  }
  const titleValue=()=>{
    return appStore.HOSPITAL_ID =='qhwy' ? '离职/退休/转岗' : '离职/退休'
  }
  useEffect(() => {
    nurseFileDetailViewModal.init()
  }, [])
  return (
    <Wrapper>
      <BreadcrumbCon>
        <Breadcrumb>
          {!isSelf() && (
            <Breadcrumb.Item>
              <A onClick={() => history.push('/nurseFile/onTheJob')}>护士档案</A>
            </Breadcrumb.Item>
          )}

          <Breadcrumb.Item>档案详情</Breadcrumb.Item>
        </Breadcrumb>
      </BreadcrumbCon>
      <Name>
        {empName}{' '}
        <Info>
          {post} | {nurseHierarchy} | {deptName}
        </Info>
        {nurseFileDetailViewModal.badgeTotal ? (
          <Tip>
            <img src={WARNNING_ICON} alt='' />

            <span>
              {' '}
              注意：{empName}有{nurseFileDetailViewModal.badgeTotal}条未审核信息，点击
              <ClickSpan onClick={() => appStore.history.push(`/nurseAudit?empNo=${appStore.queryObj.empNo}`)}>
                这里
              </ClickSpan>
              进行审核
            </span>
          </Tip>
        ) : (
          <Tip />
          // <Tip>你没有待审核的信息</Tip>
        )}
      </Name>
      
      <div style={{width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: '-10px'}}>
        {authStore.isRoleManage && !isSelf() && <ExportBtn className={["gzsrm"].includes(appStore.HOSPITAL_ID) ? "gzsrmExportBtn" : ""} onClick={() => setExportVisible(true)}>导出档案</ExportBtn>}
        {
          appStore.hisMatch({
            map: {
              gzsrm: '',
              ytll: nurseFileDetailViewModal.retireList.includes(authStore?.user?.empNo || '') && <DeptChangeBtn1 onClick={() => openLeaveModalModal()}>离职/退休</DeptChangeBtn1>,
              'qhwy': authStore.isRoleManage && !isSelf() && <DeptChangeBtn1 onClick={() => openLeaveModalModal()}>离职/退休/调岗</DeptChangeBtn1>,
              other: authStore.isRoleManage && !isSelf() && <DeptChangeBtn1 onClick={() => openLeaveModalModal()}>离职/退休</DeptChangeBtn1>
            }
          })
        }
        {
          !isSelf() && appStore.hisMatch({
            map: {
              // 广西江滨只有护理部才有院内调动权限
              gxjb: authStore.isRoleManage && authStore.isDepartment,
              dghm: authStore.isRoleManage || authStore.isDepartment,
              other: authStore.isRoleManage
            }
          }) && <DeptChangeBtn onClick={() => openDeptChangeModal()}>{btnTitle()}</DeptChangeBtn>
        }
      </div>

      <deptChangeModal.Component title={btnTitle()} />
      <leaveModal.Component title={titleValue()} />
      {/* 档案导出 */}
      {exportVisible && (
        <ExportNurseFileWh
          empNo={appStore.queryObj.empNo}
          callback={() => { setExportVisible(false) }} />
      )}
    </Wrapper>
  )
})
const Wrapper = styled.div`
  height: 85px;
  background: url(${BG});
  background-size: cover;
  box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #dbe0e4;
  font-size: 13px;
  position: relative;
  .gzsrmExportBtn{
    right: 10px;
    top: 0px;
  }
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
  font-size: 20px;
  font-weight: bold;
  color: #333;
  top: 40px;
  left: 15px;
  position: absolute;
`
const Info = styled.span`
  font-size: 13px;
  color: #666;
  font-weight: normal;
`

const Tip = styled.span`
  font-size: 13px;
  color: #333;
  padding-left: 20px;
  font-weight: normal;

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

const ExportBtn = styled(Button)`
  /* position: absolute !important;
  right: 218px;
  top: 34px; */
`

const DeptChangeBtn = styled(Button)`
  /* position: absolute !important;
  right: 15px;
  top: 34px; */
  margin-right: 15px;
`

const DeptChangeBtn1 = styled(Button)`
  /* position: absolute !important;
  right: 120px;
  top: 34px; */
  margin: 0px 10px 0 10px;
`
