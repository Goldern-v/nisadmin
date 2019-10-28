import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { PageHeader, PageTitle, Place } from 'src/components/common'
import { DatePicker, Select, ColumnProps, PaginationConfig } from 'src/vendors/antd'
import DeptSelect from 'src/components/DeptSelect'
import { appStore, authStore } from 'src/stores'
import BaseTable from 'src/components/BaseTable'
import createModal from 'src/libs/createModal'
import EditFollowUpModal, { jdList } from './modal/EditFollowUpModal'
import { qcOneService } from '../../services/QcOneService'
import { useCallback } from 'src/types/react'
import { DoCon } from 'src/modules/nurseFiles/view/nurseFiles-wh/views/nurseFilesList/NurseFilesListView'
import { qcOneSelectViewModal } from '../../QcOneSelectViewModal'
import { observer } from 'mobx-react-lite'
import moment from 'moment'
import { numToChinese } from 'src/utils/number/numToChinese'
export interface Props {}

export default observer(function FollowUpRecord() {
  const [dataSource, setDataSource] = useState([])
  const [pageLoading, setPageLoading] = useState(false)
  const [selectedJd, setselectedJd] = useState('')
  const columns: ColumnProps<any>[] = [
    {
      title: '日期',
      dataIndex: 'recordDate',
      align: 'center',
      width: 100
    },
    {
      title: '季度',
      dataIndex: 'quarter',
      align: 'center',
      width: 100,
      render(text: any, record: any, index: number) {
        return text ? `第${numToChinese(text)}季度` : ''
      }
    },
    {
      title: '科室',
      dataIndex: 'wardName',
      width: 150
    },
    {
      title: '患者姓名',
      dataIndex: 'patientName',
      align: 'center',
      width: 100
    },
    {
      title: '疾病诊断',
      dataIndex: 'diagnosis',
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
      dataIndex: 'empNames',
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
    qcOneService
      .qcPatientVisitGetPage({
        ...pageOptions,
        wardCode: authStore.selectedDeptCode,
        quarter: selectedJd,
        startDate: qcOneSelectViewModal.startDate ? moment(qcOneSelectViewModal.startDate).format('YYYY-MM-DD') : '',
        endDate: qcOneSelectViewModal.endDate ? moment(qcOneSelectViewModal.endDate).format('YYYY-MM-DD') : ''
      })
      .then((res) => {
        setDataSource(res.data.list)
        setPageLoading(false)
      })
  }

  const onDetail = (record: any) =>
    editFollowUpModal.show({
      onOkCallBack: getData,
      data: record
    })

  useEffect(() => {
    // getData()
    // qcOneSelectViewModal.initNurseList()
  }, [])

  useEffect(() => {
    getData()
  }, [pageOptions.pageIndex, pageOptions.pageSize, selectedJd, authStore.selectedDeptCode, qcOneSelectViewModal.startDate, qcOneSelectViewModal.endDate])

  // qcOneService
  return (
    <Wrapper>
      <PageHeader>
        <PageTitle>季度家庭随访表</PageTitle>
        <Place />
        <span className='label'>日期:</span>
        <DatePicker.RangePicker allowClear={false} style={{ width: 220 }} {...qcOneSelectViewModal.getDateOptions()} />
        <span className='label'>科室:</span>
        <DeptSelect
          onChange={() => {
            qcOneSelectViewModal.initNurseList()
          }}
        />
        <span className='label'>季度:</span>
        <Select
          value={selectedJd}
          onChange={(nurse: any) => {
            setselectedJd(nurse)
          }}
          showSearch
          filterOption={(input: any, option: any) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Select.Option value={''}>全部</Select.Option>
          {jdList.map((item: any, index: any) => (
            <Select.Option value={item.code} key={index}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
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
        surplusHeight={220}
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
})
const Wrapper = styled.div``
