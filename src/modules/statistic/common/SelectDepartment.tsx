import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Select } from 'antd'
import service from 'src/services/api'
import { authStore } from 'src/stores/index'
import statisticViewModel from 'src/modules/statistic/StatisticViewModel'

import emitter from 'src/libs/ev'
// import { any } from 'prop-types'

const Option = Select.Option

function handleChange(value: any) {
  statisticViewModel.deptName = value
  statisticViewModel.setTitle('护士休假统计')

  // 设置统计页标题
  // emitter.emit('设置统计页标题', statisticViewModel.getTitle)
}

export default function SelectDepartment() {
  //
  const [defaultValue, setDefaultValue] = useState(authStore.getUser().deptName || '')
  const [officeList, setOfficeList] = useState([])
  // useEffect(() => {
  //   //
  // })
  useEffect(() => {
    let deptName = authStore.getUser().deptName || ''

    setDefaultValue(deptName)
    //
    statisticViewModel.deptName = deptName
    statisticViewModel.setTitle('护士休假统计')
    // emitter.emit('设置统计页标题', statisticViewModel.getTitle)
    //
    service.homeDataApiServices.getListDepartment().then((res) => {
      if (res && res.data) {
        let listDepartment = res.data.deptList
        if (!listDepartment) {
          // 获取后的科室相关数据
          listDepartment = []
        }
        setOfficeList(listDepartment)
        return listDepartment.map((item: any) => (
          <Option key={item.name.toString()} value={item.name}>
            {item.name}
          </Option>
        ))
      }
    })
  }, [])
  function optionClick(code: any) {
    statisticViewModel.setDeptCode(code)
  }
  return (
    <div>
      <SelectCon>
        <span className='label'>科室：</span>
        <Select defaultValue={defaultValue} style={{ width: 200 }} onChange={handleChange}>
          {officeList.map((item: any) => (
            <Option key={item.name.toString()} value={item.name}>
              {item.name}
            </Option>
          ))}
        </Select>
        {/* <Button style={{ marginLeft: 20, marginRight: 10 }}>查询</Button>
        <Button>刷新</Button> */}
      </SelectCon>
    </div>
  )
}

const SelectCon = styled.div`
  /* padding: 20px 0; */
  display: flex;
  align-items: center;
`
