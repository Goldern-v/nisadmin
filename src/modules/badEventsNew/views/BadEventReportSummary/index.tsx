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
export default observer(function BadEventReportSummary(props) {
  const [startDate, endDate] = currentMonth();
  const defParams = () => ({
    dateBegin: startDate.format("YYYY-MM-DD"),
    dateEnd: endDate.format("YYYY-MM-DD")
  })
  const [params, setParams] = useState(defParams)
  const [data, setData] = useState<any>([])
  const [loading, setLoading] = useState(false)
  const columns: ColumnProps<any>[] = [
    {
      title: "发生日期",
      dataIndex: "happenDate",
      width: 100,
      align: "center"
    },
    {
      title: "报告日期",
      dataIndex: "reportDate",
      width: 120,
      align: "center"
    },
    {
      title: "科别",
      dataIndex: "deptName",
      width: 130,
      align: "center"
    },
    {
      title: "床号",
      dataIndex: "bedLabel",
      width: 70,
      align: "center"
    },
    {
      title: "住院号",
      dataIndex: "inpNo",
      width: 70,
      align: "center"
    },
    {
      title: "姓名",
      dataIndex: "patientName",
      width: 80,
      align: "center"
    },
    {
      title: "性别",
      dataIndex: "sex",
      width: 70,
      align: "center"
    },
    {
      title: "年龄",
      dataIndex: "age",
      width: 70,
      align: "center"
    },
    {
      title: "类型",
      dataIndex: "badEventType",
      width: 120,
      align: "center"
    },
    {
      title: "发生原因",
      dataIndex: "happenReason",
      width: 120,
      align: "center"
    },
    {
      title: "伤害后果",
      dataIndex: "damageConsequences",
      width: 120,
      align: "center"
    },
    {
      title: "责任护士",
      dataIndex: "primaryNurse",
      width: 80,
      align: "center"
    },
    {
      title: "护士长",
      dataIndex: "headNurse",
      width: 80,
      align: "center"
    },
  ]
  const exportExcel = async () => {
    try {
      setLoading(true)
      const res = await badEventsNewService.exportBeRegistrationSummaryYc(params)
      if (res) {
        setLoading(false)
        fileDownload(res)
      }
    } catch (e) {
      setLoading(false)
    }
  }
  const search = async () => {
    try {
      setLoading(true)
      const res = await badEventsNewService.getBeRegistrationSummaryYc(params)
      if (res.code == 200) {
        setData(res.data)
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
        <PageTitle>不良事件报告登记汇总</PageTitle>
        <Place/>
        <DatePicker.RangePicker
        allowClear={false}
        value={[moment(params.dateBegin),moment(params.dateEnd)]}
        onChange={([m0,m1]: any[]) => {
          setParams({
            dateBegin: m0?.format('YYYY-MM-DD') || '',
            dateEnd: m1?.format('YYYY-MM-DD') || '',
          })
        }}/>
        <Button type="primary" className="statistics" onClick={search}>
          查询
        </Button>
        <Button
          className="excel"
          onClick={() => {
            exportExcel();
          }}
          >
          导出Excel
        </Button>
      </PageHeader>
      <ContentCon>
        <div className="content-title">
          <div>不良事件报告登记汇总</div>
          <div>
            日期:
            {`${moment(params.dateBegin).format("YYYY-MM-DD")}至${moment(
              params.dateEnd
            ).format("YYYY-MM-DD")}`}
          </div>
        </div>
        <BaseTable
          surplusWidth={1000}
          surplusHeight={280}
          loading={loading}
          dataSource={data}
          columns={columns}
        />
      </ContentCon>
    </Wrapper>
  )
})

const Wrapper = styled.div`

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