import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseLayout from '../components/BaseLayout'
import BaseTable from 'src/components/BaseTable'
import { authStore, appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { ColumnProps } from 'antd/lib/table'
import createModal from 'src/libs/createModal'
import EditSpecialCardModal from '../modal/EditSpecialCardModal'
import { nurseFilesService } from 'src/modules/nurseFiles/services/NurseFilesService'
import { globalModal } from 'src/global/globalModal'
import { Button } from 'antd'
import Zimage from 'src/components/Zimage'
import limitUtils from 'src/modules/nurseFiles/views/nurseFileDetail/utils/limit.ts'
export interface Props extends RouteComponentProps {}
export default function SpecialCard () {
  const editSpecialCardModal = createModal(EditSpecialCardModal)
  const btnList = [
    {
      label: '添加',
      onClick: () =>
        editSpecialCardModal.show({
          signShow: '添加'
        })
    }
  ]
  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      dataIndex: '1',
      key: '1',
      render: (text: any, row: any, index: number) => index + 1,
      align: 'center',
      width: 50
    },

    {
      title: '获得时间',
      dataIndex: 'time',
      key: '2',
      width: 100,
      align: 'center'
    },
    {
      title: '资格名称',
      dataIndex: 'specialQualificationName',
      key: '3',
      width: 150,
      align: 'center'
    },
    {
      title: '资格证编号',
      dataIndex: 'specialQualificationNo',
      key: '4',
      width: 200,
      align: 'center'
    },
    {
      title: '附件',
      dataIndex: 'fj',
      key: '5',
      width: 200,
      align: 'center',
      render: (text: any, row: any, index: any) => {
        return <DoCon>{row.urlImageOne && <Zimage text='查看' src={row.urlImageOne} />}</DoCon>
      }
    },
    {
      title: '状态',
      dataIndex: 'auditedStatusName',
      key: '6',

      align: 'center'
    },
    {
      title: '操作',
      dataIndex: 'cz',
      key: '8',
      width: 100,
      align: 'center',
      render: (text: any, row: any, index: any) => {
        return (
          <DoCon>
            {limitUtils(row) ? (
              <span
                onClick={() => {
                  editSpecialCardModal.show({ data: row, signShow: '修改' })
                }}
              >
                修改
              </span>
            ) : (
              ''
            )}

            {limitUtils(row) ? (
              <span
                onClick={() => {
                  globalModal.auditModal.show({
                    getTableData: getTableData,
                    id: row.id,
                    type: 'nurseSpecialQualification',
                    title: '审核特殊资格证',
                    tableFormat: [
                      {
                        获得时间: `time`,
                        资格名称: `specialQualificationName`
                      },
                      {
                        资格证编号: `specialQualificationNo`
                      }
                    ],
                    fileData: [
                      {
                        附件1: row.urlImageOne
                        // 附件2: require(`../../../images/证件空态度.png`)
                      }
                    ],
                    allData: row
                  })
                }}
              >
                审核
              </span>
            ) : (
              ''
            )}
          </DoCon>
        )
      }
    }
  ]
  const [tableData, setTableData] = useState([])
  const [statusNameGet, setStatusNameGet] = useState('')
  const getTableData = () => {
    nurseFilesService.nurseSpecialQualification(appStore.queryObj.empNo).then((res) => {
      setTableData(res.data)
    })
  }
  useEffect(() => {
    getTableData()
    // nurseFilesService.nurseSpecialQualification(appStore.queryObj.empNo).then((res) => {
    //   setTableData(res.data)
    //   setStatusNameGet(res.data[0].auditedStatusName)
    // })
    // setStatusNameGet(tableData[0]!.auditedStatusName)
  }, [])
  const test = () => {
    console.log(authStore.post)
  }
  return (
    <BaseLayout title='特殊资格证' btnList={btnList}>
      <Button onClick={test}>按钮</Button>
      <BaseTable dataSource={tableData} columns={columns} surplusHeight={365} type={['spaceRow', 'fixedWidth']} />
      <editSpecialCardModal.Component getTableData={getTableData} />
    </BaseLayout>
  )
}
const Wrapper = styled.div``

export const DoCon = styled.div`
  display: flex;
  justify-content: space-around;
  font-size: 12px;
  color: ${(p) => p.theme.$mtc};
  span {
    cursor: pointer;
  }
`
