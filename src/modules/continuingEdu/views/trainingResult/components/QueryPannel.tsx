import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Select, Input } from 'antd'
import { trainingResultModel } from './../models/TrainingResultModel'
import { observer } from 'mobx-react-lite'

const Option = Select.Option

export interface Props { }

export interface Props { }

export default observer(function QueryPannel(props: Props) {
  // const { query, onQueryChange, onSearch } = props
  const { query, bigDeptList, deptList, titleList } = trainingResultModel

  const handleQueryChange = (newQuery: any) => {
    trainingResultModel.setQuery({ ...newQuery, pageIndex: 1 }, true)
  }

  const handleSearch = () => trainingResultModel.setQuery({ ...query, pageIndex: 1 }, true)

  return <Wrapper>
    <span className="label">片区:</span>
    <span className="content">
      <Select
        size="small"
        style={{ width: '120px' }}
        value={query.bigDeptCode}
        onChange={(bigDeptCode: string) => {
          handleQueryChange({ ...query, bigDeptCode, deptCode: '' })
          trainingResultModel.setDeptList(bigDeptCode)
        }}>
        <Option value=''>全部</Option>
        {bigDeptList.map((item: any, idx: number) =>
          <Option key={idx} value={item.depCode}>{item.deptName}</Option>)}
      </Select>
    </span>
    <span className="label">病区:</span>
    <span className="content">
      <Select
        size="small"
        style={{ width: '120px' }}
        value={query.deptCode}
        onChange={(deptCode: string) =>
          handleQueryChange({ ...query, deptCode })}>
        <Option value=''>全部</Option>
        {deptList.map((item: any, idx: number) =>
          <Option key={idx} value={item.depCode}>{item.deptName}</Option>)}
      </Select>
    </span>
    <span className="label">职称:</span>
    <span className="content">
      <Select
        size="small"
        style={{ width: '120px' }}
        value={query.empTitle}
        onChange={(empTitle: string) =>
          handleQueryChange({ ...query, empTitle })}>
        <Option value=''>全部</Option>
        {titleList.map((item: any, idx: number) =>
          <Option key={idx} value={item}>{item}</Option>)}
      </Select>
    </span>
    <span className="label">完成情况:</span>
    <span className="content">
      <Select
        size="small"
        style={{ width: '120px' }}
        value={query.taskStatus}
        onChange={(taskStatus: string) =>
          handleQueryChange({ ...query, taskStatus })}>
        <Option value=''>全部</Option>
        <Option value={1}>已完成</Option>
        <Option value={0}>未完成</Option>
      </Select>
    </span>
    <span className="content">
      <Input
        size="small"
        placeholder="请输入姓名、工号"
        style={{ width: '180px' }}
        defaultValue={query.keyWord}
        onBlur={(e: any) =>
          handleQueryChange({ ...query, keyWord: e.target.value })} />
    </span>
    <span className="content">
      <Button
        size="small"
        onClick={handleSearch}>
        查询
      </Button>
    </span>
  </Wrapper>
})

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