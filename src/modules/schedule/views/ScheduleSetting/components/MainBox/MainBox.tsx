import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
// import { Link } from 'react-router-dom'

import { Table, Tabs, Button, Input, InputNumber, Form, message, Modal } from 'antd'
const confirm = Modal.confirm
// import { authStore, scheduleStore } from 'src/stores'
import service from 'src/services/api'
import { scheduleStore } from 'src/stores'

import BaseTable from 'src/components/BaseTable'
import emitter from 'src/libs/ev'
// import ButtonGroup from 'antd/lib/button/button-group'
import windowHeight from 'src/hooks/windowHeight'

import ModalBox from 'src/modules/schedule/views/components/Modal/ModalBox'

import moment from 'moment'
// import { Link } from 'react-router-dom'
moment.locale('zh-cn', {
  weekdays: '日_一_二_三_四_五_六'.split('_')
})

let weekdayList = [
  'mondayName_1',
  'tuesdayName_1',
  'wednesdayName_1',
  'thursdayName_1',
  'fridayName_1',
  'saturdayName_1',
  'sundayName_1',
  'mondayName_2',
  'tuesdayName_2',
  'wednesdayName_2',
  'thursdayName_2',
  'fridayName_2',
  'saturdayName_2',
  'sundayName_2'
]

const TabPane = Tabs.TabPane

export interface Props extends RouteComponentProps {}

let data = {
  key: '',
  id: '',
  createTime: '',
  deptCode: '',
  name: '',
  mondayName_1: '',
  tuesdayName_1: '',
  wednesdayName_1: '',
  thursdayName_1: '',
  fridayName_1: '',
  saturdayName_1: '',
  sundayName_1: '',
  mondayName_1Color: '',
  tuesdayName_1Color: '',
  wednesdayName_1Color: '',
  thursdayName_1Color: '',
  fridayName_1Color: '',
  saturdayName_1Color: '',
  sundayName_1Color: '',
  mondayName_1Code: '',
  tuesdayName_1Code: '',
  wednesdayName_1Code: '',
  thursdayName_1Code: '',
  fridayName_1Code: '',
  saturdayName_1Code: '',
  sundayName_1Code: '',
  mondayName_2: '',
  tuesdayName_2: '',
  wednesdayName_2: '',
  thursdayName_2: '',
  fridayName_2: '',
  saturdayName_2: '',
  sundayName_2: '',
  mondayName_2Color: '',
  tuesdayName_2Color: '',
  wednesdayName_2Color: '',
  thursdayName_2Color: '',
  fridayName_2Color: '',
  saturdayName_2Color: '',
  sundayName_2Color: '',
  mondayName_2Code: '',
  tuesdayName_2Code: '',
  wednesdayName_2Code: '',
  thursdayName_2Code: '',
  fridayName_2Code: '',
  saturdayName_2Code: '',
  sundayName_2Code: '',
  status: ''
}

let allUser = new Array()

let tableData = new Array()
let selectedRowsArray = new Array()
let selectedCell: any = new Object()
let selectedRow: any = new Object()

let shiftListData = new Array()

let getStatus = (status: any) => {
  // status   0代表暂存，1代表发布
  switch (status) {
    case '0':
      return '暂存'
    case '1':
      return '发布'
    default:
      return '未保存'
  }
}

let getStatusToNum = (status: any) => {
  // status   0代表暂存，1代表发布
  switch (status) {
    case '暂存':
      return '0'
    case '发布':
      return '1'
    default:
      return '-1'
  }
}

