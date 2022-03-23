import styled from 'styled-components'
import React, { useState, useEffect, Suspense, lazy, useRef } from 'react'
import { Button, Icon, Spin } from 'antd'
const AllTemplate = lazy(() => import("./formTemplate/AllTemplate"))
const 脑卒中高危人群院内综合干预量表 = lazy(() => import('./脑卒中高危人群院内综合干预量表'))
const 肠造口患者随访表 = lazy(() => import('./肠造口患者随访表'))

export interface Props {
  style?: React.CSSProperties,
  formCode?: string,
  editable?: boolean,
  masterId?: any,
  loading?: boolean,
  itemDataMap?: any,
  master?: any,
  onItemDataMapChange?: Function,
  onMasterChange?: Function
}

export default function FormPage(props: Props) {
  let template = React.useRef()
  const { formCode, loading, style } = props

  const formPageByFormCode = () => {
    if (loading) return (
      <Spin spinning={loading}>
        <div className="page-item"></div>
      </Spin>
    )

    switch (formCode) {
      case 'V0001':
      // return <脑卒中高危人群院内综合干预量表 {...props} />
      // case 'V0002':
      //   return <病毒性肝炎出院随访表 {...props} />
      // case 'V0003':
      //   return <剖宫产产后随访表 {...props} />
      // case 'V0004':
      //   return <异常子宫出血出院随访 {...props} />
      // case 'V0005':
      //   return <妊娠剧吐人群院外综合干预量表 {...props} />
      // case 'V0006':
      //   return <足踝内固定术后患者随访表 {...props} />
      // case 'V0007':
      //   return <髋关节术后出院随访 {...props} />
      // case 'V0008':
      //   return <乳腺癌出院随访 {...props} />
      // case 'V0009':
      //   return <肠造口患者随访表 {...props} />
      // case 'V00010':
      //   return <糖尿病足随访表 {...props} />
      // case 'V0011':
      //   return <肝功能失代偿期患者随便表 {...props} />
      // case 'V0012':
      //   return <慢性鼻窦炎出院随访 {...props} />
      default:
        return <AllTemplate {...props} ref={template} />
      // return <div className="page-item null">
      //   <span className="null-text">
      //     <Icon type="file-exclamation" style={{ marginRight: 10 }} />
      //     <span>暂无对应表单</span>
      //   </span>
      // </div>
    }
  }

  return <Wrapper className="form-page-wrapper" style={style}>
    <Suspense
      fallback={<div className="page-item"></div>}>
      {formPageByFormCode()}
    </Suspense>
  </Wrapper >
}

const Wrapper = styled.div`
  margin: 20px auto;
  width: 760px;
  .page-item{
    width: 760px;
    background-color: #fff;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 5px 10px 0 rgb(0 0 0 / 50%);
    padding: 20px 0;
    box-sizing: border-box;
    width: 760px;
    height: 1000px;
    color: #000;
    font-size: 12px;
    line-height: 12px;
    &.null{
      font-size: 16px;
      color: #999;
      line-height: 500px;
      text-align: center;
    }
    .form-title{
      &>div{
        font-size: 24px;
        line-height: 36px;
      }
      font-weight: bold;
      text-align: center;
    }
    .align-center{
      text-align: center;
    }
    input{
      border: none;
      outline: none;
      
    }
    .underline, input.underline{
      border-bottom: 1px solid #000;
    }
  }
  @media print{
    .white-part{
      background:#fff;
      box-shadow: none!important;
    }
    .white-top{
      box-shadow: none!important;
    }
    .white-bottom{
      box-shadow: none!important;
    }
    .page-item{
      box-shadow: none!important;
      page-break-after: always;
    }
    @page{
      margin:0mm;
    }
    margin:0;
  }
`