import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Steps } from 'antd'
const Step = Steps.Step
import { Link } from 'react-router-dom'

export interface Props { }

export default function NursingRulesNewEdit() {
  const title = '新建书籍'

  return <Wrapper>
    <div className="topbar">
      <NavCon>
        <Link to="/nursingRulesNew">护理制度</Link>
        <span> > </span>
        <span>{title}</span>
      </NavCon>
      <div className="edit-title">{title}</div>
    </div>
    <div className="step-pannel">
      <Steps current={1}>
        <Step title="设置书籍" />
        <Step title="设置目录" />
        <Step title="完成" />
      </Steps>
    </div>
  </Wrapper>
}
const Wrapper = styled.div`
  background:#fff;
  width: 100%;
  height:100%;
  overflow: hidden;
  .topbar{
    padding: 10px;
    border-bottom: 1px solid #ddd;
    .edit-title{
      font-size: 20px;
      color: #000;
      font-weight: bold;
    }
  }
  .step-pannel{
    width: 50%;
    padding: 15px;
  }
`

const NavCon = styled.div`
  a{
    color: #666;
    :hover{
      color: #333;
    }
  }
  span{
    color: #888
  }
  margin-bottom: 5px;
`