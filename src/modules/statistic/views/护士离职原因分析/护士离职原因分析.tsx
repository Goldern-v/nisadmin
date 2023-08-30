import styled from 'styled-components'
import React, { useState, useEffect,useRef } from 'react'
import { Button, DatePicker, Radio, Select, Spin,message } from 'antd'
import CommonLayout from './../../common/CommonLayout'
import { observer } from 'mobx-react'
import { appStore, authStore } from 'src/stores'
import BaseTable from 'src/components/BaseTable'
import { statisticsApi } from './../../api/StatisticsApi'
import { ColumnProps } from 'antd/lib/table'
import moment from 'src/vendors/moment'
import printing from "printing";
import { currentMonth, currentQuater, currentYear } from 'src/utils/date/rangeMethod'
import {Con} from 'src/modules/statistic/common/css/CommonLayout.ts';
import { fileDownload } from "src/utils/file/file"

const RangePicker = DatePicker.RangePicker

const Option = Select.Option

export interface Props { }

export default observer(function 护士离职原因分析() {
  let _currentMonth = currentMonth()

  let _currentQuater = currentQuater()

  let _currentYear = currentYear()

  const { deptList } = authStore
  const [query, setQuery] = useState({
    deptCode:['whyx','whhk'].includes(appStore.HOSPITAL_ID) ? authStore.defaultDeptCode:"",
    startDate: _currentMonth[0].format('YYYY-MM-DD'),
    endDate: _currentMonth[1].format('YYYY-MM-DD'),
  })

  const [data, setData] = useState([] as any)

  const [loading, setLoading] = useState(false)
  const [loadingExcel, setLoadingExcel] = useState(false)
  const tableRef = useRef<HTMLDivElement | null>(null);

  const otherColumns: ColumnProps<any>[] = [
    {
      title: '序号',
      width: 80,
      align: 'center',
      render: (val: any, record: any, idx: number) => idx + 1
    },
    {
      title: '科室',
      width: 180,
      dataIndex: 'deptName',
      align: 'center',
      render: (text: any, record: any) => ({
        props: { rowSpan: record.rowSpan },
        children: text
      })
    },
    {
      title: '离职人数',
      width: 80,
      dataIndex: 'num',
      align: 'center',
      render: (text: any, record: any) => ({
        props: { rowSpan: record.rowSpan },
        children: text
      })
    },
    {
      title: '离职原因',
      dataIndex: 'remark',
      align: 'left',
      render: (text: any, record: any) => `${record.empName}: ${text || '(无)'}`
    },
    {
      title: '离职率',
      width: 80,
      dataIndex: 'quitRate',
      align: 'center',
      render: (text: any, record: any) => ({
        props: { rowSpan: record.rowSpan },
        children: text
      })
    },
  ]
  const columnsJMFY: ColumnProps<any>[] = [
    {
      title: '序号',
      width: 80,
      align: 'center',
      render: (val: any, record: any, idx: number) => idx + 1
    },
    {
      title: '科室',
      width: 180,
      dataIndex: 'deptName',
      align: 'center',
      render: (text: any, record: any) => ({
        props: { rowSpan: record.rowSpan },
        children: text
      })
    },
    {
      title: '离职人数',
      width: 80,
      dataIndex: 'num',
      align: 'center',
      render: (text: any, record: any) => ({
        props: { rowSpan: record.rowSpan },
        children: text
      })
    },
    {
      title: '姓名',
      dataIndex: 'empName',
      align: 'left',
    },
    {
      title: '学历',
      dataIndex: 'highestEducation',
      align: 'left',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      align: 'left',
    },
    {
      title: '工作年限',
      dataIndex: 'workYear',
      align: 'left',
    },
    {
      title: '离职原因',
      dataIndex: 'remark',
      align: 'left',
      render: (val: any, record: any, idx: number) => val || "无"
    },
    {
      title: '离职率',
      width: 80,
      dataIndex: 'quitRate',
      align: 'center',
      render: (text: any, record: any) => ({
        props: { rowSpan: record.rowSpan },
        children: text
      })
    },
  ]
  const columns = ['jmfy'].includes(appStore.HOSPITAL_ID) ? columnsJMFY : otherColumns
 
  const handleSearch = () => getData()

  const getData = () => {
    setLoading(true)

    statisticsApi.countLeaveRemark(query)
      .then((res: any) => {
        setLoading(false)
        if (res.data) {

          let newData = []

          for (let i = 0; i < res.data.length; i++) {
            let item0 = res.data[i]
            let deptName = item0.deptName

            let countLength = (item0.countUsers || []).length || 0

            if (item0.countUsers && countLength > 0)
              for (let j = 0; j < countLength; j++) {
                let item1 = item0.countUsers[j]
                let rowSpan = 0
                if (j == 0) rowSpan = countLength

                newData.push({ ...item0, ...item1, deptName, rowSpan })
              }
            else {
              newData.push({ ...item0, rowSpan: 1 })
            }
          }

          console.log(newData)

          setData(newData)
        }
      }, () => setLoading(false))
  }

  useEffect(() => {
    getData()
  }, [query])

  const exportPdf = ()=>{
    printing(tableRef.current!, {
      injectGlobalCss: true,
      scanStyles: false,
      css: `
        @page {
          margin: 10px;
        }
        .ant-table-body{
          max-height: none !important;
          height: auto !important;
        }
        .tableBox{
          height:1100px;
          overflow:hidden;
          page-break-after: always;
        }
      `,
    });
  }

  const exportExcel = ()=>{
    setLoadingExcel(true)
    try{
      statisticsApi.countInformationExport(query).then(res=>{
        fileDownload(res)
        setLoadingExcel(false)
        message.success('导出成功')
      }).catch(err=>{
        message.error('导出失败')
        setLoadingExcel(false)
      })
    } catch(err){
      message.error('导出失败')
      setLoadingExcel(false)
    }
  }

  return <CommonLayout
    header={<div>
      <Select
        style={{ minWidth: 180 }}
        className="content-item"
        value={query.deptCode}
        showSearch
        filterOption={(input: any, option: any) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        onChange={(deptCode: string) => setQuery({ ...query, deptCode })}>
        {
          appStore.hisMatch({
            map: {
              "whyx,whhk": authStore.isDepartmentYaXin &&<Option  value={''}>全院</Option>,
              other:<Option value={''}>全院</Option>
            },
            vague: true
          })  
        }
        {deptList.map((dept: any, idx: number) =>
          <Option key={idx} value={dept.code}>{dept.name}</Option>
        )}
      </Select>
      <RangePicker
        className="content-item"
        style={{ width: 220 }}
        value={[moment(query.startDate), moment(query.endDate)]}
        ranges={{
          '本月': _currentMonth,
          '本季度': _currentQuater,
          '本年度': _currentYear,
        }}
        onChange={(payload: any) => {
          setQuery({
            ...query,
            startDate: payload[0].format('YYYY-MM-DD'),
            endDate: payload[1].format('YYYY-MM-DD'),
          })
        }}
        allowClear={false} />
      <Button type="primary" onClick={handleSearch}>查询</Button>
      {['jmfy'].includes(appStore.HOSPITAL_ID) && <Button type="primary" onClick={exportPdf}>导出pdf</Button>}
      {['jmfy'].includes(appStore.HOSPITAL_ID) && <Button type="primary" onClick={exportExcel} loading={loadingExcel}>导出</Button>}
    </div>}
      body={<Spin spinning={loading}>
        <Con ref={tableRef} className="tableBox">
          <div className='main-title'>护士离职原因分析</div>
          <div className='sub-title'>统计日期：{query.startDate} 至 {query.endDate}</div>
          <BaseTable
            surplusWidth={500}
            surplusHeight={320}
            columns={columns}
            dataSource={data} />
        </Con>
      </Spin>} 
      />
})