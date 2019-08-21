import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'

import { Select, Button, message } from 'antd'
import { authStore, scheduleStore, appStore } from 'src/stores'
import service from 'src/services/api'

import emitter from 'src/libs/ev'
import DeptSelect from 'src/components/DeptSelect'
import printing from 'printing'
import Moment from 'moment'
import { numToChinese } from 'src/utils/number/numToChinese'
import { observer } from 'src/vendors/mobx-react-lite'

const Option = Select.Option
export interface Props extends RouteComponentProps {}

export default observer(function ToolBar() {
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

  useEffect(() => {
    service.schedulingApiService.getGroupByDeptCode(scheduleStore.getDeptCode()).then((res) => {
      scheduleStore.groupList = [{ groupName: '全部', id: '' }, ...res.data]
    })
  }, [scheduleStore.getDeptCode()])

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

  const openPrint = () => {
    const postData = {
      deptCode: scheduleStore.getDeptCode() || '', // deptCode  科室编码
      startTime: scheduleStore.getStartTime(), // startTime 开始时间（刚开始由后台传给前台）
      endTime: scheduleStore.getEndTime() // endTime   结束时间（刚开始由后台传给前台）
    }
    service.schedulingApiService
      .findShiftList(postData)
      .then((res) => {
        //渲染的时间跨度
        let dateLength =
          (Number(Moment(postData.endTime).format('x')) - Number(Moment(postData.startTime).format('x')) + 86400000) /
          86400000

        let render = res.data.schShiftUser
        let dateRow: any[] = []

        for (var i = 0; i < dateLength; i++) {
          let timeset = Number(Moment(postData.startTime).format('x')) + i * 86400000
          let newMoment = Moment(timeset)

          let date = newMoment.format('D')
          let weekDay = newMoment.format('E')
          dateRow.push({
            date,
            weekDay: numToChinese(weekDay)
          })
        }
        // 列宽
        //页面总宽度
        let pageWidth = 700
        //姓名
        let col1Width = 60
        //岗位级别
        let col2Width = 60
        //工作年
        let col3Width = 25
        //休假统计
        let col4Width = 35
        //排版列总宽度
        let othersWidth = pageWidth - col1Width - col2Width - col3Width - col4Width

        let cols = [col1Width, col2Width, col3Width].concat(dateRow.map(() => othersWidth / dateLength), [col4Width])

        let colgroup = `<colgroup>
          ${cols.map((item: any) => `<col width="${item}">`).join('')}
        </colgroup>
        <colgroup></colgroup>`

        let thead = ''
        let tbody = ''
        let tfoot = ''
        //渲染表头
        thead = `
          <tr>
            <td colspan="${dateLength + 4}" class="main-title">
              ${Moment(postData.startTime).format('YYYY年M月')}${scheduleStore.getDeptName()}护士排班表
            </td>
          </tr>
          <tr class="header-row">
            <td rowspan="2">姓名</<td>
            <td rowspan="2">岗位</<td>
            <td rowspan="2">工作年</<td>
            ${dateRow.map((item: any) => `<td>${item.date}</td>`).join('')}
            <td rowspan="2">休假统计</<td>
          </tr>
          <tr class="header-row">
            ${dateRow
              .map(
                (item: any) =>
                  `<td class="${item.weekDay == '六' || item.weekDay == '七' ? 'bg-gray' : ''}">${
                    item.weekDay == '七' ? '日' : item.weekDay
                  }</td>`
              )
              .join('')}
          </tr>
        `
        //渲染主体
        render.map((item: any) => {
          let tr = ''
          //姓名
          tr += `<td colspan="1">${item.empName}</td>`
          //岗位级别
          tr += `<td colspan="1">${item.newTitle}/${item.nurseHierarchy}</td>`
          //工作年
          tr += `<td colspan="1"></td>`
          let groups = []
          //获取排班
          for (let i = 0; i < dateLength; i++) {
            let last = groups[groups.length - 1]
            let target = item.settingDtos[i]
            if (!target) {
              groups.push({
                rangeName: '',
                col: 1
              })
              continue
            }

            if (!last) {
              groups.push({
                rangeName: target.rangeName,
                col: 1
              })
            } else if (last.rangeName == target.rangeName) {
              //合并部分相同的行
              switch (target.rangeName) {
                case '年假':
                case '进修':
                case '产假':
                  last.col = last.col + 1
                  break
                default:
                  groups.push({
                    rangeName: target.rangeName,
                    col: 1
                  })
              }
            } else {
              groups.push({
                rangeName: target.rangeName,
                col: 1
              })
            }
          }
          //组合排班信息
          groups = groups.map((item1: any) => {
            return `<td colspan="${item1.col}">${item1.rangeName || '/'}</td>`
          })
          tr += groups.join('')
          //休假统计
          tr += `<td colspan="1"></td>`

          tbody += `<tr>${tr}</tr>`
        })

        //渲染其他信息
        tfoot = `
          <tr>
            <td colspan="2" class="text-left">加班登记栏：</td>
            <td colspan="1"></td>
            <td colspan="${dateLength + 1}"></td>
          </tr>
          <tr>
            <td colspan="${dateLength + 4}"> </td>
          </tr>
          <tr>
            <td colspan="${dateLength + 4}"> </td>
          </tr>
          <tr>
            <td colspan="${dateLength + 4}"> </td>
          </tr>
          <tr>
            <td colspan="${dateLength + 4}" class="text-left">休假要求：</td>
          </tr>
          <tr>
            <td colspan="${dateLength + 4}"> </td>
          </tr>
          <tr>
            <td colspan="${dateLength + 4}"> </td>
          </tr>
        `

        let table = `
          <table>
            ${colgroup}
            <tbody>
              ${thead}
              ${tbody}
              ${tfoot}
            </tbody>
          </table>
        `
        // 创建打印容器
        let div = document.createElement('div')
        let printId = `print${Math.random()}`
        div.id = printId
        div.innerHTML = `<div class="page-print">${table}</div>`
        document.body.appendChild(div)
        //调用打印函数
        printing(document.getElementById(printId) as HTMLElement, {
          injectGlobalCss: true,
          scanStyles: false,
          css: `
            .page-print{
              width: ${pageWidth}px;
              margin: 0 auto;
              padding: 30px 20px;
              color:red;
            }
            table{
              border-collapse: collapse;
              border-color: #000;
              width: 100%;
            }
            td,th{
              text-align: center;
              font-size: 14px;
              color: #000;
              padding: 0;
              border: 1px #000 solid;
            }
            table td.main-title{
              font-size: 20px!important;
            }
            table tr.header-row td{
              font-size: 14px!important;
            }
            table td.text-left{
              text-align: left;
              padding-left: 10px;
            }
            table td.bg-gray{
              background: #aaa;
            }
          `
        })
        //删除打印容器
        document.body.removeChild(div)
      })
      .catch((err) => {
        console.log(err, '接收excel:err')
      })
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
      <Label style={{ marginLeft: 10 }}>分组：</Label>
      <Select
        style={{ width: 150 }}
        value={scheduleStore.selectedGroupId}
        onChange={(value: any) => (scheduleStore.selectedGroupId = value)}
      >
        {scheduleStore.groupList.map((item) => (
          <Select.Option value={item.id} key={item.id}>
            {item.groupName}
          </Select.Option>
        ))}
      </Select>
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
      <Button style={{ marginLeft: 10, marginRight: 10 }} disabled={buttonDisabled} onClick={openPrint}>
        打印
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
})
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
