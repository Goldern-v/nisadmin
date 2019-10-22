import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { PageHeader, PageTitle, Place } from 'src/components/common'
import { DatePicker, Select, ColumnProps } from 'src/vendors/antd'
import DeptSelect from 'src/components/DeptSelect'
import { appStore } from 'src/stores'
import BaseTable from 'src/components/BaseTable'

export interface Props {}

export default function SafetyHazards() {
  const dataSource: any[] = []
  const columns: ColumnProps<any>[] = [
    {
      title: '日期'
    },
    {
      title: '时间'
    },
    {
      title: '问题种类'
    },
    {
      title: '详情'
    },
    {
      title: '创建人'
    },
    {
      title: '创建时间'
    },
    {
      title: '操作'
    }
  ]

  return (
    <Wrapper>
      <PageHeader>
        <PageTitle>安全隐患排查表</PageTitle>
        <Place />
        <span className='label'>日期:</span>
        <DatePicker.RangePicker allowClear={false} style={{ width: 220 }} />
        <span className='label'>科室:</span>
        <DeptSelect onChange={() => {}} />
        <span className='label'>问题种类:</span>
        <Select>{/* <Select.Option>123</Select.Option> */}</Select>
        <span className='label'>班次:</span>
        <Select>{/* <Select.Option>123</Select.Option> */}</Select>
        <Button>查询</Button>
        <Button type='primary' onClick={() => {}}>
          添加
        </Button>
      </PageHeader>

      <BaseTable dataSource={dataSource} columns={columns} wrapperStyle={{ margin: '0 15px' }} />
    </Wrapper>
  )
}
const Wrapper = styled.div``
