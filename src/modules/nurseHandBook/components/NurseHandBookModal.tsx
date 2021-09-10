import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Col, Icon, Upload, DatePicker, Input, InputNumber, Modal, Radio, Row, Select, Spin } from 'src/vendors/antd'
import moment from 'moment'
import { authStore, appStore } from "src/stores";
import BaseTable from 'src/components/BaseTable'
import { DoCon } from 'src/components/BaseTable'
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
  let [query, setQuery] = useState({
    pageSize: 20,
    pageIndex: 1
  })
  const { visible, onOk, onCancel, isAdd, params, isOtherEmp } = props
  const [loading, setLoading] = useState(false)
  let user = JSON.parse(sessionStorage.getItem('user') || '[]')

  const [deptSelect, setDeptSelect] = useState(user.deptCode)
  const [deptList, setDeptList] = useState([] as any)
  const [pageLoading, setPageLoading] = useState(false)
  const [dataTotal, setDataTotal] = useState(0)
  const [tableData, setTableData] = useState([])
  const [year, setYear]:any = useState(+moment().format('YYYY'))
  const [month, setMonth]  = useState<String>('01')
  const [id, setId]  = useState<String>('01')
  const [yearList, setYearList] = useState([] as number[])
  const [monthList, setMonthList] = useState([] as string[])
  const [searchText, setSearchText] = useState('')
  const [searchText1, setSearchText1] = useState(user.empName)
  const [fileList, setFileList] = useState<Array<Number>>([])
  const [fileIdList, setFileIdList]:any = useState([])
  const [titleType, setTitleType]  = useState<String>('')


  let [c, setC] = useState(0);
  let header:any = {'App-Token-Nursing':'51e827c9-d80e-40a1-a95a-1edc257596e7','Auth-Token-Nursing':authStore.getAuthToken()}
  useEffect(() => {
    if(isAdd){
      if(props.type == 'year') {
        setTitleType("新建年计划")
      }else if(props.type == 'month') {
        setTitleType("新建月计划")
      }else if(props.type == 'conclusion') {
        setTitleType("新建年总结")
      }else if(props.type == 'innovation') {
        setTitleType("新建创新项目记录")
      }
      setId('')      
    }else{
      if(props.type == 'year') {
        setTitleType("编辑年计划")
      }else if(props.type == 'month') {
        setTitleType("编辑月计划")
      }else if(props.type == 'conclusion') {
        setTitleType("编辑年总结")
      }else if(props.type == 'innovation') {
        setTitleType("编辑创新项目记录")
      }
      console.log(params);
      setId(params.id)
      setSearchText(params.title)
      setSearchText1(user.empName)
    }
    
    let list = props.deptList || []
    setDeptList([...list])
    let nowYear:number = +moment().format('YYYY')
    setYearList([nowYear-5,nowYear-4,nowYear-3,nowYear-2,nowYear-1,nowYear,nowYear+1,nowYear+2,nowYear+3,nowYear+4,nowYear+5])
    setMonthList(['01','02','03','04','05','06','07','08','09','10','11','12'])
  }, [
    props
  ])

  useEffect(() => {
    setDeptSelect(user.deptCode)
  }, []);

  const onClose = () => {
    setSearchText('')
    setMonth('')
    setFileIdList([])
  }
  const getData = () => { 
    setPageLoading(true)
    // api.queryPageList({
    //     ...query,
    //     wardCode: deptSelect,
    //   })
    //   .then((res) => {
    //     setPageLoading(false)
    //     setDataTotal(res.data.totalCount)
    //     setTableData(res.data.list)
    //   }, err => setPageLoading(false))
  }
  const handlePageSizeChange = (current: number, size: number) => {
    setQuery({ ...query, pageSize: size, pageIndex: 1 })
  }
  const handlePageChange = (current: number) => {
    setQuery({ ...query, pageIndex: current })
  }
  //删除
  const onDelete = (record: any, index: any) => {
    Modal.confirm({
      title: '确认删除该随访小组？',
      centered: true,
      onOk: () => {
        tableData.splice(index, 1);
        let newArr = [...tableData];
        setTableData(newArr)
        if(record.teamId) {
          // api
          // .delete({
          //   teamId: record.teamId,
          // })
          // .then((res) => {
          //   message.success('删除成功')
          // }, )
        }
      }
    })
  }
  const uploadOnChange = (info:any) => {
    console.log(info?.file?.response?.data);
    if(info?.file?.response?.data){
      setFileIdList(info?.file?.response?.data)
    }
    let fileList = [...info.fileList];

    fileList = fileList.slice(-2);

    fileList = fileList.map(file => {
      if (file.response) {
        file.url = file.response.url;
      }
      return file;
    });

    setFileList(fileList);
  };
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
    confirmLoading={loading}
    afterClose={() => onClose()}
    visible={visible}
    onOk={handleOk}
    onCancel={() => onCancel()}>
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
            disabled={true}
            showSearch
            filterOption={(input: any, option: any) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            onChange={(val: string) => setDeptSelect(val)}>
            <Select.Option value={''}>全部</Select.Option>
            {deptList.map((item: any, idx: any) =>
              <Select.Option key={idx} value={item.code}>{item.name}</Select.Option>)}
          </Select>
        </Col>
      </Row>
      {props.type != 'month' && <Row>
        <Col span={6}>
          年份
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
          月份
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
        <Upload {...props} action="/crNursing/api/nurseManual/attachment/nurseManual" headers={header} fileList={fileList} onChange={uploadOnChange}>
        <Button>
          <Icon type="upload" /> Upload
        </Button>
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