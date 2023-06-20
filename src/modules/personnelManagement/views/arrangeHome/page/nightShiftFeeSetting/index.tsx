import { Button, Modal, Switch, message } from 'antd'
import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import DeptSelect from 'src/components/DeptSelect'
import { PageHeader, PageTitle, Place } from 'src/components/common'
import styled from 'styled-components'
import CreateModel from './components/createModel'
import { starRatingReportService } from '../nightChargingReport/api/StarRatingReportService'
import { authStore } from 'src/stores'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { Obj } from 'src/libs/types'

export interface Props {
}
export default observer(function (props: Props) {
  const [modelVisible, setModelVisible] = useState(false)
  const [tableData, setTableData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState({
    pageIndex: 1,
    pageSize: 20,
    deptCode: '全院'
  })
  const [total, setTotal] = useState(0)
  const columns: any = [
    {
      dataIndex: 'index',
      title: '序号',
      align: 'center',
      render(val: any, row: any, index: number) {
        return index + 1
      }
    },
    {
      dataIndex: 'status',
      title: '状态',
      align: 'center',
      render(val: any, row: any, index: number) {
        return <Switch checked={val === '1'} onClick={(e) => onSwitch(e, row)} />
      }
    },
    {
      dataIndex: 'deptName',
      title: '适用科室',
      align: 'center',
      // render(val: any) {
      //   return authStore.deptList.find(v => v.code === val)?.name || ''
      // }
    },
    {
      dataIndex: 'timeType',
      title: '班次',
      align: 'center',
    },
    {
      dataIndex: 'standard',
      title: '费用（元/个）',
      align: 'center',
    },
    {
      dataIndex: 'remark',
      title: '备注',
      align: 'center',
    },
    {
      dataIndex: 'createName',
      title: '创建人',
      align: 'center',
    },
    {
      dataIndex: 'createTime',
      title: '创建时间',
      align: 'center',
    },
    {
      dataIndex: 'operate',
      title: '备注',
      align: 'center',
      render(val: any, row: any) {
        return <DoCon>
          <span className={row.isUse === '1' || row.status === '1' ? 'disabled' : ''} onClick={() => onDel(row)}>删除</span>
        </DoCon>
      }
    },
  ]
  const onDel = (row: any) => {
    Modal.confirm({
      title: '删除',
      content: '是否删除该条夜班费数据',
      onOk() {
        setLoading(true)
        starRatingReportService.deleteSettingWithSchNightSetting({ id: row.id })
          .then(res => {
            onSearch()
          }).catch(err => {
            message.error(err)
            setLoading(false)
          })
      }
    })
  }
  const onSwitch = (e: any, row: any) => {
    setLoading(true)
    starRatingReportService.updateSettingWithSchNightSetting({ ...row, status: e ? '1' : '0' })
      .then(res => {
        onSearch()
      }).catch(err => {
        console.log('test-err', err)
        message.error(err)
        setLoading(false)
      })
  }
  const onSearch = () => {
    setLoading(true)
    starRatingReportService.getListWithSchNightSetting({ ...query, deptCode: query.deptCode === '全院' ? '' : query.deptCode }).then(res => {
      setTableData(res.data?.list || [])
      setTotal(res.data?.totalCount)
    }).finally(() => setLoading(false))
  }
  const onCreate = () => {
    setModelVisible(true)
  }
  const onCreateOk = (params: Obj) => {
    setLoading(true)
    starRatingReportService.createSettingWithSchNightSetting(params)
      .then(res => {
        setModelVisible(false)
        onSearch()
      }).catch(err => {
        message.error(err)
        setLoading(false)
      })
  }
  useEffect(() => {
    onSearch()
  }, [query])
  return (
    <Wrapper>
      <PageHeader>
        <PageTitle>夜班费设置</PageTitle>
        <Place />
        <span>科室：</span>
        <DeptSelect deptCode={query.deptCode} hasAllDept={true} onChange={e => { setQuery({ ...query, deptCode: e }) }} />
        <Button type='primary' onClick={() => onSearch()}>查询</Button>
        <Button type='primary' onClick={() => onCreate()}>创建</Button>
      </PageHeader>
      <BaseTable columns={columns} dataSource={tableData} pagination={{
        current: query.pageIndex,
        total,
        pageSize: query.pageSize
      }}
        onChange={(pagination: any) => {
          setQuery({
            ...query,
            pageIndex: pagination.current,
            pageSize: pagination.pageSize
          })

        }} />
      <CreateModel visible={modelVisible} onCancel={() => setModelVisible(false)} onOk={onCreateOk} />
    </Wrapper>
  )
})

const Wrapper = styled.div`

`