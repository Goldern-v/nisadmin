import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseLayout from '../components/BaseLayout'
import { message } from 'antd'
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
  const { history } = appStore

  const [showEditModal, setShowEditModal] = useState(false)
  const [tableData, setTableData] = useState([])
  const getTableData = () => {
    let params = {
      type:0
    }
    nurseFilesService.leaveApplication(params).then((res) => {
      if(res.data) setTableData(res.data.list)
    })
  }
  const btnList = [
    {
      label: '添加',
      onClick: () => setShowEditModal(true)
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
      dataIndex: 'recordName',
      key: '2',
      width: 200,
      align: 'center'
    },
   
    {
      title: '请假时间',
      dataIndex: 'leaveTime',
      key: '4',
      width: 120,
      align: 'center',
      render: (text: any, row: any, index: number) => {
        return (row.leaveStartTime || "") + "-" + (row.leaveEndTime || "")
      }
    },
    
    {
      title: '申请时间',
      dataIndex: 'createTime',
      key: '',
      align: 'center',
      width: 120
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: '',
      align: 'center',
      width: 100,
      render: (text: any, row: any, index: number) => {
        let statuStr = ""
        switch(Number(text)){
          case -2:
            statuStr = "已撤销"
            break;
          case -1:
            statuStr = "已驳回"
            break;
          case 0:
            statuStr = "暂存"
            break;
          case 1:
            statuStr = "待审核"
            break;
          case 2:
            statuStr = "已通过"
            break;
        }
        return statuStr
      }
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
    history.push(`/selfNurseFile/leaveRecordDetail?id=${row.id}`);
  }

  const createReport = (params:any)=>{
    setShowEditModal(false)
    history.push(`/selfNurseFile/leaveRecordDetail?recordType=${params.recordType}`)
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
      <EditLeaveRecordModal visible={showEditModal}  onOk={createReport} onCancel={()=>setShowEditModal(false)}/>
    </BaseLayout>
  )
})
const Wrapper = styled.div``
