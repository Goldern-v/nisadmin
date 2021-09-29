import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Col, Icon, Upload, DatePicker, Input, InputNumber, Modal, Radio, Row, Select, Spin } from 'src/vendors/antd'
import moment from 'moment'
// import NurseHandBookService from '../services/NurseSatisfactionSurveyService'
import { message } from 'antd/es'


// const api = new NurseHandBookService();
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
  const [year, setYear]: any = useState(+moment().format('YYYY')+"年")
  const [month, setMonth]: any = useState(+moment().format('MM')+"月")
  const [yearList, setYearList] = useState([] as string[])
  const [monthList, setMonthList] = useState([] as string[])
  const [searchText, setSearchText] = useState('')
  const [searchText1, setSearchText1] = useState("护士长值班表")
  const [fileIdList, setFileIdList]: any = useState([])
  const [titleType, setTitleType] = useState<String>('')


  useEffect(() => {
    if (isAdd) {
      setTitleType("新建护士长值班表")
    } else {
      setTitleType("修改护士长值班表")
    }
    let nowYear: number = +moment().format('YYYY')
    setYearList([nowYear - 5 + "年", nowYear - 4 + "年", nowYear - 3 + "年", nowYear - 2 + "年", nowYear - 1 + "年", nowYear + "年", nowYear + 1 + "年", nowYear + 2 + "年", nowYear + 3 + "年", nowYear + 4 + "年", nowYear + 5 + "年"])
    setMonthList(['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'])
  }, [
    props
  ])

  useEffect(() => {
    getSettingList()
  }, [])
  const getSettingList = () => {
    // api
    //   .getSettingList()
    //   .then((res) => {
    //     setQuestionnaireList(res.data)
    //   })
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
  const handleSave = () => {}
  const handleCancel = () => {
    onCancel && onCancel()
  }
  const handleOk = () => {
    if (searchText == "") {
      message.error('标题不能为空！')
      return
    }
    // api
    //   .saveOrUpdate(props.type, {
    //     month: month,
    //     year: year,
    //     title: searchText,
    //     deptCode: deptSelect,
    //     deptName: user.deptName,
    //     creatorName: searchText1,
    //     fileIds: fileIdList,
    //   })
    //   .then((res) => {
    //     message.success('操作成功')
    //     onOk && onOk()
    //   })
  }
  return <Modal
    title={titleType}
    width={500}
    centered
    footer={[
      <Button key="back" loading={loading} onClick={handleCancel}>
        取消
      </Button>,
      <Button key="submit" type="primary" loading={loading} onClick={handleSave}>
        暂存
      </Button>,
      <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
        发布
      </Button>,
      
    ]}
    confirmLoading={loading}
    afterClose={() => onClose()}
    visible={visible}
    onOk={handleOk}
    onCancel={() => onCancel && onCancel()}>
    <Wrapper>
      <Row>
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
      </Row>
      <Row>
        <Col span={6}>
          月份:
        </Col>
        <Col span={18}>
          <Select
            value={month}
            style={{ width: 250 }}
            showSearch
            onChange={(val: any) => setMonth(val)}>
            {monthList.map((item: any, idx: any) =>
              <Select.Option key={idx} value={item}>{item}</Select.Option>)}
          </Select>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          名称:
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
          类型:
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