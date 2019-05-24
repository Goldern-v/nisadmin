import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseLayout from '../components/BaseLayout'
import BaseTable from 'src/components/BaseTable'
import { authStore, appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { ColumnProps } from 'antd/lib/table'
import createModal from 'src/libs/createModal'
import EditLevelChangeModal from '../modal/EditLevelChangeModal'
import { nurseFilesService } from 'src/modules/nurseFiles/services/NurseFilesService'
import { globalModal } from 'src/global/globalModal'
import Zimage from 'src/components/Zimage'

export interface Props extends RouteComponentProps {}
export default observer(function LevelChange () {
  // 保存表格每行数据
  const [rowData, setRowData] = useState({ id: '', urlImageOne: '', urlImageTwo: '', auditedStatusName: '' })
  const editLevelChangeModal = createModal(EditLevelChangeModal)
  const btnList = [
    {
      label: '添加',
      onClick: () =>
        editLevelChangeModal.show({
          signShow: '添加'
        })
    }
  ]
  // 审核组件
  const AuditComponent = (
    <span
      onClick={() => {
        globalModal.auditModal.show({
          id: rowData.id,
          type: 'nurseProfessionalAndLevelChange',
          title: '审核职称及层级变动',
          tableFormat: [
            {
              职称聘用时间: `appointmentTime`,
              取得职称: `titleQualification`
            },
            {
              层级: `hierarchy`
            }
          ],
          fileData: [
            {
              附件1: rowData.urlImageOne,
              附件2: require(`../../../images/证件空态度.png`)
            }
          ],
          allData: rowData
        })
      }}
    >
      审核
    </span>
  )
  // 审核判断方法
  const limitsComponent = (AuditComponent: any) => {
    if (
      (authStore.post === '护长' && rowData.auditedStatusName === '待护士长审核') ||
      (authStore.post === '护理部' && rowData.auditedStatusName === '待护理部审核')
    ) {
      return AuditComponent
    }
  }

  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      dataIndex: '1',
      key: '1',
      render: (text: any, record: any, index: number) => index + 1,
      align: 'center',
      width: 50
    },
    {
      title: '职称聘用时间',
      dataIndex: 'appointmentTime',
      key: '2',
      width: 150,
      align: 'center'
    },
    {
      title: '取得职称',
      dataIndex: 'titleQualification',
      key: '3',
      width: 100,
      align: 'center'
    },
    {
      title: '层级',
      dataIndex: 'hierarchy',
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
        return (
          <DoCon>
            {row.urlImageOne && (
              <Zimage text='查看' src={row.urlImageOne} />
            )}
          </DoCon>
        )
      }
    },
    {
      title: '状态',
      dataIndex: 'auditedStatusName',
      key: '7',
      width: 150,
      align: 'center'
    },
    {
      title: '操作',
      dataIndex: '8',
      key: '8',
      width: 100,
      align: 'center',
      render: (text: any, row: any, index: any) => {
        return (
          <DoCon>
            {/* 保存行数据 */}
            {setRowData(row)}
            <span
              onClick={() => {
                editLevelChangeModal.show({ data: row, signShow: '修改' })
              }}
            >
              修改
            </span>
            {limitsComponent(AuditComponent)}
          </DoCon>
        )
      }
    }
  ]
  const [tableData, setTableData] = useState([])
  const getTableData = () => {
    nurseFilesService.nurseProfessionalAndLevelChange(appStore.queryObj.empNo).then((res) => {
      setTableData(res.data)
    })
  }
  useEffect(() => {
    getTableData()
  }, [])
  return (
    <BaseLayout title='职称及层级变动' btnList={btnList}>
      <BaseTable dataSource={tableData} columns={columns} surplusHeight={365} type={['spaceRow', 'fixedWidth']} />
      <editLevelChangeModal.Component getTableData={getTableData} />
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
