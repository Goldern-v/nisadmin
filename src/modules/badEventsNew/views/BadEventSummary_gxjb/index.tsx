import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { badEventsNewService } from '../../api/badEventsNewService'
import moment from 'moment'
import { PageTitle, Place, PageHeader } from 'src/components/common';
import { Button, DatePicker, Select } from 'antd';
import { fileDownload } from 'src/utils/file/file'
import BaseTable from 'src/components/BaseTable'
import { ColumnProps } from 'antd/lib/table'
import { getColumnsNames, SUMMARY_TYPES } from './enums'
import { quarterList } from 'src/enums/date'
const Option = Select.Option

export default observer(function BadEventSummaryGxjb(props) {

  const defParams = () => {
    let quarter = moment().quarter()
    return {
      type: '',
      quarter: quarter,
      year: moment().year(),
      deptCode: '',
      eventType: ''
    }
  }
  const [params, setParams] = useState(defParams)
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const columns: ColumnProps<any>[] = [
    
    ...getColumnsNames('1').map((v:string) => {
      return {
        title: v,
        dataIndex: v,
        width: 80,
        align: "center"
      } as ColumnProps<any>
    })
  ]
  const exportExcel = async () => {
    try {
      setLoading(true)
      // const res = await badEventsNewService.exportBeSummaryYc(params)
      // if (res) {
      //   setLoading(false)
      //   fileDownload(res)
      // }
    } catch (e) {
      setLoading(false)
    }
  }
  const search = async () => {
    try {
      setLoading(true)
      // const res = await badEventsNewService.getBeSummaryYc(params)
      // if (res.code == 200) {
      //   let data = Object.keys(res.data).map((key:any) => {
      //     return {
      //       wardName: key,
      //       ...res.data[key]
      //     }
      //   })
      //   setData(data)
      // }
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
        <PageTitle className='page-title'>
          {`${params.year}年`}
          <div>不良事件上报汇总表</div>
        </PageTitle>
        <Place/>
        类型：
        <Select value={params.type}>
          {
            SUMMARY_TYPES.map((v:any, i: number) => (
              <Option value={v.value}>{v.name}</Option>
            ))
          }
        </Select>
        季度：
        <Select value={params.quarter}>
          {
            quarterList.map((v, i)=> (
              <Option key={i} value={i + 1}>{v}</Option>
            ))
          }
        </Select>

        <Button type="primary" className="statistics" onClick={search}>
          查询
        </Button>
        <Button
          className="excel"
          onClick={() => {
            exportExcel();
          }}
          >
          导出
        </Button>
      </PageHeader>
      <ContentCon>
        <BaseTable
          surplusWidth={1000}
          surplusHeight={205}
          loading={loading}
          dataSource={data}
          columns={columns}
        />
      </ContentCon>
    </Wrapper>
  )
})

const Wrapper = styled.div`
  .page-title {
    div {
      font-size: 14px;
    }
  }
`
const ContentCon = styled.div`
  background: #fff;
  margin: 0 15px 5px 15px;
  .ant-table-column-sorters {
    width: 100%;
  }
`