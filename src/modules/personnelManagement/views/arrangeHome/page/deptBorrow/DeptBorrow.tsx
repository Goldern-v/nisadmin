import React, { useState, useEffect, Fragment } from 'react'
import styled from 'styled-components'
import { Select, Button, Modal, message as Message } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { authStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import BaseTable from 'src/components/BaseTable'
import EditModal from './components/EditModal'
import ViewOrAuditModal from './components/ViewOrAuditModal'
import DeptBorrowService from './api/DeptBorrowService'
import BreadcrumbBox from 'src/layouts/components/BreadcrumbBox'

const Option = Select.Option

const api = new DeptBorrowService()

export default observer(function DeptBorrow(props: any) {
  const [borrowList, setBorrowList] = useState([] as any)
  const [detailData, setDetailData] = useState({} as any)
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState({
    type: '我科借入',
    status: ''
  })
  const [editVisible, setEditVisible] = useState(false)
  const [editParams, setEditParams] = useState({} as any)

  const [viewOrAuditVisible, setViewOrAuditVisible] = useState(false)

  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      key: 'id',
      width: 50,
      align: 'center',
      render: (text: string, record: any, idx: number) => idx + 1
    },
    {
      title: query.type == '我科借出' ? '借用科室' : '借出科室',
      key: 'deptName',
      className: 'dept-name',
      align: 'left',
      render: (text: string, record: any) => {
        let deptName = query.type == '我科借出' ? record.deptNameTransferFrom : record.deptNameTransferTo

        return <div title={deptName}>{deptName}</div>
      }
    },
    {
      title: '借用人数',
      key: 'numTransferFrom',
      dataIndex: 'numTransferFrom',
      align: 'center',
      width: 80
    },
    {
      title: '开始日期',
      key: 'startDate',
      dataIndex: 'startDate',
      align: 'center',
      width: 100
    },
    {
      title: '结束日期',
      key: 'endDate',
      dataIndex: 'endDate',
      align: 'center',
      width: 100
    },
    {
      title: '借用天数',
      key: 'daysTransferFrom',
      dataIndex: 'daysTransferFrom',
      align: 'center',
      width: 80
    },
    {
      title: '借用护士',
      key: 'schDeptTransferUser',
      dataIndex: 'schDeptTransferUser',
      align: 'center',
      width: 130,
      render: (text: string, record: any) => {
        let list = record.schDeptTransferUser
        let str = ''
        if (list.length > 0) {
          str = list[0].empName
          if (list.length > 1) str += `等共${list.length}人`
        }
        return str
      }
    },
    {
      title: '申请人',
      key: 'empNameTransferFrom',
      dataIndex: 'empNameTransferFrom',
      align: 'center',
      width: 80
    },
    {
      title: '状态',
      key: 'statusTransferFrom',
      dataIndex: 'statusTransferFrom',
      align: 'center',
      width: 80,
      render: (status: string, record: any) => {
        switch (status) {
          case '0':
            return '已申请'
          case '1':
            return '已同意'
          case '2':
            return '已结束'
          case '3':
            return '已拒绝'
          default:
            return ''
        }
      }
    },
    {
      title: '操作',
      key: 'operate',
      dataIndex: 'statusTransferFrom',
      align: 'center',
      width: 120,
      className: 'operate',
      render: (status: string, record: any) => {
        let user = authStore.user
        if (!user) return ''
        if (record.empNoTransferFrom == user.empNo && status == '0') {
          return (
            <Fragment>
              <span onClick={() => openEdit(record)}>修改</span>
              <span onClick={() => handleDelete(record)}>删除</span>
            </Fragment>
          )
        }
        return <span onClick={() => handleReview(record)}>查看</span>
      }
    }
  ]

  useEffect(() => {
    getTableData()
  }, [])

  const rowClassName = (record: any) => {
    switch (record.status) {
      case '申请':
        return 'apply-for'
      case '已通过':
        return 'resolve'
      case '已结束':
        return 'over'
      case '已拒绝':
        return 'refuse'
      default:
        return ''
    }
  }

  const handleSearch = () => {
    getTableData()
  }

  const openEdit = (record: any) => {
    setEditParams(record)
    setEditVisible(true)
  }
  const handleDelete = (record: any) => {
    Modal.confirm({
      title: '提示',
      content: '是否删除?',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      centered: true,
      onOk: () => {
        api.deleteBorrow(record.id).then((res) => {
          if (res.code == 200) {
            Message.success('删除成功')
            getTableData()
          } else {
            Message.error('删除失败')
          }
        })
      }
    })
  }
  const handleReview = (record: any) => {
    setDetailData(record)
    setViewOrAuditVisible(true)
  }

  const handleEditSuccess = () => {
    handleEditCancel()
    getTableData()
  }
  const handleEditCancel = () => {
    setEditVisible(false)
    setEditParams({})
  }

  const handleTypeChange = (type: any) => {
    let newQuery = { ...query, type }

    setQuery(newQuery)
    getTableData(newQuery)
  }

  const handleDetailViewClose = (reload: any) => {
    setViewOrAuditVisible(false)
    if (reload === true) getTableData()
  }

  const getTableData = (_query?: any) => {
    let reqQuery = Object.assign({}, query, _query || {})
    setLoading(true)
    console.log(reqQuery)

    let callback = (res: any) => {
      setBorrowList(res.data || [])
    }

    let deptCode = ''
    if (authStore.user) deptCode = authStore.user.deptCode

    let params = {
      deptCode,
      statusTransferFrom: reqQuery.status
    }

    if (reqQuery.type == '我科借入') api.getBorrowIn(params).then((res) => callback && callback(res))
    else api.getBorrowOut(params).then((res) => callback && callback(res))

    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }

  return (
    <Wrapper>
      <div className='top'>
        <div className='topbar'>
          <BreadcrumbBox
            data={[
              {
                name: '排班管理',
                link: '/personnelManagement/arrangeHome'
              },
              {
                name: '科室借用'
              }
            ]}
          />
          <div className='float-left'>科室借用</div>
          <div className='float-right'>
            <span className='item'>
              <span className='label'>类型：</span>
              <span className='cotent'>
                <Select onChange={handleTypeChange} defaultValue={query.type}>
                  <Option value='我科借出'>我科借出</Option>
                  <Option value='我科借入'>我科借入</Option>
                </Select>
              </span>
            </span>
            <span className='item'>
              <span className='label'>借用状态：</span>
              <span className='cotent'>
                <Select onChange={(status: any) => setQuery({ ...query, status })} defaultValue={query.status}>
                  <Option value=''>全部</Option>
                  <Option value='0'>申请</Option>
                  <Option value='1'>借用中</Option>
                  <Option value='2'>已结束</Option>
                  <Option value='3'>拒绝</Option>
                </Select>
              </span>
            </span>
            <span className='item'>
              <Button type='primary' onClick={handleSearch}>
                查询
              </Button>
            </span>
            <span className='item'>
              <Button onClick={() => setEditVisible(true)}>添加借用申请</Button>
            </span>
          </div>
        </div>
      </div>
      <div className='main'>
        <div className='table-content'>
          <BaseTable
            loading={loading}
            columns={columns}
            dataSource={borrowList}
            rowClassName={rowClassName}
            pagination={false}
            surplusHeight={190}
          />
        </div>
      </div>
      <EditModal visible={editVisible} editParams={editParams} onCancel={handleEditCancel} onOk={handleEditSuccess} />
      <ViewOrAuditModal visible={viewOrAuditVisible} data={detailData} onCancel={handleDetailViewClose} />
    </Wrapper>
  )
})

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 80px;
  background: #fff;

  .top {
    margin-top: -80px;
    // padding: 10px 15px;
    height: 68px;
    .nav {
      margin-bottom: 5px;
    }
    .topbar {
      overflow: hidden;
      .float-left {
        float: left;
        font-size: 20px;
        line-height: 32px;
        font-weight: bold;
        color: #000;
        margin-left: 15px;
      }
      .float-right {
        float: right;
        margin-right: 15px;
        .item {
          margin-left: 10px;
        }
      }
    }
  }

  .main {
    width: 100%;
    height: 100%;
    padding: 10px 0;
    padding-top: 0;
    .table-content {
      height: 100%;
      background: #fff;
      tr {
        &.resolve {
          td {
            color: blue;
          }
        }
        &.over {
          td {
            background: rgba(0, 0, 0, 0.02);
          }
          :hover {
            td {
              background: #cfe6dc;
            }
          }
        }
        &.refuse {
          td {
            color: red;
            background: rgba(0, 0, 0, 0.02);
          }
          :hover {
            td {
              background: #cfe6dc;
            }
          }
        }
      }
      td {
        &.margin-left {
          padding-left: 10px !important;
        }
        &.dept-name {
          position: relative;
          div {
            position: absolute;
            top: 0;
            left: 10px;
            right: 10px;
            height: 30px;
            overflow: hidden;
            line-height: 30px;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
      td.operate {
        span {
          cursor: pointer;
          color: #00a680;
          :hover {
            font-weight: bold;
          }
        }
        span:first-of-type {
          margin-right: 5px;
        }
        span:last-of-type {
          margin-right: 0;
        }
      }
    }
  }
`
