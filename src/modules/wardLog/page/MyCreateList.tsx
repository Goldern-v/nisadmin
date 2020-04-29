import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { PageHeader, PageTitle, Place } from 'src/components/common'
import { DatePicker, Select, ColumnProps, PaginationConfig, Modal, message } from 'src/vendors/antd'
import DeptSelect from 'src/components/DeptSelect'
import { appStore, authStore } from 'src/stores'
import BaseTable from 'src/components/BaseTable'
import { wardLogService } from '../services/WardLogService'
import { useCallback } from 'src/types/react'
import { DoCon } from 'src/components/BaseTable'
import { observer } from 'mobx-react-lite'
import { DictItem } from 'src/services/api/CommonApiService'
import { getCurrentMonthNow } from 'src/utils/date/currentMonth'
import moment from 'moment'
import { useKeepAliveEffect } from 'src/vendors/keep-alive'
import WardLogAddModal from './../components/WardLogAddModal'
import createModal from 'src/libs/createModal'
import { fileDownload } from 'src/utils/file/file'
import service from 'src/services/api'

export interface Props { }

export default observer(function MyCreateList() {
  const [date, setDate]: any = useState(getCurrentMonthNow())
  const [templateList, setTemplateList]: any = useState([])
  const [selectedTemplate, setSelectedTemplate]: any = useState('')
  const [dataSource, setDataSource] = useState([])
  const [deptSelect, setDeptSelect] = useState('')
  const [deptListAll, setDeptListAll] = useState([] as any[])
  const [pageLoading, setPageLoading] = useState(false)

  const [selectedRowKeys, setSelectedRowKeys] = useState([] as number[] | string[])

  const wardLogAddModal = createModal(WardLogAddModal)

  /** 类别 */
  const pathMap: any = {
    myCreateList: '1',
    myWard: '2',
    copyForMe: '3'
  }
  const path = window.location.hash.split('/').reverse()[0]
  const status = pathMap[path]

  const columns: ColumnProps<any>[] = [
    {
      title: '创建日期',
      dataIndex: 'createTime',
      width: 120
    },
    {
      title: '主题',
      dataIndex: 'themeName',
      width: 150
    },
    {
      title: '摘要',
      dataIndex: 'remark',
      width: 150
    },
    {
      title: '科室',
      dataIndex: 'wardName',
      width: 120
    },
    {
      title: '应用',
      dataIndex: 'name',
      width: 140,
      align: 'center'
    },
    {
      title: '创建人',
      dataIndex: 'senderName',
      width: 80,
      align: 'center'
    },
    {
      title: '操作',
      width: status == '1' ? 120 : 80,
      render(text: any, record: any, index: number) {
        return (
          <DoCon>
            <span onClick={() => onDetail(record)}>查看详情</span>
            {status == '1' && <span onClick={() => onEdit(record)}>修改</span>}
            {status == '1' && <span onClick={() => onDelete(record)}>删除</span>}
          </DoCon>
        )
      }
    }
  ]

  const [pageOptions, setPageOptions]: any = useState({
    pageIndex: 1,
    pageSize: 20
  })
  const [total, setTotal]: any = useState(0)

  const initData = () => {
    wardLogService.findTemplates().then((res) => {
      setTemplateList([...res.data.publicTemplates, ...res.data.deptTemplates].map((item: any) => item.template))
    })

    service.commonApiService
      .getNursingUnitAll().then(res => {
        setDeptListAll((res.data?.deptList || []).filter((item: any) => item.code !== '0001'))
      })
  }

  const getData = () => {
    setPageLoading(true)
    let startDate = date[0] ? moment(date[0]).format('YYYY-MM-DD') : ''
    let endDate = date[0] ? moment(date[1]).format('YYYY-MM-DD') : ''
    wardLogService
      .findLog({
        ...pageOptions,
        wardCode: deptSelect,
        startDate,
        endDate,
        templateId: selectedTemplate,
        status
      })
      .then((res) => {
        setPageLoading(false)

        setSelectedRowKeys([])

        setTotal(res.data.totalCount)
        setDataSource(res.data.list)
      }, err => setPageLoading(false))
  }

  const onDetail = (record: any) => {
    appStore.history.push(`/wardLogDetail?id=${record.id}`)
  }

  const handleAddNew = (record: any) => {
    wardLogAddModal
      .show({
        deptCode: deptSelect || authStore.selectedDeptCode || '',
        templateList,
      })
  }

  const onEdit = (record: any) => {
    appStore.history.push(`/wardLogEdit?id=${record.id}`)
  }

  const onDelete = (record: any) => {
    Modal.confirm({
      title: '确认删除该记录吗',
      centered: true,
      onOk: () => {
        setPageLoading(true)

        wardLogService
          .deleteRecord(record.id)
          .then(res => {
            message.success('删除成功', 1, () => getData())
          }, err => setPageLoading(false))

      }
    })
  }

  const handleRowSelect = (rowKeys: string[] | number[]) => setSelectedRowKeys(rowKeys)

  const handleExport = () => {
    if (selectedRowKeys.length <= 0) {
      message.warning('未勾选条目')
      return
    }

    setPageLoading(true)

    wardLogService
      .exportDetailList({ ids: selectedRowKeys })
      .then(res => {
        setPageLoading(false)
        setSelectedRowKeys([])
        fileDownload(res)
      }, err => setPageLoading(false))
  }

  useEffect(() => {
    getData()
  }, [
    pageOptions.pageIndex,
    pageOptions.pageSize,
    date,
    selectedTemplate,
    deptSelect
  ])

  useEffect(() => {
    initData()
  }, [])

  useKeepAliveEffect(() => {
    if ((appStore.history && appStore.history.action) === 'POP') {
      getData()
    }
  })

  return (
    <Wrapper>
      <PageHeader>
        <PageTitle>病区日志</PageTitle>
        <Place />
        <span className='label'>日期:</span>
        <DatePicker.RangePicker
          allowClear={false}
          style={{ width: 220 }}
          value={date}
          onChange={(value: any) => setDate(value)}
        />
        <span className='label'>科室:</span>
        {/* <DeptSelect onChange={(val) => setDeptSelect(val)} /> */}
        <Select
          value={deptSelect}
          style={{ width: 180 }}
          showSearch
          filterOption={(input: any, option: any) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          onChange={(val: string) => setDeptSelect(val)}>
          <Select.Option value={''}>全部</Select.Option>
          {deptListAll.map((item: any, idx: any) =>
            <Select.Option key={idx} value={item.code}>{item.name}</Select.Option>)}
        </Select>
        <span className='label'>应用:</span>
        <Select style={{ width: 160 }} value={selectedTemplate} onChange={(value: any) => setSelectedTemplate(value)}>
          <Select.Option value=''>全部</Select.Option>
          {templateList.map((item: any, index: number) => (
            <Select.Option key={index} value={item.id}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
        <Button type='primary' onClick={() => getData()}>
          查询
        </Button>
        {status == '1' && <Button onClick={handleAddNew}>新建</Button>}
        <Button onClick={handleExport}>导出</Button>
      </PageHeader>
      <BaseTable
        loading={pageLoading}
        dataSource={dataSource}
        columns={columns}
        wrapperStyle={{ margin: '0 15px' }}
        type={['index']}
        rowKey='id'
        surplusHeight={220}
        pagination={{
          current: pageOptions.pageIndex,
          pageSize: pageOptions.pageSize,
          total: total
        }}
        rowSelection={{
          selectedRowKeys,
          onChange: handleRowSelect
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
      <wardLogAddModal.Component />
    </Wrapper>
  )
})
const Wrapper = styled.div``
