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
    choiceQuestionList: [] as any, //答案序列
    labelList: [] as any, //标签列表
    random: false
  })

  useEffect(() => {
    if (search.id) getQuestion(search.id);
  }, [])

  const getQuestion = (id: string) => {
    setPageLoading(true)
    questionBankManageService.getQuestionById(id).then(res => {
      let data = res.data;
      let choiceQuestionList = data.choiceQuestionList
        .sort((a: any, b: any) => a.serialNum - b.serialNum)
        .map((item: any) => {
          return {
            answerContent: item.answerContent,
            isRight: item.isRight
          }
        });

      let newEditModel = {
        id: data.id,
        questionContent: data.questionContent,
        annotation: data.annotation,
        choiceQuestionList,
        labelList: data.labelList,
        random: data.random || false
      }
      setEditModel(newEditModel);
      setPageLoading(false)
    })
  }

  const replaceRoute = (route: string) => history.replace(route);

  const handleChoiceDelete = (idx: number) => {
    let newNodel = { ...editModel };
    newNodel.choiceQuestionList.splice(idx, 1);

    setEditModel(newNodel);
  }

  const addChoice = () => {
    let newNodel = { ...editModel };
    newNodel.choiceQuestionList.push({
      answerContent: "",
      isRight: false
    });
    setEditModel(newNodel);
  }

  const handleToogleRight = (item: any, idx: number) => {
    let newNodel = { ...editModel };
    newNodel.choiceQuestionList.splice(idx, 1, { ...item, isRight: !item.isRight })

    setEditModel(newNodel);
  }

  const handleAnswerContentChange = (e: any, item: any, idx: number) => {
    let answerContent = e.target.value;
    let newNodel = { ...editModel };
    newNodel.choiceQuestionList.splice(idx, 1, { ...item, answerContent })

    setEditModel(newNodel);
  }

  const handleChoiceMove = (idx: number, up: boolean) => {
    let newNodel = { ...editModel };
    let { choiceQuestionList } = newNodel
    let switchIdx = idx - 1;
    if (up) switchIdx = idx + 1;
    let item = { ...choiceQuestionList[idx] };
    let swithItem = { ...choiceQuestionList[switchIdx] };
    choiceQuestionList[idx] = swithItem;
    choiceQuestionList[switchIdx] = item;

    setEditModel(newNodel);
  }

  const handleLabelSelected = (label: any) => {
    let newNodel = { ...editModel };
    let { labelList } = newNodel;
    console.log(newNodel)
    if (!label.labelContent) return

    let sameItems = labelList.filter((item: any) => item.labelContent == label.labelContent);
    if (sameItems.length > 0) {
      Message.warning('已存在该标签')
      return;
    }
    labelList.push(label)

    setEditModel(newNodel);
  }

  const handleTagDelete = (idx: number) => {
    let newNodel = { ...editModel };
    let { labelList } = newNodel;

    let newList = labelList.concat()
    newList.splice(idx, 1)

    newNodel.labelList = newList
    console.log(newNodel)
    setEditModel(newNodel);
  }

  const handleSave = () => {
    let params = { ...editModel, bankName: '医院题库' };

    params.choiceQuestionList = params.choiceQuestionList.map((item: any, idx: number) => {
      return {
        ...item,
        questionOption: String.fromCharCode(65 + idx)
      }
    });

    if (search.id) params.id = search.id;

    if (!params.id) delete params.id;

    setPageLoading(true)
    questionBankManageService.saveOrUpdateChoiceQuestion(params).then(res => {
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
        <span> > </span>
        <Link to="/continuingEdu/questionBankManagement?choiceType=选择题">题库管理</Link>
        <span> > </span>
        <span>选择题维护</span>
      </NavCon>
      <div className="topbar">
        <div className="left">
          <div className="title">{editType == 'new' ? '创建题目-选择题' : '修改题目'}</div>
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
              style={{ width: 700 }}
              autosize={{ minRows: 2 }}
              value={editModel.questionContent}
              onChange={(e) => setEditModel({ ...editModel, questionContent: e.target.value })} />
          </div>
        </div>
      </div>
      {/* 选项 */}
      <div className="contain-item">
        <div className="item-box">
          <div className="label">选项:</div>
          <div className="content">
            {editModel.choiceQuestionList.map((item: any, idx: any) => {
              return <div className="choiceItem" key={idx}>
                <span className="idx">{String.fromCharCode(65 + idx)}.</span>
                <TextArea
                  style={{ width: 400, overflow: 'hidden' }}
                  autosize={{ minRows: 1 }}
                  value={item.answerContent}
                  className="answerContent"
                  onChange={(e) => handleAnswerContentChange(e, item, idx)} />
                <Checkbox checked={item.isRight} onClick={() => handleToogleRight(item, idx)} />
                <Button size="small" disabled={idx <= 0} onClick={() => handleChoiceMove(idx, false)}>上移</Button>
                <Button size="small" disabled={idx >= editModel.choiceQuestionList.length - 1} onClick={() => handleChoiceMove(idx, true)}>下移</Button>
                <Button size="small" disabled={editModel.choiceQuestionList.length <= 1} onClick={() => handleChoiceDelete(idx)}>删除</Button>
              </div>
            })}
            <div className="choiceItem">
              <span className="idx">  </span>
              <Button type="dashed" style={{ width: '400px' }} onClick={addChoice}>新增</Button>
            </div>
            {/* <div className="choiceItem" onClick={() => setEditModel({ ...editModel, random: !editModel.random })}>
              <span>
                <Checkbox checked={editModel.random} />
              </span>
              <span style={{ cursor: 'pointer' }}>选项允许随机</span>
            </div> */}
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
              {editModel.labelList.map((item: any, idx: number) => <Tag
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
      .choiceItem{
        margin-bottom: 5px;
        .idx{
          min-width:14px;
          display: inline-block;
        }
        &>*{
          vertical-align: top;
          margin-right:10px;
        }
        &>span{
          line-height: 30px;
        }
        &>.ant-checkbox-wrapper,&>.ant-btn-sm{
          margin-top: 5px;
        }
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