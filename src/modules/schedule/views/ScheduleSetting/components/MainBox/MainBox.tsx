import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
// import { Link } from 'react-router-dom'

import { Table, Tag, Tabs, message, Button } from 'antd'
// import { Table, message, Popconfirm, Divider, Tag } from 'antd'
// import { authStore, scheduleStore } from '@/stores'
import service from 'src/services/api'
import { scheduleStore } from '@/stores'

import emitter from 'src/libs/ev'
// import ButtonGroup from 'antd/lib/button/button-group'

const TabPane = Tabs.TabPane

// import emitter from 'src/libs/ev'

// const Option = Select.Option
export interface Props extends RouteComponentProps {}

const getTextColor = (text: string, record: any, colorName: string) =>
  text && text.length > 0 ? (
    <span>
      <Tag color={colorName} key={text}>
        {text.toUpperCase()}
      </Tag>
    </span>
  ) : (
    ''
  )

const columns = [
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
    width: '5%'
  },
  {
    title: '周一',
    dataIndex: 'mondayName',
    key: 'mondayName',
    width: '6%',
    render: (text: string, record: any) => getTextColor(text, record, record.mondayNameColor)
  },
  {
    title: '周二',
    dataIndex: 'tuesdayName',
    key: 'tuesdayName',
    width: '6%',
    render: (text: string, record: any) => getTextColor(text, record, record.tuesdayNameColor)
  },
  {
    title: '周三',
    dataIndex: 'wednesdayName',
    key: 'wednesdayName',
    width: '6%',
    render: (text: string, record: any) => getTextColor(text, record, record.thursdayNameColor)
  },
  {
    title: '周四',
    dataIndex: 'thursdayName',
    key: 'thursdayName',
    width: '6%',
    render: (text: string, record: any) => getTextColor(text, record, record.thursdayNameColor)
  },
  {
    title: '周五',
    dataIndex: 'fridayName',
    key: 'fridayName',
    width: '6%',
    render: (text: string, record: any) => getTextColor(text, record, record.fridayNameColor)
  },
  {
    title: '周六',
    dataIndex: 'saturdayName',
    key: 'saturdayName',
    width: '6%',
    render: (text: string, record: any) => getTextColor(text, record, record.saturdayNameColor)
  },
  {
    title: '周日',
    dataIndex: 'sundayName',
    key: 'sundayName',
    width: '6%',
    render: (text: string, record: any) => getTextColor(text, record, record.sundayNameColor)
  },
  {
    title: '备注',
    dataIndex: 'settingDtos',
    key: 'settingDtos',
    width: '15%'
  },
  {
    title: '本周工时(小时)',
    dataIndex: 'thisWeekHour',
    key: 'thisWeekHour',
    width: '5%'
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    width: '5%'
  }
  // 备注 本周工时(小时)  状态
  // {
  //   title: '操作',
  //   dataIndex: 'title',
  //   width: '12%',
  //   key: 'title',
  //   render: (text: string, record: any) =>
  //     record.id ? (
  //       <span>
  //         <a
  //           href='javascript:;'
  //           onClick={(e: any) => {
  //             console.log('编辑e', e)
  //             // message.success(`编辑${record.key}`)
  //             emitter.emit('弹窗编辑排班套餐', record)
  //           }}
  //         >
  //           编辑
  //         </a>
  //         <Divider type='vertical' />
  //         <Popconfirm
  //           title='确认要删除?'
  //           onConfirm={() => {
  //             service.scheduleMealApiService.delete(record.key).then((res) => {
  //               emitter.emit('更新班次套餐列表')
  //             })
  //             message.success(`删除${record.key}`)
  //           }}
  //         >
  //           <a href='javascript:;'>删除</a>
  //         </Popconfirm>
  //       </span>
  //     ) : (
  //       ''
  //     )
  // }
]

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

// rowSelection objects indicates the need for row selection
// let rowSelection = {
//   onChange: (selectedRowKeys: any, selectedRows: any) => {
//     // selectedRowsArray = selectedRows
//     console.log(`onChange:selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
//   },
//   onSelect: (record: any, selected: any, selectedRows: any) => {
//     record.status = selected
//     selectedRowsArray.map((res: any) => {
//       if (res.id === record.id) {
//         res.status = selected
//       }
//     })
//     // selectedRowsArray
//     console.log('onSelect', record, selected, selectedRows)
//   },
//   onSelectAll: (selected: any, selectedRows: any, changeRows: any) => {
//     if (selectedRows && selectedRows.length === 0) {
//       selectedRowsArray.map((res: any) => {
//         res.status = false
//       })
//     } else {
//       selectedRows.map((res: any) => {
//         res.status = true
//       })
//     }

