import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Input } from 'antd'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import qs from 'qs';

export interface Props { }

const TextArea = Input.TextArea;

export default observer(function ChoiceQuestionEdit() {
  const { history, location } = appStore;
  const search = qs.parse(location.search.replace('?', ''));
  const editType = search.id ? 'edit' : 'new';

  const [editModel, setEditModel] = useState({
    questionContent: '', //题目内容
    annotation: '', //注解
    choiceQuestionList: [] as any, //答案序列
    labelList: [] as any //标签列表
  })

  const replaceRoute = (route: string) => history.replace(route)

  return <Wrapper>
    <div className="header">
      <div className="nav">
        <span onClick={() => replaceRoute('/continuingEdu')} className="nav-item">培训考试</span>
        <span> > </span>
        <span onClick={() => replaceRoute('/continuingEdu/questionBankManagement?choiceType=选择题')} className="nav-item">题库管理</span>
        <span> > </span>
        <span>选择题维护</span>
      </div>
      <div className="topbar">
        <div className="left">
          <div className="title">{editType == 'new' ? '创建题目-选择题' : '修改题目'}</div>
        </div>
        <div className="right">
          <Button className="item">保存</Button>
          <Button className="item">返回</Button>
        </div>
      </div>
    </div>
    <div className="main-contain">
      <div className="contain-item">
        <div className="item-box">
          <div className="label">标题:</div>
          <div className="content">

          </div>
        </div>
      </div>
    </div>
  </Wrapper>
})

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 80px;
  .header{
    padding: 10px 15px;
    overflow: hidden;
    margin-top: -80px;
    border-bottom: 1px solid #ddd;
    background: #fff;
    .nav{
      margin-bottom: 5px;
      color: #888;
      .nav-item{
        color: #666;
        cursor: pointer;
        :hover{
          color: #333;
        }
      }
    }
    .topbar{
      &>div{
        display: inline-block;
      }
      .left{
        float:left;
        .title{
          font-size: 22px;
          font-weight: bold;
        }
      }
      .right{
        float:right;
        .item{
          margin-left: 5px;
        }
      }
    }
  }
  
  .main-contain{
    width: 100%;
    height: 100%;
    overflow: auto;
  }
  .contain-item{
    .item-box{
      display: flex;
      .label{
        width:
      }
      .content{
        flex:1
      }
    }
  }
`