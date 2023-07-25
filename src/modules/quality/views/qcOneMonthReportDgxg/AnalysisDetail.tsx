import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Button, message as Message, Modal } from 'antd'
// import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { withRouter } from 'react-router-dom'
export interface Props extends RouteComponentProps {}

export default withRouter(
  observer(function AnalysisDetail(props: any) {
    const { history, match } = props

    const handlePublish = () => {
      let content = (
        <div>
          <div>您确定要发布《2019年3月份xxxxx报告》吗？</div>
          <div>发布后将推送至护理部及护士长手机上。</div>
        </div>
      )
      Modal.confirm({
        title: '发布报告',
        content,
        okText: '确定',
        okType: 'primary',
        cancelText: '取消',
        centered: true,
        onOk: () => {
          console.log('ok')
        }
      })
    }

    const handleEdit = () => {
      let id = ''
      if (match.params.id) id = match.params.id

      history.push(`/qualityAnalysisReport/${id}`)
    }

    return (
      <Wrapper>
        <div className='topbar'>
          <div className='title'>2019年3月份XXXXXXXX表单分析报告</div>
          <div className='sub'>由王大锤创建，最后修改于2019-01-01 10:00:00</div>
          <div className='btn-group'>
            <Button onClick={handleEdit}>编辑</Button>
            <Button onClick={handlePublish}>发布</Button>
            <Button>返回</Button>
          </div>
        </div>
        <div className='main-contain'>
          <div className='page' />
        </div>
      </Wrapper>
    )
  })
)

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  padding-top: 60px;
  .topbar{
    position: absolute;
    top: 0;
    left:0;
    width: 100%;
    height: 60px;
    background: #fff;
    padding: 0px 20px;
    border-bottom: 1px solid #ddd;

    .title{
      font-size: 20px;
      color: #000;
      line-height: 26px;
      margin-bottom: 5px;
    }

    .sub{
      color: #999;
    }
    
    .btn-group{
      position: absolute;
      right: 15px;
      top: 2px;
      .ant-btn{
        margin-left: 10px;
      }
    }
  }

  .main-contain{
    height: 100%;
    width: 100%;
    padding: 15px 0;
    overflow-y:auto;
    .page{
      background: #fff;
      border: 1px solid #ddd;
      width: 720px;
      margin: 0 auto;
      min-height: 100%;
    }
  }
`
