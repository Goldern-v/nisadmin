import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { ScrollUl } from 'src/components/common'
import { appStore } from 'src/stores/index'
import { Spin } from 'antd'
import HomeApi from 'src/modules/home/api/HomeApi.ts'
import { getTimeString } from 'src/utils/date/timeCalculation'

//引入图标
import { ReactComponent as HLZD } from '../images/护理制度.svg'
import { ReactComponent as EXCL } from '../images/excl.svg'
import { ReactComponent as PDF } from '../images/pdf.svg'
import { ReactComponent as WORLD } from '../images/word.svg'
import { ReactComponent as OTHER } from '../images/其他.svg'
import { ReactComponent as PICTURE } from '../images/图片.svg'

export interface Props extends RouteComponentProps {}

export default function NursingSystem() {
  const [loadingTable, setLoadingTable] = useState(false)
  const [tableData, setTableData] = useState([])
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const getMealList1 = () => {
    setLoadingTable(true)
    HomeApi.getNursingSystem(pageIndex, pageSize).then((res) => {
      setLoadingTable(false)
      setTableData(res.data.list)
    })
  }

  const getMealList = () => {
    let qualityCheck = HomeApi.getCatalogByType("护理汇编")
    let nurseFileCheck = HomeApi.getCatalogByType('护理规程')
    setLoadingTable(true)
    Promise.all([qualityCheck, nurseFileCheck]).then(values => {
      setLoadingTable(false)
      let array = (values[0].data || []).concat(values[1].data || [])
      setTableData(array)
      }).catch(() => {
    })
  }


  const setIcon = (type:any) => {
    return type === 'pdf' ? <PDF /> : ( type === 'word' ? <WORLD /> : <EXCL/>)
  }

  useEffect(() => {
   getMealList()
  }, [])

  //封装函数
  const renderSubMenu = () => {
    return tableData.map((item: any,index:any) => {
      return (
        <Li key={index}>
          {/* <Icon>{setIcon(item.type)}</Icon> */}
          <Content className='content'>{item.name}</Content>
          {/* <span>.{item.type}</span>
          <Time className='time'>{getTimeString(item.uploadTime)}</Time> */}
        </Li>
      )
    })
  }

  return (
    <Wrapper>
      <Spin className='loading' spinning={loadingTable}/>
      <Title>
        <I>
          <HLZD />
        </I>
        <World>护理制度</World>
        <More onClick={() => {appStore.history.push('/nursingRules')}}>更多 ></More>
      </Title>
      <Ul>{renderSubMenu()}</Ul>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background: red;
  width: 335px;
  height: calc(50vh - 55px);
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px -1px 0px 0px rgba(243, 156, 18, 1);
  border-radius: 2px;
  border: 1px solid rgba(221, 221, 221, 1);
  box-sizing: border-box;
  position: relative;
  .loading{
    position:absolute;
    top: 50%; 
    left:50%;
    margin-left: -10px;
    margin-top: -10px;
  }
`
const Title = styled.div`
  border-bottom: 1px solid #ddd;
  width: 335px;
  height: 45px;
  padding: 0 15px;
  box-sizing: border-box;
`
const Ul = styled(ScrollUl)`
  height: calc(50vh - 102px);
  width: 335px;
  overflow: auto;
  padding-inline-start: 0 !important;
`
const I = styled.span`
  display: inline-block;
  margin-top: 15px;
  vertical-align: middle;
`
const World = styled.span`
  display: inline-block;
  margin-left: 10px;
  font-size: 15px;
  font-weight: 900;
  color: rgba(51, 51, 51, 1);
  vertical-align: middle;
  margin-bottom: -9px;
`
const More = styled.span`
  float: right;
  height: 17px;
  font-size: 12px;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 17px;
  margin-top: 15px;
  &:hover {
    cursor: pointer;
    color: #00a65a;
  }
`
const Li = styled.li`
  padding: 7px 15px 7px 15px;
  border-bottom: 1px solid #ddd;
  box-sizing: border-box;
  list-style-type: none;
  /* &:hover {
    cursor: pointer;
  }
  &:hover .content {
    color: #00a65a;
  }
  &:hover .time {
    color: #00a65a;
  } */
`
const Icon = styled.div`
  display:inline-block;
  width: 24px;
  height: 24px;
  border-radius: 1px 0px 0px 1px;
  margin-right: 8px;
  vertical-align: middle;
`
const Content = styled.span`
  display: inline-block;
  max-width: 145px;
  font-size: 13px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 18px;
  vertical-align: middle;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`
const Time = styled.span`
  float: right;
  vertical-align: middle;
  font-size: 12px;
  margin-top: 3px;
`
