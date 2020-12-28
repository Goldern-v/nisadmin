import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Input, Select } from 'antd'
import { Place } from 'src/components/common'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import BaseTabs from "src/components/BaseTabs"
import { ColumnProps } from 'antd/lib/table'
import { authStore } from 'src/stores'

const Option = Select.Option

export interface Props { }

export default function 应急预案学习() {
  const [query, setQuery] = useState({
    keyWord: '',
    status: '',
    type: '0',
    deptCode: '',
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
      title: '预案名称',
      dataIndex: '预案名称',
      width: 220,
      align: "left",
      render: (text: any, record: any, index: number) => {
        return <div className="">预案名称</div>
      }
    },
    {
      title: '预案信息',
      dataIndex: '预案信息',
      align: "left",
      render: (text: any, record: any, index: number) => {
        return <div className="">预案信息</div>
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

  const handleTypeChange = (key: any) => {
    let newQuery = { ...query, pageIndex: 1, type: key }
    if (key == '1') {
      if (authStore.isDepartment)
        newQuery.deptCode = ''
      else
        newQuery.deptCode = authStore.defaultDeptCode
    } else {
      newQuery.deptCode = ''
    }

    setQuery(newQuery)
  }

  const TableCon = <BaseTable
    surplusHeight={280}
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

  return <Wrapper>
    <HeaderCon>
      <Title>应急预案学习</Title>
      <Place />
      {query.type == '1' && (
        <React.Fragment>
          <span className="sub">科室：</span>
          <Select
            value={query.deptCode}
            style={{ width: '180px' }}>
            {authStore.isDepartment && <Option value="">全部</Option>}
            {authStore.deptList.map((item: any) => (
              <Option key={item.code} value={item.name}>{item.name}</Option>
            ))}
          </Select>
        </React.Fragment>
      )}
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
      <BaseTabs
        defaultActiveKey={query.type}
        config={[
          {
            title: "医院应急预案",
            component: TableCon,
          },
          {
            title: "专科应急预案",
            component: TableCon,
          }
        ]}
        onChange={(key: any) => handleTypeChange(key)}
      />
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