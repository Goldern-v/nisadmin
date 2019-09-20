import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Input } from 'antd'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { ColumnProps } from 'antd/lib/table'
import { observer } from 'mobx-react-lite'
export interface Props { }

export default observer(function nursingRulesNew() {
  let [query, setQuery] = useState({
    keywords: '',
    pageSize: 20,
    pageIndex: 1
  })

  const [dataTotal, setDataTotal] = useState(0)
  const [tableData, setTableLoading] = useState([{ name: '书籍名称' }] as any)
  const [loading, setLoading] = useState(false)

  const handlePageSizeChange = (current: number, size: number) => {
    setQuery({ ...query, pageSize: size, pageIndex: 1 })
  }

  const handlePageChange = (current: number) => {
    setQuery({ ...query, pageIndex: current })
  }

  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      key: 'idx',
      render: (text: any, record: any, idx) => idx + 1,
      width: 80,
      align: 'center'
    },
    {
      title: '书籍名称',
      key: 'name',
      dataIndex: 'name',
      align: 'left',
      render: (text: string) => <div className='rule-name' title={text}>{text}</div>
    },
    {
      title: '上传人',
      width: 80,
      key: 'updateName'
    },
    {
      title: '上传时间',
      width: 150,
      key: 'updateTime'
    },
    {
      title: '状态',
      width: 80,
      key: 'status',
    },
    {
      title: '操作',
      width: 150,
      key: 'operation',
      render: (text: any, record: any) => {
        return <DoCon>
          <span>查看</span>
          <span>设为无效</span>
          <span>删除</span>
        </DoCon>
      }
    },

  ]

  //authStore.isDepartment || authStore.isSupervisorNurse

  return <Wrapper>
    <div className='topbar'>
      <div className='title'>护理制度</div>
      <div className='float-right'>
        <span className='type-label'>类型：</span>
        <span className='type-content'>
        </span>
        <span className='search-input'>
          <Input
            value={query.keywords}
            placeholder='输入名称进行检索' />
        </span>
        <Button type='primary'>查询</Button>
      </div>
      <div className="main-contain">
        <BaseTable columns={columns}
          dataSource={tableData}
          pagination={{
            pageSizeOptions: ['10', '20', '30', '40', '50'],
            onShowSizeChange: handlePageSizeChange,
            onChange: handlePageChange,
            total: dataTotal,
            showSizeChanger: true,
            showQuickJumper: true,
            pageSize: query.pageSize,
            current: query.pageIndex
          }}
          loading={loading}
          surplusHeight={235} />
      </div>
    </div>
  </Wrapper>
})

const Wrapper = styled.div`
position: relative;
height: 100%;
.topbar {
  height: 60px;
  overflow: hidden;
  .title {
    font-size: 20px;
    display: inline-block;
    font-weight: bold;
    margin-left: 15px;
    margin-top: 15px;
  }
  .float-right {
    float: right;
    margin-top: 15px;
    margin-right: 15px;
    .search-input {
      width: 180px;
      display: inline-block;
      vertical-align: middle;
    }
    button {
      margin-left: 15px;
      vertical-align: middle;
    }
    .route-group {
      margin-left: 50px;
      vertical-align: middle;
    }
  }
  .type-label {
    margin-right: 5px;
    vertical-align: middle;
  }
  .type-content {
    .ant-select {
      vertical-align: middle;
    }
    margin-right: 15px;
    .ant-select-selection {
      min-width: 150px;
    }
  }
}
.main-contain {
  position: absolute;
  top: 60px;
  left: 15px;
  right: 15px;
  bottom: 10px;
  background: #fff;
  height: calc(100vh - 120px);
  td {
    position: relative;
    &.align-left {
      padding-left: 15px !important;
    }
    div.rule-name {
      position: absolute;
      left: 15px;
      right: 15px;
      line-height: 30px;
      top: 0;
      bottom: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .operate-text {
    margin-right: 5px;
    cursor: pointer;
    color: #1db38b;
    &:hover {
      font-weight: bold;
    }
  }
}
`