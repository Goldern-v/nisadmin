
import { Button, Input } from 'antd'
import { ColumnProps } from 'antd/es/table'
import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import { PageHeader, PageTitle, Place } from 'src/components/common'
import styled from 'styled-components'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { Obj } from 'src/libs/types'
import SettingApi from '../../api/SettingApi'
import { appStore } from 'src/stores'

export interface Props extends Obj {
  id: string
  setRoleCode: Function
  curItem: Obj
}
export default observer(function (props: Props) {
  const { id, setRoleCode, curItem } = props 
  const [kw, setKw] = useState('')
  // 原数据
  const [data, setData] = useState<Obj[]>([])
  const [tableData, setTableData] = useState<Obj[]>([])
  const [loading, setLoading] = useState(false)
  const onSearch = () => {
    try {
      setLoading(true)
      SettingApi.getListByRoleCodeForManage(id).then(res => {
        setTableData(res.data)
        setData(res.data)
        setLoading(false)
      })
    } catch (e) {
      setLoading(false)
    }
  }
  const openDetail = (record: Obj) => {
    try {
      appStore.history.push(`/nurseFileDetail/baseInfo?empNo=${record.empNo}`)
    } catch (error) {
      
    }
  }

  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      width: 40,
      render:(text: string, record: Obj, index: number) => index + 1
    },
    {
      title: "科室",
      width: 90,
      dataIndex: 'deptName',
      align: "center"
    },
    {
      title: "姓名",
      width: 70,
      dataIndex: 'empName',
      align: "center"
    },
    {
      title: "员工号",
      width: 70,
      dataIndex: 'empNo',
      align: "center"
    },
    {
      title: "性别",
      width: 70,
      dataIndex: 'sex',
      align: "center",
      render: (text: string) => ['男', '女'][text] || text
    },
    {
      title: "年龄",
      width: 70,
      dataIndex: 'age',
      align: "center"
    },
    {
      title: "手机号",
      width: 80,
      dataIndex: 'phone',
      align: "center"
    },
    {
      title: "职务",
      width: 80,
      dataIndex: 'title',
      align: "center"
    },
    {
      title: "籍贯",
      width: 110,
      dataIndex: 'nativePlace',
      align: "center"
    },
    {
      title: "在院情况",
      width: 110,
      dataIndex: 'status',
      align: "center"
    },
    {
      title: "操作",
      width: 70,
      dataIndex: '',
      align: "center",
      render(text: string, row: Obj) {
        return <DoCon>
          <span onClick={() => openDetail(row)}>查看护理档案</span>
        </DoCon>
      }
    },
  ]

  useEffect(() => {
    let arr: Obj[] = []
    if (!kw) return onSearch()
    if (kw){
      arr = data.filter(v => v.empName.indexOf(kw) > -1)
    }
    setTableData(arr)
  }, [kw])

  return (
    <Wrapper>
      <div className='tip'>角色对照 / 详情</div>
      <PageHeader>
      <PageTitle>{ curItem.roleName }</PageTitle>
        <Place />
        角色：
        <Input
         value={kw}
         onChange={(e) => setKw(e.target.value)} />
        <Button type="primary" onClick={onSearch}>查询</Button>
        <Button type="primary" onClick={() => setRoleCode('')}>返回</Button>
      </PageHeader>
      <BaseTable
        surplusWidth={1000}
        surplusHeight={200}
        loading={loading}
        dataSource={tableData}
        columns={columns}
      />
    </Wrapper>
  )
})

const Wrapper = styled.div`
.tip {
  padding: 2px 0 0 15px;
}
.ant-input {
  width: 150px;
}
`