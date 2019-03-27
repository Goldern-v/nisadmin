import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Select, Button } from 'antd'
import { authStore, scheduleStore } from '@/stores'
import service from 'src/services/api'

const Option = Select.Option
export interface Props extends RouteComponentProps {}

export default function ToolBar () {
  // 在react hooks 用 useState 定义 class component 里的 state 变量
  const [wardCode, setWardCode] = useState('')
  const [wardValue, setWardValue] = useState('')
  const [wardList, setWardList] = useState([
    {
      deptCode: '',
      deptName: ''
    }
  ])
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    setWardList([])
    if (authStore.getUser()) {
      let deptCode = authStore.getUser().deptCode || ''
      // 根据部门代码获取科室代码列表
      service.wardDailyApiService.getDeptWithWardcode(deptCode).then((res) => {
        console.log('更新科室列表', res)
        if (!res) {
          return
        }
        setWardList(res.data.data) // 更新科室列表
        setWardValue(res.data.data[0].deptName)
        console.log('更新wardList:', wardValue, wardCode, wardList)
        scheduleStore.setDepartmentValue('wardCode', wardCode)
        scheduleStore.setDepartmentValue('wardName', res.data.data[0].deptName)
        scheduleStore.setDepartmentValue('deptName', res.data.data[0].deptName)
        scheduleStore.setDepartmentValue('deptCode', res.data.data[0].deptCode)
      })
    }
  }, []) // <= 执行初始化操作，需要注意的是，如果你只是想在渲染的时候初始化一次数据，那么第二个参数必须传空数组。

  const handleChange = (code: any) => {
    // console.log('handleChange', code, wardList)
    wardList.map((ward) => {
      if (ward.deptCode === code) {
        setWardCode(ward.deptCode)
        setWardValue(ward.deptName)
        scheduleStore.setDepartmentValue('wardCode', ward.deptCode)
        scheduleStore.setDepartmentValue('wardName', ward.deptName)
        scheduleStore.setDepartmentValue('deptCode', ward.deptCode)
        scheduleStore.setDepartmentValue('deptName', ward.deptName)
      }
    })
  }

  const fileDownload = (res: any) => {
    let filename = res.headers['content-disposition'].replace('attachment;filename=', '') || 'fileName.xls'
    // "attachment;filename=????2019-3-18-2019-3-24??.xls"
    let blob = new Blob([res.data], {
      type: 'application/vnd.ms-excel;charset=utf-8'
    })
    let a = document.createElement('a')
    let href = window.URL.createObjectURL(blob) // 创建链接对象
    a.href = href
    a.download = filename // 自定义文件名
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(href)
    document.body.removeChild(a) // 移除a元素
  }

  return (
    <Wrapper>
      <Label>科室：</Label>
      <Select value={wardValue} onChange={handleChange} style={{ width: 200 }}>
        {wardList.map((ward) => (
          <Option key={ward.deptCode} value={ward.deptCode}>
            {ward.deptName}
          </Option>
        ))}
      </Select>
      <Button style={{ marginLeft: 20, marginRight: 10 }}>编辑排班</Button>
      <Button
        onClick={(e: any) => {
          const postData = {
            deptCode: '2508' || scheduleStore.getDepartment().deptCode || '', // deptCode  科室编码
            stratTime: scheduleStore.getStartTime(), // stratTime 开始时间（刚开始由后台传给前台）
            endTime: scheduleStore.getEndTime() // endTime   结束时间（刚开始由后台传给前台）
          }
          service.schedulingApiService.export(postData).then((res) => {
            // console.log(res, '接收excel')
            fileDownload(res)
          })
          console.log(e)
        }}
      >
        导出Excel
      </Button>
      <div style={{ flex: 1 }} />
      <LinkText>排班人员设置</LinkText>
      <BreakLine>|</BreakLine>
      <LinkText>班次设置</LinkText>
      <BreakLine>|</BreakLine>
      <LinkText>排班套餐设置</LinkText>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  background: #fff;
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 20px;
`

const BreakLine = styled.div`
  padding: 0 10px;
`

const LinkText = styled.div`
  cursor: pointer;
`

const Label = styled.div``
