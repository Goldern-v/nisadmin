import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Select, Input } from 'antd'

const Option = Select.Option

export interface Props { }

export interface Props {
  query: {
    pianqv?: string,
    bingqv?: string,
    zhicheng?: string,
    wanchengqingkuang?: string,
    keywords?: string,
    pageIndex?: number,
    [p: string]: any
  },
  onQueryChange?: Function,
  onSearch?: Function
}

export default function QueryPannel(props: Props) {
  const { query, onQueryChange, onSearch } = props

  const [pianqvList, setPianqvList] = useState([] as any[])
  const [bingqvList, setBingqvList] = useState([] as any[])
  const [zhichengList, setZhichengList] = useState([] as any[])

  const handleQueryChange = (newQuery: any) => {
    onQueryChange && onQueryChange({ ...newQuery, pageIndex: 1 })
  }

  const handleSearch = () => onSearch && onSearch()

  return <Wrapper>
    <span className="label">片区:</span>
    <span className="content">
      <Select
        size="small"
        style={{ width: '120px' }}
        value={query.pianqv}
        onChange={(pianqv: string) =>
          handleQueryChange({ ...query, pianqv })}>
        <Option value=''>全部</Option>
        {pianqvList.map((item: any, idx: number) =>
          <Option key={idx} value={item.code}>{item.name}</Option>)}
      </Select>
    </span>
    <span className="label">病区:</span>
    <span className="content">
      <Select
        size="small"
        style={{ width: '120px' }}
        value={query.bingqv}
        onChange={(bingqv: string) =>
          handleQueryChange({ ...query, bingqv })}>
        <Option value=''>全部</Option>
        {bingqvList.map((item: any, idx: number) =>
          <Option key={idx} value={item.code}>{item.name}</Option>)}
      </Select>
    </span>
    <span className="label">职称:</span>
    <span className="content">
      <Select
        size="small"
        style={{ width: '120px' }}
        value={query.zhicheng}
        onChange={(zhicheng: string) =>
          handleQueryChange({ ...query, zhicheng })}>
        <Option value=''>全部</Option>
        {zhichengList.map((item: any, idx: number) =>
          <Option key={idx} value={item.code}>{item.name}</Option>)}
      </Select>
    </span>
    <span className="label">完成情况:</span>
    <span className="content">
      <Select
        size="small"
        style={{ width: '120px' }}
        value={query.wanchengqingkuang}
        onChange={(wanchengqingkuang: string) =>
          handleQueryChange({ ...query, wanchengqingkuang })}>
        <Option value=''>全部</Option>
        <Option value='1'>已完成</Option>
        <Option value='2'>未完成</Option>
      </Select>
    </span>
    <span className="content">
      <Input
        size="small"
        placeholder="请输入姓名、工号"
        style={{ width: '180px' }}
        defaultValue={query.keywords}
        onBlur={(e: any) =>
          handleQueryChange({ ...query, keywords: e.target.value })} />
    </span>
    <span className="content">
      <Button
        size="small"
        onClick={handleSearch}>
        查询
      </Button>
    </span>
  </Wrapper>
}
const Wrapper = styled.div`
  padding: 10px 15px 0 15px;
  span{
    vertical-align: middle;
    font-size: 12px;
  }
  .content{
    margin: 0 15px 0 5px;
    font-size: 12px;
  }
`