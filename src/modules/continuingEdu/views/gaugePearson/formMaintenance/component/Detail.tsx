import styled from 'styled-components'
import React, {useEffect, useState} from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import BaseTable, { TabledCon, DoCon } from 'src/components/BaseTable'
import { ColumnProps } from 'src/vendors/antd'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import SetTittle from "./SetConfig";
import BaseTabs from "src/components/BaseTabs";
export interface Props { }
// menuInfo  路径上获取
//查看学习结果
export default observer(function FormMaintenanceDetail() {
  const [tableData,setTableData]=useState([]) as any
  const { history } = appStore
  // const { query, tableData, tableDataTotal, loading, baseInfo, menuInfo, isSignType } = trainingResultModel
  useEffect(() => {
  }, [])

  return <Wrapper>
    <TopPannel>
      <NavCon>
        <Link to="/home">主页</Link>
        <span> {'>'} </span>
        <span>{ '手册表单维护'}</span>
        <span> {'>'} </span>
        <span> {'>'} 表单详情</span>
      </NavCon>
      <MainTitle>{'baseInfo.title'}</MainTitle>
      <SubContent>
        <span className="content">
         规培护士轮转汇总
        </span>
        <span className="label">创建人:</span>
        <span className="content">
          {'baseInfo.teachingTypeName'}
        </span>
      </SubContent>
      <ButtonGroups>
        <Button onClick={() => history.goBack()}>返回</Button>
        <Button >保存</Button>
      </ButtonGroups>
    </TopPannel>
    <MainPannel>
      <TableWrapper>
        <SetTittle/>
      </TableWrapper>
    </MainPannel>
  </Wrapper>
})

const TableWrapper = styled(TabledCon)`
  td{
    word-break: break-all;
  }
  .ellips{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    height: 19px;
  }
  #baseTable{
    padding: 10px 15px;
  }
`
 const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
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
