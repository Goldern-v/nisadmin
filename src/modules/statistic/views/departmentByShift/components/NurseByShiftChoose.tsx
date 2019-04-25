import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Radio, Checkbox } from 'antd'
import emitter from 'src/libs/ev'
import { RouteComponentProps } from 'react-router'
const RadioGroup = Radio.Group
const startShiftClass = ['A班', 'P班', 'N班', '休假', '进修学习', '其它']
const ShiftClassState = ['A班', 'P班', 'N班', '休假', '进修学习', '其它']
const checkboxItemStandard = [
  '班次1',
  '班次2',
  '班次3',
  '班次4',
  '班次5',
  '班次6',
  '班次7',
  '班次8',
  '班次9',
  '班次10',
  '班次11',
  '班次12',
  '班次13',
  '班次14'
]
const checkboxItemState: any = []
export interface Props extends RouteComponentProps {}

export default function BedSituation (props: any) {
  const [shiftClass, setShiftClass] = useState(['A班', 'P班', 'N班', '休假', '进修学习', '其它'])
  const [rightChooseCheckboxShow, setRightChooseCheckboxShow] = useState([true, false])
  const [checkboxItem, setCheckboxItem] = useState([])
  useEffect(() => {
    // props.postShiftClass(shiftClass)
    emitter.emit('设置班次大类', shiftClass)
    emitter.emit('设置自定义班次', checkboxItem)
    // console.log(checkboxItem)
  })

  function onChange (e: any) {
    let target = e.target
    let targetValue = target.value
    let cacheShiftClass
    if (!target.checked) {
      for (let i = 0; i < startShiftClass.length; i++) {
        if (targetValue === startShiftClass[i]) {
          ShiftClassState.splice(i, 1, '')
          cacheShiftClass = ShiftClassState.filter((n) => n)
          setShiftClass(cacheShiftClass)
        }
      }
    }
    if (target.checked) {
      for (let i = 0; i < startShiftClass.length; i++) {
        if (target.value === startShiftClass[i]) {
          ShiftClassState.splice(i, 1, targetValue)
          cacheShiftClass = ShiftClassState.filter((n) => n)
          setShiftClass(cacheShiftClass)
        }
      }
    }
  }
  function radioClickLeft () {
    setRightChooseCheckboxShow([true, false])
    setShiftClass(['A班', 'P班', 'N班', '休假', '进修学习', '其它'])
    setCheckboxItem([])
  }
  function radioClickRight () {
    setRightChooseCheckboxShow([false, true])
    setShiftClass([])
  }
  // checkbox变动
  function checkboxChange (e: any) {
    let target = e.target
    let targetValue = target.value
    let cacheCheckboxItem
    if (target.checked) {
      for (let i = 0; i < checkboxItemStandard.length; i++) {
        if (targetValue === checkboxItemStandard[i]) {
          checkboxItemState[i] = targetValue
        }
        cacheCheckboxItem = checkboxItemState.filter((n: any) => n)
        setCheckboxItem(cacheCheckboxItem)
      }
    }
    if (!target.checked) {
      for (let i = 0; i < checkboxItemStandard.length; i++) {
        if (targetValue === checkboxItemStandard[i]) {
          checkboxItemState[i] = null
        }
      }
      cacheCheckboxItem = checkboxItemState.filter((n: any) => n)
      setCheckboxItem(cacheCheckboxItem)
    }
  }
  // 组件
  const RightChooseByShiftCheckbox = (
    <div className='RightChooseByShiftCheckbox'>
      <div className='RightChooseByShiftCheckboxItem'>
        <Checkbox defaultChecked onChange={onChange} value='A班'>
          A班
        </Checkbox>
      </div>
      <div className='RightChooseByShiftCheckboxItem'>
        <Checkbox defaultChecked onChange={onChange} value='P班'>
          P班
        </Checkbox>
      </div>
      <div className='RightChooseByShiftCheckboxItem'>
        <Checkbox defaultChecked onChange={onChange} value='N班'>
          N班
        </Checkbox>
      </div>
      <div className='RightChooseByShiftCheckboxItem'>
        <Checkbox defaultChecked onChange={onChange} value='休假'>
          休假
        </Checkbox>
      </div>
      <div className='RightChooseByShiftCheckboxItem'>
        <Checkbox defaultChecked onChange={onChange} value='进修学习'>
          进修学习
        </Checkbox>
      </div>
      <div className='RightChooseByShiftCheckboxItem'>
        <Checkbox defaultChecked onChange={onChange} value='其它'>
          其它
        </Checkbox>
      </div>
    </div>
  )
  const RightChooseByCustomCheckbox = (
    <div className='RightChooseByShiftCheckbox'>
      <div className='RightChooseByShiftCheckboxItem'>
        <Checkbox onChange={checkboxChange} value='班次1'>
          班次1
        </Checkbox>
      </div>
      <div className='RightChooseByShiftCheckboxItem'>
        <Checkbox onChange={checkboxChange} value='班次2'>
          班次2
        </Checkbox>
      </div>
      <div className='RightChooseByShiftCheckboxItem'>
        <Checkbox onChange={checkboxChange} value='班次3'>
          班次3
        </Checkbox>
      </div>
      <div className='RightChooseByShiftCheckboxItem'>
        <Checkbox onChange={checkboxChange} value='班次4'>
          班次4
        </Checkbox>
      </div>
      <div className='RightChooseByShiftCheckboxItem'>
        <Checkbox onChange={checkboxChange} value='班次5'>
          班次5
        </Checkbox>
      </div>
      <div className='RightChooseByShiftCheckboxItem'>
        <Checkbox onChange={checkboxChange} value='班次6'>
          班次6
        </Checkbox>
      </div>
      <div className='RightChooseByShiftCheckboxItem'>
        <Checkbox onChange={checkboxChange} value='班次7'>
          班次7
        </Checkbox>
      </div>
      <div className='RightChooseByShiftCheckboxItem'>
        <Checkbox onChange={checkboxChange} value='班次8'>
          班次8
        </Checkbox>
      </div>
      <div className='RightChooseByShiftCheckboxItem'>
        <Checkbox onChange={checkboxChange} value='班次9'>
          班次9
        </Checkbox>
      </div>
      <div className='RightChooseByShiftCheckboxItem'>
        <Checkbox onChange={checkboxChange} value='班次10'>
          班次10
        </Checkbox>
      </div>
      <div className='RightChooseByShiftCheckboxItem'>
        <Checkbox onChange={checkboxChange} value='班次11'>
          班次11
        </Checkbox>
      </div>
      <div className='RightChooseByShiftCheckboxItem'>
        <Checkbox onChange={checkboxChange} value='班次12'>
          班次12
        </Checkbox>
      </div>
      <div className='RightChooseByShiftCheckboxItem'>
        <Checkbox onChange={checkboxChange} value='班次13'>
          班次13
        </Checkbox>
      </div>
      <div className='RightChooseByShiftCheckboxItem'>
        <Checkbox onChange={checkboxChange} value='班次14'>
          班次14
        </Checkbox>
      </div>
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
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    .RightChooseByShiftCheckboxItem {
      width: 104px;
      height: 36px;
      line-height: 36px;
    }
  }
`
