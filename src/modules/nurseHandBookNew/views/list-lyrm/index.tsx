import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import { PageContainer } from 'src/components/common'
import { Obj } from 'src/libs/types'
import styled from 'styled-components'
import { appStore, authStore } from 'src/stores'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import moment from 'moment'
import { currentMonth } from 'src/utils/date/rangeMethod'
import { nurseHandBookService } from '../../services/NurseHandBookService'
import SelectCon from './components/SelectCon'
import AddModal from './components/addModal'
import createModal from 'src/libs/createModal'
import useFirstDisEffect from 'src/hooks/useFirstDisEffect'
import { message, Modal } from 'antd'
import { STATUS_LIST } from './utils/enums'
import { formatTitle } from '../detail-lyrm/config'
import AuditModal from './components/auditModal'

export interface Props {
  options: Obj
}

/** 29张表的菜单页，by临邑 */
export default observer(function (props: Props) {
  const { options } = props

  /**创建弹窗 */
  const addModal = createModal(AddModal)
  useEffect(() => {
    return () => {
      addModal.unMount()
    }
  }, [appStore.location.pathname])

  const [query, setQuery] = useState<Obj>({
    deptCode: authStore.defaultDeptCode,
    status: '',
    pageSize: 20,
    pageNum: 1,
  })
  /** 创建弹窗参数
  */
  const [addQuery, setAddQuery] = useState<Obj>({
    deptCode: authStore.defaultDeptCode
  })
  const [total, setTotal] = useState(0)
  // const [deptList, setDeptList] = useState<Obj[]>([])
  const [tableData, setTableData] = useState([])
  const [columns, setColumns] = useState<any[]>([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [loading, setLoading] = useState(false)
  const [formList, setFormList] = useState<Obj[]>([])
  const [selectedRows, setSelectedRows] = useState<Obj[]>([])
  const [auditVisible, setAuditVisible] = useState(false)

  const rowSelection = {
    selectedRowKeys,
    getCheckboxProps: (record: Obj) => ({
      disabled: record.status !== 1, // Column configuration not to be checked
      name: record.name,
    }),
    onChange: (keys: any, rows: any) => {
      setSelectedRows(rows)
      setSelectedRowKeys(keys)
    }
  }

  const defColumns: any[] = [
    {
      title: '序号',
      align: 'center',
      dataIndex: '',
      render: (text: string, row: Obj, index: number) => index + 1
    },
    {
      title: '标题',
      align: 'center',
      dataIndex: 'title'
    },
    {
      title: '状态',
      align: 'center',
      dataIndex: 'status',
      render(text: number, row: Obj) {
        const cur = STATUS_LIST.find(v => v.value === text)
        return <span style={{ color: cur?.color }}>{cur?.label || row.statusDesc}</span>
      }
    },
    {
      title: '科室',
      align: 'center',
      dataIndex: 'deptName'
    },
    ...columns,
    {
      title: '创建时间',
      align: 'center',
      dataIndex: 'createdTime'
    },
    {
      title: '创建人',
      align: 'center',
      dataIndex: 'empName'
    },
    {
      title: '操作',
      align: 'center',
      render: (text: string, row: Obj) => {
        return (
          <DoCon>
            <span onClick={() => appStore.history.push(`/nurseHandBookNewForm/detail?id=${row.id}`)}>查看</span>
            <span onClick={() => { onDel(row.id) }}>删除</span>
          </DoCon>
        )
      }
    },
  ]
  /**
   * 初始化设置  
   * year_can_create_more：按年度创建，可以创建多个记录；对应登记表  
   * year_no_create_more：按年度创建，不能创建多个记录；对应工作计划、工作总结、管理目标、计划表  
   * date：按时间创建；对应记录表
   */
  const switchFn = {
    year_can_create_more: () => {
      setQuery({
        ...query,
        year: moment(),
        menuCode: '',
      })
      setAddQuery({
        ...addQuery,
        year: moment(),
        menuCode: '',
      })
      const newColumns = [
        {
          title: '年份',
          align: 'center',
          dataIndex: 'year'
        },
        {
          title: '类型',
          align: 'center',
          dataIndex: 'menuName'
        }
      ]
      setColumns(newColumns)
      getFormList()
    },
    year_no_create_more: () => {
      setQuery({
        ...query,
        year: moment()
      })
      setAddQuery({
        ...addQuery,
        year: moment()
      })
      const newColumns = [
        {
          title: '年份',
          align: 'center',
          dataIndex: 'year'
        }
      ]
      setColumns(newColumns)
    },
    start_end_time_create_more: () => {
      const [startTime, endTime] = currentMonth()
      setQuery({
        ...query,
        startTime,
        endTime,
        menuCode: '',
      })
      setAddQuery({
        ...addQuery,
        startTime,
        endTime,
        menuCode: '',
      })
      const newColumns = [
        {
          title: '日期',
          align: 'center',
          dataIndex: 'startTime',
          render: (text: string, row: Obj) => {
            return `${row.startTime}-${row.endTime}`
          }
        },
        {
          title: '类型',
          align: 'center',
          dataIndex: 'menuName'
        }
      ]
      setColumns(newColumns)
      getFormList()
    },
  }

  const onOkBAdd = (params: Obj) => {
    const { menuCode } = options
    const title = formatTitle(params, options)
    const data: Obj = { ...params }
    if (!params.menuCode) {
      data.menuCode = menuCode
    }
    title && (data.title = title)
    nurseHandBookService.createOrUpdate(data).then(res => {
      if (res.code === '200') {
        const { id } = res.data
        appStore.history.push(`/nurseHandBookNewForm/detail?id=${id}`)
      }
    })
  }
  const openCreate = () => {
    addModal.show({
      onOkCb: onOkBAdd,
      formList,
      addQuery,
    })
  }

  // const getDeptList = async () => {
  //   return commonApi.getNursingUnitSelf().then((res: Obj) => {
  //     setDeptList(res.data.deptList)
  //     return { deptCode: res.data.defaultDept }
  //   })
  // }
  const getTableData = () => {
    const { menuCode } = options
    setLoading(true)
    const params = { ...query }
    if (!params.menuCode) params.menuCode = menuCode
    if (params.hasOwnProperty('year')) params.year = params.year ? params.year.format('YYYY') : ''
    if (params.hasOwnProperty('startTime')) {
      const { startTime, endTime } = params
      params.startTime = startTime ? startTime.format('YYYY-MM-DD') + ' 00:00:00' : ''
      params.endTime = endTime ? endTime.format('YYYY-MM-DD') + ' 23:59:59' : ''
    }
    nurseHandBookService.getTableDataList(params).then((res: Obj) => {
      setTableData(res.data.list || [])
      setTotal(res.data.totalCount)
      setLoading(false)
    }).catch(e => setLoading(false))
  }
  const onDel = (id: string) => {
    Modal.confirm({
      title: '删除',
      content: '确认删除该表单？',
      onOk: () => {
        nurseHandBookService.delNHR({ id }).then(res => {
          if (res.code === '200') {
            message.success('删除成功')
            getTableData()
          }
        })
      }
    })
  }
  /**根据menuCode获取表单 */
  const getFormList = () => {
    const { menuCode } = options
    nurseHandBookService.getFormListNHR({ menuCode }).then(res => {
      setFormList(res.data || [])
    })
  }
  const openAudit = () => {
    if (selectedRowKeys.length === 0) {
      return message.warning('请勾选需要审批的数据')
    }
    setAuditVisible(true)
  }
  const handleAudit = (params: any) => {
    const data = selectedRows.map((v: Obj) => ({ ...params, nodeCode: v.nextNode, id: v.id }))
    nurseHandBookService.multiHandleNodeNHR(data).then((res) => {
      setSelectedRowKeys([])
      setSelectedRows([])
      getTableData()
    });
  }
  /**初始化query columns，弹窗， 搜索组件，请求列表数据 */
  const init = async () => {
    // getDeptList()
    if (options.validateField && switchFn[options.validateField]) {
      switchFn[options.validateField]()
    }
  }

  useEffect(() => {
    init()
  }, [options])

  useFirstDisEffect(() => {
    getTableData()
  }, [query])

  return (
    <Wrapper>
      <SelectCon {...{ query, setQuery, openCreate, title: options.name || '', formList, openAudit }} />
      <PageContainer>
        <BaseTable
          surplusHeight={250}
          dataSource={tableData}
          columns={defColumns}
          rowSelection={rowSelection}
          loading={loading}
          pagination={{
            current: query.pageNum,
            pageSize: query.pageSize,
            total,
          }}
          onChange={(pagination) => {
            setQuery({
              ...query,
              pageNum: pagination.current,
              pageSize: pagination.pageSize,
            })
          }}
        />
      </PageContainer>
      <addModal.Component />
      <AuditModal visible={auditVisible} onOkCb={handleAudit} selectedList={selectedRows} onCancel={() => setAuditVisible(false)} />
    </Wrapper>
  )
})

const Wrapper = styled.div`

`