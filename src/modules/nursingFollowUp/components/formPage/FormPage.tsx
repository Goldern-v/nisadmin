import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Spin } from 'antd'
import 脑卒中高危人群院内综合干预量表 from './脑卒中高危人群院内综合干预量表'

export interface Props {
  formCode?: string,
  editable?: boolean,
  loading?: boolean,
}

export default function FormPage(props: Props) {
  const { formCode, loading } = props

  const formPageByFormCode = () => {
    if (loading) return (
      <Spin spinning={loading}>
        <div className="page-item"></div>
      </Spin>
    )

    switch (formCode) {
      case '脑卒中高危人群院内综合干预量表':
        return <脑卒中高危人群院内综合干预量表 {...props} />
      default:
        return <div className="page-item"></div>
    }
  }

  return <Wrapper className="form-page-wrapper">
    {formPageByFormCode()}
  </Wrapper >
}

const Wrapper = styled.div`
  margin: 20px auto;
  width: 720px;
  .page-item{
    width: 720px;
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