import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseLayout from '../components/BaseLayout'
import BaseTable from 'src/components/BaseTable'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { ColumnProps } from 'antd/lib/table'
import createModal from 'src/libs/createModal'
import EditWorkHistoryModal from '../modal/EditWorkHistoryModal'
import { nurseFilesService } from 'src/modules/nurseFiles/services/NurseFilesService'
import { auditedStatusEnum } from 'src/libs/enum/common'
import { globalModal } from 'src/global/globalModal'

export interface Props extends RouteComponentProps {}

export default observer(function WorkHistory () {
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
      dataIndex: '1',
      key: '1',
      render: (text: any, record: any, index: number) => index + 1,
      align: 'center',
      width: 70
    },
    {
      title: '开始年月',
      dataIndex: 'startTime',
      key: '2',
      width: 140,
      align: 'center'
    },
    {
      title: '结束年月',
      dataIndex: 'endTime',
      key: '3',
      width: 140,
      align: 'center'
    },
    {
      title: '单位',
      dataIndex: 'unit',
      key: '4',
      width: 200,
      align: 'center'
    },
    {
      title: '专业技术工作',
      dataIndex: 'professionalWork',
      key: '5',
      width: 200,
      align: 'center'
    },
    {
      title: '技术职称',
      dataIndex: 'professional',
      key: 'professional',
      width: 150,
      align: 'center'
    },
    {
      title: '职务',
      dataIndex: 'post',
      key: 'post',
      width: 100,
      align: 'center'
    },
    {
      title: '状态',
      dataIndex: 'auditedStatusName',
      key: '7',
      width: 220,
      align: 'center',
      render: (text: any, item: any, index: any) => {
        return <span>{item && auditedStatusEnum[item.auditedStatus]}</span>
      }
    },
    {
      title: '操作',
      dataIndex: '8',
      key: '8',
      width: 100,
      align: 'center',
      render: (text: any, row: any, index: any) => {
        if (Object.keys(row).length == 0) return <span />
        return (
          <DoCon>
            <span
              onClick={() => {
                editWorkHistoryModal.show({ data: row, signShow: '修改' })
              }}
            >
              修改
            </span>
            <span
              onClick={() => {
                globalModal.auditModal.show({
                  id: row.id,
                  type: 'nurseWorkExperience',
                  title: '审核工作经历',
                  tableFormat: [
                    {
                      起始时间: `startTime`,
                      结束时间: `endTime`
                    },
                    {
                      工作单位: `unit`,
                      专业技术工作: 'professionalWork'
                    },
                    {
                      技术职称: 'professional',
                      职务: 'post'
                    },
                    {
                      技术职称: 'professional'
                    }
                  ],
                  fileData: [
                    {
                      附件1: 'aaaa',
                      附件2: 'bbb'
                    }
                  ],
                  allData: row
                })
              }}
            >
              审核
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
      <BaseTable dataSource={tableData} columns={columns} surplusHeight={365} type={['spaceRow', 'fixedWidth']} />
      <editWorkHistoryModal.Component getTableData={getTableData} />
    </BaseLayout>
  )
})
const Wrapper = styled.div``

const DoCon = styled.div`
  display: flex;
  justify-content: space-around;
  font-size: 12px;
  color: ${(p) => p.theme.$mtc};
  span {
    cursor: pointer;
  }
`
