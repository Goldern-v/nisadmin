import { observer } from 'mobx-react'
import React, { useEffect, useRef, useState } from 'react'
import { PageHeader, PageTitle, Place } from 'src/components/common'
import YearPicker from 'src/components/YearPicker'
import { Obj } from 'src/libs/types'
import styled from 'styled-components'
import moment from 'moment';
import api from 'src/services/api/quality/nightRoundsRecordApi'
import { Button, Select, Spin } from 'antd'
import printing from 'printing'
import { monthList } from 'src/enums/date'
import { appStore } from 'src/stores'
import { fileDownload } from 'src/utils/file/file'
import HorizonBar from '../components/HorizonBar'
import HorizonLine from '../components/HorizonLine'
import ProblemTable from './components/problem-table'
import ProjectTable from './components/project-table'
export interface Props {
  type?: number
}
/**二值护士评分汇总/夜值班受表扬的护士名单 by江门妇幼 */
export default observer(function (props: Props) {

  const [query, setQuery] = useState({
    year: moment(),
    month: Number(moment().format('M'))
  })
  const [loading, setLoading] = useState(false)
  const [detail, setDetail] = useState<Obj>({})
  const [editObj, setEditObj] = useState<Obj>({})
  const printRef: any = useRef()

  const getData = () => {
    setLoading(true)
    const params = {
      ...query,
      year: query.year.format('YYYY')
    }
    api.monthlySummaryDetails(params).then(res => {
      setLoading(false)
      if (res.code === '200') {
        let { deptProblemListData, deptProblemChartData, formItemProblemChartData, ...other } = res.data
        deptProblemChartData = Object.keys(deptProblemChartData).map((v: string) => {
          return { title: v, value: deptProblemChartData[v] }
        })
        formItemProblemChartData = Object.keys(formItemProblemChartData).map((v: string) => {
          return { title: v, value: formItemProblemChartData[v] }
        })
        setDetail({ ...other, deptProblemChartData, formItemProblemChartData })
        setEditObj(deptProblemListData)
      }
    }).catch(() => {
      setLoading(false)
    })
  }
  const changeType = (e: any, data: Obj) => {
    setLoading(true)
    api.monthlySummaryDetailsUpdate([{
      id: data.id,
      achieveType: e
    }]).then(res => {
      getData()
    }).catch(() => setLoading(false))
  }
  const onExport = () => {
    const params = {
      ...query,
      year: query.year.format('YYYY')
    }
    api.monthlySummaryDetailsExport(params).then(res => {
      fileDownload(res)
    })
  }
  const [isPrint, setIsPrint] = useState(false)
  const [chartsImg, setChartsImg] = useState<any[]>([])
  const setImg = () => {
    let imgEl = document.querySelectorAll('.chart-img') as any
    if (imgEl.length) {
      for (let i = 0; i < imgEl.length; i++) {
        chartsImg[i] && (imgEl[i].src = chartsImg[i])
      }
    }
  }

  const onPrint = async () => {
    await setIsPrint(true)
    setImg()
    setTimeout(() => {

      printing(document.querySelector('.ant-spin-nested-loading') as any, {
        injectGlobalCss: true,
        scanStyles: false,
        direction: 'horizontal',
        css: `
        .ant-spin-nested-loading {
          padding: 15px
        }
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
        .chart-img {
          max-height: 260mm;
          width: 100%;
          object-fit: cover
        }
        `
      }).then(() => {
        setIsPrint(false)
      })
    }, 500)
  }
  useEffect(() => {
    let timer: any = null
    // if (!loading) {
    timer = setTimeout(() => {
      let canvasEl = document.querySelectorAll('canvas') as any
      if (canvasEl.length) {
        let arr = []
        for (let i = 0; i < canvasEl.length; i++) {
          arr.push(canvasEl[i].toDataURL())
        }
        setChartsImg(arr)
      }
    }, 1000)
    // }
    return () => clearTimeout(timer)
  }, [loading])
  useEffect(() => {
    getData()
  }, [query])

  return (
    <Wrapper>
      <PageHeader>
        <PageTitle>月度夜查房汇总</PageTitle>
        <Place />
        <span>年度：</span>
        <YearPicker value={query.year} onChange={(e: any) => { setQuery({ ...query, year: e }) }} />
        <span>月度：</span>
        <Select value={query.month} onChange={(e: any) => { setQuery({ ...query, month: e }) }}>
          {monthList.map((v: any, i: number) => (
            <Select.Option value={i + 1} key={i}>{v}</Select.Option>
          ))}
        </Select>
      </PageHeader>
      <Spin
        spinning={loading}
        ref={printRef}>
        <PageHeader className='ctx-btn-box'>
          <Place />
          <Button type='primary' onClick={onExport}>导出</Button>
          <Button type='primary' onClick={onPrint}>打印</Button>
          <Button type='primary' onClick={getData}>同步数据</Button>
        </PageHeader>
        <div className='ctx-title'>
          <div>{appStore.HOSPITAL_Name}</div>
          <div>
            ({detail.month})护士长夜查房汇总表
          </div>
        </div>
        <div className='ctx-text'>{query.month}月份，总检查天数共{detail.totalDays}天，对照检查标准，共存在{detail.problemCount}条问题，具体如下</div>
        <ProjectTable list={detail.formItemDeptScoreRows} deptList={detail.deptUnits} />
        <div className='ctx-text'>1、评分表存在问题分析汇总</div>
        {!isPrint ?
          <HorizonLine list={detail.formItemProblemChartData} xKey='title' yKey='value' isHorizon={false} />
          :
          <img className="chart-img" src={''} />
        }
        <div className='ctx-text'>2、各科室的评分表存在问题分布</div>
        {!isPrint ?
          <HorizonBar list={detail.deptProblemChartData} xKey='title' yKey='value' isHorizon={false} />
          :
          <img className="chart-img" src={''} />
        }
        <ProblemTable data={editObj} date={detail.month} changeType={changeType} />
      </Spin>
    </Wrapper>
  )
})

const Wrapper = styled.div`
  height: 100%;
  .itemHide{
    display: none
  }
  .ant-spin-nested-loading {
    background-color: #fff;
    border-radius: 5px;
    margin: 0 15px;
    padding: 15px;
    overflow: auto;
    height: calc(100% - 60px);
  }
  .ctx-title {
    text-align: center;
    font-size: 20px;
    font-weight: 600;
    line-height: 24px;
  }
  .ctx-text {
    font-size: 16px;
    line-height: 24px;
  }
`