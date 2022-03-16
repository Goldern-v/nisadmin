import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, message, Select } from 'antd'
import { observer } from 'src/vendors/mobx-react-lite'
import { PageTitle, Place, PageHeader } from 'src/components/common'
import BaseTable from 'src/components/BaseTable'
import { currentMonth } from 'src/utils/date/rangeMethod'
import { ColumnProps, DatePicker } from 'src/vendors/antd'
import { qcFormFqfybjyService } from './api/qcFormFqfybjyService'
import { appStore, authStore } from 'src/stores'
import moment from 'moment'
import { numToChinese } from 'src/utils/number/numToChinese'
// import TextAreaCom from './TextAreaCom'
import { qualityControlRecordApi } from '../qualityControlRecord/api/QualityControlRecordApi'
import SampleInput from './components/SampleInput'
import EditList from './components/EditList'

const Option = Select.Option
const RangePicker = DatePicker.RangePicker

export interface Props { }

export default observer(function 三级问题原因措施汇总() {
  const { queryObj } = appStore
  const { deptList } = authStore
  const [startDate, endDate] = currentMonth()

  const [query, setQuery] = useState({
    qcLevel: queryObj.qclevel || '3',
    beginDate: startDate.format('YYYY-MM-DD'),
    endDate: endDate.format('YYYY-MM-DD'),
    wardCode: (authStore.isDepartment || authStore.isSupervisorNurse) ? '' : authStore.defaultDeptCode,
    qcCode: '',
  })
  const [formList, setFormList] = useState([] as any)

  const [loading, setLoading] = useState(false)
  const [tableData, setTableData] = useState([] as any[])
  const [formListLoading, setFormListLoading] = useState(false)

  const saveTableData = (val: any, key: string, item: any) => {
    item[key] = val
    setTableData([...tableData])
  }
  const saveContent = async(key: string, item: any) => {
    try {
      setLoading(true)
      const res = await qcFormFqfybjyService.saveContent({ contentList: item })
      setLoading(false)
      if (res.code == 200) {
        message.success('修改成功')
      } else {
        message.error('修改失败')
      }
      await getTableData()
    } catch (e) {
      setLoading(false)
      message.error('修改失败')
      await getTableData()
    }
  }
  const saveMain = async(val: string, key: string, item: any) => {
    const { qcMasterId } = item
    try {
      setLoading(true)
      const res = await qcFormFqfybjyService.saveMain({
        qcMasterId,
        [key]: val
      })
      setLoading(false)
      if (res.code == 200) {
        message.success('修改成功')
      } else {
        message.error('修改失败')
        await getTableData()
      }
    } catch (e) {
      setLoading(false)
      message.error('修改失败')
      await getTableData()
    }
  }

  const columns: ColumnProps<any>[] = [
    {
      title: '检查日期',
      dataIndex: 'checkDate',
      align: 'center',
      width: 140,
      render: (text: string, record: any) => {
        return <SampleInput text={text} input={(e:any) => saveTableData(e, 'checkDate', record)} save={(e: string) => saveMain(e, 'checkDate', record)} />
      },
    },
    {
      title: '检查者',
      dataIndex: 'checkAuthor',
      align: 'left',
      width: 80,
      render: (text: string, record: any) => {
        return <SampleInput isMulti={true} text={text} input={(e:any) => saveTableData(e, 'checkAuthor', record)} save={(e: string) => saveMain(e, 'checkAuthor', record)} />
      }
      // render: (text: string, record: any) => ({
      //   children: text
      // }),
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
      width: 190,
      // render: (text: string) => <PreCon>{getProblemText(text)}</PreCon>,
      render: (text: any, record: any) => <EditList arr={text} editList={['content']} input={(e:any) => saveTableData(e, 'problem', record)} save={() => saveContent('problem', text)}/>,
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
      dataIndex: 'causeAnalysis',
      align: 'left',
      width: 220,
      render: (text: any, record: any) => <EditList arr={text} editList={['content', 'evaluateDate', 'author']} input={(e:any) => saveTableData(e, 'causeAnalysis', record)} save={() => saveContent('causeAnalysis', text)}/>,
    },
    {
      title: '整改措施',
      dataIndex: 'rectificationMeasures',
      align: 'left',
      width: 220,
      render: (text: any, record: any) => <EditList arr={text} editList={['content', 'evaluateDate', 'author']} input={(e:any) => saveTableData(e, 'rectificationMeasures', record)} save={() => saveContent('rectificationMeasures', text)}/>,
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
      dataIndex: 'trackingDate',
      align: 'left',
      width: 130,
      render: (text: any, record: any) => <EditList arr={text} editList={['evaluateDate']} input={(e:any) => saveTableData(e, 'trackingDate', record)} save={() => saveContent('trackingDate', text)}/>,
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
      dataIndex: 'trackingEvaluate',
      align: 'left',
      width: 200,
      render: (text: any, record: any) => <EditList arr={text} editList={['content']} input={(e:any) => saveTableData(e, 'trackingEvaluate', record)} save={() => saveContent('trackingEvaluate', text)}/>,
    },
    {
      title: '追踪者',
      dataIndex: 'trackingAuthor',
      align: 'left',
      width: 80,
      render: (text: any, record: any) => <EditList arr={text} editList={['author']} input={(e:any) => saveTableData(e, 'trackingAuthor', record)} save={() => saveContent('trackingAuthor', text)}/>,
    },
  ]
  const getProblemText = (arr: any) => {
    if (!(arr && arr?.length)) return ''
    let str = ''
    arr.map((item: any) => {
      if (item.subItemList.length) {
        item.subItemList.map((strItem: any, index: any) => {
          str += `${strItem}\n`
        })
      }
      if (item.remark) {
        str += `${item.remark}\n`
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
    setFormListLoading(true)
    qualityControlRecordApi.formTemplateList({
      level: Number(queryObj.qcLevel || '1'),
      templateName: ''
    })
      .then(res => {
        setFormListLoading(false)
        if (res.data) setFormList(res.data)
      }, () => setFormListLoading(false))
  }

  useEffect(() => {
    getFormList()
  }, [])
  return <Wrapper>
    <PageHeader>
      <PageTitle>{numToChinese(Number(queryObj.qclevel || '3')) + '级'}质控问题原因措施汇总</PageTitle>
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