//     console.log('onSelectAll', selected, selectedRows, changeRows)
//   },
//   getCheckboxProps: (record: any) => ({
//     disabled: !record.id, // Column configuration not to be checked
//     defaultChecked: record.status === true,
//     name: record.key
//   }),
//   hideDefaultSelections: true
// }

export default function MainBox () {
  const [count, setCount] = useState(0)
  const [tableLoading, setTableLoading] = useState(true)
  const [mealList, setMealList] = useState(new Array())
  const [tableList, setTableList] = useState(new Array())
  const [shiftList, setShiftList] = useState(new Array())
  const [shiftUserList, setShiftUserList] = useState(new Array())

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    getMealList()
    getShiftList()
    getShiftUserList()

    emitter.removeAllListeners('获取选中班次套餐列表')
    emitter.removeAllListeners('更新班次套餐列表')
    emitter.removeAllListeners('更新排班人员列表')

    emitter.addListener('获取选中班次套餐列表', (callback: any) => {
      if (callback) {
        callback(selectedRowsArray)
      }
    })

    emitter.addListener('更新班次套餐列表', () => {
      getMealList()
    })

    emitter.addListener('更新排班人员列表', () => {
      setTableLoading(true)
      getShiftUserList()
    })

    //
    console.log(count, setCount, setTableList, shiftList, setShiftList, shiftUserList, setShiftUserList)
  }, []) // <= 执行初始化操作，需要注意的是，如果你只是想在渲染的时候初始化一次数据，那么第二个参数必须传空数组。

  const getMealList = () => {
    let deptCode = scheduleStore.getDeptCode() // '2508' ||
    service.scheduleMealApiService.getMealListByCode(deptCode, 'true').then((res) => {
      console.log('查找排班班次套餐res', res, data)
      let oneUser = new Object()
      allUser = new Array()
      selectedRowsArray = new Array()
      // columns

      if (res && res.data.data) {
        tableData = res.data.data

        let rowKeys = new Array()
        tableData.map((oneObj: any, index: number) => {
          console.log('oneObj', index, oneObj, oneObj.status)
          if (oneObj.status === true) {
            console.log('tableDataindex', index)
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
          selectedRowsArray.push(oneUser)
        })

        genEmptyTable(allUser)
        setMealList(selectedRowsArray)
        // setMealList(allUser)
        // setTableList(allUser)
        tableData = JSON.parse(JSON.stringify(allUser))
        console.log('查找排班班次套餐', mealList, allUser, tableData, selectedRowsArray)
      }
    })
  }

  const getShiftList = () => {
    let deptCode = scheduleStore.getDeptCode() // '2508' ||
    service.scheduleShiftApiService.getShiftListByCode(deptCode).then((res) => {
      console.log('查找排班班次res', res)
      if (res && res.data.data) {
        setShiftList(res.data.data)
      }
    })
  }

  const getShiftUserList = () => {
    let deptCode = scheduleStore.getDeptCode() // '2508' ||
    allUser = new Array()
    service.scheduleUserApiService.getByDeptCode(deptCode).then((res) => {
      console.log('刷新排班人员', res)
      if (res && res.data.data) {
        allUser = res.data.data
        allUser = allUser.filter((u) => u.rangeShow === true)
        setShiftUserList(allUser)
        allUser.map((u, i) => {
          if (u.id) {
            u.showIndex = '' + (i + 1)
          }
        })
        console.log('刷新排班人员', allUser, allUser.length)
        genEmptyTable(allUser)
        setTableList(allUser)
        console.log('刷新排班人员', tableList, allUser)
        setTableLoading(false)
      }
    })
    // schShiftUser
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
  // rowSelection={rowSelection}
  return (
    <Wrapper>
      <div className='left-box'>
        <Table loading={tableLoading} bordered size='middle' columns={columns} dataSource={tableList} />
      </div>
      <div style={{ flex: 1 }} />
      <div className='card-container'>
        <Tabs onChange={(e) => message.info('切换选卡至 ' + e)} type='card'>
          <TabPane tab='可选班次' key='可选班次'>
            {shiftList.map((m, i) =>
              m.status === true ? (
                <Button
                  style={{ minWidth: '45%', width: '45%', margin: '4px 4px', color: m.nameColor }}
                  onClick={(e: any) => {
                    message.info(m.name)
                    console.log(e, m)
                  }}
                  key={m.name + i}
                >
                  {m.name + i}
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
                    message.info(m.name)
                    console.log(e, m)
                  }}
                  key={m.name + i}
                >
                  {m.name + i}
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
`
