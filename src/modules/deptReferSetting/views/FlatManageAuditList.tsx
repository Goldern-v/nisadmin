import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Button, Modal, message as Message, Select } from 'antd'
import { Link } from 'react-router-dom'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { ColumnProps } from 'antd/lib/table'
import DeptSelect from 'src/components/DeptSelect'

// import FlatManageEditModal from '../components/FlatManageEditModal'
import FlatManageDetail from '../components/FlatManageDetail'
import createModal from 'src/libs/createModal'
import moment from 'moment'
import ManagementSummaryService from '../api/ManagementSummaryService'
import YearPicker from 'src/components/YearPicker'
import { numberToArray } from 'src/utils/array/array'

const api = new ManagementSummaryService()

export interface Props extends RouteComponentProps { }

const Option = Select.Option

export default function ManagementSummary() {
  const [tableData, setTableData] = useState([] as any)
  const [dataTotal, setDataTotal] = useState(0 as number)

  // const [editParams, setEditParams] = useState({} as any)
  const [detailVisible, setDetailVisible] = useState(false);
  const [detailViewType, setDetailViewType] = useState('detail')
  const [detailData, setDetailData] = useState({} as any);

  const [query, setQuery] = useState({
    deptCode: '',
    // manageType: '',
    pageSize: 20,
    pageIndex: 1
  } as any)

  const [filterObj, setFilterObj] = useState({
    year: moment(),
    month: Number(moment().format('MM')),
    status: ''
  })

  useEffect(() => {
    if (query.deptCode) getTableData()
  }, [query, filterObj])

  const [tableLoading, setTableLoading] = useState(false)

  const columns: ColumnProps<any>[] = [
    {
      title: '质控内容',
      dataIndex: 'typeName',
      align: 'center',
      render(value, row, index) {
        const obj: any = {
          children: value,
          props: {}
        }
        if (row.rowSpan) {
          obj.props.rowSpan = row.rowSpan
        } else {
          obj.props.rowSpan = 0
          obj.props.colSpan = 0
        }
        return obj
      }
    },

    {
      title: '检查者',
      dataIndex: 'inspectorName',
      align: 'center'
    },
    {
      title: '时间（具体到日）',
      dataIndex: 'checkDate',
      align: 'center'
    },
    {
      title: '存在问题',
      dataIndex: 'problem',
      align: 'center'
    },
    {
      title: '责任人',
      dataIndex: 'responsibleEmpName',
      align: 'center'
    },
    {
      title: '原因分析',
      dataIndex: 'causeAnalysis',
      align: 'center'
    },
    {
      title: '整改措施',
      dataIndex: 'measures',
      align: 'center'
    },
    {
      title: '审核状态',
      dataIndex: 'status',
      align: 'center',
      render: (status: string, record: any) => {
        if (status == '2') return <span className="status2" onClick={() => handleDetailView(record, 'detail')}>已审核</span>
        if (status == '1') return <span className="status1" onClick={() => handleDetailView(record, 'audit')}>待审核</span>
        return '-'
      }
    },
    {
      title: '扣分',
      dataIndex: 'deduction',
      align: 'center'
    },
    {
      title: '总扣分',
      dataIndex: 'totalDeduction',
      align: 'center',
      render(value, row, index) {
        const obj: any = {
          children: value,
          props: {}
        }
        if (row.rowSpan) {
          obj.props.rowSpan = row.rowSpan
        } else {
          obj.props.rowSpan = 0
          obj.props.colSpan = 0
        }
        return obj
      }
    }
  ]

  const handleDeptChange = (deptCode: any) => {
    setQuery({ ...query, deptCode })
  }

  const handleDetailCancel = () => {
    setDetailVisible(false)
  }

  const handleDetailView = (record: any, detailViewType: string) => {
    setDetailData(record)
    setDetailViewType(detailViewType)
    setDetailVisible(true)
  }

  const handleDetailOk = () => {
    getTableData()
    handleDetailCancel()
  }

  const formatData = (list: any[]) => {
    let result: any[] = []
    for (let i = 0; i < list.length; i++) {
      let obj = list[i]
      let { typeName, totalDeduction, typeId } = obj

      for (let j = 0; j < obj.list.length; j++) {
        if (j == 0) {
          result.push({ ...obj.list[0], ...{ rowSpan: obj.list.length, typeName, totalDeduction, typeId } })
        } else {
          result.push(obj.list[j])
        }
      }
    }
    return result
  }

  const getTableData = () => {
    setTableLoading(true)

    api.getList({ ...query, ...filterObj }).then(
      (res) => {
        setTableLoading(false)
        if (res.data) {
          setDataTotal(res.data.totalPage * 100)
          console.log(formatData(res.data.list), 'formatData(res.data.list)')
          setTableData(formatData(res.data.list))
        }
      },
      (err) => {
        setTableLoading(false)
      }
    )
  }

  const exportExcel = () => {
    api.totalExcel({ ...query, ...filterObj })
  }

  return (
    <Wrapper>
      <div className='topbar'>
        <div className='float-left'>
          <div className='item title'>扁平管理汇总</div>
        </div>
        <div className='float-right'>
          <div className='item'>
            <div className='label'>年度：</div>
            <div className='content'>
              <YearPicker
                value={filterObj.year}
                onChange={(value: any) => setFilterObj({ ...filterObj, year: value })}
              />
            </div>
          </div>
          <div className='item'>
            <div className='label'>月份：</div>
            <div className='content'>
              <Select
                style={{ width: 100 }}
                value={filterObj.month}
                onChange={(value: any) => setFilterObj({ ...filterObj, month: value })}
              >
                {numberToArray(11).map((item) => (
                  <Select.Option value={item + 1} key={item}>
                    {item + 1}
                  </Select.Option>
                ))}
              </Select>
            </div>
          </div>
          <div className='item'>
            <div className='label'>审核状态：</div>
            <div className='content'>
              <Select
                style={{ width: 100 }}
                value={filterObj.status}
                onChange={(value: any) => setFilterObj({ ...filterObj, status: value })}
              >
                <Select.Option value={""}>全部</Select.Option>
                <Select.Option value={"1"}>待审核</Select.Option>
                <Select.Option value={"2"}>已审核</Select.Option>
              </Select>
            </div>
          </div>
          <div className='item'>
            <div className='label'>科室：</div>
            <div className='content'>
              <DeptSelect onChange={handleDeptChange} />
            </div>
          </div>
          <div className='item'>
            <Button onClick={() => getTableData()}>查询</Button>
          </div>
          <div className='item'>
            <Button onClick={() => exportExcel()}>导出</Button>
          </div>
        </div>
      </div>
      <div className='main-contain'>
        <BaseTable
          columns={columns}
          rowKey='id'
          dataSource={tableData}
          loading={tableLoading}
          surplusHeight={235}
          onRow={record => {
            return {
              onDoubleClick: (e: any) => handleDetailView(record, record.status == '1' ? 'audit' : 'detail')
            };
          }}
          pagination={{
            onChange: (pageIndex, pageSize) => setQuery({ ...query, pageIndex }),
            total: dataTotal,
            showSizeChanger: false,
            showQuickJumper: true,
            pageSize: 100,
            current: query.pageIndex
          }}
        />
      </div>
      <FlatManageDetail
        visible={detailVisible}
        onCancel={handleDetailCancel}
        onOk={handleDetailOk}
        viewType={detailViewType}
        data={detailData}
      />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  position: relative;
  padding-top: 65px;
  height: 100%;
  width: 100%;

  div.topbar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 10px 15px;
    box-sizing: border-box;
    padding-top: 18px;
    height: 60px;
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
      :last-of-type {
        margin-right: 0;
      }
      &.title {
        font-size: 20px;
        color: #000;
        font-weight: bold;
        margin-left: 5px;
      }
      &.link {
        margin-right: 50px;
      }
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
    td {
      position: relative;
      &.align-left {
        padding-left: 15px !important;
      }
      div.elips {
        position: absolute;
        left: 15px;
        right: 15px;
        line-height: 30px;
        top: 0;
        bottom: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }

  .status1{
    // background: rgba(0, 153, 255, 1);
    // color: #fff;
    cursor: pointer;
    color: rgba(0, 153, 255, 1);
  }
  .status2{
    // background: rgba(102, 204, 153, 1);
    cursor: pointer;
    color: rgba(102, 204, 153, 1);
  }
`
