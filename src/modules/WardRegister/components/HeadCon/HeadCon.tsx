import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { PageTitle, Place, PageHeader } from 'src/components/common'
import { DatePicker, Select } from 'src/vendors/antd'
import DeptSelect from 'src/components/DeptSelect'
import { appStore, authStore } from 'src/stores'
import { wardRegisterViewModal } from '../../WardRegisterViewModal'
import { observer } from 'src/vendors/mobx-react-lite'
import moment from 'moment'
export interface Props {
  pageTitle: string
  setPageTitle: string
  setPageUrl: string
  btnList: any[]
  recordCode: string
}

export default observer(function HeadCon(props: Props) {
  const { pageTitle, setPageTitle, setPageUrl, btnList, recordCode } = props

  useEffect(() => {
    wardRegisterViewModal.init(recordCode)
  }, [authStore.selectedDeptCode])

  const disabledDate = (current: moment.Moment | undefined) => {
    return
  }

  return (
    <Wrapper>
      <PageHeader>
        <span className='label'>时间段:</span>
        <Select
          style={{ width: 120 }}
          value={wardRegisterViewModal.selectedRevisionIndex}
          onChange={(value: any) => {
            wardRegisterViewModal.selectedRevisionIndex = value
            wardRegisterViewModal.onRevisionIndexChange(value)
          }}
        >
          {wardRegisterViewModal.revisionList.map((item: any, index: number) => (
            <Select.Option value={index} key={index}>
              {item.beginDate} - {item.endDate}
            </Select.Option>
          ))}
        </Select>
        {/* <PageTitle>{pageTitle}</PageTitle> */}
        <Place />
        <span className='label'>日期:</span>
        <DatePicker.RangePicker
          {...wardRegisterViewModal.getDateOptions()}
          allowClear={false}
          style={{ width: 220 }}
          disabledDate={disabledDate}
        />
        <span className='label'>科室:</span>
        <DeptSelect onChange={() => {}} />
        <span className='label'>班次:</span>
        <Select
          value={wardRegisterViewModal.selectedClasses}
          onChange={(value: any) => {
            wardRegisterViewModal.selectedClasses = value
          }}
        >
          <Select.Option value=''>全部</Select.Option>
          {wardRegisterViewModal.classesList.map((item: any) => (
            <Select.Option value={item.code} key={item.code}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
        {btnList &&
          btnList.map((item: any, index: number) => (
            <Button onClick={item.onClick} type={item.type} key={index}>
              {item.name}
            </Button>
          ))}

        <Button onClick={() => appStore.history.push(setPageUrl)}>{setPageTitle}</Button>
      </PageHeader>
    </Wrapper>
  )
})
const Wrapper = styled.div``
