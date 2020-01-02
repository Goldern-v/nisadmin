import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Modal, DatePicker, Input, Select } from 'antd'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import moment from 'moment'
import { ColumnProps } from 'antd/lib/table'
import { nursingRulesApiService } from './../../api/nursingRulesNewService'
const Option = Select.Option
export interface Props {
  visible: boolean,
  onCancel?: Function
}

export default function RevisonRecordModal(props: Props) {
  const { visible, onCancel } = props
  const bookNameRef = React.createRef<any>()
  const operaterNameRef = React.createRef<any>()
  const [loading, setLoading] = useState(false)
  const [dataTotal, setDataTotal] = useState(0 as number)
  const [operateTypeList, setOperateTypeList] = useState([] as any[])

  const [data, setData] = useState([] as any)

  const [query, setQuery] = useState({
    beginDate: moment().subtract(30, 'day').format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD'),
    bookName: '',
    pageSize: 20,
    pageIndex: 1,
    operaterName: '',
    operateType: '',
  })

  const columns: ColumnProps<any>[] = [
    {
      dataIndex: 'bookName',
      width: 200,
      title: '书名'
    },
    {
      dataIndex: 'operateTime',
      align: 'center',
      width: 100,
      title: '更新时间'
    },
    {
      dataIndex: 'operateTypeDes',
      align: 'center',
      width: 100,
      title: '类型'
    },
    {
      dataIndex: 'changeContent',
      title: '内容'
    },

    {
      dataIndex: 'operatorEmpName',
      align: 'center',
      width: 80,
      title: '上传人员'
    },
  ]

  const getData = (query: any) => {
    let _query = {
      ...query,
      beginTime: query.beginDate ? `${query.beginDate} 00:00:00` : '',
      endTime: query.endDate ? `${query.endDate} 23:59:59` : ''
    }

    delete _query.beginDate
    delete _query.endDate

    setLoading(true)

    nursingRulesApiService
      .getChangeRecordListByParam(_query)
      .then(res => {
        setLoading(false)
        if (res.data) {
          setData(res.data.list || [])
          setDataTotal(res.data.totalCount)
        }
      }, () => setLoading(false))
  }

  const handlePageSizeChange = (current: number, size: number) => {
    setQuery({ ...query, pageSize: size, pageIndex: 1 })
  }

  const handlePageChange = (current: number) => {
    setQuery({ ...query, pageIndex: current })
  }

  useEffect(() => {
    nursingRulesApiService.getOperateTypes().then(res => {
      if (res.data) setOperateTypeList(res.data)
    })
  }, [])

  useEffect(() => {
    if (visible) getData(query)
  }, [visible, query])

  return <Modal
    confirmLoading={loading}
    centered
    onCancel={() => onCancel && onCancel()}
    footer={null}
    width={1000}
    bodyStyle={{ paddingBottom: 5 }}
    visible={visible}
    title="修订痕迹">
    <Wrapper>
      <div className="filter-con">
        <span className="label">查询时间: </span>
        <DatePicker
          style={{ width: 120 }}
          allowClear={false}
          value={query.beginDate ? moment(query.beginDate) : undefined}
          onChange={(newVal) =>
            setQuery({ ...query, beginDate: newVal ? newVal.format('YYYY-MM-DD') : '' })} />
        <span> - </span>
        <DatePicker
          style={{ width: 120 }}
          allowClear={false}
          value={query.endDate ? moment(query.endDate) : undefined}
          onChange={(newVal) =>
            setQuery({ ...query, endDate: newVal ? newVal.format('YYYY-MM-DD') : '' })} />
        <span className="label">书名: </span>
        <Input
          ref={bookNameRef}
          allowClear
          style={{ width: 150 }}
          defaultValue={query.bookName}
          onBlur={(e: any) => {
            if (query.bookName !== e.target.value)
              setQuery({ ...query, bookName: e.target.value })
          }} />
        {/* <span className="label">上传人员: </span>
        <Input
          ref={operaterNameRef}
          allowClear
          style={{ width: 150 }}
          defaultValue={query.operaterName}
          onBlur={(e: any) => {
            if (query.operaterName !== e.target.value)
              setQuery({ ...query, operaterName: e.target.value })
          }} /> */}
        <span className="label">类型: </span>
        <Select
          value={query.operateType}
          style={{ width: 130 }}
          onChange={(operateType: string) => setQuery({ ...query, operateType })}>
          <Option value={''}>全部</Option>
          {operateTypeList.map((item: any, idx: number) =>
            <Option key={idx} value={item.code}>{item.desc}</Option>)}
        </Select>
        <Button className="label" onClick={() => getData(query)}>查询</Button>
      </div>
      <div className="table-con">
        <BaseTable
          surplusHeight={400}
          loading={loading}
          type={['index']}
          pagination={{
            pageSizeOptions: ['10', '20', '30', '40', '50'],
            onShowSizeChange: handlePageSizeChange,
            onChange: handlePageChange,
            total: dataTotal,
            showSizeChanger: true,
            showQuickJumper: true,
            pageSize: query.pageSize,
            current: query.pageIndex
          }}
          columns={columns}
          dataSource={data}
        />
      </div>
    </Wrapper>
  </Modal>
}
const Wrapper = styled.div`
  .filter-con{
    &>*{
      vertical-align: middle;
    }
    .label{
      margin-left: 14px;
    }
  }
  /* .ant-input{
    width: 150px;
  } */
`