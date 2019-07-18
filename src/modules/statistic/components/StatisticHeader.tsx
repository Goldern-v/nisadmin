import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
// import SelectDepartment from '../common/SelectDepartment'
import DeptSelect from 'src/components/DeptSelect'
import SelectData from 'src/modules/statistic/common/SelectData.tsx'
import { Button } from 'antd'
// import { observer } from 'mobx-react-lite'
export default function BedSituation() {
  useEffect(() => {})

  const onChange = (value: string) => {
    // nurseFilesListViewModel.loadNursingList()
  }
  function searchButtonClick() {}
  return (
    <Con>
      <DeptSelect onChange={onChange} />
      {/* <SelectDepartment /> */}
      <Spacing />
      <SelectData />
      <Button className='searchButton' onClick={searchButtonClick}>
        查询
      </Button>
      <Button className='exportButton'>导出excl</Button>
    </Con>
  )
}

const Con = styled.div`
  display: flex;
  align-items: center;
  height: 45px;
  line-height: 45px;
  padding-left: 14px;
  background: rgba(248, 248, 248, 1);
  box-shadow: 3px 3px 6px 0px rgba(0, 0, 0, 0.15);
  .searchButton {
    margin-left: 10px;
    width: 90px;
    background: rgba(91, 190, 152, 1);
    border-radius: 3px;
    border: 1px solid rgba(62, 152, 98, 1);
    font-size: 13px;
    color: rgba(255, 255, 255, 1);
  }
  .exportButton {
    margin-left: 10px;
    width: 120px;
    background: rgba(255, 255, 255, 1);
    border-radius: 3px;
    border: 1px solid rgba(192, 203, 206, 1);
    font-size: 13px;
    color: rgba(51, 51, 51, 1);
  }
`
const Spacing = styled.div`
  width: 20px;
`
