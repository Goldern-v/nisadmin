import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Modal, Row, Col, Input, DatePicker, Select, AutoComplete } from 'antd'
import { currentMonth } from 'src/utils/date/rangeMethod'
import { advancedManageServices } from './../services/AdvancedManageServices'
import moment from 'moment'
import { message } from 'src/vendors/antd'

const Option = Select.Option
const RangePicker = DatePicker.RangePicker
const TextArea = Input.TextArea

export interface Props {
  visible: boolean,
  originParams: any,
  advancedId: string,
  empNo: string,
  empName: string,
  deptName: string,
  juniorCollege: string,
  onOk: Function,
  onCancel: Function,
}

const finishFieldList = [
  { code: '科内落实', name: '科内落实' },
  { code: '院内落实', name: '院内落实' },
  { code: '社区', name: '社区' },
]

const audiencerList = [
  { code: '医生', name: '医生' },
  { code: '护士', name: '护士' },
  { code: '患者', name: '患者' },
  { code: '家属', name: '家属' },
  { code: '群众', name: '群众' },
]

const initParams = (advancedId: string, empNo: string) => {
  const [startDate, endDate] = currentMonth()
  return {
    id: '',
    advancedId,
    empNo,
    projectName: '',
    startDate: startDate.format('YYYY-MM-DD'),
    endDate: endDate.format('YYYY-MM-DD'),
    finishField: finishFieldList[0].code,
    audiencer: audiencerList[0].code,
    reason: '',
    concreteMeasure: '',
    completion: '',
    impactAssessment: '',
  } as any
}

export default function 进修临床实践计划添加(props: Props) {
  const {
    visible,
    originParams,
    advancedId,
    onOk,
    onCancel,
    empName,
    empNo,
    deptName,
    juniorCollege,
  } = props

  const [editParams, setEditParams] = useState(initParams(advancedId, empNo) as any)
  const [loading, setLoading] = useState(false)

  const handleSave = () => {
    setLoading(true)

    advancedManageServices
      .saveOrUpdateUserWorkPlan(editParams)
      .then(res => {
        setLoading(false)
        message.success('保存成功')
        onOk()
      }, () => setLoading(false))
  }

  useEffect(() => {
    if (visible) {
      let newEditParams = initParams(advancedId, empNo)

      Object.keys(newEditParams).map((key: string) => {
        if (originParams[key] || originParams[key] === 0)
          newEditParams[key] = originParams[key]
      })

      setEditParams(newEditParams)
    }
  }, [visible])

  return <Modal
    centered
    title={`${editParams.id ? '修改' : '添加'}计划`}
    width={800}
    confirmLoading={loading}
    visible={visible}
    onCancel={() => onCancel()}
    onOk={() => handleSave()}>
    <Wrapper>
      <Row gutter={15}>
        <Col span={8}>
          <span>姓名：</span>
          <Input readOnly value={empName} className="flex-1" />
        </Col>
        <Col span={8}>
          <span>科室：</span>
          <Input readOnly value={deptName} className="flex-1" />
        </Col>
        <Col span={8} >
          <span>进修专科：</span>
          <Input readOnly value={juniorCollege} className="flex-1" />
        </Col>
      </Row>
      <Row gutter={15}>
        <Col span={12}>
          <span>计划名称：</span>
          <Input
            className="flex-1"
            value={editParams.projectName}
            onChange={(e) =>
              setEditParams({ ...editParams, projectName: e.target.value })} />
        </Col>
        <Col span={12} >
          <span>预计完成时间：</span>
          <RangePicker
            className="flex-1"
            allowClear={false}
            value={[
              moment(editParams.startDate),
              moment(editParams.endDate)
            ]}
            onChange={([newStartDate, newEndDate]: any[]) =>
              setEditParams({
                ...editParams,
                startDate: newStartDate.format('YYYY-MM-DD'),
                endDate: newEndDate.format('YYYY-MM-DD'),
              })} />
        </Col>
      </Row>
      <Row gutter={15}>
        <Col span={12}>
          <span>完成场所：</span>
          <AutoComplete
            className="flex-1"
            value={editParams.finishField}
            placeholder="请选择受众对象"
            dataSource={finishFieldList.map((item: any) => ({ value: item.code, text: item.name }))}
            onChange={(finishField: any) =>
              setEditParams({ ...editParams, finishField })} />
        </Col>
        <Col span={12} >
          <span>受众对象：</span>
          <AutoComplete
            className="flex-1"
            value={editParams.audiencer}
            placeholder="请选择受众对象"
            dataSource={audiencerList.map((item: any) => ({ value: item.code, text: item.name }))}
            onChange={(audiencer: any) =>
              setEditParams({ ...editParams, audiencer })} />
        </Col>
      </Row>
      <div className="sub-title">原因或理由：</div>
      <div className="content">
        <TextArea
          value={editParams.reason}
          onChange={(e) =>
            setEditParams({ ...editParams, reason: e.target.value })}
          placeholder={"内容控制在300字以内"}
          autosize={{ minRows: 3 }}
          maxLength={300} />
      </div>
      <div className="sub-title">具体措施：</div>
      <div className="content">
        <TextArea
          value={editParams.concreteMeasure}
          onChange={(e) =>
            setEditParams({ ...editParams, concreteMeasure: e.target.value })}
          placeholder={"内容控制在500字以内"}
          autosize={{ minRows: 5 }}
          maxLength={500} />
      </div>
      <div className="sub-title">完成情况：</div>
      <div className="content">
        <TextArea
          value={editParams.completion}
          onChange={(e) =>
            setEditParams({ ...editParams, completion: e.target.value })}
          placeholder={"内容控制在100字以内"}
          autosize={{ minRows: 2 }}
          maxLength={100} />
      </div><div className="sub-title">效果评价：</div>
      <div className="content">
        <TextArea
          value={editParams.impactAssessment}
          onChange={(e) =>
            setEditParams({ ...editParams, impactAssessment: e.target.value })}
          placeholder={"内容控制在100字以内"}
          autosize={{ minRows: 2 }}
          maxLength={100} />
      </div>
    </Wrapper>
  </Modal>
}

const Wrapper = styled.div`
  .ant-col{
    display: flex;
    margin-bottom: 15px;
    &>span:first-of-type{
      display: inline-block;
      text-align: right;
      line-height: 30px;
      font-size: 14px;
    }
    .flex-1{
      flex: 1;
    }
  }
  .sub-title{
    font-size: 14px;
    line-height: 30px;
    margin-bottom: 5px;
    margin-top: 15px;
  }
`