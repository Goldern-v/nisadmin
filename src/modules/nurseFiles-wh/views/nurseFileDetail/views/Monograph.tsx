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
import EditMonographModal from '../modal/EditMonographModal'
import { nurseFilesService } from 'src/modules/nurseFiles-wh/services/NurseFilesService'
export interface Props extends RouteComponentProps {}
export default observer(function Monograph() {
  const editMonographModal = createModal(EditMonographModal)
  const btnList = [
    {
      label: '添加',
      onClick: () => editMonographModal.show({ signShow: '添加' })
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
      title: '专著名称',
      dataIndex: 'monographName',
      key: 'monographName',
      width: 120,
      align: 'center'
    },
    {
      title: '出版社名称',
      dataIndex: 'pressName',
      key: 'pressName',
      width: 120,
      align: 'center'
    },
    {
      title: '出版号',
      dataIndex: 'pressNumber',
      key: 'pressNumber',
      width: 90,
      align: 'center'
    },
    {
      title: '出版日期',
      dataIndex: 'pressDate',
      key: 'pressDate',
      width: 120,
      align: 'center'
    },
    {
      title: '参编',
      dataIndex: 'participation',
      key: 'participation',
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
                  editMonographModal.show({ data: row, signShow: '修改' })
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
                  type: 'nurseWHMonograph',
                  title: '审核专著',
                  tableFormat: [
                    {
                      专著名称: `monographName`,
                      出版社名称: `pressName`
                    },
                    {
                      出版号: `pressNumber`,
                      出版日期: `pressDate`
                    },
                    {
                      参编: `participation`
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
    nurseFilesService.commonfindByEmpNoSubmit('nurseWHMonograph', appStore.queryObj.empNo).then((res) => {
      setTableData(res.data)
    })
  }
  useEffect(() => {
    getTableData()
  }, [])

  return (
    <BaseLayout title='专著' btnList={btnList}>
      <BaseTable dataSource={tableData} columns={columns} surplusHeight={255} surplusWidth={250} type={['spaceRow']} />
      <editMonographModal.Component getTableData={getTableData} />
    </BaseLayout>
  )
})
const Wrapper = styled.div``
