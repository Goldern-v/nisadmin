import styled from 'styled-components'
import React, { useState, useEffect, Fragment } from 'react'
import { Button, Steps, message as Message, Spin } from 'antd'
const Step = Steps.Step
import { Link } from 'react-router-dom'
import { appStore } from 'src/stores'
import qs from 'qs'
import { observer } from 'mobx-react-lite'
import { editPageModel } from './../models/editPageModel'
import BookBaseInfoEdit from '../components/editPage/BookBaseInfoEdit'
import BookIndexFilesEdit from '../components/editPage/BookIndexFilesEdit'
import BookPreview from './../components/editPage/BookPreview'
import { nursingRulesApiService } from './../api/nursingRulesNewService'
import { Modal } from 'antd/es'

export interface Props { }

export default observer(function NursingRulesNewEdit() {
  const { history, location } = appStore

  const search = qs.parse(location.search.replace('?', ''))

  const {
    taskName,
    baseParams,
    loading,
    baseInfo,
    baseLoading,
    uploadLoading,
    chapterTotalSize,
    chapterUploadedSize
  } = editPageModel

  const [step, setStep] = useState(0)

  //完成第一步
  const toStep1 = () => {
    if (!baseParams.bookName) {
      Message.error('书籍名称不能为空')
      return
    }

    setStep(1)
  }

  //校验目录和文件
  const checkCatalogAndFiles = () => {
    // 注意：当前有4个目录文件未上传成功，是否继续？
    let unUploadSize = chapterTotalSize - chapterUploadedSize || 0
    if (unUploadSize) {
      Modal.confirm({
        title: '提示',
        content: `注意：当前有${unUploadSize}个目录文件未上传成功，是否继续？`,
        onOk: () => {
          setStep(2)
        }
      })
    } else {
      setStep(2)
    }
  }

  //提交审核
  const handleSendAudit = () => {
    editPageModel.setBaseLoading(true)

    let { bookId, taskCode, taskType } = baseInfo

    let params = { ...baseParams, taskCode } as any

    nursingRulesApiService
      .updateTaskBookInfo(params)
      .then(res => {
        if (res.code == '200')
          return nursingRulesApiService
            .submitToAudit(taskCode)
      })
      .then(res => {
        Message.success('提交审核成功', 0.5, () => {
          editPageModel.setBaseLoading(false)
          history.goBack()
        })
      })
      .catch(() => editPageModel.setBaseLoading(false))
  }

  const StepBtns = () => {
    let stepBtnList = [
      <Fragment>
        <Button disabled>上一步</Button>
        <Button disabled={loading} onClick={toStep1}>下一步</Button>
      </Fragment>
      ,
      <Fragment>
        <Button disabled={loading} onClick={() => setStep(0)}>上一步</Button>
        <Button disabled={loading || uploadLoading} onClick={() => checkCatalogAndFiles()}>下一步</Button>
      </Fragment>
      ,
      <Fragment>
        <Button disabled={loading} onClick={() => setStep(1)}>上一步</Button>
        <Button disabled={loading} onClick={handleSendAudit}>提交审核</Button>
      </Fragment>
    ]

    return <BtnGroup>{stepBtnList[step]}</BtnGroup>
  }

  const StepPannel = () => {
    switch (step) {
      case 0:
        return <BookBaseInfoEdit />
      case 1:
        return <BookIndexFilesEdit />
      case 2:
        return <BookPreview />
      default:
        return <span></span>
    }
  }

  useEffect(() => {
    editPageModel.inited(search);
  }, [])

  return <Wrapper>
    <div className="topbar">
      <NavCon>
        <Link to="/nursingRulesNew">护理制度</Link>
        <span> {'>'} </span>
        <span>{taskName}</span>
      </NavCon>
      <div className="edit-title">
        {taskName}
        <Button className="cancel" onClick={() => history.goBack()}>取消</Button>
      </div>
    </div>
    <div className="step-pannel">
      <Steps current={step}>
        <Step title="设置书籍" />
        <Step title="设置目录" />
        <Step title="完成" />
      </Steps>
    </div>
    <div className="content-pannel">
      {StepPannel()}
      <div className="mask" style={{ display: baseLoading ? 'block' : 'none' }}>
        <Spin />
      </div>
    </div>
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
      .cancel{
        float: right;
      }
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
    .mask{
      text-align: center;
      background: rgba(255,255,255,0.5);
      border-radius: 4px;
      margin-bottom: 20px;
      position: fixed;
      top: 104px;
      left: 0;
      width: 100%;
      bottom: 0;
      span.ant-spin-dot.ant-spin-dot-spin {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -14px;
        margin-top: -14px;
      }
    }
  }
`
const BtnGroup = styled.div`
  position: fixed;
  bottom: 0;
  padding: 5px 10px;
  /* border-top: 1px solid #ddd; */
  background:rgba(247,247,247,1);
  width: 100%;
  /* background: #fff; */
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