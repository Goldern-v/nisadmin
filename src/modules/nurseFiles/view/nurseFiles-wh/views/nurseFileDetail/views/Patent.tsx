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
import EditPatentModal from '../modal/EditPatentModal'
import { nurseFilesService } from '../../../services/NurseFilesService'
import { openAuditModal } from '../config/auditModalConfig'
export interface Props extends RouteComponentProps {}
export default observer(function Patent() {
  const editPatentModal = createModal(EditPatentModal)
  const btnList = [
    {
      label: '添加',
      onClick: () => editPatentModal.show({ signShow: '添加' })
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
      title: '专利名称',
      dataIndex: 'patentName',
      key: 'patentName',
      width: 120,
      align: 'center'
    },
    {
      title: '专利排名',
      dataIndex: 'patentLevel',
      key: 'patentLevel',
      width: 90,
      align: 'center'
    },
    {
      title: '专利号',
      dataIndex: 'patentNumber',
      key: 'patentNumber',
      width: 90,
      align: 'center'
    },
    {
      title: '发证单位',
      dataIndex: 'cardUnit',
      key: 'cardUnit',
      width: 120,
      align: 'center'
    },
    {
      title: '发证时间',
      dataIndex: 'cardDate',
      key: 'cardDate',
      width: 120,
      align: 'center'
    },
    {
      title: '专利类型',
      dataIndex: 'patentType',
      key: 'patentType',
      width: 90,
      align: 'center'
    },
    {
      title: '是否成果转化',
      dataIndex: 'isResultTransfor',
      key: 'isResultTransfor',
      width: 110,
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
                  editPatentModal.show({ data: row, signShow: '修改' })
                }}
              >
                修改
              </span>
            ) : (
              ''
            )}

            <span
              onClick={() => {
                openAuditModal('专利', row, getTableData)
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
    nurseFilesService.commonfindByEmpNoSubmit('nurseWHPatent', appStore.queryObj.empNo).then((res) => {
      setTableData(res.data)
    })
  }
  useEffect(() => {
    getTableData()
  }, [])

  return (
    <BaseLayout title='专利' btnList={btnList}>
      <BaseTable dataSource={tableData} columns={columns} surplusHeight={255} surplusWidth={250} type={['spaceRow']} />
      <editPatentModal.Component getTableData={getTableData} />
    </BaseLayout>
  )
})
const Wrapper = styled.div``
