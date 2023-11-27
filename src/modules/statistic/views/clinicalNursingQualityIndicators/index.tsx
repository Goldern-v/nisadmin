import React, { useEffect, useMemo, useState } from 'react'
import { DetailCon, TableCon } from '../../common/style'
import Header from './components/Header'
import moment from 'moment'
import BaseTable from 'src/components/BaseTable'
import styled from 'styled-components'
import statisticsApi from '../../api/StatisticsApi'
import { sensitiveRegisterService } from 'src/modules/SensitiveRegister/services/SensitiveRegisterService'
import { authStore } from 'src/stores'
import { Obj } from 'src/libs/types'
import { message } from 'antd'
import { nursingHandlerApi } from 'src/modules/nurseHandBookNew/bookGdrm/api/NursingHandlerApi'
import { getDataConfig, getColumnsConfig, getTitle } from './utils'
import { currentYear } from 'src/utils/date/rangeMethod'
import { textFormat2 } from 'src/enums/date'
import { fileDownload } from 'src/utils/file/file'

interface QueryIF {
  type: number,
  year: any,
  wardCode: string,
  timeType: number,
  months: any[],
  quarter: number[],
  qcRegisterBlockId: string
}
export interface Props {
  code: string
}

/** 临床护理质量指标统计 */
export default function (props: Props) {
  const { code } = props
  const [query, setQuery] = useState<QueryIF>({
    type: 1,
    wardCode: "",
    timeType: 1,
    year: moment(),
    months: currentYear(),
    quarter: [moment().quarter()],
    qcRegisterBlockId: ''
  })
  const [blockList, setBlockList] = useState<Obj[]>([])
  const [tableData, setTableData] = useState<Obj[]>([])
  const [areaList, setAreaList] = useState<Obj[]>([]) 

  const tableTitle = useMemo(() => {
    const { timeType, months, type, quarter } = query
    const wardName = authStore.deptList.find(v => v.code === query.wardCode)?.name || ''
    
    const areaName = areaList.find(v => v.code === query.wardCode)?.name || ''
    return getTitle({ year: query.year, wardName, areaName, timeType, months, code, type, quarter })
  }, [query])

  const [columns, setColumns] = useState<Obj[]>([])
  const [loading, setLoading] = useState(false)
  const formatColumns = (arr: Obj[]) => {
    let obj: Obj = arr.reduce((prev: Obj, cur: Obj) => {
      // 默认：为大小类 如果没有：就直接归小类
      cur.itemCode.indexOf("：") === -1 && (cur.itemCode += `：`)
      const [v1, v2] = cur.itemCode.split('：')
      const column = {
        title: v2 || v1,
        dataIndex: cur.itemName,
        align: 'center',
        width: (v2 ? v2.length * 12 : v1.length * 12) + 10,
      }
      if(!v2){
        prev[v1] = column
      }else if(prev[v1]) {
        prev[v1].push(column)
      }else prev[v1] = [column]
      return prev
    }, {})
    
    const arr1: Obj[] = Object.keys(obj).map(v => 
      Object.prototype.toString.call(obj[v]) === "[object Object]" ? obj[v] :
       {
        title: v,
        children: obj[v]
      }
    )
    
    const fn = getColumnsConfig(query)
    
    fn && fn(arr1)
    return arr1
  }
  const getTableData = async () => {
    setLoading(true)
    const params = formatParams()
    if (!params) return setLoading(false)
    statisticsApi.countBookStatistics(params).then(res => {

      let { itemConfigList = [], itemDataPage = [] } = res.data || {}
      if (!itemConfigList.length) {
        setLoading(false)
        message.warning('没有查询到数据')
        return
      }
      setColumns(formatColumns(itemConfigList))
        
      const fn = getDataConfig(query)
      fn && (itemDataPage = fn(itemDataPage))
      setTableData(itemDataPage)
      setLoading(false)
    })
      .catch(err =>
        setLoading(false)
      )
  }

  const getBlockList = () => new Promise((res, rej) =>
    sensitiveRegisterService
      .qcRegisterBlockGetList(code, query.wardCode).then(res1 => {
        setBlockList(res1.data || [])
        if (res1.data.length) {
          setQuery({ ...query, qcRegisterBlockId: res1.data[0].id })
        } else {
          setQuery({ ...query, qcRegisterBlockId: '' })
        }
        res({})
      })
  )
  const getAreaList = () => {
    nursingHandlerApi.getDeptList().then((res: any) => {
      if (res.data) {
        const { userDeptCode, userBigDeptCode, treeDept } = res.data
        setAreaList(treeDept)
        setQuery({
          ...query,
          wardCode: userDeptCode,
        })
      }
    })
  }
  const formatParams = () => {
    try {

      let { year, type, wardCode, timeType, quarter, months, ...other }: Obj = query
      let params: Obj = other

      year = year.format('YYYY')
      params = { ...params, key: code, startDate: year + '-01-01', endDate: year + '-12-31', type, timeType }
      if (timeType === 2) {
        if (!quarter.length) throw Error('请选择季度')
        quarter = quarter.sort()
        let last = quarter[quarter.length - 1]
        if (last - quarter[0] + 1 > quarter.length) throw Error('请选择连续的季度')
        const st = moment(moment().format(`${year}-${(quarter[0] - 1) * 3 + 1}-01`))
        const et = moment(moment().format(`${year}-${(last - 1) * 3 + 1}-01`))
        params.startDate = st.startOf('quarter').format(textFormat2)
        params.endDate = et.endOf('quarter').format(textFormat2)
      } else if (timeType === 3) {
        params.startDate = months[0].format(textFormat2)
        params.endDate = months[1].format(textFormat2)
      }
      if (type === 3) {
        params.wardCode = wardCode
      }
      
      return params
    } catch (error) {
      message.warning(error.message)
    }
  }
  const exportExcel = () => {
    const params = formatParams()
    if (!params) return
    statisticsApi.exportBookStatistics(params).then(res => fileDownload(res))
  }
  useEffect(() => {
    getAreaList()
    getTableData()
  }, [])
  useEffect(() => {
    if (query.wardCode) {
      getBlockList()
    }
  }, [query.wardCode])

  return (
    <DetailCon>
      <Header areaList={areaList} query={query} setQuery={setQuery} getTableData={getTableData} blockList={blockList} exportExcel={exportExcel} />
      <MTableCon>
        <div className='title'>{tableTitle}</div>
        <BaseTable loading={loading} dataSource={tableData} columns={columns} surplusHeight={320} surplusWidth={10} />
      </MTableCon>
    </DetailCon>
  )
}

const MTableCon = styled(TableCon)`
  
`