export default function MainBox() {
  const [footer, setFooter] = useState(() => {
    return <span />
  })
  const [tableLoading, setTableLoading] = useState(true)
  const [columns, setColumns] = useState([])
  const [mealList, setMealList] = useState(new Array())
  const [tableList, setTableList] = useState(new Array())
  const [shiftList, setShiftList] = useState(new Array())
  const [shiftUserList, setShiftUserList] = useState(new Array())
  const [isPublished, setIsPublished] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isModified, setIsModified] = useState(false)

  let wih = windowHeight()

  useEffect(() => {
    setColumns(columns_1)
    getMealList()
    getShiftList()
    getShiftUserList()
    getSchedule()

    setFooter(() => {
      return <span>排班小计: 空</span>
    })
  }, [])

  emitter.removeAllListeners('排班列表载入动画')
  emitter.removeAllListeners('获取编辑排班列表')
  emitter.removeAllListeners('更新班次套餐列表')
  emitter.removeAllListeners('同步排班人员')
  emitter.removeAllListeners('更新排班列表')
  emitter.removeAllListeners('重置排班列表')
  emitter.removeAllListeners('发布并更新排班列表')
  emitter.removeAllListeners('更新排班列表表格')
  emitter.removeAllListeners('更新复制上周排班')

  emitter.addListener('获取编辑排班列表', (callback: any) => {
    selectedRowsArray.map((nurse) => {
      nurse.status = getStatusToNum(nurse.status)
    })

    if (callback) {
      callback(selectedRowsArray, shiftListData)
    }
  })

  emitter.addListener('排班列表载入动画', (isLoding) => {
    setTableLoading(isLoding)
  })

  emitter.addListener('更新班次套餐列表', () => {
    getMealList()
  })

  emitter.addListener('同步排班人员', () => {
    confirm({
      title: '提示',
      content: '刷新人员可能会丢失本周排班表，如未保存，请先保存后再刷新',
      onOk() {
        setTableLoading(true)
        getSchedule(true)
      },
      onCancel() {}
    })
  })

  emitter.addListener('更新排班列表', () => {
    setTableLoading(true)
    updateTableUI(true, isPublished)
    getSchedule()
  })

  emitter.addListener('重置排班列表', () => {
    setFooter(() => {
      return <span>排班小计: 空</span>
    })
    updateTableUI(true)
  })

  emitter.addListener('发布并更新排班列表', () => {
    setTableLoading(true)
    updateTableUI(false, true, true)
    getSchedule()
  })

  emitter.addListener('更新排班列表表格', () => {
    setTableLoading(true)
    updateTableUI(false, false, true)
    getSchedule()
  })

  emitter.addListener('更新复制上周排班', (schShiftUser: any) => {
    updateTableUI(true)
    setTableLoading(true)
    genDataTable(schShiftUser)
    updateTableUI()
  })

  const countWorkHours = (record: any, target: any = null) => {
    let list = JSON.parse(JSON.stringify(shiftListData))

    let result = 0
    let shift: any = new Object()
    for (const key in record) {
      if (
        record.hasOwnProperty(key) &&
        key.toLowerCase().indexOf('dayname') > -1 &&
        key.toLowerCase().indexOf('daynamecolor') === -1 &&
        key.toLowerCase().indexOf('daynamecode') === -1
      ) {
        const element = record[key]
        shift = list.find((s: any) => element === s.name)
        if (!shift) {
          shift = list.find(
            (s: any) =>
              record[key + 'Code'] === s.name ||
              (record[key + 'Code'] === s.shiftType && record[key + 'Code'] != s.name)
          )
        }
        if (shift) {
          let num = !isNaN(Number(shift.effectiveTime)) ? Number(shift.effectiveTime) : 0
          result += num
          if (target && target.name && target.name === key + record.id) {
            target.style.color = shift.nameColor || ''
          }
        }
      }
    }
    record.thisWeekHour = result.toFixed(2)

    return result
  }

  const onChangeInputText = (e: any, record: any, key: any) => {
    let selectedCellObj: any = new Object()
    selectedRowsArray.map((row) => {
      if (row.id === record.id) {
        row[key] = e.currentTarget.value
        record[key] = e.currentTarget.value
        if (!e.currentTarget.value) {
          row[key + 'Code'] = ''
          record[key + 'Code'] = ''
        }
        selectedCellObj = row
      }
    })
    let newResult = countWorkHours(record, e.currentTarget)
    let inputW = selectedRow.target.querySelector(`[name="thisWeekHour${selectedCell.record.id}"]`)
    if (inputW) {
      inputW.value = newResult || selectedRow.record.thisWeekHour
      selectedCellObj.thisWeekHour = newResult || selectedRow.record.thisWeekHour
    }

    // 统计
    statisticFooter(selectedRowsArray)

    /** 设置修改状态 */
    setIsModified(true)
  }

  const onClickInputText = (e: any, record: any, key?: any) => {
    record[key] = e.currentTarget.value
    selectedCell = new Object({
      record: record,
      key: key,
      target: e.currentTarget
    })
  }

  const getShiftColor = (text: string) => {
    if (!text) {
      return 'black'
    }
    let shift = shiftListData.find((s) => text === s.name)

    return shift ? shift.nameColor : 'black'
  }

  const getWeekDay_1 = (weekday: number) => {
    let days = ['', '一', '二', '三', '四', '五', '六', '日']
    let date = moment(scheduleStore.getStartTime())
      .add(weekday - 1, 'days')
      .format('MM[月]DD[日]')
    let result: any = null
    let color: any = weekday > 5 ? 'red' : ''
    if (date.indexOf('Invalid date') > -1) {
      return `周${days[weekday - 1]}`
    }
    return (
      <article style={{ padding: '0px', color: color }}>
        {date}
        <br />
        (周{days[weekday]})
      </article>
    )
  }

  const getWeekDay_2 = (weekday: number) => {
    let days = ['', '一', '二', '三', '四', '五', '六', '日', '一', '二', '三', '四', '五', '六', '日']
    let date = moment(scheduleStore.getStartTime())
      .add(weekday - 1, 'days')
      .format('DD')
    let result: any = null
    let color: any = days[weekday] == '六' || days[weekday] == '日' ? 'red' : ''
    if (date.indexOf('Invalid date') > -1) {
      return `周${days[weekday - 1]}`
    }
    return (
      <div style={{ padding: '0', color: color }}>
        {date}
        <br />
        {days[weekday]}
      </div>
    )
  }

  const getTextColor = (text: string, record: any, colorName: string, key?: any) =>
    record.showIndex ? (
      <input
        name={key + record.id}
        onClick={(e) => onClickInputText(e, record, key)}
        onChange={(e) => onChangeInputText(e, record, key)}
        style={{ color: colorName }}
        className={'table-input'}
        defaultValue={text || ''}
      />
    ) : (
      ''
    )

  const columns_1: any = [
    {
      title: '序号',
      dataIndex: 'showIndex',
      key: 'showIndex',
      width: '4%'
    },
    {
      title: '工号',
      dataIndex: 'empNo',
      key: 'empNo',
      width: '5%'
    },
    {
      title: '姓名',
      dataIndex: 'empName',
      key: 'empName',
      width: '5%'
    },
    {
      title: '层级',
      dataIndex: 'currentLevel',
      key: 'currentLevel',
      width: '5%'
    },
    {
      title: '职称',
      dataIndex: 'title',
      key: 'title',
      width: '8%'
    },
    {
      title: () => getWeekDay_1(1),
      dataIndex: 'mondayName_1',
      key: 'mondayName_1',
      width: '50px',
      render: (text: string, record: any) => getTextColor(text, record, record.mondayName_1Color, 'mondayName_1')
    },
    {
      title: () => getWeekDay_1(2),
      dataIndex: 'tuesdayName_1',
      key: 'tuesdayName_1',
      width: '50px',
      render: (text: string, record: any) => getTextColor(text, record, record.tuesdayName_1Color, 'tuesdayName_1')
    },
    {
      title: () => getWeekDay_1(3),
      dataIndex: 'wednesdayName_1',
      key: 'wednesdayName_1',
      width: '50px',
      render: (text: string, record: any) => getTextColor(text, record, record.wednesdayName_1Color, 'wednesdayName_1')
    },
    {
      title: () => getWeekDay_1(4),
      dataIndex: 'thursdayName_1',
      key: 'thursdayName_1',
      width: '50px',
      render: (text: string, record: any) => getTextColor(text, record, record.thursdayName_1Color, 'thursdayName_1')
    },
    {
      title: () => getWeekDay_1(5),
      dataIndex: 'fridayName_1',
      key: 'fridayName_1',
      width: '50px',
      render: (text: string, record: any) => getTextColor(text, record, record.fridayName_1Color, 'fridayName_1')
    },
    {
      title: () => getWeekDay_1(6),
      dataIndex: 'saturdayName_1',
      key: 'saturdayName_1',
      width: '50px',
      render: (text: string, record: any) => getTextColor(text, record, record.saturdayName_1Color, 'saturdayName_1')
    },
    {
      title: () => getWeekDay_1(7),
      dataIndex: 'sundayName_1',
      key: 'sundayName_1',
      width: '50px',
      render: (text: string, record: any) => getTextColor(text, record, record.sundayName_1Color, 'sundayName_1')
    },

    {
      title: () => {
        return (
          <span>
            本周工时
            <br />
            (小时)
          </span>
        )
      },
      dataIndex: 'thisWeekHour',
      key: 'thisWeekHour',
      width: '6%',
      render: (text: string, record: any) => getTextColor(text, record, 'black', 'thisWeekHour')
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: '10%',
      render: (text: string, record: any) => (record.id ? <span id={'status' + record.id}>{getStatus(text)}</span> : '')
    }
  ]
  const columns_2: any = [
    {
      title: '序号',
      dataIndex: 'showIndex',
      key: 'showIndex',
      width: '4%'
    },
    {
      title: '工号',
      dataIndex: 'empNo',
      key: 'empNo',
      width: '5%'
    },
    {
      title: '姓名',
      dataIndex: 'empName',
      key: 'empName',
      width: '5%'
    },
    {
      title: '层级',
      dataIndex: 'currentLevel',
      key: 'currentLevel',
      width: '5%'
    },
    {
      title: '职称',
      dataIndex: 'title',
      key: 'title',
      width: '6%'
    },
    {
      title: () => getWeekDay_2(1),
      dataIndex: 'mondayName_1',
      key: 'mondayName_1',
      width: '50px',
      render: (text: string, record: any) => getTextColor(text, record, record.mondayName_1Color, 'mondayName_1')
    },
    {
      title: () => getWeekDay_2(2),
      dataIndex: 'tuesdayName_1',
      key: 'tuesdayName_1',
      width: '50px',
      render: (text: string, record: any) => getTextColor(text, record, record.tuesdayName_1Color, 'tuesdayName_1')
    },
    {
      title: () => getWeekDay_2(3),
      dataIndex: 'wednesdayName_1',
      key: 'wednesdayName_1',
      width: '50px',
      render: (text: string, record: any) => getTextColor(text, record, record.wednesdayName_1Color, 'wednesdayName_1')
    },
    {
      title: () => getWeekDay_2(4),
      dataIndex: 'thursdayName_1',
      key: 'thursdayName_1',
      width: '50px',
      render: (text: string, record: any) => getTextColor(text, record, record.thursdayName_1Color, 'thursdayName_1')
    },
    {
      title: () => getWeekDay_2(5),
      dataIndex: 'fridayName_1',
      key: 'fridayName_1',
      width: '50px',
      render: (text: string, record: any) => getTextColor(text, record, record.fridayName_1Color, 'fridayName_1')
    },
    {
      title: () => getWeekDay_2(6),
      dataIndex: 'saturdayName_1',
      key: 'saturdayName_1',
      width: '50px',
      render: (text: string, record: any) => getTextColor(text, record, record.saturdayName_1Color, 'saturdayName_1')
    },
    {
      title: () => getWeekDay_2(7),
      dataIndex: 'sundayName_1',
      key: 'sundayName_1',
      width: '50px',
      render: (text: string, record: any) => getTextColor(text, record, record.sundayName_1Color, 'sundayName_1')
    },
    {
      title: () => getWeekDay_2(8),
      dataIndex: 'mondayName_2',
      key: 'mondayName_2',
      width: '50px',
      render: (text: string, record: any) => getTextColor(text, record, record.mondayName_2Color, 'mondayName_2')
    },
    {
      title: () => getWeekDay_2(9),
      dataIndex: 'tuesdayName_2',
      key: 'tuesdayName_2',
      width: '50px',
      render: (text: string, record: any) => getTextColor(text, record, record.tuesdayName_2Color, 'tuesdayName_2')
    },
    {
      title: () => getWeekDay_2(10),
      dataIndex: 'wednesdayName_2',
      key: 'wednesdayName_2',
      width: '50px',
      render: (text: string, record: any) => getTextColor(text, record, record.wednesdayName_2Color, 'wednesdayName_2')
    },
    {
      title: () => getWeekDay_2(11),
      dataIndex: 'thursdayName_2',
      key: 'thursdayName_2',
      width: '50px',
      render: (text: string, record: any) => getTextColor(text, record, record.thursdayName_2Color, 'thursdayName_2')
    },
    {
      title: () => getWeekDay_2(12),
      dataIndex: 'fridayName_2',
      key: 'fridayName_2',
      width: '50px',
      render: (text: string, record: any) => getTextColor(text, record, record.fridayName_2Color, 'fridayName_2')
    },
    {
      title: () => getWeekDay_2(13),
      dataIndex: 'saturdayName_2',
      key: 'saturdayName_2',
      width: '50px',
      render: (text: string, record: any) => getTextColor(text, record, record.saturdayName_2Color, 'saturdayName_2')
    },
    {
      title: () => getWeekDay_2(14),
      dataIndex: 'sundayName_2',
      key: 'sundayName_2',
      width: '50px',
      render: (text: string, record: any) => getTextColor(text, record, record.sundayName_2Color, 'sundayName_2')
    },

    {
      title: () => {
        return (
          <span>
            本周工时
            <br />
            (小时)
          </span>
        )
      },
      dataIndex: 'thisWeekHour',
      key: 'thisWeekHour',
      width: '6%',
      render: (text: string, record: any) => getTextColor(text, record, 'black', 'thisWeekHour')
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: '6%',
      render: (text: string, record: any) => (record.id ? <span id={'status' + record.id}>{getStatus(text)}</span> : '')
    }
  ]

  const updateTableUI = (isEmpty: boolean = false, isPublish: boolean = false, isActive: any = null) => {
    selectedRowsArray.map((s, k) => {
      if (s && s.id) {
        for (let key in s) {
          if (
            s.hasOwnProperty(key) > -1 &&
            (key.indexOf('dayName') > -1 || key.indexOf('remark') > -1) &&
            key.indexOf('status') === -1
          ) {
            s[key] = isEmpty ? '' : s[key] || ''
            let input: any = document.querySelector(`[name="${key}${s.id}"]`)

            if (input !== null && input !== undefined) {
              input.value = isEmpty ? '' : s[key]
              input.style.color = isEmpty ? '' : s[key + 'Color'] || getShiftColor(s[key])
            }
          }
        }
        // 更新状态 status
        if (isEmpty) {
          s.status = '-1' // getStatus(-1)
        }
        if (isActive) {
          if (isPublish) {
            s.status = '1' // getStatus(1)
          } else {
            s.status = '0' // getStatus(0)
          }
        }

        // 更新工时
        countWorkHours(s)
        let inputW: any = document.querySelector(`[name="thisWeekHour${s.id}"]`)
        s.thisWeekHour = isEmpty ? '' : s.thisWeekHour + ''
        if (inputW) {
          inputW.value = isEmpty ? '' : s.thisWeekHour
          inputW.innerHTML = isEmpty ? '' : s.thisWeekHour
          s.thisWeekHour = isEmpty ? '' : s.thisWeekHour
        }
      }
      // 统计
      statisticFooter(selectedRowsArray)
    })

    let newTabelData = JSON.parse(JSON.stringify(selectedRowsArray))

    setTableList(newTabelData)

    setTableLoading(false)
  }

  const getMealList = () => {
    let deptCode = scheduleStore.getDeptCode() // '2508' ||
    service.scheduleMealApiService.getMealListByCode(deptCode, 'true').then((res) => {
      let oneUser = new Object()
      allUser = new Array()

      if (res && res.data) {
        tableData = res.data

        let rowKeys = new Array()
        tableData.map((item: any, index: number) => {
          let oneObj: any = {}
          let oneOb_1: any = {}
          let oneObj_2: any = {}
          for (let key in item) {
            oneOb_1[key + '_1'] = item[key]
            oneObj_2[key + '_2'] = item[key]
          }
          Object.assign(oneObj, item, oneOb_1, oneObj_2)
          if (oneObj.status === true) {
            rowKeys.push(oneObj.id)
          } else {
            oneObj.status = false
          }
          oneUser = new Object()
          for (const key in data) {
            if (data.hasOwnProperty(key) && oneObj.hasOwnProperty(key)) {
              ;(oneUser as any)[key] = oneObj[key]
            }
            if (key === 'id') {
              ;(oneUser as any).key = oneObj[key]
            }
          }
          ;(allUser as any).push(oneUser)
        })

        setMealList(allUser)

        tableData = JSON.parse(JSON.stringify(allUser))
      }
    })
  }

  const getShiftList = () => {
    let deptCode = scheduleStore.getDeptCode() // '2508' ||
    service.scheduleShiftApiService.getShiftListByCode(deptCode).then((res) => {
      console.log('查找排班班次res', res)
      if (res && res.data) {
        setShiftList(res.data)
        shiftListData = JSON.parse(JSON.stringify(res.data))
      }
    })
  }

  const getShiftUserList = () => {
    let deptCode = scheduleStore.getDeptCode() // '2508' ||
    allUser = new Array()
    service.scheduleUserApiService.getByDeptCode(deptCode).then((res) => {
      if (res && res.data) {
        allUser = res.data
        allUser = allUser.filter((u) => u.rangeShow === true)
        setShiftUserList(allUser)
        allUser.map((u, i) => {
          if (u.id) {
            u.showIndex = '' + (i + 1)
          }
        })

        setTableLoading(false)
      }
    })
  }

  const getSchedule = (isReset: any = false) => {
    let deptCode = scheduleStore.getDeptCode() // '2508' ||
    let startTime = scheduleStore.getStartTime()
    let endTime = scheduleStore.getEndTime()

    // 接口请求参数
    const postData = {
      deptCode: deptCode, // deptCode  科室编码 // "门诊护理"
      startTime: startTime, // startTime 开始时间（刚开始由后台传给前台）
      endTime: endTime // endTime   结束时间（刚开始由后台传给前台）
    }
    setLoading(true)
    let serv: any = isReset
      ? service.schedulingApiService.findSysnNurse(postData)
      : service.schedulingApiService.findShiftList(postData)
    serv
      .then((res: any) => {
        setLoading(false)
        let scheduleList: any = new Array()
        scheduleList = res.data
        let schShiftUser = scheduleList.schShiftUser
        if (res.data.schShiftUser[0] && res.data.schShiftUser[0].schStatus) {
          genDataTable(schShiftUser)
          scheduleStore.getWeeks().length == 2 ? setColumns(columns_2) : setColumns(columns_1)
          emitter.emit('设置页面标题', '编辑排班')
        } else {
          emitter.emit('设置页面标题', '新建排班')
          genDataTable(schShiftUser)
          scheduleStore.getWeeks().length == 2 ? setColumns(columns_2) : setColumns(columns_1)
          !isReset && newShedule(genDataTable)
        }
      })
      .catch((err: any) => {
        console.log('排班记录错误', err)
      })
  }

  const newShedule = (callback: Function) => {
    let deptCode = scheduleStore.getDeptCode()
    let startTime = scheduleStore.getStartTime()
    let endTime = scheduleStore.getEndTime()
    const postData = {
      deptCode: deptCode, // deptCode  科室编码
      startTime: startTime, // startTime 开始时间
      endTime: endTime // endTime   结束时间
    }

    service.schedulingApiService.newSchedule(postData).then((res) => {
      if (res && res.data) {
        let userList = res.data.schShiftUser
        if (callback) {
          callback(userList)
        }
      }
      setTableLoading(false)
    })
  }

  const genDataTable = (schShiftUser: any) => {
    selectedRowsArray = new Array()
    let tr = {}
    let newList = new Array()

    setTableLoading(true)

    schShiftUser.map((nurse: any, shcIndex: number) => {
      let getRangeName = (range: any, i: number) => {
        let result = ''
        try {
          result = range[i].rangeName ? range[i].rangeName : ''
        } catch (error) {
          return ''
        }
        return result
      }

      let getRangeNameCode = (range: any, i: number) => {
        let result = ''
        try {
          result = range[i].rangeNameCode ? range[i].rangeNameCode : ''
        } catch (error) {
          return ''
        }
        return result
      }

      let getNameColor = (range: any, i: number) => {
        let result = ''
        try {
          result = range[i].nameColor ? range[i].nameColor : ''
        } catch (error) {
          return ''
        }
        return result
      }

      if (scheduleStore.getWeeks().length == 2) {
        tr = {
          id: nurse.id || shcIndex + 1 || '',
          key: nurse.id || shcIndex + 1 || '',
          showIndex: '' + (shcIndex + 1),
          empNo: nurse.empNo || '',
          empName: nurse.empName || '',
          currentLevel: nurse.currentLevel || '',
          title: nurse.title || '',

          mondayName_1: nurse.settingDtos ? getRangeName(nurse.settingDtos, 0) : '',
          tuesdayName_1: nurse.settingDtos ? getRangeName(nurse.settingDtos, 1) : '',
          wednesdayName_1: nurse.settingDtos ? getRangeName(nurse.settingDtos, 2) : '',
          thursdayName_1: nurse.settingDtos ? getRangeName(nurse.settingDtos, 3) : '',
          fridayName_1: nurse.settingDtos ? getRangeName(nurse.settingDtos, 4) : '',
          saturdayName_1: nurse.settingDtos ? getRangeName(nurse.settingDtos, 5) : '',
          sundayName_1: nurse.settingDtos ? getRangeName(nurse.settingDtos, 6) : '',
          mondayName_2: nurse.settingDtos ? getRangeName(nurse.settingDtos, 7) : '',
          tuesdayName_2: nurse.settingDtos ? getRangeName(nurse.settingDtos, 8) : '',
          wednesdayName_2: nurse.settingDtos ? getRangeName(nurse.settingDtos, 9) : '',
          thursdayName_2: nurse.settingDtos ? getRangeName(nurse.settingDtos, 10) : '',
          fridayName_2: nurse.settingDtos ? getRangeName(nurse.settingDtos, 11) : '',
          saturdayName_2: nurse.settingDtos ? getRangeName(nurse.settingDtos, 12) : '',
          sundayName_2: nurse.settingDtos ? getRangeName(nurse.settingDtos, 13) : '',

          mondayName_1Color: nurse.settingDtos ? getNameColor(nurse.settingDtos, 0) : '',
          tuesdayName_1Color: nurse.settingDtos ? getNameColor(nurse.settingDtos, 1) : '',
          wednesdayName_1Color: nurse.settingDtos ? getNameColor(nurse.settingDtos, 2) : '',
          thursdayName_1Color: nurse.settingDtos ? getNameColor(nurse.settingDtos, 3) : '',
          fridayName_1Color: nurse.settingDtos ? getNameColor(nurse.settingDtos, 4) : '',
          saturdayName_1Color: nurse.settingDtos ? getNameColor(nurse.settingDtos, 5) : '',
          sundayName_1Color: nurse.settingDtos ? getNameColor(nurse.settingDtos, 6) : '',

          mondayName_2Color: nurse.settingDtos ? getNameColor(nurse.settingDtos, 7) : '',
          tuesdayName_2Color: nurse.settingDtos ? getNameColor(nurse.settingDtos, 8) : '',
          wednesdayName_2Color: nurse.settingDtos ? getNameColor(nurse.settingDtos, 9) : '',
          thursdayName_2Color: nurse.settingDtos ? getNameColor(nurse.settingDtos, 10) : '',
          fridayName_2Color: nurse.settingDtos ? getNameColor(nurse.settingDtos, 11) : '',
          saturdayName_2Color: nurse.settingDtos ? getNameColor(nurse.settingDtos, 12) : '',
          sundayName_2Color: nurse.settingDtos ? getNameColor(nurse.settingDtos, 13) : '',

          mondayName_1Code: getRangeNameCode(nurse.settingDtos, 0) || '',
          tuesdayName_1Code: getRangeNameCode(nurse.settingDtos, 1) || '',
          wednesdayName_1Code: getRangeNameCode(nurse.settingDtos, 2) || '',
          thursdayName_1Code: getRangeNameCode(nurse.settingDtos, 3) || '',
          fridayName_1Code: getRangeNameCode(nurse.settingDtos, 4) || '',
          saturdayName_1Code: getRangeNameCode(nurse.settingDtos, 5) || '',
          sundayName_1Code: getRangeNameCode(nurse.settingDtos, 6) || '',
          mondayName_2Code: getRangeNameCode(nurse.settingDtos, 7) || '',
          tuesdayName_2Code: getRangeNameCode(nurse.settingDtos, 8) || '',
          wednesdayName_2Code: getRangeNameCode(nurse.settingDtos, 9) || '',
          thursdayName_2Code: getRangeNameCode(nurse.settingDtos, 10) || '',
          fridayName_2Code: getRangeNameCode(nurse.settingDtos, 11) || '',
          saturdayName_2Code: getRangeNameCode(nurse.settingDtos, 12) || '',
          sundayName_2Code: getRangeNameCode(nurse.settingDtos, 13) || '',
          remark: nurse.remark || '',
          thisWeekHour: nurse.thisWeekHour || '',
          status: nurse.status // getStatus(nurse.status) || ''
        }
      } else {
        tr = {
          id: nurse.id || shcIndex + 1 || '',
          key: nurse.id || shcIndex + 1 || '',
          showIndex: '' + (shcIndex + 1),
          empNo: nurse.empNo || '',
          empName: nurse.empName || '',
          currentLevel: nurse.currentLevel || '',
          title: nurse.title || '',
          mondayName_1: nurse.settingDtos ? getRangeName(nurse.settingDtos, 0) : '',
          tuesdayName_1: nurse.settingDtos ? getRangeName(nurse.settingDtos, 1) : '',
          wednesdayName_1: nurse.settingDtos ? getRangeName(nurse.settingDtos, 2) : '',
          thursdayName_1: nurse.settingDtos ? getRangeName(nurse.settingDtos, 3) : '',
          fridayName_1: nurse.settingDtos ? getRangeName(nurse.settingDtos, 4) : '',
          saturdayName_1: nurse.settingDtos ? getRangeName(nurse.settingDtos, 5) : '',
          sundayName_1: nurse.settingDtos ? getRangeName(nurse.settingDtos, 6) : '',
          mondayName_1Color: nurse.settingDtos ? getNameColor(nurse.settingDtos, 0) : '',
          tuesdayName_1Color: nurse.settingDtos ? getNameColor(nurse.settingDtos, 1) : '',
          wednesdayName_1Color: nurse.settingDtos ? getNameColor(nurse.settingDtos, 2) : '',
          thursdayName_1Color: nurse.settingDtos ? getNameColor(nurse.settingDtos, 3) : '',
          fridayName_1Color: nurse.settingDtos ? getNameColor(nurse.settingDtos, 4) : '',
          saturdayName_1Color: nurse.settingDtos ? getNameColor(nurse.settingDtos, 5) : '',
          sundayName_1Color: nurse.settingDtos ? getNameColor(nurse.settingDtos, 6) : '',
          //
          mondayName_1Code: getRangeNameCode(nurse.settingDtos, 0) || '',
          tuesdayName_1Code: getRangeNameCode(nurse.settingDtos, 1) || '',
          wednesdayName_1Code: getRangeNameCode(nurse.settingDtos, 2) || '',
          thursdayName_1Code: getRangeNameCode(nurse.settingDtos, 3) || '',
          fridayName_1Code: getRangeNameCode(nurse.settingDtos, 4) || '',
          saturdayName_1Code: getRangeNameCode(nurse.settingDtos, 5) || '',
          sundayName_1Code: getRangeNameCode(nurse.settingDtos, 6) || '',
          remark: nurse.remark || '',
          thisWeekHour: nurse.thisWeekHour || '',
          status: nurse.status // getStatus(nurse.status) || ''
        }
      }

      let isPub = nurse.status === '1' ? true : false
      setIsPublished(isPub)

      newList.push(tr as any)
      selectedRowsArray.push(tr as any)
    })

    setTableList(JSON.parse(JSON.stringify(newList as any)))
    updateTableUI()
  }

  const remarkChange = (e: any) => {
    if (selectedRowsArray) {
      selectedRowsArray.map((r) => {
        if (r.hasOwnProperty('remark')) {
          r.remark = e.target.value + ''
        }
      })
    }
  }

  function statisticFooter(list: any) {
    // console.log('统计', list)
    let workhour = 0
    let rangeNames = new Array()
    let rangeObj = new Object()
    let remark = ''

    list.map((item: any) => {
      if (item.thisWeekHour) {
        workhour += !isNaN(Number(item.thisWeekHour)) ? Number(item.thisWeekHour) : 0
      }
      if (!remark || remark === '空') {
        remark = item.remark
      }
      for (const day of weekdayList) {
        let element = (item as any)[day + 'Code'] || (item as any)[day]
        if (element && element.length > 0) {
          if (rangeNames.indexOf(element) === -1) {
            ;(rangeObj as any)[element] = 1
          } else {
            ;(rangeObj as any)[element] += 1
          }
          rangeNames.push(element)
        }
      }
    })

    let rangeSum = ''
    for (const key in rangeObj) {
      if (rangeObj.hasOwnProperty(key)) {
        const element = (rangeObj as any)[key]
        rangeSum += `${key}(${element})，`
      }
    }
    rangeSum = rangeSum.trim()

    let totle = `排班小计：${rangeSum}工时${Number(workhour).toFixed(2)}小时。`

    let result = () => {
      return (
        <span>
          {totle}
          <br />
          排班备注：
          <Input.TextArea onChange={remarkChange} style={{ padding: '8px' }} defaultValue={remark} />
        </span>
      )
    }

    setFooter(result)

    return ''
  }

  const tableUpdate = (record: any, event: any, index: any) => {
    countWorkHours(record, selectedRow.target)
    // 表格数据更新
    tableList.map((t) => {
      if (t.id === record.id) {
        t = Object.assign(t, record)
      }
    })
    // 更新UI
    let m = record
    selectedRowsArray.map((s, k) => {
      if (selectedCell && selectedCell.record && s.id === selectedCell.record.id) {
        selectedRow.record = m
        for (let key in m) {
          if (
            m[key] &&
            (key.indexOf('dayName') > -1 || key.indexOf('remark') > -1 || key.indexOf('thisWeekHour') > -1)
          ) {
            s[key] = m[key]
            let input = selectedRow.target.querySelector(`[name="${key}${s.id}"]`)
            console.log('input', key, key + s.id, s, input)
            if (input) {
              input.value = m[key]
              input.style.color = getShiftColor(m[key]) // m[key + 'Color']
            }
          }
        }
        countWorkHours(selectedRow.record)
        let inputW = selectedRow.target.querySelector(`[name="thisWeekHour${selectedCell.record.id}"]`)
        if (inputW) {
          inputW.value = selectedRow.record.thisWeekHour
          s.thisWeekHour = selectedRow.record.thisWeekHour
        }
        console.log('inputW', inputW, selectedRow)
      }
    })

    setTableList(tableList)
    // 统计
    statisticFooter(selectedRowsArray)
  }

  const onRow = (record: any, index: any) => {
    return {
      onClick: (event: any) => {
        countWorkHours(record, event.currentTarget)
        selectedRow = new Object({
          index: index,
          record: record,
          target: event.currentTarget
        })
        tableList.map((t) => {
          if (t.id === record.id) {
            t = Object.assign(t, record)
          }
        })
        let input = selectedRow.target.querySelector(`[name="thisWeekHour${record.id}"]`)
        if (input) {
          input.value = record.thisWeekHour
        }
        selectedRowsArray.map((s) => {
          if (s.id === record.id) {
            s = Object.assign(s, record)
          }
        })
      },
      onDoubleClick: (event: any) => {
        let selectedCellValue = event.target.value
        let selectedCellName = event.target.name.replace(record.id || '', '')
        let selectedCellNameCode = selectedCellName + 'Code'
        let numberOfday = 1
        let diffDays = 0

        let clickedShift = shiftListData.filter((shift) => {
          if (
            (record[selectedCellNameCode] === '休假' ||
              shift.name === record[selectedCellName] ||
              shift.name === record[selectedCellNameCode]) &&
            shift.shiftType === '休假'
          ) {
            selectedCellValue = shift.name
            return shift
          }
        })

        if (!clickedShift || clickedShift.length === 0) {
          return
        }

        let onChangeInputNumber = (value: any) => {
          numberOfday = value
        }

        let updateTable = (n: any) => {
          let weekday = JSON.parse(JSON.stringify(weekdayList))
          let dayIndex = weekday.indexOf(selectedCellName)
          let endIndex = dayIndex

          for (let j = dayIndex, len = weekday.length; j < len; j++) {
            if (
              j != dayIndex &&
              record[weekday[j]] &&
              record[weekday[j]].length > 0 &&
              ((record[selectedCellNameCode] === '' && record[selectedCellName] !== record[weekday[j] + 'Code']) ||
                (record[selectedCellNameCode] && record[selectedCellNameCode] !== record[weekday[j] + 'Code']))
            ) {
              endIndex = j
              break
            }
          }

          if (endIndex == dayIndex && endIndex < weekday.length) {
            endIndex = weekday.length
          }

          diffDays = endIndex - dayIndex

          let subweekday = new Array()
          if (dayIndex > -1) {
            let color = getShiftColor(selectedCellValue) // record[record.key + 'Color']
            subweekday = weekday.slice(dayIndex, endIndex) // dayIndex + n + 1

            subweekday.map((key, i) => {
              record[key] = selectedCellValue + (numberOfday + i)
              record[key + 'Color'] = color
              record[key + 'Code'] = selectedCellValue
            })

            // 表格数据更新

            setTimeout(() => {
              tableUpdate(record, selectedRow, index)
              updateTableUI()
            }, 100)
          }
        }

        let onOK = (value?: any) => {
          updateTable(numberOfday)
        }

        let genContant = () => (
          <div
            style={{ textAlign: 'center' }}
            onKeyUp={(e) => {
              if (e.keyCode === 13) {
                // 回车
                onOK()
                emitter.emit('关闭弹框')
              }
            }}
          >
            <Form layout={'inline'}>
              <Form.Item label={selectedCellValue}>
                <InputNumber defaultValue={1} min={1} size={'large'} autoFocus onChange={onChangeInputNumber} />
              </Form.Item>
            </Form>
          </div>
        )
        emitter.emit('打开弹框', { index, record, event, contant: genContant(), onOK: onOK })
      }
    }
  }

  return (
    <Wrapper>
      <ModalBox title={'设置班次计数'} />

      <div className='left-box'>
        <BaseTable
          bordered
          size='middle'
          onRow={onRow}
          columns={columns}
          dataSource={tableList}
          pagination={false}
          surplusHeight={400}
          wrapperStyle={{
            padding: 0
          }}
          footer={() => {
            return footer
          }}
          style={{ padding: 0 }}
          type={['spaceRow']}
          loading={loading}
        />
      </div>
      <div style={{ flex: 1 }} />
      <div className='card-container'>
        <Tabs type='card'>
          <TabPane tab='可选班次' key='可选班次'>
            <div style={{ height: wih - 260 + 'px', overflow: 'auto' }}>
              {shiftList.map((m, i) =>
                m.status === true ? (
                  <Button
                    style={{ minWidth: '45%', width: '45%', margin: '4px 4px', color: m.nameColor || '' }}
                    onClick={(e: any) => {
                      if (selectedCell && selectedCell.record) {
                        let key = selectedCell.key
                        selectedCell.record[key] = m.name
                        selectedCell.record[key + 'Code'] = m.name
                        let selectedCellObj: any = new Object()
                        let input: any = null
                        selectedRowsArray.map((s) => {
                          if (s.id === selectedCell.record.id && key.indexOf('dayName') > -1) {
                            s[key] = m.name + ''
                            s[key + 'Code'] = m.name + ''
                            selectedCell.target.value = m.name + '' || '!!!'
                            selectedCell.target.style.color = m.nameColor + '' || ''
                            selectedCellObj = s
                            input = document.querySelector(`[name="${key}${s.id}"]`)
                          }
                        })

                        countWorkHours(selectedCellObj)
                        let inputW = selectedRow.target.querySelector(`[name="thisWeekHour${selectedCellObj.id}"]`)
                        if (inputW) {
                          inputW.value = selectedCellObj.thisWeekHour
                        }

                        /** 设置修改状态 */
                        setIsModified(true)
                        let newList = JSON.parse(JSON.stringify(selectedRowsArray))
                        setTableList(newList)

                        // 统计
                        statisticFooter(newList)

                        // 交点向右侧元件转移  $rightNode
                        let showIndex = ~~selectedCell.record.showIndex || 0
                        let recordId = ~~selectedCell.record.id
                        let newReocrd = selectedRowsArray[showIndex] || selectedRowsArray[0]
                        let record = selectedCell.record
                        let newReocrdId = newReocrd.id

                        let index = (weekdayList.indexOf(key) + 1) % weekdayList.length
                        let newKey = weekdayList[index]

                        if (newKey === 'mondayName_1') {
                          recordId = newReocrdId
                          record = newReocrd
                        }

                        input = document.querySelector(`[name="${newKey}${recordId}"]`)

                        if (input) {
                          input.focus()
                          selectedCell = new Object({
                            record: record,
                            key: newKey,
                            target: input // e.currentTarget
                          })
                          selectedRow = new Object({
                            index: showIndex || 0,
                            record: record,
                            target: input.parentNode.parentNode
                          })
                        }
                      }
                    }}
                    key={m.name + i}
                  >
                    {m.name}
                  </Button>
                ) : (
                  ''
                )
              )}
            </div>
          </TabPane>
          <TabPane tab='班次模版' key='班次模版'>
            <div style={{ height: wih - 260 + 'px', overflow: 'auto' }}>
              {mealList.map((m, i) =>
                m.status === true || 1 ? (
                  <Button
                    style={{ minWidth: '45%', width: '45%', margin: '4px 4px' }}
                    onClick={(e: any) => {
                      if (selectedRow && selectedRow.record) {
                        let inputs = selectedRow.target.querySelectorAll(`input[name*="${selectedRow.record.id}"]`)

                        selectedRowsArray.map((s, k) => {
                          if (s.id === selectedCell.record.id) {
                            selectedRow.record = m
                            for (let key in m) {
                              if (
                                m.hasOwnProperty(key) &&
                                (key.indexOf('dayName') > -1 ||
                                  key.indexOf('remark') > -1 ||
                                  key.indexOf('thisWeekHour') > -1)
                              ) {
                                s[key] = m[key] || ''
                                let input = selectedRow.target.querySelector(`[name="${key}${s.id}"]`)
                                if (input) {
                                  input.value = m[key] || ''
                                  input.style.color = m[key + 'Color']
                                }
                              }
                            }
                            countWorkHours(selectedRow.record)

                            let inputW = selectedRow.target.querySelector(
                              `[name="thisWeekHour${selectedCell.record.id}"]`
                            )
                            if (inputW) {
                              inputW.value = selectedRow.record.thisWeekHour
                              s.thisWeekHour = selectedRow.record.thisWeekHour
                            }
                          }
                        })

                        let newList = JSON.parse(JSON.stringify(selectedRowsArray))
                        // genEmptyTable(newList)
                        setTableList(newList)
                        // 统计
                        statisticFooter(newList)
                      }
                    }}
                    key={m.name + i}
                  >
                    {m.name}
                  </Button>
                ) : (
                  ''
                )
              )}
            </div>
          </TabPane>
        </Tabs>
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  display: flex;
  padding: 0 20px 20px 20px;
  width: 100%;
  .left-box {
    width: calc(100% - 220px);
  }

  .card-container > .ant-tabs-card > .ant-tabs-content {
    height: calc(100% - 220px);
    min-height: 360px;
    margin-top: -16px;
    border: 1px solid #e8e8e8;
    width: 210px;
  }

  .card-container > .ant-tabs-card > .ant-tabs-content > .ant-tabs-tabpane {
    background: #fff;
    padding: 6px;
    width: 100%;
  }

  .card-container > .ant-tabs-card > .ant-tabs-bar {
    border-color: #fff;
    border: 1px solid #e8e8e8;
    border-bottom: 0;
  }

  .card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab {
    border-color: transparent;
    background: #fafafa;
    width: 100px;
    border-bottom: 0;
    /* border: 1px solid #e8e8e8; */
  }

  .card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab-active {
    border-color: #fff;
    background: #fff;
    width: 100px;
  }

  .card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-nav {
    border-bottom: 0;
    background: #fafafa;
  }

  .ant-tabs-nav-container {
    background: #fafafa;
  }

  .ant-table-tbody > tr.ant-table-row-selected td {
    background: #ffff66;
  }

  td {
    text-align: center !important;
    padding: 0px !important;
    &:focus-within {
      outline: 1px solid green !important;
      background: yellow;
      color: black !important;
    }
  }

  .table-input {
    width: 100%;
    height: 100%;
    border: 0px;
    outline: 0px solid green !important;
    text-align: center;
    background: transparent;
    div,
    input {
      border: 0px;
      text-align: center;
      background: transparent;
    }
  }

  .table-input:hover {
    background: #fafafa;
  }

  .table-input:focus,
  .table-input:focus-within {
    outline: 0px solid green !important;
    background: yellow;
    color: black !important;
  }

  .ant-input,
  .table-input {
    padding: 0px;
  }
`
