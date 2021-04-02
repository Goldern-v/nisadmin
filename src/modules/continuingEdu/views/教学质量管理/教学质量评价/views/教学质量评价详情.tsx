import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, DatePicker, Input } from 'antd'
import { Place } from 'src/components/common'
import { currentMonth, currentQuater, currentYear } from 'src/utils/date/rangeMethod'
import { ColumnProps } from 'antd/lib/table'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import moment from 'src/vendors/moment'
import { appStore } from 'src/stores'
import { teachingQualityEvalService } from '../services/TeachingQualityEvalService'
import { evalTypeGroup } from '../utils/evalType'
import TeachingQualityEvalForm from '../components/TeachingQualityEvalForm'
import { fileDownload } from 'src/utils/file/file'

const RangePicker = DatePicker.RangePicker

export interface Props { }

export default function 护理教学质量评价详情() {
  const { title, evalPlanId, submitTimeBegin, submitTimeEnd, evalType } = appStore.queryObj

  const [formModalVisible, setFormModalVisible] = useState(false)
  const [recordOpened, setRecordOpened] = useState({} as any)

  let _currentMonth = currentMonth()
  let _currentQuater = currentQuater()
  let _currentYear = currentYear()

  const [query, setQuery] = useState({
    // submitTimeBegin: submitTimeBegin ? moment(submitTimeBegin).format('YYYY-MM-DD') : '',
    // submitTimeEnd: submitTimeEnd ? moment(submitTimeEnd).format('YYYY-MM-DD') : '',
    submitTimeBegin: '',
    submitTimeEnd: '',
    evalPlanId: evalPlanId,
    pageIndex: 1,
    pageSize: 20,
    keyWord: '',
  })

  const [tableData, setTableData] = useState([] as any[])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)

  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      key: 'id',
      width: 50,
      align: 'center',
      render: (text: string, record: any, idx: number) =>
        query.pageSize * (query.pageIndex - 1) + idx + 1
    },
    {
      title: '姓名',
      dataIndex: 'empName',
      align: 'center',
      width: 120,
    },
    {
      title: '性别',
      dataIndex: 'sex',
      align: 'center',
      width: 80,
    },
    {
      title: '年龄',
      dataIndex: 'age',
      align: 'center',
      width: 80,
    },
    {
      title: '最高学历',
      dataIndex: 'education',
      align: 'center',
      width: 80,
    },
    {
      title: '毕业院校',
      dataIndex: '毕业院校',
      align: 'center',
      width: 120,
    },
    {
      title: '专业',
      dataIndex: '专业',
      align: 'center',
      width: 80,
    },
    {
      title: '专业',
      dataIndex: '专业',
      align: 'center',
      width: 80,
    },
    {
      title: '实习科室',
      dataIndex: 'deptName',
      align: 'center',
      width: 80,
    },
    {
      title: '提交时间',
      dataIndex: 'submitTime',
      align: 'center',
      width: 80,
    },
    {
      title: '状态',
      dataIndex: 'taskStatusDesc',
      align: 'center',
      width: 80,
    },
    {
      title: '操作',
      dataIndex: '操作',
      align: 'center',
      width: 80,
      render: (text: any, record: any) => {
        return <DoCon>
          <span onClick={() => handleDetail(record)}>查看详情</span>
        </DoCon>
      }
    },
  ]

  const getTableData = () => {
    setLoading(true)

    teachingQualityEvalService.
      queryEvalPlanStatDetailListByPage({
        ...query,
        submitTimeBegin: query.submitTimeBegin ? query.submitTimeBegin + ' 00:00:00' : '',
        submitTimeEnd: query.submitTimeEnd ? query.submitTimeEnd + ' 24:00:00' : '',
      })
      .then(res => {
        setLoading(false)

        if (res.data) {
          setTableData(res.data.list || [])
          setTotal(res.data.totalCount || 0)
        }
      }, () => setLoading(false))
  }

  const handleExport = () => {
    setLoading(true)

    teachingQualityEvalService
      .exportEvalPlanStatDetailListByPage({
        evalPlanId: query.evalPlanId,
        keyWord: query.keyWord,
      })
      .then(res => {
        fileDownload(res)
        setLoading(false)
      }, () => setLoading(false))
  }

  const handleDetail = (record: any) => {
    setRecordOpened(record)
    setFormModalVisible(true)

    console.log(record)
  }

  useEffect(() => {
    getTableData()
  }, [query])

  return <Wrapper>
    <HeaderCon>
      <Title>{title}</Title>
      <Place />
      <span>提交日期：</span>
      <RangePicker
        className="content-item mr-10"
        style={{ width: 220 }}
        value={[
          query.submitTimeBegin ? moment(query.submitTimeBegin) : undefined,
          query.submitTimeEnd ? moment(query.submitTimeEnd) : undefined
        ] as any}
        ranges={{
          '本月': _currentMonth,
          '本季度': _currentQuater,
          '本年度': _currentYear,
        }}
        onChange={(payload: any) => {
          setQuery({
            ...query,
            submitTimeBegin: payload[0] ? payload[0].format('YYYY-MM-DD') : '',
            submitTimeEnd: payload[1] ? payload[1].format('YYYY-MM-DD') : '',
            pageIndex: 1,
          })
        }}
        allowClear={false} />
      <Input
        className="mr-10"
        placeholder="请输入关键词"
        style={{ width: 150 }}
        defaultValue={query.keyWord}
        onBlur={(e) => setQuery({ ...query, keyWord: e.target.value })} />
      <Button className="mr-10" type="primary">查询</Button>
      <Button className="mr-10" onClick={() => handleExport()}>导出</Button>
      <Button onClick={() => appStore.history.goBack()}>返回</Button>
    </HeaderCon>
    <MainCon>
      <div style={{ padding: '10px 15px 0 15px', lineHeight: '24px' }}>
        <span>开始时间：{submitTimeBegin}  </span>
        <span>类型：{evalTypeGroup[`${evalType}`]?.name || ''}  </span>
        <span>参与人员：{total}人</span>
      </div>
      <BaseTable
        surplusHeight={260}
        surplusWidth={200}
        loading={loading}
        dataSource={tableData}
        columns={columns}
        pagination={{
          current: query.pageIndex,
          pageSize: query.pageSize,
          total,
          onChange: () => (pageIndex: number, pageSize: number) =>
            setQuery({ ...query, pageIndex: pageIndex }),
          onShowSizeChange: (pageIndex: number, pageSize: number) =>
            setQuery({ ...query, pageIndex: 1, pageSize, })
        }} />
    </MainCon>
    <TeachingQualityEvalForm
      visible={formModalVisible}
      onCancel={() => setFormModalVisible(false)}
      params={recordOpened} />
  </Wrapper>
}
const Wrapper = styled.div`
`

const HeaderCon = styled.div`
  align-items: center;
  color: #333;
  height: 32px;
  display: flex;
  padding: 0 15px;
  margin: 10px 0;
  .mr-10{
    margin-right: 10px;
  }
`

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #333;
`

const MainCon = styled.div`
  height: calc( 100vh - 115px);
  margin: 0 15px;
  border-radius: 2px;
  background: #fff;
`