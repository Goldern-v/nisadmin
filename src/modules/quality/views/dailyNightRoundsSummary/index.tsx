import moment from 'moment'
import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { observer } from 'mobx-react-lite'
import { Button, DatePicker, Select } from 'antd'
import api from 'src/services/api/quality/nightRoundsRecordApi'
import { STATUS_LIST } from './utils/enums'
import { Obj, SelectItem } from 'src/libs/types'
import { PageHeader, PageTitle, Place } from 'src/components/common'
import { currentMonth } from 'src/utils/date/rangeMethod'
import { appStore } from 'src/stores'

interface Props {
}
/** 每日夜查房汇总 by江门妇幼 */
export default observer((props: Props) => {

  const [tableLoading, setTableLoading] = useState(false)
  const [tableData, setTableData] = useState([])
  const defaultForm = () => {
    const [m1, m2] = currentMonth()
    return {
      status: '',
      beginTime: m1,
      endTime: m2,
      pageIndex: 1,
      pageSize: 20
    }
  }
  const [form, setForm]: any = useState(defaultForm)
  const setFormItem = (item = {}) => {
    setForm({ ...form, ...item })
  }
  const [total, setTotal] = useState(1)

  const columns: any[] = [
    {
      title: "序号",
      dataIndex: "",
      render: (text: any, record: any, index: number) => index + 1,
      align: "center",
      width: 30
    },
    {
      title: "日期",
      dataIndex: 'submitTime',
      width: 120,
      align: "center",
      render: (text: string) => {
        return (
          text ? moment(text).format('YYYY-MM-DD HH:mm') : ''
        )
      }
    },
    {
      title: "标题",
      dataIndex: "summaryCode",
      width: 120,
      align: "center",
      render: (text: string, row: Obj) => {
        return moment(text).format('YYYY年MM月DD日') + '护士长夜查房汇报表'
      }
    },
    {
      title: "提交人",
      dataIndex: "submitName",
      width: 70,
      align: "center"
    },
    {
      title: "审核状态",
      dataIndex: "status",
      width: 100,
      align: "center",
      render: (text: string, row: Obj) => {
        let item: SelectItem | undefined = STATUS_LIST.find((v: SelectItem) => text === v.value)
        return <span style={{ color: item?.color }}>{item?.label || row.statusDescription}</span>
      }
    },
    {
      title: "操作",
      width: 80,
      align: "center",
      render: (text: any, row: any, c: any) => {
        return (
          <DoCon>
            <span onClick={() => handleView(row)}>
              查看
            </span>
          </DoCon>
        );
      }
    }
  ]

  const getList = async () => {
    try {
      setTableLoading(true)
      const { data } = await api.getDailySummaryList(form)
      setTableLoading(false)
      //setTotal(data.totalPage)
      setTotal(data.totalCount)
      setTableData(data.list)
    } catch (error) {
      setTableLoading(false)
    }
  }

  const handleView = (row: any) => {
    appStore.history.push(`/checkWard/dailyNightRoundsSummary/detail?id=${row.summaryCode}`)
  }
  useEffect(() => {
    getList()
  }, [form])
  return (
    <Wrapper>
      <PageHeader>
        <PageTitle>每日夜查房汇总</PageTitle>
        <Place />
        <span className='label'>日期：</span>
        <DatePicker.RangePicker
          style={{ width: 220 }}
          value={[form.beginTime, form.endTime]}
          onChange={(val) => setFormItem({ beginTime: val[0], endTime: val[1] })} />
        <span className='label'>状态：</span>
        <Select
          value={form.status}
          style={{ width: '140px' }}
          onChange={(val: string) => setFormItem({ status: val })}>
          {
            STATUS_LIST.map((item, index) => {
              return <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>
            })
          }
        </Select>
        <Button onClick={() => getList()}>查询</Button>
      </PageHeader>
      <BaseTable
        type={'index'}
        loading={tableLoading}
        columns={columns}
        dataSource={tableData}
        surplusHeight={235}
        wrapperStyle={{ borderRadius: '5px', margin: '0 15px' }}
        pagination={{
          current: form.pageIndex,
          pageSize: form.pageSize,
          total: total
        }}
        onChange={(pagination: any) => {
          setFormItem({
            pageIndex: pagination.current,
            pageSize: pagination.pageSize,
          })
        }}
      />
    </Wrapper>
  )
})

const Wrapper = styled.div`
  height: 100%;
  .itemHide{
    display: none
  }
`
