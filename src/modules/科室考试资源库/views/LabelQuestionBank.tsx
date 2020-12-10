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

import { labelQuestionBankModel_hj2 } from './../model/LabelQuestionBankModel'
import { appStore, authStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import qs from 'qs';
import { questionBankManageService } from './../api/QuestionBankManageService';
import { getKskszyDefaultDeptCode, setKskszyDefaultCode } from '../utils/kskszyDefaultDeptCode'

import { Select } from 'antd'

const Option = Select.Option

export default observer(function LabelQuestionBank() {
  let { bankType, searchingContent } = labelQuestionBankModel_hj2.query;
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
      deptCode: getKskszyDefaultDeptCode(),
      searchingContent: '',
      choiceType: choiceType || '选择题'
    }
    let newLabel = {
      id: search.id,
      labelContent: search.labelContent,
    }
    for (let i = 0; i < TAB_CONFIG.length; i++) {
      if (choiceType == TAB_CONFIG[i].orginTitle) activeIdx = i.toString();
    }

    setActiveKey(activeIdx);
    labelQuestionBankModel_hj2.setLabel(newLabel);
    labelQuestionBankModel_hj2.setQuery(newQuery);
    labelQuestionBankModel_hj2.getList();
  }, []);

  useEffect(() => {
    let search: any = location.search.replace('?', '');
    search = qs.parse(search);
    if (labelQuestionBankModel_hj2.tableData.length == 0 && labelQuestionBankModel_hj2.tableLoading) return
    questionBankManageService.getCountMenu({
      status: '标签查看',
      bankType: '2',
      id: search.id,
      deptCode: getKskszyDefaultDeptCode(),
    }).then(res => {
      setMenuNum(res.data)
    })
  }, [labelQuestionBankModel_hj2.tableData])

  const surplusHeight = 308;

  const TAB_CONFIG = [
    {
      title: `选择题(${menuNum['选择题'] || '-'})`,
      orginTitle: '选择题',
      size: '',
      component: <ChoiceQuestionsTable model={labelQuestionBankModel_hj2} surplusHeight={surplusHeight} />
    },
    {
      title: `填空题(${menuNum['填空题'] || '-'})`,
      orginTitle: '填空题',
      size: '',
      component: <FillingQuestionTable model={labelQuestionBankModel_hj2} surplusHeight={surplusHeight} />
    },
    {
      title: `问答题(${menuNum['问答题'] || '-'})`,
      orginTitle: '问答题',
      size: '',
      component: <ShortQuestionTable model={labelQuestionBankModel_hj2} surplusHeight={surplusHeight} />
    }
  ]

  const onTabsChange = (activeKey: string) => {
    setActiveKey(activeKey);
    let choiceType = TAB_CONFIG[Number(activeKey)].orginTitle;

    let newQuery = {
      ...labelQuestionBankModel_hj2.query,
      choiceType: choiceType || '选择题',
      pageIndex: 1
    }

    labelQuestionBankModel_hj2.setQuery(newQuery);
    labelQuestionBankModel_hj2.getList();
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
      ...labelQuestionBankModel_hj2.query,
      searchingContent: e.target.value,
      pageIndex: 1
    }

    labelQuestionBankModel_hj2.setQuery(newQuery);
    labelQuestionBankModel_hj2.getList();
  }

  const handleSearchBtnClick = () => {
    let newQuery = {
      ...labelQuestionBankModel_hj2.query,
      pageIndex: 1
    }
    labelQuestionBankModel_hj2.setQuery(newQuery);
    labelQuestionBankModel_hj2.getList();
  }

  const handleExport = () => {
    questionBankManageService
      .exportQuestionsBySearchParams(labelQuestionBankModel_hj2.query)
  }

  return (
    <Wrapper>
      <NavCon>
        <Link to="/continuingEdu">学习培训</Link>
        <span> &gt; </span>
        <Link to="/continuingEdu/科室考试资源库">科室考试资源库</Link>
        <span> &gt; </span>
        <span>标签题库</span>
      </NavCon>
      <HeadCon>
        <div className='title'>标签题库: {labelQuestionBankModel_hj2.label.labelContent}</div>
        <Place />
        <span>科室：</span>
        <Select
          style={{ width: 180, marginRight: 10 }}
          value={labelQuestionBankModel_hj2.query.deptCode}
          onChange={(deptCode: any) => {
            labelQuestionBankModel_hj2.setQuery({
              ...labelQuestionBankModel_hj2.query,
              deptCode,
              pageIndex: 1,
            })

            labelQuestionBankModel_hj2.getList();

            setKskszyDefaultCode(deptCode)
          }}>
          <Option value=''>全部</Option>
          {authStore.deptList.map((item: any, idx: number) => <Option key={idx} value={item.code}>{item.name}</Option>)}
        </Select>
        <Input
          style={{ width: 200 }}
          placeholder='输入题目进行搜索'
          allowClear
          defaultValue={searchingContent}
          onBlur={handleSearchInputBlur} />
        <Button onClick={handleSearchBtnClick}>查询</Button>
        {['选择题', '填空题', '问答题']
          .indexOf(labelQuestionBankModel_hj2.query.choiceType) >= 0 &&
          <Button onClick={handleExport}>导出</Button>}
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
