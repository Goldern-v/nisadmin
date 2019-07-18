import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Button } from 'antd'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { ColumnProps } from 'antd/lib/table'
import BaseTable, { DoCon } from 'src/components/BaseTable'

export interface Props extends RouteComponentProps { }

export default observer(function NursingRulesTypeSetting() {
  const { history } = appStore;

  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      key: 'key',
      width: 50,
      align: 'center',
      render: (text: string, record: any, index: number) => index + 1
    },
    {
      title: '护理制度类型',
      key: 'name',
      dataIndex: 'name',
      align: 'left',
    },
    {
      title: '操作',
      key: 'operation',
      width: 100,
      align: 'center',
      render: (text: string, record: any) => {
        return <DoCon className="operation">
          <span className="disabled">编辑</span>
          <span className="disabled">删除</span>
        </DoCon>
      }
    },
  ];

  const [tableData, setTableData] = useState([
    {
      id: 1,
      name: '护理汇编'
    },
    {
      id: 2,
      name: '护理规程'
    }
  ] as any);

  return <Wrapper>
    <div className="topbar">
      <div className="float-left">
        <div className="item title">类型设置</div>
      </div>
      <div className="float-right">
        <div className="item">
          <Button disabled>添加</Button>
        </div>
        <div className="item">
          <Button onClick={() => history.goBack()}>返回</Button>
        </div>
      </div>
    </div>
    <div className="main-contain">
      <BaseTable
        columns={columns}
        rowKey="id"
        surplusHeight={215}
        dataSource={tableData} />
    </div>
  </Wrapper>
})

const Wrapper = styled.div`
position:relative;
padding-top: 55px;
height: 100%;
width: 100%;
background: #fff;

div.topbar{
  position:absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 10px 15px;
  box-sizing: border-box;
  height: 55px;
  overflow: hidden;
  border-bottom: 1px solid #ddd;
  .float-left{
    float:left;
  }

  .float-right{
    float:right;
  }
  
  .item{
    display: inline-block;
    margin-right: 10px;
    &.title{
      line-height: 35px;
      font-size: 16px;
      font-weight: bold;
    }
    &>div{
      display: inline-block;
      vertical-align: middle;
    }
    .label{}
    .content{}
  }
}

.main-contain{
  height: 100%;
  width: 500px;
  .operation{
    .disabled{
      color: #aaa;
      cursor: not-allowed;
      :hover{
        font-weight: normal;
      }
    }
  }
}
`