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
export interface Props {
  filterObj?: any
  onFilterObjChange?: Function
}

export default function BedSituation(props: Props) {
  const { filterObj, onFilterObjChange } = props
  // checkbox变动
  function checkboxChange(e: any) {
    let target = e.target
    let targetValue = target.value

  }
  // 组件
  // const RightChooseByShiftCheckbox = (
  //   <div className='RightChooseByShiftCheckbox'>
  //     {startClassList.map((item: any, index: number) => (
  //       <div className='RightChooseByShiftCheckboxItem' key={index}>
  //         <Checkbox defaultChecked onChange={onChange} value={item}>
  //           {item}
  //         </Checkbox>
  //       </div>
  //     ))}
  //   </div>
  // )
  // 接口组件
  // const RightChooseByCustomCheckbox = (
  //   <div className='RightChooseByShiftCheckbox'>
  //     {checkboxItemStandard.map((item: any, index: any) => (
  //       <div className='RightChooseByShiftCheckboxItem' key={index}>
  //         <Checkbox onChange={checkboxChange} defaultChecked value={item}>
  //           {item}
  //         </Checkbox>
  //       </div>
  //     ))}
  //   </div>
  // )

  const handleTypeChange = (currentType: string) => {
    let newFilterObj = { ...filterObj }

    Object.keys(newFilterObj).forEach((key: string) => {
      if (currentType === key)
        newFilterObj[key].checked = !newFilterObj[key].checked
      else
        newFilterObj[key].checked = false
    })

    onFilterObjChange && onFilterObjChange(newFilterObj)
  }

  return (
    <Con>
      {/* <TableModel /> */}
      <RightChooseByShift>
        <div className='RightChooseByShiftHeader'>统计班次</div>
        <div className='RightChooseByShiftRadio'>
          <Radio checked={filterObj['shift_type']?.checked} onClick={() => handleTypeChange('shift_type')}>
            按班次大类
          </Radio>
          <Radio checked={filterObj['range_name']?.checked} onClick={() => handleTypeChange('range_name')}>
            自定义班次
          </Radio>
        </div>
        {/* {rightChooseCheckboxShow[0] && RightChooseByShiftCheckbox} */}
        {/* {rightChooseCheckboxShow[1] && RightChooseByCustomCheckbox} */}
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
