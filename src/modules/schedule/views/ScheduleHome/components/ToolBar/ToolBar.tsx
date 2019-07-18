import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'

import { Select, Button, message } from 'antd'
import { authStore, scheduleStore, appStore } from 'src/stores'
import service from 'src/services/api'

import emitter from 'src/libs/ev'
import DeptSelect from 'src/components/DeptSelect'

const Option = Select.Option
export interface Props extends RouteComponentProps {}

export default function ToolBar() {
  // 在react hooks 用 useState 定义 class component 里的 state 变量
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [wardCode, setWardCode] = useState('')
  const [wardValue, setWardValue] = useState(authStore.getUser().deptName || '')
  const [wardList, setWardList] = useState([
    {
      code: '',
      name: ''
    }
  ])
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // console.log(wardCode, setWardCode, wardValue, setWardValue)
    setWardList([])
    setButtonDisabled(true)

    // console.log(eventEmitterLoading)

    if (authStore.getUser()) {
      // let deptCode = authStore.getUser().deptCode || ''
      if (scheduleStore.getDeptName()) {
        setWardValue(scheduleStore.getDeptName())
        setWardCode(scheduleStore.getDeptCode())
      }
      // 根据部门代码获取科室代码列表
      service.commonApiService.getUintList().then((res) => {
        if (!res) {
          return
        }
        setWardList(res.data.deptList) // 更新科室列表
        if (!scheduleStore.getDeptName()) {
          setWardValue(res.data.deptName)
          // console.log('更新wardList:', wardValue, wardCode, wardList)
          let dept = {
            wardCode: res.data.defaultDept,
            wardName: res.datadeptName,
            deptName: res.datadeptName,
            deptCode: res.data.defaultDept
          }
          scheduleStore.setDepartment(dept as any)
        }
      })
    }
  }, []) // <= 执行初始化操作，需要注意的是，如果你只是想在渲染的时候初始化一次数据，那么第二个参数必须传空数组。

  emitter.removeAllListeners('禁止工具按钮')

  emitter.addListener('禁止工具按钮', (disable: boolean) => {
    setButtonDisabled(disable)
  })

  const handleChange = (code: any) => {
    // console.log('handleChange', code, wardList)
    wardList.map((ward) => {
      if (ward.code === code) {
        setWardCode(ward.code)
        setWardValue(ward.name)
        let dept = {
          wardCode: ward.code,
          wardName: ward.name,
          deptName: ward.name,
          deptCode: ward.code
        }

        scheduleStore.setDepartment(dept as any)
        scheduleStore.setDepartmentValue('deptName', ward.name)
        scheduleStore.setDepartmentValue('deptCode', ward.code)

        // message.success(`切换至 ${ward.name}`)
        emitter.emit('清空排班记录')
        emitter.emit('初始化周排班列表')

        // scheduleStore.setDepartmentValue('wardCode', ward.code)
        // scheduleStore.setDepartmentValue('wardName', ward.name)
        // scheduleStore.setDepartmentValue('deptCode', ward.code)
        // scheduleStore.setDepartmentValue('deptName', ward.name)
      }
    })
  }

  const fileDownload = (res: any) => {
    let filename = res.headers['content-disposition']
      ? decodeURIComponent(res.headers['content-disposition'].replace('attachment;filename=', ''))
      : '导出文件'
    // decodeURIComponent
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
      reader.addEventListener('loadend', function(data: any) {
        // reader.result 包含转化为类型数组的blob
        message.error(`${reader.result}`)
      })
      reader.readAsText(blob)
    }
  }

  return (
    <Wrapper>
      <Label>科室：</Label>
      {/* <Select defaultValue={wardValue} onChange={handleChange} style={{ width: 200 }}>
        {wardList.map((ward: any) => (
          <Option key={ward.code + ''} value={ward.code + ''}>
            {ward.name}
          </Option>
        ))}
      </Select> */}
      <DeptSelect onChange={handleChange} />
      <Button disabled={buttonDisabled} style={{ marginLeft: 20, marginRight: 10 }}>
        <Link to='/scheduleSetting'>编辑排班</Link>
      </Button>
      <Button
        disabled={buttonDisabled}
        onClick={(e: any) => {
          const postData = {
            deptCode: scheduleStore.getDeptCode() || '', // deptCode  科室编码
            startTime: scheduleStore.getStartTime(), // startTime 开始时间（刚开始由后台传给前台）
            endTime: scheduleStore.getEndTime() // endTime   结束时间（刚开始由后台传给前台）
          }
          service.schedulingApiService
            .export(postData)
            .then((res) => {
              fileDownload(res)
            })
            .catch((err) => {
              console.log(err, '接收excel:err')
            })
        }}
      >
        导出Excel
      </Button>
      <div style={{ flex: 1 }} />
      <LinkText>
        <Link to='/deptBorrow' style={{ color: '#747474' }}>
          科室借用
        </Link>
      </LinkText>
      <BreakLine>|</BreakLine>
      <LinkText>
        <Link to='/nurseSetting' style={{ color: '#747474' }}>
          排班人员设置
        </Link>
      </LinkText>
      <BreakLine>|</BreakLine>
      <LinkText>
        <Link to='/shiftSetting' style={{ color: '#747474' }}>
          班次设置
        </Link>
      </LinkText>
      <BreakLine>|</BreakLine>
      <LinkText>
        <Link to='/mealSetting' style={{ color: '#747474' }}>
          排班套餐设置
        </Link>
      </LinkText>
      {appStore.isDev && (
        <React.Fragment>
          <BreakLine>|</BreakLine>
          <LinkText>
            <Link to='/personnelSetting' style={{ color: '#747474' }}>
              人员分组
            </Link>
          </LinkText>
        </React.Fragment>
      )}
    </Wrapper>
  )
}
const Wrapper = styled.div`
  background: #fff;
  height: 45px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  background: rgba(248, 248, 248, 1);
  box-shadow: 3px 3px 6px 0px rgba(0, 0, 0, 0.15);
`

const BreakLine = styled.div`
  padding: 0 10px;
`

const LinkText = styled.div`
  cursor: pointer;
`

const Label = styled.div``
