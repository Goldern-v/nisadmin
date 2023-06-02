import BaseTable from 'src/components/BaseTable'
import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { Obj } from 'src/libs/types'

import api from '../../api/StatisticsApi'

const DEF_OBJ: Obj = {
  originNum: 0,
  admitNum: 0,
  transOutNum: 0,
  dischargeNum: 0,
  transInNum: 0,
  nowNum: 0,
  operNum: 0,
  nursingNum: 0,
  nursingNum1: 0,
  nursingNum2: 0,
}
export interface Props {
}
export default observer(function PatientFlow(props: Props) {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<Obj[]>([])
  const columns: any[] = [
    {
      title: '科室名称',
      dataIndex: 'wardName',
      width: 150,
      align: 'center',
    },
    {
      title: '原有人数',
      dataIndex: 'originNum',
      width: 70,
      align: 'center',
    },
    {
      title: '新收人数',
      dataIndex: 'admitNum',
      width: 70,
      align: 'center',
    },
    {
      title: '转入人数',
      dataIndex: 'transInNum',
      width: 70,
      align: 'center',
    },
    {
      title: '出院人数',
      dataIndex: 'dischargeNum',
      width: 70,
      align: 'center',
    },
    {
      title: '转出人数',
      dataIndex: 'transOutNum',
      width: 70,
      align: 'center',
    },
    {
      title: '现有人数',
      dataIndex: 'nowNum',
      width: 70,
      align: 'center',
    },
    {
      title: '手术人数',
      dataIndex: 'operNum',
      width: 70,
      align: 'center',
    },
    {
      title: '特级护理',
      dataIndex: 'nursingNum',
      width: 70,
      align: 'center',
    },
    {
      title: '一级护理',
      dataIndex: 'nursingNum1',
      width: 70,
      align: 'center',
    },
    {
      title: '二级护理',
      dataIndex: 'nursingNum2',
      width: 70,
      align: 'center',
    },
  ]
  const getData = () => {
    setLoading(true)
    api.getNurseByDeptAndNum().then(res => {
      if (res.code === '200') {
        // wardName: '合计'
        // 技术合计
        const obj = res.data.reduce((prev: Obj, cur: Obj) => {
          for (let key in cur) {
            prev[key] += Number(cur[key])
          }
          return prev
        }, { ...DEF_OBJ })
        obj.wardName = '合计'
        setData([...res.data, obj])
      }
    }).finally(() => setLoading(false))
  }
  useEffect(() => {
    getData()
  }, [])

  return (
    <Wrapper>
      <BaseTable
        className="record-page-table"
        loading={loading}
        dataSource={data}
        columns={columns}
        surplusHeight={210}
        surplusWidth={300}
        title={() => <span>病人流转情况</span>}
      />
    </Wrapper>
  )
})

const Wrapper = styled.div`
padding: 20px;
.ant-table-title {
  font-size: 21px;
  font-weight: bold;
  text-align: center;
}
`