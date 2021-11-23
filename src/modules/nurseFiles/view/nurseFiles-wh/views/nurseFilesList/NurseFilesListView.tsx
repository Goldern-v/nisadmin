import qs from 'qs'
import BaseTable from 'src/components/BaseTable'
import store, { appStore } from 'src/stores'
import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { numberToArray } from 'src/utils/array/array'
import { observer } from 'mobx-react-lite'
import { Spin } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { theme } from 'src/styles/theme'

import FilterCon from './components/FilterCon'

import PaginationCon from './components/PaginationCon'
import SelectCon from './components/SelectCon'

import { nurseFilesListViewModel } from './NurseFilesListViewModel'

export interface Props extends RouteComponentProps { }
/** 一行的列数 */
let rowNum: number = 5
const ThemeContext = React.createContext({
  theme: 'dark'
})
const value = {
  theme: 'red'
}
const columns: ColumnProps<any>[] = [
  // {
  //   title: '序号',
  //   dataIndex: '1',
  //   key: '1',
  //   render: (text: any, row: any, index: number) => index + 1,
  //   align: 'center',
  //   width: 50
  // },
  {
    title: '科室',
    dataIndex: 'deptName',
    key: 'deptName',
    width: 200,
    align: 'left'
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
    width: 50,
    align: 'center',
    render(sex: any) {
      return sex == '0' ? '男' : sex == '1' ? '女' : sex
    }
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    width: 50,
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
    width: 120,
    align: 'center'
  },
  {
    title: '最高学历',
    dataIndex: 'highestEducation',
    key: 'highestEducation',
    width: 80,
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
    title: '护士执业证书编号',
    dataIndex: 'zyzsNumber',
    key: 'zyzsNumber',
    width: 150,
    align: 'center'
  },
  {
    title: '执业证书截至日期',
    dataIndex: 'zyzsEffectiveUpDate',
    key: 'zyzsEffectiveUpDate',
    width: 120,
    align: 'center'
  },

  {
    title: '政治面貌',
    dataIndex: 'politicsLook',
    key: 'politicsLook',
    width: 120,
    align: 'center'
  },
  {
    title: '来院工作年限',
    dataIndex: 'goHospitalWorkYear',
    key: 'goHospitalWorkYear',
    width: 100,
    align: 'center',
    render(text: any, record: any) {
      return (text || 0) + '年'
    }
  },
  appStore.HOSPITAL_ID === 'gxjb' ?
    {
      title: '家庭住址',
      dataIndex: 'address',
      key: 'address',
      width: 180,
      align: 'center'
    } :
    {
      title: '鞋码',
      dataIndex: 'shoeSize',
      key: 'shoeSize',
      width: 80,
      align: 'center'
    },
  {
    title: '编制',
    dataIndex: 'workConversion',
    key: 'workConversion',
    width: 100,
    align: 'center'
  },
  {
    title: '身份证号',
    dataIndex: 'cardNumber',
    key: 'cardNumber',
    width: 160,
    align: 'center'
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    key: 'phone',
    width: 100,
    align: 'center'
  },
  {
    title: '取得执业证书并从事护理岗位时间',
    dataIndex: 'zyzsNursingPostDate',
    key: 'zyzsNursingPostDate',
    width: 100,
    align: 'center'
  },
  {
    title: '现职务任职起始时间',
    dataIndex: 'jobStartDate',
    key: 'jobStartDate',
    width: 100,
    align: 'center'
  },
  {
    title: '院内工作地点',
    dataIndex: 'workAddress',
    key: 'workAddress',
    width: 100,
    align: 'center'
  },
  {
    title: '操作',
    dataIndex: 'auditedStatusName',
    key: '6',
    width: 70,
    align: 'center',
    // fixed: 'right',
    render(text: any, row: any) {
      return (
        <DoCon>
          <span onClick={() => row.empName && onDoubleClick(row)}>查看</span>
        </DoCon>
      )
    }
  }
]

const onDoubleClick = (record: any) => {
  store.appStore.history.push(`/nurseFileDetail/baseInfo?empNo=${record.empNo}`)
}

export default observer(function NurseFilesListView() {
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
        surplusWidth={80}
        surplusHeight={430}
        type={['index', 'fixedIndex']}
        pagination={{
          total: nurseFilesListViewModel.totalCount,
          pageSizeOptions: ['20', '40', '60', '80', '100'],
          pageSize: nurseFilesListViewModel.pageSize,
          current: nurseFilesListViewModel.pageIndex
        }}
        onRow={(record: any) => {
          return {
            onDoubleClick: () => record.empNo && onDoubleClick(record)
          }
        }}
        onChange={(pagination) => {
          nurseFilesListViewModel.pageIndex = pagination.current || 1
          nurseFilesListViewModel.pageSize = pagination.pageSize || 1
          nurseFilesListViewModel.loadNursingList()
        }}
        loading={nurseFilesListViewModel.listSpinning}
      />
      {/* <PaginationCon rowNum={rowNum} /> */}
    </Wrapper>
  )
})
const Wrapper = styled.div`
  padding: 15px 15px 0;
  /* 全局背景色 */
  background-color: ${(p) => p.theme.$bgBody};

  /** fix table bug*/
  .ant-table-body-outer {
    margin-top: -9px !important;
    position: relative;
    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 8px;
      background: #fff;
      bottom: 0;
    }
  }
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
