import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { badEventsNewService } from '../../api/badEventsNewService'
import moment from 'moment'

import { PageTitle, Place, PageHeader } from 'src/components/common';
import { Button, DatePicker, Input, message } from 'antd';
import { currentMonth } from 'src/utils/date/rangeMethod'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { ColumnProps } from 'antd/lib/table'
import AddModal from './components/addModal'
import { Obj, SelectItem } from 'src/libs/types'
import { appStore } from 'src/stores'
import { Select } from 'antd/es'
import { quarterAndYear } from 'src/enums/date'
import { STATUS_LIST } from './enums'
const { Option } = Select
export default observer(function BadEventStatisticalReport(props) {
  const { history } = appStore
  const defParams = () => {
    const [startDate, endDate] = currentMonth();
    return {
      dateBegin: startDate.format("YYYY-MM-DD"),
      dateEnd: endDate.format("YYYY-MM-DD"),
      name: '',
      status: '',
      pageSize: 20,
      pageIndex: 1,
    }
  }

  const [params, setParams] = useState(defParams)
  const [total, setTotal] = useState(0)
  const [data, setData] = useState<any>([])
  const [loading, setLoading] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)

  const columns: ColumnProps<any>[] = [
    {
      title: '报告名称',
      dataIndex: 'name',
      width: 160,
      align: 'center'
    },
    {
      title: '年度',
      dataIndex: 'year',
      width: 70,
      align: 'center',
      render(val) {
        return val + '年';
      }
    },
    {
      title: '季度',
      dataIndex: 'timeType',
      width: 90,
      align: 'center',
      render(val: string) {
        return val === '0' ? quarterAndYear[quarterAndYear.length - 1] : quarterAndYear[Number(val) - 1]
      }
    },
    {
      title: '创建人',
      dataIndex: 'creatorName',
      width: 60,
      align: 'center'
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 60,
      align: 'center',
      render(val: string) {
        return STATUS_LIST.find((v: SelectItem) => v.value === val)?.label
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createDate',
      width: 120,
      align: 'center'
    },

    {
      title: '操作',
      width: 60,
      align: 'center',
      render(val: any, row: Obj) {
        return <DoCon>
          <span
            onClick={() => {
              history.push(`/BadEventStatisticalReportDetail/${row.id}`)
            }}
          >
            查看
          </span>
        </DoCon>
      }
    },
  ]

  const search = async () => {
    try {
      setLoading(true)
      const data = { ...params }
      const res = await badEventsNewService.getPageWithBeReport(data)
      if (res.code === '200') {
        setData(res?.data?.list || [])
        setTotal(res.data.totalCount)
      }
      setLoading(false)
    } catch (e) {
      setLoading(false)
    }
  }
  const init = () => {
    search()
  }
  /**创建报告 */
  const createReport = (data: Obj) => {
    badEventsNewService.createCommonWithBeReport(data).then(res => {
      console.log('test-res', res)
      if (res.code === '200') {
        setShowAddModal(false)
        history.push(`/BadEventStatisticalReportDetail/${res.data.id}`)
        return
      }
      message.warning('创建报告失败，请重试')
    })
      .catch((e) => {
        console.log('test-e', e)
      })
  }
  useEffect(() => {
    init()
  }, [params])
  return (
    <Wrapper>
      <PageHeader>
        <PageTitle>不良事件分析报告</PageTitle>
        <Place />
        创建时间:
        <DatePicker.RangePicker
          className='timer'
          allowClear={false}
          value={[moment(params.dateBegin), moment(params.dateEnd)]}
          onChange={([m0, m1]: any[]) => {
            setParams({
              ...params,
              dateBegin: m0?.format('YYYY-MM-DD') || '',
              dateEnd: m1?.format('YYYY-MM-DD') || '',
            })
          }} />
        状态:
        <Select value={params.status} onChange={(e: any) => setParams({ ...params, status: e })}>
          <Option value=''>全部</Option>
          {STATUS_LIST.map(v =>
            <Option value={v.value} key={v.value}>{v.label}</Option>
          )
          }
        </Select>
        报告名称:
        <Input style={{width: '120px'}} value={params.name} onInput={(e: any) => setParams({ ...params, name: e.target.value })} />
        <Button type="primary" className="statistics" onClick={search}>
          查询
        </Button>
        <Button type="primary" className="statistics" onClick={() => setShowAddModal(true)}>
          创建
        </Button>
      </PageHeader>
      <ContentCon>
        <BaseTable
          surplusWidth={100}
          surplusHeight={250}
          loading={loading}
          dataSource={data}
          columns={columns}
          pagination={
            {
              current: params.pageIndex,
              total: total,
              pageSize: params.pageSize,
              showSizeChanger: true,
              showQuickJumper: true,
              onShowSizeChange: (pageIndex, pageSize) =>
                setParams({ ...params, pageSize }),
              onChange: (pageIndex, pageSize) => setParams({ ...params, pageIndex })
            }
          }
        />
      </ContentCon>
      <AddModal visible={showAddModal} onCancel={() => setShowAddModal(false)} onOk={createReport} />
    </Wrapper>
  )
})

const Wrapper = styled.div`
.timer {
  margin-left: 10px;
}
`
const ContentCon = styled.div`
background: #fff;
  margin: 0 15px 5px 15px;
  padding-top: 25px;
  .content-title {
    text-align: center;
    > div:first-child {
      font-size: 20px;
      color: #333;
      font-weight: bold;
      text-align: center;
    }
    > div:nth-child(2) {
      font-size: 13px;
      color: #333;
      text-align: center;
      margin: 8px 0 5px 0;
    }
  }
  .ant-table-column-sorters {
    width: 100%;
  }
`