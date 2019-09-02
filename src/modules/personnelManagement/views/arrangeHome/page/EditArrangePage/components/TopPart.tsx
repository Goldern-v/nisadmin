import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, DatePicker, Modal } from 'antd'
import BreadcrumbBox from 'src/layouts/components/BreadcrumbBox'
import { Place } from 'src/components/common'
import { arrangeService } from '../../../services/ArrangeService'
import { sheetViewModal } from '../../../viewModal/SheetViewModal'
import { appStore } from 'src/stores'

export interface Props {}

export default function TopPart() {
  //重置排班
  const handleReset = () => {
    Modal.confirm({
      title: '提示',
      content: '确认要重置排班吗？复制后本页数据将会被清空',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      centered: true,
      onOk: () => {
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
      }
    })
  }

  //复制排班
  const handlePush = () => {
    Modal.confirm({
      title: '提示',
      content: '确定需要发布排班信息吗？',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      centered: true,
      onOk: () => {
      }
    })
  }

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
        <div className='title'>编辑排班</div>
        <Place />
        <div className='item'>
          <div className='label data'>日期：</div>
          <div className='content'>
            <DatePicker.RangePicker
              style={{ width: 200 }}
            />
          </div>
        </div>
        <div className='item'>
          <Button>查询</Button>
        </div>
        <div className='item'>
          <Button onClick={handleReset}>重置排班</Button>
        </div>
        <div className='item'>
          <Button>期望排班</Button>
        </div>
        <div className='item'>
          <Button onClick={handleCopy}>复制排班</Button>
        </div>
        <div className='item'>
          <Button>刷新排班人员</Button>
        </div>
        <div className='item'>
          <Button onClick={sheetViewModal.saveSheetTableData}>暂存</Button>
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
}

const Wrapper = styled.div`
  .contain {
    display: flex;
    align-items: flex-end;
    height: 70px;
    padding: 10px 20px;
    line-height: 70px;
    .title{
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
