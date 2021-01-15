import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Spin } from 'antd'
import {
  Wrapper,
  TopPannel,
  NavCon,
  MainTitle,
  SubContent,
  ButtonGroups,
  MainPannel,
} from './components/common'
import { Link } from 'react-router-dom'
import { appStore } from 'src/stores'
import AuditModal from './components/AuditModal'
import AuditInfoPannel from './components/AuditInfoPannel'
import FormEdit from './components/FormEdit'
import { localityService } from './api/LocalityService'
export interface Props { }

export default function 典型案例库审核详情() {
  const { history, queryObj } = appStore

  const [formData, setFormData] = useState({} as any)
  const [auditInfo, setAuditInfo] = useState([] as any[])
  const [loading, setLoading] = useState(false)
  const [auditModalVisible, setAuditModalVisible] = useState(false)

  let currentAuditInfo = auditInfo[auditInfo.length - 1] || {}

  const getDetailData = () => {
    setLoading(true)

    Promise.all([
      localityService.queryFormContent(queryObj.formId),
      localityService.getFlowTaskHisByCetpId(queryObj.formId)
    ])
      .then(resArr => {
        setFormData(resArr[0].data)
        setAuditInfo(resArr[1].data.flowTaskHisList || [])
      })
      .finally(() => setLoading(false))
  }

  const handleOk = () => {
    setAuditModalVisible(false)
    history.goBack()
  }

  useEffect(() => {
    getDetailData()
  }, [])

  return <Wrapper>
    <TopPannel>
      <NavCon>
        <Link to="/home">主页</Link>
        <span> {'>'} </span>
        <Link to="/continuingEdu">学习培训</Link>
        <span> {'>'} 典型案例审核</span>
        <MainTitle>典型案例审核</MainTitle>
        <SubContent>
          <span className="label"> 科室:</span>
          <span className="content">{formData['f00140']}</span>
          <span className="label"> 患者姓名:</span>
          <span className="content">{formData['f00141']}</span>
          <span className="label"> 患者性别:</span>
          <span className="content">
            {!loading && (formData['f00003'] == 0 ? '男' : '女')}
          </span>
          <span className="label"> 状态:</span>
          <span className="content">{currentAuditInfo.taskTitle}</span>
        </SubContent>
        <ButtonGroups>
          {currentAuditInfo.flag === 0 && <Button
            loading={loading}
            type="primary"
            onClick={() => setAuditModalVisible(true)}>
            <span style={{ color: '#fff' }}>{currentAuditInfo.taskTitle}</span>
          </Button>}
          <Button
            onClick={() => history.goBack()}>
            返回
        </Button>
        </ButtonGroups>
      </NavCon>
    </TopPannel>
    <MainPannel>
      <AuditInfoPannel
        auditInfo={auditInfo} />
      <Spin spinning={loading}>
        <FormEdit
          style={{
            width: 'auto',
            height: '100%'
          }}
          editable={false}
          editData={formData} />
      </Spin>
    </MainPannel>
    <AuditModal
      visible={auditModalVisible}
      taskId={queryObj.taskId}
      onOk={() => handleOk()}
      onCancel={() => setAuditModalVisible(false)}
      onClose={() => setAuditModalVisible(false)} />
  </Wrapper>
}