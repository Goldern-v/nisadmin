import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
// import { Link } from 'react-router-dom'

import emitter from 'src/libs/ev'

import { Button, message } from 'antd'
// import { authStore, scheduleStore } from 'src/stores'
import service from 'src/services/api'
import { appStore } from 'src/stores'

// import emitter from 'src/libs/ev'

// const Option = Select.Option
export interface Props extends RouteComponentProps {}

export default function ToolBar() {
  const [count, setCount] = useState(0)

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    //
    console.log(count, setCount)
  }, []) // <= 执行初始化操作，需要注意的是，如果你只是想在渲染的时候初始化一次数据，那么第二个参数必须传空数组。

  return (
    <Wrapper>
      <Title>排班人员设置</Title>
      <div style={{ flex: 1 }} />
      <Button
        onClick={(e: any) => {
          emitter.emit('添加排班人员')
        }}
        style={{ marginLeft: 3, marginRight: 3 }}
      >
        添加
      </Button>
      {/* <Button
        onClick={(e: any) => {
          emitter.emit('删除排班人员')
        }}
        style={{ marginLeft: 20, marginRight: 0 }}
      >
        删除
      </Button> */}

      <Button
        onClick={(e: any) => {
          // 获取选中人员
          // console.log('获取选中人员', e)
          // return
          emitter.emit('获取选中人员列表', (userList: any) => {
            let list = userList
              .map((item: any, key: number) => ({ ...item, key, sortValue: key }))
              .filter((item: any) => item.empName)
            return service.scheduleUserApiService.save(list).then((res) => {
              message.success('保存排班人员设置成功')
              console.log('保存排班人员', res)
            })
          })
        }}
        style={{ marginLeft: 3, marginRight: 3 }}
      >
        保存
      </Button>
      <Button
        onClick={(e: any) => {
          emitter.emit('刷新人员列表')
        }}
        style={{ marginLeft: 3, marginRight: 3 }}
      >
        刷新
      </Button>
      <Button
        style={{ marginLeft: 3, marginRight: 3 }}
        onClick={() => appStore.history.push('/scheduleHome')}
        className='button-tools'
      >
        返回
      </Button>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  /* background: #eee; */
  height: auto;
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
