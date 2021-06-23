import styled from "styled-components"
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import moment from 'moment'
import { Select } from "antd";
import api from "src/modules/quality/views/dutyRecord/api";

interface Props {
  data: any[],
  nurseList: any[],
  updateData: Function
}

export default observer((props: Props) => {
  const { data, nurseList, updateData } = props
  const [weeks, setWeeks] = useState(5) // 当前月跨多少个周

  const DayCmp = (day: any, key: string) => {
    const date = day.date ? day.date.format('MM月DD号') : ''
    const weekArr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
    const [, week]: any = key.split('-')

    const handleChange = (val: any) => {
      const newData = data.map((item: any) => {
        if (item.date === day.date) {
          const findObj = nurseList.find((i: any) => i.empNo === val)
          item.empNo = findObj.empNo
          item.empName = findObj.empName
          item.empPhone = findObj.phone
        }
        return item
      })
      updateData(newData)
    }

    return (
      <DayWrapper key={key}>
        <div className='date'>{date}</div>
        <div className='week'>{weekArr[week]}</div>
        <div className='person'>
          {
            day.date &&
            <Select
              showSearch
              value={day.empNo}
              onChange={handleChange}
              optionFilterProp="children"
              filterOption={(input, option: any) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {nurseList.map((user: any, index: number) => {
                return <Select.Option value={user.empNo} key={user.empNo}>{user.empName}</Select.Option>
              })}
            </Select>}
        </div>
      </DayWrapper>
    )
  }

  const WeekCmp = (weekData: any[], key: number) => {
    return (
      <WeekWrapper key={key}>
        <div className='week-title'>姓名时间</div>
        {weekData.map((item, index) => {
          return DayCmp(item, key + '-' + index)
        })}
      </WeekWrapper>
    )
  }

  const getWeeks = () => {
    const fakeArr = Array.from({ length: weeks })
    return (
      <React.Fragment>
        {fakeArr.map((item, index) => {
          return WeekCmp(data.slice(index * 7, index * 7 + 7), index)
        })}
      </React.Fragment>
    )
  }

  useEffect(() => {
    if (props.data.length) {
      setWeeks(Math.ceil(props.data.length / 7))
    }
  }, [props.data])

  return (
    <Wrapper>
      {getWeeks()}
    </Wrapper>
  )
})

const Wrapper = styled.div`
  height: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
`
const WeekWrapper = styled.div`
  flex:1;
  display: flex;
  .week-title{
    flex:1;
    border: 1px solid #ccc;
    background: #B9B4FF;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
  }
`

const DayWrapper = styled.div`
  flex: 1;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
   
  .date{
     background: #B9B4FF;
  }
  .week{
    background: #FFFFB6;
  }
  .person{
    padding: 2px;
  }
  div{
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
  }
`