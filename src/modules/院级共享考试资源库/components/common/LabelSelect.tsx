import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Select } from 'antd'
import { questionBankManageService } from './../../api/QuestionBankManageService';

import createModal from 'src/libs/createModal'
import LabelTableEdit from './../labels/LabelTableEdit'

const Option = Select.Option;

export interface Props {
  onSelect?: any,
  showAdd?: boolean,
  inputSelected?: boolean
}

export default function LabelsAppend(props: Props) {
  const { onSelect, inputSelected, showAdd } = props
  const [query, setQuery] = useState({
    bankType: '1',
    choiceType: '标签查看',
    searchingContent: '',
    pageIndex: 1,
    pageSize: 30
  });

  const [loading, setLoading] = useState(false)

  const [value, setValue] = useState({ label: '', key: '' })

  const [totalPage, setTotalPage] = useState(1);

  const [labelList, setLabelList] = useState([] as any[]);

  const [loadMore, setLoadMore] = useState(false);

  const [selecting, setSelecting] = useState(false);

  const labelTableEdit = createModal(LabelTableEdit)

  const getLabelList = (newQuery: any) => {
    newQuery = newQuery || query
    setQuery(newQuery)

    questionBankManageService.getQuestionBankList(newQuery).then(res => {
      let list = res.data.list || [];
      list = list.map((item: any) => {
        return {
          id: item.id,
          labelContent: item.labelContent
        }
      });
      if (res.data.totalPage > 1) setLoadMore(true)
      setLabelList(list || []);
      setTotalPage(res.data.totalPage || 1)
    })
  }

  const appendLabelList = () => {
    if (!loadMore) return;
    if (query.pageIndex > totalPage) return;
    let newQuery = { ...query, pageIndex: query.pageIndex + 1 };
    setQuery(newQuery);
    if (newQuery.pageIndex == totalPage) setLoadMore(false)

    setLoading(true)
    questionBankManageService.getQuestionBankList(newQuery).then(res => {
      setLoading(false)
      let list = res.data.list || [];
      list = list.map((item: any) => {
        return {
          id: item.id,
          labelContent: item.labelContent
        }
      });

      setLabelList(labelList.concat(list || []));
    }, err => setLoading(false))
  }

  const handleSearch = (search: any) => {
    let newQuery = { ...query, searchingContent: search };
    getLabelList(newQuery)
  }

  const handleChange = (obj: any) => {
    setSelecting(false)
    setValue(obj)
  }

  const handleScroll = (e: any) => {
    e.persist();
    const { target } = e;
    if (target.scrollTop + target.offsetHeight === target.scrollHeight) appendLabelList();
  }

  const handleCorrect = () => {

    onSelect && onSelect({
      id: value.key,
      labelContent: value.label
    });

    setValue({ key: '', label: '' });
  }

  const handleFocus = () => {
    setSelecting(true)
    if (value.key == '') getLabelList({
      ...query,
      searchingContent: '',
      page: 1
    })
  }

  const handleBlur = () => {
    if (selecting && inputSelected) handleChange({
      key: '',
      label: query.searchingContent
    })
  }

  const handleAdd = () => {
    labelTableEdit.show({
      onOkCallback: (data?: any) => {
        if (data) onSelect && onSelect(data)
      }
    })
  }

  return <Wrapper>
    <div className="search-area">
      <Select
        placeholder="输入标签名称"
        value={value}
        showSearch
        labelInValue
        loading={loading}
        defaultActiveFirstOption={false}
        onSearch={handleSearch}
        filterOption={false}
        onFocus={handleFocus}
        onPopupScroll={handleScroll}
        onBlur={handleBlur}
        onChange={handleChange}>
        {labelList.map((item: any, idx: number) => <Option
          value={item.id}
          key={idx}>
          {item.labelContent}
        </Option>
        )}
      </Select>
    </div>
    <Button onClick={handleCorrect}>确定</Button>
    {showAdd && <Button onClick={handleAdd}>其他标签</Button>}
    <labelTableEdit.Component />
  </Wrapper>
}
const Wrapper = styled.div`
  display:flex;
  width: 100%;
  min-width: 100px;
  &>*{
    margin-right: 5px;
  }
  .search-area{
    flex: 1;
    .ant-select{
      width: 100%;
    }
  }
`