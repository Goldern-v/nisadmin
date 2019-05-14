import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseLayout from '../components/BaseLayout'
import BaseTable from 'src/components/BaseTable'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { ColumnProps } from 'antd/lib/table'
import createModal from 'src/libs/createModal'
import EditExaminationResultsModal from '../modal/EditExaminationResultsModal'
import { nurseFilesService } from 'src/modules/nurseFiles/services/NurseFilesService'

export interface Props extends RouteComponentProps {}
export default observer(function ExaminationResults () {
  const editExaminationResultsModal = createModal(EditExaminationResultsModal)
  const btnList = [
    {
      label: '添加',
      onClick: () =>
        editExaminationResultsModal.show({
          id: '12'
        })
    }
  ]
  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      ld: '2016',
      khjg: '优秀',
      fj: '有',
      zt: '待护士长审核'
    },
    {
      key: '2',
      name: '赵立',
      age: 36,
      ld: '2014',
      khjg: '优秀',
      fj: '有',
      zt: '待护士长审核'
    },
    {
      key: '3',
      name: '杨志勇',
      age: 29,
      ld: '2015',
      khjg: '优秀',
      fj: '有',
      zt: '待护士长审核'
    },
    {
      key: '2',
      name: '谢县',
      age: 33,
      ld: '2016',
      khjg: '优秀',
      fj: '有',
      zt: '待护士长审核'
    },
    {
      key: '2',
      name: '毛利',
      age: 29,
      ld: '2017',
      khjg: '优秀',
      fj: '有',
      zt: '待护士长审核'
    }
  ]

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
      title: '年度',
      dataIndex: 'year',
      key: '2',
      width: 100,
      align: 'center'
    },
    {
      title: '考核结果',
      dataIndex: 'checkResult',
      key: '3',
      width: 200,
      align: 'center'
    },
    {
      title: '附件',
      dataIndex: 'urllmageOne',
      key: '6',
      width: 150,
      align: 'center'
    },
    {
      title: '状态',
      dataIndex: 'auditedStatusName',
      key: '61',
      width: 150,
      align: 'center'
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
  const getTableData = () => {
    nurseFilesService.nurseYearCheck(appStore.queryObj.empNo).then((res) => {
      setTableData(res.data)
    })
  }
  useEffect(() => {
    getTableData()
  }, [])

  return (
    <BaseLayout title='年度履职考核结果' btnList={btnList}>
      <BaseTable dataSource={tableData} columns={columns} />
      <editExaminationResultsModal.Component getTableData={getTableData} />
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
