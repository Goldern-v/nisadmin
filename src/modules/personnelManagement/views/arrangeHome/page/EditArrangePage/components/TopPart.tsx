import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, DatePicker, Modal, message } from 'antd'
import BreadcrumbBox from 'src/layouts/components/BreadcrumbBox'
import { Place } from 'src/components/common'
import { observer } from 'mobx-react-lite'
import { arrangeService } from '../../../services/ArrangeService'
import { sheetViewModal } from '../../../viewModal/SheetViewModal'
import { selectViewModal } from '../../../viewModal/SelectViewModal'

import { appStore } from 'src/stores'
import emitter from 'src/libs/ev'

import moment from 'moment'
import { Select } from 'src/vendors/antd'

export interface Props {}

export default observer(function TopPart() {
  const [date, setDate] = useState([] as any[])
  const [isInit, setIsInit] = useState(true)

  //期望排班
  const handleExpect = () => {
    emitter.emit('期望排班设置')
  }

  //重置排班
  const handleReset = () => {
    Modal.confirm({
      title: '提示',
      content: '确认要重置排班吗？重制后本页数据将会被清空',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      centered: true,
      onOk: () => {
        sheetViewModal.cleanAllCell()
      }
    })
  }

  //复制排班
  const handleCopy = () => {
    Modal.confirm({
      title: '提示',
      content: '确认要复制排班吗？复制后本页数据将会被覆盖',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      centered: true,
      onOk: () => {
        arrangeService.copyPrevSettingRange().then((res) => {
          sheetViewModal.init()
          message.success('复制成功')
        })
      }
    })
  }

  //推送排班
  const handlePush = () => {
    Modal.confirm({
      title: '提示',
      content: '确定需要发布排班信息吗？',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      centered: true,
      onOk: () => {}
    })
  }

  //同步排班
  const findSysnNurse = () => {
    Modal.confirm({
      title: '提示',
      content: '确定需要刷新排班人员信息吗？',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      centered: true,
      onOk: () => {
        arrangeService.findSysnNurse().then((res) => {
          message.success('操作成功')
        })
      }
    })
  }

  let handleStatusChange = () => {
    setDate([moment(appStore.queryObj.startTime), moment(appStore.queryObj.endTime)])
    setIsInit(false)
  }
  // 分组数据
  const handleGroupChange = (value: any) => {
    selectViewModal.setParams('group', value)
  }
  useEffect(() => {
    if (isInit) {
      handleStatusChange()
    }
  })

  return (
    <Wrapper>
      <BreadcrumbBox
        data={[
          {
            name: '排班管理',
            link: '/personnelManagement/arrangeHome'
          },
          {
            name: '编辑排班'
          }
        ]}
      />
      <div className='contain'>
        {/* <div className='title'>编辑排班</div> */}
        {/* <Place /> */}
        <div className='item'>
          <div className='label data'>日期：</div>
          <div className='content'>
            <DatePicker.RangePicker
              value={
                selectViewModal.params.startTime
                  ? [moment(selectViewModal.params.startTime), moment(selectViewModal.params.endTime)]
                  : undefined
              }
              disabled
              style={{ width: 200 }}
            />
          </div>
        </div>
        <div className='item'>
          <div className='label'>分组：</div>
          <div className='content'>
            <Select value={selectViewModal.params.group} onChange={handleGroupChange} showSearch style={{ width: 170 }}>
              <Select.Option key='全部' value=''>
                全部
              </Select.Option>
              {selectViewModal.params.groupList.map((item: any) => (
                <Select.Option value={item.id} key={item.id}>
                  {item.groupName}
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>
        <div className='item'>
          <Button onClick={() => sheetViewModal.init()}>查询</Button>
        </div>
        <div className='item'>
          <Button onClick={handleReset}>重置排班</Button>
        </div>
        <div className='item'>
          <Button onClick={handleExpect}>期望排班</Button>
        </div>
        <div className='item'>
          <Button onClick={handleCopy}>复制排班</Button>
        </div>
        <div className='item'>
          <Button onClick={findSysnNurse}>刷新排班人员</Button>
        </div>
        <div className='item'>
          <Button onClick={() => sheetViewModal.saveSheetTableData()}>暂存</Button>
        </div>
        <div className='item'>
          <Button onClick={handlePush}>推送排班</Button>
        </div>
        <div className='item'>
          <Button
            className='statistics'
            onClick={() => {
              appStore.history.push('personnelManagement/arrangeHome')
            }}
          >
            返回
          </Button>
        </div>
      </div>
    </Wrapper>
  )
})

const Wrapper = styled.div`
  .contain {
    display: flex;
    align-items: flex-end;
    height: 70px;
    padding: 10px 20px;
    line-height: 70px;
    .title {
      font-size: 20px;
      margin-left: 10px;
    }
    .item {
      display: inline-block;
      margin-right: 10px;
      vertical-align: middle;
      & > div {
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
`
