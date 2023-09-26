import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseLayout from '../components/BaseLayout'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { authStore, appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { ColumnProps } from 'antd/lib/table'
import createModal from 'src/libs/createModal'
import { nurseFilesService } from '../../../services/NurseFilesService'
import { isSelf,editFlag } from './BaseInfo'
import EditLeaveRecordModal from '../modal/EditLeaveRecordModal'

export interface Props extends RouteComponentProps {}

export default observer(function MakeAwards() {
  const editLeaveRecordModal = createModal(EditLeaveRecordModal)
  const [tableData, setTableData] = useState([])
  const getTableData = () => {
    nurseFilesService.commonfindByEmpNoSubmit('nurseWHRewardExperience', appStore.queryObj.empNo).then((res) => {
      setTableData(res.data)
    })
  }
  const btnList = [
    {
      label: '添加',
      onClick: () => editLeaveRecordModal.show()
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
      title: '请假单',
      dataIndex: 'leaveForm',
      key: '2',
      width: 200,
      align: 'center'
    },
   
    {
      title: '请假时间',
      dataIndex: 'leaveTime',
      key: '4',
      width: 120,
      align: 'center'
    },
    
    {
      title: '申请时间',
      dataIndex: 'applyTime',
      key: '',
      align: 'center',
      width: 120
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: '',
      align: 'center',
      width: 100
    },
    {
      title: '操作',
      dataIndex: '操作',
      key: '操作',
      width: 80,
      align: 'center',
      render: (text: any, row: any, index: number) => {
        return (
          <DoCon>
            <span onClick={() => toDetail(row)}>
              查看
            </span>
          </DoCon>
        )
      }
    }
  ]

  const toDetail = (row: any) => {
    appStore.history.push(`/selfNurseFile/leaveRecordDetail/${row.id}?type=military`);
  }

  useEffect(() => {
    getTableData()
  }, [])

  return (
    <BaseLayout title='请假记录' btnList={isSelf() || editFlag() ? btnList : []}>
      <BaseTable
        dataSource={tableData}
        columns={columns}
        surplusHeight={250}
        type={['spaceRow', 'fixedWidth']}
        onRow={(record: any) => {
          return {
            onDoubleClick: () => toDetail(record),
          };
        }}
      />
      <editLeaveRecordModal.Component />
    </BaseLayout>
  )
})
const Wrapper = styled.div``
