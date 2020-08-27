import React, { useState, useEffect, Fragment } from 'react'
import styled from 'styled-components'
import { Modal, Input, Select, Button, message as Message, Row, Col, Radio } from 'antd'
import { authStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import badEventsNewService from '../api/badEventsNewService'
import Moment from 'moment'

import UserCheckModal from './UserCheckModal'

const api = new badEventsNewService()

const { TextArea } = Input
const { Option } = Select

export interface Props {
  visible: boolean //审核窗口显示
  onOk: any //审核操作完成回调
  paramMap?: any //不良事件表单数据
  status: string //当前不良事件状态
  title?: string, //当前不良事件审核标题
  onCancel: any //窗口关闭回调
  eventCode: string //不良事件类型代码
  reportDept: any //上报人科室名称代码
  id: any //不良事件id
}

export default observer(function AduitModal(props: Props) {
  const { visible, onOk, onCancel, status, paramMap, id, eventCode, reportDept, title } = props
  //用于操作和提交的不良事件表单数据
  let initFormMap: any = {}
  const [formMap, setFormMap] = useState(initFormMap)
  //审核时除表单以外其他的提交数据
  let initInstance: any = {}
  const [instance, setInstance] = useState(initInstance)
  //验证用户弹窗显示
  const [userCheckVisible, setUserCheckVisible] = useState(false)

  const [confirmLoading, setConfirmLoading] = useState(false)

  //转发科室列表
  const [dealerDepts, setDealerDepts] = useState([] as any)

  useEffect(() => {
    if (visible) {
      let user = authStore.user
      if (user)
        setInstance({
          instanceId: id,
          operatorWardCode: user.deptCode,
          operatorWardName: user.deptName,
          operatorStatus: status,
          operatorName: user.empName,
          operatorEmpNo: user.empNo,
          operateDate: Moment().format('YYYY-MM-DD'),
          operatorPW: '',
          isAllowNext: true,
          departmentCode: '',
          departmentName: '',
          sac: ''
        })

      let newMap: any = {}
      // switch (status) {
      //   case 'dept_submit':
      //     newMap[`${eventCode}_khszshyj_explain`] = ''
      //     break
      //   case 'nurse_auditor':
      //     newMap[`${eventCode}_hkbshyj_explain`] = ''
      //     break
      // }

      setFormMap({ ...paramMap, ...newMap })
    }
  }, [visible])

  const getDealerDepts = () => {
    api.getDeptList().then((res) => {
      let data = res.data
      if (data instanceof Array)
        setDealerDepts(
          data.map((item: any) => {
            return {
              name: item.deptName,
              value: item.deptCode
            }
          })
        )
    })
  }

  // const handleDeptChange = (name: any) => {
  //   let department_code = ''
  //   let department_name = name

  //   if (department_name == reportDept.name) {
  //     department_code = reportDept.code
  //   } else {
  //     for (let i = 0; i < dealerDepts.length; i++) {
  //       if (dealerDepts[i].name == department_name) {
  //         department_code = dealerDepts[i].value
  //         break
  //       }
  //     }
  //   }

  //   setFormMap({
  //     ...formMap,
  //     [`${eventCode}_department_code`]: department_code,
  //     [`${eventCode}_department_name`]: department_name
  //   })
  // }

  const handleOkBtn = () => {
    setUserCheckVisible(true)
  }
  const handleUserCheckOk = (userAudit: any) => {
    auditFormSubmit(userAudit)
    setUserCheckVisible(false)
  }

  const auditFormSubmit = (userAudit: any) => {
    let params = {} as any

    params = {
      ...instance,
      paramMap: { ...formMap },
      operatorEmpNo: userAudit.empNo,
      operatorPW: userAudit.password,
      departmentCode: formMap[`${eventCode}_department_code`] || '',
      departmentName: formMap[`${eventCode}_department_name`] || '',
      sac: formMap[`${eventCode}_sac_option`],
    }

    delete params.operatorStatus

    setConfirmLoading(true)
    api
      .aduit(params)
      .then((res) => {
        setConfirmLoading(false)
        if (res.code == 200) {
          onOk()
          Message.success('操作成功')
        } else {
          if (res.desc) Message.error(res.desc)
        }
      }, () => setConfirmLoading(false))
  }

  const ModalWidth = () => {
    switch (status) {
      case 'quality_controller':
      case 'department_auditor':
      case 'qc_summary':
        return 900
      default:
        return 520
    }
  }

  const AduitPannelContent = () => {
    const commonCon = <Row>
      <Col span={4}>
        审核结果：
      </Col>
      <Col span={20}>
        <Radio.Group
          className='radio-group'
          value={instance.isAllowNext}
          onChange={(e) =>
            setInstance({ ...instance, isAllowNext: e.target.value })
          }>
          <Radio value={true} >通过</Radio>
          <Radio value={false}>退回</Radio>
        </Radio.Group>
      </Col>
    </Row>

    switch (status) {
      case 'nurse_auditor':
        return (
          <div className='form1'>
            {commonCon}
            <Row>
              <Col span={4}>审核意见：</Col>
              <Col span={20}>
                <TextArea
                  autosize={{ minRows: 2 }}
                  value={formMap[`${eventCode}_khszshyj_explain`]}
                  onChange={(e) =>
                    setFormMap({ ...formMap, [`${eventCode}_khszshyj_explain`]: e.target.value })
                  } />
              </Col>
            </Row>
          </div>
        )
      case 'nusring_department_auditor':
        return (
          <div>
            {commonCon}
            {eventCode === 'badevent_nys_fall' && <Row>
              <Col span={4}>事件等级：</Col>
              <Col span={20}>
                <Radio.Group
                  className='radio-group'
                  value={formMap[`${eventCode}_sjdj_option`]}
                  onChange={(e) =>
                    setFormMap({ ...formMap, [`${eventCode}_sjdj_option`]: e.target.value })
                  }>
                  <Radio value="警告事件" >警告事件</Radio>
                  <Radio value="不良事件">不良事件</Radio>
                  <Radio value="未造成后果事件">未造成后果事件</Radio>
                  <Radio value="隐患事件">隐患事件</Radio>
                </Radio.Group>
              </Col>
            </Row>}
            <Row>
              <Col span={4}>审核意见：</Col>
              <Col span={20}>
                <TextArea
                  autosize={{ minRows: 2 }}
                  value={formMap[`${eventCode}_hkbshyj_explain`]}
                  onChange={(e) =>
                    setFormMap({ ...formMap, [`${eventCode}_hkbshyj_explain`]: e.target.value })
                  } />
              </Col>
            </Row>
          </div>
        )
      case 'pressure_auditor':
        return (
          <div className='form1'>
            {commonCon}
            <Row>
              <Col span={4}>审核意见：</Col>
              <Col span={20}>
                <TextArea
                  autosize={{ minRows: 2 }}
                  value={formMap[`${eventCode}_skzkxzyj_explain`]}
                  onChange={(e) =>
                    setFormMap({ ...formMap, [`${eventCode}_skzkxzyj_explain`]: e.target.value })
                  } />
              </Col>
            </Row>
          </div>
        )
      case 'department_back':
        return (
          <div className='form1'>
            <Row>
              <Col span={6}>
                <div style={{ lineHeight: '30px', fontSize: '14px' }}>转归(病区填写)：</div>
              </Col>
              <Col span={18}>
                <Radio.Group
                  value={formMap[`${eventCode}_zgbqtx_explain`]}
                  onChange={(e) =>
                    setFormMap({ ...formMap, [`${eventCode}_zgbqtx_explain`]: e.target.value })
                  }>
                  <Radio value="愈合">愈合</Radio>
                  <Radio value="好转">好转</Radio>
                  <Radio value="无效">无效</Radio>
                </Radio.Group>
              </Col>
            </Row>
          </div>
        )
      default:
        return <span>未知审核流程</span>
    }
  }

  return (
    <Fragment>
      <Modal
        className='badevent-audit-modal'
        title={title}
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
`
