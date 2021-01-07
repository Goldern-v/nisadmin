import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Modal, Select, message, Popover } from 'antd'
import YearPicker from 'src/components/YearPicker'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { ColumnProps } from 'src/vendors/antd'
import { authStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import moment from 'moment'
import { globalModal } from 'src/global/globalModal'
import { qcOneService } from './../services/QcOneService'

export interface Props {
  visible: boolean,
  reportType?: string
  isQuarter?: boolean,
  onOk?: any,
  hideMonthOrSeason?: boolean,
  onCancel?: any
}

const Option = Select.Option

export default observer(function CommitModal(props: Props) {
  const { visible, onCancel, reportType, isQuarter, hideMonthOrSeason } = props
  const [bigDeptList, setBigDeptList] = useState([] as any[])

  const [query, setQuery] = useState({
    year: moment().format('YYYY'),
    wardCode: ''
  })


  const [loading, setLoading] = useState(false)

  const [tableData, setTableData] = useState([] as any)

  const columns: ColumnProps<any>[] = [
    {
      key: 'index',
      title: '序号',
      width: 60,
      align: 'center',
      render: (text: string, record: any, idx: number) => idx + 1
    },
    {
      dataIndex: 'reportName',
      title: '标题',
      align: 'left',
      render: (text: string, record: any, idx: number) =>
        <div className="ellips" title={text}>{text}</div>
    },
    {
      dataIndex: 'wardName',
      key: 'wardName',
      title: '片区',
      width: 120,
    },
    ...(() => {
      if (hideMonthOrSeason)
        return []

      return [
        {
          key: 'month',
          title: isQuarter ? '季度' : '月份',
          align: 'center',
          width: 110,
          render: (text: string, record: any, idx: number) => {
            if (isQuarter)
              return `${record.year}年第${record.month}季度`
            else
              return `${record.year}年${record.month}月`
          }
        }
      ] as ColumnProps<any>[]
    })(),
    {
      key: 'status',
      title: '状态',
      align: 'center',
      width: 90,
      render: (text: string, record: any, idx: number) => {
        if (record.status == '-1')
          return <Popover
            placement="right"
            // title={'病区未提交'}
            content={<pre>{record.message}</pre>}
            trigger="hover">
            <span style={{ color: 'red', cursor: 'pointer' }}>病区未提交</span>
          </Popover>
        if (record.status == '0') return '待提交'
        if (record.status == '1') return '已提交'
        return ''
      }
    },
    {
      dataIndex: 'commiterName',
      key: 'commiterName',
      title: '提交人',
      align: 'center',
      width: 80
    },
    {
      dataIndex: 'commitTime',
      key: 'commitTime',
      title: '提交时间',
      align: 'center',
      width: 140
    },
    {
      key: 'operate',
      title: '操作',
      width: 80,
      render: (text: string, record: any) => {
        return <DoCon className="operate-group">
          {record.status === '-1' && <span style={{ color: '#999', cursor: 'default' }}>提交</span>}
          {record.status === '0' && <span onClick={() => handlePublishToMd(record)}>提交</span>}
          {record.status === '1' && <span
            style={{ color: 'red' }}
            onClick={() => handleCancelPublishToMd(record)}>
            撤销
          </span>}
        </DoCon>
      }
    }
  ]

  const handlePublishToMd = (record: any) => {
    globalModal
      .confirm('提交确认', '你确定要提交该报告吗？')
      .then((res) => {
        setLoading(true)
        qcOneService.publishToMd({
          year: record.year,
          month: record.month,
          wardCode: query.wardCode,
        }, reportType || 'sr').then(res => {
          setLoading(false)
          message.success('提交成功')
          getList(query)
        }, () => setLoading(false))
      })

  }

  const handleCancelPublishToMd = (record: any) => {
    globalModal
      .confirm('撤销确认', '你确定要撤销该报告吗？')
      .then((res) => {
        setLoading(true)
        qcOneService.cancelPublishToMd({
          year: record.year,
          month: record.month,
          wardCode: query.wardCode,
        }, reportType || 'sr').then(res => {
          setLoading(false)
          message.success('撤销成功')
          getList(query)
        }, () => setLoading(false))
      })

  }

  const getList = (query: any) => {
    if (!query.wardCode) return

    setLoading(true)
    qcOneService
      .getCommitList(query, reportType || 'sr')
      .then(res => {
        setLoading(false)
        if (res.data) setTableData(res.data)
      }, () => setLoading(false))
  }

  useEffect(() => {
    qcOneService.bigDeptListSelf().then(res => {
      if (res.data) {
        setBigDeptList(res.data)
        if (res.data[0]) setQuery({ ...query, wardCode: res.data[0].code })
      }
    })
  }, [])

  useEffect(() => {
    if (visible) getList(query)
  }, [query, visible])

  return <Modal
    title="科护士长提交"
    width={1000}
    visible={visible}
    footer={null}
    bodyStyle={{
      padding: '5px 10px'
    }}
    onCancel={() => {
      if (!loading) onCancel && onCancel()
    }}
    confirmLoading={loading}
    centered>
    <Wrapper>
      <div className="query-pannel">
        <span>年份: </span>
        <YearPicker
          allowClear={false}
          value={moment(`${query.year}-01-01`) || undefined}
          onChange={(newMoment: any) => {
            if (newMoment)
              setQuery({ ...query, year: newMoment.format('YYYY') })
            else
              setQuery({ ...query, year: '' })
          }} />
        <span style={{ marginLeft: '15px' }}>片区: </span>
        <Select
          showSearch
          value={query.wardCode}
          onChange={(wardCode: string) => setQuery({ ...query, wardCode })}
          filterOption={(input: string, option: any) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          style={{ width: '176px' }}>
          {bigDeptList.map((item) => <Option value={item.code} key={item.code}>{item.name}</Option>)}
        </Select>
      </div>
      <div className="table-pannel">
        <BaseTable
          surplusHeight={400}
          dataSource={tableData}
          loading={loading}
          columns={columns} />
      </div>
    </Wrapper>
  </Modal>
})

const Wrapper = styled.div`
  .query-pannel{
    padding-top: 5px;
    padding-left: 16px;
  }
  td{
    position: relative;
    word-break: break-all;
    .ellips{
      position: absolute;
      left:0;
      top: 0;
      height: 30px;
      line-height: 30px;
      right: 0;
      padding: 0 5px;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
  }
`