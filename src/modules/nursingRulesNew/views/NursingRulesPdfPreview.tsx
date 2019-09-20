import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { BaseStepCon, BaseStepBox } from 'src/components/BaseStep'
import GroupAuditModal from './../components/GroupAuditModal'
export interface Props { }

export default function NursingRulesPdfPreview() {
  const ruleName = '书籍名称'
  const chapterName = '章节名称'

  const [auditCfg, setAuditCfg] = useState({
    visible: false,
    params: {
      audit: true,
    }
  })

  const leftControl = [
    {
      name: '目录',
      icon: '',
      onClick: () => {

      }
    },
    {
      name: '收藏',
      icon: '',
      onClick: () => {

      }
    },
    {
      name: '上一章',
      icon: '',
      onClick: () => {

      }
    },
    {
      name: '下一章',
      icon: '',
      onClick: () => {
        console.log('下一章')
      }
    }
  ]

  const rightControl = [
    {
      name: '首页',
      onClick: () => {

      }
    }, {
      name: '上一页',
      onClick: () => {

      }
    }, {
      name: '下一页',
      onClick: () => {

      }
    }, {
      name: '末页',
      onClick: () => {

      }
    }
  ]

  const handleAudit = (audit: boolean) => {
    setAuditCfg({ ...auditCfg, params: { audit: audit }, visible: true })
  }


  const handleAuditOk = () => {
    handleAuditCancel();
  }

  const handleAuditCancel = () => {
    setAuditCfg({ ...auditCfg, visible: false })
  }

  return <Wrapper>
    <div className="topbar">
      <NavCon>
        <Link to="/nursingRulesNew">护理制度</Link>
        <span> > </span>
        <Link to="/nursingRulesNewDetail">{ruleName}</Link>
        <span> > </span>
        <span>{chapterName}</span>
      </NavCon>
      <div className="fl-right">
        <Button onClick={() => handleAudit(true)} type="primary">审核</Button>
      </div>
    </div>
    <div className="main-contain">
      <div className="audit-content">
        <TopTitleCon>
          <div className='topTitleIcon' />
          <div className='topTitle'>审核过程</div>
        </TopTitleCon>
        <BaseStepCon>
          <BaseStepBox success={'success'}>
            <StepBox>
              <div className="title">提交书籍</div>
              <div>王大锤 2019-08-19 12:00</div>
            </StepBox>
          </BaseStepBox>
          <BaseStepBox success={''}>
            <StepBox>
              <div className="title">护理部审核</div>
              <div>审核中 耗时10小时</div>
            </StepBox>
          </BaseStepBox>
        </BaseStepCon>
      </div>
      <div className="preview-content">
        <div className="left-control">
          {leftControl.map((item: any, idx: number) => {
            return <div className="item" onClick={() => item.onClick()} key={idx}>
              <div className="icon"></div>
              <div className="text">{item.name}</div>
            </div>
          })}
        </div>
        <div className="right-control">
          {rightControl.map((item: any, idx: number) => <div className="item" onClick={() => item.onClick()} key={idx}>{item.name}</div>)}
        </div>
        <div className="scroll-warpper">
          <div className="pdf-content">
            <div className="preview-frame">
              <iframe src="/crNursing/asset/nursingInstitution/20190718/201907181417354v8sKZ3s.pdf#toolbar=0" />
            </div>
          </div>
          <div className="page-info">第1页/共3页</div>
        </div>
      </div>
    </div>
    <GroupAuditModal visible={auditCfg.visible} defaultParams={auditCfg.params} onOk={handleAuditOk} onCancel={handleAuditCancel} title="审核" />
  </Wrapper>
}
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
  height: 100%;
  width:100%;
  .topbar{
    padding: 10px;
    background: #fff;
    border-bottom: 1px solid #ddd;
    .fl-right{
      float: right;
      margin-top: -4px;
    }
  }
  .main-contain{
    position: fixed;
    left: 0;
    right: 0;
    top: 94px;
    bottom: 0;
  }
  .audit-content{
    float: right;
    width: 260px;
    background: #fff;
    border-left: 1px solid #ddd;
    height: 100%;
    padding: 20px;
  }
  .preview-content{
    overflow:hidden;
    height: 100%;
    position: relative;
    .scroll-warpper{
      width: 100%;
      height: 100%;
      padding: 15px 0;
      overflow: auto;
      ${scrollBarStyle}

      .pdf-content{
        width: 700px;
        margin: 0 auto;
        // height: 800px;
        position: absolute;
        top: 15px;
        bottom: 45px;
        left: 50%;
        transform: translate(-350px);
        background: #fff;
        border: 1px solid #ddd;
      }
    
      .preview-frame{
        height: 100%;
        iframe{
          width: 100%;
          height: 100%;
          border: 0;
        }
      }

      .page-info{
        position: absolute;
        width: 100%;
        text-align:center;
        left: 0;
        bottom: 5px;
        height: 30px;
        line-height: 30px;
      }
    }
    .left-control{
      position: absolute;
      left: 50%;
      top: 15px;
      width: 100px;
      background: #fff;
      transform: translate(-464px);
      border: 1px solid #ddd;
      .item{
        width: 100%;
        height: 98px;
        border-bottom: 1px solid #ddd;
        cursor: pointer;
        overflow: hidden;
        &:last-of-type{
          border-bottom: none;
        }
        :hover{
          .text{
            color:#00A680;
          }
        }
        .icon{
          height: 50px;
          width: 50px;
          background: #ddd;
          margin: 10px auto 8px;
        }
        .text{
          font-size: 16px;
          text-align: center;
        }
      }
    }
    .right-control{
      position: absolute;
      right: 50%;
      top: 15px;
      width: 100px;
      background: #fff;
      transform: translate(460px);
      border: 1px solid #ddd;
      .item{
        width: 100%;
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #ddd;
        cursor: pointer;
        text-align: center;
        font-size: 16px;
        &:last-of-type{
          border-bottom: none;
        }
        :hover{
          color:#00A680;
        }
      }
    }
  }
`

const NavCon = styled.div`
  display:inline-block;
  line-height: 24px;
  a{
    color: #666;
    :hover{
      color: #333;
    }
  }
  span{
    color: #888
  }
`

const TopTitleCon = styled.div`
  margin-bottom: 16px;
  .topTitleIcon {
    margin-left: -5px;
    display: inline-block;
    width: 6px;
    height: 12px;
    background: rgba(75, 176, 141, 1);
  }
  .topTitle {
    margin-left: 10px;
    display: inline-block;
    font-size: 16px;
    color: #333333;
  }
  `

const StepBox = styled.div`
  padding-bottom: 10px;
  * {
    font-size: 12px;
  }
  .title {
    color: #000;
    font-weight: bold;
    margin-bottom: 5px;
  }
  .info,
  .date,
  .nodo {
    color: #687179;
    margin-bottom: 3px;
  }
  .text-box {
    color: 12px;
    background: #e6eceb;
    border-radius: 2px;
    padding: 10px 12px;
    margin: 5px 0 0;
    .text-box-title {
      font-weight: bold;
    }
  }
`