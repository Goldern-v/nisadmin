import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Col, Icon, Upload, DatePicker, Input, InputNumber, Modal, Radio, Row, Select, Spin } from 'src/vendors/antd'
import moment from 'moment'
import { authStore, appStore } from "src/stores";
import NurseHandBookService from '../services/NurseHandBookService'
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
export default function NurseHandBookModal(props: any) {
  const { visible, onOk, onCancel, isAdd, params, isOtherEmp } = props
  let user = JSON.parse(sessionStorage.getItem('user') || '[]')
  const [deptSelect, setDeptSelect] = useState(user.deptCode)
  const [deptList, setDeptList] = useState([] as any)
  const [year, setYear]:any = useState(+moment().format('YYYY'))
  const [month, setMonth]:any  = useState(+moment().format('MM'))
  const [id, setId]  = useState<String>('')
  const [yearList, setYearList] = useState([] as number[])
  const [monthList, setMonthList] = useState([] as string[])
  const [searchText, setSearchText] = useState('')
  const [searchText1, setSearchText1] = useState(user.empName)
  const [fileList, setFileList]:any = useState([])
  const [fileIdList, setFileIdList]:any = useState([])
  const [titleType, setTitleType]  = useState<String>('')
  let header:any = {'App-Token-Nursing':'51e827c9-d80e-40a1-a95a-1edc257596e7','Auth-Token-Nursing':authStore.getAuthToken()}
  useEffect(() => {
    if(isAdd){
      if(props.type == 'year') {
        setTitleType("新建年计划")
      }else if(props.type == 'month') {
        setTitleType("新建月计划")
        setMonth(+moment().format('MM'))
      }else if(props.type == 'conclusion') {
        setTitleType("新建年总结")
      }else if(props.type == 'innovation') {
        setTitleType("新建创新项目记录")
      }
      setId('')  
      setSearchText('')
      setSearchText1(user.empName)  
      setYear(+moment().format('YYYY'))
      setDeptSelect(user.deptCode)
    }else{
      if(props.type == 'year') {
        setTitleType("编辑年计划")
      }else if(props.type == 'month') {
        setTitleType("编辑月计划")
        setMonth(params.month)
      }else if(props.type == 'conclusion') {
        setTitleType("编辑年总结")
      }else if(props.type == 'innovation') {
        setTitleType("编辑创新项目记录")
      }
      setId(params.id)
      setSearchText(params.title)
      setYear(params.year)
      setSearchText1(user.empName)
      setDeptSelect(user.deptCode)
      params.files?.forEach((item:any) => {
        item.uid = item.id
      })
      let idList = params.files?.map((item:any) => {
        return item.id
      })
      setFileIdList(idList)
      setFileList(params.files)//展示列表
    }
    let list = props.deptList || []
    setDeptList([...list])
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
    setFileList([])
  }
  const uploadOnChange = (info:any) => {
    let fileList = [...info.fileList];
    fileList = fileList.slice(-5);
    fileList = fileList.map(file => {
      if (file.response) {
        file.id = file?.response?.data[0];
      }
      return file;
    });
    setFileList(fileList);
    let idList = fileList?.map((item:any) => {
      return item.id
    })
    setFileIdList(idList)
  };
  const removeOnChange = (info:any) => {
    let pro = new Promise((resolve,reject)=>{
      Modal.confirm({
        title: '确认删除该附件？',
        centered: true,
        onOk: () => {
          api
          .deleteAttachment(info.id).then((res) => {
            resolve(true)
            message.success('删除成功')
          })
        },
        onCancel:()=>{
          resolve(false)
        }
      })
    })
    return pro.then(res=>res)
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
        id:id,
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
          科室:
        </Col>
        <Col span={18}>
          <Select
            value={deptSelect}
            style={{ width: 250 }}
            showSearch
            filterOption={(input: any, option: any) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            onChange={(val: string) => setDeptSelect(val)}>
            {deptList.map((item: any, idx: any) =>
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
      <Row>
        <Col span={6}>
          上传附件:
        </Col>
        <Col span={18}>
        <Upload 
          {...props} 
          action="/crNursing/api/nurseManual/attachment/nurseManual" 
          accept={".doc,.docx,.pdf,.ppt,.pptx,.xls,.xlsx,.jpg,.png"} 
          headers={header} 
          fileList={fileList} 
          onChange={uploadOnChange}
          onRemove={removeOnChange}
          multiple={true}
          >
          <Button type="primary" className="mb-20">
            <Icon type="upload" /> 上传
          </Button>
          <div className="accept">支持格式：*.jpg;*.png;*.pdf;*.doc;*.docx;*.ppt;*.pptx;*.xls;*.xlsx;</div>
        </Upload>
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