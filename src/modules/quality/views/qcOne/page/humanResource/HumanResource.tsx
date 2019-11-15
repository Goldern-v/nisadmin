import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { PageHeader, PageTitle, Place } from 'src/components/common'
import { DatePicker, Select, ColumnProps, PaginationConfig } from 'src/vendors/antd'
import DeptSelect from 'src/components/DeptSelect'
import { appStore, authStore } from 'src/stores'
import BaseTable from 'src/components/BaseTable'
import { qcOneService } from '../../services/QcOneService'
import { useCallback } from 'src/types/react'
import { DoCon } from 'src/modules/nurseFiles/view/nurseFiles-wh/views/nurseFilesList/NurseFilesListView'
import { qcOneSelectViewModal } from '../../QcOneSelectViewModal'
import { observer } from 'src/vendors/mobx-react-lite'
import { DictItem } from 'src/services/api/CommonApiService'
export interface Props { }
export default observer(function HumanResource() {
  const [dataSource, setDataSource] = useState([])
  const [pageLoading, setPageLoading] = useState(false)
  const [selectedDp, setSelectedDp] = useState('')
  const [transferStatus, setTransferStatus] = useState('')
  const dpList = [
    {
      code: '',
      name: '全部'
    },
    {
      code: '1',
      name: '转出'
    },
    {
      code: '2',
      name: '转入'
    }
  ]

  const tsList = [
    {
      code: '',
      name: '全部'
    },
    {
      code: '1',
      name: '档案转科'
    },
    {
      code: '2',
      name: '片区转科'
    },
    {
      code: '3',
      name: '排班人员临时调科'
    }
  ]

  const columns: ColumnProps<any>[] = [
    {
      title: '姓名',
      align: 'center',
      dataIndex: 'empName',
      width: 100
    },
    {
      title: '原科室',
      dataIndex: 'deptCodeNameOld',
      width: 160
    },
    {
      title: '调配方式',
      dataIndex: 'transferStatus',
      align: 'center',
      width: 130,
      render(text: any, record: any, index: number) {
        switch (text) {
          case '1': return '档案转科'
          case '2': return '片区转科'
          case '3': return '排班人员临时调科'
          default: return ''
        }
      }
    },
    // {
    //   title: '转入转出',
    //   dataIndex: 'type',
    //   width: 60,
    //   render(text: any, record: any, index: number) {
    //     return text == '1' ? '转出' : text == '2' ? '转入' : ''
    //   }
    // },
    {
      title: '调往科室',
      dataIndex: 'deptNameNew',
      width: 180
    },
    {
      title: '开始时间',
      align: 'center',
      dataIndex: 'startDate',
      width: 150
    },
    {
      title: '事由',
      align: 'left',
      dataIndex: 'remark',
      // width: 180
    }
    // {
    //   title: '创建人',
    //   dataIndex: 'creatorName'
    // },
    // {
    //   title: '创建时间',
    //   dataIndex: 'creatorTime'
    // }
  ]

  const [pageOptions, setPageOptions]: any = useState({
    pageIndex: 1,
    pageSize: 20
  })
  const [total, setTotal]: any = useState(0)
  const getData = () => {
    setPageLoading(true)
    qcOneService
      .qcNurseTransferGetPage({
        ...pageOptions,
        wardCode: authStore.selectedDeptCode,
        startDate: qcOneSelectViewModal.startDate,
        endDate: qcOneSelectViewModal.endDate,
        type: selectedDp,
        transferStatus: transferStatus,
      })
      .then((res) => {
        setTotal(res.data.totalCount)
        setDataSource(res.data.list)
        setPageLoading(false)
      })
  }

  const onDetail = (record: any) => { }
  useEffect(() => {
    getData()
  }, [
    pageOptions.pageIndex,
    pageOptions.pageSize,
    authStore.selectedDeptCode,
    selectedDp,
    transferStatus,
    qcOneSelectViewModal.startDate,
    qcOneSelectViewModal.endDate
  ])

  // useEffect(() => {
  //   getData()
  // }, [])
  return (
    <Wrapper>
      <PageHeader>
        <PageTitle>人力资源调配</PageTitle>
        <Place />
        <span className='label'>日期:</span>
        <DatePicker.RangePicker allowClear={false} style={{ width: 220 }} {...qcOneSelectViewModal.getDateOptions()} />
        <span className='label'>科室:</span>
        <DeptSelect onChange={() => { }} />
        <span className='label'>调配方式:</span>
        <Select onChange={(value: string) => setTransferStatus(value)} value={transferStatus}>
          {tsList.map((item: DictItem, index: number) => (
            <Select.Option value={item.code} key={index}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
        <span className='label'>转入转出:</span>
        <Select onChange={(value: string) => setSelectedDp(value)} value={selectedDp}>
          {dpList.map((item: DictItem, index: number) => (
            <Select.Option value={item.code} key={index}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
        <Button type='primary' onClick={() => getData()}>
          查询
        </Button>
        {/* <Button type='primary' onClick={() => {}}>
          添加
        </Button>
        <Button>导出</Button> */}
      </PageHeader>
      <BaseTable
        loading={pageLoading}
        dataSource={dataSource}
        columns={columns}
        wrapperStyle={{ margin: '0 15px' }}
        type={['index']}
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
          return { onDoubleClick: () => onDetail(record) }
        }}
      />
    </Wrapper>
  )
})
const Wrapper = styled.div``
