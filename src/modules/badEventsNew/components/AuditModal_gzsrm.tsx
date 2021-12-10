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
    //添加是否为不良事件
    //noPass: false,
    noPass: "1",//"1"通过,0为不通过，2为不良事件
  }
}

export interface Props {
  visible: boolean //审核窗口显示
  onOk: any //审核操作完成回调
  onCancel: any //窗口关闭回调
  nodeInfo: any, //当前审核节点信息
  dataOrigin: any, //窗口关闭回调
  iframeRef: any
}

export default observer(function AduitModal(props: Props) {
  const { visible, onOk, onCancel, dataOrigin, nodeInfo, iframeRef } = props
  const nodeCode = nodeInfo?.nodeCode || ''

  const [auditInfo, setAuditInfo] = useState(initAuditInfo())
  //验证用户弹窗显示
  const [userCheckVisible, setUserCheckVisible] = useState(false)

  const [confirmLoading, setConfirmLoading] = useState(false)
  // useEffect(() => {
  //   if (visible) {

  //   }
  // }, [visible])
  const handleOkBtn = () => {
    setUserCheckVisible(true)
  }
  const handleUserCheckOk = (userAudit: any) => {
    // const iframe: React.RefObject<HTMLIFrameElement> = document.getElementsByClassName("badEvent-iframe")[0] || null;
    // const iframe: any = document.getElementsByClassName("badEvent-iframe")[0] || null;
    // iframe.contentWindow.CRForm.controller.saveForm(null, null, {});
    auditFormSubmit(userAudit)
    // setUserCheckVisible(false)
  }

  const auditFormSubmit = (userAudit: any) => {
    let params = {
      nodeCode,
      ...auditInfo,
      empNo: userAudit.empNo,
      password: userAudit.password,
      id: dataOrigin?.master?.id,
    } as any

    delete params.auditDate

    let saveParams = {} as any
    const iframeWindow: any = iframeRef.current?.contentWindow
    const itemDataMap = iframeWindow.CRForm.controller.getFormData()
    switch (nodeCode) {
      case 'nurse_handle':  //科护士长审核
        // 片区护长审核是否通过
        if (auditInfo.noPass == '0') {
          saveParams['B0002060'] = auditInfo.handleContent
          // if (auditInfo.handleContent.trim().length <= 0) {//去除回退原因限制
          //   message.warning('审核意见不能为空')
          //   return
          // }
        } else {
          saveParams['B0002060'] = auditInfo.handleContent
        }

        params.noPass = auditInfo.noPass == '1' ? false : true;
        break
      case 'nursing_minister_audit': //护理部审核
        // 是否不良事件
        // saveParams['B0002061'] = auditInfo.noPass ? '0' : '1'
        saveParams['B0002061'] = auditInfo.noPass
        // 意见和日期
        saveParams['B0002054'] = auditInfo.handleContent
        saveParams['B0002053'] = auditInfo.auditDate
        params.noPass = auditInfo.noPass == '1' ? false : true;
        break
      case 'dept_handle':   //病区处理
        // 意见和日期
        saveParams['B0002062'] = auditInfo.handleContent
        saveParams['B0002057'] = auditInfo.handleContent
        saveParams['B0002056'] = auditInfo.auditDate
        params.noPass = false
        break
      case 'district_nurse_audit'://片区护士长审核意见
        params.noPass = auditInfo.noPass == '1' ? false : true;
        break
      case 'nursing_minister_comfirm':  //护理部审核
        // 意见和日期
        saveParams['B0002059'] = auditInfo.handleContent
        saveParams['B0002058'] = auditInfo.auditDate
        params.noPass = false
        break
      default:
    }

    const handleResponse = (res: any) => {
      setConfirmLoading(false)
      if (res.code === "200") {
        onOk()
        Message.success('操作成功')
        setUserCheckVisible(false)
        onCancel()
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
            ...itemDataMap,
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
    let opionTitle = '审核意见'
    let auditDateTitle = '审核时间'
    let auditTimeEditable = false

    switch (nodeCode) {
      case 'nurse_handle':
        opionTitle = '科护士长审核意见'
        auditDateTitle = '审核日期'
        //if (auditInfo.noPass)
        if (auditInfo.noPass == '0')
          opionTitle = ' 回退原因'
        break
      case 'nursing_minister_audit':
        opionTitle = '护理部审核意见'
        //if (auditInfo.noPass)
        if (auditInfo.noPass == '0')
          opionTitle = ' 回退原因'
        auditDateTitle = '审核日期'
        break
      case 'dept_handle':
        opionTitle = '整改情况'
        auditDateTitle = '整改日期'
        auditTimeEditable = true
        break
      case 'district_nurse_audit':
        opionTitle = '片区护士长填写意见'
        auditDateTitle = '审核日期'
        if (auditInfo.noPass == '0')
          opionTitle = ' 回退原因'
        break
        break
      case 'nursing_minister_comfirm':
        opionTitle = ' 护理部确认'
        //if (auditInfo.noPass)
        if (auditInfo.noPass == '0')
          opionTitle = ' 回退原因'
        auditDateTitle = ' 护理部确认日期'
        break
      default:
    }

    switch (nodeCode) {
      case 'nursing_minister_audit':
        return (
          <div className='form1'>
            <Row>
              <Col span={6} className="row-title">
                是否为不良事件：
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
                  {/* <Radio value={false} >是</Radio>
                  <Radio value={true}>否</Radio> */}
                  <Radio value={"1"} >是</Radio>
                  <Radio value={"0"}>否</Radio>
                  <Radio value={"2"}>非护理不良事件</Radio>
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
                  {/* <Radio value={false} >通过</Radio>
                  <Radio value={true}>退回</Radio> */}
                  <Radio value={"1"} >通过</Radio>
                  <Radio value={"0"}>退回</Radio>
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
