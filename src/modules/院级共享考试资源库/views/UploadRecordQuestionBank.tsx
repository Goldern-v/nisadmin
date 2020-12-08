import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Place } from 'src/components/common'
import { Radio, Input, Button } from 'src/vendors/antd'
import BaseTabs from './../components/common/BaseTabs'
import ChoiceQuestionsTable from './../components/choiceQuestions/ChoiceQuestionsTable'
import FillingQuestionTable from './../components/fillingQuestion/FillingQuestionTable'
import ShortQuestionTable from './../components/shortQuestion/ShortQuestionTable'
import NavCon from './../components/common/NavCon'

import { uploadQuestionBankModel_hj1 } from './../model/UploadRecordQuestionBankModel'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import qs from 'qs';
import { questionBankManageService } from './../api/QuestionBankManageService';

export default observer(function QuestionBankManagement() {
  let { bankType, searchingContent } = uploadQuestionBankModel_hj1.query;
  let { location, history } = appStore;
  const [activeKey, setActiveKey] = useState('0');
  const [menuNum, setMenuNum] = useState({} as any);

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
    let newBank = {
      id: search.id,
      bankName: search.bankName,
    }
    for (let i = 0; i < TAB_CONFIG.length; i++) {
      if (choiceType == TAB_CONFIG[i].orginTitle) activeIdx = i.toString();
    }

    setActiveKey(activeIdx);
    uploadQuestionBankModel_hj1.setBank(newBank);
    uploadQuestionBankModel_hj1.setQuery(newQuery);
    uploadQuestionBankModel_hj1.getList();
  }, []);

  useEffect(() => {
    let search: any = location.search.replace('?', '');
    search = qs.parse(search);
    if (uploadQuestionBankModel_hj1.tableData.length == 0 && uploadQuestionBankModel_hj1.tableLoading) return
    questionBankManageService.getCountMenu({
      status: '导入记录',
      bankType: '1',
      id: search.id
    }).then(res => {
      setMenuNum(res.data)
    })
  }, [uploadQuestionBankModel_hj1.tableData])

  const surplusHeight = 308;

  const TAB_CONFIG = [
    {
      title: `选择题(${menuNum['选择题'] || '-'})`,
      orginTitle: '选择题',
      size: '',
      component: <ChoiceQuestionsTable model={uploadQuestionBankModel_hj1} surplusHeight={surplusHeight} />
    },
    {
      title: `填空题(${menuNum['填空题'] || '-'})`,
      orginTitle: '填空题',
      size: '',
      component: <FillingQuestionTable model={uploadQuestionBankModel_hj1} surplusHeight={surplusHeight} />
    },
    {
      title: `问答题(${menuNum['问答题'] || '-'})`,
      orginTitle: '问答题',
      size: '',
      component: <ShortQuestionTable model={uploadQuestionBankModel_hj1} surplusHeight={surplusHeight} />
    }
  ]

  const onTabsChange = (activeKey: string) => {
    setActiveKey(activeKey);
    let choiceType = TAB_CONFIG[Number(activeKey)].orginTitle;

    let newQuery = {
      ...uploadQuestionBankModel_hj1.query,
      choiceType: choiceType || '选择题',
      pageIndex: 1
    }

    uploadQuestionBankModel_hj1.setQuery(newQuery);
    uploadQuestionBankModel_hj1.getList();
    //更新url
    let url = appStore.match.url;
    let search: any = appStore.location.search;
    let query = {} as any;

    if (search) query = qs.parse(search.replace('?', ''));
    query.choiceType = choiceType

    appStore.history.replace(`${url}?${qs.stringify(query)}`);
  }

  const handleSearchInputBlur = (e: any) => {
    let newQuery = {
      ...uploadQuestionBankModel_hj1.query,
      searchingContent: e.target.value,
      pageIndex: 1
    }

    uploadQuestionBankModel_hj1.setQuery(newQuery);
    uploadQuestionBankModel_hj1.getList();
  }

  const handleSearchBtnClick = () => {
    let newQuery = {
      ...uploadQuestionBankModel_hj1.query,
      pageIndex: 1
    }
    uploadQuestionBankModel_hj1.setQuery(newQuery);
    uploadQuestionBankModel_hj1.getList();
  }

  return (
    <Wrapper>
      <NavCon>
        <Link to="/continuingEdu">学习培训</Link>
        <span> &gt; </span>
        <Link to="/continuingEdu/院级共享考试资源库">院级共享考试资源库</Link>
        <span> &gt; </span>
        <span>文件题库</span>
      </NavCon>
      <HeadCon>
        <div className='title'>文件题库: {uploadQuestionBankModel_hj1.bank.bankName}</div>
        <Place />
        <Input style={{ width: 200 }} placeholder='输入题目进行搜索' allowClear defaultValue={searchingContent} onBlur={handleSearchInputBlur} />
        <Button onClick={handleSearchBtnClick}>查询</Button>
        <Button onClick={() => history.goBack()}>返回</Button>
      </HeadCon>

      <BaseTabs config={TAB_CONFIG} onChange={onTabsChange} activeKey={activeKey} />
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
  .bank {
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
