import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Select } from 'antd'
import { questionBankManageService } from './../../api/QuestionBankManageService'

const Option = Select.Option

export interface Props {
  onSelect?: any
}

export default function LabelsAppend(props: Props) {
  const { onSelect } = props
  const [query, setQuery] = useState({
    bankType: '',
    choiceType: '标签查看',
    searchingContent: '',
    pageIndex: 1,
    pageSize: 100
  })

  const [value, setValue] = useState({ label: '', key: '' })

  const [totalPage, setTotalPage] = useState(1)

  const [labelList, setLabelList] = useState([] as any[])

  const [loadMore, setLoadMore] = useState(false)

  const getLabelList = (newQuery: any) => {
    newQuery = newQuery || query
    setQuery(newQuery)

    questionBankManageService.getQuestionBankList(newQuery).then((res) => {
      let list = res.data.list || []
      list = list.map((item: any) => {
        return {
          id: item.id,
          labelContent: item.labelContent
        }
      })
      if (res.data.totalPage > 1) setLoadMore(true)
      setLabelList(list || [])
      setTotalPage(res.data.totalPage || 1)
    })
  }

  const appendLabelList = () => {
    if (!loadMore) return
    if (query.pageIndex > totalPage) return
    let newQuery = { ...query, pageIndex: query.pageIndex + 1 }
    setQuery(newQuery)
    if (newQuery.pageIndex == totalPage) setLoadMore(false)

    questionBankManageService.getQuestionBankList(newQuery).then((res) => {
      let list = res.data.list || []
      list = list.map((item: any) => {
        return {
          id: item.id,
          labelContent: item.labelContent
        }
      })

      setLabelList(labelList.concat(list || []))
    })
  }

  const handleSearch = (search: any) => {
    let newQuery = { ...query, searchingContent: search }
    getLabelList(newQuery)
  }

  const handleChange = (obj: any) => {
    setValue(obj)
  }

  const handleScroll = (e: any) => {
    e.persist()
    const { target } = e
    if (target.scrollTop + target.offsetHeight === target.scrollHeight) appendLabelList()
  }

  const handleCorrect = () => {
    if (!value.key) return

    onSelect &&
      onSelect({
        id: value.key,
        labelContent: value.label
      })

    setValue({ key: '', label: '' })
  }

  const handleFocus = () => {
    if (value.key == '')
      getLabelList({
        ...query,
        searchingContent: '',
        page: 1
      })
  }

  return (
    <Wrapper>
      <div className='search-area'>
        <Select
          placeholder='输入标签名称'
          value={value}
          showSearch
          filterOption={(input: any, option: any) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          labelInValue
          defaultActiveFirstOption={false}
          onSearch={handleSearch}
          onFocus={handleFocus}
          onPopupScroll={handleScroll}
          onChange={handleChange}
        >
          {labelList.map((item: any, idx: number) => (
            <Option value={item.id} key={idx}>
              {item.labelContent}
            </Option>
          ))}
        </Select>
      </div>
      <Button onClick={handleCorrect}>确定</Button>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  display: flex;
  width: 100%;
  min-width: 100px;
  .search-area {
    flex: 1;
    margin-right: 5px;
    .ant-select {
      width: 100%;
    }
  }
`
