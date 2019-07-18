import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Select } from 'antd'
import service from 'src/services/api'
// import { any } from 'prop-types'

const Option = Select.Option

function handleChange (value: any) {
  console.log(`selected ${value}`)
}

export default function SelectDepartment () {
  // const [count, setCount] = useState(0)
  const [officeList, setOfficeList] = useState([])
  // useEffect(() => {
  //   // 
  // })
  useEffect(() => {
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
  return (
    <div>
      <SelectCon>
        <span className='label'>科室：</span>
        <Select defaultValue='普外科护理单元' style={{ width: 200 }} onChange={handleChange}>
          <Option value='骨科护理单元'>骨科护理单元</Option>
          <Option value='普外科护理单元'>普外科护理单元</Option>
          <Option value='泌尿外科护理单元'>泌尿外科护理单元</Option>
          <Option value='产科护理单元'>产科护理单元</Option>
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
