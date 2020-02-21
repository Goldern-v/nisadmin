import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
export interface Props { }

export default function AwnserInfo() {
  const questionArr = [
    {
      index: 1,
      type: '选择题',
      desc: '现场医护人员到达现场进行基础生命支持复苏，支援人员和急救小组人员间是几分钟',
      awnsers: [
        {
          key: 'A',
          right: true,
          awnserContent: '10'
        },
        {
          key: 'B',
          right: false,
          awnserContent: '20'
        },
        {
          key: 'C',
          right: true,
          awnserContent: '30'
        },
        {
          key: 'D',
          right: false,
          awnserContent: '40'
        },
      ]
    },
    {
      index: 2,
      type: '选择题',
      desc: '现场医护人员到达现场进行基础生命支持复苏，支援人员和急救小组人员间是几分钟',
      awnsers: [
        {
          key: 'A',
          right: false,
          awnserContent: '10'
        },
        {
          key: 'B',
          right: false,
          awnserContent: '20'
        },
        {
          key: 'C',
          right: false,
          awnserContent: '30'
        },
        {
          key: 'D',
          right: true,
          awnserContent: '40'
        },
      ]
    },
    {
      index: 3,
      type: '填空题',
      desc: '这是一道填##空##题',
      awnsers: ['答案1', '答案2']
    },
    {
      index: 4,
      type: '问答题',
      desc: '这是一道问答题',
      awnser: '问答题答案与解释'
    }
  ]

  //单选题列表
  let singleChoiceArr = questionArr.filter((item: any) => {
    if (item.type !== '选择题') return false
    let rightAwnserArr = (item.awnsers || []).filter((awnser: any) => awnser.right)
    if (rightAwnserArr.length > 1) return false

    return true
  })

  //多选题列表
  let multiChoiceArr = questionArr.filter((item: any) => {
    if (item.type !== '选择题') return false
    let rightAwnserArr = (item.awnsers || []).filter((awnser: any) => awnser.right)
    if (rightAwnserArr.length <= 1) return false

    return true
  })

  //填空题
  let fullArr = questionArr.filter((item: any) => item.type == '填空题')

  //问答题
  let wendaArr = questionArr.filter((item: any) => item.type == '问答题')

  return <Wrapper>
    <div className="main-title">参考答案</div>
    <div className="title">2019年护理考试</div>
    <div>【单选题】</div>
    <div>{singleChoiceArr.map((item: any) =>
      <span
        key={item.index}>
        {item.index}.
          {(item.awnsers || [])
          .filter((awnser: any) => awnser.right)
          .map((awnser: any) => awnser.key)
          .join(',')};
      </span>)}
    </div>
    <div>【多选题】</div>
    <div>{multiChoiceArr.map((item: any) =>
      <span
        key={item.index}>
        {item.index}.
        {(item.awnsers || [])
          .filter((awnser: any) => awnser.right)
          .map((awnser: any) => awnser.key)
          .join(',')};
      </span>)}
    </div>
    <div>【填空题】</div>
    <div>
      {fullArr.map((item: any, idx: number) => <React.Fragment
        key={idx}>
        <span>
          {item.index}.
          {(item.awnsers || []).join(' ')};
        </span>
        <br />
      </React.Fragment>)}
    </div>
    <div>【问答题】</div>
    <div>
      {wendaArr.map((item: any, idx: number) => <React.Fragment
        key={idx}>
        <span>
          {item.index}.
          {item.awnser};
        </span>
        <br />
      </React.Fragment>)}
    </div>
    <div className="notice">
      <div>特别提醒：</div>
      试卷预览，只是临时性的模拟一次考试试题，不会保存当前你所看到的记录。如果你的题目是
      <span style={{ color: 'red' }}>随机排序</span>
      的，可能下次你看到的就会不一样。
    </div>
  </Wrapper>
}
const Wrapper = styled.div`
  padding: 15px 10px;
  .main-title{
    font-size: 22px;
    color:#000;
    font-weight: bold;
  }
  .title{
    margin-top: 18px;
    margin-bottom: 10px;
    font-size: 16px;
    color:#000;
    font-weight: bold;
  }
  .notice{
    margin-top: 15px;
    padding: 15px;
    background: #eee;
  }
`