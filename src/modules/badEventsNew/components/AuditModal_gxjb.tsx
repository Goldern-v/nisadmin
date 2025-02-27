import React, { useState, useEffect, Fragment } from 'react'
import styled from 'styled-components'
import { Modal, Input, Select, Button, message as Message, Row, Col, Radio, message, DatePicker } from 'antd'
import { authStore, appStore } from 'src/stores'
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
    auditDate: moment().format('YYYY-MM-DD HH:mm:ss'),
    noPass: false,
    eventQualitative: "",//不良事件定性
    eventLevel: "",//科室谈论级别
  }
}

export interface Props {
  visible: boolean //审核窗口显示
  onOk: any //审核操作完成回调
  onCancel: any //窗口关闭回调
  nodeInfo: any, //当前审核节点信息
  dataOrigin: any, //窗口关闭回调
  master: any, //表单信息
}

export default observer(function AduitModal(props: Props) {
  const { visible, onOk, onCancel, dataOrigin, nodeInfo, master } = props
  const nodeCode = nodeInfo?.nodeCode || ''
  const { formName } = master
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
  const handleUserCheckOk = (userAudit: any, userInfo: any) => {
    // 片区护长审核是否通过
    auditFormSubmit(userAudit, userInfo)
    setUserCheckVisible(false)
  }

  const auditFormSubmit = (userAudit: any, userInfo: any) => {
    let params = {
      nodeCode,
      ...auditInfo,
      empNo: userAudit.empNo,
      password: userAudit.password,
      id: dataOrigin?.master?.id,
      handleTime: auditInfo.auditDate
    } as any

    delete params.auditDate

    let saveParams = {} as any

    saveParams['B0032094'] = auditInfo.noPass ? '0' : '1'
    switch (nodeCode) {
      case 'gxjb_ward_nurse_audit':  //病区护士长审核
        if (auditInfo.noPass) {
          if (auditInfo.handleContent.trim().length <= 0) {
            message.warning('审核意见不能为空')
            return
          }
        }
        if (formName == '难免压力性损伤备案申报表') {
          saveParams['B0032099'] = userInfo.empName
        }
        break
      case 'gxjb_big_dept_nurse_audit': //大科护士长审核
        // 是否不良事件
        if (auditInfo.noPass) {
          if (auditInfo.handleContent.trim().length <= 0) {
            message.warning('审核意见不能为空')
            return
          }
        }
        // // 意见和日期
        saveParams['B0032037'] = auditInfo.handleContent  //意见
        saveParams['B0032034'] = auditInfo.auditDate   // 日期
        saveParams['B0032038'] = userInfo.empName
        saveParams['B0032035'] = auditInfo.eventQualitative
        saveParams['B0032036'] = auditInfo.eventLevel
        break
      case 'gxjb_nursing_nurse_audit':  //护理部干事审核
        if (formName == '难免压力性损伤备案申报表') {
          saveParams['B0032103'] = auditInfo.handleContent
          saveParams['B0032044'] = userInfo.empName
          saveParams['B0044014'] = auditInfo.eventQualitative

          break
        }
        // 意见和日期
        saveParams['B0032043'] = auditInfo.handleContent
        saveParams['B0032040'] = auditInfo.auditDate
        saveParams['B0032044'] = userInfo.empName
        saveParams['B0032041'] = auditInfo.eventLevel
        break
      case 'gxjb_ward_handle': //病区护士长填写病区整改
        // 意见和日期
        saveParams['B0032046'] = auditInfo.handleContent
        saveParams['B0032047'] = userInfo.empName
        break
      case 'gxjb_nusing_dept_audit': //护理部干事2审核
        // 意见和日期
        saveParams['B0032049'] = auditInfo.handleContent
        saveParams['B0032050'] = userInfo.empName
        break
      case 'gxjb_nursing_officer_audit': //护理部主任审核
        // 意见和日期
        saveParams['B0032106'] = auditInfo.handleContent
        saveParams['B0032101'] = userInfo.empName
        // saveParams['B00321102'] = auditInfo.auditDate
        if (formName == '难免压力性损伤备案申报表') {
          saveParams['B0032101'] = userInfo.empName
          break
        }
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
    let opionTitle = '审核意见'
    let auditDateTitle = '审核时间'
    let auditTimeEditable = true

    switch (nodeCode) {
      case "gxjb_ward_nurse_audit":
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
                  showTime
                  allowClear={false}
                  value={moment(auditInfo.auditDate)}
                  disabled={!auditTimeEditable}
                  onChange={(_moment: moment.Moment) =>
                    setAuditInfo({ ...auditInfo, auditDate: _moment.format('YYYY-MM-DD HH:mm:ss') })} />
              </Col>
            </Row>
          </div>
        )
      case 'gxjb_big_dept_nurse_audit':
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
            {/* <Row>
              <Col span={6} className="row-title">不良事件定性:</Col>
              <Col span={18}>
                <Radio.Group
                  className='radio-group'
                  value={auditInfo.eventQualitative}
                  onChange={(e) =>
                    setAuditInfo({
                      ...auditInfo,
                      eventQualitative: e.target.value,
                    })
                  }>
                  <Radio value={"事故"} >事故</Radio>
                  <Radio value={"严重差错"} >严重差错</Radio>
                  <Radio value={"一般差错"} >一般差错</Radio>
                  <Radio value={"缺点"} >缺点</Radio>
                  <Radio value={"意外事件"} >意外事件</Radio>
                </Radio.Group>
              </Col>
            </Row> */}
            <Row>
              <Col span={6} className="row-title">谈论事件级别:</Col>
              <Col span={18}>
                <Radio.Group
                  className='radio-group'
                  value={auditInfo.eventLevel}
                  onChange={(e) =>
                    setAuditInfo({
                      ...auditInfo,
                      eventLevel: e.target.value,
                    })
                  }>
                  {/* <Radio value={"意外事件"} >意外事件</Radio> */}
                  <Radio value={"Ⅰ级事件"} >Ⅰ级事件</Radio>
                  <Radio value={"Ⅱ级事件"} >Ⅱ级事件</Radio>
                  <Radio value={"Ⅲ级事件"} >Ⅲ级事件</Radio>
                  <Radio value={"Ⅳ级事件"} >Ⅳ级事件</Radio>
                </Radio.Group>
              </Col>
            </Row>
            <Row>
              <Col span={6} className="row-title">
                处理意见：
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
                  showTime
                  allowClear={false}
                  value={moment(auditInfo.auditDate)}
                  disabled={!auditTimeEditable}
                  onChange={(_moment: moment.Moment) =>
                    setAuditInfo({ ...auditInfo, auditDate: _moment.format('YYYY-MM-DD HH:mm:ss') })} />
              </Col>
            </Row>
          </div>
        )
      case 'gxjb_nursing_nurse_audit':
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
            {formName == '难免压力性损伤备案申报表' ?
              <Row>
                <Col span={9} className="row-title">符合难免压力性损伤的申报条件:</Col>
                <Col span={15}>
                  <Radio.Group
                    className='radio-group'
                    value={auditInfo.eventQualitative}
                    onChange={(e) =>
                      setAuditInfo({
                        ...auditInfo,
                        eventQualitative: e.target.value,
                      })
                    }>
                    <Radio value={"是"} >是</Radio>
                    <Radio value={"否，请务必做好相关护理措施。"} >否，请务必做好相关护理措施。</Radio>
                  </Radio.Group>
                </Col>
              </Row> :
              // <Row>
              //   <Col span={6} className="row-title">不良事件定性:</Col>
              //   <Col span={18}>
              //     <Radio.Group
              //       className='radio-group'
              //       value={auditInfo.eventQualitative}
              //       onChange={(e) =>
              //         setAuditInfo({
              //           ...auditInfo,
              //           eventQualitative: e.target.value,
              //         })
              //       }>
              //       <Radio value={"事故"} >事故</Radio>
              //       <Radio value={"严重差错"} >严重差错</Radio>
              //       <Radio value={"一般差错"} >一般差错</Radio>
              //       <Radio value={"缺点"} >缺点</Radio>
              //     </Radio.Group>
              //   </Col>
              // </Row>
              <Row>
              <Col span={6} className="row-title">谈论事件级别:</Col>
              <Col span={18}>
                <Radio.Group
                  className='radio-group'
                  value={auditInfo.eventLevel}
                  onChange={(e) =>
                    setAuditInfo({
                      ...auditInfo,
                      eventLevel: e.target.value,
                    })
                  }>
                  <Radio value={"Ⅰ级事件"} >Ⅰ级事件</Radio>
                  <Radio value={"Ⅱ级事件"} >Ⅱ级事件</Radio>
                  <Radio value={"Ⅲ级事件"} >Ⅲ级事件</Radio>
                  <Radio value={"Ⅳ级事件"} >Ⅳ级事件</Radio>
                </Radio.Group>
                </Col>
                </Row>
            }
            <Row>
              <Col span={6} className="row-title">
                处理意见：
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
                  showTime
                  allowClear={false}
                  value={moment(auditInfo.auditDate)}
                  disabled={!auditTimeEditable}
                  onChange={(_moment: moment.Moment) =>
                    setAuditInfo({ ...auditInfo, auditDate: _moment.format('YYYY-MM-DD HH:mm:ss') })} />
              </Col>
            </Row>
          </div>
        )
      case 'gxjb_ward_handle':
        return (
          <div className='form1'>
            <Row>
              <Col span={6} className="row-title">
                整改情况：
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
                  showTime
                  allowClear={false}
                  value={moment(auditInfo.auditDate)}
                  disabled={!auditTimeEditable}
                  onChange={(_moment: moment.Moment) =>
                    setAuditInfo({ ...auditInfo, auditDate: _moment.format('YYYY-MM-DD HH:mm:ss') })} />
              </Col>
            </Row>
          </div>
        )
      case 'gxjb_nursing_officer_audit':
        return (
          <div className='form1'>
            <Row>
              <Col span={6} className="row-title">
                意见：
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
                  showTime
                  allowClear={false}
                  value={moment(auditInfo.auditDate)}
                  disabled={!auditTimeEditable}
                  onChange={(_moment: moment.Moment) =>
                    setAuditInfo({ ...auditInfo, auditDate: _moment.format('YYYY-MM-DD HH:mm:ss') })} />
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
                  showTime
                  allowClear={false}
                  value={moment(auditInfo.auditDate)}
                  disabled={!auditTimeEditable}
                  onChange={(_moment: moment.Moment) =>
                    setAuditInfo({ ...auditInfo, auditDate: _moment.format('YYYY-MM-DD HH:mm:ss') })} />
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
