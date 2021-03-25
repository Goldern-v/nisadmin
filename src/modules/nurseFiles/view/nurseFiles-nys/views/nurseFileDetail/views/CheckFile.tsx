import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseLayout from '../components/BaseLayout'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { authStore, appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { ColumnProps } from 'antd/lib/table'
import createModal from 'src/libs/createModal'
import EditCheckFileModal from '../modal/EditCheckFileModal'
import { nurseFilesService } from '../../../services/NurseFilesService'
import { globalModal } from 'src/global/globalModal'
import limitUtils from '../utils/limit'
import Zimage from 'src/components/Zimage'

export interface Props extends RouteComponentProps { }

export default observer(function CheckFile() {
  const editCheckFileModal = createModal(EditCheckFileModal)
  const btnList = [
    {
      label: '添加',
      onClick: () =>
        editCheckFileModal.show({
          signShow: '添加'
        })
    }
  ]
  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      render: (text: any, record: any, index: number) => index + 1,
      align: 'center',
      width: 60
    },
    {
      title: '考核时间',
      dataIndex: 'startTime',
      width: 200,
      align: 'center',
      render: (text: string, row: any) => `${row.startTime}~${row.endTime}`
    },
    {
      title: '考核成绩',
      dataIndex: 'checkScore',
      width: 100,
      align: 'center'
    },
    {
      title: '附件',
      width: 200,
      align: 'center',
      render: (text: any, row: any, index: any) => {
        return <DoCon>{row.urlImageOne ? <Zimage text='查看' list={row.urlImageOne.split(',')} /> : ''}</DoCon>
      }
    },
    {
      title: '状态',
      dataIndex: 'auditedStatusName',
      width: 200,
      align: 'center'
    },
    {
      title: '操作',
      width: 100,
      align: 'center',
      render: (text: any, row: any, index: number) => {
        return (
          <DoCon>
            {limitUtils(row) ? (
              <span
                onClick={() => {
                  editCheckFileModal.show({ data: row, signShow: '修改' })
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
                  type: 'nurseCheckFile',
                  title: '审核年度考核结果',
                  tableFormat: [
                    {
                      开始时间: 'startTime',
                      结束时间: 'endTime',
                    },
                    {
                      考核内容: 'checkContent',
                      考核成绩: 'checkScore',
                    },
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
    nurseFilesService.nurseCheckFile(appStore.queryObj.empNo).then((res) => {
      setTableData(res.data)
    })
  }

  useEffect(() => {
    getTableData()
  }, [])

  return (
    <BaseLayout title='考核' btnList={btnList}>
      <BaseTable
        dataSource={tableData}
        columns={columns}
        surplusHeight={305}
        type={['fixedWidth']}
        tip={''}
      />
      <editCheckFileModal.Component getTableData={getTableData} />
    </BaseLayout>
  )
})
const Wrapper = styled.div``
