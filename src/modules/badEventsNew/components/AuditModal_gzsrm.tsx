import React, { useState, useEffect, Fragment } from 'react'
import styled from 'styled-components'
import { Modal, Input, Select, Button, message as Message, Row, Col, Radio, message, DatePicker } from 'antd'
import { authStore } from 'src/stores'
import services from 'src/services/api'
import { observer } from 'mobx-react-lite'
import { badEventsNewService } from '../api/badEventsNewService'
import moment from 'moment'

import UserCheckModal from './UserCheckModal'
// const commonApiService = services.commonApiService

const TextArea = Input.TextArea
// const { Option } = Select

const initAuditInfo = () => {
  return {
    handleContent: '',
    expand: '',
    auditDate: moment().format('YYYY-MM-DD'),
    noPass: false,
  }
}

export interface Props {
  visible: boolean //审核窗口显示
  onOk: any //审核操作完成回调
  onCancel: any //窗口关闭回调
  nodeInfo: any, //当前审核节点信息
  dataOrigin: any, //窗口关闭回调
}

export default observer(function AduitModal(props: Props) {
  const { visible, onOk, onCancel, dataOrigin, nodeInfo } = props
  const nodeCode = nodeInfo?.nodeCode || ''

  const [auditInfo, setAuditInfo] = useState(initAuditInfo())

  //验证用户弹窗显示
  const [userCheckVisible, setUserCheckVisible] = useState(false)

  const [confirmLoading, setConfirmLoading] = useState(false)

  useEffect(() => {
    if (visible) {

    }
  }, [visible])

  const handleOkBtn = () => {
    setUserCheckVisible(true)
  }
  const handleUserCheckOk = (userAudit: any) => {
    auditFormSubmit(userAudit)
    setUserCheckVisible(false)
  }

  const auditFormSubmit = (userAudit: any) => {
    let params = {
      nodeCode,
      ...auditInfo,
      empNo: userAudit.empNo,
      password: userAudit.password,
      id: dataOrigin?.master?.id
    } as any

    delete params.auditDate

    let saveParams = {} as any

    switch (nodeCode) {
      case 'nursing_minister_audit':
        saveParams['B0002054'] = auditInfo.handleContent
        saveParams['B0002053'] = auditInfo.auditDate
        break
      case 'dept_handle':
        saveParams['B0002057'] = auditInfo.handleContent
        saveParams['B0002056'] = auditInfo.auditDate
        break
      case 'nursing_minister_comfirm':
        saveParams['B0002059'] = auditInfo.handleContent
        saveParams['B0002058'] = auditInfo.auditDate
        break
      default:
    }

    const handleResponse = (res: any) => {
      setConfirmLoading(false)
      if (res.code === "200") {
        onOk()
        Message.success('操作成功')
      } else {
        if (res.desc) Message.error(res.desc)
      }
    }

    setConfirmLoading(true)

    if (Object.keys(saveParams).length > 0) {
      badEventsNewService
        .badEventMasterSave({
          master: dataOrigin.master,
          commit: dataOrigin.commit,
          itemDataMap: {
            ...dataOrigin.itemDataMap,
            ...saveParams
          }
        })
        .then(res => {
          if (res.code === '200')
            return badEventsNewService
              .auditBadEventMaster(params)
        })
        .then(
          (res) => handleResponse(res),
          () => setConfirmLoading(false)
        )
    } else {
      badEventsNewService
        .auditBadEventMaster(params)
        .then(
          (res) => handleResponse(res),
          () => setConfirmLoading(false)
        )
    }
  }

  const ModalWidth = () => {
    switch (nodeCode) {
      default:
        return 650
    }
  }

  const AduitPannelContent = () => {
    let auditTitle = '审核意见'
    let auditDateTitle = '审核时间'
    let auditTimeEditable = false

    switch (nodeCode) {
      case 'nursing_minister_audit':
        auditTitle = '护理部意见'
        auditDateTitle = '护理部意见日期'
        break
      case 'dept_handle':
        auditTitle = '科室整改效果评估'
        auditDateTitle = '科室整改日期'
        auditTimeEditable = true
        break
      case 'nursing_minister_comfirm':
        auditTitle = ' 护理部确认'
        auditDateTitle = ' 护理部确认日期'
        auditTimeEditable = true
        break
      default:
    }

    return (
      <div className='form1'>
        <Row>
          <Col span={6} className="row-title">
            审核结果：
          </Col>
          <Col span={18}>
            <Radio.Group
              className='radio-group'
              value={auditInfo.noPass}
              onChange={(e) =>
                setAuditInfo({
                  ...auditInfo,
                  noPass: e.target.value,
                })
              }>
              <Radio value={false} >通过</Radio>
              <Radio value={true}>退回</Radio>
            </Radio.Group>
          </Col>
        </Row>
        <Row>
          <Col span={6} className="row-title">
            <span style={{ color: 'red', marginLeft: '-7px' }}>*</span>
            {auditTitle}：
          </Col>
          <Col span={18}>
            <TextArea
              autosize={{ minRows: 2 }}
              value={auditInfo.handleContent}
              onChange={(e) =>
                setAuditInfo({ ...auditInfo, handleContent: e.target.value })} />
          </Col>
        </Row>
        <Row>
          <Col span={6} className="row-title">{auditDateTitle}：</Col>
          <Col span={18}>
            <DatePicker
              allowClear={false}
              value={moment(auditInfo.auditDate)}
              disabled={!auditTimeEditable}
              onChange={(_moment: moment.Moment) =>
                setAuditInfo({ ...auditInfo, auditDate: _moment.format('YYYY-MM-DD') })} />
          </Col>
        </Row>
      </div>
    )
  }

  return (
    <Fragment>
      <Modal
        className='badevent-audit-modal'
        title={nodeInfo?.nodeName || '审核流程'}
        width={ModalWidth()}
        onOk={handleOkBtn}
        confirmLoading={confirmLoading}
        onCancel={onCancel}
        visible={visible}
      >
        <Wrapper>{AduitPannelContent()}</Wrapper>
      </Modal>
      <UserCheckModal
        visible={userCheckVisible}
        onCancel={() => setUserCheckVisible(false)}
        onOk={handleUserCheckOk} />
    </Fragment>
  )
})

const Wrapper = styled.div`
.ant-row{
  margin-bottom: 10px;
}
.form1{
  .item-label{
    text-align: right;
    line-height: 32px;
    vertical-align: middle;
  }
  .ant-radio-wrapper{
    margin-top: 5px;
  }
  .radio-group{
    width: 80%;
    margin: 0 auto;
  }
  .dept-select{
    width: 220px;
  }
}
.form2{
  .select-item{
    margin-right: 15px;
    .item-label{
      margin-right: 5px;
    }
    .ant-select{
      width: 100px;
    }
  }
}
.row-title{
  line-height: 31px;
  padding-right: 10px;
  text-align: right;
  font-size: 14px;
}
`
