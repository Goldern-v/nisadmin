import styled from "styled-components"
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import moment from 'moment'
import { Select,Input } from "antd";
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
    const date = day.date ? day.date.format('DD') : ''

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

    const handleChangeText = (e: any) => {
      day.dutyPlace = e.target.value
      const newData = data.map((item: any) => {
        return item
      })
      updateData(newData)
    }

    const changeState = (type: any) => {
      if(type==0){
        day.workState = 1
      }else if (type==1){
        day.workState = 2
      }else if (type==2){
        day.workState = 0
      }else{
        day.workState = 1
      }
      const newData = data.map((item: any) => {
        return item
      })
      updateData(newData)
    }

    return (
      <DayWrapper key={key}>
        <div className='date'>
        {/* （0：正常 1：休 2：班） */}
        {(day.workState=="1" || day.workState=="2") && <div className='left' onClick={() => changeState(day.workState)}>{date}<span className='redSpan'>({day.workState==1?"休":"班"})</span></div>}
        {day.workState=="0" && day.workState!="1" && day.workState!="2" && <div onClick={() => changeState(day.workState)} className='left'>{date}</div>}
        {day.workState!="0" && day.workState!="1" && day.workState!="2" && <div onClick={() => changeState(day.workState)} className='left'>{date}</div>}
          <div className='right'>
          {
            day.date &&
            <Select
              showSearch
              showArrow={false}
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
        </div>
        <div className='text'>
          <input type="text" id="dutyPlace" name="dutyPlace" value={day.dutyPlace || ""} onChange={handleChangeText}/>
          
        </div>

      </DayWrapper>
    )
  }

  const WeekCmp = (weekData: any[], key: number) => {
    return (
      <WeekWrapper key={key}>
        {/* <div className='week-title'>姓名时间</div> */}
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
  height: 80px;
  display: flex;
  flex-direction: column;
  .week{
     background: #B9B4FF;
  }
  .date{
    margin-top:-1px;
  }
  .left{
    height:100%;
    width:40%;
    background: #FFFFB6;
    cursor:pointer;
    user-select:none;
    span{
      cursor:pointer;
      color: #FFFFB6;
    }
    .redSpan{
      color: red;
      cursor:pointer;
    }
  }
  .right{
    height:100%;
    width:60% !importent ;
    background: #fff;
    border-left: 1px solid #ccc;
  }
  .text{
    border-top: 1px solid #ccc;
    input{
      width: 90%;
      border:none;
      border-radius:0;
      box-shadow: 0px 0px 0px 0px;
      text-align:center;
    }
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