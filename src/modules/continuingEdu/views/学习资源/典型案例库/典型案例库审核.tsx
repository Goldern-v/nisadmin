import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, DatePicker, Select, Input, message, Modal } from 'antd'
import { Place } from 'src/components/common'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import BaseTabs from "src/components/BaseTabs"
import { ColumnProps } from 'antd/lib/table'
import { localityService } from './api/LocalityService'
import { appStore, authStore } from 'src/stores'
// import deptNameList from './utils/deptNameList'
import { getCurrentMonthNow } from 'src/utils/date/currentMonth'
import moment from 'moment'

const Option = Select.Option

export interface Props { }

export default function 典型案例审核() {
  const { history } = appStore
  const [query, setQuery] = useState({
    submitTimeBegin: getCurrentMonthNow()[0].format('YYYY-MM-DD'),
    submitTimeEnd: getCurrentMonthNow()[1].format('YYYY-MM-DD'),
    keyWord: '',
    medicalSubject: '',
    type: 1,
    pageSize: 20,
    pageIndex: 1,
  })

  const [tableData, setTableData] = useState([] as any[])

  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(false)

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
      title: '科室',
      dataIndex: 'medicalSubject',
      width: 220,
      align: "center",
    },
    {
      title: '患者姓名',
      dataIndex: 'patientName',
      align: "center",
      width: 80,
    },
    {
      title: '患者性别',
      dataIndex: 'sex',
      align: "center",
      width: 60,
      render: (text: any) => {
        switch (text) {
          case '0':
            return '男'
          case '1':
            return '女'
          default:
            return ''
        }
      }
    },
    {
      title: '患者年龄',
      dataIndex: 'age',
      align: "center",
      width: 60,
    },
    {
      title: '提交时间',
      dataIndex: 'submitTime',
      align: "center",
      width: 120,
    },
    {
      title: '提交人',
      dataIndex: 'submitterEmpName',
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
          <span onClick={() => handleToAudit(record)}>查看</span>
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
    setLoading(true)

    let reqMethod = localityService.queryToAuditPageList.bind(localityService)

    if (newQuery.type == '2')
      reqMethod = localityService.queryAuditedPageList.bind(localityService)

    let reqParams = { ...newQuery }
    delete reqParams.type

    reqMethod(reqParams).then(res => {
      setLoading(false)
      if (res.data) {
        setTotalCount(res.data.totalCount)
        setTableData(res.data.list)
      }
    }, () => setLoading(false))

  }

  const handleToAudit = (record: any) => {
    history.push(`/典型案例库审核详情?formId=${record.formId}&taskId=${record.taskId}&type=audit`)
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

  useEffect(() => {
    getTableData(query)
  }, [query])

  const handleSearch = () => {
    setQuery({ ...query, pageIndex: 1 })
  }

  const handleTypeChange = (key: any) => {
    let newQuery = { ...query, pageIndex: 1, type: Number(key) }

    setQuery(newQuery)
  }

  const TableCon = <BaseTable
    surplusHeight={310}
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
      <Title>典型案例审核</Title>
      <Place />
      {/* <span className="sub">科室：</span>
      <Select
        style={{ width: 100 }}
        value={query.medicalSubject}
        onChange={(medicalSubject: any) =>
          setQuery({ ...query, medicalSubject, pageIndex: 1, })}>
        {deptNameList.map((name: string) => (
          <Option value={name} key={name}>{name}</Option>
        ))}
      </Select> */}
      <span className="sub">提交日期：</span>
      <DatePicker.RangePicker
        style={{ width: 200 }}
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
    </HeaderCon>
    <MainCon>
      <BaseTabs
        defaultActiveKey={query.type.toString()}
        config={['待我审核', '我已审核'].map((name: any, index: number) => {
          return {
            title: name,
            component: TableCon,
            index: (index + 1).toString()
          }
        })}
        onChange={(key: any) => handleTypeChange(key)}
      />
    </MainCon>
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