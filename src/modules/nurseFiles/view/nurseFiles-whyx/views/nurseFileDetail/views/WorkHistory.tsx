import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseLayout from '../components/BaseLayout'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { authStore, appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { ColumnProps } from 'antd/lib/table'
import createModal from 'src/libs/createModal'
import EditWorkHistoryModal from '../modal/EditWorkHistoryModal'
import { nurseFilesService } from '../../../services/NurseFilesService'
import { auditedStatusEnum } from 'src/libs/enum/common'
import { globalModal } from 'src/global/globalModal'
import limitUtils from '../utils/limit'
import { openAuditModal } from '../config/auditModalConfig'
import { isSelf } from './BaseInfo'
import Do from '../components/Do'

export interface Props extends RouteComponentProps {}

export default observer(function WorkHistory() {
  const editWorkHistoryModal = createModal(EditWorkHistoryModal)
  const [tableData, setTableData]: any= useState([])
  const getTableData = () => {
    nurseFilesService.commonfindByEmpNoSubmit('nurseWHWorkExperience', appStore.queryObj.empNo).then((res) => {
      if (res.data.length > 0) {
        setTableData(res.data.filter((item: { insideOutsideState: string }) => item.insideOutsideState === '2'))
      }
      // setTableData(res.data)
      
      // setGetId(res.data)
    })
  }
  const btnList = [
    {
      label: '添加',
      onClick: () =>
        editWorkHistoryModal.show({
          signShow: '添加'
        })
    }
  ]
  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      dataIndex: '',
      key: '1',
      render: (text: any, record: any, index: number) => index + 1,
      align: 'center',
      width: 60
    },
    {
      title: '开始年月',
      dataIndex: 'startTime',
      key: '2',
      width: 100,
      align: 'center'
    },
    {
      title: '结束年月',
      dataIndex: 'endTime',
      key: '3',
      width: 100,
      align: 'center',
      render(text: string, record: any) {
        if (!text && record.startTime) {
          return '至今'
        } else {
          return text
        }
      }
    },
    {
      title: '单位',
      dataIndex: 'unit',
      key: '4',
      width: 100,
      align: 'center'
    },
    {
      title: '科室',
      dataIndex: 'department',
      key: '5',
      width: 150,
      align: 'center'
    },
    // {
    //   title: '专业技术工作',
    //   dataIndex: 'professionalWork',
    //   key: '5',
    //   width: 150,
    //   align: 'center'
    // },
    // {
    //   title: '技术职称',
    //   dataIndex: 'professional',
    //   key: 'professional',
    //   width: 100,
    //   align: 'center'
    // },
    // {
    //   title: '职务',
    //   dataIndex: 'post',
    //   key: 'post',
    //   width: 100,
    //   align: 'center'
    // },
    {
      title: '状态',
      dataIndex: 'auditedStatusName',
      key: '',
      align: 'center',
      width: 120
      // render: (text: any, item: any, index: any) => {
      //   return <span>{item && auditedStatusEnum[item.auditedStatus]}</span>
      // }
    },
    Do('nurseWHWorkExperience', editWorkHistoryModal, getTableData, false)
  ]

  useEffect(() => {
    getTableData()
  }, []) 

  return (
    <BaseLayout title='院外工作经历'>
      <BaseTable
        dataSource={tableData}
        columns={columns}
        surplusHeight={250}
        type={['spaceRow', 'fixedWidth']}
        // tip={'填写说明：从院校毕业后参加工作开始填写，不含院内轮训。如毕业后在多个单位工作过，请按照时间顺序逐一填写'}
      />
      <editWorkHistoryModal.Component getTableData={getTableData} />
    </BaseLayout>
  )
})
const Wrapper = styled.div``
