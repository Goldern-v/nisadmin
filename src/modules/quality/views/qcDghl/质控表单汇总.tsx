import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Select } from 'antd'
import { PageHeader, PageTitle, Place, ScrollBox } from 'src/components/common'
import { observer } from 'mobx-react'
import { appStore, authStore } from 'src/stores'
import { currentMonth, currentQuater, currentYear } from 'src/utils/date/rangeMethod'
import { qcDghlService } from './api/qcDghlService'
import { DatePicker, message, Spin } from 'src/vendors/antd'
import BaseTable from 'src/components/BaseTable'
import moment from 'moment'
import { ColumnProps } from 'antd/lib/table'

const Option = Select.Option
const RangePicker = DatePicker.RangePicker

export interface Props { }

export default observer(function 质控表单汇总() {
  let _currentMonth = currentMonth()
  let _currentQuater = currentQuater()
  let _currentYear = currentYear()

  const [beginDate, endDate] = _currentMonth

  const { queryObj } = appStore

  const qcLevel = queryObj.qcLevel || '3'

  const [formList, setFormList] = useState([] as any[])

  const [query, setQuery] = useState({
    wardCode: qcLevel === '3' ? '' : authStore.selectedDeptCode,
    qcLevel: qcLevel,
    qcCode: '',
    beginDate: beginDate.format('YYYY-MM-DD'),
    endDate: endDate.format('YYYY-MM-DD'),
  })

  const [loading, setLoading] = useState(false)

  const [data, setData] = useState({
    itemCountList: [] as any[],
    levelInstanceCountList: [] as any[],
    remarkCountList: [] as any[],
    wardInstanceCountList: [] as any[]
  })

  const {
    itemCountList,
    levelInstanceCountList,
    remarkCountList,
    wardInstanceCountList
  } = data

  const currentFormItem = formList.find((item: any) => item.qcCode === query.qcCode)

  const wardInstanceCountListVisible = (() => {
    let sumRow = {
      wardName: '总计',
      instanceSize: wardInstanceCountList
        .reduce((prev: number, current: any) => {
          return prev + current.instanceSize || 0
        }, 0)
    }

    return [
      ...wardInstanceCountList,
      sumRow,
    ]
  })()

  const levelInstanceCountListVisible = (() => {
    let sumRow = {
      level: '总计',
      instanceSize: levelInstanceCountList
        .reduce((prev: number, current: any) => {
          return prev + current.instanceSize || 0
        }, 0)
    }

    return [
      ...levelInstanceCountList,
      sumRow,
    ]
  })()

  const columns1: ColumnProps<any>[] = [
    {
      title: '科室',
      dataIndex: 'wardName',
      align: 'center',
      width: 180,
    },
    {
      title: '小计',
      dataIndex: 'instanceSize',
      align: 'center',
      width: 60,
    },
    {
      title: '比例',
      dataIndex: 'percent',
      align: 'left',
      width: 150,
      render: (percent: string, record: any) => {
        if (record.wardName === '总计') return <span></span>

        let innerWidth = percent || '0%'
        return <div>
          <PercentItem innerWidth={innerWidth} style={{ verticalAlign: 'middle', marginLeft: 10 }} />
          <span style={{ verticalAlign: 'middle', marginLeft: 10 }}>{percent}</span>
        </div>
      }
    }
  ]

  const columns2: ColumnProps<any>[] = [
    {
      title: '质控级别',
      dataIndex: 'level',
      align: 'center',
      width: 180,
    },
    {
      title: '小计',
      dataIndex: 'instanceSize',
      align: 'center',
      width: 60,
    },
    {
      title: '比例',
      dataIndex: 'percent',
      align: 'left',
      width: 150,
      render: (percent: string, record: any) => {
        if (record.level === '总计') return <span></span>

        let innerWidth = percent || '0%'
        return <div>
          <PercentItem innerWidth={innerWidth} style={{ verticalAlign: 'middle', marginLeft: 10 }} />
          <span style={{ verticalAlign: 'middle', marginLeft: 10 }}>{percent}</span>
        </div>
      }
    }
  ]

  const columns3: ColumnProps<any>[] = [
    {
      title: '题目',
      dataIndex: 'qcItemName',
      align: 'left',
      width: 240,
      render: (text: string, record: any) => `${record.itemShowCode}.${text}`
    },
    {
      title: '是',
      dataIndex: 'yesSize',
      align: 'center',
      width: 110,
      render: (yesSize: string, record: any) => <span>{`${yesSize}(${record.yesPercent})`}</span>
    },
    {
      title: '否',
      dataIndex: 'noSize',
      align: 'center',
      width: 110,
      render: (noSize: string, record: any) => <span>{`${noSize}(${record.noPercent})`}</span>
    },
    {
      title: '不适用',
      dataIndex: 'inApplicableSize',
      align: 'center',
      width: 110,
      render: (inApplicableSize: string, record: any) => <span>{`${inApplicableSize}(${record.inApplicablePercent})`}</span>
    },
  ]

  const columns4: ColumnProps<any>[] = [
    {
      title: '序号',
      align: 'center',
      width: 50,
      render: (text: any, record: any, idx: number) => idx + 1
    },
    {
      title: '科室',
      dataIndex: 'wardName',
      align: 'center',
      width: 180,
    },
    {
      title: '时间',
      dataIndex: 'evalDate',
      align: 'center',
      width: 150,
    },
    {
      title: '备注',
      dataIndex: 'remark',
      align: 'left',
      width: 220,
      render: (text: string) => <PreCon>{text}</PreCon>
    }
  ]

  const getFormList = () => {
    if (!loading) {
      setLoading(true)

      qcDghlService.formTemplateList({
        level: qcLevel ? Number(qcLevel) : 3,
        templateName: ''
      })
        .then(res => {
          setLoading(false)

          let newFormList = res.data || []
          setFormList(newFormList)
          if (newFormList.length > 0) {
            setQuery({
              ...query,
              qcCode: newFormList[0].qcCode
            })
          } else {
            message.warning('无质控表单')
          }
        }, () => setLoading(false))
    }
  }

  const getTableData = () => {
    setLoading(true)
    qcDghlService
      .individualCountDetail(query)
      .then(res => {
        setLoading(false)
        if (res.data) {
          const {
            itemCountList,
            levelInstanceCountList,
            remarkCountList,
            wardInstanceCountList
          } = res.data

          setData({
            itemCountList: (itemCountList || []).map((item: any) => {
              let totalSize = 0
              totalSize += !isNaN(Number(item.yesSize)) ? Number(item.yesSize) : 0
              totalSize += !isNaN(Number(item.noSize)) ? Number(item.noSize) : 0
              totalSize += !isNaN(Number(item.inApplicableSize)) ? Number(item.inApplicableSize) : 0

              let yesPercent, noPercent, inApplicablePercent

              if (totalSize > 0) {
                yesPercent = `${parseInt((item.yesSize / totalSize * 10000).toString()) / 100}%`
                noPercent = `${parseInt((item.noSize / totalSize * 10000).toString()) / 100}%`
                inApplicablePercent = `${parseInt((item.inApplicableSize / totalSize * 10000).toString()) / 100}%`
              }

              return {
                ...item,
                totalSize,
                yesPercent: yesPercent || '0%',
                noPercent: noPercent || '0%',
                inApplicablePercent: inApplicablePercent || '0%',
              }
            }),
            levelInstanceCountList: levelInstanceCountList || [],
            remarkCountList: remarkCountList || [],
            wardInstanceCountList: wardInstanceCountList || [],
          })
        }
        // console.log(res)
      }, () => setLoading(false))
  }

  useEffect(() => {
    if (formList.length > 0)
      getTableData()
    else
      getFormList()
  }, [query])

  return <Wrapper>
    <PageHeader>
      <PageTitle>质控表单汇总</PageTitle>
      <Place />
      <span>质控时间：</span>
      <RangePicker
        allowClear={false}
        value={[moment(query.beginDate), moment(query.endDate)]}
        style={{ marginRight: 10, width: 210 }}
        ranges={{
          '本月': _currentMonth,
          '本季度': _currentQuater,
          '本年度': _currentYear,
        }}
        onChange={(moments: any[]) => {
          setQuery({
            ...query,
            beginDate: moments[0].format('YYYY-MM-DD'),
            endDate: moments[1].format('YYYY-MM-DD'),
          })
        }} />
      <span>质控科室：</span>
      <Select
        style={{ marginRight: 10, width: 180 }}
        value={query.wardCode}
        onChange={(wardCode: string) => setQuery({
          ...query,
          wardCode
        })}
        showSearch
        filterOption={(input: any, option: any) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
        <Option value="">全部</Option>
        {authStore.deptList.map((dept: any, idx: number) => (
          <Option value={dept.code} key={idx}>{dept.name}</Option>
        ))}
      </Select>
      <span>质控表单：</span>
      <Select
        style={{ marginRight: 10, width: 220 }}
        value={query.qcCode}
        onChange={(qcCode: string) =>
          setQuery({
            ...query,
            qcCode
          })}
        placeholder="质控表单"
        showSearch
        filterOption={(input: any, option: any) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
        {formList.map((item: any, idx: number) => (
          <Option value={item.qcCode} key={idx}>{item.qcName}</Option>
        ))}
      </Select>
      <Button type="primary" onClick={() => getTableData()}>查询</Button>
    </PageHeader>
    <MainCon>
      <TableCon>
        <Spin spinning={loading}>
          <div className="main-title">{currentFormItem?.qcName || '表单名称'}</div>
          <div className="sub-title">科室表单统计</div>
          <BaseTable
            className="summary-table"
            columns={columns1}
            dataSource={wardInstanceCountListVisible} />
          <div className="sub-title">质控级别表单统计</div>
          <BaseTable
            className="summary-table"
            columns={columns2}
            dataSource={levelInstanceCountListVisible} />
          <div className="sub-title">项目统计</div>
          <BaseTable
            className="summary-table"
            columns={columns3}
            dataSource={itemCountList}
            rowKey="itemShowCode" />
          <div className="sub-title">备注统计</div>
          <BaseTable
            className="summary-table"
            columns={columns4}
            dataSource={remarkCountList} />
        </Spin>
      </TableCon>
    </MainCon>
  </Wrapper>
})

const Wrapper = styled.div``

// @ts-ignore
const MainCon = styled(ScrollBox)`
  padding: 15px;
  margin-top: 0;
  height: calc(100vh - 101px);
`

const TableCon = styled.div`
  background-color: #fff;
  width: 100%;
  min-height: 100%;
  padding: 15px;
  #baseTable .ant-table-content .ant-table-body{
    overflow-y: hidden!important;
  }
  .main-title{
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    color: #000;
  }
  .sub-title{
    border-left: 5px solid #4bb08d;
    height: 24px;
    line-height: 24px;
    padding-left: 12px;
    font-size: 16px;
    margin-bottom: 10px;
    margin-top: 20px;
    &:first-of-type{
      margin-top: 0;
    }
  }
  .summary-table{
    max-width: 800px;
    width: 100%;
    margin: 0 auto;
  }
`

const PercentItem = styled.div<{ innerWidth?: string }>`
  width: 120px;
  height: 12px;
  position: relative;
  background-color: #ddd;
  border-radius: 6px;
  overflow: hidden;
  display: inline-block;
  &::after{
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    background-color: #4bb08d;
    height: 12px;
    width: ${props => props.innerWidth || '0%'};
  }
`

const PreCon = styled.pre`
  padding-top: 2px;
  word-wrap: break-word;
  white-space: pre-wrap;
  margin: 0;
`