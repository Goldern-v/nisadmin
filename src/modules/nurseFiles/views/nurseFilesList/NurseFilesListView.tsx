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
export interface Props extends RouteComponentProps {}
/** 一行的列数 */
let rowNum: number = 7
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
    title: '获得时间',
    dataIndex: 'time',
    key: '2',
    width: 100,
    align: 'center'
  },
  {
    title: '资格名称',
    dataIndex: 'specialQualificationName',
    key: '3',
    width: 150,
    align: 'center'
  },
  {
    title: '资格证编号',
    dataIndex: 'specialQualificationNo',
    key: '4',
    width: 200,
    align: 'center'
  },

  {
    title: '状态',
    dataIndex: 'auditedStatusName',
    key: '6',
    width: 150,
    align: 'center'
  }
]

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
      <div style={{ height: 20 }} />
      <BaseTable
        wrapperStyle={{
          boxShadow: theme.$shadow
        }}
        dataSource={nurseFilesListViewModel.nurseList}
        columns={columns}
        surplusHeight={365}
        type={['spaceRow', 'fixedWidth']}
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
