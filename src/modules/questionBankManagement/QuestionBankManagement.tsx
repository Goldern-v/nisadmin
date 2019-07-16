import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Place } from 'src/components/common'
import { Radio, Input, Button } from 'src/vendors/antd'
import BaseTabs from 'src/components/BaseTabs'
import ChoiceQuestionsTable from './components/choiceQuestions/ChoiceQuestionsTable'
import SpotDictationTable from './components/spotDictation/SpotDictationTable'
export interface Props extends RouteComponentProps {}

export default function QuestionBankManagement() {
  const [activeKey, setActiveKey] = useState(0)
  const TAB_CONFIG = [
    {
      title: '选择题',
      component: <ChoiceQuestionsTable active={activeKey === 0} />
    },
    {
      title: '填空题',
      component: <SpotDictationTable active={activeKey === 0} />
    },
    {
      title: '问答题',
      component: null
    },
    {
      title: '标签查看',
      component: null
    },
    {
      title: '导入记录',
      component: null
    },
    {
      title: '回收站',
      component: null
    },
    {
      title: '错题反馈',
      component: null
    }
  ]

  const onTabsChange = (activeKey: string) => {
    console.log(activeKey)
  }
  return (
    <Wrapper>
      <HeadCon>
        <div className='title'>题库管理</div>
        <Place />
        <SelectBox>
          <span className='label'>选择类型：</span>

          <Radio.Group name='radiogroup' defaultValue={1}>
            <Radio value={1}>系统题库</Radio>
            <Radio value={2}>医院题库</Radio>
          </Radio.Group>
        </SelectBox>
        <Input style={{ width: 200 }} placeholder='输入题目进行搜索' />
        <Button>查询</Button>
        <Button>添加</Button>
        <Button>导入</Button>
      </HeadCon>

      <BaseTabs config={TAB_CONFIG} onChange={onTabsChange} />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  margin: 20px 10px 10px;
`
const HeadCon = styled.div`
  display: flex;
  align-items: center;
  margin: 0 10px 10px 0;
  .title {
    font-size: 22px;
    font-weight: bold;
  }
  button {
    margin-left: 15px;
  }
`
const SelectBox = styled.div`
  .label {
    margin-right: 5px;
  }
  border: 1px solid #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 300px;
  margin-right: 20px;
  background: #fff;
`
