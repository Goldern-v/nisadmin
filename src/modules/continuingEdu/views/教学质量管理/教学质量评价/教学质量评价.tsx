import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, DatePicker, Input } from 'antd'
import { Place } from 'src/components/common'
import { currentMonth, currentQuater, currentYear } from 'src/utils/date/rangeMethod'
import { ColumnProps } from 'antd/lib/table'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import moment from 'src/vendors/moment'
import BaseTabs from 'src/components/BaseTabs'
import { teachingQualityEvalService } from './services/TeachingQualityEvalService'
import { appStore } from 'src/stores'
import qs from 'qs'
import { evalTypeGroup } from './utils/evalType'
import { continuningEduAuth } from 'src/modules/continuingEdu/data/continuningEduAuth'
import { observer } from 'mobx-react'
import AddEvaluationModal from './modal/AddEvaluationModal'
import createModal from 'src/libs/createModal'

const RangePicker = DatePicker.RangePicker

export interface Props { }

export default observer(function 护理教学质量评价() {
  let _currentMonth = currentMonth()
  let _currentQuater = currentQuater()
  let _currentYear = currentYear()

  const [query, setQuery] = useState({
    evalType: '1' as '1' | '2' | '3',
    beginTime: _currentMonth[0].format('YYYY-MM-DD'),
    endTime: _currentMonth[1].format('YYYY-MM-DD'),
    pageIndex: 1,
    pageSize: 20,
    keyWord: '',
  })

  const [activeTab, setActiveTab] = useState('1')

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
      title: '开始时间',
      dataIndex: 'beginTime',
      align: 'center',
      width: 120,
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      align: 'center',
      width: 120,
    },
    {
      title: '标题',
      dataIndex: 'title',
      align: 'center',
      width: 200,
    },
    {
      title: '参与人数',
      dataIndex: 'evalPersonCount',
      align: 'center',
      width: 80,
    },
    {
      title: '状态',
      dataIndex: 'epStatusDesc',
      align: 'center',
      width: 80,
      render: (text) => {
        switch (text) {
          case '待开始':
            return <span style={{ color: '#70B603' }}>{text}</span>
          case '进行中':
            return <span style={{ color: '#F59A23' }}>{text}</span>
          default:
            return <span>{text}</span>
        }
      }
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

    teachingQualityEvalService
      .queryEvalPlanStatListByPage({
        ...query,
        beginTime: query.beginTime ? query.beginTime + ' 00:00' : '',
        endTime: query.endTime ? query.endTime + ' 24:00' : '',
      })
      .then(res => {
        if (res.data) {
          setTableData(res.data.list || [])
          setTotal(res.data.totalCount || 0)
        }

        setLoading(false)
      }, () => setLoading(false))
  }

  const handleDetail = (record: any) => {
    appStore.history
      .push(`/continuingEdu/教学质量评价详情?${qs.stringify({
        evalPlanId: record.id,
        title: record.title,
        submitTimeBegin: record.beginTime,
        submitTimeEnd: record.endTime,
        evalType: record.evalType,
      })}`)
  }
  // 新增权限
  const addAuth = continuningEduAuth.teachingQualityEvaluationAddAuth
  const allowHospitalRoleCode = ['hj']
  const allowHospitalAuth = allowHospitalRoleCode.includes(appStore.HOSPITAL_ID)

  // 添加新增弹窗
  const addEvaluationModal = createModal(AddEvaluationModal)

  const setShowAdd = () => {
    addEvaluationModal.show({
      evalType: query.evalType,
    })
  }

  useEffect(() => {
    getTableData()
  }, [query])

  const TableCon =
    <BaseTable
      surplusHeight={260}
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

  return <Wrapper>
    <HeaderCon>
      <Title>护理教学质量评价</Title>
      <Place />
      <span>提交日期：</span>
      <RangePicker
        className="content-item"
        style={{ width: 220, marginRight: 10 }}
        value={[moment(query.beginTime), moment(query.endTime)]}
        ranges={{
          '本月': _currentMonth,
          '本季度': _currentQuater,
          '本年度': _currentYear,
        }}
        onChange={(payload: any) => {
          setQuery({
            ...query,
            beginTime: payload[0].format('YYYY-MM-DD'),
            endTime: payload[1].format('YYYY-MM-DD'),
            pageIndex: 1,
          })
        }}
        allowClear={false} />
      <Input
        placeholder="请输入关键词"
        style={{ width: 150, marginRight: 10 }}
        defaultValue={query.keyWord}
        onBlur={(e) => setQuery({ ...query, keyWord: e.target.value })} />
      <Button
        className="sub"
        onClick={() => setQuery({ ...query, pageIndex: 1 })}>查询</Button>
      {addAuth
        && allowHospitalAuth
        && <Button
          type="primary"
          className="sub"
          onClick={() => setShowAdd()}>新增计划</Button>}

    </HeaderCon>
    <MainCon>
      <BaseTabs
        defaultActiveKey={activeTab}
        config={Object.keys(evalTypeGroup).map((key: any) => ({
          title: evalTypeGroup[key].name,
          index: key,
          component: TableCon,
        }))}
        onChange={(key: any) => {
          setActiveTab(key)
          setQuery({ ...query, pageIndex: 1, evalType: key })
        }} />
    </MainCon>
    <addEvaluationModal.Component />
  </Wrapper>
})
const Wrapper = styled.div`
`

const HeaderCon = styled.div`
  align-items: center;
  color: #333;
  height: 32px;
  display: flex;
  padding: 0 15px;
  margin: 10px 0;
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
  height: calc( 100vh - 115px);
  padding: 0 15px;
`