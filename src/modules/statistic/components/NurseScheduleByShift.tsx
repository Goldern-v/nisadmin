import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import TableModel from '../common/TableModel'
import { Radio, Checkbox } from 'antd'
const RadioGroup = Radio.Group
const startShiftClass = ['A班', 'P班', 'N班', '休假', '进修学习', '其它']
const ShiftClassState = ['A班', 'P班', 'N班', '休假', '进修学习', '其它']
export default function BedSituation (props: any) {
  // const [count, setCount] = useState(0)
  const [shiftClass, setShiftClass] = useState(['A班', 'P班', 'N班', '休假', '进修学习', '其它'])
  useEffect(() => {
    props.postShiftClass(shiftClass)
  })

  function onChange (e: any) {
    let target = e.target
    let targetValue = target.value
    if (!target.checked) {
      for (let i = 0; i < startShiftClass.length; i++) {
        if (targetValue === startShiftClass[i]) {
          ShiftClassState.splice(i, 1, '')
          let cacheShiftClass = ShiftClassState.filter((n) => n)
          setShiftClass(cacheShiftClass)
        }
      }
    }
    if (target.checked) {
      for (let i = 0; i < startShiftClass.length; i++) {
        if (target.value === startShiftClass[i]) {
          ShiftClassState.splice(i, 1, targetValue)
          let cacheShiftClass = ShiftClassState.filter((n) => n)
          setShiftClass(cacheShiftClass)
        }
      }
    }
  }
  return (
    <Con>
      <TableModel />
      <RightChooseByShift>
        <div className='RightChooseByShiftHeader'>统计班次</div>
        <div className='RightChooseByShiftRadio'>
          <RadioGroup name='radiogroup' defaultValue={1}>
            <Radio value={1}>按班次大类</Radio>
            <Radio value={2}>自定义班次</Radio>
          </RadioGroup>
        </div>
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
      </RightChooseByShift>
    </Con>
  )
}

const Con = styled.div`
  width: 100%;
  position: relative;
`
const RightChooseByShift = styled.div`
  position: absolute;
  top: -50px;
  right: 20px;
  width: 222px;
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
