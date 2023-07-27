import styled from 'styled-components'
import React, {useEffect, useState} from 'react'
import {Button, Checkbox} from 'antd'
import { Link } from 'react-router-dom'
import BaseTable, { TabledCon, DoCon } from 'src/components/BaseTable'
import { ColumnProps } from 'src/vendors/antd'
import {appStore, authStore} from 'src/stores'
import { observer } from 'mobx-react-lite'
import BaseTabs from "src/components/BaseTabs";
export interface Props { }
// menuInfo  路径上获取
//查看学习结果
export default observer(function TemplateMaintenanceDetail() {
  const [tableData,setTableData]=useState([]) as any
  const [loading, setLoading] = useState<boolean>(false)

  const { history } = appStore
  // const { query, tableData, tableDataTotal, loading, baseInfo, menuInfo, isSignType } = trainingResultModel
  useEffect(() => {
  }, [])
  const columns: any = [
    {
      title: "序号",
      dataIndex: "",
      key: "",
      align: "center",
      width: 40
    },
    {
      title: "分类",
      dataIndex: "firstLevelMenuName",
      align: "center",
      width: 100,
      render: () => {
        return (
            <Checkbox/>
        )
      }
    },
    {
      title: "内容",
      dataIndex: "secondLevelMenuName",
      align: "center",
      width: 100
    },
    {
      title: "学时",
      dataIndex: "secondLevelMenuName",
      align: "center",
      width: 100
    },
  ];

  return <Wrapper>
    <TopPannel>
      <NavCon>
        <Link to="/home">主页</Link>
        <span> {'>'} </span>
        <Link to="/continuingEdu/templateMaintenance">手册模板维护</Link>
        <span> {'>'} 表单详情</span>
      </NavCon>
      <MainTitle>{'baseInfo.title'}</MainTitle>
      <SubContent>
        <span className="label">创建人:</span>
        <span className="content">
          {authStore?.user?.empName}
        </span>
      </SubContent>
      <ButtonGroups>
        <Button onClick={() => history.goBack()}>返回</Button>
      </ButtonGroups>
    </TopPannel>
    <MainPannel>
      <TableWrapper>
        <BaseTable
            loading={loading}
            dataSource={tableData}
            columns={columns}
            surplusHeight={400}
        />
      </TableWrapper>
    </MainPannel>
  </Wrapper>
})

const TableWrapper = styled(TabledCon)`
  width: 50%;
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
  display: flex;
  justify-content: center;
  //align-items: center;
  flex: 1;
  padding-top: 15px;
  padding-bottom: 15px;
`

