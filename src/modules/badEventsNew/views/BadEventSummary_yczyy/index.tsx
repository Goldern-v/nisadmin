import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { badEventsNewService } from '../../api/badEventsNewService'
import moment from 'moment'

import { PageTitle, Place, PageHeader } from 'src/components/common';
import { Button, DatePicker } from 'antd';
import { currentMonth } from 'src/utils/date/rangeMethod'
import { fileDownload } from 'src/utils/file/file'
import BaseTable from 'src/components/BaseTable'
import { ColumnProps } from 'antd/lib/table'
import DeptSelect from 'src/components/DeptSelect'
import { authStore } from 'src/stores'
export default observer(function BadEventSummary(props) {
  const [startDate, endDate] = currentMonth();
  const defParams = () => ({
    deptCode: authStore.selectedDeptCode,
    startDateStr: startDate.format("YYYY-MM-DD"),
    endDateStr: endDate.format("YYYY-MM-DD"),
    pageSize: 20,
    pageIndex: 1,
  })

  const [params, setParams] = useState(defParams)
  const [total, setTotal] = useState(0)
  const [data, setData] = useState<any>([])
  const [loading, setLoading] = useState(false)

  const columns: ColumnProps<any>[] = [
    {
      title: '报告日期',
      dataIndex: 'createtime',
      width: 100,
      align: 'center'
    },
    {
      title: '事件发生时间',
      dataIndex: 'happentime',
      width: 100,
      align: 'center'
    },
    {
      title: '科别',
      dataIndex: 'deptname',
      width: 60,
      align: 'center'
    },
    {
      title: '床号',
      dataIndex: 'bedlabel',
      width: 60,
      align: 'center'
    },
    {
      title: '住院号',
      dataIndex: 'inpno',
      width: 60,
      align: 'center'
    },
    {
      title: '姓名',
      dataIndex: 'patientname',
      width: 60,
      align: 'center'
    },
    {
      title: '性别',
      dataIndex: 'sex',
      width: 60,
      align: 'center'
    },
    {
      title: '年龄',
      dataIndex: 'age',
      width: 60,
      align: 'center'
    },
    {
      title: '类型',
      dataIndex: 'formname',
      width: 60,
      align: 'center'
    },
    {
      title: '责任护士',
      dataIndex: 'dutynurse',
      width: 60,
      align: 'center'
    },
    {
      title: '病区护士长',
      dataIndex: 'wardnurse',
      width: 60,
      align: 'center'
    },
    {
      title: '大科护士长',
      dataIndex: 'bigdeptnurse',
      width: 60,
      align: 'center'
    },
  ]
  // const exportExcel = async () => {
  //   try {
  //     setLoading(true)
  //     const res = await badEventsNewService.exportBeSummaryYc(params)
  //     if (res) {
  //       setLoading(false)
  //       fileDownload(res)
  //     }
  //   } catch (e) {
  //     setLoading(false)
  //   }
  // }
  const search = async () => {
    try {
      setLoading(true)
      const data = {...params}
      if (data.deptCode === '全院') data.deptCode = ''
      const res = await badEventsNewService.pageBadEventSummary4(data)
      if (res.code == 200) {
        setData(res?.data?.list || [])
        setTotal(res.data.totalCount)
      }
      setLoading(false)
    } catch (e) {
      setLoading(false)
    }
  }
  const init = () => {
    search()
  }
  useEffect(() => {
    init()
  }, [params])
  return (
    <Wrapper>
      <PageHeader>
        <PageTitle>不良事件报告登记总表</PageTitle>
        <Place />
        <DeptSelect hasAllDept={true} onChange={e => setParams({
          ...params, 
          deptCode: e
        })}/>
        <DatePicker.RangePicker
        className='timer'
          allowClear={false}
          value={[moment(params.startDateStr), moment(params.endDateStr)]}
          onChange={([m0, m1]: any[]) => {
            setParams({
              ...params,
              startDateStr: m0?.format('YYYY-MM-DD') || '',
              endDateStr: m1?.format('YYYY-MM-DD') || '',
            })
          }} />
        <Button type="primary" className="statistics" onClick={search}>
          查询
        </Button>
        {/* <Button
          className="excel"
          onClick={() => {
            exportExcel();
          }}
        >
          导出Excel
        </Button> */}
      </PageHeader>
      <ContentCon>
        <div className="content-title">
          <div>不良事件报告登记总表</div>
          {/* <div>
            日期:
            {`${moment(params.startDateStr).format("YYYY-MM-DD")}至${moment(
              params.endDateStr
            ).format("YYYY-MM-DD")}`}
          </div> */}
        </div>
        <BaseTable
          surplusWidth={1000}
          surplusHeight={280}
          loading={loading}
          dataSource={data}
          columns={columns}
          pagination={
            {
              current: params.pageIndex,
              total: total,
              pageSize: params.pageSize,
              showSizeChanger: true,
              showQuickJumper: true,
              onShowSizeChange: (pageIndex, pageSize) =>
                setParams({ ...params, pageSize }),
              onChange: (pageIndex, pageSize) => setParams({ ...params, pageIndex })
            }
          }
        />
      </ContentCon>
    </Wrapper>
  )
})

const Wrapper = styled.div`
.timer {
  margin-left: 10px;
}
`
const ContentCon = styled.div`
background: #fff;
  margin: 0 15px 5px 15px;
  padding-top: 25px;
  .content-title {
    text-align: center;
    > div:first-child {
      font-size: 20px;
      color: #333;
      font-weight: bold;
      text-align: center;
    }
    > div:nth-child(2) {
      font-size: 13px;
      color: #333;
      text-align: center;
      margin: 8px 0 5px 0;
    }
  }
  .ant-table-column-sorters {
    width: 100%;
  }
`