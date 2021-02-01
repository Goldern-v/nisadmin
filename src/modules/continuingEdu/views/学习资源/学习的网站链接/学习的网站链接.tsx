import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Input, Modal } from 'antd'
import { Place } from 'src/components/common'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { ColumnProps } from 'antd/lib/table'
import EditModal from './components/EditModal'
import { localityService } from './api/LocalityService'
import { message } from 'antd/es'
import { authStore } from 'src/stores'
import { continuningEduAuth } from 'src/modules/continuingEdu/data/continuningEduAuth'
import { observer } from 'mobx-react'

export interface Props { }

export default observer(function 学习的网站链接() {
  const [query, setQuery] = useState({
    keyWord: '',
    pageSize: 20,
    pageIndex: 1,
  })

  const [tableData, setTableData] = useState([] as any[])

  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(false)
  /**操作权限 */
  const operateAuth = authStore.isNotANormalNurse || continuningEduAuth.isTeachingGroupLeader

  const [editVisible, setEditVisible] = useState(false)
  const [editRecord, setEditRecord] = useState({} as any)

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
      title: '目录',
      dataIndex: 'name',
      align: "left",
      width: 280,
      render: (text: any, record: any, index: number) => {
        return <div>
          <div className="">{record.name}</div>
          <div>
            <span>网址：</span>
            <a href={record.websideUrl} target="_blank" style={{ display: 'inline' }}>{record.websideUrl}</a>
          </div>
        </div>
      }
    },
    {
      title: '简介',
      dataIndex: 'briefIntroduction',
      align: "left",
    },
    {
      title: '排序',
      dataIndex: 'sort',
      align: "center",
      width: 80,
    },
    {
      title: '操作',
      dataIndex: 'operate',
      align: "center",
      width: 100,
      render: (text: any, record: any, index: number) => {
        if (operateAuth)
          return <DoCon>
            <span onClick={() => handleEdit(record)}>编辑</span>
            <span onClick={() => handleDelete(record)}>删除</span>
          </DoCon>

        return <span></span>
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
    setLoading(true)

    localityService
      .queryPageList(newQuery)
      .then(res => {
        setLoading(false)
        if (res.data) {
          setTotalCount(res.data.totalCount || 0)
          setTableData(res.data.list)
        }
      }, () => setLoading(false))
  }

  const handleEdit = (record: any) => {
    setEditRecord(record)
    setEditVisible(true)
  }

  const handleDelete = (record: any) => {
    if (record.id)
      Modal.confirm({
        title: '删除',
        content: '是否删除选中项目？',
        onOk: () => {
          setLoading(true)
          localityService
            .deleteById(record.id)
            .then(res => {
              setLoading(false)
              message.success('操作成功')
              getTableData(query)
            }, () => setLoading(false))

        }
      })
  }

  const handleSearch = () => {
    setQuery({ ...query, pageIndex: 1 })
  }

  const handleAdd = () => {
    setEditVisible(true)
  }

  useEffect(() => {
    getTableData(query)
  }, [query])

  return <Wrapper>
    <HeaderCon>
      <Title>学习的网站链接</Title>
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
      {operateAuth && <Button className="sub" onClick={handleAdd}>添加</Button>}
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
    <EditModal
      visible={editVisible}
      originParams={editRecord}
      onOk={() => {
        setEditVisible(false)
        setEditRecord({})
        getTableData(query)
      }}
      onCancel={() => {
        setEditRecord({})
        setEditVisible(false)
      }} />
  </Wrapper>
})

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