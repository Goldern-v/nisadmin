import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { PageHeader, PageTitle, Place } from 'src/components/common'
import { DatePicker, Select, ColumnProps, PaginationConfig, Input, message } from 'src/vendors/antd'
import DeptSelect from 'src/components/DeptSelect'
import { appStore, authStore } from 'src/stores'
import BaseTable from 'src/components/BaseTable'

import { useCallback } from 'src/types/react'
import { DoCon } from 'src/components/BaseTable'
import { observer } from 'mobx-react-lite'
import { DictItem } from 'src/services/api/CommonApiService'
import { arrangeService } from '../../services/ArrangeService'
export interface Props {}
export default observer(function FollowUpRecord() {
  const [dataSource, setDataSource] = useState([])
  const [pageLoading, setPageLoading] = useState(false)
  const updateDataSource = () => {
    setDataSource([...dataSource])
  }
  const columns: ColumnProps<any>[] = [
    {
      title: '科室',
      dataIndex: 'deptName',
      width: 130
    },
    {
      title: '姓名',
      dataIndex: 'empName',
      align: 'center',
      width: 100
    },
    {
      title: '累计结余(小时)',
      dataIndex: 'balanceHour',
      align: 'center',
      className: 'input-cell',
      width: 100,
      render(text: any, record: any, index: any) {
        return (
          <Input
            value={text}
            onChange={(e) => {
              // if (
              //   !Number(e.target.value) &&
              //   Number(e.target.value) !== 0 &&
              //   e.target.value[e.target.value.length - 1] !== '.'
              // ) {
              //   return message.warning('只能输入数字')
              // }
              record.balanceHour = e.target.value
              updateDataSource()
            }}
          />
        )
      }
    },
    {
      title: '公休结余(天数)',
      dataIndex: 'publicHour',
      align: 'center',
      width: 100,
      className: 'input-cell',
      render(text: any, record: any, index: any) {
        return (
          <Input
            value={text}
            onChange={(e) => {
              // if (
              //   !Number(e.target.value) &&
              //   Number(e.target.value) !== 0 &&
              //   e.target.value[e.target.value.length - 1] !== '.'
              // ) {
              //   return message.warning('只能输入数字')
              // }
              record.publicHour = e.target.value
              updateDataSource()
            }}
          />
        )
      }
    },
    {
      title: '节休结余(天数)',
      dataIndex: 'holidayHour',
      align: 'center',
      width: 100,
      className: 'input-cell',
      render(text: any, record: any, index: any) {
        return (
          <Input
            value={text}
            onChange={(e) => {
              // if (
              //   !Number(e.target.value) &&
              //   Number(e.target.value) !== 0 &&
              //   e.target.value[e.target.value.length - 1] !== '.'
              // ) {
              //   return message.warning('只能输入数字')
              // }
              record.holidayHour = e.target.value
              updateDataSource()
            }}
          />
        )
      }
    }
  ]

  const [pageOptions, setPageOptions]: any = useState({
    pageIndex: 1,
    pageSize: 20,
    total: 0
  })
  const getData = () => {
    setPageLoading(true)
    arrangeService.schHourInstanceGetByDeptCode(authStore.selectedDeptCode).then((res) => {
      setDataSource(res.data)
      setPageLoading(false)
    })
    // qcOneService.qcSafetyCheckGetPage({ ...pageOptions, wardCode: authStore.selectedDeptCode }).then((res) => {
    //   setDataSource(res.data.list)
    //   setPageLoading(false)
    // })
  }

  const onDetail = (record: any) => {}
  useEffect(() => {
    getData()
  }, [pageOptions.pageIndex, pageOptions.pageSize, authStore.selectedDeptCode])

  return (
    <Wrapper>
      <PageHeader>
        <PageTitle>结余数据初始化</PageTitle>
        <Place />

        <span className='label'>科室:</span>
        <DeptSelect onChange={() => {}} />
        <Button onClick={() => getData()}>查询</Button>
        <Button
          type='primary'
          onClick={() => {
            setPageLoading(true)
            arrangeService
              .schHourInstanceSaveOrUpdate(
                dataSource.map((item: any) => {
                  if (!Number(item.holidayHour)) item.holidayHour = 0
                  if (!Number(item.publicHour)) item.publicHour = 0
                  if (!Number(item.balanceHour)) item.balanceHour = 0
                  return item
                })
              )
              .then((res) => {
                message.success('保存成功')
                getData()
              })
          }}
        >
          保存
        </Button>
      </PageHeader>
      <BaseTable
        loading={pageLoading}
        dataSource={dataSource}
        columns={columns}
        wrapperStyle={{ margin: '0 15px' }}
        type={['index']}
        surplusHeight={180}
      />
    </Wrapper>
  )
})
const Wrapper = styled.div`
  .input-cell {
    padding: 0 !important;
    input {
      border: 0;
      border-radius: 0;
      box-shadow: none;
      outline: none;
      text-align: center;
      &:focus {
        background: ${(p) => p.theme.$mlc};
      }
    }
  }
`
