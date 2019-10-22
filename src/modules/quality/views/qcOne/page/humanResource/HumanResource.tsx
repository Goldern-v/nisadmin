import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { PageHeader, PageTitle, Place } from 'src/components/common'
import { DatePicker, Select, ColumnProps } from 'src/vendors/antd'
import DeptSelect from 'src/components/DeptSelect'
import { appStore } from 'src/stores'
import BaseTable from 'src/components/BaseTable'

export interface Props {}

export default function HumanResource() {
  const dataSource: any[] = []
  const columns: ColumnProps<any>[] = [
    {
      title: '姓名'
    },
    {
      title: '调配方式'
    },
    {
      title: '科室'
    },
    {
      title: '开始时间'
    },
    {
      title: '结束时间'
    },
    {
      title: '事由'
    },
    {
      title: '创建人'
    },
    {
      title: '创建时间'
    }
  ]

  return (
    <Wrapper>
      <PageHeader>
        <PageTitle>人力资源调配</PageTitle>
        <Place />
        <span className='label'>日期:</span>
        <DatePicker.RangePicker allowClear={false} style={{ width: 220 }} />
        <span className='label'>科室:</span>
        <DeptSelect onChange={() => {}} />
        <span className='label'>调配方式:</span>
        <Select>{/* <Select.Option>123</Select.Option> */}</Select>

        <Button type='primary'>查询</Button>
        <Button onClick={() => {}}>导出</Button>
      </PageHeader>

      <BaseTable dataSource={dataSource} columns={columns} wrapperStyle={{ margin: '0 15px' }} type={['index']} />
    </Wrapper>
  )
}
const Wrapper = styled.div``
