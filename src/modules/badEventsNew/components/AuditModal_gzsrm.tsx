import React, { useState, useEffect, Fragment } from 'react'
import styled from 'styled-components'
import { Modal, Input, Select, Button, message as Message, Row, Col, Radio, message } from 'antd'
import { authStore } from 'src/stores'
import services from 'src/services/api'
import { observer } from 'mobx-react-lite'
import badEventsNewService from '../api/badEventsNewService'
import Moment from 'moment'

import UserCheckModal from './UserCheckModal'

const api = new badEventsNewService()
const commonApiService = services.commonApiService

const { TextArea } = Input
const { Option } = Select

export interface Props {
  visible: boolean //审核窗口显示
  onOk: any //审核操作完成回调
  paramMap?: any //不良事件表单数据
  instanceOrign?: any //不良事件表单基本数据
  status: string //当前不良事件状态
  title?: string, //当前不良事件审核标题
  onCancel: any //窗口关闭回调
  eventCode: string //不良事件类型代码
  id: any //不良事件id
}

/** 患者坠床∕跌倒记录表 伤害选项*/
const hlb_ddzcsh_option_list = [
  '无', '1级', '2级', '3级', '4级', '死亡'
]
/** 压力性损伤事件报告表 护理质量管理委员会压疮分期 */
const zlwyh_ycfq_explain_list = [
  '1期', '2期', '3期', '4期', '不可分期', '深部组织损伤', '医疗器械相关性压力性损伤', '粘膜压力性损伤'
]

export default observer(function AduitModal(props: Props) {
  const { visible, onOk, onCancel, status, paramMap, id, eventCode, title, instanceOrign } = props
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
  // const [dealerDepts, setDealerDepts] = useState([] as any)
  //转发科室护士列表
  const [returnDeptNurseList, setReturnDeptNurseList] = useState([] as any[])

  useEffect(() => {
    if (visible) {
      // console.log(isZhuanke, patientInfo)
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
      /**清空审核意见 */
      switch (status) {
        case 'nurse_auditor':
          newMap[`${eventCode}_khszshyj_explain`] = ''
          break
        case 'nusring_department_auditor':
          newMap[`${eventCode}_hlzlglwyh_explain`] = ''
          break
        case 'pressure_auditor':
          newMap[`${eventCode}_skzkxzyj_explain`] = ''
          break
      }

      setFormMap({ ...paramMap, ...newMap })
    }
  }, [visible])

  useEffect(() => {
    if (instanceOrign.deptCode)
      getReturnDeptNurseList()
  }, [instanceOrign])

  // const getDealerDepts = () => {
  //   api.getDeptList().then((res) => {
  //     let data = res.data
  //     if (data instanceof Array)
  //       setDealerDepts(
  //         data.map((item: any) => {
  //           return {
  //             name: item.deptName,
  //             value: item.deptCode
  //           }
  //         })
  //       )
  //   })
  // }

  const getReturnDeptNurseList = () => {
    commonApiService.userDictInfo(instanceOrign.deptCode)
      .then(res => {
        if (res.data) setReturnDeptNurseList(res.data)
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
    if (
      status === 'nurse_auditor' &&
      formMap[`${eventCode}_khszshyj_explain`].trim() === ''
    ) {
      message.warn('审核意见不能为空')
      return
    }

    setUserCheckVisible(true)
  }
  const handleUserCheckOk = (userAudit: any) => {
    // console.log(userAudit)
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

    // 转归科室推送护士
    if (formMap.nurseList)
      params.nurseList = formMap.nurseList.map((item: any) => ({
        empName: item.label,
        empNo: item.key
      }))

    // 流程审核意见
    const auditMind = () => {
      switch (status) {
        case "nurse_auditor":
          return formMap[`${eventCode}_khszshyj_explain`];
        case "nusring_department_auditor":
          return formMap[`${eventCode}_hlzlglwyh_explain`];
        case "pressure_auditor":
          return formMap[`${eventCode}_skzkxzyj_explain`];
      }
    }

    // 填充护理组长/护士长字段
    if (status == 'nurse_auditor') {
      params.paramMap[`${eventCode}_hlzzhsz_empno`] = userAudit.empNo
      params.paramMap[`${eventCode}_hlzzhsz_explain`] = authStore.user?.empName
    }

    params.auditMind = auditMind()

    delete params.paramMap.nurseList
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
              <Col span={4}>
                <span style={{ color: 'red', marginLeft: '-7px' }}>*</span>
                审核意见：
              </Col>
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
            {eventCode === 'badevent_nys_fall' && (
              <React.Fragment>
                <Row>
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
                </Row>
                <Row>
                  <Col span={4}>伤害等级：</Col>
                  <Col span={20}>
                    <Radio.Group
                      className='radio-group'
                      value={formMap[`${eventCode}_hlb_ddzcsh_option`]}
                      onChange={(e) =>
                        setFormMap({ ...formMap, [`${eventCode}_hlb_ddzcsh_option`]: e.target.value })
                      }>
                      {hlb_ddzcsh_option_list.map((val: string) => <Radio value={val} key={val}>{val}</Radio>)}
                    </Radio.Group>
                  </Col>
                </Row>
              </React.Fragment>
            )}
            {eventCode === 'badevent_nys_pressure' && (
              <Row>
                <Col span={4}>事件等级：压疮分期</Col>
                <Col span={20}>
                  <Select
                    value={formMap[`${eventCode}_zlwyh_ycfq_explain`]}
                    onChange={(val: any) =>
                      setFormMap({ ...formMap, [`${eventCode}_zlwyh_ycfq_explain`]: val })
                    }>
                    {zlwyh_ycfq_explain_list.map((val: string) => <Option value={val} key={val}>{val}</Option>)}
                  </Select>
                </Col>
              </Row>
            )}
            <Row>
              <Col span={4}>审核意见：</Col>
              <Col span={20}>
                <TextArea
                  autosize={{ minRows: 2 }}
                  value={formMap[`${eventCode}_hlzlglwyh_explain`]}
                  onChange={(e) =>
                    setFormMap({ ...formMap, [`${eventCode}_hlzlglwyh_explain`]: e.target.value })
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
              <Col span={4}>
                <div style={{ lineHeight: '30px', fontSize: '14px' }}>推送护士：</div>
              </Col>
              <Col span={20}>
                <Select
                  value={formMap.nurseList || []}
                  mode="multiple"
                  style={{ width: '100%' }}
                  onChange={(val: any[]) => {
                    if (val.length > 0)
                      setFormMap({ ...formMap, nurseList: [val[val.length - 1]] })
                    else
                      setFormMap({ ...formMap, nurseList: [] })
                  }}
                  filterOption={(input: any, option: any) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  labelInValue>
                  {returnDeptNurseList.map((item: any) => <Option value={item.empNo} key={item.empNo}>{item.empName}</Option>)}
                </Select>
              </Col>
            </Row>
          </div>
        )
      // case 'nurse_comfirm':
      //   return (
      //     <div className='form1'>
      //       <Row>
      //         <Col span={4}>
      //           <div style={{ lineHeight: '30px', fontSize: '14px' }}>确认护士长：</div>
      //         </Col>
      //         <Col span={20}>
      //           <Select value={''}>
      //             <Option></Option>
      //           </Select>
      //         </Col>
      //       </Row>
      //     </div>
      //   )
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
