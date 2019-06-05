import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import SelectCon from './components/SelectCon'
import FilterCon from './components/FilterCon'
import NurseCard from './components/NurseCard'
import { numberToArray } from 'src/utils/array/array'
import PaginationCon from './components/PaginationCon'
import { nurseFilesService } from '../../services/NurseFilesService'
import { observer } from 'mobx-react-lite'
import { nurseFilesListViewModel } from './NurseFilesListViewModel'
import { Spin } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import BaseTable from 'src/components/BaseTable'
import { theme } from 'src/styles/theme'
import store from 'src/stores'
import qs from 'qs'
export interface Props extends RouteComponentProps {}
/** 一行的列数 */
let rowNum: number = 5
const ThemeContext = React.createContext({
  theme: 'dark'
})
const value = {
  theme: 'red'
}
const columns: ColumnProps<any>[] = [
  {
    title: '序号',
    dataIndex: '1',
    key: '1',
    render: (text: any, row: any, index: number) => index + 1,
    align: 'center',
    width: 50
  },

  {
    title: '科室',
    dataIndex: 'deptName',
    key: 'deptName',
    width: 120,
    align: 'center'
  },
  {
    title: '员工号',
    dataIndex: 'empNo',
    key: 'empNo',
    width: 70,
    align: 'center'
  },
  {
    title: '姓名',
    dataIndex: 'empName',
    key: 'empName',
    width: 70,
    align: 'center'
  },

  {
    title: '性别',
    dataIndex: 'sex',
    key: 'sex',
    width: 70,
    align: 'center',
    render (sex: any) {
      return sex == '0' ? '男' : sex == '1' ? '女' : ''
    }
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    width: 60,
    align: 'center'
  },
  {
    title: '职称',
    dataIndex: 'newTitle',
    key: 'newTitle',
    width: 90,
    align: 'center'
  },
  {
    title: '层级',
    dataIndex: 'nurseHierarchy',
    key: 'nurseHierarchy',
    width: 70,
    align: 'center'
  },
  {
    title: '职务',
    dataIndex: 'job',
    key: 'job',
    width: 90,
    align: 'center'
  },
  {
    title: '最高学历',
    dataIndex: 'highestEducation',
    key: 'highestEducation',
    width: 90,
    align: 'center'
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    width: 70,
    align: 'center'
  },
  {
    title: '籍贯',
    dataIndex: 'nativePlace',
    key: 'nativePlace',
    width: 100,
    align: 'center'
  },
  {
    title: '民族',
    dataIndex: 'nation',
    key: 'nation',
    width: 70,
    align: 'center'
  },
  {
    title: '职业证书编号',
    dataIndex: 'zyzsNumber',
    key: 'zyzsNumber',
    width: 120,
    align: 'center'
  },
  {
    title: '操作',
    dataIndex: 'auditedStatusName',
    key: '6',
    width: 70,
    align: 'center',
    // fixed: 'right',
    render (text: any, row: any) {
      return (
        <DoCon>
          <span onClick={() => onDoubleClick(row)}>查看</span>
        </DoCon>
      )
    }
  }
]

const onDoubleClick = (record: any) => {
  store.appStore.history.push(`/nurseFileDetail/baseInfo?${qs.stringify(record)}`)
}

export default observer(function NurseFilesListView () {
  return (
    <Wrapper>
      <SelectCon />
      <FilterCon />
      {/* <Spin spinning={nurseFilesListViewModel.listSpinning}>
        <NurseCardCon>
          {nurseFilesListViewModel.nurseList.map((item: any, index: number) => (
            <NurseCard rowNum={rowNum} key={index} data={item} />
          ))}
        </NurseCardCon>
      </Spin> */}
      <div style={{ height: 10 }} />
      <BaseTable
        wrapperStyle={{
          boxShadow: theme.$shadow
        }}
        dataSource={nurseFilesListViewModel.nurseList}
        columns={columns}
        surplusHeight={430}
        surplusWidth={80}
        type={['spaceRow']}
        onRow={(record: any) => {
          return {
            onDoubleClick: () => onDoubleClick(record)
          }
        }}
        loading={nurseFilesListViewModel.listSpinning}
      />
      <PaginationCon rowNum={rowNum} />
    </Wrapper>
  )
})
const Wrapper = styled.div`
  padding: ${(p) => p.theme.$mcp};
  /* 全局背景色 */
  background-color: ${(p) => p.theme.$bgBody};
`
const NurseCardCon = styled.div`
  margin: 10px -10px;
  min-height: 440px;
  /* box-shadow: 0px -2px 4px #000000; */
`

export const DoCon = styled.div`
  display: flex;
  justify-content: space-around;
  font-size: 12px;
  color: ${(p) => p.theme.$mtc};
  span {
    cursor: pointer;
  }
`
