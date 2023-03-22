import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseLayout from '../components/BaseLayout'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import {appStore } from 'src/stores'
import { ColumnProps } from 'antd/lib/table'
import createModal from 'src/libs/createModal'
import EditSpecialCardModal from '../modal/EditSpecialCardModal'
import { nurseFilesService } from '../../../services/NurseFilesService'
import { globalModal } from 'src/global/globalModal'
import Zimage from 'src/components/Zimage'
import limitUtils from '../utils/limit'
export interface Props {
  addBtnHide?: boolean
}
export default function SpecialCard(props: Props) {
  let { addBtnHide } = props

  const editSpecialCardModal = createModal(EditSpecialCardModal)
  const btnList = addBtnHide ? [] : [
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
      render: (text: any, row: any, index: number) => index + 1,
      align: 'center',
      width: 60
    },
    {
      title: '资格名称',
      dataIndex: 'specialQualificationName',
      width: 150,
      align: 'center'
    },
    {
      title: '资格证编号',
      dataIndex: 'specialQualificationNo',
      width: 160,
      align: 'center'
    },
    {
      title: '获得时间',
      dataIndex: 'time',
      width: 100,
      align: 'center'
    },
    {
      title: '备注',
      dataIndex: 'remarks',
      width: 100,
      align: 'center'
    },
    {
      title: '附件',
      dataIndex: 'fj',
      width: 100,
      align: 'center',
      render: (text: any, row: any, index: any) => {
        return <DoCon>{row.urlImageOne ? <Zimage text='查看' list={row.urlImageOne.split(',')} /> : ''}</DoCon>
      }
    },
    {
      title: '状态',
      dataIndex: 'auditedStatusName',
      width: 120,
      align: 'center'
    },
    {
      title: '操作',
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
    nurseFilesService.nurseSpecialQualification(appStore.queryObj.empNo).then((res) => {
      setTableData(res.data)
    })
  }
  useEffect(() => {
    getTableData()
  }, [])
  return (
    <BaseLayout title='其他特殊资格证书获取情况(如各种上岗证、专科证等)' btnList={btnList}>
      <BaseTable
        dataSource={tableData}
        columns={columns}
        surplusHeight={305}
        type={['fixedWidth']}
      />
      <editSpecialCardModal.Component getTableData={getTableData} />
    </BaseLayout>
  )
}
const Wrapper = styled.div``
