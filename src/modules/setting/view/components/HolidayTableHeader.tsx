import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
// import React from 'react'
import SelectYear from 'src/modules/setting/view/common/SelectYear.tsx'
import { Button, message } from 'antd'
import settingViewModel from 'src/modules/setting/SettingViewModel.ts'
import SettingApi from 'src/modules/setting/api/SettingApi.ts'
import ModalAdd from 'src/modules/setting/view/components/ModalAdd.tsx'

// import settingViewModel from '../../SettingViewModel'

export default function BedSituation() {
  // const [count, setCount] = useState(0)
  // useEffect(() => {
  //   
  // })
  const [visible, setVisible] = useState(false)
  const handleOk = () => {
    setVisible(false)
    console.log(3333333)
    console.log(settingViewModel.getHolidayAdd)
    let cacheAddHoliday = settingViewModel.getHolidayAdd
    let cacheTarget = [...settingViewModel.tableDate]
    cacheTarget = cacheTarget.concat(cacheAddHoliday)
    settingViewModel.setTableDate(cacheTarget)
    // 接口添加数据
    SettingApi.postHolidayAdd()
  }

  const handleCancel = () => {
    setVisible(false)
  }

  // const onChange = (value: string) => {
  //   nurseFilesListViewModel.loadNursingList()
  // }
  const addButtonClick = () => {
    console.log(666666)
    SettingApi.getHolidayTable(settingViewModel.getSelectYear).then((res) => {})
    setVisible(true)
  }
  return (
    <Con>
      <TopCon>
        <SelectYear />
        <AddButtonCon>
          <Button onClick={addButtonClick}>添加</Button>
        </AddButtonCon>
        {/* <SaveButtonCon>
          <Button>保存</Button>
        </SaveButtonCon> */}
      </TopCon>
      <ModalAdd visible={visible} handleOk={handleOk} handleCancel={handleCancel} />
    </Con>
  )
}

const Con = styled.div`
  width: 100%;
`
const TopCon = styled.div`
  height: 45px;
  background: #f8f8f8;
  box-shadow: 3px 3px 6px 0px rgba(0, 0, 0, 0.15);
  border-bottom: 1px solid #dbe0e4;
  font-size: 13px;
  position: relative;
  font-size: 16px;
  color: #333333;
  padding: 0 20px;
  display: flex;
  align-items: center;
  z-index: 1;
`
const AddButtonCon = styled.div`
  padding-left: 30px;
`
// const SaveButtonCon = styled.div`
//   padding-left: 15px;
// `
