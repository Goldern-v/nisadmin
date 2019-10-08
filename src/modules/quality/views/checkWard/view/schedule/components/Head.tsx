import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Modal, DatePicker, message } from 'antd'
import { TableHeadCon } from 'src/components/BaseTable'
import { Select } from 'src/vendors/antd'
import { Place } from 'src/components/common'
import { scheduleViewModal } from '../ScheduleViewModal'
import { observer } from 'src/vendors/mobx-react-lite'
import { appStore } from 'src/stores';
import YearPicker from 'src/components/YearPicker'
import { checkWardService } from '../../../services/CheckWardService';

const { RangePicker } = DatePicker
export interface Props {}

export default observer(function Head() {
  const handlePush = () => {
    Modal.confirm({
      title: '提示',
      content: '确定需要推送查房计划表信息吗?',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      centered: true,
      onOk: () => {
        let params:any = scheduleViewModal.tableData
        params.status = 1
        checkWardService.pushSearchRoom(params).then((res) => {
          message.success('推送成功！')
        })
      }
    })
  }
  return (
    <Wrapper>
      <span>年度：</span>
      <YearPicker
        value={scheduleViewModal.selectedYear}
        onChange={(year: any) => {
          scheduleViewModal.selectedYear = year
          scheduleViewModal.onload()
        }}
      />

      <span>类型：</span>
      <Select
        value={scheduleViewModal.selectedWardRound}
        onChange={(val: string) => {
          scheduleViewModal.selectedWardRound = val
          scheduleViewModal.onload()
        }}
      >
        <Select.Option value=''>全部</Select.Option>
        {scheduleViewModal.WardRoundList.map((item: any, index: number) => (
          <Select.Option value={item.deptCode} key={index}>
            {item.deptName}
          </Select.Option>
        ))}
      </Select>

      <Button onClick={() => scheduleViewModal.onload()} className='checkButton'>查询</Button>
      <Button onClick={() => {appStore.history.push(`/qualityScheduleImport`)}}>导入</Button>
      <Button onClick={() => scheduleViewModal.export()}>导出Excel</Button>
  
      <Place />
      <Button onClick={handlePush}>推送查房计划</Button>
    </Wrapper>
  )
})
const Wrapper = styled(TableHeadCon)`
  .ant-select {
    width: 150px;
    margin-right: 20px;
  }
  .ant-calendar-picker {
    margin-right: 20px;
  }
  button {
    margin-left: 10px;
  }
  .checkButton {
    margin-left: 0px;
  }
`
