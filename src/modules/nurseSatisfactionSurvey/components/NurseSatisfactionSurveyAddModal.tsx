import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Col, Icon, Upload, DatePicker, Input, InputNumber, Modal, Radio, Row, Select, Spin } from 'src/vendors/antd'
import moment from 'moment'
import { authStore, appStore } from "src/stores";
import NurseHandBookService from '../services/NurseSatisfactionSurveyService'
import { message } from 'antd/es'
const api = new NurseHandBookService();
export interface Props {
  visible: boolean,
  onOk: Function,
  onCancel: Function,
  params?: any,
  isOtherEmp?: boolean,
  isAdd?: boolean,
}
export default function NurseSatisfactionSurveyAddModal(props: any) {
  const { visible, onOk, onCancel, isAdd, params, isOtherEmp } = props
  const [loading, setLoading] = useState(false)
  let user = JSON.parse(sessionStorage.getItem('user') || '[]')
  const [deptSelect, setDeptSelect] = useState(user.deptCode)
  const [questionnaire, setQuestionnaire] = useState('')
  const [questionnaireList, setQuestionnaireList] = useState([] as any)
  const [year, setYear]:any = useState(+moment().format('YYYY'))
  const [month, setMonth]:any  = useState(+moment().format('MM'))
  const [yearList, setYearList] = useState([] as number[])
  const [monthList, setMonthList] = useState([] as string[])
  const [searchText, setSearchText] = useState('')
  const [searchText1, setSearchText1] = useState(user.empName)
  const [fileIdList, setFileIdList]:any = useState([])
  const [titleType, setTitleType]  = useState<String>('')
  useEffect(() => {
    if(isAdd){
      setTitleType("新建")
    }else{
      setTitleType("修改")
    }
    let nowYear:number = +moment().format('YYYY')
    setYearList([nowYear-5,nowYear-4,nowYear-3,nowYear-2,nowYear-1,nowYear,nowYear+1,nowYear+2,nowYear+3,nowYear+4,nowYear+5])
    setMonthList(['1','2','3','4','5','6','7','8','9','10','11','12'])
  }, [
    props
  ])
  const onClose = () => {
    setSearchText('')
    setSearchText1('')
    setMonth('')
    setDeptSelect('')
    setFileIdList([])
  }
  const onChangeSearchText = (e: any) => {setSearchText(e.target.value)}
  const onChangeSearchText1 = (e: any) => {setSearchText1(e.target.value)}
  const handleOk = () => {
    if (searchText == "") {
      message.error('标题不能为空！')
      return
    }
      api
      .saveOrUpdate(props.type,{
        month:month,
        year: year,
        title: searchText,
        deptCode: deptSelect,
        deptName: user.deptName,
        creatorName: searchText1,
        fileIds: fileIdList,
      })
      .then((res) => {
        message.success('操作成功')
        onOk && onOk()
    }, )
  }
  return <Modal
    title={titleType}
    width={500}
    centered
    okText={'保存'}
    confirmLoading={loading}
    afterClose={() => onClose()}
    visible={visible}
    onOk={handleOk}
    onCancel={() => onCancel && onCancel()}>
    <Wrapper>
      <Row>
        <Col span={6}>
          标题:
        </Col>
        <Col span={18}>
          <Input
            style={{ width: 250 }}
            value={searchText}
            onChange={onChangeSearchText}
          />
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          调查表:
        </Col>
        <Col span={18}>
          <Select
            value={questionnaire}
            style={{ width: 250 }}
            disabled={true}
            showSearch
            filterOption={(input: any, option: any) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            onChange={(val: string) => setQuestionnaire(val)}>
            {questionnaireList.map((item: any, idx: any) =>
              <Select.Option key={idx} value={item.code}>{item.name}</Select.Option>)}
          </Select>
        </Col>
      </Row>
      {props.type != 'month' && <Row>
        <Col span={6}>
          年份:
        </Col>
        <Col span={18}>
          <Select
            value={year}
            style={{ width: 250 }}
            showSearch
            onChange={(val: any) => setYear(val)}>
            {yearList.map((item: any, idx: any) =>
              <Select.Option key={idx} value={item}>{item}</Select.Option>)}
          </Select>
        </Col>
      </Row>}
      {props.type == 'month' && <Row>
        <Col span={6}>
          月份:
        </Col>
        <Col span={18}>
          <Select
            value={year}
            style={{ width: 115 }}
            showSearch
            onChange={(val: any) => setYear(val)}>
            {yearList.map((item: any, idx: any) =>
              <Select.Option key={idx} value={item}>{item}</Select.Option>)}
          </Select>
          <Select
            value={month}
            style={{ width: 115 }}
            className={"ml-20"}
            showSearch
            onChange={(val: any) => setMonth(val)}>
            {monthList.map((item: any, idx: any) =>
              <Select.Option key={idx} value={item}>{item}</Select.Option>)}
          </Select>
        </Col>
      </Row>}
      <Row>
        <Col span={6}>
          创建人:
        </Col>
        <Col span={18}>
          <Input
            style={{ width: 250 }}
            disabled={true}
            value={searchText1}
            onChange={onChangeSearchText1}
          />
        </Col>
      </Row>
    </Wrapper>
  </Modal>
}
const Wrapper = styled.div`
.ml-20 {
  margin-left: 20px;
}
.mb-20 {
  margin-bottom: 20px;
}
.accept {
  width:259px;
  position: absolute;
  top:0px;
  left:85px;
}
.ant-row{
  line-height: 32px;
  margin-bottom: 10px;
  &:last-of-type{
    margin-bottom: 0;
  }
  .ant-col:nth-of-type(2n-1){
    text-align: right;
    padding-right: 5px;
  }
  .star{
    color: red;
  }
}
`