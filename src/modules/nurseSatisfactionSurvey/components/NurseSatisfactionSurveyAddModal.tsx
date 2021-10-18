import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Col, DatePicker, Input, Modal, Row, Select } from 'src/vendors/antd'
import moment from 'moment'
import Form from "src/components/Form/Form";
import NurseHandBookService from '../services/NurseSatisfactionSurveyService'
import { message } from 'antd/es'
import SelectPeopleModal from "./SelectPeopleModal";
import createModal from "src/libs/createModal";

const api = new NurseHandBookService();
export interface Props {
  visible: boolean,
  onOk: Function,
  onCancel: Function,
  params?: any,
  isOtherEmp?: boolean,
  isAdd?: boolean,
}
interface User {
  label?: string;
  key: string;
}
export interface CheckUserItem {
  key: string;
  userList: any[];
}
export default function NurseSatisfactionSurveyAddModal(props: any) {
  const { visible, onOk, onCancel, isAdd, params, isOtherEmp } = props
  const [loading, setLoading] = useState(false)
  const selectPeopleModal = createModal(SelectPeopleModal);
  let user = JSON.parse(sessionStorage.getItem('user') || '[]')
  const [questionnaire, setQuestionnaire] = useState('')
  const [questionnaireList, setQuestionnaireList] = useState([] as any)
  const [year, setYear]: any = useState(+moment().format('YYYY'))
  const [month, setMonth]: any = useState(+moment().format('MM'))
  const [yearList, setYearList] = useState([] as number[])
  const [monthList, setMonthList] = useState([] as string[])
  const [searchText, setSearchText] = useState('')
  const [searchText1, setSearchText1] = useState(user.empName)
  const [openDate, setOpenDate]: any = useState([])
  const [titleType, setTitleType] = useState<String>('')
  const [respondent, setRespondent]: any = useState([]);
  const setArray = [setRespondent];
  const dataArray = [respondent];

  const onOkCallBack = (
    checkedUserList: CheckUserItem[],
    type: any,
    presentIndex: any
  ) => {
    setArray[type](checkedUserList);
  };
  useEffect(() => {
    if (isAdd) {
      setTitleType("新建")
    } else {
      setTitleType("修改")
      setSearchText(params.title)
      setMonth(params.month)
      setYear(params.year)
      setOpenDate([moment(params.startTime),moment(params.endTime)])
      setQuestionnaire(params.settingId)
      let tempParticipantList = params.participantList&&params.participantList.length&&params.participantList.map((item:any)=>{
        return {...item,key:item.empNo,label:item.empName}
      })
      setRespondent(tempParticipantList) 
    }
    let nowYear: number = +moment().format('YYYY')
    setYearList([nowYear - 5, nowYear - 4, nowYear - 3, nowYear - 2, nowYear - 1, nowYear, nowYear + 1, nowYear + 2, nowYear + 3, nowYear + 4, nowYear + 5])
    setMonthList(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'])
    setMonth(+moment().format('MM'))
    setYear(+moment().format('YYYY'))
    setSearchText1(user.empName)
  }, [
    props
  ])
  useEffect(() => {
    getSettingList()
  }, [])
  const getSettingList = () => {
    api.getSettingList()
      .then((res) => {
        setQuestionnaireList(res.data)
      })
  }
  const onClose = () => {
    setSearchText('')
    setSearchText1('')
    setMonth('')
    setYear('')
    setOpenDate([])
    setQuestionnaire('')
    setRespondent([])
  }
  const onChangeSearchText = (e: any) => { setSearchText(e.target.value) }
  const onChangeSearchText1 = (e: any) => { setSearchText1(e.target.value) }
  // 取消调查对象
  const onDeselect = (user:any) => {
    let delIndex;
    delIndex = respondent.findIndex((item:any)=>item.empNo == user.key)
    respondent.splice(delIndex,1)
    setRespondent([...respondent])
  };
  const openSelectPeopleModal = () => {
    selectPeopleModal.show({
      checkedUserList: respondent || [],
      messageType: 2,
      type: 0,
      presentIndex: 0
    });
  };
  const handleOk = () => {
    if (searchText == "") {
      message.error('标题不能为空！')
      return
    }
    let tempArr:any = JSON.parse(JSON.stringify(respondent))
    respondent.map((item:any,index:any)=>{
      if(!item.empNo){
        let arr:any = []
        arr.splice(arr.length,0,...item.userList)
        tempArr.splice(index,1,...arr)
      }
    })
    let startTime = openDate[0] ? moment(openDate[0]).format('YYYY-MM-DD') : ''
    let endTime = openDate[0] ? moment(openDate[1]).format('YYYY-MM-DD') : ''
    if(isAdd){
      api
      .surveyCreate({
        title:searchText,
        month: month,
        year: year,
        startTime,
        endTime,
        participantList:tempArr,
        settingId:questionnaire,
      })
      .then((res) => {
        message.success('保存成功')
        onOk && onOk()
        onClose()
      })
    }else{
      api
      .surveyEdit({
        title:searchText,
        month: month,
        year: year,
        startTime,
        endTime,
        participantList:tempArr,
        settingId:questionnaire,
        id:params.id,
        status:params.status,
      })
      .then((res) => {
        message.success('保存成功')
        onOk && onOk()
        onClose()
      })
    }
    
  }
  return <Modal
    title={titleType}
    width={600}
    centered
    okText={'保存'}
    confirmLoading={loading}
    afterClose={() => onClose()}
    visible={visible}
    onOk={handleOk}
    onCancel={() => {
      onCancel && onCancel()
      onClose()
    }}>
    <Wrapper>
      <Row>
        <Col span={6}>
          标题:
        </Col>
        <Col span={18}>
          <Input
            style={{ width: 300 }}
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
            style={{ width: 300 }}
            showSearch
            filterOption={(input: any, option: any) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            onChange={(val: string) => setQuestionnaire(val)}>
            {questionnaireList.map((item: any, idx: any) =>
              <Select.Option key={idx} value={item.id}>{item.text}</Select.Option>)}
          </Select>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          月份:
        </Col>
        <Col span={18}>
          <Select
            value={year}
            style={{ width: 140 }}
            showSearch
            onChange={(val: any) => setYear(val)}>
            {yearList.map((item: any, idx: any) =>
              <Select.Option key={idx} value={item}>{item}</Select.Option>)}
          </Select>
          <Select
            value={month}
            style={{ width: 140 }}
            className={"ml-20"}
            showSearch
            onChange={(val: any) => setMonth(val)}>
            {monthList.map((item: any, idx: any) =>
              <Select.Option key={idx} value={item}>{item}</Select.Option>)}
          </Select>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          开放时间:
        </Col>
        <Col span={18}>
          <DatePicker.RangePicker
            allowClear
            style={{ width: 300 }}
            placeholder={['开始时间', '结束时间']}
            value={openDate}
            onChange={(value: any) => setOpenDate(value)}
          />
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          创建人:
        </Col>
        <Col span={18}>
          <Input
            style={{ width: 300 }}
            disabled={true}
            value={searchText1}
            onChange={onChangeSearchText1}
          />
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          调查对象:
        </Col>
        <Col span={18}>
          <Form.Field name="respondent">
            <div className="divStyle">
              <Select
                mode="tags"
                value={respondent}
                labelInValue={true}
                style={{ width: 300 }}
                open={false}
                onDeselect={onDeselect}
              />
              <ClickBtn onClick={() => openSelectPeopleModal()}>
                ...
              </ClickBtn>
            </div>
          </Form.Field>
        </Col>
      </Row>
    </Wrapper>
    <selectPeopleModal.Component onOkCallBack={onOkCallBack} />
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
.divStyle {
  width: 250px;
}
`
const ClickBtn = styled.span`
  position: absolute;
  right: 114px;
  top: 0;
  border: 1px solid #ccc;
  border-left: none;
  width: 50px;
  height: 100%;
  line-height: 28px;
  cursor: pointer;
  text-align: center;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}`