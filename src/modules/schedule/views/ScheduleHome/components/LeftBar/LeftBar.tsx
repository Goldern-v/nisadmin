import styled from 'styled-components'
import React, { useState, useEffect } from 'react'

import service from 'src/services/api'
import emitter from 'src/libs/ev'

import { Menu, Icon, DatePicker, Radio } from 'antd'
import locale from 'antd/lib/date-picker/locale/zh_CN'

import moment from 'moment'
import { authStore, scheduleStore } from 'src/stores'
import createModal from '../../../../../../libs/createModal'
import FilterDateModal from '../../modal/FilterDateModal'
import { set } from 'lodash'
import { inflateSync } from 'zlib'
import { Place } from 'src/components/common'
import { observer } from 'mobx-react-lite'

moment.locale('zh-cn')

const { RangePicker } = DatePicker

const dateFormat = 'YYYY-MM-DD'
// const SubMenu = Menu.SubMenu
const ItemMenu = Menu.Item

// let rangePickerDefaultValue = new Array()
interface Props {}

export default observer(function LeftBar(props: Props) {
  /** 开始时间 结束时间*/
  let [[startDate, endDate], setDate] = useState([
    scheduleStore.getWeekStartTime() ||
      moment()
        .startOf('month')
        .isoWeekday(1)
        .format('YYYY-MM-DD'),
    scheduleStore.getWeekEndTime() ||
      moment()
        .endOf('month')
        .isoWeekday(7)
        .format('YYYY-MM-DD')
  ])

  let [oneWeekList, setOneWeekList] = useState([])
  let [twoWeekList, setTwoWeekList] = useState([])
  let [selectedWeek, setSelectedWeek] = useState([])

  const [shiftList, setShiftList] = useState([
    {
      mondy: '',
      status: '',
      sundy: '',
      week: 0
    }
  ])

  /** 一周排班-1， 二周排班-2 */
  const [scheduleType, setScheduleType] = useState(1)

  const filterDateModal = createModal(FilterDateModal)

  useEffect(() => {
    updateWeekList(startDate, endDate)
  }, [startDate, endDate])

  useEffect(() => {
    if (selectedWeek.length > 0) {
      handleItem(selectedWeek)
    }
  }, [scheduleStore.selectedGroupId])

  emitter.removeAllListeners('初始化周排班列表')
  emitter.addListener('初始化周排班列表', () => updateWeekList(startDate, endDate))

  // 更新周列表
  function updateWeekList(startTime: string, endTime: string, callBack: any = null) {
    // 接口请求参数
    const postData = {
      deptCode: scheduleStore.getDeptCode(),
      startTime: startTime,
      endTime: endTime
    }

    // moment().endOf('week')
    service.schedulingApiService
      .findTimeList(postData)
      .then((res) => {
        let startWeekNumber = moment(startTime).isoWeek()
        let endWeekNumber = moment(endTime).isoWeek()
        let weekList: any = []
        for (let i = startWeekNumber; i <= endWeekNumber; i++) {
          let w = res.data.find((item: any) => item.week == i)
          if (w) {
            weekList.push(w)
          } else {
            weekList.push({
              mondy: moment()
                .isoWeek(i)
                .isoWeekday(1)
                .format('YYYY-MM-DD'),
              status: '-1',
              sundy: moment()
                .isoWeek(i)
                .isoWeekday(7)
                .format('YYYY-MM-DD'),
              week: i
            })
          }
        }

        let twoWeekList: any = []
        setOneWeekList(weekList.map((item: any) => [item]))
        for (let i = 0; i < weekList.length; i += 2) {
          let weeks = []
          weeks.push(weekList[i])
          weekList[i + 1] && weeks.push(weekList[i + 1])
          twoWeekList.push(weeks)
        }

        setTwoWeekList(twoWeekList)
      })
      .catch((err) => {
        console.log('排班周列表错误', err)
      })
  }

  // 处理周点击
  function handleItem(items: any) {
    setSelectedWeek(items)
    // emitter.emit('动画载入表格中')
    // if (Number(time.status) === -1) {
    //   emitter.emit('禁止工具按钮', true)
    //   return emitter.emit('清空排班记录')
    // }

    // emitter.emit('禁止工具按钮', false)
    // 接口请求参数
    const postData = {
      deptCode: scheduleStore.getDeptCode(),
      startTime: items[0].mondy,
      endTime: items[1] ? items[1].sundy : items[0].sundy,
      nurseGroup: scheduleStore.selectedGroupId
    }
    service.schedulingApiService
      .findShiftList(postData)
      .then((res) => {
        // todo ... emitter 将数据传递给表格组件进行下一步数据渲染
        if (res && res.data) {
          scheduleStore.setStartTime(items[0].mondy)
          scheduleStore.setEndTime(items[1] ? items[1].sundy : items[0].sundy)

          if (Math.max(...items.map((item: any) => Number(item.status))) > -1) {
            emitter.emit('禁止工具按钮', false)
          }
          if (items.length == 2) {
            emitter.emit('二周排班记录', res.data)
          } else {
            emitter.emit('本周排班记录', res.data)
          }
        } else {
          emitter.emit('清空排班记录')
        }
      })
      .catch((err) => {
        console.log('排班记录错误', err)
      })
  }

  let weekList = scheduleType == 1 ? oneWeekList : twoWeekList
  return (
    <Wrapper>
      <ListPart style={{ width: '100%', height: 'auto', minHeight: '100vh' }}>
        {/* {JSON.stringify(twoWeekList)} */}
        <HeadCon>
          <span className='title'>排班记录</span>
          <span
            className='filter-btn'
            onClick={() =>
              filterDateModal.show({
                startDate,
                endDate,
                onOkCallBack: (startDate: string, endDate: string) => {
                  scheduleStore.setWeekStartTime(startDate)
                  scheduleStore.setWeekEndTime(endDate)
                  setDate([startDate, endDate])
                }
              })
            }
          >
            筛选时间
          </span>
        </HeadCon>
        <RadioCon>
          <Radio.Group
            onChange={(e) => {
              setScheduleType(e.target.value)
            }}
            value={scheduleType}
          >
            <Radio value={1}>一周排班</Radio>
            <Radio value={2}>二周排班</Radio>
          </Radio.Group>
        </RadioCon>

        {weekList.map((items: any, index) => {
          let status = Math.max(...items.map((item: any) => Number(item.status))) + ''
          let text = ''
          let date = ''
          let format = (date: string) => moment(date).format('MM/DD')
          if (items.length == 1) {
            text = `第${items[0].week}周`
            date = `${format(items[0].mondy)} - ${format(items[0].sundy)}`
          } else if (items.length == 2) {
            text = `第${items[0].week}-${items[1].week}周`
            date = `${format(items[0].mondy)} - ${format(items[1].sundy)}`
          }
          return (
            <ListItem onClick={(e) => handleItem(items)} key={index} active={items === selectedWeek}>
              <CircleCon color={status} />
              <span>{text}</span>
              <Place />
              <span>{date}</span>
            </ListItem>
          )
        })}
      </ListPart>
      <filterDateModal.Component />
    </Wrapper>
  )
})
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background: rgba(248, 248, 248, 1);
  box-shadow: 3px 3px 6px 0px rgba(0, 0, 0, 0.15);
  ul,
  li {
    background: rgba(248, 248, 248, 1);
  }
