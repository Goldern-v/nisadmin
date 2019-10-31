import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
// import { Link } from 'react-router-dom'

import { Table, message, Popconfirm, Divider, Tag, Switch } from 'antd'
// import { authStore, scheduleStore } from 'src/stores'
import service from 'src/services/api'
import { scheduleStore, authStore, appStore } from 'src/stores'

import emitter from 'src/libs/ev'
import BaseTable, { DoCon } from 'src/components/BaseTable'

import { globalModal } from 'src/global/globalModal'
import createModal from 'src/libs/createModal'
import AddShiftModal from '../../modal/AddShiftModal'
import AddShiftModal_wh from '../../modal/AddShiftModal_wh'

// import emitter from 'src/libs/ev'

// const Option = Select.Option
export interface Props extends RouteComponentProps {}

// let colorMap: any = {
//   red: '红色',
//   green: '绿色',
//   blue: '蓝色',
//   yellow: '黄色',
//   black: '黑色',
//   gray: '灰色'
// }

// let colorMapCN: any = {
//   红色: 'red',
//   绿色: 'green',
//   蓝色: 'blue',
//   黄色: 'yellow',
//   黑色: 'black',
//   灰色: 'gray'
// }

export default function MainBox() {
  const [tableLoading, setTableLoading] = useState(false)
  const [shiftList, setShiftList] = useState(new Array())

  /** 颜色 */
  const [colorMap, setColorMap]: [any, any] = useState({})
  const [colorMapCN, setColorMapCN]: [any, any] = useState({})

  const addShiftModal = createModal(
    appStore.hisAdapter({
      hj: () => AddShiftModal,
      wh: () => AddShiftModal_wh
    })
  )
  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      width: 60,
      render: (text: string, record: any, index: any) => index + 1
    },
    {
      title: '列入排班',
      dataIndex: 'status',
      key: '是否排班',
      width: 100,
      render: (text: any, record: any, index: any) =>
        record.id ? (
          <span>
            <Switch
              size='small'
              onChange={(check: any) => {
                record.status = check
                // console.log(record, userList, 'chekc')
                setShiftList([...shiftList])
              }}
              checked={text}
            />
          </span>
        ) : (
          ''
        )
    },
    {
      title: '班次名称',
      dataIndex: 'name',
      key: 'name',
      width: 150
      // render: (text: string, record: any) =>
      //   text.length > 0 ? (
      //     <span>
      //       <Tag color={record.nameColor} key={text}>
      //         {text.toUpperCase()}
      //       </Tag>
      //     </span>
      //   ) : (
      //     ''
      //   )
    },
    {
      title: '类别',
      dataIndex: 'shiftType',
      key: 'shiftType',
      width: 100
    },
    {
      title: '颜色标记',
      dataIndex: 'nameColor',
      key: 'nameColor',
      width: 100,
      render: (text: string, record: any) =>
        text && text.length > 0 ? (
          <span>
            <Tag color={record.nameColor} key={text}>
              {colorMapCN[text]}
            </Tag>
          </span>
        ) : (
          ''
        )
    },
    // {
    //   title: '开始时间',
    //   dataIndex: 'startTime',
    //   width: '30%',
    //   key: 'startTime'
    // },
    // {
    //   title: '结束时间',
    //   dataIndex: 'endTime',
    //   key: 'endTime',
    //   width: '8%'
    // },
    {
      title: '上班时间',
      dataIndex: 'workTime',
      key: 'workTime',
      width: 250
    },
    {
      title: '工时(小时）',
      dataIndex: 'effectiveTime',
      key: 'effectiveTime',
      width: 100
    }
  ]

  let promise =
    appStore.HOSPITAL_ID == 'wh'
      ? authStore.isRoleManage
      : (authStore.user && authStore.user.post) == '护理部' || (authStore.user && authStore.user.empName) == '管理员'

  if (promise) {
    columns.push({
      title: '操作',
      dataIndex: 'title',
      width: 100,
      key: 'title',
      render: (text: string, record: any) => (
        <DoCon>
          <span
            onClick={(e: any) => {
              addShiftModal.show({
                editData: record,
                onOkCallBack: () => {
                  getShiftList()
                }
              })
              // emitter.emit('弹窗编辑排班', record)
            }}
          >
            编辑
          </span>
          <span
            onClick={() => {
              globalModal.confirm('确认删除', '确认删除该套餐？').then((res) => {
                service.scheduleShiftApiService.delete(record.id).then((res) => {
                  emitter.emit('更新班次列表')
                })
                message.success(`删除${record.name}成功`)
              })
            }}
          >
            删除
          </span>
        </DoCon>
      )
    })
  }
  let data = {
    key: '',
    id: '',
    createTime: '',
    deptCode: '',
    effectiveTime: '',
    // endTime: '',
    name: '',
    nameColor: '',
    shiftType: '',
    workTime: '',
    // startTime: '',
    status: ''
  }

  let allUser = new Array()

  let tableData = new Array()
  let selectedRowsArray = new Array()

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    getShiftList()

    service.commonApiService.dictInfo('sch_range_color').then((res) => {
      let colorMap: any = {}
      let colorMapCN: any = {}
      res.data.map((item: any) => {
        colorMap[item.name] = item.code
        colorMapCN[item.code] = item.name
      })
      setColorMap(colorMap)
      setColorMapCN(colorMapCN)
    })
    //
  }, []) // <= 执行初始化操作，需要注意的是，如果你只是想在渲染的时候初始化一次数据，那么第二个参数必须传空数组。

  emitter.removeAllListeners('获取选中班次列表')
  emitter.removeAllListeners('更新班次列表')

  emitter.addListener('获取选中班次列表', (callback: any) => {
    if (callback) {
      callback(shiftList)
    }
  })

  emitter.addListener('更新班次列表', () => {
    getShiftList()
  })
  const getShiftList = () => {
    let deptCode = scheduleStore.getDeptCode() // '2508' ||
    setTableLoading(true)
    service.scheduleShiftApiService.getShiftListByCode(deptCode).then((res) => {
      setTableLoading(false)

      let oneUser = new Object()
      allUser = new Array()
      selectedRowsArray = new Array()
      // columns

      if (res && res.data) {
        tableData = res.data

        let rowKeys = new Array()
        tableData.map((oneObj: any, index: number) => {
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
          selectedRowsArray.push(oneUser)
        })

        // genEmptyTable(allUser)
        setShiftList(allUser)
      }
    })
  }

  return (
    <Wrapper>
      <BaseTable
        bordered
        size='small'
        columns={columns}
        dataSource={shiftList}
        pagination={false}
        surplusHeight={190}
        type={['spaceRow']}
        loading={tableLoading}
      />
      {/* <Table bordered size='small' columns={columns} rowSelection={rowSelection} dataSource={ShiftList} /> */}
      <addShiftModal.Component />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  /* background: #eee; */
  /* height: 100%; */
  /* padding: 0 20px 20px 20px; */
  width: 100%;
  table,
  tr,
  td,
  th,
  th div {
    text-align: center !important;
    padding: 3px !important;
  }

  /* 表格前端打勾样式 */
  .ant-table-thead > tr > th.ant-table-selection-column,
  .ant-table-tbody > tr > td.ant-table-selection-column,
  .ant-table-thead > tr:first-child > th:first-child {
    width: 60px !important;
    max-width: 60px !important;
  }
`
