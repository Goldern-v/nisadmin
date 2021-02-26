import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Radio, Checkbox } from 'antd'
import emitter from 'src/libs/ev'
import { RouteComponentProps } from 'react-router'
import StatisticsApi from 'src/modules/statistic/api/StatisticsApi'
const RadioGroup = Radio.Group
const startShiftClass = ['A班', 'P班', 'N班', '休假', '进修学习', '其它']
let ShiftClassState = ['A班', 'P班', 'N班', '休假', '进修学习', '其它']

// const checkboxItemStandard = [
// '班次1',
// '班次2',
// '班次3',
// '班次4',
// '班次5',
// '班次6',
// '班次7',
// '班次8',
// '班次9',
// '班次10',
// '班次11',
// '班次12',
// '班次13',
// '班次14'
// ]
let checkboxItemState: any = []
let classState: any = []
export interface Props extends RouteComponentProps { }

export default function BedSituation(props: any) {
  const [shiftClass, setShiftClass] = useState(['A班', 'P班', 'N班', '休假', '进修学习', '其它'])
  const [rightChooseCheckboxShow, setRightChooseCheckboxShow] = useState([true, false])
  const [checkboxItem, setCheckboxItem] = useState([])
  const [checkboxItemStandard, setCheckboxItemStandard] = useState([])
  const [cacheCheckboxItem, setCacheCheckboxItem] = useState([])
  //
  const [startClassList, setStartClassList]: any = useState([])
  const [classList, setClassList]: any = useState([])
  useEffect(() => {
    StatisticsApi.postName().then((res) => {
      let listData = res.data
      let getShiftType = listData.map((item: any) => item.name)
      setCheckboxItemStandard(getShiftType)
    })
    StatisticsApi.dictInfo().then((res) => {
      let listData = res.data
      let ClassListInfo = listData.map((item: any) => item.name)
      setStartClassList(ClassListInfo)
      classState = [...ClassListInfo]
      setClassList(ClassListInfo)
    })
  }, [])
  emitter.emit('设置班次大类', classList)
  emitter.emit('设置自定义班次', checkboxItem)
  function onChange(e: any) {
    let target = e.target
    let targetValue = target.value
    if (target.checked) {
      for (let i = 0; i < startClassList.length; i++) {
        if (targetValue === startClassList[i]) {
          classState[i] = targetValue
        }
        let cacheClassList = classState.filter((n: any) => n)
        setClassList(cacheClassList)
      }
    }
    if (!target.checked) {
      for (let i = 0; i < startClassList.length; i++) {
        if (targetValue === startClassList[i]) {
          classState[i] = null
        }
      }
      let cacheClassList = classState.filter((n: any) => n)
      setClassList(cacheClassList)
    }
  }
  function radioClickLeft() {
    setRightChooseCheckboxShow([true, false])
    setClassList(startClassList)
    classState = [...startClassList]
    setCheckboxItem([])
    checkboxItemState = []
  }
  function radioClickRight() {
    setRightChooseCheckboxShow([false, true])
    setClassList([])
    setCheckboxItem([])
    checkboxItemState = []
  }
  // checkbox变动
  function checkboxChange(e: any) {
    let target = e.target
    let targetValue = target.value
    if (target.checked) {
      for (let i = 0; i < checkboxItemStandard.length; i++) {
        if (targetValue === checkboxItemStandard[i]) {
          checkboxItemState[i] = targetValue
        }
        let cacheSetCacheCheckboxItem = checkboxItemState.filter((n: any) => n)
        setCacheCheckboxItem(cacheSetCacheCheckboxItem)
        setCheckboxItem(cacheSetCacheCheckboxItem)
      }
    }
    if (!target.checked) {
      for (let i = 0; i < checkboxItemStandard.length; i++) {
        if (targetValue === checkboxItemStandard[i]) {
          checkboxItemState[i] = null
        }
      }
      let cacheSetcacheCheckboxItem = checkboxItemState.filter((n: any) => n)
      setCacheCheckboxItem(cacheSetcacheCheckboxItem)
      setCheckboxItem(cacheSetcacheCheckboxItem)
    }
  }
  // 组件
  const RightChooseByShiftCheckbox = (
    <div className='RightChooseByShiftCheckbox'>
      {startClassList.map((item: any, index: number) => (
        <div className='RightChooseByShiftCheckboxItem' key={index}>
          <Checkbox defaultChecked onChange={onChange} value={item}>
            {item}
          </Checkbox>
        </div>
      ))}
    </div>
  )
  // 接口组件
  const RightChooseByCustomCheckbox = (
    <div className='RightChooseByShiftCheckbox'>
      {checkboxItemStandard.map((item: any, index: any) => (
        <div className='RightChooseByShiftCheckboxItem' key={index}>
          <Checkbox onChange={checkboxChange} value={item}>
            {item}
          </Checkbox>
        </div>
      ))}
    </div>
  )

  return (
    <Con>
      {/* <TableModel /> */}
      <RightChooseByShift>
        <div className='RightChooseByShiftHeader'>统计班次</div>
        <div className='RightChooseByShiftRadio'>
          <RadioGroup name='radiogroup' defaultValue={1}>
            <Radio value={1} onClick={radioClickLeft}>
              按班次大类
            </Radio>
            <Radio value={2} onClick={radioClickRight}>
              自定义班次
            </Radio>
          </RadioGroup>
        </div>
        {rightChooseCheckboxShow[0] && RightChooseByShiftCheckbox}
        {rightChooseCheckboxShow[1] && RightChooseByCustomCheckbox}
      </RightChooseByShift>
    </Con>
  )
}

const Con = styled.div`
  width: 100%;
`
const RightChooseByShift = styled.div`
  /* position: absolute;
  top: -270px;
  right: 20px; */
  height: 380px;
  border: 1px solid #d0d0d0;
  font-size: 12px;
  .RightChooseByShiftHeader {
    padding-left: 10px;
    height: 30px;
    line-height: 30px;
    background-color: #e4e4e4;
  }
  .RightChooseByShiftRadio {
    padding-left: 10px;
    height: 44px;
    line-height: 44px;
    .ant-radio-wrapper {
      margin: 0;
      padding: 0;
      width: 104px;
    }
  }
  .RightChooseByShiftCheckbox {
    /* 调整间距 */
    margin-top: 20px;
    padding-left: 10px;
    /* display: flex;
    flex-direction: row;
    flex-wrap: wrap; */
    overflow-y: scroll;
    height: 270px;

  }
  .RightChooseByShiftCheckboxItem {
    width: 104px;
    height: 36px;
    line-height: 36px;
    display: inline-block;
  }
`
