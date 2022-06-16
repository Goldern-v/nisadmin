import { Input } from 'antd'
import { observer } from 'mobx-react'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { getCodeLength } from 'src/utils/string'
const indexObj = ['causeAnalysisPeople','causeAnalysisMachine','causeAnalysisThing','causeAnalysisLaw','causeAnalysisRing']

export interface Props {
  value: any
  onChange?: Function,
  isEdit?: boolean
}
export default observer(function FishBon(props: Props) {
  const { value, onChange, isEdit = false} = props
  useEffect(() => {
    if (value) {
      setObj(value)
    }
  }, [value])
  const [obj, setObj] = useState({
    causeAnalysisPeople: '',
    causeAnalysisMachine: '',
    causeAnalysisThing: '', 
    causeAnalysisLaw: '',
    causeAnalysisRing: '',
    causeAnalysisQuestion: ''
  })
  const [isFocus, setIsFocus] = useState(false)
  const [curVal, setCurVal] = useState<any>({ value: '', key: ''})
  const iptRef: any = useRef()
  // 点击鱼刺，聚焦文本框
  const changeFocus = (key: string) => {
    if (!isEdit) return
    setCurVal({
      key,
      value: obj[key]
    })
    let index = indexObj.findIndex(v => v == key)
    let style: Record<string, any> = {
      width: `calc(100% / ${index>2 ? 2 : 3})`,
      left: index % 3 == 0 ? '0px' : `calc(100% / ${index>2 ? 2 : 3} * ${index%3})`
    }
    if (index > 2) {
      style.bottom = '30px'
    } else {
      style.top = '30px'
    }
    setIptSty(style)
    setIsFocus(true)
    setTimeout(() => {
      iptRef.current && iptRef.current.focus()
    }, 200)
  }
  // onChange
  const changeCurVal = (e: any) => {
    // 限制行数，字数
    const index = indexObj.findIndex(v => v == curVal.key)
    const maxLen = [16, 16, 20, 26, 26][index]
    let {value} = e.target
    const lineList = value.split('\n')
    if (lineList.length > 6) return
    else {
      let len = 0
      lineList.map((v:string) => {
        const vLen = getCodeLength(v)
        len += Math.ceil(vLen / maxLen)
      })
      if (len > 6) return
    }
    setCurVal({ ...curVal, value})
    setObj({ ...obj, [curVal.key]: value})
  }
  // 隐藏文本框
  const handleBlur = () => {
    setIsFocus(false)
    setCurVal({ value: '', key: ''})
    onChange && onChange(obj)
  }
  // 文本框的类
  const [iptSty, setIptSty] = useState<Record<string,any>>({})

  return (
    <Wrapper boneTitle={['人','机','物','法','环']}>
      <div className='body'>
        <div className='body-item'>
          <div className='body-bone' onClick={() => {changeFocus('causeAnalysisPeople')}}></div>
          <div className='body-bone'></div>
          <div className='body-item__text' onClick={() => {changeFocus('causeAnalysisPeople')}}>{obj.causeAnalysisPeople}</div>
        </div>
        <div className='body-item'>
          <div className='body-bone' onClick={() => {changeFocus('causeAnalysisMachine')}}></div>
          <div className='body-bone'></div>
          <div className='body-item__text' onClick={() => {changeFocus('causeAnalysisMachine')}}>{obj.causeAnalysisMachine}</div>
        </div>
        <div className='body-item'>
          <div className='body-bone' onClick={() => {changeFocus('causeAnalysisThing')}}></div>
          <div className='body-item__text' onClick={() => {changeFocus('causeAnalysisThing')}}>{obj.causeAnalysisThing}</div>
        </div>
        <div className='body-item'>
          <div className='body-bone' onClick={() => {changeFocus('causeAnalysisLaw')}}></div>
          <div className='body-bone'></div>
          <div className='body-item__text' onClick={() => {changeFocus('causeAnalysisLaw')}}>{obj.causeAnalysisLaw}</div>
        </div>
        <div className='body-item'>
          <div className='body-bone' onClick={() => {changeFocus('causeAnalysisRing')}}></div>
          <div className='body-item__text' onClick={() => {changeFocus('causeAnalysisRing')}}>{obj.causeAnalysisRing}</div>
        </div>
        {isFocus && isEdit && (<Input.TextArea ref={iptRef} rows={6} value={curVal.value} style={iptSty} onChange={(e: any) => changeCurVal(e)} onBlur={() => handleBlur()} />)}
      </div>
      <div className='head'>
        <div>问题:</div>
        {!isEdit && <div>{obj.causeAnalysisQuestion}</div>}
        {isEdit && <Input.TextArea rows={6} value={obj.causeAnalysisQuestion} onChange={e=> {
          setObj({ ...obj, causeAnalysisQuestion: e.target.value })
          onChange && onChange({ ...obj, causeAnalysisQuestion: e.target.value })
        }} />}
      </div>
    </Wrapper>
  )
})

const Wrapper = styled.div<{boneTitle: string[]}>`
  display: flex;
  align-items: center;
  .body {
    padding-left: 60px;
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    position: relative;
    .body-item {
      height: 150px;
      width: calc(100% / 3 + 60px);
      margin-left: -60px;
      position: relative;
      .body-item__text {
        white-space: pre-line;
        padding: 30px 0 5px;
        font-size: 13px;
        line-height: 17px;
        height: 100%;
        box-sizing: border-box;
        cursor: pointer;
      }
    }

    .body-bone {
      float: left;
      height: 150px;
      width: 60px;
      shape-outside: polygon(0 0, 2px 0,100% 100%,calc(100% - 2px) 100%, 0 0);
      &:first-child {
        position: relative;
        &::before {
          position: absolute;
          content: '';
          border-left: 1px solid #000;
          top: 30px;
          bottom: 1px;
          left: 30px;
          transform: rotate(-22deg);
        }
        &::after {
          position: absolute;
          border: 1px solid #000;
          padding: 1px 2px;
        }
      }
      &:nth-child(2) {
        float: right;
      }
    }
    .body-item:nth-child(n + 4) {
      width: calc(100% / 2 + 60px) !important;
      .body-item__text {
        padding: 5px 0 30px;
      }
      .body-bone {
        shape-outside: polygon(100% 0,calc(100% - 2px) 0,0 100%, 2px 100%,100% 0);
        &:first-child {
          &::before {
            transform: rotate(22deg);
            top: 1px;
            bottom: 30px;
            left: 36px;
          }
          &::after {
            bottom: 0px;
          }
        }
      }
    }
    
    ${p => {
      return p.boneTitle.map((v, i) => {
        return `
          .body-item:nth-child(${i + 1}) .body-bone:first-child::after {
            content: '${v}';
          }
        `
      }).join('')
    }}
    &::before {
      position: absolute;
      content: '';
      width: 100%;
      background: #bbe0e3;
      height: 10px;
      right: 0;
      top: calc(50% - 5px);
    }
    .ant-input {
      position: absolute;
      left: 0px;
      z-index: 10;
    }
  }

  
  .head {
    width: 120px;
    height: 160px;
    position: relative;
    white-space: pre-line;
    &::before {
      position: absolute;
      content: '';
      width: 100%;
      height: 100%;
      background-color: #bbe0e3;
      clip-path: polygon(0 0, 0 100%,100% 50%);
      z-index: 0;
    }
    >div {
      position: relative;
      z-index: 3;
    }
  }
  .body-item__text {
    word-break:break-all;
  }
  .ant-input {
    font-size: 13px;
    line-height: 17px;
  }
`