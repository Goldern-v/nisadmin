import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, message } from 'antd'
import { PageHeader, PageTitle, Place } from 'src/components/common'
import {
  // DatePicker, 
  // Select, 
  ColumnProps,
  PaginationConfig
} from 'src/vendors/antd'
// import DeptSelect from 'src/components/DeptSelect'
import { appStore, authStore } from 'src/stores'
import BaseTable from 'src/components/BaseTable'
import { nurseFilesService } from '../../services/NurseFilesService'
// import { useCallback } from 'src/types/react'
import { DoCon } from 'src/modules/nurseFiles/view/nurseFiles-wh/views/nurseFilesList/NurseFilesListView'
import { observer } from 'src/vendors/mobx-react-lite'
// import { DictItem } from 'src/services/api/CommonApiService'
// import { getCurrentMonth, getCurrentMonthNow } from 'src/utils/date/currentMonth'
import { globalModal } from 'src/global/globalModal'
import createModal from 'src/libs/createModal'
import NurseGroupEditModal from './components/NurseGroupEditModal'
// import moment from 'moment'

export interface Props { }
export default observer(function NurseGroupManage() {
  const [dataSource, setDataSource] = useState([])
  const [pageLoading, setPageLoading] = useState(false)
  const [deptSelected, setDeptSelected] = useState('')

  const nurseGroupEditModal = createModal(NurseGroupEditModal)

  const columns: ColumnProps<any>[] = [
    {
      title: '小组名称',
      align: 'left',
      dataIndex: 'groupName',
      width: 180
    },
    {
      title: '操作',
      dataIndex: 'operate',
      width: 60,
      render: (text: any, record: any) => {
        return <DoCon>
          <span onClick={() => handleEdit(record)}>编辑</span>
          <span onClick={() => handleDetail(record)}>查看</span>
          <span onClick={() => handleDelete(record)}>删除</span>
        </DoCon>
      }
    }
  ]

  const [pageOptions, setPageOptions]: any = useState({
    pageIndex: 1,
    pageSize: 20
  })

  const [total, setTotal]: any = useState(0)
  const getData = () => {
    setPageLoading(true)
    nurseFilesService
      .nurseGroupList({
        ...pageOptions
      })
      .then((res) => {
        // console.log(res)
        setTotal(res.data.totalCount)
        setDataSource(res.data.list)
        setPageLoading(false)
      })
  }

  const handleDetail = (record: any) => {
    nurseGroupEditModal.show({
      viewType: 'view',
      data: record,
      onOkCallback: () => { }
    })
  }

  const handleAdd = () => {
    nurseGroupEditModal.show({
      viewType: 'edit',
      data: {},
      onOkCallback: () => {
        getData()
      }
    })
  }

  const handleEdit = (record: any) => {
    nurseGroupEditModal.show({
      viewType: 'edit',
      data: { ...record },
      onOkCallback: () => {
        getData()
      }
    })
  }

  const handleDelete = (record: any) => {
    globalModal.confirm('提示', '是否删除该小组?')
      .then(() => {
        setPageLoading(true)
        nurseFilesService
          .deleteNurseFileGroup(record.id)
          .then(res => {
            message.success('删除成功', undefined, () => {
              setPageLoading(false)
              getData()
            })
          }, err => setPageLoading(false))
      })
  }

  useEffect(() => {
    getData()
  }, [
    pageOptions.pageIndex,
    pageOptions.pageSize,
    deptSelected,
  ])

  // useEffect(() => {
  //   getData()
  // }, [])
  return (
    <Wrapper>
      <PageHeader>
        <PageTitle maxWidth={1200}>院级小组管理</PageTitle>
        <Place />
        {/* <span className='label'>科室:</span>
        <Select
          value={deptSelected}
          style={{ width: 200 }}
          showSearch
          filterOption={(input: any, option: any) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          onChange={(val: string) => {
            setDeptSelected(val)
            if (val) authStore.selectDeptCode(val)
          }}>
          <Select.Option value="">全部</Select.Option>
          {authStore.deptList.map((item: any, idx: any) =>
            <Select.Option
              key={idx}
              value={item.code}>
              {item.name}
            </Select.Option>)}
        </Select> */}
        <Button type='primary' onClick={() => getData()}>
          查询
        </Button>
        <Button onClick={handleAdd}>添加</Button>
      </PageHeader>
      <BaseTable
        loading={pageLoading}
        dataSource={dataSource}
        columns={columns}
        wrapperStyle={{ margin: '0 15px' }}
        type={['index']}
        // expandedRowRender={() => '12321'}
        surplusHeight={220}
        surplusWidth={200}
        pagination={{
          current: pageOptions.pageIndex,
          pageSize: pageOptions.pageSize,
          total: total
        }}
        onChange={(pagination: PaginationConfig) => {
          setPageOptions({
            pageIndex: pagination.current,
            pageSize: pagination.pageSize
          })
        }}
        onRow={(record: any) => {
          return { onDoubleClick: () => handleDetail(record) }
        }}
      />
      <nurseGroupEditModal.Component />
    </Wrapper>
  )
})
const Wrapper = styled.div``
