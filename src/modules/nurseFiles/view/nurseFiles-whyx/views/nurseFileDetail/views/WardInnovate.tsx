import styled from 'styled-components'
import React, { useState, useEffect } from 'react'

import BaseLayout from '../components/BaseLayout'
import { Button } from 'antd'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { ColumnProps } from 'src/vendors/antd'
import { wardInnovationServices } from 'src/modules/nurseFiles/view/科室创新/services/WardInnovationServices'
import WardInnovationDetailMoal from 'src/modules/nurseFiles/view/科室创新/components/WardInnovationDetailMoal'
import { observer } from 'src/vendors/mobx-react-lite'
import { appStore } from 'src/stores'

export interface Props { }

export default observer(function WardInnovate() {
  const [tableData, setTableData] = useState([])
  const [loading, setLoading] = useState(false)

  const [detailModalVisible, setDetailModalVisible] = useState(false)
  const [recordSelected, setRecordSelected] = useState({})

  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      dataIndex: '',
      key: '序号',
      render: (text: any, record: any, index: number) => index + 1,
      align: 'center',
      width: 55
    },
    {
      title: '项目名称',
      dataIndex: 'projectName',
      width: 150,
      align: 'center',
    },
    {
      title: '创新科室',
      dataIndex: 'innovationDeptName',
      width: 150,
      align: 'center',
    },
    {
      title: '创新时间',
      dataIndex: 'innovationTime',
      width: 150,
      align: 'center',
    },
    {
      title: '登记单位',
      dataIndex: 'regUnit',
      width: 150,
      align: 'center',
    },
    {
      title: '登记号',
      dataIndex: 'regNum',
      width: 150,
      align: 'center',
    },
    {
      title: '参与成员',
      dataIndex: 'innovationMember',
      width: 150,
      align: 'center',
    },
    {
      title: '操作',
      dataIndex: '操作',
      align: 'center',
      width: 80,
      render: (text: any, record: any) => {
        return <DoCon>
          <span onClick={() => handleDetail(record)}>查看详情</span>
        </DoCon>
      }
    },
  ]

  const handleDetail = (record: any) => {
    setDetailModalVisible(true)
    setRecordSelected(record)
  }

  const getTableData = () => {
    setLoading(true)
    wardInnovationServices.getInnovationDeptListByEmpNo({
      empNo: appStore.queryObj.empNo,
      pageIndex: 1,
      pageSize: 1000,
    })
      .then(res => {
        setLoading(false)
        setTableData(res.data.list)
      }, err => setLoading(false))
  }

  useEffect(() => {
    getTableData()
  }, [appStore.queryObj.empNo])

  return <BaseLayout title='科室创新' btnList={[]}>
    <BaseTable
      dataSource={tableData}
      columns={columns}
      surplusHeight={260}
      surplusWidth={250}
      loading={loading}
      type={['spaceRow']} />
    <WardInnovationDetailMoal
      visible={detailModalVisible}
      onCancel={() => setDetailModalVisible(false)}
      detailData={recordSelected} />
  </BaseLayout>
})