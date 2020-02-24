import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Select, Modal, Radio, DatePicker, Input } from 'antd'
import { PageTitle } from 'src/components/common'
import BaseTable, { TabledCon, DoCon, TableHeadCon } from 'src/components/BaseTable'
import { ColumnProps } from 'src/vendors/antd'
import moment from 'moment'
import { appStore, authStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { fileDownload } from 'src/utils/file/file'
import { infectedAreasCountService } from './api/InfectedAreasCountService'
import qs from 'qs'

const RangePicker = DatePicker.RangePicker
const Option = Select.Option

export default observer(function InfectedAreasCount() {
  const [query, setQuery] = useState({
    pageIndex: 1,
    empName: appStore.queryObj.empName || '',
    companyName: appStore.queryObj.companyName || '',
    startDate: appStore.queryObj.startDate || moment().subtract(1, 'days').format('YYYY-MM-DD'),
    endDate: appStore.queryObj.endDate || moment().format('YYYY-MM-DD'),
    pageSize: 15,
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
      width: 180,
    },
    {
      dataIndex: 'empNo',
      title: '工号',
      align: 'center',
      width: 90,
    },
    {
      dataIndex: 'empName',
      title: '姓名',
      align: 'center',
      width: 90,
    },
    {
      dataIndex: 'title',
      title: '职称',
      align: 'center',
      width: 90,
    },
    {
      dataIndex: 'inTime',
      title: '进入时间',
      align: 'center',
      width: 90,
    },
    {
      dataIndex: 'outTime',
      title: '出来时间',
      align: 'center',
      width: 90,
    },
    {
      dataIndex: 'differHours',
      title: '间隔时长',
      align: 'center',
      width: 90,
    },
    // {
    //   key: 'operate',
    //   title: '操作',
    //   align: 'center',
    //   width: 90,
    //   render: (text: string, record: any) => {
    //     return <DoCon className="operate-group">
    //       <span>查看</span>
    //     </DoCon>
    //   }
    // },
  ]

  const handleSearch = () => {
    setQuery({ ...query, pageIndex: 1 })
  }

  const handleExport = () => {
    setLoading(true)
    infectedAreasCountService
      .detailExport(query)
      .then((res) => {
        setLoading(false)
        fileDownload(res)
      }, () => setLoading(false))
    // let exportType = 0
    // const ExportContent = <ExportCon>
    //   <Radio.Group
    //     defaultValue={0}
    //     onChange={(e: any) => exportType = e.target.value}>
    //     <Radio value={0}>明细表</Radio>
    //     <Radio value={1}>汇总表</Radio>
    //   </Radio.Group>
    // </ExportCon>

    // Modal.confirm({
    //   title: '导出表格选择',
    //   content: ExportContent,
    //   onOk: () => {
    //     setLoading(true)

    //     if (exportType == 0) {
    //       infectedAreasCountService
    //         .detailExport(query)
    //         .then((res) => {
    //           setLoading(false)
    //           fileDownload(res)
    //         }, () => setLoading(false))
    //     } else {
    //       infectedAreasCountService
    //         .countExport(query)
    //         .then((res) => {
    //           setLoading(false)
    //           fileDownload(res)
    //         }, () => setLoading(false))
    //     }
    //   }
    // })
  }

  const getTableData = (query: any) => {
    appStore.history.replace(`${appStore.location.pathname}?${qs.stringify(query)}`)

    setLoading(true)
    infectedAreasCountService
      .getDetail(query)
      .then(res => {

        setLoading(false)
        if (res.data) {
          setTableData(res.data.list)
          setDataTotal(res.data.totalCount)
        }
      }, () => setLoading(false))
  }

  const handlePageChange = (current: number) => {
    setQuery({ ...query, pageIndex: current })
  }

  const handleSizeChange = (current: number, size: number) => {
    setQuery({ ...query, pageSize: size, pageIndex: 1 })
  }

  const getCompanyList = () => {
    infectedAreasCountService
      .getCompanyList()
      .then((res: any) => {
        if (res.data) setCompanyList(res.data)
      })
  }

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
          onChange={(companyName: string) => setQuery({ ...query, companyName })}
          style={{ width: '160px' }}>
          <Option value="">全部</Option>
          {companyList.map((item: any, idx: number) =>
            <Option value={item.companyName} key={idx}>{item.companyName}</Option>)}
        </Select>
        <span>搜索:</span>
        <Input
          style={{ width: '120px' }}
          defaultValue={query.empName}
          allowClear
          onBlur={(e: any) => setQuery({
            ...query,
            empName: e.target.value,
            pageIndex: 1
          })}
          placeholder="请输入姓名" />
        <Button onClick={handleSearch} type="primary">查询</Button>
        <Button onClick={handleExport}>导出</Button>
        <Button onClick={() => appStore.history.goBack()} >返回</Button>
      </RightIcon>
    </HeaderCon>
    <TableWrapper>
      <BaseTable
        surplusHeight={225}
        dataSource={tableData}
        loading={loading}
        columns={columns}
        pagination={{
          pageSizeOptions: ['10', '15', '20'],
          current: query.pageIndex,
          pageSize: query.pageSize,
          total: dataTotal,
          onChange: handlePageChange,
          onShowSizeChange: handleSizeChange
        }}
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
    .content{
      margin-right: 10px;
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