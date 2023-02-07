import { observer } from 'mobx-react'
import React, { useEffect, useRef, useState } from 'react'
import BaseTable from 'src/components/BaseTable'
import { PageHeader, PageTitle, Place } from 'src/components/common'
import YearPicker from 'src/components/YearPicker'
import { Obj } from 'src/libs/types'
import styled from 'styled-components'
import moment from 'moment';
import api from 'src/services/api/quality/nightRoundsRecordApi'
import { CONFIGS } from './utils/enums'
import { Button } from 'antd'
import { fileDownload } from 'src/utils/file/file'
import printing from 'printing'
export interface Props {
  type?: number
}
/**二值护士评分汇总/夜值班受表扬的护士名单 by江门妇幼 */
export default observer(function (props: Props) {
  const { type = 1 } = props
  const config = CONFIGS[type]
  const [year, setYear] = useState(moment())
  const [tableLoading, setTableLoading] = useState(false)
  const [tableData, setTableData] = useState<Obj[]>([])
  const printRef: any = useRef()

  const getList = () => {
    setTableLoading(true)
    api.getSummary(year).then(res => {
      setTableLoading(false)
      if (res.code === '200') {
        setTableData(res.data)
      }
    }).catch(() => {
      setTableLoading(false)
    })
  }
  const onExport = () => {
    api.exportSummary(year).then(res => {
      fileDownload(res)
    })
  }
  const onPrint = () => {
    printing(printRef.current, {
      injectGlobalCss: true,
      scanStyles: false,
      direction: 'horizontal',
      css: `
      .ctx-btn-box {
        display: none;
      }
      .ctx-title {
        padding-top: 15px;
        text-align: center;
        font-size: 20px;
        font-weight: 600;
        line-height: 24px;
      }
      .ant-spin-nested-loading {
        height: auto !important;
      }
      .ant-table-body {
        max-height: 10000% !important;
        height: auto !important;
      }
      tr{
        page-break-inside: avoid;
        page-break-after: auto
      }
      `
    })
  }
  useEffect(() => {
    getList()
  }, [year])

  return (
    <Wrapper>
      <PageHeader>
        <PageTitle>{config.title}</PageTitle>
        <Place />
        <span>年度：</span>
        <YearPicker value={year} onChange={(e: any) => { setYear(e) }} />
      </PageHeader>
      <div
        className='ctx'
        ref={printRef}>
        <PageHeader className='ctx-btn-box'>
          <Place />
          <Button type='primary' onClick={onExport}>导出</Button>
          <Button type='primary' onClick={onPrint}>打印</Button>
          <Button type='primary' onClick={getList}>同步数据</Button>
        </PageHeader>
        <div className='ctx-title'>{ (type === 1 ? year.format('YYYY') + '年' : '') + CONFIGS[type]?.tableTitle }</div>
        <BaseTable
          loading={tableLoading}
          columns={config.columns}
          dataSource={tableData}
          surplusHeight={260}
        />
      </div>
    </Wrapper>
  )
})

const Wrapper = styled.div`
  height: 100%;
  .itemHide{
    display: none
  }
  .ctx {
    background-color: #fff;
    border-radius: 5px;
    margin: 0 15px;
  }
  .ctx-title {
    text-align: center;
    font-size: 20px;
    font-weight: 600;
    line-height: 24px;
  }
`