import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseLayout from '../components/BaseLayout'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { authStore, appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { ColumnProps } from 'antd/lib/table'
import createModal from 'src/libs/createModal'
import EditContinuingEducationModal from '../modal/EditContinuingEducationModal'
import { globalModal } from 'src/global/globalModal'
import { nurseFilesService } from '../../../services/NurseFilesService'
import limitUtils from '../utils/limit'
import Zimage from 'src/components/Zimage'
export interface Props extends RouteComponentProps { }
export default observer(function EducationalExperience() {
  const editContinuingEducationModal = createModal(EditContinuingEducationModal)
  const btnList = [
    {
      label: '添加',
      onClick: () =>
        editContinuingEducationModal.show({
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
      title: '开始时间',
      dataIndex: 'startTime',
      width: 120,
      align: 'center'
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      width: 120,
      align: 'center'
    },
    {
      title: '培训单位',
      dataIndex: 'trainingUnit',
      width: 120,
      align: 'center'
    },
    {
      title: '培训内容',
      dataIndex: 'trainingContent',
      width: 120,
      align: 'center'
    },
    {
      title: '学习类型',
      dataIndex: 'studyType',
      width: 80,
      align: 'center'
    },
    {
      title: '学习方式',
      dataIndex: 'studyWay',
      width: 100,
      align: 'center'
    },
    {
      title: '学分',
      dataIndex: 'credit',
      width: 80,
      align: 'center'
    },
    {
      title: '学时',
      dataIndex: 'hours',
      width: 80,
      align: 'center'
    },
    {
      title: '附件',
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
                  type: 'nurseContinuingEducation',
                  title: '审核继续教育',
                  tableFormat: [
                    {
                      开始时间: `startTime`,
                      结束时间: `endTime`
                    },
                    {
                      培训单位: `trainingUnit`,
                      培训内容: `trainingContent`
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
    nurseFilesService.nurseContinuingEducation(appStore.queryObj.empNo).then((res) => {
      setTableData(res.data)
    })
  }
  useEffect(() => {
    getTableData()
  }, [])
  return (
    <BaseLayout title='继续教育' btnList={btnList}>
      <BaseTable
        dataSource={tableData}
        columns={columns}
        surplusHeight={305}
        type={['fixedWidth']}
        tip={'填写说明：仅登记院外进修情况（以人事科签订合同为准的进修记录）。'}
      />
      <editContinuingEducationModal.Component getTableData={getTableData} />
    </BaseLayout>
  )
})
const Wrapper = styled.div``
