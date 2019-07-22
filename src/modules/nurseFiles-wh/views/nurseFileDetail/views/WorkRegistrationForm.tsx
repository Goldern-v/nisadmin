import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseLayout from '../components/BaseLayout'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { authStore, appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { ColumnProps } from 'antd/lib/table'
import createModal from 'src/libs/createModal'
import EditWorkRegistrationFormModal from '../modal/EditWorkRegistrationFormModal'
import { nurseFilesService } from 'src/modules/nurseFiles-wh/services/NurseFilesService'
import { globalModal } from 'src/global/globalModal'
import limitUtils from 'src/modules/nurseFiles/views/nurseFileDetail/utils/limit.ts'
import { openAuditModal } from '../config/auditModalConfig';
export interface Props extends RouteComponentProps {}
export default observer(function WorkRegistrationForm() {
  const editWorkRegistrationFormModal = createModal(EditWorkRegistrationFormModal)
  const btnList = [
    {
      label: '添加',
      onClick: () =>
        editWorkRegistrationFormModal.show({
          signShow: '添加'
        })
    }
  ]

  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      dataIndex: '1',
      key: '1',
      render: (text: any, record: any, index: number) => index + 1,
      align: 'center',
      width: 60
    },
    {
      title: '年度',
      dataIndex: 'year',
      key: '2',
      width: 100,
      align: 'center'
    },
    {
      title: '夜班',
      dataIndex: 'nightShift',
      key: '3',
      width: 80,
      align: 'center'
    },
    {
      title: '查房',
      dataIndex: 'checkOut',
      key: '4',
      width: 80,
      align: 'center'
    },
    {
      title: '护理会诊',
      dataIndex: 'nursingConsultation',
      key: '5',
      width: 80,
      align: 'center'
    },
    {
      title: '病例讨论',
      dataIndex: 'caseDiscussion',
      key: '6',
      width: 80,
      align: 'center'
    },
    {
      title: '个案',
      dataIndex: 'individualCase',
      key: '61',
      width: 80,
      align: 'center'
    },
    {
      title: '小讲课',
      dataIndex: 'lecture',
      key: '小讲课',
      width: 80,
      align: 'center'
    },
    {
      title: '带教',
      dataIndex: 'teaching',
      key: '带教',
      width: 80,
      align: 'center'
    },
    {
      title: '证明人',
      dataIndex: 'witness',
      key: '6231',
      width: 100,
      align: 'center'
    },
    {
      title: '状态',
      dataIndex: 'auditedStatusName',
      key: '61231',
      align: 'center',
      width: 140
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
                  editWorkRegistrationFormModal.show({ data: row, signShow: '修改' })
                }}
              >
                修改
              </span>
            ) : (
              ''
            )}
            <span
              onClick={() => {
                openAuditModal('临床护理工作情况登记表', row, getTableData)
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
    nurseFilesService.commonfindByEmpNoSubmit('nurseWHRegistrationWork', appStore.queryObj.empNo).then((res) => {
      setTableData(res.data)
    })
  }
  useEffect(() => {
    getTableData()
  }, [])

  return (
    <BaseLayout title='临床护理工作情况登记表' btnList={btnList}>
      <BaseTable
        dataSource={tableData}
        columns={columns}
        surplusHeight={255}
        type={['spaceRow', 'fixedWidth']}
        tip={'无需填写，由培训模块、排班模块自动导入。'}
      />
      <editWorkRegistrationFormModal.Component getTableData={getTableData} />
    </BaseLayout>
  )
})
// const Wrapper = styled.div``
