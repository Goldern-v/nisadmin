import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { PageHeader, PageTitle, Place } from 'src/components/common'
import { DatePicker, Select, ColumnProps, PaginationConfig } from 'src/vendors/antd'
import DeptSelect from 'src/components/DeptSelect'
import { appStore, authStore } from 'src/stores'
import BaseTable from 'src/components/BaseTable'
import createModal from 'src/libs/createModal'
import EditFollowUpModal from './modal/EditFollowUpModal'
import { qcOneService } from '../../services/QcOneService'
import { useCallback } from 'src/types/react'
import { DoCon } from 'src/modules/nurseFiles/view/nurseFiles-wh/views/nurseFilesList/NurseFilesListView'
export interface Props {}

export default function FollowUpRecord() {
  const [dataSource, setDataSource] = useState([])
  const [pageLoading, setPageLoading] = useState(false)
  const columns: ColumnProps<any>[] = [
    {
      title: '日期',
      dataIndex: 'recordDate',
      align: 'center',
      width: 150
    },
    {
      title: '科室',
      dataIndex: 'wardName',
      width: 200
    },
    {
      title: '患者姓名',
      dataIndex: 'patientName',
      align: 'center',
      width: 100
    },
    {
      title: '疾病诊断',
      width: 150
    },
    {
      title: '住院起始时间',
      dataIndex: 'admissionDate',
      align: 'center',
      width: 180,
      render(text: any, record: any, index: number) {
        return (
          <span>
            {record.admissionDate} - {record.dischargeDate}
          </span>
        )
      }
    },
    {
      title: '家访内容',
      dataIndex: 'accessContent',
      width: 150
    },
    {
      title: '反馈意见',
      dataIndex: 'feedBack',
      width: 150
    },
    {
      title: '家访参加人员',
      dataIndex: 'participantsList',
      width: 150
    },
    {
      title: '创建人',
      dataIndex: 'creatorName',
      align: 'center',
      width: 100
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      align: 'center',
      width: 150
    },
    {
      title: '操作',
      width: 100,
      render(text: any, record: any, index: number) {
        return (
          <DoCon>
            <span onClick={() => onDetail(record)}>查看详情</span>
          </DoCon>
        )
      }
    }
  ]
  const editFollowUpModal = createModal(EditFollowUpModal)

  const [pageOptions, setPageOptions]: any = useState({
    pageIndex: 1,
    pageSize: 20,
    total: 0
  })
  const getData = () => {
    setPageLoading(true)
    qcOneService.qcPatientVisitGetPage({ ...pageOptions, wardCode: authStore.selectedDeptCode }).then((res) => {
      setDataSource(res.data.list)
      setPageLoading(false)
    })
  }

  const onDetail = (record: any) =>
    editFollowUpModal.show({
      onOkCallBack: getData,
      data: record
    })
  useCallback(() => {
    getData()
  }, [pageOptions.pageIndex, pageOptions.pageSize])

  useEffect(() => {
    getData()
  }, [])
  // qcOneService
  return (
    <Wrapper>
      <PageHeader>
        <PageTitle>患者随访记录</PageTitle>
        <Place />
        <span className='label'>日期:</span>
        <DatePicker.RangePicker allowClear={false} style={{ width: 220 }} />
        <span className='label'>科室:</span>
        <DeptSelect onChange={() => {}} />
        <span className='label'>护士:</span>
        <Select>{/* <Select.Option>123</Select.Option> */}</Select>
        <Button onClick={() => getData()}>查询</Button>
        <Button
          type='primary'
          onClick={() =>
            editFollowUpModal.show({
              onOkCallBack: getData
            })
          }
        >
          添加
        </Button>
        <Button>导出</Button>
      </PageHeader>

      <BaseTable
        loading={pageLoading}
        dataSource={dataSource}
        columns={columns}
        wrapperStyle={{ margin: '0 15px' }}
        type={['index', 'fixedIndex']}
        surplusWidth={200}
        surplusHeight={200}
        pagination={{
          current: pageOptions.pageIndex,
          pageSize: pageOptions.pageSize,
          total: pageOptions.total
        }}
        onChange={(pagination: PaginationConfig) => {
          setPageOptions({
            pageIndex: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total
          })
        }}
        onRow={(record: any) => {
          return { onDoubleClick: () => onDetail(record) }
        }}
      />
      <editFollowUpModal.Component />
    </Wrapper>
  )
}
const Wrapper = styled.div``
