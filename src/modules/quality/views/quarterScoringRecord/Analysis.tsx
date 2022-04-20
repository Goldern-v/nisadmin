import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { DatePicker, Select, Button, message, Icon, Modal, Input } from 'antd'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { ColumnProps } from 'antd/lib/table'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import moment, { duration } from 'moment'
import QualityAnalysisService from './api/QualityAnalysisService'

import CreateAnalysisModal from './components/CreateAnalysisModal'
import qs from 'qs'
import { PageTitle } from 'src/components/common'
// import { useKeepAliveEffect } from 'src/vendors/keep-alive'

const api = new QualityAnalysisService()
const Option = Select.Option

export default observer(function Analysis() {
  //
  const [yearPickerIsOpen, setYearPickerIsOpen] = useState(false)
  const [createAnalysisVisible, setCreateAnalysisVisible] = useState(false)
  const [createClear, setCreateClear] = useState(true)
  const { history } = appStore

  //进度条相关
  const [createProgressVisible, setCreateProgressVisible] = useState(false)
  const [createLoading, setCreateLoading] = useState('')

  const [query, setQuery] = useState({
    year: moment() as null | moment.Moment,
    pageIndex: 1,
    pageSize: 20,
    quarter: '',
    keyWord: '',
  } as any)


  useEffect(() => {
    getTableData()
  }, [query])

  // useKeepAliveEffect(() => {
  //   if ((appStore.history && appStore.history.action) === 'POP') {
  //     getTableData()
  //   }
  //   return () => { }
  // })

  const [dataTotal, setDataTotal] = useState(0 as number)

  const [tableData, setTableData] = useState([] as any)

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
      title: '报告名称',
      key: 'title',
      dataIndex: 'title',
      className: 'align-left',
      align: 'left',
      width: 200,
      render: (name: string) => <div title={name}>{name}</div>
    },
    {
      title: '报告年度',
      key: 'year',
      dataIndex: 'year',
      width: 90,
      align: 'center',
      render: (year: string) => `${year}年`
    },
    {
      title: '报告季度',
      key: 'quarter',
      dataIndex: 'quarter',
      width: 90,
      align: 'center',
      render: (quarter: string) => {
        switch (quarter) {
          case 'Q1':
            return '第一季度';
            break;
          case 'Q2':
            return '第二季度';
            break;
          case 'Q3':
            return '第三季度';
            break;
          case 'Q4':
            return '第四季度';
            break;
        }

      }
    },
    {
      title: '查房开始日期',
      key: 'startDate',
      dataIndex: 'startDate',
      width: 90,
      align: 'center'
    },
    {
      title: '查房结束日期',
      key: 'endDate',
      dataIndex: 'endDate',
      width: 90,
      align: 'center'
    },
    {
      title: '创建人',
      key: 'creatorName',
      dataIndex: 'creatorName',
      width: 90,
      align: 'center'
    },
    {
      title: '创建时间',
      key: 'createTime',
      dataIndex: 'createTime',
      width: 120,
      align: 'center'
    },
    {
      title: '操作',
      key: 'operation',
      width: 80,
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

  const handleYearClear = () => {
    setQuery({ ...query, year: null, indexInType: '' })
  }

  const onKeywordChange = (value: any) => {
    setQuery({ ...query, keyWord: value })
  }

  const handleReview = (record: any) => {
    console.log(record)
    const obj = {
      year: record.year,
      quarter: record.quarter,
      keyWord: record.keyWord,
      indexInType: record.indexInType,
      startDate: record.startDate,
      endDate: record.endDate,
      groupRoleCode: record.groupRoleCode,
      title: record.title,
      id: record.id,
      creatorName: record.creatorName,
      creatorNo: record.creatorNo,
    }

    // console.log(record)
    history.push(`/checkWard/QuarterViewGZ?${qs.stringify(obj)}`)
  }

  const handleSearch = () => {
    getTableData()
  }

  const handleCreate = () => {
    setCreateAnalysisVisible(true)
  }

  const handleCreateOk = (params: any) => {
    if (!params.title) return

    setCreateClear(false)
    setCreateProgressVisible(true)
    setCreateLoading('start')

    let successCallback = () => {
      setCreateLoading('done')
      setCreateClear(true)
      message.success('创建成功', 2, () => {
        setCreateProgressVisible(false)
        setCreateClear(true)
        setCreateLoading('')
        getTableData()
      })
    }

    let failedCallback = (msg?: string) => {

      setCreateProgressVisible(false)
      setCreateClear(true)
      setCreateLoading('')
    }

    api
      .createReport({ ...params })
      .then((res) => {
        if (res.code == 200) {
          handleCreateCancel()
          setCreateProgressVisible(false)
          setCreateClear(true)
          setCreateLoading('')
          let createList = {
            ...params,
            list:res.data.shouldChecks,
            id: res.data.rateId,
          }
          successCallback()
          history.push(`/checkWard/QuarterViewGZ?${qs.stringify(createList)}`)
        } else {
          failedCallback(res.desc || '')
        }
      })
      .catch((err) => {
        failedCallback(err || '')
      })
  }

  const handleCreateCancel = () => {
    setCreateAnalysisVisible(false)
  }


  const getTableData = () => {
    setTableLoading(true)
    let year = ''
    if (query.year !== null) year = query.year.format('YYYY')

    let reqQuery = {
      ...query,
      year
    }
    api
      .getPage(reqQuery)
      .then((res) => {
        setTableLoading(false)

        if (res.data.totalPage) setDataTotal(res.data.totalPage)
        else setDataTotal(0)

        if (res.data.list instanceof Array)
          setTableData(
            res.data.list.map((item: any, key: number) => {
              return {
                key,
                ...item
              }
            })
          )
      })
      .catch((res) => {
        setTableLoading(false)
      })
  }

  return (
    <Wrapper>
      <div className='topbar'>
        <div className='float-left'>
          <PageTitle>护{['gzsrm'].includes(appStore.HOSPITAL_ID) ? '士' : ''}长季度查房报告分析</PageTitle>
        </div>
        <div className='float-right'>
          <div className='item'>
            <div className='label'>报告年度：</div>
            <div className='content'>
              <DatePicker
                style={{ width: 100 }}
                value={query.year}
                open={yearPickerIsOpen}
                mode='year'
                className='year-picker'
                placeholder='全部'
                format='YYYY'
                onChange={handleYearClear}
                onOpenChange={handleOpenChange}
                onPanelChange={handlePanelChange}
              />
            </div>
          </div>
          <div className='item'>
            <div className='label'>报告季度：</div>
            <div className='content'>
              <Select
                style={{ width: 100 }}
                className='month-select'
                value={query.quarter}
                onChange={(quarter: any) => {
                  setQuery({ ...query, quarter })
                }}
              >
                <Option value=''>全部</Option>
                <Option value='Q1'>第一季度</Option>
                <Option value='Q2'>第二季度</Option>
                <Option value='Q3'>第三季度</Option>
                <Option value='Q4'>第四季度</Option>
              </Select>
            </div>
          </div>
          <div className='item'>
            <div className='label'>关键字：</div>
            <div className='content'>
              <Input placeholder="请输入关键字" onChange={(e) => onKeywordChange(e.target.value)} />
            </div>
          </div>
          <div className='item'>
            <Button onClick={handleSearch}>查询</Button>
          </div>
          <div className='item'>
            {' '}
            <Button onClick={handleCreate} type='primary'>
              创建
            </Button>{' '}
          </div>
        </div>
      </div>
      <div className='main-contain'>
        <BaseTable
          columns={columns}
          dataSource={tableData}
          loading={tableLoading}
          surplusHeight={230}
          onRow={(record: any) => {
            return {
              onDoubleClick: () => record.title && handleReview(record)
            }
          }}
          pagination={{
            pageSizeOptions: ['10', '20', '30', '40', '50'],
            onShowSizeChange: (pageIndex, pageSize) => setQuery({ ...query, pageSize }),
            onChange: (pageIndex, pageSize) => setQuery({ ...query, pageIndex }),
            total: dataTotal,
            showSizeChanger: true,
            showQuickJumper: true,
            pageSize: query.pageSize,
            current: query.pageIndex
          }}
        />
      </div>
      {/* <AnalysisCreateProgress visible={createProgressVisible} loading={createLoading} /> */}
      <CreateAnalysisModal
        allowClear={createClear}
        visible={createAnalysisVisible}
        onOk={handleCreateOk}
        onCancel={handleCreateCancel}
        loading={!!(createLoading == 'start')}
      />
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
    padding: 10px 5px 10px 15px;
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
          width: 75px;
        }
        .recode-type-select {
          min-width: 200px;
        }
        .month-select {
          width: 72px;
        }
      }
    }
  }

  .main-contain {
    height: 100%;
    width: 100%;
    padding: 15px;
    padding-top: 0;
    .align-left {
      position: relative;
      > div {
        position: absolute;
        left: 5px;
        right: 5px;
        top: 5px;
        height: 30px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
`
const ModalCon = styled.div`
  &>div{
    margin-top: 15px;
  }
`