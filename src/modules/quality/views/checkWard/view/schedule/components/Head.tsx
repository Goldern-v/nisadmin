import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Modal, message } from 'antd'
import { TableHeadCon } from 'src/components/BaseTable'
import { Select } from 'src/vendors/antd'
import { Place } from 'src/components/common'
import { scheduleViewModal } from '../ScheduleViewModal'
import { observer } from 'src/vendors/mobx-react-lite'
import { appStore } from 'src/stores';
import YearPicker from 'src/components/YearPicker'
import { checkWardService } from '../../../services/CheckWardService'
import { PageTitle } from 'src/components/common'

export interface Props {}

export default observer(function Head() {
  //推送查房计划
  const handlePush = () => {
    Modal.confirm({
      title: '提示',
      content: '确定需要推送查房计划表信息吗?',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      centered: true,
      onOk: () => {
        scheduleViewModal.statusAll && scheduleViewModal.statusAll.map(((item: any) => {
          item.status = 1
        }))
        let params:any = { ...scheduleViewModal.tableData, ...{ searchRooms: scheduleViewModal.statusAll }}
        checkWardService.pushSearchRoom(params).then((res) => {
          message.success('推送成功！')
        })
        scheduleViewModal.onload()
      }
    })
  }

  return (
    <Wrapper>
      <LeftIcon>
          <PageTitle>查房计划表</PageTitle>
      </LeftIcon>
      <RightIcon>
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
          {scheduleViewModal.WardRoundList.map((item: any, index: number) => (
            <Select.Option value={item.code} key={index}>
              {item.name}
            </Select.Option>
          ))}
        </Select>

        <Button type='primary' onClick={() => scheduleViewModal.onload()} className='checkButton'>查询</Button>
        <Button onClick={() => {appStore.history.push(`/qualityScheduleImport`)}}>导入</Button>
        <Button onClick={() => scheduleViewModal.export()}>导出Excel</Button>
    
        <Place />
        <Button onClick={handlePush}>推送查房计划</Button>
      </RightIcon>

    </Wrapper>
  )
})
const Wrapper = styled(TableHeadCon)`
  justify-content: space-between;
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
const LeftIcon = styled.div`
  height: 55px;
  font-size: 13px;
  position: relative;
  font-size: 13px;
  color: #333333;
  padding: 0 0 0 15px;
  display: flex;
  align-items: center;
`

const RightIcon = styled.div`
  height: 55px;
  font-size: 13px;
  position: relative;
  font-size: 13px;
  color: #333333;
  padding: 0 0 0 15px;
  display: flex;
  align-items: center;
`
