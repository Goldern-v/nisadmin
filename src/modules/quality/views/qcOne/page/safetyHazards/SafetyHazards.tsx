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
import { observer } from 'mobx-react-lite'
import { DictItem } from 'src/services/api/CommonApiService'
import { useKeepAliveEffect } from 'react-keep-alive'
export interface Props {}

export default observer(function FollowUpRecord() {
  const [dataSource, setDataSource] = useState([])
  const [pageLoading, setPageLoading] = useState(false)
  const [selectedProblemType, setSelectedProblemType] = useState('')
  const [pageOptions, setPageOptions]: any = useState({
    pageIndex: 1,
    pageSize: 20
  })
  const [total, setTotal]: any = useState(0)
  const problemList = [
    {
      code: '',
      name: '全部'
    },
    {
      code: '护理方面',
      name: '护理方面'
    },
    {
      code: '环境设置',
      name: '环境设置'
    },
    {
      code: '协作科室',
      name: '协作科室'
    },
    {
      code: '管理方面',
      name: '管理方面'
    },
    {
      code: '其他',
      name: '其他'
    },
    {
      code: '无',
      name: '无'
    }
  ]
  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      dataIndex: '0',
      key: '0',
      align: 'center',
      width: 50,
      render(text: any, record: any, index: number) {
        let _index: any = ''
        if (pageOptions.pageIndex && pageOptions.pageSize) {
          _index = (pageOptions.pageIndex - 1) * pageOptions.pageSize + record.rowIndex + 1
        } else {
          _index = index + 1
        }
        const obj: any = {
          children: _index,
          props: {}
        }
        if (record.row) {
          obj.props.rowSpan = record.row
        } else {
          obj.props.rowSpan = 0
        }
        return obj
      }
    },
    {
      title: '日期',
      dataIndex: 'recordDate',
      align: 'center',
      width: 100,
      render(text: string, record: any, index: number) {
        const obj: any = {
          children: text ? text.split(' ')[0] : '',
          props: {}
        }
        if (record.row) {
          obj.props.rowSpan = record.row
        } else {
          obj.props.rowSpan = 0
        }
        return obj
      }
    },
    {
      title: '时间',
      width: 80,
      dataIndex: 'recordDate',
      align: 'center',
      render(text: string, record: any, index: number) {
        const obj: any = {
          children: text ? text.split(' ')[1] : '',
          props: {}
        }
        if (record.row) {
          obj.props.rowSpan = record.row
        } else {
          obj.props.rowSpan = 0
        }
        return obj
      }
    },
    {
      title: '问题种类',
      width: 120,
      dataIndex: 'problemType',
      align: 'center'
    },
    {
      title: '详情',
      width: 300,
      dataIndex: 'content'
    },
    {
      title: '创建人',
      dataIndex: 'creatorName',
      align: 'center',
      width: 100,
      render(text: string, record: any, index: number) {
        const obj: any = {
          children: text,
          props: {}
        }
        if (record.row) {
          obj.props.rowSpan = record.row
        } else {
          obj.props.rowSpan = 0
        }
        return obj
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      align: 'center',
      width: 100,
      render(text: string, record: any, index: number) {
        const obj: any = {
          children: text,
          props: {}
        }
        if (record.row) {
          obj.props.rowSpan = record.row
        } else {
          obj.props.rowSpan = 0
        }
        return obj
      }
    },
    {
      title: '操作',
      width: 100,

      render(text: string, record: any, index: number) {
        const obj: any = {
          children: (
            <DoCon>
              <span onClick={() => onDetail(record)}>查看详情</span>
            </DoCon>
          ),
          props: {}
        }
        if (record.row) {
          obj.props.rowSpan = record.row
        } else {
          obj.props.rowSpan = 0
        }
        return obj
      }
    }
  ]

  const getData = () => {
    setPageLoading(true)
    qcOneService
      .qcSafetyCheckGetPage({
        ...pageOptions,
        wardCode: authStore.selectedDeptCode,
        startDate: qcOneSelectViewModal.startDate,
        endDate: qcOneSelectViewModal.endDate,
        problemType: selectedProblemType
      })
      .then((res) => {
        setTotal(res.data.totalCount)
        setDataSource(
          (res.data.list as any[]).reduce((total: any, current: any, rowIndex: number, array: any[]) => {
            total.push(
              ...(current.safetyCheckList || []).map((item: any, index: number, array: any[]) => {
                return Object.assign({}, item, current, { row: index == 0 ? array.length : 0, rowIndex: rowIndex })
              })
            )
            return total
          }, [])
        )
        setPageLoading(false)
      })
  }

  const onDetail = (record?: any) => {
    appStore.history.push(record ? `/qcOne/safetyHazardsDetail?id=${record.id}` : '/qcOne/safetyHazardsDetail')
  }
  useEffect(() => {
    getData()
  }, [selectedProblemType, pageOptions.pageIndex, pageOptions.pageSize, authStore.selectedDeptCode, qcOneSelectViewModal.startDate, qcOneSelectViewModal.endDate])

  // useEffect(() => {
  //   getData()
  // }, [])
  // qcOneService
  useKeepAliveEffect(() => {
    if ((appStore.history && appStore.history.action) === 'POP') {
      getData()
    }
    return () => {}
  })

  return (
    <Wrapper>
      <PageHeader>
        <PageTitle>安全隐患排查表</PageTitle>
        <Place />
        <span className='label'>日期:</span>
        <DatePicker.RangePicker allowClear={false} style={{ width: 220 }} {...qcOneSelectViewModal.getDateOptions()} />
        <span className='label'>科室:</span>
        <DeptSelect onChange={() => {}} />
        <span className='label'>问题种类:</span>
        <Select onChange={(value: string) => setSelectedProblemType(value)} value={selectedProblemType}>
          {problemList.map((item: DictItem, index: number) => (
            <Select.Option value={item.code} key={index}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
        <Button type='primary' onClick={() => getData()}>
          查询
        </Button>
        <Button type='primary' onClick={() => onDetail()}>
          添加
        </Button>
        {/* <Button>导出</Button> */}
      </PageHeader>

      <BaseTable
        loading={pageLoading}
        dataSource={dataSource}
        columns={columns}
        wrapperStyle={{ margin: '0 15px' }}
        type={[]}
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
    </Wrapper>
  )
})
const Wrapper = styled.div``
