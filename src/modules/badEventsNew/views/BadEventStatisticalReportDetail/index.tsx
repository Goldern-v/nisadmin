import { observer } from 'mobx-react'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { badEventsNewService } from '../../api/badEventsNewService'

import { Button, Input, Modal, Spin, message } from 'antd'
import { appStore } from 'src/stores'
import { Obj, SelectItem } from 'src/libs/types'
import AuditHeader from 'src/components/audit-page/AuditHeader'
import { ReportContainer, ReportCtx } from 'src/components/common'
import { STATUS_LIST } from '../BadEventStatisticalReport/enums'
import { quarterAndYear } from 'src/enums/date'
import cloneDeep from 'lodash/cloneDeep'
import { chnNumChar1 } from 'src/utils/number/numToChinese'
import Pie from 'src/modules/quality/views/components/Pie'
import FishBone1 from './components/fish-bone'
import HorizonBar from 'src/modules/quality/views/components/HorizonBar'
import { print, preview } from 'printing'
const { TextArea } = Input
const fishBoneFish = Object.freeze({
  v0: 'b0062084',
  v1: 'b0062085',
  v2: 'b0062086',
  v3: 'b0062087',
  v4: 'b0062088',
  v5: 'b0062089',
  v6: 'b0062090',
  v7: 'b0062091',
  v8: 'b0062092',
  v9: 'b0062093',
  v10: 'b0062094',
  v11: 'b0062095',
  v12: 'b0062096',
  v13: 'b0062097',
  v14: 'b0062098',
  v15: 'b0062099',
})
const reportRoute = '/badEventsNew/不良事件统计报告'
export default observer(function BadEventStatisticalReportDetail(props) {
  const { match, history } = appStore
  const [msg, setMsg] = useState<Obj>({})
  const [data, setData] = useState<Obj>({})
  const [detailList, setDetailList] = useState<Obj[]>([])
  const saveVal = useRef<Obj>({})
  const [loading, setLoading] = useState(false)
  const ctxRef = useRef<any>(null)
  const [isPrint, setIsPrint] = useState(false)
  const [imgList, setImgList] = useState([])

  const getData = async () => {
    try {
      setLoading(true)
      const res = await badEventsNewService.getCommonWithBeReport(match.params.id)
      if (res.code === '200') {
        let { detail, ...other } = res.data
        detail = JSON.parse(detail)
        let { detailList, ...data } = detail
        const quarter = quarterAndYear[detail.timeType === 0 ? quarterAndYear.length - 1 : detail.timeType - 1]
        const nurseCount = data?.nurseAnalysisList.reduce((prev: number, cur: Obj) => {
          return prev += Number(cur.nurseCount)
        }, 0)
        if (other.status === '0') {
          const res = initEdit({ quarter }, detail)
          data = res
        }
        // typeAnalysisList除以2的长度
        other.typeAnalysisTable = typeAnalysisTable(detail.typeAnalysisList)
        setData(data)
        setDetailList(detailList)
        setMsg({ ...other, quarter, nurseCount })
      }
      setLoading(false)
    } catch (e) {
      console.log('test-error', e)
      setLoading(false)
    }
  }
  /**初始化编辑文字 */
  const initEdit = (msg: Obj, data: Obj) => {
    const detail = { ...data }
    const { typeAnalysisList, typeAnalysisTotal, year } = detail
    !detail?.head && (detail.head = `为加强我院护理安全管理，提高护理质量，更好的保障安全，減少护理不良事件的发生，确保惠者安全，我院一直开展鼓励上报一护理不良事件上报制度。现将我院 ${year} 年护理不良事件报告统计分析如下：`)
    !detail?.eventSummary && (detail.eventSummary = `${year}年${msg.quarter}共上报不良事件${typeAnalysisTotal.eventCount}例${formatEventSummary(typeAnalysisList)}`)
    !detail?.eventSourceAndResult && (detail.eventSourceAndResult = ``)
    !detail?.eventHiddenDanger && (detail.eventHiddenDanger = ``)
    !detail?.eventPreventMeasure && (detail.eventPreventMeasure = ``)
    return detail
  }

  const formatEventSummary = (list: Obj[]) => {
    if (list.length === 0) return ''
    const arr = list.slice(0, 2)
    const text = arr.reduce((prev, cur, i) => {
      return prev += cur.eventName + (i < arr.length - 1 ? '和' : '')
    }, '')
    return `，居前${chnNumChar1[Math.min(list.length, 2)]}位的是${text}`
  }
  // 护理不良事件分类表
  const typeAnalysisTable = (arr: Obj[]) => {
    console.log('test-arr', arr)
    if (!arr.length) return arr
    return Array.from(Array(Math.ceil(arr.length / 2)), (j, k) => k)
  }
  // 暂存
  const onSave = async () => {
    try {
      setLoading(true)
      console.log('test-', saveVal.current)
      // setData(val => {
        const res = await badEventsNewService.saveCommonWithBeReport({ id: match.params.id, detail: JSON.stringify(saveVal.current) })
        setLoading(false)
        history.replace(reportRoute)
      // })
    } catch (e) {
      setLoading(false)
    }
  }
  const onCommit = async (status: '0' | '1' = '1') => {
    try {
      setLoading(true)
      const formData = new FormData()
      formData.append('masterId', match.params.id)
      formData.append('status', status)
      const res = await badEventsNewService.updateCommonStatusWithBeReport(formData)
      setLoading(false)
      // message.success('删除成功！')
      history.replace(reportRoute)
    } catch (e) {
      setLoading(false)
    }
  }
  /**删除 */
  const onDel = () => {
    Modal.confirm({
      content: '是否确认删除？确认则删除此报告',
      onOk: async () => {
        try {
          setLoading(true)
          const res = await badEventsNewService.deleteCommonWithBeReport(match.params.id)
          console.log('test-res', res)
          setLoading(false)
          message.success('删除成功！')
          history.replace(reportRoute)
        } catch (e) {
          setLoading(false)
        }
      }
    })
  }
  const onPrint = () => {
    setTimeout(() => {
      // isPrint = true
      setIsPrint(true)
      // preview(this.ctxRef.current, {
      preview(ctxRef.current, {
        injectGlobalCss: true,
        scanStyles: false,
        // direction: "vertical",
        css: `
        @page {
          margin: 0;
        }
        .con--a4 {
          min-height: 0px !important;
          width: 100% !important;
          margin: 0;
          word-break: break-all;
        }
        table {
          table-layout: fixed
        }
        tr, pre {
          page-break-inside: auto;
          page-break-after: auto
        }
        pre {
          height: auto;
          white-space: pre-wrap;
        }
        `,
      })
      .then(() => setIsPrint(false))
    })
  }
  const handleDetailList = (idx: number, data: Obj) => {
    setDetailList(val => {
      console.log('test-val', val)
      return val.map((v, i) => idx === i ? { ...v, ...data } : v)
    })
  }
  
  const BtnList = useMemo(() => {
    if (msg?.status === '0') {
      return <>
        <Button type='primary' onClick={onSave}>暂存</Button>
        <Button onClick={onDel}>删除</Button>
        <Button onClick={() => onCommit()}>发布</Button>
      </>
    }
    // return <Button onClick={() => onCommit('0')}>撤销</Button>
    return ''
  }, [msg])
  const init = () => {
    getData()
  }
  useEffect(() => {
    saveVal.current = {...data, detailList}
  }, [data, detailList])
  useEffect(() => {
    init()
  }, [])
  return (
    <Wrapper>
      <Spin style={{ height: '100%' }} spinning={loading}>
        <AuditHeader
          breadData={[
            { name: '统计报告', link: `/badEventsNew/不良事件统计报告` },
            { name: "记录详情" },
          ]}
          statusCon={<>
            <div className='title fw-b'>{data?.titleName}</div>
            <div>由{msg?.creatorName}创建，最后修改于{msg?.updateDate || msg?.createDate}<span>{STATUS_LIST.find((v: SelectItem) => v.value === msg?.status)?.label}</span></div>
          </>}
          btnCon={<>
            {BtnList}
            <Button onClick={() => appStore.history.replace(reportRoute)}>返回</Button>
            {/* <Button onClick={onPrint}>打印</Button> */}
          </>}
        />
        <Container>
          <div className='main-ctx'>
            <Ctx className={'ctx con--a4' + msg?.status === '1' ? 'ctx--view' : '' } ref={ctxRef}>
              <Input className='ta-center fw-bold f-large' value={data.titleName} onChange={(e) => setData(data => ({ ...data, titleName: e.target.value }))} />
              <TextArea value={data?.head} autosize={{ minRows: 4 }} onInput={(e: any) => setData(data => ({ ...data, head: e.target.value }))} />
              <div className='fw-bold f-large'>一、{data.year}年护理不良事件汇总</div>
              <TextArea value={data?.eventSummary} autosize={{ minRows: 2 }} onInput={(e: any) => setData(data => ({ ...data, eventSummary: e.target.value }))} />
              <div>表1：{data.year}年{msg?.quarter}护理不良事件分类表</div>
              <table>
                <colgroup>
                  {
                    Array.from(Array(6)).map((v, i) => <col key={i}></col>)
                  }
                </colgroup>
                <thead>
                  <tr>
                    {[1, 2].map((v, i) => <>
                      <th key={`${v}-0`}>事件名称</th>
                      <th key={`${v}-1`}>上报例数</th>
                      <th key={`${v}-2`}>所占比例</th>
                    </>)}
                  </tr>
                </thead>
                <tbody>
                  {
                    (msg?.typeAnalysisTable || []).map((v: number) => {
                      const cur1 = 2 * v
                      return <tr key={v}>
                        <td>{data.typeAnalysisList[cur1].eventName}</td>
                        <td>{data.typeAnalysisList[cur1].eventCount + '例'}</td>
                        <td>{data.typeAnalysisList[cur1].eventRate * 100}%</td>
                        <td>{data.typeAnalysisList[cur1 + 1] ? data.typeAnalysisList[cur1 + 1].eventName : ''}</td>
                        <td>{data.typeAnalysisList[cur1 + 1] ? data.typeAnalysisList[cur1 + 1].eventCount + '例' : ''}</td>
                        <td>{data.typeAnalysisList[cur1 + 1] ? data.typeAnalysisList[cur1 + 1].eventRate * 100 + '%' : ''}</td>
                      </tr>
                    })
                  }
                  <tr>
                    <td colSpan={2}>合计</td>
                    <td colSpan={2}>{data?.typeAnalysisTotal?.eventCount + '例'}</td>
                    <td colSpan={2}>{data?.typeAnalysisTotal?.eventRate * 100 + '%'}</td>
                  </tr>
                </tbody>
              </table>
              <div>图1：{data.year}年{msg?.quarter}护理不良事件分类图</div>
              {!isPrint ?<Pie list={data?.typeAnalysisList || []} nameKey='eventName' valKey='eventCount' />: <img className="chart-img"  src={imgList[0]} alt="0"/>}
              <div>表2：{data.year}年{msg?.quarter}护理不良事件各科室分布表</div>
              {!isPrint ?<HorizonBar list={data?.deptAnalysisList} xKey='deptName' yKey='deptCount' isHorizon={false} />: <img className="chart-img" src={imgList[2]} alt="2" />}
              <div>表3：上报的{data?.typeAnalysisTotal?.eventCount}例不良事件中共涉及护士{msg?.nurseCount || 0}人，其中五年内的护士占{ data?.under5YearRate ? data?.under5YearRate * 100 + '%' : 0}</div>
              <div className='fw-bold f-large ta-center'>各级护士分布</div>
              {!isPrint ?<Pie list={data?.nurseAnalysisList || []} nameKey='nurseType' valKey='nurseCount' />: <img className="chart-img" src={imgList[1]} alt="1" />}
              <div className='fw-bold f-large'>二、护理不良事件来源及后果：</div>
              <TextArea value={data?.eventSourceAndResult} autosize={{ minRows: 2 }} onInput={(e: any) => { setData(data => ({ ...data, eventSourceAndResult: e.target.value })) }} />
              <div className='fw-bold f-large'>三、主要不良事件分析：</div>

              {
                (detailList).map((v: Obj, i: number) =>
                  <>
                    <div key={`${v.eventType}-0`}>{i + 1}、{v.eventType}</div>
                    <div key={`${v.eventType}-1`}>{'1)'}{v.eventType}原因分析</div>
                    <FishBone1 key={`${v.eventType}-2`} value={v} reflect={fishBoneFish} onChange={(e: any) => handleDetailList(i, e)} />
                    <div key={`${v.eventType}-3`}>{'2)'}{v.eventType}原因改进措施</div>
                    <TextArea key={`${v.eventType}-4`} value={v?.envetHandle} autosize={{ minRows: 2 }} onInput={(e: any) => handleDetailList(i, { 'envetHandle': e.target.value })} />
                  </>)
              }

              <div className='fw-bold f-large'>四、护理工作中的安全隐患</div>
              <TextArea value={data?.eventHiddenDanger} autosize={{ minRows: 4 }} onInput={(e: any) => { setData(data => ({ ...data, eventHiddenDanger: e.target.value })) }} />
              <div className='fw-bold f-large'>五、预防措施</div>
              <TextArea value={data?.eventPreventMeasure} autosize={{ minRows: 4 }} onInput={(e: any) => { setData(data => ({ ...data, eventPreventMeasure: e.target.value })) }} />
            </Ctx>
          </div>
        </Container>
      </Spin>
    </Wrapper >
  )
})

const Wrapper = styled.div`

`

const Container = styled(ReportContainer)``
const Ctx = styled(ReportCtx)`
>.ant-input {
  margin-bottom: 10px;
}
td, th {
  padding: 5px;
  border: 1px solid #000;
  text-align: center;
}
.f-large {
  font-size: 18px;
  line-height: 32px;
}
.fw-bold {
  font-weight: bold;
}
.ta-center {
  text-align: center;
}
`