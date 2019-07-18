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
import limitUtils from 'src/modules/nurseFiles-wh/views/nurseFileDetail/utils/limit.ts'
import Zimage from 'src/components/Zimage'
import { nurseFileDetailViewModal } from '../NurseFileDetailViewModal'
import EditLeaveModal from '../modal/EditLeaveModal'
import { nurseFilesService } from 'src/modules/nurseFiles-wh/services/NurseFilesService'
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
      width: 90,
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
      title: '取得护士执业资格证书时间并从事护理岗位时间',
      dataIndex: 'zyzsDate',
      key: 'zyzsDate',
      width: 90,
      align: 'center'
    },
    {
      title: '离职时间',
      dataIndex: 'leaveDate',
      key: 'leaveDate',
      width: 90,
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
                globalModal.auditModal.show({
                  getTableData: getTableData,
                  id: row.id,
                  type: 'nurseWHLeave',
                  title: '审核离职',
                  tableFormat: [
                    {
                      职称: `title`,
                      学历: `education`
                    },
                    {
                      出生日期: `birthday`,
                      年龄: `age`
                    },
                    {
                      取得护士执业资格证书时间并从事护理岗位时间: `zyzsDate`,
                      离职时间: `leaveDate`
                    },
                    {
                      层级: `hierarchy`
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
    nurseFilesService.commonfindByEmpNoSubmit('nurseWHLeave', appStore.queryObj.empNo).then((res) => {
      setTableData(res.data)
    })
  }
  useEffect(() => {
    getTableData()
  }, [])

  return (
    <BaseLayout title='离职' btnList={btnList}>
      <BaseTable dataSource={tableData} columns={columns} surplusHeight={305} surplusWidth={250} type={['spaceRow']} />
      <editLeaveModal.Component getTableData={getTableData} />
    </BaseLayout>
  )
})
const Wrapper = styled.div``
