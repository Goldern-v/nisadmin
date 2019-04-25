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

export interface Props extends RouteComponentProps {}
export default observer(function WorkHistory () {
  const editWorkHistoryModal = createModal(EditWorkHistoryModal)
  const btnList = [
    {
      label: '添加',
      onClick: () =>
        editWorkHistoryModal.show({
          id: '12'
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
      width: 80
    },
    {
      title: '开始年月',
      dataIndex: 'stratTime',
      key: '2',
      width: 150,
      align: 'center'
    },
    {
      title: '结束年月',
      dataIndex: 'endTime',
      key: '3',
      width: 150,
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
      width: 150,
      align: 'center'
    },
    {
      title: '状态',
      dataIndex: '7',
      key: '7',
      width: 150,
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
      render: (a: any, b: any, c: any) => {
        console.log(a, b, c)
        return (
          <DoCon>
            <span>修改</span>
            <span>审核</span>
          </DoCon>
        )
      }
    }
  ]

  const [tableData, setTableData] = useState([])
  useEffect(() => {
    nurseFilesService.findByEmpNoSubmit(appStore.queryObj.empNo).then((res) => {
      setTableData(res.data)
    })
  }, [])

  return (
    <BaseLayout title='工作经历' btnList={btnList}>
      <BaseTable dataSource={tableData} columns={columns} />
      <editWorkHistoryModal.Component />
    </BaseLayout>
  )
})
const Wrapper = styled.div``

const DoCon = styled.div`
  display: flex;
  justify-content: space-around;
  font-size: 12px;
  color: ${(p) => p.theme.$mtc};
`
