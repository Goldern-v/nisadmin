import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Modal, message as Message, Select, DatePicker } from 'antd'
import { Link } from 'react-router-dom'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { ColumnProps } from 'antd/lib/table'
import DeptSelect from 'src/components/DeptSelect'
import FlatManageProblemEdit from './../components/FlatManageProblemEdit'

import FlatManageDetail from '../components/FlatManageDetail'
import { authStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import moment from 'moment'
import { flatManageProblemService } from './../api/FlatManageProblemService'

const Option = Select.Option

export default observer(function FlatManageProblemList() {
  const [tableData, setTableData] = useState([] as any)
  const [dataTotal, setDataTotal] = useState(0 as number)
  const [typeList, setTypeList] = useState([] as any)
  const [selectedKey, setSelectedKey] = useState([] as any)
  //详情弹窗参数
  const [detailCfg, setDetailCfg] = useState({
    visible: false,
    viewType: 'detail',
    data: {} as any
  })
  //修改弹窗参数
  const [editCfg, setEditCfg] = useState({
    visible: false,
    params: {} as any
  })
  //设置默认时间范围为本月
  const defaultStartDate: any = new Date()
  defaultStartDate.setDate(1)

  const defaultEndDate: any = new Date()
  defaultEndDate.setMonth(defaultEndDate.getMonth() + 1)
  defaultEndDate.setDate(0)

  const [query, setQuery] = useState({
    deptCode: authStore.selectedDeptCode,
    checkDateStart: moment(defaultStartDate).format('YYYY-MM-DD'),
    checkDateEnd: moment(defaultEndDate).format('YYYY-MM-DD'),
    typeId: '',
    pageSize: 15,
    pageIndex: 1,
    status
  } as any)

  useEffect(() => {
    if (query.deptCode) getTableData()
  }, [query])

  const [tableLoading, setTableLoading] = useState(false)

  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      dataIndex: 'key',
      key: 'key',
      width: 30,
      align: 'center',
      render: (text: string, record: any, index: number) => index + 1
    },
    {
      title: '检查日期',
      dataIndex: 'checkDate',
      align: 'center',
      width: 90
    },
    {
      title: '科室',
      dataIndex: 'wardName',
      align: 'left',
      width: 130
    },
    {
      title: '检查者',
      dataIndex: 'inspectorName',
      align: 'center',
      width: 80
    },
    {
      title: '责任人',
      dataIndex: 'responsibleEmpName',
      align: 'center',
      width: 80
    },
    {
      title: '类型',
      dataIndex: 'typeName',
      align: 'left',
      width: 90
    },
    {
      title: '存在问题',
      dataIndex: 'problem',
      align: 'left'
    },
    {
      title: '原因分析',
      dataIndex: 'causeAnalysis',
      align: 'left'
    },
    {
      title: '整改措施',
      dataIndex: 'measures',
      align: 'left'
    },
    {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      width: 60,
      render: (status: string, record: any) => {
        if (status == '2') return <span className='status2'>已审核</span>
        if (status == '1') return <span className='status1'>待审核</span>
        return '-'
      }
    },
    {
      title: '操作',
      key: 'opetation',
      align: 'center',
      width: 80,
      render: (text: string, record: any) => {
        //护长
        let postAuth = !!(authStore.post == '护长') as boolean
        //作者
        let autherAuth = !!(record.inspectorEmpNo == (authStore.getUser() && authStore.getUser().empNo)) as boolean
        //审核权限
        let auditAuth = !!(postAuth && record.status == '1') as boolean
        //编辑权限
        let editAuth = !!(autherAuth && record.status == '1') as boolean
        //删除权限
        let deleteAuth = !!(autherAuth && record.status == '1') as boolean

        return (
          <div className='operation'>
            <span onClick={() => handleDetailView(record, 'detail')}>查看</span>
            {/* 护长可审核 */}
            <span
              className={auditAuth ? '' : 'disabled'}
              onClick={() => {
                if (auditAuth) handleDetailView(record, 'audit')
              }}
            >
              审核
            </span>
            {/* 未审核状态护长或创建人可修改 */}
            <br />
            <span
              className={editAuth ? '' : 'disabled'}
              onClick={() => {
                if (editAuth) handleEdit(record)
              }}
            >
              修改
            </span>
            <span
              className={deleteAuth ? '' : 'disabled'}
              onClick={() => {
                if (deleteAuth) handleDelete(record)
              }}
            >
              删除
            </span>
          </div>
        )
      }
    }
  ]

  const handleDetailCancel = () => {
    setDetailCfg({ ...detailCfg, visible: false })
  }

  const handleDetailView = (record: any, detailViewType?: string) => {
    if (!detailViewType) {
      detailViewType = 'detail'
      //护长
      let postAuth = !!(authStore.post == '护长') as boolean
      //审核权限
      let auditAuth = !!(postAuth && record.status == '1') as boolean
      if (auditAuth) detailViewType = 'audit'
    }

    setDetailCfg({
      ...detailCfg,
      data: record,
      viewType: detailViewType,
      visible: true
    })
  }

  const handleDetailOk = () => {
    getTableData()
    handleDetailCancel()
  }

  const getTableData = () => {
    setTableLoading(true)

    flatManageProblemService.getList({ ...query }).then(
      (res) => {
        setTableLoading(false)
        if (res.data) {
          setSelectedKey([])
          setTableData(res.data.list)
          setDataTotal(res.data.totalCount)
        }
      },
      (err) => {
        setTableLoading(false)
      }
    )
  }

  const createNew = () => {
    if (!query.typeId) {
      Message.warning('未选择管理类型')
      return
    }
    setEditCfg({
      ...editCfg,
      visible: true,
      params: {
        id: '',
        typeId: query.typeId,
        wardCode: query.deptCode,
        deduction: '',
        problem: '',
        measures: '',
        causeAnalysis: '',
        responsibleEmpNo: '',
        checkDate: moment().format('YYYY-MM-DD')
      }
    })
  }

  const handleEdit = (record: any) => {
    let params = {
      id: record.id,
      checkDate: record.checkDate,
      measures: record.measures,
      problem: record.problem,
      typeId: record.typeId,
      wardCode: record.wardCode,
      responsibleEmpNo: record.responsibleEmpNo,
      causeAnalysis: record.causeAnalysis,
      deduction: record.deduction
    }

    setEditCfg({
      ...editCfg,
      visible: true,
      params: params
    })
  }

  const handleDelete = (record: any) => {
    Modal.confirm({
      title: '删除确认',
      content: '您确认要删除问题吗？删除后不可恢复。',
      onOk: () => {
        flatManageProblemService.delete(record.id).then((res) => {
          Message.success('删除成功')
          getTableData()
        })
      }
    })
  }

  const handleEditCancel = () => {
    setEditCfg({ ...editCfg, visible: false })
  }

  const handleEditOk = () => {
    handleEditCancel()
    getTableData()
  }

  const handleDeptChange = (deptCode: string) => {
    setQuery({ ...query, deptCode, pageIndex: 1, typeId: '' })
    flatManageProblemService.getTypeList({ deptCode }).then((res) => {
      if (res.data) {
        setTypeList(res.data)
      }
    })
  }

  const rowSelection = {
    columnWidth: 40,
    selectedRowKeys: selectedKey,
    onChange: (a: any, b: any) => {
      setSelectedKey(a)
    }
  }

  const handleAudit = () => {
    let auditRows = tableData.filter((item: any) => {
      if (selectedKey.indexOf(item.id) >= 0 && item.status == 1) return true

      return false
    })

    if (auditRows.length <= 0) {
      Message.warning('未勾选待审核问题')
      return
    }

    let ids = auditRows.map((item: any) => item.id).join(',');

    let remark = '';

    let auditContent = <div>
      <div>您确认要审核通过吗？通过后数据将不能再修改。</div>
      {/* <br />
      <div>
        <span>备注：</span>
        <Input
          style={{ width: '260px' }}
          defaultValue={remark}
          onChange={(e: any) => remark = e.target.value} />
      </div> */}
    </div>

    Modal.confirm({
      content: auditContent,
      title: '审核确认',
      centered: true,
      onOk: () => {
        setTableLoading(true)
        flatManageProblemService.batchAudit(ids, remark).then(res => {
          setTableLoading(false)
          Message.success('审核成功')
        }, err => {
          setTableLoading(false)
        })
      }
    })
  }

  return (
    <Wrapper>
      <div className='topbar'>
        {/* <div className='float-left'>
          <div className='item title'>扁平管理汇总</div>
        </div> */}
        <div className='float-left'>
          <div className='item'>
            <div className='label'>科室：</div>
            <div className='content'>
              <div className='dept-select'>
                <DeptSelect onChange={(deptCode) => handleDeptChange(deptCode)} />
              </div>
            </div>
          </div>
          <div className='item'>
            <div className='label'>检查日期：</div>
            <div className='content'>
              <DatePicker
                style={{ width: 110 }}
                allowClear={false}
                value={moment(query.checkDateStart)}
                onChange={(value: any) =>
                  setQuery({ ...query, checkDateStart: value.format('YYYY-MM-DD'), pageIndex: 1 })
                }
              />
              <span> - </span>
              <DatePicker
                style={{ width: 110 }}
                allowClear={false}
                value={moment(query.checkDateEnd)}
                onChange={(value: any) =>
                  setQuery({ ...query, checkDateEnd: value.format('YYYY-MM-DD'), pageIndex: 1 })
                }
              />
            </div>
          </div>
          <div className='item'>
            <div className='label'>管理类型：</div>
            <div className='content'>
              <Select
                style={{ width: 120 }}
                value={query.typeId}
                onChange={(value: any) => setQuery({ ...query, typeId: value, pageIndex: 1 })}
              >
                <Option value={''}>全部</Option>
                {typeList.map((item: any) => (
                  <Option value={item.id} key={item.id}>
                    {item.manageType}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
          <div className='item'>
            <div className='label'>审核状态：</div>
            <div className='content'>
              <Select
                style={{ width: 90 }}
                value={query.status}
                onChange={(value: any) => setQuery({ ...query, status: value, pageIndex: 1 })}
              >
                <Option value={''}>全部</Option>
                <Option value={'1'}>待审核</Option>
                <Option value={'2'}>已审核</Option>
              </Select>
            </div>
          </div>
          <div className='item'>
            <Button onClick={() => getTableData()}>查询</Button>
          </div>
          <div className='item'>
            <Button onClick={createNew}>新建</Button>
          </div>
        </div>
      </div>
      <div className='main-contain'>
        <BaseTable
          columns={columns}
          rowKey='id'
          // rowSelection={rowSelection}
          dataSource={tableData}
          loading={tableLoading}
          surplusHeight={235}
          onRow={(record) => {
            return {
              onDoubleClick: (e: any) => handleDetailView(record)
            }
          }}
          pagination={{
            onChange: (pageIndex, pageSize) => setQuery({ ...query, pageIndex }),
            total: dataTotal,
            showSizeChanger: false,
            showQuickJumper: true,
            pageSize: query.pageSize,
            current: query.pageIndex
          }}
        />
        {/* <div className="table-btn-group">
          <Button onClick={handleAudit} disabled={authStore.post !== '护长'}>批量审核</Button>
        </div> */}
      </div>
      <FlatManageDetail
        visible={detailCfg.visible}
        onCancel={handleDetailCancel}
        onOk={handleDetailOk}
        viewType={detailCfg.viewType}
        data={detailCfg.data}
      />
      <FlatManageProblemEdit
        visible={editCfg.visible}
        params={editCfg.params}
        onCancel={handleEditCancel}
        onOk={handleEditOk}
      />
    </Wrapper>
  )
})

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
      margin-right: 4px;
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
        .dept-select {
          .ant-select {
            width: 160px !important;
          }
        }
        .ant-calendar-picker {
          width: 120px;
        }
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
    position: relative;
    td {
      position: relative;
      word-break: break-all;
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
      .operation {
        span {
          color: #00a680;
          cursor: pointer;
          margin: 1px 0;
          display: inline-block;
          :hover {
            font-weight: bold;
          }
          &.disabled {
            color: #aaa;
            cursor: default;
            :hover {
              font-weight: normal;
            }
          }
          &:nth-of-type(2n-1) {
            margin-right: 5px;
          }
        }
      }
    }
    .table-btn-group{
      position: absolute;
      bottom: 24px;
      height: 30px;
      display: inline-block;
      left: 20px;
      &>*{
        margin-left: 12px;
      }
    }
  }
  .status1 {
    /* // color: rgba(0, 153, 255, 1); */
  }
  .status2 {
    /* // color: rgba(102, 204, 153, 1); */
  }
`
