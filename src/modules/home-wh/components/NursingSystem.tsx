import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { ScrollUl } from 'src/components/common'
import { appStore } from 'src/stores/index'
import { Spin } from 'antd'
import HomeApi from 'src/modules/home/api/HomeApi.ts'
import { ReactComponent as HLZD } from '../images/icon/HLZD.svg'

export interface Props extends RouteComponentProps {}

export default function NursingSystem() {
  const [loadingTable, setLoadingTable] = useState(false)
  const [tableData, setTableData] = useState([])

  const getMealList = () => {
    setLoadingTable(true)
    HomeApi.getCatalogByType('').then((res) => {
      setLoadingTable(false)
      console.log(res.data.list)
      setTableData(res.data.list)
    })
  }

  useEffect(() => {
    getMealList()
  }, [])

  const toDetails = (item: any) => {
    appStore.history.push(`/nursingRulesNewDetail?bookId=${item.id}`)
  }

  //封装函数
  const renderSubMenu = () => {
    return tableData.map((item: any, index: any) => {
      return (
        <Li key={index} onClick={() => toDetails(item)}>
          <img src={require('../images/list.png')} alt='' className='img' />
          <Content className='content'>{item.bookName}</Content>
        </Li>
      )
    })
  }

  return (
    <Wrapper>
      <Spin className='loading' spinning={loadingTable} />
      <Title>
        <I>
          <HLZD />
        </I>
        <World>护理制度</World>
        <More
          onClick={() => {
            appStore.history.push('/nursingRulesNew')
          }}
        >
          更多 >
        </More>
      </Title>
      <Ul>{renderSubMenu()}</Ul>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background: red;
  width: 335px;
  height: calc(50vh - 47px);
  background: rgba(255, 255, 255, 1);
  /* box-shadow: 0px -1px 0px 0px rgba(243, 156, 18, 1); */
  border-radius: 2px;
  border: 1px solid rgba(221, 221, 221, 1);
  box-sizing: border-box;
  position: relative;
  .loading {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -10px;
    margin-top: -10px;
  }
`
const Title = styled.div`
  /* border-bottom: 1px solid #ddd; */
  width: 335px;
  height: 45px;
  padding: 0 15px;
  box-sizing: border-box;
  background: #7bbc9b;
`
const Ul = styled(ScrollUl)`
  height: calc(50vh - 95px);
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
  color: #fff;
  vertical-align: middle;
  margin-bottom: -9px;
`
const More = styled.span`
  float: right;
  height: 17px;
  font-size: 12px;
  font-weight: 400;
  color: #fff;
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
  &:hover {
    cursor: pointer;
  }
  &:hover .content {
    color: #00a65a;
  }
  .img {
    width: 20px;
    height: 20px;
    border-radius: 1px 0px 0px 1px;
    margin-right: 8px;
    vertical-align: middle;
  }
`
const Content = styled.span`
  display: inline-block;
  max-width: 250px;
  font-size: 13px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 18px;
  vertical-align: middle;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`
