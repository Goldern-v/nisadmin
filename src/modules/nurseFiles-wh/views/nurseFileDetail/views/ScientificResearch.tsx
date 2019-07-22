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
import limitUtils from 'src/modules/nurseFiles/views/nurseFileDetail/utils/limit.ts'
import Zimage from 'src/components/Zimage'
import { nurseFileDetailViewModal } from '../NurseFileDetailViewModal'
import EditScientificResearchModal from '../modal/EditScientificResearchModal'
import { nurseFilesService } from 'src/modules/nurseFiles-wh/services/NurseFilesService'
export interface Props extends RouteComponentProps {}
export default observer(function scientificResearch() {
  const editScientificResearchModal = createModal(EditScientificResearchModal)
  const btnList = [
    {
      label: '添加',
      onClick: () => editScientificResearchModal.show({ signShow: '添加' })
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
      title: '获奖类别',
      dataIndex: 'resultType',
      key: 'resultType',
      width: 90,
      align: 'center'
    },
    {
      title: '成果名称',
      dataIndex: 'resultName',
      key: 'resultName',
      width: 90,
      align: 'center'
    },
    {
      title: '属于单位',
      dataIndex: 'grantUnit',
      key: 'grantUnit',
      width: 90,
      align: 'center'
    },
    {
      title: '授予时间',
      dataIndex: 'grantDate',
      key: 'grantDate',
      width: 90,
      align: 'center'
    },
    {
      title: '奖励级别',
      dataIndex: 'winningLevel',
      key: 'winningLevel',
      width: 90,
      align: 'center'
    },
    {
      title: '奖励名称',
      dataIndex: 'winningName',
      key: 'winningName',
      width: 90,
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
                  editScientificResearchModal.show({ data: row, signShow: '修改' })
                }}
              >
                修改
              </span>
            ) : (
              ''
            )}

            <span
              onClick={() => {
                globalModal.auditModal.show({
                  getTableData: getTableData,
                  id: row.id,
                  type: 'nurseWHScienceResult',
                  title: '审核科研课题成果',
                  tableFormat: [
                    {
                      获奖类别: `resultType`,
                      成果名称: `resultName`
                    },
                    {
                      属于单位: `grantUnit`,
                      授予时间: `grantDate`
                    },
                    {
                      奖励级别: `winningLevel`,
                      奖励名称: `winningName`
                    }
                  ],
                  fileData: row.urlImageOne
                    ? row.urlImageOne.split(',').map((item: any, index: number) => {
                        return {
                          ['附件' + (index + 1)]: item
                        }
                      })
                    : [],
                  allData: row
                })
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
    nurseFilesService.commonfindByEmpNoSubmit('nurseWHScienceResult', appStore.queryObj.empNo).then((res) => {
      setTableData(res.data)
    })
  }
  useEffect(() => {
    getTableData()
  }, [])

  return (
    <BaseLayout title='科研课题成果' btnList={btnList}>
      <BaseTable dataSource={tableData} columns={columns} surplusHeight={255} surplusWidth={250} type={['spaceRow']} />
      <editScientificResearchModal.Component getTableData={getTableData} />
    </BaseLayout>
  )
})
const Wrapper = styled.div``
