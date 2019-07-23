import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { DatePicker, Select, Button } from 'antd'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { ColumnProps } from 'antd/lib/table'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import Moment from 'moment'

import CreateAnalysisModal from './components/CreateAnalysisModal'

const Option = Select.Option

export default observer(function Analysis() {
  //
  const [yearPickerIsOpen, setYearPickerIsOpen] = useState(false)
  const [createAnalysisVisible, setCreateAnalysisVisible] = useState(false)
  const { history } = appStore

  const [query, setQuery] = useState({
    year: Moment(),
    formType: '',
    reportRecord: ''
  })

  const [tableData, setTableData] = useState([
    {
      id: 1,
      time: '2019年2月',
      analisisForm: '护理基础质量检查表',
      creatorName: '王大锤',
      createDate: '2019年12月12日',
      status: '状态'
    },
    {
      id: 2,
      time: '2019年2月',
      analisisForm: '护理基础质量检查表',
      creatorName: '王大锤',
      createDate: '2019年12月12日',
      status: '状态'
    }
  ] as any)

  const [tableLoading, setTableLoading] = useState(false)

  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      key: 'index',
      width: 50,
      align: 'center',
      render: (text: string, record: any, index: any) => index + 1
    },
    {
      title: '月份/季度',
      key: 'time',
      dataIndex: 'time',
      width: 150,
      align: 'center'
    },
    {
      title: '分析表单',
      key: 'analisisForm',
      dataIndex: 'time',
      align: 'left'
    },
    {
      title: '创建人',
      key: 'creatorName',
      dataIndex: 'creatorName',
      width: 80,
      align: 'center'
    },
    {
      title: '创建时间',
      key: 'createDate',
      dataIndex: 'createDate',
      width: 150,
      align: 'center'
    },
    {
      title: '状态',
      key: 'status',
      dataIndex: 'status',
      width: 80,
      align: 'center'
    },
    {
      title: '状态',
      key: 'operation',
      width: 150,
      align: 'center',
      render: (text: string, record: any) => {
        return (
          <DoCon>
            <span onClick={() => handleReview(record)}>查看</span>
          </DoCon>
        )
      }
    }
  ]

  const handlePanelChange = (value: any) => {
    setYearPickerIsOpen(false)
    setQuery({ ...query, year: value })
  }

  const handleOpenChange = (status: boolean) => {
    setYearPickerIsOpen(status)
  }

  const handleReview = (record: any) => {
    console.log(record)
    history.push(`/qualityAnalysisReport/${record.id}`)
  }

  const handleSearch = () => {
    console.log('search')
  }

  const handleCreate = () => {
    // history.push('/qualityAnalysisEdit')
    setCreateAnalysisVisible(true)
  }

  // const clearValue = () => {
  //   setQuery({ ...query, year: null })
  // }

  const handleCreateOk = (info: any) => {
    if (info.recodeType) console.log(info)

    setCreateAnalysisVisible(false)
  }

  const handleCreateCancel = () => {
    setCreateAnalysisVisible(false)
  }

  const ReportRecordList = () => {
    let year = query.year.format('YYYY')

    let options = []
    for (let i = 1; i <= 12; i++) {
      let month = i
      options.push(<Option value={`${month}`} key={`month${month}`}>{`${year}年${month}月份`}</Option>)

      if (month % 3 == 0) {
        let season = month / 3
        let seasonStr = ''
        let monthGroup = [month - 2, month - 1, month]
        switch (season) {
          case 1:
            seasonStr = '一'
            break
          case 2:
            seasonStr = '二'
            break
          case 3:
            seasonStr = '三'
            break
          case 4:
            seasonStr = '四'
            break
        }

        options.push(
          <Option value={monthGroup.join(',')} key={`season${season}`}>{`${year}年 第${seasonStr}季度`}</Option>
        )
      }
    }

    return options
  }

  return (
    <Wrapper>
      <div className='topbar'>
        <div className='float-left'>
          <div className='item'>
            <div className='label'>报告年度：</div>
            <div className='content'>
              <DatePicker
                value={query.year}
                allowClear={false}
                open={yearPickerIsOpen}
                mode='year'
                className='year-picker'
                placeholder='选择年份'
                format='YYYY'
                onOpenChange={handleOpenChange}
                onPanelChange={handlePanelChange}
              />
            </div>
          </div>
          <div className='item'>
            <div className='label'>表单：</div>
            <div className='content'>
              <Select
                value={query.formType}
                defaultValue={query.formType}
                onChange={(formType: any) => setQuery({ ...query, formType })}
              >
                <Option value=''>全部</Option>
              </Select>
            </div>
          </div>
          <div className='item'>
            <div className='label'>报告记录：</div>
            <div className='content'>
              <Select
                className='report-record'
                value={query.reportRecord}
                defaultValue={query.reportRecord}
                onChange={(reportRecord: any) => setQuery({ ...query, reportRecord })}
              >
                <Option value=''>全部</Option>
                {ReportRecordList()}
              </Select>
            </div>
          </div>
          <div className='item'>
            <Button onClick={handleSearch}>查询</Button>
          </div>
        </div>
        <div className='float-right'>
          <Button onClick={handleCreate} type='primary'>
            创建
          </Button>
        </div>
      </div>
      <div className='main-contain'>
        <BaseTable columns={columns} rowKey='id' dataSource={tableData} loading={tableLoading} surplusHeight={190} />
      </div>
      <CreateAnalysisModal visible={createAnalysisVisible} onOk={handleCreateOk} onCancel={handleCreateCancel} />
    </Wrapper>
  )
})

const Wrapper = styled.div`
  position: relative;
  padding-top: 55px;
  height: 100%;
  width: 100%;

  div.topbar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 10px 15px;
    box-sizing: border-box;
    height: 55px;
    overflow: hidden;
    .float-left {
      float: left;
    }

    .float-right {
      float: right;
    }

    .item {
      display: inline-block;
      margin-right: 10px;
      vertical-align: middle;
      & > div {
        display: inline-block;
        vertical-align: middle;
      }
      .label {
      }
      .content {
        .year-picker {
          width: 95px;
        }
        .report-record {
          min-width: 140px;
        }
      }
    }
  }

  .main-contain {
    height: 100%;
    width: 100%;
    padding: 15px;
    padding-top: 0;
  }
`
