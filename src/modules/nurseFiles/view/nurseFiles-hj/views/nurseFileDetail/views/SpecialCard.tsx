import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseLayout from '../components/BaseLayout'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { authStore, appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { ColumnProps } from 'antd/lib/table'
import createModal from 'src/libs/createModal'
import EditSpecialCardModal from '../modal/EditSpecialCardModal'
import { nurseFilesService } from '../../../services/NurseFilesService'
import { globalModal } from 'src/global/globalModal'
import { Button } from 'antd'
import Zimage from 'src/components/Zimage'
import limitUtils from '../utils/limit'
export interface Props extends RouteComponentProps {}
export default function SpecialCard() {
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
      render: (text: any, row: any, index: number) => index + 1,
      align: 'center',
      width: 60
    },

    {
      title: '获得时间',
      dataIndex: 'time',
      width: 100,
      align: 'center'
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
  const [statusNameGet, setStatusNameGet] = useState('')
  const getTableData = () => {
    nurseFilesService.nurseSpecialQualification(appStore.queryObj.empNo).then((res) => {
      setTableData(res.data)
    })
  }
  useEffect(() => {
    getTableData()
  }, [])

  return (
    <BaseLayout title='特殊资格证' btnList={btnList}>
      {/* <Button onClick={test}>按钮</Button> */}
      <BaseTable
        dataSource={tableData}
        columns={columns}
        surplusHeight={305}
        type={['fixedWidth']}
        tip={
          '填写说明：包括特殊岗位准入（ICU、手术室、高压氧、供应室、血透室、助产等）、高风险护理技术操作人员资质培训（PICC、伤口造口、CRRT等）、会诊人员资质准入（糖尿病、骨科、危重症、助产等）。'
        }
      />
      <editSpecialCardModal.Component getTableData={getTableData} />
    </BaseLayout>
  )
}
const Wrapper = styled.div``
