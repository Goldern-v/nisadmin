import styled from 'styled-components'
import React, { useState, useEffect, Fragment } from 'react'
import { Button, Steps } from 'antd'
const Step = Steps.Step
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { editPageModel } from './../models/editPageModel'
import BookFileEdit from './../components/editPage/BookFileEdit'
import BookIndexEdit from './../components/editPage/BookIndexEdit'
import BookPreview from './../components/editPage/BookPreview'

export interface Props { }

export default observer(function NursingRulesNewEdit() {
  const title = '新建书籍'

  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false);

  const { baseParams } = editPageModel;

  const toStep1 = () => {
    setStep(1)
  }

  const StepBtns = () => {
    let stepBtnList = [
      <Fragment>
        <Button disabled>上一步</Button>
        <Button disabled={loading} onClick={toStep1}>下一步</Button>
      </Fragment>
      ,
      <Fragment>
        <Button disabled={loading}>上一步</Button>
        <Button disabled={loading}>下一步</Button>
      </Fragment>
      ,
      <Fragment>
        <Button disabled={loading}>上一步</Button>
        <Button disabled={loading}>提交审核</Button>
      </Fragment>
    ]

    return <BtnGroup>{stepBtnList[step]}</BtnGroup>
  }

  const StepPannel = () => {
    switch (step) {
      case 0:
        return <BookFileEdit />
      case 1:
        return <BookIndexEdit />
      case 2:
        return <BookPreview />
      default:
        return <span></span>
    }
  }

  useEffect(() => {
    editPageModel.inited();
  }, [])

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
      <Steps current={step}>
        <Step title="设置书籍" />
        <Step title="设置目录" />
        <Step title="完成" />
      </Steps>
    </div>
    <div className="content-pannel">{StepPannel()}</div>
    {StepBtns()}
  </Wrapper>
})

const scrollBarStyle = `
::-webkit-scrollbar {
  width: 8px;
  height: 10px;
}
::-webkit-scrollbar-thumb {
  border-radius: 5px;
  box-shadow: inset 0 0 8px rgba(0,0,0,0.2);
  background: rgba(0,0,0,0.1);
}
::-webkit-scrollbar-track {
  background-color: #ddd;
}
`

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
  .content-pannel{
    position: fixed;
    top: 183px;
    bottom: 43px;
    left: 0;
    background: #fff;
    width: 100%;
    overflow:auto;
    border-top: 1px solid #eee;
    ${scrollBarStyle}
  }
`
const BtnGroup = styled.div`
  position: fixed;
  bottom: 0;
  padding: 5px 10px;
  border-top: 1px solid #ddd;
  width: 100%;
  background: #fff;
  .ant-btn{
    margin-right: 10px;
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