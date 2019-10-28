import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { DatePicker, Select, Button, message as Message } from 'antd'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { ColumnProps } from 'antd/lib/table'
import { appStore, authStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import Moment from 'moment'
import { summaryReportService as api } from './api/SummaryReportService'
import { numToChinese } from 'src/utils/number/numToChinese'
import CreateSummaryReport from './components/CreateSummaryReport'
import { useKeepAliveEffect } from 'react-keep-alive'
import qs from 'qs'
import { PageTitle } from 'src/components/common'
import DeptSelect from 'src/components/DeptSelect'
import { numberToArray } from 'src/utils/array/array'

const Option = Select.Option

export default observer(function NursingReportList() {
  const [yearPickerIsOpen, setYearPickerIsOpen] = useState(false)
  const [createAnalysisVisible, setCreateAnalysisVisible] = useState(false)
  const { history } = appStore

  const [query, setQuery] = useState({
    year: Moment() as null | Moment.Moment,
    month: Number(Moment().format('MM')),
    pageIndex: 1,
    pageSize: 20,
    status: ''
  } as any)

  useEffect(() => {
    getTableData()
  }, [query, authStore.selectedDeptCode])

  useKeepAliveEffect(() => {
    if ((appStore.history && appStore.history.action) === 'POP') {
      getTableData()
    }
    return () => {}
  })
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
      key: 'reportName',
      dataIndex: 'reportName',
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
      title: '汇总月份',
      key: 'month',
      dataIndex: 'month',
      width: 90,
      align: 'center',
      render: (text: string, item: any) => {
        return text ? `${text}月` : ''
      }
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
      title: '状态',
      key: 'status',
      dataIndex: 'status',
      width: 80,
      align: 'center',
      render: (status: string) => {
        switch (status) {
          case '0':
            return <span style={{ color: 'red' }}>保存</span>
          case '1':
            return '发布'
          default:
            return '-'
        }
      }
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
    setQuery({ ...query, year: null, type: '' })
  }

  const handleReview = (record: any) => {
    const obj = {
      year: record.year,
      month: record.month,
      wardCode: authStore.selectedDeptCode
    }

    history.push(`/qcOne/nursingReportDetail?${qs.stringify(obj)}`)
  }

  const handleSearch = () => {
    getTableData()
  }

  const handleCreate = () => {
    setCreateAnalysisVisible(true)
  }

  const handleCreateOk = (info: any) => {
    //汇总报告创建成功
    let { year, month } = info
    getTableData()
    setCreateAnalysisVisible(false)
    history.push(`/qcOne/nursingReportDetail?${qs.stringify({ year, month, wardCode: authStore.selectedDeptCode })}`)
    setCreateAnalysisVisible(false)
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
      year,
      wardCode: authStore.selectedDeptCode
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
          <PageTitle>病区护理工作报表</PageTitle>
        </div>
        <div className='float-right'>
          <div className='item'>
            <div className='label'>科室：</div>
            <div className='content'>
              <DeptSelect onChange={() => {}} />
            </div>
          </div>
          <div className='item'>
            <div className='label'>报告年度：</div>
            <div className='content'>
              <DatePicker
                style={{ width: 100 }}
                value={query.year}
                open={yearPickerIsOpen}
                allowClear={false}
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
            <div className='label'>月份：</div>
            <div className='content'>
              <Select
                style={{ width: 100 }}
                value={query.month}
                onChange={(value: any) => setQuery({ ...query, month: value })}
              >
                <Select.Option value={''}>全部</Select.Option>
                {numberToArray(11).map((item) => (
                  <Select.Option value={item + 1} key={item}>
                    {item + 1}月
                  </Select.Option>
                ))}
              </Select>
            </div>
          </div>
          <div className='item'>
            <div className='label'>状态：</div>
            <div className='content'>
              <Select
                style={{ width: 100 }}
                value={query.status}
                onChange={(status: any) => {
                  setQuery({ ...query, status })
                }}
              >
                <Option value=''>全部</Option>
                <Option value='0'>保存</Option>
                <Option value='1'>发布</Option>
              </Select>
            </div>
          </div>
          <div className='item'>
            <Button onClick={handleSearch}>查询</Button>
          </div>
          <div className='item'>
            <Button onClick={handleCreate} type='primary'>
              创建
            </Button>
          </div>
        </div>
      </div>
      <div className='main-contain'>
        <BaseTable
          columns={columns}
          dataSource={tableData}
          loading={tableLoading}
          surplusHeight={220}
          onRow={(record: any) => {
            return {
              onDoubleClick: () => record.reportName && handleReview(record)
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
      <CreateSummaryReport
        // allowClear={createClear}
        visible={createAnalysisVisible}
        onOk={handleCreateOk}
        onCancel={handleCreateCancel}
        // groupRoleList={groupRoleListSelf}
      />
    </Wrapper>
  )
})

const Wrapper = styled.div`
  position: relative;
  padding-top: 50px;
  height: 100%;
  width: 100%;

  div.topbar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 10px 5px 10px 15px;
    box-sizing: border-box;
    height: 50px;
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
