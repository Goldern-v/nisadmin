import React, { useState, useEffect, Fragment } from 'react'
import styled from 'styled-components'
import { Modal, Input, Select, Button, message as Message, Row, Col, Radio, message, DatePicker } from 'antd'
import { appStore, authStore } from 'src/stores'
import services from 'src/services/api'
import { observer } from 'mobx-react-lite'
import { badEventsNewService } from '../api/badEventsNewService'
import moment from 'moment'

import UserCheckModal from './UserCheckModal'
import auditSubmit from '../utils/auditSubmit'
import { Obj } from 'src/libs/types'
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

  const handleOkBtn = () => {
    setUserCheckVisible(true)
  }
  const handleUserCheckOk = (userAudit: any, userInfo: any) => {
    // 片区护长审核是否通过
    auditFormSubmit(userAudit, userInfo)
    // setUserCheckVisible(false)
  }

  const auditFormSubmit = (userAudit: any, userInfo: any) => {
    let params = {
      nodeCode,
      ...auditInfo,
      empNo: userAudit.empNo,
      password: userAudit.password,
      id: dataOrigin?.master?.id,
    } as any

    delete params.auditDate

    let saveParams = {} as any
    /**
     * 还未与后端协商修改统一字段名
     */
    // switch (nodeCode) {
    //   case 'nurse_handle':  //科护士长审核
    //     saveParams['B0028024'] = auditInfo.handleContent  //科护士长审核意见
    //     if (auditInfo.noPass) {
    //       // saveParams['B0002060'] = auditInfo.handleContent
    //       if (auditInfo.handleContent.trim().length <= 0) {
    //         message.warning('审核意见不能为空')
    //         return
    //       }
    //     }
    //     break
    //   case 'nursing_minister_audit': //护理部审核
    //     // 是否不良事件
    //     if (auditInfo.noPass) {
    //       if (auditInfo.handleContent.trim().length <= 0) {
    //         message.warning('审核意见不能为空')
    //         return
    //       }
    //     }
    //     saveParams['B0002061'] = auditInfo.noPass ? '0' : '1'
    //     // 意见和日期
    //     saveParams['B0002054'] = auditInfo.handleContent  //护理部审核意见
    //     saveParams['B0002053'] = auditInfo.auditDate   // 护理部审核日期
    //     saveParams['B0009020'] = userInfo.empName   //B0009020未跟后端做统一（待修改）
    //     saveParams["B0010018"] = userInfo.empName   //护理优良事件报告表（待修改）
    //     break
    //   case 'dept_handle':  //病区处理
    //     // 意见和日期
    //     saveParams['B0002062'] = auditInfo.handleContent
    //     saveParams['B0002057'] = auditInfo.handleContent
    //     saveParams['B0002056'] = auditInfo.auditDate
    //     params.noPass = false
    //     break
    //   case 'nursing_minister_comfirm': //护理部确认
    //     // 意见和日期
    //     saveParams['B0002059'] = auditInfo.handleContent
    //     saveParams['B0002058'] = auditInfo.auditDate
    //     break
    //     // 追踪评论
    //     case 'nursing_minister_flowcomment':
    //     saveParams['B0009023'] = auditInfo.handleContent
    //     saveParams['B0009024'] = userInfo.empName
    //     saveParams['B0009025'] = auditInfo.auditDate
    //     break
    //   default:
    // }
    const flag = auditSubmit({ nodeCode, auditInfo, saveParams, userInfo, params })
    if (!flag) return

    const handleResponse = (res: any, saveParams: Obj = {}) => {
      setConfirmLoading(false)
      if (res.code === "200") {
        onOk(saveParams)
        Message.success('操作成功')
        setUserCheckVisible(false)
        onCancel()
      } else {
        if (res.desc) Message.error(res.desc)
      }
    }

    setConfirmLoading(true)
    if (Object.keys(saveParams).length > 0 && 'fqfybjy' !== appStore.HOSPITAL_ID) {
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
          (res) => handleResponse(res, saveParams),
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
    let opionTitle = '审核意见'
    let auditDateTitle = '审核时间'
    let auditTimeEditable = false

    switch (nodeCode) {
      case 'nurse_handle':
        opionTitle = '片区护长审核意见'
        auditDateTitle = '审核日期'
        if (auditInfo.noPass)
          opionTitle = ' 回退原因'
        break
      case 'nursing_minister_audit':
        opionTitle = '护理部审核意见'
        if (auditInfo.noPass)
          opionTitle = ' 回退原因'
        auditDateTitle = '审核日期'
        if (appStore.HOSPITAL_ID === 'fqfybjy') auditTimeEditable = true
        break
      case 'dept_handle':
        opionTitle = '整改情况'
        auditDateTitle = '整改日期'
        auditTimeEditable = true
        break
      case 'nursing_minister_comfirm':
        opionTitle = ' 护理部确认'
        if (auditInfo.noPass)
          opionTitle = ' 回退原因'
        auditDateTitle = ' 护理部确认日期'
        break
      case 'nursing_minister_flowcomment':
        opionTitle = nodeInfo?.nodeName
        if (auditInfo.noPass)
          opionTitle = ' 回退原因'
        auditDateTitle = nodeInfo?.nodeName + '日期'
        if (appStore.HOSPITAL_ID === 'fqfybjy') auditTimeEditable = true
        break

      default:
    }

    switch (nodeCode) {
      case 'nursing_minister_audit':
        return (
          <div className='form1'>
            <Row>
              <Col span={6} className="row-title">
                {'fqfybjy' === appStore.HOSPITAL_ID ? '是否审核通过：' : '是否为不良事件：'}
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
                  <Radio value={false} >是</Radio>
                  <Radio value={true}>否</Radio>
                </Radio.Group>
              </Col>
            </Row>
            <Row>
              <Col span={6} className="row-title">
                {opionTitle}：
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

      case 'dept_handle':
        return (
          <div className='form1'>
            <Row>
              <Col span={6} className="row-title">
                {opionTitle}：
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

      default:
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
                {/* <span style={{ color: 'red', marginLeft: '-7px' }}>*</span> */}
                {opionTitle}：
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
  }

  return (
    <Fragment>
      <Modal
        className='badevent-audit-modal'
        title={nodeInfo?.nodeName || '当前审核流程'}
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
