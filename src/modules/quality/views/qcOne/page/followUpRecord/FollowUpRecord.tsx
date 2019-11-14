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
import YearPicker from 'src/components/YearPicker'
import { numToChinese } from 'src/utils/number/numToChinese'
export interface Props { }

export default observer(function FollowUpRecord() {
  const [dataSource, setDataSource] = useState([])
  const [pageLoading, setPageLoading] = useState(false)
  const [selectedJd, setselectedJd]: any = useState(moment().quarter())
  const columns: ColumnProps<any>[] = [
    {
      title: '随访日期',
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
    pageSize: 20
  })

  const [year, setYear] = useState(moment().format('YYYY'))

  const [total, setTotal]: any = useState(0)

  const getData = () => {
    let _startDate = ''
    let _endDate = ''
    let dateString = `${year}-${moment().format('MM-DD')}`

    if (selectedJd == 1) {
      _startDate = moment(dateString).format('YYYY-01-01')
      _endDate = moment(dateString)
        .month(2)
        .endOf('month')
        .format('YYYY-MM-DD')
    } else if (selectedJd == 2) {
      _startDate = moment(dateString).format('YYYY-04-01')
      _endDate = moment(dateString)
        .month(5)
        .endOf('month')
        .format('YYYY-MM-DD')
    } else if (selectedJd == 3) {
      _startDate = moment(dateString).format('YYYY-07-01')
      _endDate = moment(dateString)
        .month(8)
        .endOf('month')
        .format('YYYY-MM-DD')
    } else if (selectedJd == 4) {
      _startDate = moment(dateString).format('YYYY-10-01')
      _endDate = moment(dateString)
        .month(11)
        .endOf('month')
        .format('YYYY-MM-DD')
    } else {
      _startDate = moment(dateString).format('YYYY-01-01')
      _endDate = moment(dateString).format('YYYY-12-31')
    }
    setPageLoading(true)
    qcOneService
      .qcPatientVisitGetPage({
        ...pageOptions,
        wardCode: authStore.selectedDeptCode,
        // quarter: selectedJd,
        startDate: _startDate,
        endDate: _endDate
      })
      .then((res) => {
        setTotal(res.data.totalCount)
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
  }, [
    pageOptions.pageIndex,
    pageOptions.pageSize,
    selectedJd,
    year,
    authStore.selectedDeptCode,
    // qcOneSelectViewModal.startDate, 
    // qcOneSelectViewModal.endDate
  ])

  // qcOneService
  return (
    <Wrapper>
      <PageHeader>
        <PageTitle>季度家庭随访表</PageTitle>
        <Place />
        {/* <span className='label'>日期:</span>
        <DatePicker.RangePicker allowClear={false} style={{ width: 220 }} {...qcOneSelectViewModal.getDateOptions()} /> */}
        <span className='label'>科室:</span>
        <DeptSelect
          onChange={() => {
            qcOneSelectViewModal.initNurseList()
          }}
        />
        <span className='label'>年份:</span>
        <YearPicker
          style={{ width: '100px' }}
          allowClear={false}
          value={moment(year) || undefined}
          onChange={(_moment: any) => setYear(_moment.format('YYYY'))} />
        <span className='label'>季度:</span>
        <Select
          value={selectedJd}
          onChange={(nurse: any) => {
            setselectedJd(nurse)
          }}
        >
          <Select.Option value={''}>全部</Select.Option>
          {jdList.map((item: any, index: any) => (
            <Select.Option value={item.code} key={index}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
        <Button type='primary' onClick={() => getData()}>
          查询
        </Button>
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
      <editFollowUpModal.Component />
    </Wrapper>
  )
})
const Wrapper = styled.div``