import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
// import { Link } from 'react-router-dom'

import { Table, Tabs, Button, Input, InputNumber, Form, AutoComplete } from 'antd'
// import { Table, message, Popconfirm, Divider, Tag } from 'antd'
// import { authStore, scheduleStore } from 'src/stores'

import service from 'src/services/api'
import { scheduleStore } from 'src/stores'

import emitter from 'src/libs/ev'
// import ButtonGroup from 'antd/lib/button/button-group'

import ModalBox from 'src/modules/schedule/views/components/Modal/ModalBox'

import moment from 'moment'
// import { Link } from 'react-router-dom'
moment.locale('zh-cn', {
  weekdays: '日_一_二_三_四_五_六'.split('_')
})

let weekdayList = [
  'mondayName',
  'tuesdayName',
  'wednesdayName',
  'thursdayName',
  'fridayName',
  'saturdayName',
  'sundayName'
]

// const dateFormat = 'YYYY-MM-DD'

const TabPane = Tabs.TabPane
const Option = AutoComplete.Option

// import emitter from 'src/libs/ev'

// const Option = Select.Option
export interface Props extends RouteComponentProps {}

export default function MainBox () {
  const [count, setCount] = useState(0)
  const [tableLoading, setTableLoading] = useState(true)
  // const [rowSelection, setRowSelection] = useState(new Object())
  const [mealList, setMealList] = useState(new Array())
  const [tableList, setTableList] = useState(new Array())
  const [shiftList, setShiftList] = useState(new Array())
  const [dataSource, setDataSource] = useState(new Array())
  const [shiftUserList, setShiftUserList] = useState(new Array())

  const [shiftTableData, setShiftTableData] = useState(new Array())

  const [selectedCellObject, setSelectedCellObject] = useState(new Object() as any)
  const [selectedRowObject, setSelectedRowObject] = useState(new Object() as any)

  const countWorkHours = (record: any, target: any = null) => {
    // shiftListData  effectiveTime
    console.log('countWorkHours', record, shiftListData)
    let result = 0
    let shift: any = new Object()
    for (const key in record) {
      if (record.hasOwnProperty(key) && key.toLowerCase().indexOf('dayname') > -1) {
        const element = record[key]
        shift = shiftListData.find((s) => element === s.name)
        if (shift) {
          result += parseInt(shift.effectiveTime, 10) || 0
          if (target && target.name && target.name === key + record.id) {
            target.style.color = shift.nameColor || ''
          }
        }
      }
    }
    record.thisWeekHour = result + ''
    console.log('result', result)
    return result
  }

  const onChangeAutoInputText = (value: any, record: any, key: any) => {
    // shiftList
    console.log('onChangeAutoInputText', value, record, key, selectedCell)
    let selectedCellObj: any = new Object()

    selectedCell = selectedCellObject
    selectedRow = selectedRowObject

    selectedCell.target.style.color = getShiftColor(value)

    selectedRowsArray.map((row) => {
      if (row.id === record.id) {
        row[key] = value
        record[key] = value
        selectedCellObj = row
      }
    })
    countWorkHours(record, selectedCell.target)
    let inputW = selectedRow.target.querySelector(`span[id="thisWeekHour${selectedCell.record.id}"]`)
    if (inputW) {
      inputW.innerHTML = selectedRow.record.thisWeekHour
      selectedCellObj.thisWeekHour = selectedRow.record.thisWeekHour
    }

    setSelectedCellObject(selectedCell)
    setSelectedRowObject(selectedRow)
    setShiftTableData(JSON.parse(JSON.stringify(selectedRowsArray)))

    console.log('inputW', inputW, selectedRow, selectedCell, shiftList, selectedRowsArray)

    // 计算工时
  }

  const onClickAutoInputText = (e: any, record: any, key?: any) => {
    let autoInput = e.currentTarget.querySelector('input')
    record[key] = autoInput.value
    selectedCell = new Object({
      record: record,
      key: key,
      target: autoInput
    })
    setSelectedCellObject(selectedCell)
    selectedRowsArray = JSON.parse(JSON.stringify(shiftTableData))

    console.log(
      'onClickAutoInputText',
      e,
      autoInput,
      autoInput.value,
      record,
      key,
      selectedCell,
      selectedRowsArray,
      shiftTableData
    )
  }

  const onChangeInputText = (e: any, record: any, key: any) => {
    // shiftList
    console.log('onChangeInputText', e, record, key, e.currentTarget.value)
    let selectedCellObj: any = new Object()

    selectedCell = selectedCellObject
    selectedRow = selectedRowObject

    selectedRowsArray.map((row) => {
      if (row.id === record.id) {
        row[key] = e.currentTarget.value
        record[key] = e.currentTarget.value
        selectedCellObj = row
      }
    })
    countWorkHours(record, e.currentTarget)
    let inputW = selectedRow.target.querySelector(`span[id="thisWeekHour${selectedCell.record.id}"]`)
    if (inputW) {
      inputW.innerHTML = selectedRow.record.thisWeekHour
      selectedCellObj.thisWeekHour = selectedRow.record.thisWeekHour
    }
    console.log('inputW', inputW, selectedRow, selectedRowsArray)
    setShiftTableData(JSON.parse(JSON.stringify(selectedRowsArray)))

    // 计算工时
  }

  const onClickInputText = (e: any, record: any, key?: any) => {
    record[key] = e.currentTarget.value
    selectedCell = new Object({
      record: record,
      key: key,
      target: e.currentTarget
    })
    setSelectedCellObject(selectedCell)
    console.log('onClickInputText', e, e.currentTarget, record, e.currentTarget.value, key, selectedCell)
  }

  const getShiftColor = (text: string) => {
    if (!text) {
      return 'black'
    }
    let shift = shiftList.find((s) => text === s.name)
    let shiftData = shiftListData.find((s) => text === s.name)
    if (shift) {
      return shift.nameColor
    }
    if (shiftData) {
      return shiftData.nameColor
    }
    return 'black'
  }

  const renderOption = (item: string) => {
    return (
      <Option key={item} value={item} style={{ color: getShiftColor(item) }}>
        {item}
      </Option>
    )
  }

  const getWeekDay = (weekday: number) => {
    let days = ['', '一', '二', '三', '四', '五', '六', '日']
    let date = moment(scheduleStore.getStartTime())
      .add(weekday - 1, 'days')
      .format('M[月]DD[日(周]dddd[)]')
    // console.log('周', weekday, scheduleStore.getStartTime(), date)
    if (date.indexOf('Invalid date') > -1) {
      return `周${days[weekday - 1]}`
    }
    return `${date}`
  }

  let data = {
    key: '',
    id: '',
    createTime: '',
    deptCode: '',
    name: '',
    mondayName: '',
    tuesdayName: '',
    wednesdayName: '',
    thursdayName: '',
    fridayName: '',
    saturdayName: '',
    sundayName: '',
    mondayNameColor: '',
    tuesdayNameColor: '',
    wednesdayNameColor: '',
    thursdayNameColor: '',
    fridayNameColor: '',
    saturdayNameColor: '',
    sundayNameColor: '',
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
        return '未设置排班'
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

  const getTextColor = (text: string, record: any, colorName: string, key?: any) =>
    record.showIndex ? (
      <div>
        {key && key === 'remark' ? (
          <Input
            name={key + record.key}
            onClick={(e) => onClickInputText(e, record, key)}
            onChange={(e) => onChangeInputText(e, record, key)}
            style={{ color: colorName || getShiftColor(text) || '' }}
            className={'table-input'}
            defaultValue={text && text.length > 0 ? text : ''}
          />
        ) : (
          <div onClick={(e) => onClickAutoInputText(e, record, key)}>
            <AutoComplete
              dataSource={dataSource.map(renderOption)}
              onChange={(e) => onChangeAutoInputText(e, record, key)}
              id={'WeekInput' + key + record.key}
              filterOption={(inputValue: any, option: any) =>
                option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1 ||
                dataSource.indexOf(inputValue.toUpperCase()) !== -1
              }
              className={'table-input'}
              style={{ color: colorName || getShiftColor(text) || '' }}
              defaultValue={text && text.length > 0 ? text : ''}
            />
          </div>
        )}
      </div>
    ) : (
      ''
    )

  // let ModalBoxRef: any = new Object() // React.createRef()

  const columns = [
    // {
    //   title: '序号',
    //   dataIndex: 'id',
    //   key: 'id',
    //   width: '5%'
    // },
    {
      title: '序号',
      dataIndex: 'showIndex',
      key: 'showIndex',
      width: '5%'
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
      title: () => getWeekDay(1),
      dataIndex: 'mondayName',
      key: 'mondayName',
      width: '70px',
      render: (text: string, record: any) => getTextColor(text, record, record.mondayNameColor, 'mondayName')
    },
    {
      title: () => getWeekDay(2),
      dataIndex: 'tuesdayName',
      key: 'tuesdayName',
      width: '70px',
      render: (text: string, record: any) => getTextColor(text, record, record.tuesdayNameColor, 'tuesdayName')
    },
    {
      title: () => getWeekDay(3),
      dataIndex: 'wednesdayName',
      key: 'wednesdayName',
      width: '70px',
      render: (text: string, record: any) => getTextColor(text, record, record.thursdayNameColor, 'wednesdayName')
    },
    {
      title: () => getWeekDay(4),
      dataIndex: 'thursdayName',
      key: 'thursdayName',
      width: '70px',
      render: (text: string, record: any) => getTextColor(text, record, record.thursdayNameColor, 'thursdayName')
    },
    {
      title: () => getWeekDay(5),
      dataIndex: 'fridayName',
      key: 'fridayName',
      width: '70px',
      render: (text: string, record: any) => getTextColor(text, record, record.fridayNameColor, 'fridayName')
    },
    {
      title: () => getWeekDay(6),
      dataIndex: 'saturdayName',
      key: 'saturdayName',
      width: '70px',
      render: (text: string, record: any) => getTextColor(text, record, record.saturdayNameColor, 'saturdayName')
    },
    {
      title: () => getWeekDay(7),
      dataIndex: 'sundayName',
      key: 'sundayName',
      width: '70px',
      render: (text: string, record: any) => getTextColor(text, record, record.sundayNameColor, 'sundayName')
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      width: '15%',
      render: (text: string, record: any) => getTextColor(text, record, 'black', 'remark')
    },
    {
      title: '本周工时(小时)',
      dataIndex: 'thisWeekHour',
      key: 'thisWeekHour',
      width: '6%',
      render: (text: string, record: any) => (record.id ? <span id={'thisWeekHour' + record.id}>{text}</span> : '')
      // render: (text: string, record: any) => getTextColor(text, record, 'black', 'thisWeekHour')
      //
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: '10%',
      render: (text: string, record: any) => (record.id ? <span id={'status' + record.id}>{getStatus(text)}</span> : '')
    }
  ]

  // let dataSource = ['A', 'N', 'P']
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    getMealList()
    getShiftList()
    getShiftUserList()
    getSchedule()

    emitter.removeAllListeners('获取编辑排班列表')
    emitter.removeAllListeners('更新班次套餐列表')
    emitter.removeAllListeners('更新排班人员列表')
    emitter.removeAllListeners('更新排班列表')
    emitter.removeAllListeners('重置排班列表')
    emitter.removeAllListeners('发布并更新排班列表')
    emitter.removeAllListeners('更新排班列表表格')
    emitter.removeAllListeners('更新复制上周排班')

    emitter.addListener('获取编辑排班列表', (callback: any) => {
      // console.log('获取编辑排班列表addListener', selectedRowsArray, selectedCell)
      selectedRowsArray.map((nurse) => {
        nurse.status = getStatusToNum(nurse.status)
      })

      if (callback) {
        // console.log('获取编辑排班列表addListener',selectedRowsArray, shiftTableData)
        // callback(shiftTableData, shiftListData)
        callback(selectedRowsArray, shiftListData)
      }
    })

    emitter.addListener('更新班次套餐列表', () => {
      getMealList()
    })

    emitter.addListener('更新排班人员列表', () => {
      setTableLoading(true)
      getShiftUserList()
    })

    emitter.addListener('更新排班列表', () => {
      updateTableUI(true)
      getSchedule()
    })

    emitter.addListener('重置排班列表', () => {
      updateTableUI(true)
    })

    emitter.addListener('发布并更新排班列表', () => {
      updateTableUI(false, true)
    })

    emitter.addListener('更新排班列表表格', () => {
      updateTableUI()
    })

    emitter.addListener('更新复制上周排班', (schShiftUser: any) => {
      updateTableUI(true)
      genDataTable(schShiftUser)
      updateTableUI()
    })

    //

    //
    console.log(
      count,
      setCount,
      setTableList,
      shiftList,
      setShiftList,
      shiftUserList,
      setShiftUserList,
      mealList,
      setMealList,
      shiftTableData,
      setShiftTableData
      // rowSelection,
      // setRowSelection
    )
  }, []) // <= 执行初始化操作，需要注意的是，如果你只是想在渲染的时候初始化一次数据，那么第二个参数必须传空数组。

  const updateTableUI = (isEmpty: boolean = false, isPublish: boolean = false) => {
    // selectedRowsArray = shiftTableData
    console.log('====updateTableUI', selectedRowsArray, shiftTableData)
    selectedRowsArray.map((s, k) => {
      if (s && s.id) {
        for (let key in s) {
          if (s[key] && (key.indexOf('dayName') > -1 || key.indexOf('remark') > -1) && key.indexOf('status') === -1) {
            // console.log('key', key, s[key])
            s[key] = isEmpty ? '' : s[key] || ''
            let input: any = document.querySelector(`div#WeekInput${key}${s.id} input`)
            if (input) {
              input.value = isEmpty ? '' : s[key]
              input.style.color = isEmpty ? '' : getShiftColor(s[key])
            }
          }
        }
        // 更新状态 status
        // let inputS: any = document.querySelector(`span[id="status${s.id}"]`)
        // s.status = isEmpty ? getStatus(0) : getStatus(s.status)
        // s.status = isEmpty ? getStatus(-1) : isPublish ? getStatus(1) : getStatus(0)
        if (isEmpty) {
          s.status = '-1' // getStatus(-1)
        } else {
          if (isPublish) {
            s.status = '1' // getStatus(1)
          } else {
            s.status = '0' // getStatus(0)
          }
        }

        // if (inputS) {
        //   inputS.innerHTML = getStatus(s.status)
        // }
        // console.log('inputS', inputS, s.status)
        // span id
        // 更新工时
        countWorkHours(s)
        let inputW: any = document.querySelector(`span[id="thisWeekHour${s.id}"]`)
        s.thisWeekHour = isEmpty ? '' : s.thisWeekHour + ''
        if (inputW) {
          inputW.innerHTML = s.thisWeekHour
          s.thisWeekHour = s.thisWeekHour
        }
        // console.log('inputW', inputW, selectedRow)
      }
    })

    // tableList.map((t: any, key: any) => {
    //   if (t.id === s.id) {
    //     console.log('---', s.id, key)
    //     if (
    //       s[key] &&
    //       (key.indexOf('dayName') > -1 || key.indexOf('thisWeekHour') > -1) &&
    //       key.indexOf('status') === -1
    //     ) {
    //       t[key] = isEmpty ? '' : s[key]
    //       console.log('---', key)
    //     }
    //   }
    // })
    let newTabelData = JSON.parse(JSON.stringify(selectedRowsArray))

    setShiftTableData(JSON.parse(JSON.stringify(selectedRowsArray)))

    genEmptyTable(newTabelData)
    setTableList(newTabelData)
    // setTableList(tableList)
    // console.log('==!!排班列表', selectedRow, shiftListData, tableList, selectedRowsArray)
  }

  const getMealList = () => {
    let deptCode = scheduleStore.getDeptCode() // '2508' ||
    service.scheduleMealApiService.getMealListByCode(deptCode, 'true').then((res) => {
      console.log('查找排班班次套餐res', res, data)
      let oneUser = new Object()
      allUser = new Array()
      // selectedRowsArray = new Array()
      // columns

      if (res && res.data) {
        tableData = res.data

        let rowKeys = new Array()
        tableData.map((oneObj: any, index: number) => {
          console.log('oneObj', index, oneObj, oneObj.status)
          if (oneObj.status === true) {
            console.log('tableDataIndex', index)
            rowKeys.push(oneObj.id)
          } else {
            oneObj.status = false
          }
          oneUser = new Object()
          for (const key in data) {
            if (data.hasOwnProperty(key) && oneObj.hasOwnProperty(key)) {
              (oneUser as any)[key] = oneObj[key]
            }
            if (key === 'id') {
              (oneUser as any).key = oneObj[key]
            }
          }
          (allUser as any).push(oneUser)
          // selectedRowsArray.push(oneUser)
        })

        // genEmptyTable(allUser)
        // setMealList(selectedRowsArray)
        setMealList(allUser)
        // setTableList(allUser)
        tableData = JSON.parse(JSON.stringify(allUser))
        console.log('查找排班班次套餐', mealList, allUser, tableData)
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
        let dataSourceArray = new Array()
        shiftListData.map((s: any) => {
          dataSourceArray.push(s.name)
        })
        setDataSource(dataSourceArray)
        console.log('查找排班班次dataSourceArray', shiftListData, dataSource, dataSourceArray)
      }
    })
  }

  const getShiftUserList = () => {
    let deptCode = scheduleStore.getDeptCode() // '2508' ||
    allUser = new Array()
    service.scheduleUserApiService.getByDeptCode(deptCode).then((res) => {
      console.log('刷新排班人员', res)
      if (res && res.data) {
        allUser = res.data
        allUser = allUser.filter((u) => u.rangeShow === true)
        setShiftUserList(allUser)
        allUser.map((u, i) => {
          if (u.id) {
            u.showIndex = '' + (i + 1)
          }
        })
        console.log('刷新排班人员', allUser, allUser.length)
        genEmptyTable(allUser)
        // setTableList(allUser)
        // console.log('刷新排班人员', tableList, allUser)
        setTableLoading(false)
      }
    })
    // schShiftUser
  }

  const getSchedule = (isReset: any = false) => {
    let deptCode = scheduleStore.getDeptCode() // '2508' ||
    let startTime = scheduleStore.getStartTime()
    let endTime = scheduleStore.getEndTime()
    console.log('getSchedule', deptCode, startTime, endTime)
    // 接口请求参数
    const postData = {
      deptCode: deptCode, // deptCode  科室编码 // "门诊护理"
      startTime: startTime, // startTime 开始时间（刚开始由后台传给前台）
      endTime: endTime // endTime   结束时间（刚开始由后台传给前台）
    }
    service.schedulingApiService
      .findShiftList(postData)
      .then((res) => {
        console.log('本周排班记录', res)
        // todo ... emitter 将数据传递给表格组件进行下一步数据渲染
        let scheduleList: any = new Array()
        if (res && res.data) {
          scheduleList = res.data
          let schShiftUser = scheduleList.schShiftUser
          // sort
          schShiftUser = schShiftUser.sort((a: any, b: any) => a.id < b.id)
          console.log('本周排班记录scheduleList', scheduleList, schShiftUser)
          // emitter.emit('本周排班记录', res.data)
          // genEmptyTable(scheduleList)
          // setTableList(scheduleList)
          if (schShiftUser && schShiftUser.length > 0 && !isReset) {
            genDataTable(schShiftUser)
          } else {
            emitter.emit('设置页面标题', '新建排班')
            newShedule(genDataTable)
          }
        }
      })
      .catch((err) => {
        console.log('排班记录错误', err)
      })
  }

  const newShedule = (callback: Function) => {
    let deptCode = scheduleStore.getDeptCode()
    let startTime = scheduleStore.getStartTime()
    let endTime = scheduleStore.getEndTime()
    console.log(deptCode, startTime, endTime)
    const postData = {
      deptCode: deptCode, // deptCode  科室编码
      startTime: startTime, // startTime 开始时间
      endTime: endTime // endTime   结束时间
    }
    console.log('新建newSchedule', postData)
    service.schedulingApiService.newSchedule(postData).then((res) => {
      console.log('新建成功', res)
      // emitter.emit('本周排班记录', res.data)
      if (res && res.data) {
        console.log('postDataArray', res)
        let userList = res.data.schShiftUser
        if (callback) {
          callback(userList)
        }
      }
    })
  }

  const genDataTable = (schShiftUser: any) => {
    selectedRowsArray = new Array()
    let tr = {}
    let newList = new Array()

    schShiftUser.map((nurse: any, shcIndex: number) => {
      console.log('nurse', shcIndex, nurse.empName, nurse)
      let getRangeName = (range: any, i: number) => {
        let result = ''
        try {
          result = range[i].rangeName ? range[i].rangeName : ''
        } catch (error) {
          return ''
        }
        return result
      }

      tr = {
        id: nurse.id || shcIndex + 1 || '',
        key: nurse.id || shcIndex + 1 || '',
        showIndex: '' + (shcIndex + 1),
        empNo: nurse.empNo || '',
        empName: nurse.empName || '',
        currentLevel: nurse.currentLevel || '',
        title: nurse.title || '',
        mondayName: nurse.settingDtos ? getRangeName(nurse.settingDtos, 0) : '',
        tuesdayName: nurse.settingDtos ? getRangeName(nurse.settingDtos, 1) : '',
        wednesdayName: nurse.settingDtos ? getRangeName(nurse.settingDtos, 2) : '',
        thursdayName: nurse.settingDtos ? getRangeName(nurse.settingDtos, 3) : '',
        fridayName: nurse.settingDtos ? getRangeName(nurse.settingDtos, 4) : '',
        saturdayName: nurse.settingDtos ? getRangeName(nurse.settingDtos, 5) : '',
        sundayName: nurse.settingDtos ? getRangeName(nurse.settingDtos, 6) : '',
        remark: nurse.remark || '',
        thisWeekHour: nurse.thisWeekHour || '',
        status: nurse.status // getStatus(nurse.status) || ''
      }
      // console.log('tr', tr)
      newList.push(tr as any)
      selectedRowsArray.push(tr as any)
    })
    // console.log('schShiftUser', schShiftUser, newList, selectedRowsArray)
    //
    setShiftTableData(JSON.parse(JSON.stringify(selectedRowsArray)))
    // 补空行
    genEmptyTable(newList)
    // // 统计
    // // statisticFooter(newList)
    setTableLoading(false)
    setTableList(JSON.parse(JSON.stringify(newList as any)))
    console.log('tableList', tableList, newList, selectedRowsArray, shiftTableData)
    updateTableUI()
  }

  const genEmptyTable = (newList: any) => {
    let rowNum = 10
    // 补空行
    let diff = rowNum - (newList.length % rowNum)
    if (diff > 0 && newList.length !== rowNum) {
      for (let j = 0; j < diff; j++) {
        let newData = JSON.parse(JSON.stringify(data))
        if (newData.hasOwnProperty('key')) {
          newData.key = 'empty' + j
        }
        newList.push(newData)
      }
    }
  }

  const tableUpdate = (record: any, event: any, index: any) => {
    countWorkHours(record, selectedRow.target)
    // selectedRow = new Object({
    //   index: index,
    //   record: record,
    //   target: event.target
    // })
    // 表格数据更新
    tableList.map((t) => {
      if (t.id === record.id) {
        t = Object.assign(t, record)
      }
    })
    // 更新UI
    // let inputs = selectedRow.target.querySelectorAll(`input[id*="${selectedRow.record.id}"]`)
    // console.log('inputs', inputs)
    let m = record
    selectedRowsArray.map((s, k) => {
      if (selectedCell && selectedCell.record && s.id === selectedCell.record.id) {
        selectedRow.record = m
        for (let key in m) {
          // console.log('key', key, m[key])
          if (m[key] && (key.indexOf('dayName') > -1 || key.indexOf('thisWeekHour') > -1)) {
            console.log('key', key, m[key])
            s[key] = m[key]
            let input = selectedRow.target.querySelector(`div#WeekInput${key}${s.id} input`)
            console.log('input', key, key + s.id, s, input)
            if (input) {
              input.value = m[key]
              input.style.color = getShiftColor(m[key]) // m[key + 'Color']
            }
          }
        }
        countWorkHours(selectedRow.record)
        // selectedRowsArray[selectedRow.index]
        let inputW = selectedRow.target.querySelector(`span[id="thisWeekHour${selectedCell.record.id}"]`)
        if (inputW) {
          inputW.innerHTML = selectedRow.record.thisWeekHour
          s.thisWeekHour = selectedRow.record.thisWeekHour
        }
        console.log('inputW', inputW, selectedRow)
      }
    })

    // setShiftTableData(JSON.parse(JSON.stringify(selectedRowsArray)))

    console.log('==tableUpdate', record, index, event, selectedRow, shiftListData, tableList, selectedRowsArray)
    setTableList(tableList)
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
        setSelectedRowObject(selectedRow)
        console.log('onRow', selectedRow, index, record)
        tableUpdate(record, selectedRow, index)

        // updateTableUI()
        // selectedRowsArray
        // thisWeekHour
        // setRowSelection(event.currentTarget)
      }, // click row
      onDoubleClick: (event: any) => {
        console.log('onRowDoubleClick', record, index, event, event.target)
        let selectedCellValue = event.target.value
        let selectedCellName = event.target.name.replace(record.id || '', '')
        let numberOfday = 0
        let onChangeInputNumber = (value: any) => {
          numberOfday = value
          console.log('onChangeInputNumber', value, numberOfday)
        }

        let updateTable = (n: any) => {
          // tableList update
          // selectedRow
          // selectedRowsArray

          let weekday = JSON.parse(JSON.stringify(weekdayList))
          let dayIndex = weekday.indexOf(selectedCellName)
          let subweekday = new Array()
          if (dayIndex > -1) {
            subweekday = weekday.slice(dayIndex, dayIndex + n + 1)
            subweekday.map((key) => {
              record[key] = selectedCellValue
            })

            // 表格数据更新
            tableUpdate(record, selectedRow, index)
            updateTableUI()
          }

          console.log(
            'update table',
            dayIndex,
            n + dayIndex,
            n,
            selectedCellName,
            selectedCellValue,
            record,
            weekdayList,
            subweekday
          )
        }

        let onOK = (value?: any) => {
          console.log('onOK---', value || '')
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
                <InputNumber defaultValue={0} min={0} size={'large'} autoFocus onChange={onChangeInputNumber} />
              </Form.Item>
            </Form>
          </div>
        )
        emitter.emit('打开弹框', { index, record, event, contant: genContant(), onOK: onOK })
        // ModalBoxRef.open()
      } // double click row
      // onContextMenu: (event: any) => {
      //   console.log('onRowContextMenu', record, index, event)
      // } // right button click row
      // onMouseEnter: (event: any) => {
      //   console.log('onRowMouseEnter', record, index, event)
      // }, // mouse enter row
      // onMouseLeave: (event: any) => {
      //   console.log('onRowMouseLeave', record, index, event)
      // } // mouse leave row
    }
  }

  return (
    <Wrapper>
      <ModalBox title={'设置班次计数'} />
      <div className='left-box'>
        <Table
          // rowSelection={rowSelection}
          loading={tableLoading}
          bordered
          onRow={onRow}
          columns={columns}
          dataSource={tableList}
          rowKey={(record) => record.key}
        />
      </div>
      <div style={{ flex: 1 }} />
      <div className='card-container'>
        <Tabs onChange={(e) => console.log('切换选卡至 ' + e)} type='card'>
          <TabPane tab='可选班次' key='可选班次'>
            {shiftList.map((m, i) =>
              m.status === true ? (
                <Button
                  style={{ minWidth: '45%', width: '45%', margin: '4px 4px', color: m.nameColor || '' }}
                  onClick={(e: any) => {
                    // message.info(m.name)
                    console.log('--可选班', e, m, selectedCell, selectedCellObject, selectedRow, shiftTableData)

                    selectedCell = selectedCellObject
                    selectedRow = selectedRowObject

                    if (selectedCell && selectedCell.record) {
                      let key = selectedCell.key
                      selectedCell.record[key] = m.name
                      let selectedCellObj: any = new Object()

                      // setShiftTableData(JSON.parse(JSON.stringify(selectedRowsArray)))
                      selectedRowsArray = JSON.parse(JSON.stringify(shiftTableData))

                      if (selectedRowsArray && selectedRowsArray.length > 0) {
                        selectedRowsArray.map((s) => {
                          if (s.id === selectedCell.record.id && key.indexOf('dayName') > -1) {
                            s[key] = m.name
                            selectedCell.target.value = m.name
                            selectedCell.target.style.color = m.nameColor || ''
                            selectedCellObj = JSON.parse(JSON.stringify(s))
                          }
                        })
                        countWorkHours(selectedCellObj)
                        let input = selectedRow.target.querySelector(`span[id="thisWeekHour${selectedCellObj.id}"]`)
                        if (input) {
                          input.value = selectedCellObj.thisWeekHour
                        }
                        console.log(
                          '!!可选班次选中',
                          e,
                          m,
                          key,
                          selectedCell,
                          selectedCellObj,
                          selectedRowsArray,
                          selectedRow,
                          input
                        )
                      } else {
                        console.log('!!空空selectedRowsArray')
                      }

                      // setShiftTableData(JSON.parse(JSON.stringify(selectedRowsArray)))

                      // updateTableUI()
                      // let newList = JSON.parse(JSON.stringify(selectedRowsArray))
                      // genEmptyTable(newList)
                      // setTableList(newList)
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
          </TabPane>
          <TabPane tab='班次模版' key='班次模版'>
            {mealList.map((m, i) =>
              m.status === true || 1 ? (
                <Button
                  style={{ minWidth: '45%', width: '45%', margin: '4px 4px' }}
                  onClick={(e: any) => {
                    // message.info(m.name)
                    console.log(e, m, selectedCell, selectedRowsArray, selectedRow)
                    if (selectedRow && selectedRow.record) {
                      // let inputs = selectedRow.target.querySelectorAll(`input[id*="${selectedRow.record.id}"]`)
                      // console.log('inputs', inputs)
                      selectedRowsArray = JSON.parse(JSON.stringify(shiftTableData))
                      selectedRowsArray.map((s, k) => {
                        if (s.id === selectedCell.record.id) {
                          selectedRow.record = m
                          for (let key in m) {
                            // console.log('key', key, m[key])
                            if (m[key] && (key.indexOf('dayName') > -1 || key.indexOf('thisWeekHour') > -1)) {
                              console.log('key', key, m[key])
                              s[key] = m[key]
                              let input = selectedRow.target.querySelector(`div#WeekInput${key}${s.id} input`)
                              console.log('input', key, key + s.id, s, input)
                              if (input) {
                                input.value = m[key]
                                input.style.color = m[key + 'Color']
                              }
                            }
                          }
                          countWorkHours(selectedRow.record)
                          // selectedRowsArray[selectedRow.index]
                          let inputW = selectedRow.target.querySelector(
                            `span[id="thisWeekHour${selectedCell.record.id}"]`
                          )
                          if (inputW) {
                            inputW.innerHTML = selectedRow.record.thisWeekHour
                            s.thisWeekHour = selectedRow.record.thisWeekHour
                          }
                          console.log('inputW', inputW, selectedRow)
                        }
                      })
                      console.log('班次模版selectedRowsArray', selectedRowsArray)
                      let newList = JSON.parse(JSON.stringify(selectedRowsArray))
                      genEmptyTable(newList)
                      setTableList(newList)
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
          </TabPane>
        </Tabs>
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  /* background: #eee; */
  /* height: 100%; */
  display: flex;
  padding: 0 20px 20px 20px;
  width: 100%;
  table,
  tr,
  td,
  th,
  th div {
    text-align: center;
    padding: 4px !important;
    min-height: 32px !important;
    height: 32px !important;
  }
  th div {
    text-align: center;
    padding: 2px !important;
    min-height: 40px !important;
    height: auto !important;
  }
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

  th,
  td {
    text-align: center !important;
    padding: 0px !important;
  }

  .table-input {
    border: 0px;
    outline: 0px solid white !important;
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
    outline: 0px solid white !important;
    background: yellow;
    color: black !important;
  }

  .ant-input,
  .table-input {
    padding: 0px;
  }
`
