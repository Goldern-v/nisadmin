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
import createModal from 'src/libs/createModal'
import EditWardInnovateModal from '../modal/EditWardInnovateModal'
import Do from '../components/Do'
import Zimage from 'src/components/Zimage'

export interface Props { }

export default observer(function WardInnovate() {
  const [tableData, setTableData]: any= useState([])
  const [loading, setLoading] = useState(false)
  const editOnEducationModal = createModal(EditWardInnovateModal)
  const [detailModalVisible, setDetailModalVisible] = useState(false)
  const [recordSelected, setRecordSelected] = useState({})

  const btnList = [
    {
      label: '添加',
      onClick: () => editOnEducationModal.show({ signShow: '添加' })
    }
  ]
  const getTableData = () => {
    setLoading(true)
    wardInnovationServices.getInnovationDeptListByEmpNo({
      empNo: appStore.queryObj.empNo,
      pageIndex: 1,
      pageSize: 1000,
    }).then(res => {
      setLoading(false)
      // setTableData(res.data.list)
      // todo
      setTableData([{regNum: 111}])
    }, err => setLoading(false))
  }

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
      title: '申报人',
      dataIndex: 'projectName',
      width: 150,
      align: 'center',
    },
    {
      title: '申报科室',
      dataIndex: 'projectName',
      width: 150,
      align: 'center',
    },
    {
      title: '申报时间',
      dataIndex: 'innovationDeptName',
      width: 150,
      align: 'center',
    },
    {
      title: '登记单位',
      dataIndex: 'regUnit', // 
      width: 150,
      align: 'center',
    },
    {
      title: '登记号',
      dataIndex: 'regNum', // 
      width: 150,
      align: 'center',
    },
    {
      title: '参与成员',
      dataIndex: 'innovationMember', // 
      width: 150,
      align: 'center',
      // 后端返回数组 需要渲染
      // render: (text: any, record: any) => {
      //   return <DoCon>
      //     <span onClick={() => handleDetail(record)}>查看详情</span>
      //   </DoCon>
      // }
    },
    {
      title: '创新类别',
      dataIndex: 'innovationMember',
      width: 150,
      align: 'center',
    },
    {
      title: '创新级别',
      dataIndex: 'innovationMember',
      width: 150,
      align: 'center',
    },
    {
      title: '推广区域',
      dataIndex: 'innovationMember',
      width: 150,
      align: 'center',
    },
    {
      title: '附件',
      dataIndex: 'fj',
      key: 'fj',
      width: 70,
      align: 'center',
      render: (text: any, row: any, index: any) => {
        return <DoCon>{row.urlImageOne ? <Zimage text='查看' list={row.urlImageOne.split(',')} /> : ''}</DoCon>
      }
    },
    {
      title: '状态',
      dataIndex: 'innovationMember',
      width: 150,
      align: 'center',
    },
    // {
    //   title: '操作',
    //   dataIndex: '操作',
    //   align: 'center',
    //   width: 80,
    //   render: (text: any, record: any) => {
    //     return <DoCon>
    //       <span onClick={() => handleDetail(record)}>查看详情</span>
    //     </DoCon>
    //   }
    // },
    Do('nurseWardInnovate', editOnEducationModal, getTableData)
  ]

  const handleDetail = (record: any) => {
    setDetailModalVisible(true)
    setRecordSelected(record)
  }

  useEffect(() => {
    getTableData()
  }, [appStore.queryObj.empNo])

  return <BaseLayout title='科室创新' btnList={btnList}>
    <BaseTable
      dataSource={tableData}
      columns={columns}
      surplusHeight={260}
      surplusWidth={250}
      loading={loading}
      type={['spaceRow']} />
    {/* <WardInnovationDetailMoal
      visible={detailModalVisible}
      onCancel={() => setDetailModalVisible(false)}
      detailData={recordSelected} /> */}
    <editOnEducationModal.Component getTableData={getTableData} />
  </BaseLayout>
})