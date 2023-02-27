import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import { PageContainer } from 'src/components/common'
import { Obj } from 'src/libs/types'
import styled from 'styled-components'
import { appStore, authStore } from 'src/stores'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import moment from 'moment'
import { currentMonth } from 'src/utils/date/rangeMethod'
import { nurseHandBookService } from 'src/modules/nurseHandBookNew/services/NurseHandBookService'
import SelectCon from './components/SelectCon'
import AddModal from './components/addModal'
import createModal from 'src/libs/createModal'
import useFirstDisEffect from 'src/hooks/useFirstDisEffect'
import { message, Modal } from 'antd'
import { STATUS_LIST } from './utils/enums'

export interface Props {
  options: Obj
}
/**是否允许查看 */
const allowOpen = (row: Obj) => {
  const { status, empNo} = row
  if (authStore.user?.empNo === empNo) return true
  if (authStore.isDepartment) {
    return [2, 1].includes(status)
  }
  return true
}
/**是否允许删除 */
const allowDel = (row: Obj) => {
  const { status, empNo} = row
  if (authStore.user?.empNo !== empNo) return false
  if (authStore.isDepartment) return true
  return [0, -1].includes(status)
}

/** 29张表的菜单页，by贵州 */
export default observer(function (props: Props) {
  const { options } = props

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
      title: '科室',
      align: 'center',
      dataIndex: 'deptName'
    },
    {
      title: '状态',
      align: 'center',
      dataIndex: 'status',
      render(text: number, row: Obj) {
        const cur = STATUS_LIST.find(v => v.value === text)
        return <span style={{color: cur?.color}}>{cur?.label || row.statusDesc}</span>
      }
    },
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
      render: (text: string, row: Obj) => {
        return (
          <DoCon>
            <span className={allowOpen(row) ? '' : 'disabled'} onClick={() => appStore.history.push(`/nurseHandBookNewForm/detail?id=${row.id}`)}>查看</span>
            <span className={allowDel(row) ? '' : 'disabled'} onClick={() => { onDel(row.id) }}>删除</span>
          </DoCon>
        )
      }
    },
  ]
  /**动态  
   * 创建弹窗 */
  const addModal = createModal(AddModal)
  useEffect(() => {
    return () => {
      addModal.unMount()
    }
  }, [appStore.location.pathname])
  /**动态 */
  const [query, setQuery] = useState<Obj>({
    deptCode: '',
    keyword: '',
    status: '',
    pageSize: 20,
    pageNum: 1,
  })
  /**动态  
   * 创建弹窗参数
  */
  const [addQuery, setAddQuery] = useState<Obj>({
    deptCode: authStore.defaultDeptCode
  })
  const [total, setTotal] = useState(0)
  const [tableData, setTableData] = useState([])
  const [columns, setColumns] = useState(defColumns)
  const [loading, setLoading] = useState(false)

  /**
   * 动态  
   * 初始化设置  
   * year_can_create_more: 按年度创建，可以创建多个记录；对应登记表  
   * year_no_create_more: 按年度创建，不能创建多个记录；对应工作计划、工作总结、管理目标、计划表  
   * start_end_time_create_more: 按时间创建；对应记录表
   */
  const switchFn = {
    year_no_create_more: () => {
      setQuery({
        ...query,
        year: null
      })
      setAddQuery({
        ...addQuery,
        year: moment()
      })
      const newColumns = [...defColumns]
      newColumns.splice(3, 0, ...[
        {
          title: '年份',
          align: 'center',
          dataIndex: 'year'
        },
      ])
      setColumns(newColumns)
    },
    month_no_create_more: () => {
      setQuery({
        ...query,
        year: null
      })
      
      setAddQuery({
        ...addQuery,
        month: moment().format('M'),
        year: moment()
      })
      const newColumns = [...defColumns]
      newColumns.splice(3, 0, ...[
        {
          title: '年份',
          align: 'center',
          dataIndex: 'year'
        },
        {
          title: '月份',
          align: 'center',
          dataIndex: 'month'
        },
      ])
      setColumns(newColumns)
    },
    no_validate_create_more: () => {
      const [startTime, endTime] = currentMonth()
      setQuery({
        ...query,
        startTime,
        endTime,
      })
      const newColumns = [...defColumns]
      newColumns.splice(3, 0, ...[
        {
          title: '日期',
          align: 'center',
          dataIndex: 'time'
        },
      ])
      setColumns(newColumns)
    },
  }
  /**动态 */
  const formatTitle = (params: Obj) => {
    const { menuCode, name } = options
    const { year = '', deptName = '' } = params
    if (['GSYHZSC_1', 'GSYHZSC_2', 'GSYHZSC_3'].includes(menuCode))
      return `${year}年${deptName}${name}`
    else
      return `${deptName}${name}`
  }
  const onOkBAdd = (params: Obj) => {
    const { menuCode } = options
    const title = formatTitle(params)
    const data: Obj = { ...params, menuCode }
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
      addQuery
    })
  }

  const getTableData = () => {
    const { menuCode } = options
    setLoading(true)
    const params = { ...query }
    if (params.hasOwnProperty('year')) params.year = params.year ? params.year.format('YYYY') : ''
    if (params.hasOwnProperty('startTime')) {
      const { startTime, endTime } = params
      params.startTime = startTime ? startTime.format('YYYY-MM-DD') + ' 00:00:00' : ''
      params.endTime = endTime ? endTime.format('YYYY-MM-DD') + ' 23:59:59' : ''
    }
    nurseHandBookService.getTableDataList({ ...params, menuCode }).then((res: Obj) => {
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
  /**初始化query columns，弹窗， 搜索组件，请求列表数据 */
  const init = () => {
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
      {/* 动态 */}
      <SelectCon {...{ query, setQuery, openCreate, title: options.name || '' }} />
      <PageContainer>
        <BaseTable
          surplusHeight={250}
          dataSource={tableData}
          columns={columns}
          loading={loading}
          pagination={{
            current: query.pageNum,
            pageSize: query.pageSize,
            total,
          }}
          onChange={(pagination) => {
            setQuery({
              ...query,
              pageNum:pagination.current,
              pageSize:pagination.pageSize,
            })
          }}
        />
      </PageContainer>
      <addModal.Component />
    </Wrapper>
  )
})

const Wrapper = styled.div`

`