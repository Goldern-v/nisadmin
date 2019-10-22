import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { PageTitle, Place, PageHeader } from 'src/components/common'
import { DatePicker, Select } from 'src/vendors/antd'
import DeptSelect from 'src/components/DeptSelect'
import { appStore } from 'src/stores'
export interface Props {
  pageTitle: string
  setPageTitle: string
  setPageUrl: string
}

export default function HeadCon(props: Props) {
  const { pageTitle, setPageTitle, setPageUrl } = props
  return (
    <Wrapper>
      <PageHeader>
        <PageTitle>{pageTitle}</PageTitle>
        <Place />
        <span className='label'>日期:</span>
        <DatePicker.RangePicker allowClear={false} style={{ width: 220 }} />
        <span className='label'>科室:</span>
        <DeptSelect onChange={() => {}} />
        <span className='label'>班次:</span>
        <Select>{/* <Select.Option>123</Select.Option> */}</Select>
        <Button>查询</Button>
        <Button>保存</Button>
        <Button>导出</Button>
        <Button onClick={() => appStore.history.push(setPageUrl)}>{setPageTitle}</Button>
      </PageHeader>
    </Wrapper>
  )
}
const Wrapper = styled.div``
