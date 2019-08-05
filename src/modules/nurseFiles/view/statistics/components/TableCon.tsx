import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import BaseTable, { TabledCon, DoCon } from 'src/components/BaseTable'
import { ColumnProps, PaginationConfig } from 'src/vendors/antd'
import { PageObj } from '../config/getPageObj'
import service from 'src/services/api'
import qs from 'qs'
import { appStore } from 'src/stores'

export interface Props {
  pageObj: PageObj
  tableObj: any
  paginationRef: any
  onload: any
  tableLoading: boolean
}
export default function TableCon(props: Props) {
  let { pageObj, tableObj, paginationRef, onload, tableLoading } = props
  const toDetails = (record: any) => {
    service.commonApiService.getNurseInformation(record.empNo).then((res) => {
      // appStore.history.push(`/nurseAudit?${qs.stringify(res.data)}`)
      window.open(
        `/crNursing/manage/#/nurseFileDetail/${pageObj.detailPath || appStore.match.params.path}?${qs.stringify(
          res.data
        )}`
      )
    })
  }
  const columns: ColumnProps<any>[] = [
    {
      title: '科室',
      dataIndex: 'deptName',
      width: 150,
      align: 'left'
    },
    {
      title: '员工号',
      dataIndex: 'empNo',
      width: 100,
      align: 'center'
    },
    {
      title: '姓名',
      dataIndex: 'empName',
      width: 100,
      align: 'center'
    },
    {
      title: '性别',
      dataIndex: 'sex',
      width: 80,
      align: 'center',
      render(text: any, record: any) {
        return text == 0 ? '男' : text == 1 ? '女' : text
      }
    },
    {
      title: '年龄',
      dataIndex: 'age',
      width: 80,
      align: 'center'
    },
    {
      title: '职称',
      dataIndex: 'newTitle',
      width: 100,
      align: 'center'
    },
    {
      title: '层级',
      dataIndex: 'nurseHierarchy',
      width: 100,
      align: 'center'
    },
    {
      title: '职务',
      dataIndex: 'job',
      width: 100,
      align: 'center'
    },
    ...pageObj.tableList,
    {
      title: '操作',
      dataIndex: '操作',
      width: 80,
      render(text: string, record: any) {
        return (
          <DoCon>
            <span onClick={() => toDetails(record)}>操作</span>
          </DoCon>
        )
      }
    }
  ]
  const onChange = (pagination: PaginationConfig) => {
    paginationRef.current = {
      pageIndex: pagination.current,
      pageSize: pagination.pageSize,
      total: pagination.total
    }
    onload()
  }

  let surplusHeight = 365
  let filterConEle = document.getElementById('filterCon')
  if (filterConEle) {
    surplusHeight = filterConEle.offsetHeight + 240
    console.log(surplusHeight, 'surplusHeight')
  }

  return (
    <Wrapper>
      <BaseTable
        loading={tableLoading}
        dataSource={tableObj.list}
        columns={columns}
        type={['index']}
        surplusHeight={surplusHeight}
        surplusWidth={335}
        wrapperStyle={{
          margin: 0
        }}
        pagination={{
          current: tableObj.pageIndex,
          total: tableObj.totalPage,
          pageSize: tableObj.pageSize
        }}
        onChange={onChange}
        onRow={(record) => {
          return {
            onDoubleClick: (e: any) => {
              toDetails(record)
            }
          }
        }}
      />
    </Wrapper>
  )
}
const Wrapper = styled(TabledCon)`
  margin: 10px 0 0 0;
`
