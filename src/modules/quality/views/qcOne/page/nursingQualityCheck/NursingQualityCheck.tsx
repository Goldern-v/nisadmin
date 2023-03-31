import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, DatePicker, Modal, Select, Popover, Checkbox, Tooltip } from 'antd'
import { PageTitle } from 'src/components/common'
import BaseTable, { TabledCon, DoCon, TableHeadCon } from 'src/components/BaseTable'
import { ColumnProps, Spin, message } from 'src/vendors/antd'
import DeptSelect from 'src/components/DeptSelect'
import { getCurrentMonth, getCurrentMonthNow } from 'src/utils/date/currentMonth'

import moment from 'moment'
import qs from 'qs'

import { qcOneSelectViewModal } from '../../QcOneSelectViewModal'

import service from 'src/services/api'
const commonApi = service.commonApiService

const Option = Select.Option
// console.log(commonApi)

import { nursingQualityCheckService } from './api/NursingQualityCheckService'

import { appStore, authStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { useKeepAliveEffect } from 'react-keep-alive'

export interface Props { }

const RangePicker = DatePicker.RangePicker

export default observer(function NursingQualityCheck() {
  const { history } = appStore
  const { isNotANormalNurse } = authStore
  const auth = authStore.isRoleManage

  const [tableData, setTableData] = useState([] as any)
  const [nurseList, setNurseList] = useState([] as any)
  const [rangeList, setRngeList] = useState([] as any)
  const [loading, setLoading] = useState(false)

  let defaultEmpNo = isNotANormalNurse ? '' : authStore.user && authStore.user.empNo

  const [query, setQuery] = useState({
    wardCode: '',
    empNo: defaultEmpNo,
    pageIndex: 1,
    pageSize: 50,
    range: '',
    // startDate: qcOneSelectViewModal.startDate,
    // endDate: qcOneSelectViewModal.endDate,
    startDate: getCurrentMonthNow()[0].format('YYYY-MM-DD') as string,
    endDate: getCurrentMonthNow()[1].format('YYYY-MM-DD') as string,
  })

  const columns: ColumnProps<any>[] = [
    {
      dataIndex: 'wardName',
      title: '科室',
      width: 160,
    },
    {
      dataIndex: 'recordDate',
      title: '日期',
      align: 'center',
      width: 100,
    },
    {
      dataIndex: 'range',
      title: '班次',
      width: 80,
      align: 'center',
    },
    {
      dataIndex: 'empName',
      title: '护士姓名',
      width: 80,
      align: 'center',
    },
    {
      dataIndex: 'content',
      title: '质控内容',
      width: 120,
      align: 'center',
      render: (text: string, record: any, idx: number) =>
        <div className="ellips" title={text}>{text}</div>
    },
    {
      dataIndex: 'result',
      title: '质控结果',
      align: 'center',
      width: 80,
      render: (text: string, record: any, idx: number) => {
        if (text == '有问题') return <span style={{ color: 'red' }}>{text}</span>
        return <span>{text}</span>
      }
    },
    {
      dataIndex: 'description',
      title: '质控详情',
      width: 230,
      align: 'left',
    },
    {
      dataIndex: 'rectification',
      title: '整改情况',
      width: 200,
      align: 'left',
    },
    {
      dataIndex: 'deductScore',
      title: '星级扣分',
      align: 'center',
      width: 60,
      render: (text: string, record: any, idx: number) => {
        if (text == '0') return <span>{text}</span>
        return <span style={{ color: 'red' }}>{`-${text}`}</span>
      }
    },
    {
      dataIndex: 'type',
      title: '质控类别',
      width: 120,
      align: 'center',
    },
    {
      dataIndex: 'creatorName',
      title: '创建人',
      align: 'center',
      width: 80,
    },
    {
      dataIndex: 'createTime',
      title: '创建时间',
      align: 'center',
      width: 120,
    },
    {
      key: 'operate',
      title: '操作',
      fixed: 'right',
      width: 150,
      render: (text: string, record: any, idx: number) => {
        const title = <div>
          <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{record.empName}的星级考核</span>
          {/* <span style={{ marginLeft: '15px', color: '#999' }}>选中一个扣1分</span> */}
        </div>

        let content = <Spin>
          <div style={{ width: '180px', height: '130px' }}></div>
        </Spin>

        if (record.checkItemList) content =
          <div
            style={{
              height: '100px',
              color: '#999',
              textAlign: 'center',
              lineHeight: '100px'
            }}>
            无考核项目
          </div>

        if (record.checkItemList && record.checkItemList.length > 0) content = record.checkItemList
          .map((item: any, itemIdx: number) =>
            <PopItemCon key={`pop-${itemIdx}`}>
              <Checkbox checked={item.checked} >
                <span className="pop-item-content">
                  {`${itemIdx + 1}.${item.itemName}`}
                  <span style={{ color: '#999' }}>{`(${item.deductScore || '0'}分)`}</span>
                </span>
              </Checkbox>
            </PopItemCon>
          )

        return <DoCon>
          <Popover
            placement='right'
            trigger='click'
            title={title}
            content={content}>
            <span onClick={() => handleLoadDetail(record, idx)}>查看星级考核</span>
          </Popover>
          {auth && <span onClick={() => handleEdit(record)}>编辑</span>}
          {auth && <span style={{ color: 'red' }} onClick={() => handleDelete(record)}>删除</span>}
        </DoCon>
      }
    }
  ]

  const handleLoadDetail = (record: any, idx: number) => {
    if (!record.checkItemList)
      nursingQualityCheckService
        .getDetail(record.id)
        .then(res => {
          if (res.data.checkItemList) {
            let newTableData = [...tableData]
            newTableData[idx].checkItemList = res.data.checkItemList
            setTableData(newTableData)
          }
        })
  }

  const [dataTotal, setDataTotal] = useState(0)

  const handlePageChange = (current: number) => {
    setQuery({ ...query, pageIndex: current })
  }

  const handleSizeChange = (current: number, size: number) => {
    setQuery({ ...query, pageSize: size, pageIndex: 1 })
  }

  const handleSearch = () => {
    setQuery({ ...query, pageIndex: 1 })
  }

  const getList = (query: any) => {
    setLoading(true)

    nursingQualityCheckService
      .getPage(query)
      .then((res: any) => {
        setLoading(false)
        // console.log(res)
        if (res.data && res.data.list) {
          setTableData(res.data.list)
          setDataTotal(res.data.totalCount)
        }
      }, () => setLoading(false))
  }

  const handleWardCodeChange = (wardCode: string) => {
    commonApi
      .userDictInfo(wardCode)
      .then(res => {
        // console.log(res)
        if (res.data && res.data instanceof Array) {
          setNurseList(res.data.map((item: any) => {
            return {
              empName: item.name,
              empNo: item.code
            }
          }))
        }
      })

    nursingQualityCheckService
      .getRangeByDeptCode(wardCode)
      .then(res => {
        if (res.data) {
          let newRangeList = [] as any[]
          for (let i = 0; i < res.data.length; i++) {
            let item = res.data[i]

            let target = newRangeList.find((item1: any) => item1.name == item.name)
            if (!target) newRangeList.push(item)
          }
          setRngeList(newRangeList)
        }
      })

    setQuery({ ...query, wardCode, empNo: defaultEmpNo, range: '', pageIndex: 1 })
  }

  const handleCreate = () => {
    let createDate = moment()
    Modal.confirm({
      centered: true,
      title: '新建病区护理质量检查记录',
      content: <CreateWrapper>
        <span className="label">请选择检查日期:</span>
        <span style={{
          display: 'inline-block'
        }}>
          <DatePicker
            allowClear={false}
            format="YYYY-MM-DD"
            defaultValue={createDate}
            onChange={(newDate) => createDate = newDate} />
        </span>
      </CreateWrapper>,
      onOk: () => {
        history.push(`/nursingQualityCheckEdit?date=${createDate.format('YYYY-MM-DD')}`)
      }
    })
  }

  const handleEdit = (record: any) => {
    let query = {
      date: moment(record.recordDate).format('YYYY-MM-DD'),
      type: 'edit',
      id: record.id
    }
    history.push(`/nursingQualityCheckEdit?${qs.stringify(query)}`)
  }

  const handleDelete = (record: any) => {
    if (record.id) Modal.confirm({
      title: '提示',
      content: '是否删除该记录?',
      centered: true,
      onOk: () => {
        setLoading(true)
        nursingQualityCheckService
          .delete(record.id).
          then(res => {
            setLoading(false)
            message.success('删除成功')
            getList(query)
          }, () => setLoading(false))
      }
    })
  }

  // useEffect(() => {
  //   if (
  //     query.wardCode &&
  //     qcOneSelectViewModal.startDate &&
  //     qcOneSelectViewModal.endDate
  //   ) {
  //     setQuery({
  //       ...query,
  //       startDate: qcOneSelectViewModal.startDate,
  //       endDate: qcOneSelectViewModal.endDate,
  //       pageIndex: 1
  //     })
  //   }

  // }, [qcOneSelectViewModal.startDate, qcOneSelectViewModal.endDate])
  const getDateOptions = () => {
    return {
      value: [moment(query.startDate), moment(query.endDate)] as [moment.Moment, moment.Moment],
      onChange: (date: any[]) => {
        let newQuery = { ...query }
        newQuery.startDate = date[0] ? moment(date[0]).format('YYYY-MM-DD') : ''
        newQuery.endDate = date[1] ? moment(date[1]).format('YYYY-MM-DD') : ''
        setQuery(newQuery)
      }
    }
  }

  useEffect(() => {
    if (query.wardCode && query.endDate && query.startDate) getList(query)
  }, [query])

  useKeepAliveEffect(() => {
    if ((appStore.history && appStore.history.action) === 'POP') {
      if (query.wardCode && query.endDate && query.startDate) getList(query)
    }
    return () => { }
  })

  const formatTableData = () => {
    let classList = ['while', 'gray']
    let idx = 0
    let currentDate = ''

    let viewList = tableData.map((item: any) => {
      if (!currentDate) currentDate = item.recordDate

      if (currentDate !== item.recordDate) {
        idx = idx ? 0 : 1
        currentDate = item.recordDate
      }
      return {
        ...item,
        rowClass: classList[idx]
      }
    })

    return viewList
  }

  return <Wrapper>
    <HeaderCon>
      <LeftIcon>
        <PageTitle className="page-title">病区质量检查</PageTitle>
      </LeftIcon>
      <RightIcon>
        <span>日期:</span>
        <RangePicker
          style={{ width: 220 }}
          {...getDateOptions()}
          allowClear={false} />
        <span>科室:</span>
        <DeptSelect onChange={handleWardCodeChange} />
        <span>护士:</span>
        {isNotANormalNurse && <Select
          style={{ width: '120px' }}
          showSearch
          filterOption={(input: string, option: any) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          onChange={(empNo: string) => setQuery({ ...query, empNo })}
          value={query.empNo || ''}>
          <Option value={''} style={{ display: isNotANormalNurse ? 'block' : 'none' }}>全部</Option>
          {nurseList.map((item: any, idx: number) =>
            <Option key={idx} value={item.empNo} style={{ display: isNotANormalNurse ? 'block' : 'none' }}>{item.empName}</Option>
          )}
        </Select>}
        {!isNotANormalNurse && <Select
          style={{ width: '120px' }}
          showSearch
          filterOption={(input: string, option: any) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          onChange={(empNo: string) => setQuery({ ...query, empNo })}
          value={query.empNo || ''}>
          <Option value={defaultEmpNo || ''} style={{ display: !isNotANormalNurse ? 'block' : 'none' }}>{authStore.user && authStore.user.empName}</Option>
        </Select>}
        <span>班次:</span>
        <Select
          style={{ width: '120px' }}
          showSearch
          filterOption={(input: string, option: any) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          onChange={(range: string) => setQuery({ ...query, range })}
          value={query.range}>
          <Option value={''}>全部</Option>
          {rangeList.map((item: any, idx: number) =>
            <Option key={idx} value={item.name}>{item.name}</Option>
          )}
        </Select>
        <Button onClick={handleSearch} type="primary">查询</Button>
        {auth && <React.Fragment>
          <Button type="primary" onClick={handleCreate}>添加</Button>
          <Tooltip title="质控内容设置">
            <Button onClick={() => history.push('/qcCheckContentSetting')}>设置</Button>
          </Tooltip>
        </React.Fragment>}
        {/* <Button>导出</Button> */}
      </RightIcon>
    </HeaderCon>
    <TableWrapper>
      <BaseTable
        rowClassName={(record: any, index: number) => record.rowClass}
        type={['index', 'fixedIndex']}
        loading={loading}
        surplusHeight={225}
        surplusWidth={200}
        dataSource={formatTableData()}
        pagination={{
          current: query.pageIndex,
          pageSize: query.pageSize,
          total: dataTotal,
          onChange: handlePageChange,
          onShowSizeChange: handleSizeChange
        }}
        columns={columns}
      />
    </TableWrapper>
  </Wrapper>
})

const PopItemCon = styled.div`
  margin-bottom: 5px;
  label>span{
    vertical-align: top;
  }
  .ant-checkbox{
    position: relative;
    top: 3px;
  }
  .pop-item-content{
    display:inline-block;
    max-width: 350px;
    word-break: break-all;
  }
`

const CreateWrapper = styled.div`
  margin-top: 15px;
  .label{
    margin-right: 10px;
  }
`

const TableWrapper = styled(TabledCon)`
td{
  word-break: break-all;
}
.ant-table-row{
  &.white{}
  &.gray{
    background: #eee;
  }
}
`

const HeaderCon = styled(TableHeadCon)`
  justify-content: space-between;
  .ant-select {
    width: 150px;
    margin-right: 20px;
  }
  .ant-calendar-picker {
    margin-right: 20px;
  }
  button {
    margin-left: 10px;
  }
  .checkButton {
    margin-left: 0px;
}

`
const Wrapper = styled.div`
  .page-title{
    @media (max-width: 1465px) {
      display: none;
    }
  }
`

const LeftIcon = styled.div`
  height: 55px;
  font-size: 13px;
  position: relative;
  font-size: 13px;
  color: #333333;
  /* padding: 0 0 0 15px; */
  display: flex;
  align-items: center;
`

const RightIcon = styled.div`
  height: 55px;
  font-size: 13px;
  position: relative;
  font-size: 13px;
  color: #333333;
  padding: 0 0 0 15px;
  display: flex;
  align-items: center;
`