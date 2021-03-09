import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, DatePicker, Select, Input, message, Modal } from 'antd'
import { Place } from 'src/components/common'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import BaseTabs from "src/components/BaseTabs"
import { ColumnProps } from 'antd/lib/table'
import { studyNoteManageService } from './api/StudyNoteManageService'
import { appStore, authStore } from 'src/stores'
// import deptNameList from './utils/deptNameList'
import { getCurrentMonthNow } from 'src/utils/date/currentMonth'
import StudyNoteAuditModal from './components/StudyNoteAuditModal'

import moment from 'moment'

const Option = Select.Option

export interface Props { }

export default function 学习笔记审核() {
  const [query, setQuery] = useState({
    submitTimeBegin: getCurrentMonthNow()[0].format('YYYY-MM-DD'),
    submitTimeEnd: getCurrentMonthNow()[1].format('YYYY-MM-DD'),
    keyWord: '',
    deptCode: '',
    audited: '0',
    noteType: '学习笔记',
    pageSize: 20,
    pageIndex: 1,
  })

  const [tableData, setTableData] = useState([] as any[])
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(false)

  const [selectedRowKeys, setSelectedRowKeys] = useState([] as any[])

  const [selectedList, setSelectedList] = useState([] as any[])
  const [auditVisible, setAuditVisible] = useState(false)
  const [toAudit, setToAudit] = useState(false)

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
      title: '姓名',
      dataIndex: 'empName',
      align: "center",
      width: 80,
    },
    {
      title: '科室',
      dataIndex: 'deptName',
      width: 220,
      align: "center",
    },
    {
      title: '学习方式',
      dataIndex: 'teachingMethodName',
      align: "center",
      width: 80,
    },
    {
      title: '学习记录',
      dataIndex: 'title',
      align: "center",
      width: 220,
    },
    {
      title: '状态',
      dataIndex: 'statusDesc',
      align: "center",
      width: 80,
    },
    {
      title: '操作',
      dataIndex: 'operate',
      align: "center",
      width: 120,
      render: (text: any, record: any, index: number) => {
        return <DoCon>
          <span onClick={() => handleToAudit(record)}>{query.audited !== '0' ? '查看' : '审核'}</span>
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
    setSelectedRowKeys([])
    setLoading(true)

    let reqMethod = studyNoteManageService.queryToAuditPageList.bind(studyNoteManageService)

    if (newQuery.audited == '1')
      reqMethod = studyNoteManageService.queryAuditedPageList.bind(studyNoteManageService)

    let reqParams = { ...newQuery }
    delete reqParams.audited

    reqMethod(reqParams, query.noteType).then(res => {
      setLoading(false)
      if (res.data) {
        setTotalCount(res.data.totalCount)
        setTableData(res.data.list.map((item: any) => {
          return {
            ...item,
            noteId: item.noteId || item.workReviewId
          }
        }))
      }
    }, () => setLoading(false))

  }

  const handleToAudit = (record: any) => {
    if (query.audited !== '0')
      setToAudit(false)
    else
      setToAudit(true)

    setSelectedList([record])

    setAuditVisible(true)
  }

  useEffect(() => {
    getTableData(query)
  }, [query])

  const handleSearch = () => {
    setQuery({ ...query, pageIndex: 1 })
  }

  const handleTypeChange = (key: any) => {
    let newQuery = { ...query, pageIndex: 1, audited: key }

    setQuery(newQuery)
  }

  const TableCon = <BaseTable
    surplusHeight={310}
    surplusWidth={1000}
    columns={columns}
    dataSource={tableData}
    loading={loading}
    rowKey="noteId"
    pagination={{
      pageSizeOptions: ["10", "20", "30", "40", "50"],
      total: totalCount,
      onChange: handlePageChange,
      onShowSizeChange: handlePageSizeChange,
      current: query.pageIndex,
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: query.pageSize
    }}
    rowSelection={query.audited == '0' ? {
      selectedRowKeys,
      onChange: (rowKeys: any[]) => setSelectedRowKeys(rowKeys)
    } : undefined} />

  return <Wrapper>
    <HeaderCon>
      <Title></Title>
      <Place />
      <span className="sub">类型：</span>
      <Select
        value={query.noteType}
        onChange={(noteType: any) => setQuery({ ...query, noteType, pageIndex: 1 })}>
        <Option value={'学习笔记'}>学习笔记</Option>
        <Option value={'工作反思'}>工作反思</Option>
      </Select>
      <span className="sub">科室：</span>
      <Select
        style={{ width: 180 }}
        value={query.deptCode}
        showSearch
        filterOption={(input: any, option: any) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        onChange={(deptCode: any) =>
          setQuery({ ...query, deptCode, pageIndex: 1 })}>
        <Option value={''}>全部</Option>
        {authStore.deptList.map((item: any, idx: number) =>
          <Option value={item.code} key={idx}>{item.name}</Option>)}
      </Select>
      <span className="sub">提交日期：</span>
      <DatePicker.RangePicker
        style={{ width: 210 }}
        allowClear={false}
        value={[moment(query.submitTimeBegin), moment(query.submitTimeEnd)]}
        onChange={(moments: any[]) => {
          setQuery({
            ...query,
            submitTimeBegin: moments[0].format('YYYY-MM-DD'),
            submitTimeEnd: moments[1].format('YYYY-MM-DD'),
            pageIndex: 1,
          })
        }} />
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
        style={{ marginLeft: 15 }}>
        搜索
      </Button>
      <Button
        style={{ marginLeft: 15 }}
        onClick={() => {
          if (selectedRowKeys.length <= 0)
            return message.warn('未勾选项目')

          setToAudit(true)
          setSelectedList(selectedRowKeys
            .map((noteId: any) => {
              return tableData.find((item: any) => item.noteId == noteId)
            }))
          setAuditVisible(true)
        }}>
        批量审核
      </Button>
    </HeaderCon>
    <MainCon>
      <BaseTabs
        defaultActiveKey={query.audited}
        config={['待我审核', '我已审核']
          .map((name: any, index: number) => {
            return {
              title: name,
              component: TableCon,
              index: index.toString()
            }
          })}
        onChange={(key: any) => handleTypeChange(key)}
      />
    </MainCon>
    <StudyNoteAuditModal
      noteType={query.noteType}
      toAudit={toAudit}
      visible={auditVisible}
      onOk={() => {
        getTableData(query)
        setAuditVisible(false)
      }}
      onCancel={() => {
        setAuditVisible(false)
      }}
      recordList={selectedList} />
  </Wrapper>
}

const Wrapper = styled.div`
  padding: 0;
  display: flex;
  flex-direction: column;
  .file-item{
    cursor: pointer;
    color: #00A680;
    word-break: break-all;
    & *{
      vertical-align: middle;
    }
    .download{
      margin-left: 5px;
    }
    .file-icon{
      width: 12px; 
      margin-right: 5px;
    }
  }
`
const HeaderCon = styled.div`
  padding: 15px;
  padding-top: 30px;
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
  padding: 15px;
  padding-bottom: 0;
`