import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Select, Button,DatePicker } from 'antd'
import moment from 'moment'
import service from 'src/services/api'
import DeptSelect from 'src/components/DeptSelect'
// import { any } from 'prop-types'
import emitter from 'src/libs/ev'
import { authStore,appStore } from 'src/stores'
const Option = Select.Option

function handleChange(value: any) {}

export default function SelectCommon() {
  const [officeList, setOfficeList] = useState([])
  // useEffect(() => {
  //   //
  // })

  // function getDepartmentName () {
  //   service.homeDataApiServices.getListDepartment().then((res) => {
  //     if (res && res.data) {
  //       let listDepartment = res.data.deptList
  //       if (!listDepartment) {
  //         // 获取后的科室相关数据
  //         listDepartment = []
  //       }
  //       return listDepartment.map((item: any) => (
  //         <Option key={item.name.toString()} value={item.name}>
  //           {item.name}
  //         </Option>
  //       ))
  //     }
  //   })
  // }
  const serchClick = () => {
    emitter.emit('首页查询')
  }
  return (
    <div>
      <SelectCon>
        <span className='label'>科室：</span>
        <DeptSelect onChange={handleChange} />

        {['fsxt'].includes(appStore.HOSPITAL_ID) && <><span className='label' style={{marginLeft:20}}>时间：</span>
        <DatePicker.RangePicker
        allowClear={false}
        defaultValue={authStore.defaultDateTime}
        format="YYYY-MM-DD HH:mm"
        showTime={{ format: 'HH:mm',
            defaultValue: [moment('00:00', 'HH:mm'), moment('11:59', 'HH:mm')],
           }}
        onChange={(value) => {
          authStore.selectDateTime = value
        }}
        style={{ width: 300 }}
      /></>}
        {/* 暂时下面去掉这两个按钮 */}
        <Button style={{ marginLeft: 20, marginRight: 10 }} onClick={serchClick}>
          查询
        </Button>
        <Button>刷新</Button>
      </SelectCon>
    </div>
  )
}

const SelectCon = styled.div`
  padding: 0 0 10px;
  display: flex;
  align-items: center;
`
