import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Input, Checkbox, message as Message, Tag, Spin } from 'antd'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import qs from 'qs';
import { Link } from 'react-router-dom'
import NavCon from './../components/common/NavCon'
import LabelSelect from './../components/common/LabelSelect'
import { questionBankManageService } from './../api/QuestionBankManageService'
import { getKskszyDefaultDeptCode, getKskszyDefaultDeptName } from '../utils/kskszyDefaultDeptCode'

export interface Props { }

const TextArea = Input.TextArea;

export default observer(function ChoiceQuestionEdit() {
  const { history, location } = appStore;
  const search = qs.parse(location.search.replace('?', ''));
  const editType = search.id ? 'edit' : 'new';
  const [pageLoading, setPageLoading] = useState(false)

  const [editModel, setEditModel] = useState({
    id: '',
    questionContent: '', //题目内容
    annotation: '', //注解
    answerContent: '',//答案
    deptCode: editType == 'new' ? getKskszyDefaultDeptCode() : '',
    questionLabels: [] as any //标签列表
  })

  useEffect(() => {
    if (search.id) getQuestion(search.id);
  }, [])

  const getQuestion = (id: string) => {
    setPageLoading(true)
    questionBankManageService.getQuestionById(id).then(res => {
      let data = res.data;

      let newEditModel = {
        id: data.id,
        questionContent: data.questionContent,
        annotation: data.annotation,
        deptCode: data.deptCode,
        questionLabels: data.questionLabels,
        answerContent: data.answerContent
      }
      setEditModel(newEditModel);
      setPageLoading(false)
    })
  }

  const replaceRoute = (route: string) => history.replace(route);

  const handleLabelSelected = (label: any) => {
    let newNodel = { ...editModel };
    let { questionLabels } = newNodel;
    if (!label.labelContent) return;

    let sameItems = questionLabels.filter((item: any) => item.labelContent == label.labelContent);
    if (sameItems.length > 0) {
      Message.warning('已存在该标签')
      return;
    }
    questionLabels.push(label)

    setEditModel(newNodel);
  }

  const handleTagDelete = (idx: number) => {
    let newNodel = { ...editModel };
    let { questionLabels } = newNodel;
    questionLabels.splice(idx, 1);

    setEditModel(newNodel);
  }

  const handleSave = () => {
    let params = { ...editModel, bankType: '2' } as any;

    if (search.id) params.id = search.id;

    if (!params.id) delete params.id;

    setPageLoading(true)
    questionBankManageService.saveOrUpdateShortQuestion(params).then(res => {
      if (res.data) replaceRoute(`${location.pathname}?id=${res.data.id}`)

      Message.success('保存成功')
      setPageLoading(false)
    }, err => {
      setPageLoading(false)
    })
  }

  return <Wrapper>
    <div className="header">
      <NavCon>
        <Link to="/continuingEdu">学习培训</Link>
        <span> &gt; </span>
        <Link to="/continuingEdu/科室考试资源库?choiceType=选择题">科室考试资源库</Link>
        <span> &gt; </span>
        <span>问答题维护</span>
      </NavCon>
      <div className="topbar">
        <div className="left">
          <div className="title">
            {editType == 'new' ? '创建题目-问答题' : '修改题目'}
            {editType == 'new' ? `：${getKskszyDefaultDeptName()}` : ''}
          </div>
        </div>
        <div className="right">
          <Button className="item" onClick={handleSave} disabled={pageLoading}>保存</Button>
          <Button className="item" onClick={() => history.goBack()}>返回</Button>
        </div>
      </div>
    </div>
    <div className="main-contain" style={{ overflow: pageLoading ? 'hidden' : 'auto' }}>
      {/* 标题 */}
      <div className="contain-item">
        <div className="item-box">
          <div className="label">标题:</div>
          <div className="content">
            <TextArea
              style={{ width: '700px' }}
              autosize={{ minRows: 2 }}
              value={editModel.questionContent}
              onChange={(e) => setEditModel({ ...editModel, questionContent: e.target.value })} />
          </div>
        </div>
      </div>
      {/* 答案 */}
      <div className="contain-item">
        <div className="item-box">
          <div className="label">答案:</div>
          <div className="content">
            <TextArea
              style={{ width: '700px' }}
              autosize={{ minRows: 2 }}
              value={editModel.answerContent}
              onChange={(e) => setEditModel({ ...editModel, answerContent: e.target.value })} />
          </div>
        </div>
      </div>
      {/* 标签 */}
      <div className="contain-item">
        <div className="item-box">
          <div className="label">标签:</div>
          <div className="content">
            <div className="label-select" style={{ width: '400px' }}>
              <LabelSelect onSelect={handleLabelSelected} />
            </div>
            <div className="label-list" style={{ width: '700px' }}>
              {editModel.questionLabels.map((item: any, idx: number) => <Tag
                key={item.labelContent}
                closable
                className="label-tag"
                color="green"
                onClose={() => handleTagDelete(idx)}>
                {item.labelContent}
              </Tag>)}
            </div>
          </div>
        </div>
      </div>
      {/* 注解 */}
      <div className="contain-item">
        <div className="item-box">
          <div className="label">注解:</div>
          <div className="content">
            <TextArea
              style={{ width: '700px' }}
              autosize={{ minRows: 3 }}
              value={editModel.annotation}
              onChange={(e) => setEditModel({ ...editModel, annotation: e.target.value })} />
          </div>
        </div>
      </div>
      {/* 载入遮罩层 */}
      <div className="loading-mask" style={{ display: pageLoading ? 'block' : 'none' }}>
        <Spin />
      </div>
    </div>
  </Wrapper>
})

const Wrapper = styled.div`
  position: fixed;
  left: 200px;
  top: 48px;
  right: 0px;
  bottom: 0px;
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
    position: relative;
  }
  .contain-item{
    padding: 5px 15px;
    .item-box{
      display: flex;
      background: #fff;
      min-height: 50px;
      border-radius: 5px;
      padding: 10px;
      border-right: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
      min-width: 800px;
      .label{
        width:40px;
        line-height: 30px;
      }
      .content{
        flex:1
      }
      .sub-text{
        color: #999;
        font-size: 12px;
        margin-top: 10px;
      }
      .label-list{
        min-height: 50px;
        .ant-tag{
          margin-top: 10px;
        }
      }
    }
  }
  .loading-mask{
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(255,255,255,0.6);
    .ant-spin{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
    }
  }
  .label-tag{
    border-color: #00A680;
    color: #00A680;
  }
`