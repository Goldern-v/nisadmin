import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Radio, Checkbox } from 'antd'
import { ScrollBox } from 'src/components/common'
export interface Props {
  filterObj?: any
  onFilterObjChange?: Function
}

export default function BedSituation(props: Props) {
  const { filterObj, onFilterObjChange } = props

  const visibleType = Object.keys(filterObj).find((key: string) => filterObj[key].checked)

  const handleTypeChange = (currentType: string) => {
    let newFilterObj = { ...filterObj }

    let selectAll = true

    Object.keys(newFilterObj).forEach((key: string) => {
      let item = newFilterObj[key]
      if (currentType === key) {
        let newChecked = !newFilterObj[key].checked
        if (newChecked) selectAll = false

        item.checked = newChecked
        item.list = item.list.map((item: any) => ({ ...item, checked: newChecked }))
      } else {
        item.checked = false
        item.list = item.list.map((item: any) => ({ ...item, checked: false }))
      }
    })

    if (selectAll) {
      Object.keys(newFilterObj).forEach((key: string) => {
        let item = newFilterObj[key]
        item.list = item.list.map((item: any) => ({ ...item, checked: true }))
      })
    }

    onFilterObjChange && onFilterObjChange(newFilterObj)
  }

  const handleFilterChange = ($e: any, typeName: string, idx: number) => {
    let newFilterObj = { ...filterObj }

    newFilterObj[typeName].list[idx].checked = $e.target.checked

    onFilterObjChange && onFilterObjChange(newFilterObj)
  }

  const filterList = () => {
    return Object.keys(filterObj).map((key: string) => (
      <React.Fragment key={key}>
        {filterObj[key].list.map((item: any, itemIdx: number) => (
          <div
            key={`${key}-${itemIdx}`}
            className="RightChooseByShiftCheckboxItem"
            style={{ display: (visibleType === key || !visibleType) ? 'block' : 'none' }}>
            <Checkbox
              checked={item.checked}
              onChange={(e) => handleFilterChange(e, key, itemIdx)}>
              {item.name}
            </Checkbox>
          </div>
        ))}
      </React.Fragment>
    ))
  }

  return (
    <Con>
      {/* <TableModel /> */}
      <RightChooseByShift>
        <div className='RightChooseByShiftHeader'>统计班次</div>
        <div className='RightChooseByShiftRadio'>
          <Radio
            checked={filterObj['shift_type']?.checked}
            onClick={() =>
              handleTypeChange('shift_type')}>
            按班次大类
          </Radio>
          <Radio
            checked={filterObj['range_name']?.checked}
            onClick={() =>
              handleTypeChange('range_name')}>
            自定义班次
          </Radio>
        </div>
        <RightChooseByShiftCheckbox>
          {filterList()}
        </RightChooseByShiftCheckbox>
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
`

// @ts-ignore
const RightChooseByShiftCheckbox = styled(ScrollBox)`
  /* 调整间距 */
  margin-top: 20px;
  padding-left: 10px;
  /* display: flex;
  flex-direction: row;
  flex-wrap: wrap; */
  overflow-y: auto;
  height: 270px;
  
  .RightChooseByShiftCheckboxItem {
    width: 104px;
    height: 36px;
    line-height: 36px;
    display: inline-block;
  }
`
