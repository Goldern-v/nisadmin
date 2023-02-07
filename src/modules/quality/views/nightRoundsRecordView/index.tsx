import moment from 'moment'
import DeptSelect from 'src/components/DeptSelect'
import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { observer } from 'mobx-react-lite'
import { Button, DatePicker, Select } from 'antd'
import { appStore, authStore } from 'src/stores'
import { fileDownload } from "src/utils/file/file";
import api from 'src/services/api/quality/nightRoundsRecordApi'
import { CONFIG, STATUS_LIST } from './utils/enums'
import { Obj, SelectItem } from 'src/libs/types'
import { PageHeader, PageTitle, Place } from 'src/components/common'
import { currentMonth } from 'src/utils/date/rangeMethod'

interface Props {
  type: string
}
/** 护长夜查房评分记录 + 二值夜查房评分记录 by江门妇幼 */
export default observer((props: Props) => {
  const { type } = props
  const [tableLoading, setTableLoading] = useState(false)
  const [tableData, setTableData] = useState([])
  const defaultForm = () => {
    const [m1, m2] = currentMonth()
    return {
      wardCode: authStore.selectedDeptCode,
      status: undefined,
      beginDate: m1,
      endDate: m2,
      formCodes: [],
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
    // {
    //   title: "序号",
    //   dataIndex: "",
    //   render: (text: any, record: any, index: number) => index + 1,
    //   align: "center",
    //   width: 30
    // },
    {
      title: "日期",
      dataIndex: `createTime`,
      width: 120,
      align: "center",
      render: (text: string) => {
        return (
          moment(text).format('YYYY-MM-DD HH:mm')
        )
      }
    },
    {
      title: "检查病区",
      dataIndex: "deptName",
      width: 120,
      align: "center"
    },
    ...CONFIG[type].customColumns,
    {
      title: "状态",
      dataIndex: "status",
      width: 100,
      align: "center",
      render: (text: string, row: Obj) => {
        let item: SelectItem | undefined = STATUS_LIST.find((v: SelectItem) => text == v.value)
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
    setTableLoading(true)
    const { data } = await api.getList({ ...form, type })
    setTableLoading(false)
    //setTotal(data.totalPage)
    setTotal(data.totalCount)
    setTableData(data.list.map((item: any) => {
      return {
        ...item,
        ...item.itemDataMap
      }
    }))
  }

  const handleView = (row: any) => {
    appStore.history.push(`/checkWard/recordView?id=${row.id}&type=${type}`)
  }
  useEffect(() => {
    getList()
  }, [form])
  /*导出*/
  const exportFiles = () => {
    api.getPageByUserDeptExport({ ...form }).then(res => {
      fileDownload(res)
    })
  }
  return (
    <Wrapper>
      <PageHeader>
        <PageTitle>{CONFIG[type].title}</PageTitle>
        <Place />
        <span className='label'>科室：</span>
        <DeptSelect hasAllDept onChange={(deptCode) => setFormItem({ wardCode: deptCode === '全院' ? '' : deptCode })} />
        <span className='label'>日期：</span>
        <DatePicker.RangePicker
          style={{ width: 220 }}
          value={[form.beginDate, form.endDate]}
          onChange={(val) => setFormItem({ beginDate: val[0], endDate: val[1] })} />
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

        {/* 需要重新写接口联调 */}
        {CONFIG[type].showExport && <Button type='primary' onClick={exportFiles}>导出</Button>}
      </PageHeader>
      <BaseTable
        type={'index'}
        loading={tableLoading}
        columns={columns}
        dataSource={tableData}
        surplusHeight={200}
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
