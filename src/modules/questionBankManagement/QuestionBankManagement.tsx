import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Place } from 'src/components/common'
import { Radio, Input, Button, Modal } from 'src/vendors/antd'
import BaseTabs from './components/common/BaseTabs'

import ChoiceQuestionsTable from './components/choiceQuestions/ChoiceQuestionsTable'
import FillingQuestionTable from './components/fillingQuestion/FillingQuestionTable'
import ShortQuestionTable from './components/shortQuestion/ShortQuestionTable'
import LabelTable from './components/labels/LabelTable'
import UploadRecordTable from './components/uploadRecord/UploadRecordTable'
import RecycleTable from './components/recycle/RecycleTable'

import { questionBankManageModel } from './model/QuestionBankManageModel'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import qs from 'qs';
import { questionBankManageService } from './api/QuestionBankManageService';

export interface Props extends RouteComponentProps {
}

export default observer(function QuestionBankManagement() {
  let { bankType, searchingContent } = questionBankManageModel.query;
  let { location, history } = appStore;
  const [activeKey, setActiveKey] = useState('0');
  const [menuNum, setMenuNum] = useState({} as any);

  useEffect(() => {
    let search: any = location.search.replace('?', '');
    search = qs.parse(search);
    const { choiceType } = search;
    let activeIdx = '0';
    let newQuery = {
      bankType: '2',
      pageIndex: 1,
      pageSize: 20,
      searchingContent: '',
      choiceType: choiceType || '选择题'
    }
    for (let i = 0; i < TAB_CONFIG.length; i++) {
      if (choiceType == TAB_CONFIG[i].orginTitle) activeIdx = i.toString();
    }

    setActiveKey(activeIdx)
    questionBankManageModel.setQuery(newQuery)

    getCountMenu()
    questionBankManageModel.getList()
  }, [])

  const getCountMenu = () => {
    questionBankManageService.getCountMenu({
      bankType: questionBankManageModel.query.bankType || '',
      status: '',
      id: ''

    }).then(res => {
      setMenuNum(res.data)
    })
  }

  const TAB_CONFIG = [
    {
      title: `选择题(${menuNum['选择题'] || '-'})`,
      orginTitle: '选择题',
      size: '',
      component: <ChoiceQuestionsTable model={questionBankManageModel}/>
    },
    {
      title: `填空题(${menuNum['填空题'] || '-'})`,
      orginTitle: '填空题',
      size: '',
      component: <FillingQuestionTable model={questionBankManageModel}/>
    },
    {
      title: `问答题(${menuNum['问答题'] || '-'})`,
      orginTitle: '问答题',
      size: '',
      component: <ShortQuestionTable model={questionBankManageModel}/>
    },
    {
      title: `标签查看(${menuNum['标签查看'] || '-'})`,
      orginTitle: '标签查看',
      size: '',
      component: <LabelTable model={questionBankManageModel}/>
    },
    {
      title: `导入记录(${menuNum['导入记录'] || '-'})`,
      orginTitle: '导入记录',
      size: '',
      component: <UploadRecordTable model={questionBankManageModel}/>
    },
    {
      title: `回收站(${menuNum['回收站'] || '-'})`,
      orginTitle: '回收站',
      size: '',
      component: <RecycleTable model={questionBankManageModel}/>
    },
    {
      title: `错题反馈(${menuNum['错题反馈'] || '-'})`,
      orginTitle: '错题反馈',
      size: '',
      component: null
    }
  ]

  const handleBankTypeChange = (e: any) => {
    let newQuery = {
      ...questionBankManageModel.query,
      bankType: e.target.value,
      pageIndex: 1
    }

    questionBankManageModel.setQuery(newQuery)
    getCountMenu()
    questionBankManageModel.getList()
  }

  const onTabsChange = (activeKey: string) => {
    setActiveKey(activeKey);
    let choiceType = TAB_CONFIG[Number(activeKey)].orginTitle;
    //如果是错题反馈直接跳转路由
    if (choiceType == '错题反馈') {
      history.push('/continuingEdu/wrongQuestionBank');
      return
    }

    let newQuery = {
      ...questionBankManageModel.query,
      choiceType: choiceType || '选择题',
      pageIndex: 1
    }

    questionBankManageModel.setQuery(newQuery);
    questionBankManageModel.getList();
    //更新url
    let url = appStore.match.url;
    let search: any = appStore.location.search;
    let query = {} as any;

    if (search) query = qs.parse(search.replace('?', ''));
    query.choiceType = choiceType

    history.replace(`${url}?${qs.stringify(query)}`);
  }

  const handleSearchInputBlur = (e: any) => {
    let newQuery = {
      ...questionBankManageModel.query,
      searchingContent: e.target.value,
      pageIndex: 1
    }

    questionBankManageModel.setQuery(newQuery);
    questionBankManageModel.getList();
  }

  const handleSearchBtnClick = () => {
    let newQuery = {
      ...questionBankManageModel.query,
      pageIndex: 1
    }
    questionBankManageModel.setQuery(newQuery);
    questionBankManageModel.getList();
  }

  const handleOpenCreate = () => {
    let createType = '选择题';
    let modalContent = <div style={{ marginTop: '30px' }}>
      <Radio.Group onChange={(e) => createType = e.target.value} defaultValue={createType}>
        <Radio value={'选择题'}>选择题</Radio>
        <Radio value={'填空题'}>填空题</Radio>
        <Radio value={'问答题'}>问答题</Radio>
      </Radio.Group>
    </div>;

    const bankType = questionBankManageModel.query.bankType

    Modal.confirm({
      title: '新建',
      centered: true,
      content: modalContent,
      onOk: () => {
        let route = ''
        switch (createType) {
          case '选择题':
            route = `/continuingEdu/choiceQuestionEdit?bankType=${bankType}`
            break
          case '填空题':
            route = '/continuingEdu/fillingQuestionEdit?bankType=${bankType}'
            break
          case '问答题':
            route = '/continuingEdu/shortQuestionEdit?bankType=${bankType}'
            break
        }

        history.push(route)
      }
    })
  }

  const handleUpload = () => {
    history.push('/continuingEdu/uploadQuestionBank')
  }

  return (
    <Wrapper>
      <HeadCon>
        <div className='title'>题库管理</div>
        <Place/>
        <SelectBox>
          <span className='label'>选择类型：</span>

          <Radio.Group name='radiogroup' value={bankType} onChange={handleBankTypeChange}>
            <Radio value={'1'}>系统题库</Radio>
            <Radio value={'2'}>医院自建</Radio>
          </Radio.Group>
        </SelectBox>
        <Input
          style={{ width: 200 }}
          placeholder='输入名称进行搜索'
          allowClear defaultValue={searchingContent}
          onBlur={handleSearchInputBlur}/>
        <Button onClick={handleSearchBtnClick}>查询</Button>
        <Button onClick={handleOpenCreate}>创建</Button>
        <Button onClick={handleUpload}>导入</Button>
      </HeadCon>

      <BaseTabs config={TAB_CONFIG} onChange={onTabsChange} activeKey={activeKey}/>
    </Wrapper>
  )
})
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
