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

import { questionBankManageModel_hj1 } from './model/QuestionBankManageModel'
import { appStore, authStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import qs from 'qs';
import { questionBankManageService } from './api/QuestionBankManageService';
import { message } from "antd";

export interface Props extends RouteComponentProps {
}

export default observer(function QuestionBankManagement() {
  let { bankType, searchingContent } = questionBankManageModel_hj1.query;
  let { location, history } = appStore;
  const [activeKey, setActiveKey] = useState('0');
  const [menuNum, setMenuNum] = useState({} as any);
  let selectData: any[] = []

  useEffect(() => {
    let search: any = location.search.replace('?', '');
    search = qs.parse(search);
    const { choiceType } = search;
    let activeIdx = '0';
    let newQuery = {
      bankType: '1',
      pageIndex: 1,
      pageSize: 20,
      searchingContent: '',
      choiceType: choiceType || '选择题'
    }
    for (let i = 0; i < TAB_CONFIG.length; i++) {
      if (choiceType == TAB_CONFIG[i].orginTitle) activeIdx = i.toString();
    }

    setActiveKey(activeIdx)
    questionBankManageModel_hj1.setQuery(newQuery)

    getCountMenu()
    questionBankManageModel_hj1.getList()
  }, [])

  const getCountMenu = () => {
    questionBankManageService.getCountMenu({
      bankType: questionBankManageModel_hj1.query.bankType || '',
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
      component: <ChoiceQuestionsTable model={questionBankManageModel_hj1}/>
    },
    {
      title: `填空题(${menuNum['填空题'] || '-'})`,
      orginTitle: '填空题',
      size: '',
      component: <FillingQuestionTable model={questionBankManageModel_hj1}/>
    },
    {
      title: `问答题(${menuNum['问答题'] || '-'})`,
      orginTitle: '问答题',
      size: '',
      component: <ShortQuestionTable model={questionBankManageModel_hj1}/>
    },
    {
      title: `标签查看(${menuNum['标签查看'] || '-'})`,
      orginTitle: '标签查看',
      size: '',
      component: <LabelTable model={questionBankManageModel_hj1}/>
    },
    {
      title: `导入记录(${menuNum['导入记录'] || '-'})`,
      orginTitle: '导入记录',
      size: '',
      component: <UploadRecordTable model={questionBankManageModel_hj1}/>
    },
    {
      title: `回收站(${menuNum['回收站'] || '-'})`,
      orginTitle: '回收站',
      size: '',
      component: <RecycleTable model={questionBankManageModel_hj1}/>
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
      ...questionBankManageModel_hj1.query,
      bankType: e.target.value,
      pageIndex: 1
    }

    questionBankManageModel_hj1.setQuery(newQuery)
    getCountMenu()
    questionBankManageModel_hj1.getList()
  }

  const onTabsChange = (activeKey: string) => {
    setActiveKey(activeKey);
    let choiceType = TAB_CONFIG[Number(activeKey)].orginTitle;
    //如果是错题反馈直接跳转路由
    if (choiceType == '错题反馈') {
      history.push('/continuingEdu/wrongQuestionBank_hj1');
      return
    }

    let newQuery = {
      ...questionBankManageModel_hj1.query,
      choiceType: choiceType || '选择题',
      pageIndex: 1
    }

    questionBankManageModel_hj1.setQuery(newQuery);
    questionBankManageModel_hj1.getList();
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
      ...questionBankManageModel_hj1.query,
      searchingContent: e.target.value,
      pageIndex: 1
    }

    questionBankManageModel_hj1.setQuery(newQuery);
    questionBankManageModel_hj1.getList();
  }

  const handleSearchBtnClick = () => {
    let newQuery = {
      ...questionBankManageModel_hj1.query,
      pageIndex: 1
    }
    questionBankManageModel_hj1.setQuery(newQuery);
    questionBankManageModel_hj1.getList();
  }

  const handleExport = () => {
    questionBankManageService
      .exportQuestionsBySearchParams(questionBankManageModel_hj1.query)
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

    Modal.confirm({
      title: '新建',
      centered: true,
      content: modalContent,
      onOk: () => {
        let route = ''
        switch (createType) {
          case '选择题':
            route = '/continuingEdu/choiceQuestionEdit_hj1'
            break
          case '填空题':
            route = '/continuingEdu/fillingQuestionEdit_hj1'
            break
          case '问答题':
            route = '/continuingEdu/shortQuestionEdit_hj1'
            break
        }

        history.push(route)
      }
    })
  }

  const handleUpload = () => {
    history.push('/continuingEdu/uploadQuestionBank_hj1')
  }

  return (
    <Wrapper>
      <HeadCon>
        <div className='title'>{appStore.HOSPITAL_ID != 'nys' ? '院级共享考试资源库' : '全院题库'}</div>
        <Place/>
        {/* <SelectBox>
          <span className='label'>选择类型：</span>

          <Radio.Group name='radiogroup' value={bankType} onChange={handleBankTypeChange}>
            <Radio value={'系统题库'}>系统题库</Radio>
            <Radio value={'1'}>医院自建</Radio>
          </Radio.Group>
        </SelectBox> */}
        <Input
          style={{ width: 200 }}
          placeholder='输入名称进行搜索'
          allowClear defaultValue={searchingContent}
          onBlur={handleSearchInputBlur}/>
        <Button onClick={handleSearchBtnClick}>查询</Button>
        <Button onClick={handleOpenCreate} disabled={!authStore.isDepartment}>创建</Button>
        <Button onClick={handleUpload} disabled={!authStore.isDepartment}>导入</Button>
        {
          ['选择题', '填空题', '问答题']
            .indexOf(questionBankManageModel_hj1.query.choiceType) >= 0 &&
          <Button onClick={handleExport}>导出</Button>
        }
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
