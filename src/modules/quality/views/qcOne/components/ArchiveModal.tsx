import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Modal, Select, message, Popover } from 'antd'
import YearPicker from 'src/components/YearPicker'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { ColumnProps } from 'src/vendors/antd'
// import { authStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import moment from 'moment'
import { globalModal } from 'src/global/globalModal'
import { qcOneService } from './../services/QcOneService'

export interface Props {
  visible: boolean,
  reportType?: string,
  isQuarter?: boolean,
  onOk?: any,
  onCancel?: any
}

// const Option = Select.Option

export default observer(function ArchiveModal(props: Props) {
  const { visible, onCancel, reportType, isQuarter } = props

  const [query, setQuery] = useState({
    year: moment().format('YYYY')
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
    },
    {
      key: 'status',
      title: '状态',
      align: 'center',
      width: 110,
      render: (text: string, record: any, idx: number) => {
        if (record.status == '-1')
          return <Popover
            placement="right"
            // title={'病区未提交'}
            content={<pre>{record.message}</pre>}
            trigger="hover">
            <span style={{ color: 'red', cursor: 'pointer' }}>科护士长未提交</span>
          </Popover>
        if (record.status == '0') return '待归档'
        if (record.status == '1') return '已归档'
        return ''
      }
    },
    {
      dataIndex: 'commiterName',
      key: 'commiterName',
      title: '汇总人',
      align: 'center',
      width: 80
    },
    {
      dataIndex: 'commitTime',
      key: 'commitTime',
      title: '汇总时间',
      align: 'center',
      width: 140
    },
    {
      key: 'operate',
      title: '操作',
      width: 80,
      render: (text: string, record: any) => {
        return <DoCon className="operate-group">
          {record.status === '-1' && <span style={{ color: '#999', cursor: 'default' }}>汇总</span>}
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
      .confirm('归档确认', '你确定要归档该记录吗？')
      .then((res) => {
        setLoading(true)
        qcOneService.archive({
          year: record.year,
          month: record.month
        }, reportType || 'sr').then(res => {
          setLoading(false)
          message.success('归档成功')
          getList(query)
        }, () => setLoading(false))
      })

  }

  const handleCancelPublishToMd = (record: any) => {
    globalModal
      .confirm('撤销确认', '你确定要撤销该记录吗？')
      .then((res) => {
        setLoading(true)
        qcOneService.cancelArchive({
          year: record.year,
          month: record.month,
        }, reportType || 'sr').then(res => {
          setLoading(false)
          message.success('撤销成功')
          getList(query)
        }, () => setLoading(false))
      })

  }

  const getList = (query: any) => {

    setLoading(true)
    qcOneService
      .getArchiveList(query, reportType || 'sr')
      .then(res => {
        setLoading(false)
        if (res.data) setTableData(res.data)
      }, () => setLoading(false))
  }

  useEffect(() => {
    if (visible) getList(query)
  }, [query, visible])

  return <Modal
    title="护理部归档"
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
          value={moment(query.year) || undefined}
          onChange={(newMoment: any) => {
            if (newMoment)
              setQuery({ ...query, year: newMoment.format('YYYY') })
            else
              setQuery({ ...query, year: '' })
          }} />
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