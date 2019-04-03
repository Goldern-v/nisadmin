import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Select, Button } from 'antd'
import service from 'src/services/api'

const Option = Select.Option

function handleChange (value: any) {
  console.log(`selected ${value}`)
}

// const getListDepartment = () => {
//   service.homeDataApiServices.getListDepartment().then((res) => {
//     if (res && res.data.data) {
//       console.log(res)
//     }
//   })
// }
export default function SelectCommon () {
  const [count, setCount] = useState(0)
  // let getDepartmentName
  let departmentName
  useEffect(() => {
    console.log(count, setCount)
    // const getListDepartment = () =>s {
    service.homeDataApiServices.getListDepartment().then((res) => {
      if (res && res.data.data) {
        let listDepartment = res.data.data.deptList
        if (!listDepartment) {
          // 获取后的科室相关数据
          listDepartment = []
        }
        departmentName = listDepartment.map((item: any) => (
          <Option key={item.name.toString()} value={item.name}>
            {item.name}
          </Option>
        ))
      }
    })
    // }5ss
  })
  let getDepartmentName = departmentName
  console.log(6666)
  console.log(getDepartmentName)
  return (
    <div>
      <SelectCon>
        <span className='label'>科室：</span>
        <Select defaultValue='普外科护理单元' style={{ width: 200 }} onChange={handleChange}>
          <Option value='骨科护理单元'>骨科护理单元</Option>
          <Option value='普外科护理单元'>普外科护理单元</Option>
          <Option value='泌尿外科护理单元'>泌尿外科护理单元</Option>
          <Option value='产科护理单元'>产科护理单元</Option>
          {getDepartmentName}
        </Select>
        <Button style={{ marginLeft: 20, marginRight: 10 }}>查询</Button>
        <Button>刷新</Button>
      </SelectCon>
    </div>
  )
}

const SelectCon = styled.div`
  padding: 20px 0;
  display: flex;
  align-items: center;
`
