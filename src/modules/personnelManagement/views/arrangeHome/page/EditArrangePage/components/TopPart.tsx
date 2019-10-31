import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, DatePicker, Modal, message } from 'antd'
import BreadcrumbBox from 'src/layouts/components/BreadcrumbBox'
import { Place } from 'src/components/common'
import { observer } from 'mobx-react-lite'
import { arrangeService } from '../../../services/ArrangeService'
import { sheetViewModal } from '../../../viewModal/SheetViewModal'
import { selectViewModal } from '../../../viewModal/SelectViewModal'
import ExpectSettingModal from '../../../modal/ExpectSettingModal'
import createModal from 'src/libs/createModal'
import { appStore } from 'src/stores'
import emitter from 'src/libs/ev'

import moment from 'moment'
import { Select } from 'src/vendors/antd'

export interface Props {}

export default observer(function TopPart() {
  const [date, setDate] = useState([] as any[])
  const [isInit, setIsInit] = useState(true)
  let expectSettingModal = createModal(ExpectSettingModal)

  //重置排班
  const handleReset = () => {
    Modal.confirm({
      title: '提示',
      content: '确认要重置排班吗？重制后本页数据将会被清空',
      okText: '确定',
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
        sheetViewModal.handleCopy()
        // arrangeService.copyPrevSettingRange().then((res) => {
        //   // sheetViewModal.init()
        //   sheetViewModal.sheetTableData == res.data
        //   message.success('复制成功')
        // })
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
      onOk: () => {
        sheetViewModal.saveSheetTableData('1')
      }
    })
  }

  //同步排班
  const findSysnNurse = () => {
    Modal.confirm({
      title: '确定需要同步排班人员信息吗？',
      content: '同步排班人员前请确保已经暂存,未暂存的数据会丢失。',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      centered: true,
      onOk: () => {
        sheetViewModal.findSysnNurse().then((res) => {
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
        style={{
          padding: '5px 15px 0'
        }}
      />
      <div className='head-contain'>
        {/* <div className='title'>编辑排班</div> */}
        {/* <Place /> */}
        <div className='item'>
          <div className='label data'>日期：</div>
          <div className='content'>
            <DatePicker.RangePicker
              allowClear={false}
              value={
                selectViewModal.params.startTime
                  ? [moment(selectViewModal.params.startTime), moment(selectViewModal.params.endTime)]
                  : undefined
              }
              onChange={(value: any) => {
                selectViewModal.params.startTime = value[0].format('YYYY-MM-DD')
                selectViewModal.params.endTime = value[1].format('YYYY-MM-DD')
                sheetViewModal.getSheetTableData()
              }}
              style={{ width: 230 }}
              ranges={{
                本周: [moment().startOf('week'), moment().endOf('week')],
                上周: () => {
                  let date: any = [moment(selectViewModal.params.startTime), moment(selectViewModal.params.endTime)]
                  /** 判断是否是一周 */
                  let weeks = date[0].week()
                  if (
                    date[0].format('YYYY-MM-DD') == date[0].startOf('week').format('YYYY-MM-DD') ||
                    date[1].format('YYYY-MM-DD') == date[0].endOf('week').format('YYYY-MM-DD')
                  ) {
                    return [
                      moment()
                        .week(weeks - 1)
                        .startOf('week'),
                      moment()
                        .week(weeks - 1)
                        .endOf('week')
                    ]
                  }
                  return [
                    moment()
                      .week(moment().week() - 1)
                      .startOf('week'),
                    moment()
                      .week(moment().week() - 1)
                      .endOf('week')
                  ]
                },
                下周: () => {
                  /** 判断是否是一周 */
                  let date: any = [moment(selectViewModal.params.startTime), moment(selectViewModal.params.endTime)]
                  let weeks = date[0].week()
                  if (
                    date[0].format('YYYY-MM-DD') == date[0].startOf('week').format('YYYY-MM-DD') ||
                    date[1].format('YYYY-MM-DD') == date[0].endOf('week').format('YYYY-MM-DD')
                  ) {
                    return [
                      moment()
                        .week(weeks + 1)
                        .startOf('week'),
                      moment()
                        .week(weeks + 1)
                        .endOf('week')
                    ]
                  }
                  return [
                    moment()
                      .week(moment().week() + 1)
                      .startOf('week'),
                    moment()
                      .week(moment().week() + 1)
                      .endOf('week')
                  ]
                },
                本月: [moment().startOf('month'), moment().endOf('month')],
                上月: [
                  moment()
                    .month(moment().month() - 1)
                    .startOf('month'),
                  moment()
                    .month(moment().month() - 1)
                    .endOf('month')
                ],
                下月: [
                  moment()
                    .month(moment().month() + 1)
                    .startOf('month'),
                  moment()
                    .month(moment().month() + 1)
                    .endOf('month')
                ]
              }}
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
          <Button type='primary' onClick={() => sheetViewModal.init()}>
            查询
          </Button>
        </div>
        <div className='item'>
          <Button onClick={handleReset}>重置排班</Button>
        </div>
        <div className='item'>
          <Button onClick={() => expectSettingModal.show()}>期望排班</Button>
        </div>
        <div className='item'>
          <Button onClick={handleCopy}>复制排班</Button>
        </div>
        <div className='item'>
          <Button onClick={findSysnNurse}>同步排班人员</Button>
        </div>
        <div className='item'>
          <Button type='primary' onClick={() => sheetViewModal.saveSheetTableData('0')}>
            暂存
          </Button>
        </div>
        <div className='item'>
          <Button onClick={handlePush}>{sheetViewModal.isPush ? '已发布' : '发布'}</Button>
        </div>
        <div className='item'>
          <Button
            className='statistics'
            onClick={() => {
              appStore.history.push('/personnelManagement/arrangeHome?noRefresh=1')
            }}
          >
            返回
          </Button>
        </div>
      </div>
      <expectSettingModal.Component />
    </Wrapper>
  )
})

const Wrapper = styled.div`
  .head-contain {
    display: flex;
    align-items: flex-end;
    height: 45px;
    padding: 5px 0 10px 20px;
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
  button,
  select,
  .ant-calendar-picker,
  .ant-input,
  .ant-select,
  .ant-select-selection--single {
    height: 28px;
  }
  .ant-select-selection__rendered {
    line-height: 27px;
  }
  .ant-input {
    line-height: 1.3;
  }
`
