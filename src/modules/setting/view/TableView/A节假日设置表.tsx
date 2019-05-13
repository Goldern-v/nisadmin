import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseTable from 'src/components/BaseTable'
import windowHeight from 'src/hooks/windowHeight'
import { observer } from 'mobx-react-lite'
import SettingViewModel from 'src/modules/setting/SettingViewModel'
import SettingApi from 'src/modules/setting/api/SettingApi.ts'
export interface Props extends RouteComponentProps {}

export default observer(function A节假日设置表 () {
  // //模拟数据
  // let dataSource = [
  //   {
  //     节目名称: '元旦1',
  //     日期: '2019年1月1日'
  //   },
  //   {
  //     节目名称: '元旦2',
  //     日期: '2019年1月1日'
  //   },
  //   {
  //     节目名称: '元旦3',
  //     日期: '2019年1月1日'
  //   },
  //   {
  //     节目名称: '元旦4',
  //     日期: '2019年1月1日'
  //   }
  // ]

  //
  const columns: any = [
    {
      title: '序号',
      dataIndex: '序号',
      key: '序号',
      render: (text: any, record: any, index: number) => index + 1,
      align: 'center',
      width: 50
    },
    {
      title: '节目名称',
      dataIndex: 'name',
      key: 'name',
      align: 'center'
    },
    {
      title: '日期',
      dataIndex: 'holidaysDate',
      key: 'holidaysDate',
      width: 300,
      align: 'center'
    },
    {
      title: '操作',
      dataIndex: 'cz',
      key: '8',
      width: 100,
      align: 'center',
      render: (text: any, record: any, index: any) => {
        const DoCon = styled.div`
          display: flex;
          justify-content: space-around;
          cursor: pointer;
          font-size: 12px;
          color: ${(p) => p.theme.$mtc};
        `
        return (
          <DoCon>
            <span
              data-index={index}
              onClick={(e) => {
                deleteClick(e, record, text)
              }}
              data-record={record}
            >
              删除
            </span>
          </DoCon>
        )
      }
    }
  ]
  // const [tableData, setTableData] = useState(dataSource)
  useEffect(() => {
    SettingApi.getHolidayTable(SettingViewModel.getSelectYear).then((res) => {
      SettingViewModel.setTableDate(res.data)
    })
    // SettingViewModel.setTableDate(tableDataSource)
  }, [])
  const deleteClick = (e: any, record: any, text: any) => {
    let deleteIndex = e.target.getAttribute('data-index')
    console.log(e.target.getAttribute('data-text'))
    let deleteData = { name: record.name, holidaysDate: record.holidaysDate }
    // 后台删除数据
    console.log(deleteData)
    SettingApi.getHolidayDelete(deleteData)
    let cacheTableDate = [...SettingViewModel.tableDate]
    cacheTableDate.splice(deleteIndex, 1)
    SettingViewModel.setTableDate(cacheTableDate)
  }
  // let getAddTableData = tableData.concat(SettingViewModel.tableHolidayAdd)
  // console.log(getAddTableData)
  //
  return (
    <Wrapper>
      <BaseTable dataSource={SettingViewModel.tableDate} columns={columns} />
    </Wrapper>
  )
})
const Wrapper = styled.div``
