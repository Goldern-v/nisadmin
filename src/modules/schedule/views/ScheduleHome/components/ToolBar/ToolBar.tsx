import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'

import { Select, Button, message } from 'antd'
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
        let dept = {
          wardCode: wardCode,
          wardName: res.data.data[0].deptName,
          deptName: res.data.data[0].deptName,
          deptCode: res.data.data[0].deptCode
        }
        scheduleStore.setDepartment(dept as any)
      })
    }
  }, []) // <= 执行初始化操作，需要注意的是，如果你只是想在渲染的时候初始化一次数据，那么第二个参数必须传空数组。

  const handleChange = (code: any) => {
    // console.log('handleChange', code, wardList)
    wardList.map((ward) => {
      if (ward.deptCode === code) {
        setWardCode(ward.deptCode)
        setWardValue(ward.deptName)
        let dept = {
          wardCode: ward.deptCode,
          wardName: ward.deptName,
          deptName: ward.deptName,
          deptCode: ward.deptCode
        }
        scheduleStore.setDepartment(dept as any)
        // scheduleStore.setDepartmentValue('wardCode', ward.deptCode)
        // scheduleStore.setDepartmentValue('wardName', ward.deptName)
        // scheduleStore.setDepartmentValue('deptCode', ward.deptCode)
        // scheduleStore.setDepartmentValue('deptName', ward.deptName)
      }
    })
  }

  const fileDownload = (res: any) => {
    let filename = res.headers['content-disposition']
      ? res.headers['content-disposition'].replace('attachment;filename=', '')
      : '导出文件'
    // "attachment;filename=????2019-3-18-2019-3-24??.xls"
    // "application/json"
    let blob = new Blob([res.data], {
      type: res.data.type // 'application/vnd.ms-excel;charset=utf-8'
    })
    if (res.data.type.indexOf('excel') > -1) {
      let a = document.createElement('a')
      let href = window.URL.createObjectURL(blob) // 创建链接对象
      a.href = href
      a.download = filename // 自定义文件名
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(href)
      document.body.removeChild(a) // 移除a元素
    } else {
      let reader = new FileReader()
      reader.addEventListener('loadend', function (data: any) {
        // reader.result 包含转化为类型数组的blob
        message.error(`${reader.result}`)
      })
      reader.readAsText(blob)
    }
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
            console.log(res, '接收excel')
            fileDownload(res)
          })
          console.log(e)
        }}
      >
        导出Excel
      </Button>
      <div style={{ flex: 1 }} />
      <LinkText>
        <Link to='/nurseSetting' style={{ color: '#747474' }}>
          排班人员设置
        </Link>
      </LinkText>
      <BreakLine>|</BreakLine>
      <LinkText>
        <Link to='/nurseSetting' style={{ color: '#747474' }}>
          班次设置
        </Link>
      </LinkText>
      <BreakLine>|</BreakLine>
      <LinkText>
        <Link to='/nurseSetting' style={{ color: '#747474' }}>
          排班套餐设置
        </Link>
      </LinkText>
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
