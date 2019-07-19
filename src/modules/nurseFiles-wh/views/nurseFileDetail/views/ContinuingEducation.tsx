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
import EditContinuingEducationModal from '../modal/EditContinuingEducationModal'
import { nurseFilesService } from 'src/modules/nurseFiles-wh/services/NurseFilesService'
export interface Props extends RouteComponentProps {}
export default observer(function PersonWinning() {
  const editContinuingEducationModal = createModal(EditContinuingEducationModal)
  const btnList = [
    {
      label: '添加',
      onClick: () => editContinuingEducationModal.show({ signShow: '添加' })
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
      title: '年份',
      dataIndex: 'year',
      key: 'year',
      width: 90,
      align: 'center'
    },
    {
      title: '继续教育项目负责人',
      dataIndex: 'projectPerson',
      key: 'projectPerson',
      width: 160,
      align: 'center'
    },
    {
      title: '项目名称',
      dataIndex: 'projectName',
      key: 'projectName',
      width: 90,
      align: 'center'
    },
    {
      title: '项目号',
      dataIndex: 'projectNumber',
      key: 'projectNumber',
      width: 90,
      align: 'center'
    },
    {
      title: '项目级别',
      dataIndex: 'projectLevel',
      key: 'projectLevel',
      width: 90,
      align: 'center'
    },
    {
      title: '课时数',
      dataIndex: 'personTotal',
      key: 'personTotal',
      width: 90,
      align: 'center'
    },
    {
      title: '学员总数',
      dataIndex: '',
      key: '',
      width: 90,
      align: 'center'
    },
    {
      title: '学院分布区域',
      dataIndex: 'schoolArea',
      key: 'schoolArea',
      width: 110,
      align: 'center'
    },
    {
      title: '学院职称分布',
      dataIndex: 'personTitleArea',
      key: 'personTitleArea',
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
                  editContinuingEducationModal.show({ data: row, signShow: '修改' })
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
                  type: 'nurseWHContinueStudy',
                  title: '审核继续教育信息',
                  tableFormat: [
                    {
                      年份: `year`,
                      继续教育项目负责人: `projectPerson`
                    },
                    {
                      项目名称: `projectName`,
                      项目号: `projectNumber`
                    },
                    {
                      项目级别: `projectLevel`,
                      课时数: `personTotal`
                    },
                    {
                      学员总数: ``,
                      学院分布区域: `schoolArea`
                    },
                    {
                      学院职称分布: `personTitleArea`,
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
    nurseFilesService.nurseWHContinueStudy(appStore.queryObj.empNo).then((res) => {
      setTableData(res.data)
    })
  }
  useEffect(() => {
    getTableData()
  }, [])

  return (
    <BaseLayout title='继续教育' btnList={btnList}>
      <BaseTable dataSource={tableData} columns={columns} surplusHeight={305} surplusWidth={250} type={['spaceRow']} />
      <editContinuingEducationModal.Component getTableData={getTableData} />
    </BaseLayout>
  )
})
const Wrapper = styled.div``
