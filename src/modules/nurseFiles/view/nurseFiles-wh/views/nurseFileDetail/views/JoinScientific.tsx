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
import EditJoinScientificModal from '../modal/EditJoinScientificModal'
import { nurseFilesService } from '../../../services/NurseFilesService'
import { openAuditModal } from '../config/auditModalConfig'
export interface Props extends RouteComponentProps {}
export default observer(function PersonWinning() {
  const editJoinScientificModal = createModal(EditJoinScientificModal)
  const btnList = [
    {
      label: '添加',
      onClick: () => editJoinScientificModal.show({ signShow: '添加' })
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
      title: '参与课题名称',
      dataIndex: 'goName',
      key: 'goName',
      width: 120,
      align: 'center'
    },
    {
      title: '课题主持人姓名',
      dataIndex: 'hostName',
      key: 'hostName',
      width: 120,
      align: 'center'
    },
    {
      title: '课题主持人工号',
      dataIndex: 'hostNo',
      key: 'hostNo',
      width: 120,
      align: 'center'
    },
    {
      title: '参与排名',
      dataIndex: 'goRank',
      key: 'goRank',
      width: 90,
      align: 'center'
    },

    {
      title: '课题来源',
      dataIndex: 'courseSource',
      key: 'courseSource',
      width: 90,
      align: 'center'
    },
    {
      title: '课题级别',
      dataIndex: 'courseLevel',
      key: 'courseLevel',
      width: 90,
      align: 'center'
    },
    {
      title: '承担单位',
      dataIndex: 'unit',
      key: 'unit',
      width: 90,
      align: 'center'
    },
    {
      title: '课题批文号',
      dataIndex: 'approvalNumber',
      key: 'approvalNumber',
      width: 110,
      align: 'center'
    },
    {
      title: '登记号',
      dataIndex: 'registerNumber',
      key: 'registerNumber',
      width: 80,
      align: 'center'
    },
    {
      title: '授予单位',
      dataIndex: 'grantUnit',
      key: 'grantUnit',
      width: 90,
      align: 'center'
    },
    {
      title: '开始时间',
      dataIndex: 'startDate',
      key: 'startDate',
      width: 120,
      align: 'center'
    },
    {
      title: '结束时间',
      dataIndex: 'endDate',
      key: 'endDate',
      width: 120,
      align: 'center'
    },
    {
      title: '完成情况',
      dataIndex: 'courseCompletion',
      key: 'courseCompletion',
      width: 90,
      align: 'center'
    },
    {
      title: '立项/结题/验收/鉴定时间',
      dataIndex: 'completionDate',
      key: 'completionDate',
      width: 180,
      align: 'center'
    },
    {
      title: '附件',
      dataIndex: 'fj',
      key: 'fj',
      width: 80,
      align: 'center',
      render: (text: any, row: any, index: any) => {
        return <DoCon>{row.urlImageOne ? <Zimage text='查看' list={row.urlImageOne.split(',')} /> : ''}</DoCon>
      }
    },
    {
      title: '状态',
      dataIndex: 'auditedStatusName',
      key: 'auditedStatusName',
      width: 140,
      align: 'center'
    },
    {
      title: '操作',
      dataIndex: '8',
      key: '8',
      width: 110,
      align: 'center',
      render: (text: any, row: any, index: number) => {
        return (
          <DoCon>
            {limitUtils(row) ? (
              <span
                onClick={() => {
                  editJoinScientificModal.show({ data: row, signShow: '修改' })
                }}
              >
                修改
              </span>
            ) : (
              ''
            )}

            <span
              onClick={() => {
                openAuditModal('参与科研课题', row, getTableData)
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
    nurseFilesService.commonfindByEmpNoSubmit('nurseWHGoScienceCourse', appStore.queryObj.empNo).then((res) => {
      setTableData(res.data)
    })
  }
  useEffect(() => {
    getTableData()
  }, [])

  return (
    <BaseLayout title='参与科研课题' btnList={btnList}>
      <BaseTable dataSource={tableData} columns={columns} surplusHeight={255} surplusWidth={250} type={['spaceRow']} />
      <editJoinScientificModal.Component getTableData={getTableData} />
    </BaseLayout>
  )
})
const Wrapper = styled.div``
