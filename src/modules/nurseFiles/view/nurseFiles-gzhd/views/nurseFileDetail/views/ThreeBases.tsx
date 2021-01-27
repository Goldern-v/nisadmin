import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseLayout from '../components/BaseLayout'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { authStore, appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { ColumnProps } from 'antd/lib/table'
import createModal from 'src/libs/createModal'
import EditThreeBasesModal from '../modal/EditThreeBasesModal'
import { nurseFilesService } from '../../../services/NurseFilesService'
import { globalModal } from 'src/global/globalModal'
import limitUtils from '../utils/limit'
import Zimage from 'src/components/Zimage'

export interface Props extends RouteComponentProps { }

export default observer(function ThreeBases() {
  const editThreeBasesModal = createModal(EditThreeBasesModal)

  const btnList = appStore.selfNurseFile ? [
    {
      label: '添加',
      onClick: () =>
        editThreeBasesModal.show({
          signShow: '添加'
        })
    }
  ] : []

  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      render: (text: any, record: any, index: number) => index + 1,
      align: 'center',
      width: 60
    },
    {
      title: '年度',
      dataIndex: 'year',
      width: 100,
      align: 'center'
    },
    {
      title: '理论考核成绩(分)',
      dataIndex: 'theoryScore',
      width: 120,
      align: 'center'
    },
    {
      title: '操作考核成绩(分)',
      dataIndex: 'technologyScore',
      width: 120,
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
            {appStore.selfNurseFile ? (
              <span
                onClick={() => {
                  editThreeBasesModal.show({ data: row, signShow: '修改' })
                }}
              >
                修改
              </span>
            ) : (
                ''
              )}

            <span
              onClick={() => handlePreviewOrAudit(row)}
            >
              {limitUtils(row) && appStore.selfNurseFile ? '审核' : '查看'}
            </span>
            {appStore.selfNurseFile && (
              <span onClick={() => handleDelete(row)}>删除</span>
            )}
          </DoCon>
        )
      }
    }
  ]

  const [tableData, setTableData] = useState([])
  const getTableData = () => {
    nurseFilesService.nurseHospitalsThreeBase(appStore.queryObj.empNo).then((res) => {
      setTableData(res.data)
    })
  }

  const handlePreviewOrAudit = (row: any) => {
    globalModal.auditModal.show({
      getTableData: getTableData,
      id: row.id,
      type: 'nurseHospitalsThreeBase',
      title: '审核医院三基考核',
      tableFormat: [
        {
          年度: `year`,
          理论考核成绩_分: `theoryScore`
        },
        {
          操作考核成绩_分: `technologyScore`
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
  }

  const handleDelete = (row: any) => {
    globalModal.confirm('删除确定', '你确定要删除该记录吗?')
      .then(() => nurseFilesService.commonDelById('nurseHospitalsThreeBase', row.id))
      .then(() => getTableData())
  }

  useEffect(() => {
    getTableData()
  }, [])

  return (
    <BaseLayout title='医院三基考核' btnList={btnList}>
      <BaseTable
        dataSource={tableData}
        columns={columns}
        surplusHeight={305}
        type={['fixedWidth']}
        tip={'无需填写，由培训模块自动导入。'}
      />
      <editThreeBasesModal.Component getTableData={getTableData} />
    </BaseLayout>
  )
})
const Wrapper = styled.div``
