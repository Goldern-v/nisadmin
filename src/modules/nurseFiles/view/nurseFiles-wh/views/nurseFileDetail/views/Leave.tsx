import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseLayout from '../components/BaseLayout'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { ColumnProps } from 'antd/lib/table'
import createModal from 'src/libs/createModal'

import { globalModal } from 'src/global/globalModal'
import { authStore } from 'src/stores'
import limitUtils from '../utils/limit'
import Zimage from 'src/components/Zimage'
import { nurseFileDetailViewModal } from '../NurseFileDetailViewModal'
import EditLeaveModal from '../modal/EditLeaveModal'
import { nurseFilesService } from '../../../services/NurseFilesService'
import { openAuditModal } from '../config/auditModalConfig'
export interface Props extends RouteComponentProps {}
export default observer(function Leave() {
  const editLeaveModal = createModal(EditLeaveModal)
  const btnList = [
    {
      label: '添加',
      onClick: () => editLeaveModal.show({ signShow: '添加' })
    }
  ]

  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      dataIndex: '1',
      key: '序号',
      render: (text: any, record: any, index: number) => index + 1,
      align: 'center',
      width: 55
    },
    {
      title: '职称',
      dataIndex: 'title',
      key: 'title',
      width: 120,
      align: 'center'
    },
    {
      title: '学历',
      dataIndex: 'education',
      key: 'education',
      width: 90,
      align: 'center'
    },
    {
      title: '出生日期',
      dataIndex: 'birthday',
      key: 'birthday',
      width: 120,
      align: 'center'
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      width: 90,
      align: 'center'
    },
    {
      title: '取得护士执业证书时间并从事护理岗位时间',
      dataIndex: 'zyzsDate',
      key: 'zyzsDate',
      width: 200,
      align: 'center'
    },
    {
      title: '离职时间',
      dataIndex: 'leaveDate',
      key: 'leaveDate',
      width: 120,
      align: 'center'
    },
    {
      title: '层级',
      dataIndex: 'hierarchy',
      key: 'hierarchy',
      width: 90,
      align: 'center'
    },

    {
      title: '状态',
      dataIndex: 'auditedStatusName',
      key: 'auditedStatusName',
      width: 120,
      align: 'center'
    },
    {
      title: '操作',
      dataIndex: '8',
      key: '8',
      width: 100,
      align: 'center',
      render: (text: any, row: any, index: number) => {
        return (
          <DoCon>
            {limitUtils(row) ? (
              <span
                onClick={() => {
                  editLeaveModal.show({ data: row, signShow: '修改' })
                }}
              >
                修改
              </span>
            ) : (
              ''
            )}

            <span
              onClick={() => {
                openAuditModal('离职', row, getTableData)
              }}
            >
              {limitUtils(row) ? '审核' : '查看'}
            </span>
          </DoCon>
        )
      }
    }
  ]
  const [tableData, setTableData] = useState([])
  const getTableData = () => {
    nurseFilesService.commonfindByEmpNoSubmit('nurseWHLeave', appStore.queryObj.empNo).then((res) => {
      setTableData(res.data)
    })
  }
  useEffect(() => {
    getTableData()
  }, [])

  return (
    <BaseLayout title='离职' btnList={btnList}>
      <BaseTable dataSource={tableData} columns={columns} surplusHeight={270} surplusWidth={250} type={['spaceRow']} />
      <editLeaveModal.Component getTableData={getTableData} />
    </BaseLayout>
  )
})
const Wrapper = styled.div``
