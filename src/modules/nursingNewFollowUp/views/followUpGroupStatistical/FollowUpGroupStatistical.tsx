import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { PageHeader, Place } from 'src/components/common'
import { Select, Spin } from 'src/vendors/antd'
import FollowUpGroupStatisticalServices from './services/FollowUpGroupStatisticalServices'
import moment from 'moment'
export interface Props { }
const api = new FollowUpGroupStatisticalServices();
export default function FollowUpGroupStatistical(props: any) {

  let user = JSON.parse(sessionStorage.getItem('user') || '[]')
  const [deptSelect, setDeptSelect] = useState(user.deptCode)
  const [deptName, setDdeptName] = useState(user.deptName)
  const [taskStatus, setTaskStatus]: any = useState('')
  const [year, setYear]: any = useState(+moment().format('YYYY'))
  const [month, setMonth]: any = useState(moment().format('MM'))
  const [cycle, setCycle]: any = useState('')
  const [statusList, setStatusList]: any = useState([])
  const [tableData, setTableData] = useState([])
  const [pageLoading, setPageLoading] = useState(false)
  const [loading, setLoading] = useState(false)
  let yearList:number[] = []
  if(yearList.length == 0){
    for(let i = 2019; i <= +moment().format('YYYY') + 3; i++ ){
      yearList.push(i)
    }
  }
  let monthList:string[] = ['01','02','03','04','05','06','07','08','09','10','11','12']
  let cycleList:string[] = []
  if(cycleList.length == 0){
    for(let i = 1; i <= 12; i++ ){
      cycleList.push(`${i}个月`)
    }
  }
  //科室列表
  const [deptList, setDeptList] = useState([] as any)
  //导出
  const onExport = (record: any) => {

  }
 
  const getData = () => {
    setPageLoading(true)
    api
      .queryNursePageList({
        wardCode: deptSelect,
        status: taskStatus,
      })
      .then((res) => {
        setPageLoading(false)
        let list = res.data.list.map((item: any)=> {
         item.visitTeam = item.visitTeam || [{}]
         return item
        })
        setTableData(list)
      }, err => setPageLoading(false))
  }
  
  useEffect(() => {
    getData()
  }, [
    taskStatus,
    month,
    year,
    deptSelect,
  ])

  useEffect(() => {
    setDeptSelect(user.deptCode)
    getTemplateList(user.deptCode)
    getDeptList();
  }, []);
  const getDeptList = () => {
    api.getNursingUnitAll().then(res => {
      if (res.data.deptList instanceof Array) setDeptList(res.data.deptList);
    })
  }
  const getTemplateList = (val: any) => {
    api.visitTeam({wardCode:val}).then(res => {
      if (res.data instanceof Array) setStatusList(res.data);
    })
  }
  return <Wrapper>
    <PageHeader>
      <Place />
      <span className='label'>护理单元:</span>
        <Select
          value={deptSelect}
          style={{ width: 230 }}
          showSearch
          filterOption={(input: any, option: any) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          onChange={(val: string) => {
            setDeptSelect(val)
            getTemplateList(val)
            deptList.map((item:any,index:any)=>{
              if(item.code === val){
                setDdeptName(item.name)
              }
            })
          }}>
          {/* <Select.Option value={''}>全部</Select.Option> */}
          {deptList.map((item: any, idx: any) =>
            <Select.Option key={idx} value={item.code}>{item.name}</Select.Option>)}
        </Select>
        <span className='label'>任务状态:</span>
        <Select style={{ width: 100 }} value={taskStatus} onChange={(value: any) => setTaskStatus(value)}>
          <Select.Option value=''>全部</Select.Option>
          {statusList.map((item: any, index: number) => (
            <Select.Option key={index} value={item.teamId}>
              {item.teamName}
            </Select.Option>
          ))}
        </Select>
        <span className='label'>时间:</span>
        <Select style={{ width: 80 }} value={year} onChange={(value: any) => setYear(value)}>
          {yearList.map((item: any, index: number) => (
            <Select.Option key={index} value={item}>
              {item}
            </Select.Option>
          ))}
        </Select>
        <Select style={{ width: 80, marginLeft: '5px' }} value={month} onChange={(value: any) => setMonth(value)}>
          {monthList.map((item: any, index: number) => (
            <Select.Option key={index} value={item}>
              {item}
            </Select.Option>
          ))}
        </Select>
        <span className='label'>随访周期:</span>
        <Select style={{ width: 100 }} value={cycle} onChange={(value: any) => setCycle(value)}>
          <Select.Option value=''>全部</Select.Option>
          {cycleList.map((item: any, index: number) => (
            <Select.Option key={index} value={item}>
              {item}
            </Select.Option>
          ))}
        </Select>
        <Button type="primary" onClick={() => getData()}>
          查询
        </Button>
        <Button onClick={onExport}>
          导出
        </Button>
      </PageHeader>
      <MainCon>
      <Spin spinning={loading}>
        <div className="text-title">{deptName}-{month}月份护理随访计划</div>
      </Spin>
    </MainCon>
  </Wrapper>
}
const Wrapper = styled.div`
  height: calc(100vh - 170px);
  position: relative;
  width: calc(100vw - 240px);
  margin-left:20px;
  .ml-20 {
    margin-left: 20px;
  }
`

const MainCon = styled.div`
  box-shadow: rgba(0, 0, 0, 0.5) 0px 5px 10px 0px;
  border-radius: 6px;
  background: rgb(255, 255, 255);
  padding: 0 30px 20px 30px;
  box-sizing: border-box;
  height: calc(100vh - 120px);
  overflow-y: auto;
  .ant-spin-container{
    overflow: hidden;
  }
  .text-title{
    font-size: 24px;
    padding: 10px 0;
    border-bottom: 1px solid #f0f0f0;
    text-align: center;
    font-weight: bold;
    color: #000;
  }
`
