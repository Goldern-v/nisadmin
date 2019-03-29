import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
// import { Link } from 'react-router-dom'

import emitter from 'src/libs/ev'

import { Button, message } from 'antd'
// import { authStore, scheduleStore } from '@/stores'
import service from 'src/services/api'

// import emitter from 'src/libs/ev'

// const Option = Select.Option
export interface Props extends RouteComponentProps {}

export default function ToolBar () {
  const [count, setCount] = useState(0)

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    //
    console.log(count, setCount)
  }, []) // <= 执行初始化操作，需要注意的是，如果你只是想在渲染的时候初始化一次数据，那么第二个参数必须传空数组。

  const save = (e: any) => {
    // 获取选中班次
    // console.log('获取选中班次', e)
    // return
    emitter.emit('获取选中班次列表', (shiftList: any) => {
      message.success('保存排班班次设置')
      console.log('获取选中班次', shiftList)
      return
      shiftList = shiftList.filter((u: any) => {
        return u.rangeShow !== null
      })
      service.scheduleShiftApiService.save(shiftList).then((res) => {
        message.success('保存排班班次设置成功')
        console.log('保存排班班次', res)
      })
    })
  }

  const addShift = () => {
    message.success('添加班次')
  }

  return (
    <Wrapper>
      <Title>班次设置</Title>
      <div style={{ flex: 1 }} />
      <Button onClick={addShift} style={{ marginLeft: 20, marginRight: 10 }}>
        添加班次
      </Button>
      <Button onClick={save} style={{ marginLeft: 20, marginRight: 10 }}>
        保存
      </Button>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  /* background: #eee; */
  height: 100%;
  padding: 0 20px 20px 20px;
  display: inline-flex;
  width: 100%;
  align-items: flex-end;
`

// const BreakLine = styled.div`
//   padding: 0 10px;
// `

// const LinkText = styled.div`
//   cursor: pointer;
// `

const Title = styled.div`
  font-size: 20px;
`
