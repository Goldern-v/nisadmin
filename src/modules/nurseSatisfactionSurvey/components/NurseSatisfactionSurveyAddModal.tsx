import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Col, Icon, Upload, DatePicker, Input, InputNumber, Modal, Radio, Row, Select, Spin } from 'src/vendors/antd'
import moment from 'moment'
import { authStore, appStore } from "src/stores";
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
  const [deptSelect, setDeptSelect] = useState(user.deptCode)
  const [questionnaire, setQuestionnaire] = useState('')
  const [questionnaireList, setQuestionnaireList] = useState([] as any)
  const [year, setYear]: any = useState(+moment().format('YYYY'))
  const [month, setMonth]: any = useState(+moment().format('MM'))
  const [yearList, setYearList] = useState([] as number[])
  const [monthList, setMonthList] = useState([] as string[])
  const [searchText, setSearchText] = useState('')
  const [searchText1, setSearchText1] = useState(user.empName)
  const [openDate, setOpenDate] = useState('')
  const [fileIdList, setFileIdList]: any = useState([])
  const [titleType, setTitleType] = useState<String>('')
  const [respondent, setRespondent]: any = useState([]);
  const dataArray = [respondent];
  const setArray = [setRespondent];

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
    }
    let nowYear: number = +moment().format('YYYY')
    setYearList([nowYear - 5, nowYear - 4, nowYear - 3, nowYear - 2, nowYear - 1, nowYear, nowYear + 1, nowYear + 2, nowYear + 3, nowYear + 4, nowYear + 5])
    setMonthList(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'])
  }, [
    props
  ])

  useEffect(() => {
    getSettingList()
  }, [])
  const getSettingList = () => {
    api
      .getSettingList()
      .then((res) => {
        setQuestionnaireList(res.data)
      })
  }
  const onClose = () => {
    setSearchText('')
    setSearchText1('')
    setMonth('')
    setDeptSelect('')
    setFileIdList([])
  }
  const onChangeSearchText = (e: any) => { setSearchText(e.target.value) }
  const onChangeSearchText1 = (e: any) => { setSearchText1(e.target.value) }
  const onChangeOpenDate = (e: any) => { setOpenDate(e.target.value) }
  // 取消标签审核人
  const onDeselect = (user: User | User[], number: any) => {
    let data = dataArray[number];
    let setData = setArray[number];
    if (user instanceof Array) {
      for (let i = 0; i < user.length; i++) {
        let index = data.findIndex((item: any) => item.key === user[i].key);
        if (index > -1) {
          data.splice(index, 1);
        }
      }
      setData([...data]);
    } else {
      let index = data.findIndex((item: any) => item.key === user.key);
      if (index > -1) {
        data.splice(index, 1);
        setData([...data]);
      }
    }
  };
  // 判断当前选择的是哪种类型 1-人员 2-角色
  // const judgeTypeItem = (value: any) => {
  //   let data = dataArray[value];
  //   if (data && data.length === 0) {
  //     return 1;
  //   } else {
  //     if (data[0].userList) {
  //       return data[0].userList[0].empNo ? 2 : 3;
  //     } else {
  //       return data[0].type === 1 ? 2 : 3;
  //     }
  //   }
  // };

  const openSelectPeopleModal = (value: any) => {
    // value 用于区分哪一种数据类型 0-提交人 1-审核人 2-二级 3-三级
    selectPeopleModal.show({
      checkedUserList: dataArray[value],
      messageType: 1,
      type: value,
      presentIndex: 0 // 这个数据没用
    });
  };

  const handleOk = () => {
    if (searchText == "") {
      message.error('标题不能为空！')
      return
    }
    api
      .saveOrUpdate(props.type, {
        month: month,
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
      })
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
      </Row>
      <Row>
        <Col span={6}>
          开放时间:
        </Col>
        <Col span={18}>
          <Input
            style={{ width: 250 }}
            value={openDate}
            onChange={onChangeOpenDate}
          />
        </Col>
      </Row>
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
      <Row>
        <Col span={6}>
          调查对象:
        </Col>
        <Col span={18}>
          <Form.Field name="respondent">
            <div className="divStyle">
              <Select
                mode="tags"
                placeholder="调查对象"
                value={respondent}
                labelInValue={true}
                style={{ width: "100%" }}
                open={false}
                onDeselect={(user: any) => onDeselect(user, 1)}
              />
              <ClickBtn onClick={() => openSelectPeopleModal(1)}>
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
`
const ClickBtn = styled.span`
  position: absolute;
  right: 0;
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
} 
`;