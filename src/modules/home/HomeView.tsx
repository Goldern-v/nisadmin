import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
// import { RouteComponentProps } from 'react-router'
import { Select, Button } from 'antd'

// export interface Props extends RouteComponentProps {}

const Option = Select.Option

function handleChange (value: any) {
  console.log(`selected ${value}`)
}

export default function HomeView () {
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log(count, setCount)
  })
  return (
    <Wrapper>
      <SelectCon>
        <span className='label'>科室：</span>
        <Select defaultValue='普外科护理单元' style={{ width: 200 }} onChange={handleChange}>
          <Option value='骨科护理单元'>骨科护理单元</Option>
          <Option value='普外科护理单元'>普外科护理单元</Option>
          <Option value='泌尿外科护理单元'>泌尿外科护理单元</Option>
          <Option value='产科护理单元'>产科护理单元</Option>
        </Select>
        <Button style={{ marginLeft: 20, marginRight: 10 }}>查询</Button>
        <Button>刷新</Button>
      </SelectCon>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  padding: 0 20px;
`

const SelectCon = styled.div`
  padding: 20px 0;
  display: flex;
  align-items: center;
`
