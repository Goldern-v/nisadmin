import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Progress } from 'antd'
export interface Props {
  visible?: any,
  loading?: string
}

let timeout: any = null;

export default function AnalysisCreateProgress(props: Props) {
  const { visible, loading } = props
  let [progress, setProgress] = useState(0);
  let [autoPushTime, setAutoPushTime] = useState(0)

  useEffect(() => {
    autoProgress();
  }, [autoPushTime]);

  useEffect(() => {
    switch (loading) {
      case 'done':
        setProgress(100)
        setAutoPushTime(0)
        break
      case 'failed':
        setAutoPushTime(5)
        break
      case 'start':
        setProgress(0)
        setAutoPushTime(5)
        break
      default:
        setProgress(0)
        setAutoPushTime(0)
    }
  }, [loading])

  const autoProgress = () => {
    if (!visible) return;
    if (loading != 'start') return;

    timeout = setTimeout(() => {
      clearTimeout(timeout);
      if (autoPushTime > 0 && progress <= 100 && loading == 'start') {
        console.log(loading)
        setProgress(progress + 10)
        setAutoPushTime(autoPushTime - 1)
      }
    }, 1000)
  }

  const loadingBg = () => {
    switch (loading) {
      case 'done':
        return '#00A680'
      case 'failed':
        return 'red'
      case 'start':
        return 'cadetblue'
      default:
        return ''
    }
  }

  const loadingText = () => {
    clearTimeout(timeout);
    switch (loading) {
      case 'done':
        return '生成分析报告成功'
      case 'failed':
        return '生成分析报告失败'
      case 'start':
        return '正在生成分析报告，请稍等...'
      default:
        return ''
    }
  }

  return <Wrapper style={{ display: visible ? 'block' : 'none' }}>
    <div className="center">
      <div className="title">{loadingText()}</div>
      <div className="progress-bar">
        <div className="progress-content" style={{ width: `${progress}%`, background: loadingBg() }}></div>
      </div>
    </div>
  </Wrapper>
}
const Wrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #eee;
  z-index: 1;

  .center{
    position: absolute;
    left: 50%;
    top: 50%;
    width: 60%;
    transform: translate(-50%,-50%);
    .title{
      text-align: center;
      font-size: 16px;
      font-weight: bold;
      line-height: 36px;
    }
    .progress-bar{
      width: 100%;
      border: 1px solid #ddd;
      height: 40px;
      background: #fff;
      overflow: hidden;
      .progress-content{
        height: 40px;
        background: #00A680;
        transition: width .5s;
      }
    }
  }
`