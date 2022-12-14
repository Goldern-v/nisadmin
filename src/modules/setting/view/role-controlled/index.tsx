
import { Button, Select } from 'antd'
import { ColumnProps } from 'antd/es/table'
import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import { PageHeader, PageTitle, Place } from 'src/components/common'
import styled from 'styled-components'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { Obj } from 'src/libs/types'
import SettingApi from '../../api/SettingApi'
import RoleControlledDetail from '../role-controlled-detail'
import EditModal from './components/edit-modal'
export interface Props {
}
export default observer(function (props: Props) {
  const [params, setParams] = useState({
    role: '',
    worker: ''
  })
  const [tableData, setTableData] = useState<Obj[]>([])
  // 原数据
  const [data, setData] = useState<Obj[]>([])
  // 存放更新人员列表
  const [workers, setWorkers] = useState<any[]>([])
  // 选中的角色code
  const [roleCode, setRoleCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [editModalVis, setEditModalVis] = useState(false)
  const [curItem, setCurItem] = useState<Obj>({})

  const onSearch = () => {
    try {
      setLoading(true)
      SettingApi.getFLowRoleList().then(res => {
        setTableData(res.data)
        setData(res.data)
        setWorkers(getWorkers(res.data))
        setLoading(false)
      })
    } catch (e) {
      setLoading(false)
    }
  }
  /**过滤 */
  const getWorkers = (list: Obj[]) => {
    return Array.from(new Set(list.map(v => v.updateEmpName)))
  }
  /** 打开详情 */
  const openDetail = (row: Obj) => {
    setRoleCode(row.roleCode)
    setCurItem(row)
  }

  const openModal = (row: Obj) => {
    setCurItem(row)
    setEditModalVis(true)
  }
  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      width: 40,
      render: (text: string, record: Obj, index: number) => index + 1
    },
    {
      title: "角色名称",
      width: 90,
      dataIndex: 'roleName',
      align: "center"
    },
    {
      title: "角色Code",
      width: 70,
      dataIndex: 'roleCode',
      align: "center"
    },
    {
      title: "角色描述",
      width: 160,
      dataIndex: 'roleDescribe',
      align: "center"
    },
    {
      title: "更新人员",
      width: 80,
      dataIndex: 'updateEmpName',
      align: "center"
    },
    {
      title: "更新时间",
      width: 110,
      dataIndex: 'updateTime',
      align: "center"
    },
    {
      title: "操作",
      width: 100,
      dataIndex: '',
      align: "center",
      render(text: string, row: Obj) {
        return (
          <DoCon>
            <span onClick={() => openDetail(row)}>查看成员</span>
            <span onClick={() => openModal(row)}>编辑</span>
          </DoCon>)
      }
    },
  ]
  const onOk = () => {
    setEditModalVis(false)
    onSearch()
  }

  useEffect(() => {
    let arr: Obj[] = []
    const { role, worker } = params
    if (!role && !worker) {
      return onSearch()
    }
    if (role) {
      arr = data.filter(v => v.roleCode === role)
    }
    if (worker) {
      arr = data.filter(v => v.updateEmpName === worker)
    }
    setTableData(arr)
  }, [params])


  return (
    <Wrapper>
      {!roleCode && <PageHeader>
        <PageTitle>角色对照</PageTitle>
        <Place />
        角色：
        <Select allowClear showSearch value={params.role} onChange={(e: any) => setParams({ ...params, role: e })} filterOption={(input, option: any) =>
          option?.props?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }>
          {
            data.map(v => (<Select.Option value={v.roleCode} key={v.roleCode}>
              {v.roleName}
            </Select.Option>))
          }
        </Select>
        更新人员：
        <Select allowClear showSearch value={params.worker} onChange={(e: any) => setParams({ ...params, role: e })} filterOption={(input, option: any) =>
          option?.props?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }>
          {
            workers.map(v => (<Select.Option value={v} key={v}>
              {v}
            </Select.Option>))
          }
        </Select>
        <Button type="primary" onClick={onSearch}>查询</Button>
      </PageHeader>}
      {!roleCode && <BaseTable
        surplusWidth={1000}
        surplusHeight={200}
        loading={loading}
        dataSource={tableData}
        columns={columns}
      />}
      <EditModal
        visible={editModalVis}
        curItem={curItem}
        handleOk={onOk}
        handleCancel={() => setEditModalVis(false)} />
      {roleCode && <RoleControlledDetail id={roleCode} setRoleCode={setRoleCode} curItem={curItem} />}
    </Wrapper>
  )
})

const Wrapper = styled.div`
`