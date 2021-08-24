import styled from 'styled-components'
import React, { useState, useEffect, Suspense, lazy } from 'react'
import { Button, Spin } from 'antd'
const 脑卒中高危人群院内综合干预量表 = lazy(() => import('./脑卒中高危人群院内综合干预量表'))

export interface Props {
  style?: React.CSSProperties,
  formCode?: string,
  editable?: boolean,
  loading?: boolean,
  itemDataMap?: any,
  master?: any,
  onItemDataMapChange?: Function,
  onMasterChange?: Function
}

export default function FormPage(props: Props) {
  const { formCode, loading, style } = props

  const formPageByFormCode = () => {
    if (loading) return (
      <Spin spinning={loading}>
        <div className="page-item"></div>
      </Spin>
    )

    switch (formCode) {
      case 'V0001':
        return <脑卒中高危人群院内综合干预量表 {...props} />
      default:
        return <div className="page-item"></div>
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
`