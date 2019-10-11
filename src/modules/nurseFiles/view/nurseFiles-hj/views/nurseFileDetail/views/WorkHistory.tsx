import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseLayout from '../components/BaseLayout'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { authStore, appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { ColumnProps } from 'antd/lib/table'
import createModal from 'src/libs/createModal'
import EditWorkHistoryModal from '../modal/EditWorkHistoryModal'
import { nurseFilesService } from '../../../services/NurseFilesService'
import { auditedStatusEnum } from 'src/libs/enum/common'
import { globalModal } from 'src/global/globalModal'
import limitUtils from '../utils/limit'

export interface Props extends RouteComponentProps {}

export default observer(function WorkHistory() {
  const [getId, setGetId] = useState(0)
  const editWorkHistoryModal = createModal(EditWorkHistoryModal)

  const btnList = [
    {
      label: '添加',
      onClick: () =>
        editWorkHistoryModal.show({
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
      title: '开始年月',
      dataIndex: 'startTime',
      width: 100,
      align: 'center'
    },
    {
      title: '结束年月',
      dataIndex: 'endTime',
      width: 100,
      align: 'center'
    },
    {
      title: '单位',
      dataIndex: 'unit',
      width: 200,
      align: 'center'
    },
    {
      title: '专业技术工作',
      dataIndex: 'professionalWork',
      width: 100,
      align: 'center'
    },
    {
      title: '技术职称',
      dataIndex: 'professional',
      width: 100,
      align: 'center'
    },
    {
      title: '职务',
      dataIndex: 'post',
      width: 100,
      align: 'center'
    },
    {
      title: '状态',
      dataIndex: 'auditedStatusName',
      align: 'center',
      width: 120
      // render: (text: any, item: any, index: any) => {
      //   return <span>{item && auditedStatusEnum[item.auditedStatus]}</span>
      // }
    },
    {
      title: '操作',
      width: 100,
      align: 'center',
      render: (text: any, row: any, index: any) => {
        if (Object.keys(row).length === 0) return <span />
        return (
          <DoCon>
            {limitUtils(row) ? (
              <span
                onClick={() => {
                  editWorkHistoryModal.show({ data: row, signShow: '修改' })
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
                  type: 'nurseWorkExperience',
                  title: '审核工作经历',
                  tableFormat: [
                    {
                      起始时间: `startTime`,
                      结束时间: `endTime`
                    },
                    {
                      单位: `unit`,
                      专业技术工作: 'professionalWork'
                    },
                    {
                      技术职称: 'professional',
                      职务: 'post'
                    }
                  ],

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
    nurseFilesService.nurseWorkExperience(appStore.queryObj.empNo).then((res) => {
      setTableData(res.data)
      // setGetId(res.data)
    })
  }
  useEffect(() => {
    getTableData()
  }, [])

  return (
    <BaseLayout title='工作经历' btnList={btnList}>
      <BaseTable
        dataSource={tableData}
        columns={columns}
        surplusHeight={305}
        type={['fixedWidth']}
        tip={'填写说明：从院校毕业后参加工作开始填写，不含院内轮训。如毕业后在多个单位工作过，请按照时间顺序逐一填写'}
      />
      <editWorkHistoryModal.Component getTableData={getTableData} />
    </BaseLayout>
  )
})
const Wrapper = styled.div``
