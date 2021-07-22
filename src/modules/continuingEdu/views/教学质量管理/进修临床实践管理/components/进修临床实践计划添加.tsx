import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Modal, Row, Col, Input, DatePicker, Select } from 'antd'
import { currentMonth } from 'src/utils/date/rangeMethod'
import moment from 'moment'

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
    empNo: '',
    projectName: '',
    startDate: startDate.format('YYYY-MM-DD'),
    endDate: endDate.format('YYYY-MM-DD'),
    finishField: finishFieldList[0],
    audiencer: audiencerList[0],
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

  const handleSave = () => {
    console.log(editParams)
    onOk()
  }

  useEffect(() => {
    if (visible) {
      let newEditParams = initParams(advancedId, empNo)

      Object.keys(newEditParams).map((key: string) => {
        if (originParams[key] !== '')
          newEditParams[key] = originParams[key]
      })

      setEditParams(newEditParams)
    }
  }, [visible])

  return <Modal
    title={`${editParams.id ? '修改' : '添加'}计划`}
    onCancel={() => onCancel()}
    onOk={() => handleSave()}>
    <Wrapper>
      <Row gutter={15}>
        <Col span={8}>
          <span>姓名：</span>
          <Input readOnly value={empName} />
        </Col>
        <Col span={8}>
          <span>科室：</span>
          <Input readOnly value={deptName} />
        </Col>
        <Col span={8} className="align-right">
          <span>进修专科：</span>
          <Input readOnly value={juniorCollege} />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <span>计划名称：</span>
          <Input
            value={editParams.projectName}
            onChange={(e) =>
              setEditParams({ ...editParams, projectName: e.target.value })} />
        </Col>
        <Col span={12} className="align-right">
          <span>预计完成时间：</span>
          <RangePicker
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
      <Row>
        <Col span={12}>
          <span>完成场所：</span>
          <Select
            value={editParams.finishField}
            onChange={(finishField: string) =>
              setEditParams({ ...editParams, finishField })}
            placeholder="请选择完成场所">
            {finishFieldList.map((item: any) => (
              <Option key={item.code} value={item.code}>{item.name}</Option>
            ))}
          </Select>
        </Col>
        <Col span={12} className="align-right">
          <span>受众对象：</span>
          <Select
            value={editParams.audiencer}
            onChange={(audiencer: string) =>
              setEditParams({ ...editParams, audiencer })}
            placeholder="请选择完成场所">
            {audiencerList.map((item: any) => (
              <Option key={item.code} value={item.code}>{item.name}</Option>
            ))}
          </Select>
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
  .align-right{
    text-align: right;
  }
`