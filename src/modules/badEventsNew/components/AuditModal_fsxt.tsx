import React, { useState, useEffect, Fragment } from 'react'
import styled from 'styled-components'
import { Modal, Input, Select, Button, message as Message, Row, Col, Radio, message, DatePicker } from 'antd'
import { authStore } from 'src/stores'
import services from 'src/services/api'
import { observer } from 'mobx-react-lite'
import { badEventsNewService } from '../api/badEventsNewService'
import moment from 'moment'
import UserCheckModal from './UserCheckModal'
import TextTempleteModal from './TextTempleteModal'
// const commonApiService = services.commonApiService

const TextArea = Input.TextArea
const { Option } = Select
const options:any = [
    {
      value:'报告护理部'
    },
    {
      value:'报告质控科'
    },          
    {
      value:'报告院感办'
    },
    {
      value:'报告医务科'
    },
    {
      value:'报告相关职能科室'
    },
    {
      value:'个别培训'
    },
    {
      value:'在职教育'
    },          
    {
      value:'个案分析'
    },
    {
      value:'科室护士会讨论'
    },
    {
      value:'常规/流程/政策改变'
    },
    {
      value:'其他'
    },
  ]
const rectificationResult = [
  {value:'整改效果好'},
  {value:'基本已整改'},
  {value:'整改效果差'},
]
const initAuditInfo = (nodeCode:any = '') => {
  switch(nodeCode){
    case 'nursing_minister_audit':
      return {
        handleContent: '',
        yearCounts:'',
        noRectificationResult:'',
        isHappen:'',
        expand: '',
        auditDate: moment().format('YYYY-MM-DD'),
        noPass: false,
      }
    case 'nursing_minister_audit' :
      return {
        deptChangeDate:moment().format('YYYY-MM-DD'),// 科室整改日期
        reason:'', // 未整改原因
        rectificationEffect:'', // 整改效果
        effectEvaluation:'', // 是否整改
        confirmEffect:'', //护理部确认整改
        confirmRectificationEffect:'', //护理部确认整改效果
        confirmReason:'',// 护理部确认未整改原因
        handleContent: '',
        expand: '',
        auditDate: moment().format('YYYY-MM-DD'),
        noPass: false,
      }
    default :
     return {
      handleContent: '',
      expand: '',
      auditDate: moment().format('YYYY-MM-DD'),
      noPass: false,
    }
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
  const [showTextTemplete, setShowTextTemplete] = useState(false)
  const [textArr, setTextArr] = useState([])
  //验证用户弹窗显示
  const [userCheckVisible, setUserCheckVisible] = useState(false)

  const [confirmLoading, setConfirmLoading] = useState(false)

  useEffect(() => {
    if (!visible) {
      setShowTextTemplete(false)
      setTextArr([])
    }
  }, [visible])
  const showTextTempleteFn = (titleType:any)=>{
    badEventsNewService.getCommentList().then((res:any)=>{
      setShowTextTemplete(true)
      setTextArr(res.data)
    })
}

  const onItemClick = (item:any) => {
    // // item.value && setAuditInfo({ ...auditInfo, handleContent: auditInfo.handleContent+item.value })
    // try{
    //   document.execCommand(item.value);
    // } catch(e){
    //     console.log('浏览器不支持该功能');
    // }
  }

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
     * 需要与后端协商统一字段名
     */
    switch (nodeCode) {
      case 'nurse_handle':  //科护士长审核
        saveParams['B0039067'] = auditInfo.handleContent  //科护士长审核意见
        saveParams['B0039065'] = auditInfo.isHappen // 科室是否发生过类似事件
        saveParams['B0039066'] = auditInfo.yearCounts // 本年度第几次
        if (auditInfo.noPass) {
          // saveParams['B0002060'] = auditInfo.handleContent
          if (auditInfo.handleContent.trim().length <= 0) {
            message.warning('审核意见不能为空')
            return
          }
        }
        break;
      case 'nursing_minister_audit': //护理部审核
        // 是否不良事件
        if (auditInfo.noPass) {
          if (auditInfo.handleContent.trim().length <= 0) {
            message.warning('审核意见不能为空')
            return
          }
        }
        saveParams['B0002061'] = auditInfo.noPass ? '0' : '1'
        // 意见和日期
        saveParams['B0039071'] = auditInfo.deptChangeDate  //科室整改日期
        saveParams['B0039068'] = auditInfo.handleContent  //护理部审核意见
        saveParams['B0039069'] = auditInfo.effectEvaluation  //是否整改（预估）
        saveParams['B0039077'] = auditInfo.rectificationEffect  //整改效果（预估）
        saveParams['B0039070'] = auditInfo.reason  //未整改原因
        saveParams['B0039072'] = auditInfo.confirmEffect  //确认整改
        saveParams['B0039078'] = auditInfo.confirmRectificationEffect  //整改效果
        saveParams['B0039073'] = auditInfo.confirmReason  //未整改原因
        
        saveParams['B0039074'] = auditInfo.auditDate   // 护理部审核日期
        // saveParams['B0009020'] = userInfo.empName   //B0009020未跟后端做统一（待修改）
        // saveParams["B0010018"] = userInfo.empName   //护理优良事件报告表（待修改）
        break;
      case 'dept_handle':  //病区处理
        // 意见和日期
        saveParams['B0002062'] = auditInfo.handleContent
        saveParams['B0002057'] = auditInfo.handleContent
        saveParams['B0002056'] = auditInfo.auditDate
        params.noPass = false
        break
      case 'nursing_minister_comfirm': //护理部确认
        // 意见和日期
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
        setUserCheckVisible(false)
        onCancel()
      } else {
        if (res.desc) Message.error(res.desc)
      }
    }

    setConfirmLoading(true)
    console.log(JSON.stringify(dataOrigin.itemDataMap,saveParams));
    
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
    let auditTimeEditable = false

    switch (nodeCode) {
      case 'nurse_handle':
        opionTitle = '片区护长审核意见'
        auditDateTitle = '审核日期'
        if (auditInfo.noPass)
          opionTitle = ' 回退原因'
        break
      case 'nursing_minister_audit':
        opionTitle = '护理质量管理委员会意见'
        if (auditInfo.noPass)
          opionTitle = ' 回退原因'
        auditDateTitle = '审核日期'
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
                  <Radio value={false} >是</Radio>
                  <Radio value={true}>否</Radio>
                </Radio.Group>
              </Col>
            </Row>
            {!auditInfo.noPass && <Row>
              <Col span={6} className="row-title">
                {/* <span style={{ color: 'red', marginLeft: '-7px' }}>*</span> */}
                科室整改效果评估:
              </Col>
              <Col span={18}>
                <Select 
                  style={{ width: 220 }} 
                  value={auditInfo.effectEvaluation}
                  onChange={(e:any)=>setAuditInfo({ ...auditInfo, effectEvaluation: e })}
                >
                  <Option value='已整改'>已整改</Option>
                  <Option value='未整改'>未整改</Option>
                </Select>
              </Col>
            </Row>}
            {!auditInfo.noPass && auditInfo.effectEvaluation == '已整改' && <Row>
              <Col span={6} className="row-title">
                {/* <span style={{ color: 'red', marginLeft: '-7px' }}>*</span> */}
                整改效果：
              </Col>
              <Col span={18}>
                <Select 
                    style={{ width: 220 }} 
                    value={auditInfo.rectificationEffect}
                    onChange={(e:any)=>setAuditInfo({ ...auditInfo, rectificationEffect: e })}
                  >
                    <Option value='整改效果好'>整改效果好</Option>
                    <Option value='基本已整改'>基本已整改</Option>
                    <Option value='整改效果差'>整改效果差</Option>
                  </Select>
              </Col>
            </Row>}
            {!auditInfo.noPass && auditInfo.effectEvaluation == '未整改' && <Row>
              <Col span={6} className="row-title">
                {/* <span style={{ color: 'red', marginLeft: '-7px' }}>*</span> */}
                未整改原因：
              </Col>
              <Col span={18}>
                <Input  style={{ width: 250 }} value={auditInfo.reason} onInput={(e:any)=>{setAuditInfo({ ...auditInfo, reason: e.target.value })}}></Input>
              </Col>
            </Row>}
            <Row>
              <Col span={6} className="row-title">科室整改日期：</Col>
              <Col span={18}>
                <DatePicker
                  allowClear={false}
                  value={moment(auditInfo.deptChangeDate)}
                  onChange={(_moment: any) =>
                    setAuditInfo({ ...auditInfo, deptChangeDate: _moment.format('YYYY-MM-DD') })} />
              </Col>
            </Row>
            {!auditInfo.noPass && <Row>
              <Col span={6} className="row-title">
                {/* <span style={{ color: 'red', marginLeft: '-7px' }}>*</span> */}
                护理部确认:
              </Col>
              <Col span={18}>
                <Select 
                  style={{ width: 220 }} 
                  value={auditInfo.confirmEffect}
                  onChange={(e:any)=>setAuditInfo({ ...auditInfo, confirmEffect: e })}
                >
                  <Option value='已整改'>已整改</Option>
                  <Option value='未整改'>未整改</Option>
                </Select>
              </Col>
            </Row>}
            {!auditInfo.noPass && auditInfo.confirmEffect == '已整改' && <Row>
              <Col span={6} className="row-title">
                {/* <span style={{ color: 'red', marginLeft: '-7px' }}>*</span> */}
                整改效果：
              </Col>
              <Col span={18}>
                <Select 
                    style={{ width: 220 }} 
                    value={auditInfo.confirmRectificationEffect}
                    onChange={(e:any)=>setAuditInfo({ ...auditInfo, confirmRectificationEffect: e })}
                  >
                    <Option value='整改效果好'>整改效果好</Option>
                    <Option value='基本已整改'>基本已整改</Option>
                    <Option value='整改效果差'>整改效果差</Option>
                  </Select>
              </Col>
            </Row>}
            {!auditInfo.noPass && auditInfo.confirmEffect == '未整改' && <Row>
              <Col span={6} className="row-title">
                {/* <span style={{ color: 'red', marginLeft: '-7px' }}>*</span> */}
                未整改原因：
              </Col>
              <Col span={18}>
                <Input  style={{ width: 250 }} value={auditInfo.confirmReason} onInput={(e:any)=>{setAuditInfo({ ...auditInfo, confirmReason: e.target.value })}}></Input>
              </Col>
            </Row>}
            <Row>
              <Col span={6} className="row-title">护理部确认日期：</Col>
              <Col span={18}>
                <DatePicker
                  allowClear={false}
                  value={moment(auditInfo.auditDate)}
                  onChange={(_moment: moment.Moment) =>
                    setAuditInfo({ ...auditInfo, auditDate: _moment.format('YYYY-MM-DD') })} />
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
                  onFocus={(e)=>{showTextTempleteFn(opionTitle)}}
                  onChange={(e) =>
                    setAuditInfo({ ...auditInfo, handleContent: e.target.value })} />
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
            {!auditInfo.noPass && <Row>
              <Col span={6} className="row-title">
                {/* <span style={{ color: 'red', marginLeft: '-7px' }}>*</span> */}
                科室发生过类似事件:
              </Col>
              <Col span={18}>
                <Select 
                  style={{ width: 220 }} 
                  value={auditInfo.isHappen}
                  onChange={(e:any)=>setAuditInfo({ ...auditInfo, isHappen: e })}
                >
                  <Option value='是'>是</Option>
                  <Option value='否'>否</Option>
                </Select>
              </Col>
            </Row>}
            {!auditInfo.noPass && auditInfo.isHappen == '是' && <Row>
              <Col span={6} className="row-title">
                {/* <span style={{ color: 'red', marginLeft: '-7px' }}>*</span> */}
                本年度第
              </Col>
              <Col span={18}>
                <Input  style={{ width: 50 }} value={auditInfo.yearCounts} onInput={(e:any)=>{setAuditInfo({ ...auditInfo, yearCounts: e.target.value })}}></Input>
                次
              </Col>
            </Row>}
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
        <TextTempleteModal 
          showTextTempleteFn={showTextTempleteFn}
          onItemClick={onItemClick} 
          showTextTemplete={showTextTemplete} 
          textArr={textArr}
          setShowTextTemplete={setShowTextTemplete}
        />
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
