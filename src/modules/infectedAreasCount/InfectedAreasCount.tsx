import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Select, Modal, Checkbox, DatePicker, Input } from 'antd'
import { PageTitle } from 'src/components/common'
import BaseTable, { TabledCon, DoCon, TableHeadCon } from 'src/components/BaseTable'
import { ColumnProps } from 'src/vendors/antd'
import moment from 'moment'
import { appStore, authStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import qs from 'qs'
import { fileDownload } from 'src/utils/file/file'
import { infectedAreasCountService } from './api/InfectedAreasCountService'

const RangePicker = DatePicker.RangePicker
const Option = Select.Option

export default observer(function InfectedAreasCount() {
  const [query, setQuery] = useState({
    pageIndex: appStore.queryObj.pageIndex ? Number(appStore.queryObj.pageIndex) : 1,
    empName: appStore.queryObj.empName || '',
    companyName: appStore.queryObj.companyName || '',
    startDate: appStore.queryObj.startDate || moment().subtract(1, 'days').format('YYYY-MM-DD'),
    endDate: appStore.queryObj.endDate || moment().format('YYYY-MM-DD'),
    pageSize: appStore.queryObj.pageSize ? Number(appStore.queryObj.pageSize) : 15,
  })

  const [tableData, setTableData] = useState([] as any)
  const [dataTotal, setDataTotal] = useState(0)
  const [companyList, setCompanyList] = useState([] as any)
  const [loading, setLoading] = useState(false)

  const columns: ColumnProps<any>[] = [
    {
      key: 'index',
      title: '序号',
      width: 80,
      align: 'center',
      render: (text: string, record: any, idx: number) =>
        (query.pageIndex - 1) * query.pageSize + idx + 1
    },
    {
      dataIndex: 'companyName',
      title: '医疗队名称',
      align: 'center',
    },
    {
      dataIndex: 'empSize',
      title: '医护人数',
      align: 'center',
      width: 90,
    },
    {
      dataIndex: 'empTotalSize',
      title: '总人次',
      align: 'center',
      width: 90,
    },
    {
      dataIndex: 'totalSize',
      title: '总时长',
      align: 'center',
      width: 90,
    },
    {
      dataIndex: 'avgSize',
      title: '平均时长',
      align: 'center',
      width: 90,
    },
    {
      dataIndex: 'maxSize',
      title: '最大时长',
      align: 'center',
      width: 90,
    },
    {
      dataIndex: 'minSize',
      title: '最小时长',
      align: 'center',
      width: 90,
    },
    {
      dataIndex: 'noUseSize',
      title: '无效出入记录数',
      align: 'center',
      width: 90,
    },
    {
      key: 'operate',
      title: '操作',
      align: 'center',
      width: 90,
      render: (text: string, record: any) => {
        return <DoCon className="operate-group">
          <span onClick={() => handleDetail(record)}>查看</span>
        </DoCon>
      }
    },
  ]

  const handleDetail = (record: any) => {
    appStore
      .history
      .push(`/InfectedAreasCountDetail?companyName=${record.companyName}`)
  }

  const handleSearch = () => {
    setQuery({ ...query, pageIndex: 1 })
  }

  const handleExport = () => {
    setLoading(true)
    infectedAreasCountService
      .countExport()
      .then((res) => {
        setLoading(false)
        fileDownload(res)
      }, () => setLoading(false))
  }

  const getTableData = (query: any) => {
    setLoading(true)
    // console.log(query)
    appStore.history.replace(`${appStore.location.pathname}?${qs.stringify(query)}`)

    infectedAreasCountService.getCount(query).then(res => {
      setLoading(false)
      if (res.data) {
        setTableData(res.data)
        // setDataTotal(res.data.totalCount)
      }
    }, () => setLoading(false))
  }

  // const handlePageChange = (current: number) => {
  //   setQuery({ ...query, pageIndex: current })
  // }

  // const handleSizeChange = (current: number, size: number) => {
  //   setQuery({ ...query, pageSize: size, pageIndex: 1 })
  // }

  const getCompanyList = () => {
    infectedAreasCountService
      .getCompanyList()
      .then((res: any) => {
        if (res.data) setCompanyList(res.data)
      })
  }

  let companyTotal = 0
  let empSizeTotal = 0
  let empTotalSizeTotal = 0
  let totalSizeTotal = 0
  let avgSizeTotal = 0
  let maxSizeTotal = 0
  let minSizeTotal = 0
  let noUseSizeTotal = 0

  for (let i = 0; i < tableData.length; i++) {
    let item = tableData[i]
    companyTotal++
    if (item.empSize && !isNaN(Number(item.empSize)))
      empSizeTotal += Number(item.empSize)

    if (item.empTotalSize && !isNaN(Number(item.empTotalSize)))
      empTotalSizeTotal += Number(item.empTotalSize)

    if (item.totalSize && !isNaN(Number(item.totalSize)))
      totalSizeTotal += Number(item.totalSize)

    if (item.avgSize && !isNaN(Number(item.avgSize)))
      avgSizeTotal += Number(item.avgSize)


    if (item.maxSize && !isNaN(Number(item.maxSize)))
      maxSizeTotal += Number(item.maxSize)


    if (item.minSize && !isNaN(Number(item.minSize)))
      minSizeTotal += Number(item.minSize)

    if (item.noUseSize && !isNaN(Number(item.noUseSize)))
      noUseSizeTotal += Number(item.noUseSize)
  }

  empSizeTotal = parseInt((empSizeTotal * 100).toString()) / 100
  totalSizeTotal = parseInt((totalSizeTotal * 100).toString()) / 100
  avgSizeTotal = parseInt((avgSizeTotal * 100).toString()) / 100
  maxSizeTotal = parseInt((maxSizeTotal * 100).toString()) / 100
  minSizeTotal = parseInt((minSizeTotal * 100).toString()) / 100
  noUseSizeTotal = parseInt((avgSizeTotal * 100).toString()) / 100
  avgSizeTotal = parseInt((avgSizeTotal * 100).toString()) / 100
  avgSizeTotal = parseInt((avgSizeTotal * 100).toString()) / 100

  useEffect(() => {
    getTableData(query)
  }, [query])

  useEffect(() => {
    getCompanyList()
  }, [])


  return <Wrapper>
    <HeaderCon>
      <LeftIcon>
        {/* <PageTitle></PageTitle> */}
      </LeftIcon>
      <RightIcon>
        <span>日期:</span>
        <RangePicker
          allowClear={false}
          style={{ width: '210px' }}
          format={'YYYY-MM-DD'} value={[
            moment(query.startDate),
            moment(query.endDate)
          ]}
          onChange={(moments: any) => setQuery({
            ...query,
            pageIndex: 1,
            startDate: moments[0]?.format('YYYY-MM-DD'),
            endDate: moments[1]?.format('YYYY-MM-DD'),
          })} />
        <span>医疗队:</span>
        <Select
          value={query.companyName}
          onChange={(companyName: string) => setQuery({ ...query, companyName, pageIndex: 1 })}
          style={{ width: '150px' }}>
          <Option value="">全部</Option>
          {companyList.map((item: any, idx: number) =>
            <Option value={item.companyName} key={idx}>{item.companyName}</Option>)}
        </Select>
        <span>搜索:</span>
        <Input
          style={{ width: '160px' }}
          defaultValue={query.empName}
          placeholder="请输入姓名"
          allowClear
          onBlur={(e: any) => setQuery({ ...query, empName: e.target.value, pageIndex: 1 })} />
        <Button onClick={handleSearch} type="primary">查询</Button>
        <Button onClick={handleExport}>导出</Button>
      </RightIcon>
    </HeaderCon>
    <TableWrapper>
      <div className="base-info">
        <span className="label">医疗队数量: </span>
        <span className="content">{companyTotal}</span>
        <span className="label">医护人数: </span>
        <span className="content">{empSizeTotal}</span>
        <span className="label">总人数:</span>
        <span className="content">{empTotalSizeTotal}</span>
        <span className="label">总时长: </span>
        <span className="content">{totalSizeTotal}</span>
        <span className="label">平均时长: </span>
        <span className="content">{avgSizeTotal}</span>
        <span className="label">最大时长: </span>
        <span className="content">{maxSizeTotal}</span>
        <span className="label">最小时长: </span>
        <span className="content">{minSizeTotal}</span>
        <span className="label">无效记录: </span>
        <span className="content">{noUseSizeTotal}</span>
      </div>
      <div className="notice">
        <span style={{ color: 'red' }}>注: </span>
        <span style={{ fontSize: '12px' }}>无效数据：①进出间隔时间超过10小时的记录；②只有进或者只有出的记录；</span>
      </div>
      <BaseTable
        onRow={record => {
          return {
            onDoubleClick: () => handleDetail(record),
          };
        }}
        surplusHeight={225}
        dataSource={tableData}
        loading={loading}
        columns={columns}
      // pagination={{
      //   pageSizeOptions: ['10', '15', '20'],
      //   current: query.pageIndex,
      //   pageSize: query.pageSize,
      //   total: dataTotal,
      //   onChange: handlePageChange,
      //   onShowSizeChange: handleSizeChange
      // }}
      />
    </TableWrapper>
  </Wrapper>

})

const Wrapper = styled.div`
  .operate-group{
    .delete{
      color: red;
    }
  }
`

const TableWrapper = styled(TabledCon)`
  position: relative;
  td{
    word-break: break-all;
  }
  .base-info{
    padding: 15px;
    padding-bottom: 0;
    color: #000;
    .content{
      margin-right: 15px;
      vertical-align: middle;
    }
    .label{
      font-size: 12px;
      font-weight: bold;
      vertical-align: middle;
      position: relative;
      top: -1px;
    }
  }
  .notice{
    position: absolute;
    left: 15px;
    bottom: 15px;
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
  .month-select{
    width: 70px;
  }
  .year-select{
    width: 100px;
    display:inline-block;
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
const ExportCon = styled.div`
  &>div{
    margin-top: 15px;
  }
`