`

const CircleCon = styled.div`
  height: 10px;
  width: 10px;
  display: inline-block;
  border-radius: 5px;
  margin-right: 5px;
  background: ${(props) => (props.color === '1' ? '#5dbf9a' : props.color === '0' ? 'red' : 'gray')};
`
// 0代表暂存红，1代表发布绿, 其他灰色

const HeadCon = styled.div`
  display: flex;
  justify-content: space-between;
  height: 35px;
  padding: 14px 10px 10px;
  .title {
    font-weight: bold;
  }
  .filter-btn {
    cursor: pointer;
    color: ${(p) => p.theme.$mtc};
    &:hover {
      font-weight: bold;
    }
  }
`

const RadioCon = styled.div`
  padding: 10px;
`

const ListPart = styled.div``

const ListItem = styled.div<{ active: boolean }>`
  padding: 10px 20px 10px 10px;
  display: flex;
  align-items: center;
  height: 40px;
  margin: 5px 0;
  cursor: pointer;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    background: ${(p: any) => p.theme.$mtc};
    width: 4px;
    display: none;
  }
  ${(p) =>
    p.active &&
    `
    background: rgb(207, 230, 220);
    &:after {
      display: block;
    }
    `}

  &:hover {
    background: rgb(207, 230, 220);
    &:active span {
      color: ${(p) => p.theme.$mtc};
    }
  }
`
