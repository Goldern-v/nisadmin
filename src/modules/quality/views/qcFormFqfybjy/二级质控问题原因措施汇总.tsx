import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Select } from 'antd'
import { observer } from 'src/vendors/mobx-react-lite'
import { PageTitle, Place, PageHeader } from 'src/components/common'
import BaseTable from 'src/components/BaseTable'
import { currentMonth } from 'src/utils/date/rangeMethod'
import { ColumnProps, DatePicker } from 'src/vendors/antd'
import { qcFormFqfybjyService } from './api/qcFormFqfybjyService'
import { appStore, authStore } from 'src/stores'
import moment from 'moment'
import { numToChinese } from 'src/utils/number/numToChinese'
import TextAreaCom from './TextAreaCom'
import { qualityControlRecordApi } from '../qualityControlRecord/api/QualityControlRecordApi'

const Option = Select.Option
const RangePicker = DatePicker.RangePicker

export interface Props { }

export default observer(function 三级问题原因措施汇总() {
  const { queryObj } = appStore
  const { deptList } = authStore
  const [startDate, endDate] = currentMonth()

  const [query, setQuery] = useState({
    qcLevel: queryObj.qclevel || '2',
    beginDate: startDate.format('YYYY-MM-DD'),
    endDate: endDate.format('YYYY-MM-DD'),
    wardCode: (authStore.isDepartment || authStore.isSupervisorNurse) ? '' : authStore.defaultDeptCode,
    qcCode: '',
  })
  const [formList, setFormList] = useState([] as any)

  const [loading, setLoading] = useState(false)
  const [tableData, setTableData] = useState([] as any[])
  const [formListLoading, setFormListLoaindg] = useState(false)

  const columns: ColumnProps<any>[] = [
    {
      title: '检查日期',
      dataIndex: 'evalDate',
      align: 'center',
      width: 130,
      render: (text: string, record: any) => ({
        children: text
      }),
    },
    {
      title: '检查者',
      dataIndex: 'creatorName',
      align: 'center',
      width: 80,
      render: (text: string, record: any) => ({
        children: text
      }),
    },
    {
      title: '检查标准',
      dataIndex: 'qcName',
      align: 'center',
      width: 175,
    },
    {
      title: '存在问题',
      dataIndex: 'problem',
      align: 'left',
      width: 175,
      render: (text: string) => <PreCon>{getProblemText(text)}</PreCon>,
    },
    {
      title: '扣分',
      dataIndex: 'deductTotalScore',
      align: 'center',
      width: 30,
      render: (text: string) => <PreCon>{text}</PreCon>,
    },
    {
      title: '总得分',
      dataIndex: 'netTotalScore',
      align: 'center',
      width: 40,
      render: (text: string) => <PreCon>{text}</PreCon>,
    },
    {
      title: '原因分析',
      dataIndex: 'cause',
      align: 'left',
      width: 220,
      // render: (text: string, record: any) => <TextAreaCom
      //   text={text}
      //   label='cause'
      //   qcMasterId={record.qcMasterId}
      //   input={(val: any) => {
      //     record.cause = val
      //     setTableData([...tableData])
      //   }}
      // ></TextAreaCom>,
      render: (text: string) => <PreCon>{text}</PreCon>,
    },
    {
      title: '整改措施',
      dataIndex: 'measure',
      align: 'left',
      width: 220,
      render: (text: string) => <PreCon>{text}</PreCon>,
      // render: (text: string, record: any) => <TextAreaCom
      //   text={text}
      //   label='measure'
      //   qcMasterId={record.qcMasterId}
      //   input={(val: any) => {
      //     record.measure = val
      //     setTableData([...tableData])
      //   }}
      // ></TextAreaCom>,
    },
    {
      title: '追踪日期',
      dataIndex: 'followEvaluateDate',
      align: 'center',
      width: 130,
      render: (text: string) => <PreCon>{text}</PreCon>,
      // render: (text: string, record: any) => <TextAreaCom
      //   text={text}
      //   label='rectificationResult'
      //   qcMasterId={record.qcMasterId}
      //   input={(val: any) => {
      //     record.rectificationResult = val
      //     setTableData([...tableData])
      //   }}
      // ></TextAreaCom>,
    },
    {
      title: '追踪评价',
      dataIndex: 'followEvaluateDesc',
      align: 'left',
      width: 200,
      render: (text: string) => <PreCon>{text}</PreCon>,
    },
    {
      title: '追踪者',
      dataIndex: 'followEvaluateEmpName',
      align: 'center',
      width: 80,
      render: (text: string) => <PreCon>{text}</PreCon>,
    },
  ]
  const getProblemText = (arr:any)=>{
    if(!arr.length)return ''
    let str = ''
    arr.map((item:any)=>{
      if(item.subItemList.length){
        item.subItemList.map((strItem:any,index:any)=>{
          str += `${strItem}\n`
        })
      }
      if(item.remark){
        str +=`${item.remark}\n`
      }
    })
    return str
  }
  const formatGroupTableData = (orginData: any[]) => {
    let formatList = [...orginData] as any[]
    let currentWardCode = ''
    let currentYearAndMonth = ''
    let currentWardItem = null as any
    let currentYearAndMonthItem = null as any

    formatList.forEach((item: any) => {
      let wardCode = item.wardCode
      let yearAndMonth = item.yearAndMonth
      if (currentWardCode === wardCode) {
        currentWardItem.rowSpan0++

        if (currentYearAndMonth === yearAndMonth) {
          currentYearAndMonthItem.rowSpan1++
        } else {
          currentYearAndMonth = yearAndMonth
          currentYearAndMonthItem = item
          item.rowSpan1 = 1
        }
      } else {
        currentWardItem = item
        currentYearAndMonthItem = item
        currentWardCode = wardCode
        currentYearAndMonth = yearAndMonth
        item.rowSpan0 = 1
        item.rowSpan1 = 1
      }
    })

    return formatList
  }

  const getTableData = () => {
    setLoading(true)
    qcFormFqfybjyService
      .problemCauseMeasureSummary(query)
      .then(res => {
        let data = res.data
        let newTableData = formatGroupTableData(data)

        setTableData(newTableData)
        setLoading(false)
      }, () => setLoading(false))
  }

  const handleExport = () =>
    qcFormFqfybjyService
      .problemCauseMeasureSummaryExport(query)

  useEffect(() => {
    getTableData()
  }, [query])
  const getFormList = () => {
    setFormListLoaindg(true)
    qualityControlRecordApi.formTemplateList({
      level: Number(queryObj.qcLevel || '1'),
      templateName: ''
    })
      .then(res => {
        setFormListLoaindg(false)
        if (res.data) setFormList(res.data)
      }, () => setFormListLoaindg(false))
  }

  useEffect(() => {
    getFormList()
  }, [])
  return <Wrapper>
    <PageHeader>
      <PageTitle>{numToChinese(Number(queryObj.qclevel || '2')) + '级'}质控问题原因措施汇总</PageTitle>
      <Place></Place>
      <span>表单：</span>
      <Select
        value={query.qcCode}
        loading={formListLoading}
        style={{ width: 220, marginRight: 15 }}
        showSearch
        onChange={(qcCode: string) => setQuery({ ...query, qcCode })}
        filterOption={(input: any, option: any) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }>
        <Option value="">全部</Option>
        {formList.map((item: any, index: number) =>
          <Option value={item.qcCode} key={index}>{item.qcName}</Option>)}
      </Select>
      <span>科室：</span>
      <Select
        value={query.wardCode}
        style={{ width: 180, marginRight: 15 }}
        showSearch
        onChange={(wardCode: string) => setQuery({ ...query, wardCode })}
        filterOption={(input: any, option: any) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }>
        {(authStore.isDepartment || authStore.isSupervisorNurse) && <Option value="">全部</Option>}
        {deptList.map((item: any, index: number) =>
          <Option value={item.code} key={index}>{item.name}</Option>)}
      </Select>
      <span>汇总时间：</span>
      <RangePicker
        allowClear={false}
        style={{ width: 220, marginRight: 15 }}
        value={[moment(query.beginDate), moment(query.endDate)]}
        onChange={([moment0, moment1]: any[]) =>
          setQuery({
            ...query,
            beginDate: moment0.format('YYYY-MM-DD'),
            endDate: moment1.format('YYYY-MM-DD')
          })} />
      <Button onClick={() => getTableData()} type="primary">查询</Button>
      <Button onClick={() => handleExport()}>导出</Button>
    </PageHeader>
    <TableCon>
      <BaseTable
        loading={loading}
        surplusWidth={1000}
        surplusHeight={185}
        dataSource={tableData}
        columns={columns}
      />
    </TableCon>
  </Wrapper>
})

const Wrapper = styled.div``

const TableCon = styled.div`
  /* width: 700px; */
  margin: 0 auto;
  padding: 0 15px;
`

const PreCon = styled.pre`
  padding-top: 2px;
  word-wrap: break-word;
  white-space: pre-wrap;
`