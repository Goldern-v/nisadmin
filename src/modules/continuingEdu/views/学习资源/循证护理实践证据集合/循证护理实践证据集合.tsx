import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Input } from 'antd'
import { Place } from 'src/components/common'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { ColumnProps } from 'antd/lib/table'

export interface Props { }

export default function 循证护理实践证据集合() {
  const [query, setQuery] = useState({
    keyWord: '',
    status: '',
    pageSize: 20,
    pageIndex: 1,
  })

  const [tableData, setTableData] = useState([
    { name: 'ok' }
  ] as any[])

  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState()

  const columns: ColumnProps<any>[] = [
    {
      title: "序号",
      dataIndex: "",
      width: 40,
      render: (text: any, record: any, index: number) =>
        (query.pageIndex - 1) * query.pageSize + index + 1,
      align: "center",
    },
    {
      title: '名称',
      dataIndex: '名称',
      align: "left",
      render: (text: any, record: any, index: number) => {
        return <div className="">Cochrane图书馆（CL）</div>
      }
    },
    {
      title: '学习附件',
      dataIndex: '学习附件',
      align: "left",
      width: 200,
    },
    {
      title: '状态',
      dataIndex: 'status',
      align: "left",
      width: 80,
    },
    {
      title: '操作',
      dataIndex: 'operate',
      align: "center",
      width: 100,
      render: (text: any, record: any, index: number) => {
        return <DoCon>
          <span>删除</span>
          <span>编辑</span>
        </DoCon>
      }
    }
  ]

  const handlePageChange = (pageIndex: number) => {
    setQuery({ ...query, pageIndex });
  }

  const handlePageSizeChange = (pageIndex: number, pageSize: number) => {
    setQuery({ ...query, pageSize, pageIndex: 1 });
  }

  const getTableData = (newQuery: any) => {
    console.log('query data')
  }

  useEffect(() => {
    getTableData(query)
  }, [query])

  const handleSearch = () => {
    setQuery({ ...query, pageIndex: 1 })
  }

  const handleAdd = () => {

  }

  return <Wrapper>
    <HeaderCon>
      <Title>循证护理实践证据集合</Title>
      <Place />
      <Input
        placeholder="请输入要搜索的关键字"
        style={{ width: 240, marginLeft: 15 }}
        allowClear
        defaultValue={query.keyWord}
        onBlur={(e: any) =>
          setQuery({ ...query, pageIndex: 1, keyWord: e.target.value })
        }
      />
      <Button
        type="primary"
        className="sub"
        onClick={handleSearch}
        style={{ marginLeft: 15 }}
      >
        搜索
      </Button>
      <Button className="sub" onClick={handleAdd}>添加</Button>
    </HeaderCon>
    <MainCon>
      <BaseTable
        surplusHeight={235}
        columns={columns}
        dataSource={tableData}
        loading={loading}
        pagination={{
          pageSizeOptions: ["10", "20", "30", "40", "50"],
          total: totalCount,
          onChange: handlePageChange,
          onShowSizeChange: handlePageSizeChange,
          current: query.pageIndex,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSize: query.pageSize
        }} />
    </MainCon>
  </Wrapper>
}

const Wrapper = styled.div`
  padding: 15px;
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
`
const HeaderCon = styled.div`
  display: flex;
  align-items: center;
  color: #333;
  height: 32px;
  .sub{
    margin-left: 10px;
    &:first-of-type{
      margin-left:0;
    }
  }
`

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #333;
`

const MainCon = styled.div`
  flex: 1;
  padding-top: 15px;
`