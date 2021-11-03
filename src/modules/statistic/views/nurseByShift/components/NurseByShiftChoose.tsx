import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Radio, Checkbox } from 'antd'
import emitter from 'src/libs/ev'
import { RouteComponentProps } from 'react-router'
import StatisticsApi from 'src/modules/statistic/api/StatisticsApi'
import { CheckboxValueType } from 'antd/lib/checkbox/Group'
const CheckboxGroup = Checkbox.Group;

const RadioGroup = Radio.Group
let checkboxItemState: any = []
let classState: any = []

export interface Props extends RouteComponentProps {
}
BedSituation.defaultProps = {
  defaultChecked_gxjb: true
}
export default function BedSituation(props: any) {
  const [shiftClass, setShiftClass] = useState([])
  const [rightChooseCheckboxShow, setRightChooseCheckboxShow] = useState([true, false])
  const [startClassList, setStartClassList]: any = useState([])
  const [checkboxItemStandard, setCheckboxItemStandard] = useState([])
  const [checkboxItem, setCheckboxItem] = useState([])
  // const [cacheCheckboxItem, setCacheCheckboxItem] = useState([])
  const [classList, setClassList]: any = useState([])
  // 全选按钮
  const [checkedList, setCheckedList]: any = useState([])
  const [indeterminate, setIndeterminate]: any = useState(false)
  const [checkAll, setCheckAll]: any = useState([])
  // const [checkedList, setCheckedList]: any = useState([])

  useEffect(() => {
    StatisticsApi.postName().then((res) => {
      let listData = res.data
      let getShiftType = listData.map((item: any) => item.name)
      setCheckboxItemStandard(getShiftType)
      checkboxItemState = [...getShiftType]
      setCheckboxItem(getShiftType)
    })
    StatisticsApi.dictInfo().then((res) => {
      let listData = res.data
      let ClassListInfo = listData.map((item: any) => item.name)
      setStartClassList(ClassListInfo)
      classState = [...ClassListInfo]
      setClassList(ClassListInfo)
      setCheckedList(ClassListInfo)
    })
  }, [])
  emitter.emit('设置班次大类', classList)
  emitter.emit('设置自定义班次', checkboxItem)

  // const onChange = (checkedList: string | any[]) => {
  //   setCheckedList(checkedList)
  //   setIndeterminate(!!checkedList.length && (checkedList.length < startClassList.length))
  //   setCheckAll(checkedList.length === startClassList.length)
  // }
  function onChange(e: any) {
    // setCheckedList(data)
    // setIndeterminate(!!data.length && (data.length < startClassList.length))
    // setCheckAll(data.length === startClassList.length)
    // setClassList(data)
    // console.log(checkAll, 87)
    // console.log(data, 888)
    console.log(e.target.checked, 89)

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

  // 全选按钮
  const onCheckAllChange = (e: { target: { checked: any } }) => {
    setCheckedList(e.target.checked ? startClassList : [])
    setIndeterminate(false)
    setCheckAll(e.target.checked)
    setClassList(e.target.checked ? startClassList : [])
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
        // setCacheCheckboxItem(cacheSetCacheCheckboxItem)
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
      // setCacheCheckboxItem(cacheSetcacheCheckboxItem)
      setCheckboxItem(cacheSetcacheCheckboxItem)
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
    setCheckboxItem(checkboxItemStandard)
    checkboxItemState = [...checkboxItemStandard]
    setClassList([])
  }

  // 组件
  const RightChooseByShiftCheckbox = (
    <div className='RightChooseByShiftCheckbox '>
      <div style={{ borderBottom: '1px solid #E9E9E9' }}>
        <Checkbox
          indeterminate={indeterminate}
          onChange={onCheckAllChange}
          checked={checkAll}
        >
          全选
        </Checkbox>
      </div>
      {startClassList.map((item: any, index: number) => (
        <div className='RightChooseByShiftCheckboxItem' key={index}>
          <Checkbox defaultChecked onChange={onChange} value={item}>
            {item}
          </Checkbox>
        </div>
      ))}
      {/* <CheckboxGroup options={startClassList} value={checkedList} onChange={onChange} /> */}
    </div>
  )
  // 接口组件
  const RightChooseByCustomCheckbox = (
    <div className='RightChooseByShiftCheckbox'>
      {checkboxItemStandard.map((item: any, index: any) => (
        <div className='RightChooseByShiftCheckboxItem' key={index}>
          <Checkbox onChange={checkboxChange} defaultChecked value={item}>
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
          <RadioGroup name='radioGroup' defaultValue={1}>
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
  height: auto;
`
const RightChooseByShift = styled.div`
  /* position: absolute;
  top: -270px;
  right: 20px; */
  min-height: 300px;
  height: auto;
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
    .ant-checkbox-group{
      label{
        width: 104px;
        height: 36px;
        line-height: 36px;
        display: inline-block;
      }
    }
  }
  .RightChooseByShiftCheckboxItem {
    width: 104px;
    height: 36px;
    line-height: 36px;
    display: inline-block;
  }
`
