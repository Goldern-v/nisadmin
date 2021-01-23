import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import BaseTabs from "src/components/BaseTabs";
import { observer } from 'mobx-react-lite'
import { appStore } from "src/stores";
import { hjExamApi } from './api/HjExamApi'
import { hjExamModal } from './HjExamModal'
import ExamStatistics from './components/ExamStatistics'
import ExamAnalyse from './components/ExamAnalyse'
import ExamExcel from './components/ExamExcel'
import printing from "printing";
import { useRef } from "src/types/react";
import ExamPrint from './components/ExamPrint'

export interface Props { }

//查看考试结果
export default observer(function HjExamResultAnalyse() {
  const [headCont, setHeadCont]: any = useState([])// tabs顶部数据
  const printRef: any = useRef(null);

  // 初始化tabs顶部数据
  useEffect(() => {
    hjExamApi.getInfo(appStore.queryObj.id).then(res => {
      if (res.data) setHeadCont(res.data || [])
    }).catch(err => console.log(err))
  }, [])

  // 打印表单
  const onPrint = async () => {
    await printing(printRef.current, {
      scanStyles: false,
      injectGlobalCss: true,
      css: `
           @page {
             margin: 10mm;
           }
           #wardLogPrintPage {
             display: inline!important;
             margin: 0;
             border: 0;
           }
        `
    });
  };


  return (
    <Wrapper>
      <HeadCont>
        <span>考试时间：{`${headCont.startTime} ~ ${headCont.endTime}`}</span>
        <span>参加人数：{headCont.totalPersonCount}</span>
        <span>实际参加人数：{headCont.finishedPersonCount}</span>
      </HeadCont>
      <HeadBtn>
        <Button style={{ marginRight: '20px' }} onClick={() => hjExamModal.export()}>导出</Button>
        <Button type="primary" style={{ marginRight: '20px' }} onClick={() => onPrint()}>打印当前页</Button>
        <Button>刷新</Button>
      </HeadBtn>
      <BaseTabs
        defaultActiveKey={hjExamModal.keyIdx}
        config={
          [
            {
              title: '考试情况统计',
              index: "0",
              component: <ExamStatistics />
            },
            {
              title: '考试情况分析',
              index: "1",
              component: <ExamAnalyse />
            },
            {
              title: '考试分析报表',
              index: "2",
              component: <ExamExcel />
            }
          ]
        }
        onChange={(key: string) => {
          hjExamModal.keyIdx = key;
        }}
      />
      <ExamPrint printRef={printRef} />
    </Wrapper>
  )
})

const Wrapper = styled.div`
  height: 100%;
  position: relative;
`
const HeadCont = styled.div`
  font-weight: 900;
  position: absolute;
  left: 380px;
  top: 12px;
  z-index: 1000 !important;
  span {
    margin-right: 25px;
  }
`
const HeadBtn = styled.div`
  position: absolute;
  right: 20px;
  top: 5px;
  z-index: 1000 !important;
`


