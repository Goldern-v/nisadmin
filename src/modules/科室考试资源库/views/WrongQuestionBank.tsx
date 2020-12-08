import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Place } from 'src/components/common'
import { Radio, Input, Button } from 'src/vendors/antd'
import BaseTabs from '../components/common/BaseTabs'
import NavCon from '../components/common/NavCon'

import { wrongQuestionBankModel } from '../model/WrongQuestionBankModel'
import { appStore, authStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import qs from 'qs';
// import { questionBankManageService } from '../api/QuestionBankManageService';
import WrongQuestionTable from './../components/wrongQuestion/WrongQuestionTable'

import { getKskszyDefaultDeptCode, setKskszyDefaultCode } from '../utils/kskszyDefaultDeptCode'

import { Select } from 'antd'

const Option = Select.Option

export default observer(function WrongQuestionBank() {
  let { searchingContent } = wrongQuestionBankModel.query;
  let { location, history, match } = appStore;
  const [activeKey, setActiveKey] = useState('0');
  // const [menuNum, setMenuNum] = useState({} as any);

  useEffect(() => {
    let search: any = location.search.replace('?', '');
    search = qs.parse(search);
    const { status } = search;
    let activeIdx = '0';
    let newQuery = {
      empNo: authStore.user?.empNo || '',
      bankType: '2',
      pageIndex: 1,
      pageSize: 20,
      deptCode: getKskszyDefaultDeptCode(),
      searchingContent: '',
      choiceType: '错题反馈'
    }

    for (let i = 0; i < TAB_CONFIG.length; i++) {
      if (status == TAB_CONFIG[i].orginTitle) activeIdx = i.toString();
    }

    setActiveKey(activeIdx);
    wrongQuestionBankModel.setStatus(search.status || '待处理');
    wrongQuestionBankModel.setQuery(newQuery);
    wrongQuestionBankModel.getList();
  }, []);

  // useEffect(() => {
  //   if (wrongQuestionBankModel.tableData.length == 0 && wrongQuestionBankModel.tableLoading) return
  //   questionBankManageService.getCountMenu().then(res => {
  //     setMenuNum(res.data)
  //   })
  // }, [wrongQuestionBankModel.tableData])

  const surplusHeight = 308;

  const TAB_CONFIG = [
    {
      title: '待处理',
      orginTitle: '待处理',
      size: '',
      component: <WrongQuestionTable model={wrongQuestionBankModel} surplusHeight={surplusHeight} />
    },
    {
      title: '已处理',
      orginTitle: '已处理',
      size: '',
      component: <WrongQuestionTable model={wrongQuestionBankModel} surplusHeight={surplusHeight} />
    }
  ]

  const onTabsChange = (activeKey: string) => {
    setActiveKey(activeKey);
    let status = TAB_CONFIG[Number(activeKey)].orginTitle;

    let newQuery = {
      ...wrongQuestionBankModel.query,
      status: status || '待处理',
      pageIndex: 1
    }

    wrongQuestionBankModel.setQuery(newQuery);
    wrongQuestionBankModel.setStatus(status)
    wrongQuestionBankModel.getList();
    //更新url
    let url = match.url;
    let search: any = location.search;
    let query = {} as any;

    if (search) query = qs.parse(search.replace('?', ''))
    query.status = status

    history.replace(`${url}?${qs.stringify(query)}`);
  }

  const handleSearchInputBlur = (e: any) => {
    let newQuery = {
      ...wrongQuestionBankModel.query,
      searchingContent: e.target.value,
      pageIndex: 1
    }

    wrongQuestionBankModel.setQuery(newQuery);
    wrongQuestionBankModel.getList();
  }

  const handleSearchBtnClick = () => {
    let newQuery = {
      ...wrongQuestionBankModel.query,
      pageIndex: 1
    }
    wrongQuestionBankModel.setQuery(newQuery);
    wrongQuestionBankModel.getList();
  }

  return (
    <Wrapper>
      <NavCon>
        <Link to="/continuingEdu">学习培训</Link>
        <span> &gt; </span>
        <Link to="/continuingEdu/科室考试资源库">科室考试资源库</Link>
        <span> &gt; </span>
        <span>错题反馈</span>
      </NavCon>
      <HeadCon>
        <div className='title'>错题反馈</div>
        <Place />
        <span>科室：</span>
        <Select
          style={{ width: 180, marginRight: 10 }}
          value={wrongQuestionBankModel.query.deptCode}
          onChange={(deptCode: any) => {
            wrongQuestionBankModel.setQuery({
              ...wrongQuestionBankModel.query,
              deptCode,
              pageIndex: 1,
            })

            wrongQuestionBankModel.getList();

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
