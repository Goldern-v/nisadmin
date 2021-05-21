import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { appStore } from 'src/stores'
import { ColumnProps } from 'src/vendors/antd'
import BaseTable, { TabledCon } from 'src/components/BaseTable'
import { Link } from 'react-router-dom'

export interface Props { }

export default function SatisfyInvestigationDetail() {
  const { queryObj, history } = appStore
  const [personList, setPersonList] = useState([] as any[])
  const [detailInfo, setDetailInfo] = useState({} as any)

  const [formVisible, setFormVisible] = useState(false)
  const [formId, setFormId] = useState('')
  const [loading, setLoading] = useState(false)

  const columns: ColumnProps<any>[] = [

  ]

  const getDetailData = () => {
    console.log('getDetailData', queryObj.id)
  }

  useEffect(() => {
    getDetailData()
  }, [])

  return <Wrapper>
    <TopPannel>
      <NavCon>
        <Link to="/satisfyInvestigation">护士满意度调查表</Link>
        <span>/</span>
        <span>详情</span>
      </NavCon>
      <MainTitle>{queryObj.title || detailInfo.title}</MainTitle>
      <SubContent>
        <span className="content">由Janzen于2021-01-25 13:39创建</span>
        <span className="label">单元:</span>
        <span className="content">急诊护理科室</span>
        <span className="label">时间:</span>
        <span className="content">2021年1月</span>
        <span>共调查39位护士</span>
        <span>满意人数：  39人</span>
        <span>满意度：100%</span>
      </SubContent>
      <ButtonGroups>
        <Button>导出</Button>
        <Button onClick={() => history.goBack()}>返回</Button>
      </ButtonGroups>
    </TopPannel>
    <MainPannel>
      <TableWrapper>
        <BaseTable dataSource={personList} loading={loading} columns={columns} />
      </TableWrapper>
    </MainPannel>
  </Wrapper>
}

const Wrapper = styled.div``

const TopPannel = styled.div`
  height: 100px;
  border-bottom: 1px solid #ddd;
  background: #fff;
  padding: 10px 15px;
  font-size: 12px;
  position: relative;
`
const MainTitle = styled.div`
  font-size: 24px;
  color: #000;
  min-height: 36px;
  min-width:100px;
`
const SubContent = styled.div`
  span{
    vertical-align:middle;
    &.label{
      margin-right: 5px;
    }
    &.content{
      margin-right: 15px;
      display: inline-block;
      /* min-width: 60px; */
    }
  }
`
const ButtonGroups = styled.div`
  position: absolute;
  right: 15px;
  top: 35px;
  button{
    margin-right:10px;
    &:last-of-type{
      margin-right:0;
    }
  }
`
const MainPannel = styled.div`
  flex: 1;
  padding-top: 15px;
  padding-bottom: 15px;
`

const ActiveText = styled.span`
  cursor: pointer;
  color: #1db38b;
  &:hover{
    font-weight: bold;
  }
`

const NavCon = styled.div`
  a{
    color: #666;
    :hover{
      color: #333;
    }
  }
  span{
    color: #888
  }
  margin-bottom: 5px;
`

// @ts-ignore
const TableWrapper = styled(TabledCon)`
`