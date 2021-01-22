import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseLayout from '../components/BaseLayout'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { authStore, appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { ColumnProps } from 'antd/lib/table'
import createModal from 'src/libs/createModal'
import EditEducationalExperienceModal from '../modal/EditEducationalExperienceModal'
import { nurseFilesService } from '../../../services/NurseFilesService'
import { globalModal } from 'src/global/globalModal'
import limitUtils from '../utils/limit'
import Zimage from 'src/components/Zimage'

export interface Props extends RouteComponentProps { }

export default observer(function EducationalExperience() {
  const editEducationalExperienceModal = createModal(EditEducationalExperienceModal)

  const btnList = appStore.selfNurseFile ? [
    {
      label: '添加',
      onClick: () =>
        editEducationalExperienceModal.show({
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
      title: '就读时间',
      dataIndex: 'readTime',
      width: 120,
      align: 'center'
    },
    {
      title: '毕业时间',
      dataIndex: 'graduationTime',
      width: 120,
      align: 'center'
    },
    {
      title: '毕业学校',
      dataIndex: 'graduationSchool',
      width: 120,
      align: 'center'
    },
    {
      title: '专业',
      dataIndex: 'readProfessional',
      width: 120,
      align: 'center'
    },
    {
      title: '学历',
      dataIndex: 'education',
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
      render: (text: any, row: any, index: any) => {
        return (
          <DoCon>
            {appStore.selfNurseFile ? (
              <span
                onClick={() => {
                  editEducationalExperienceModal.show({ data: row, signShow: '修改' })
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
              {limitUtils(row) && !appStore.selfNurseFile ? '审核' : '查看'}
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
    nurseFilesService.nurseMedicalEducation(appStore.queryObj.empNo).then((res) => {
      setTableData(res.data)
    })
  }

  const handlePreviewOrAudit = (row: any) => {
    globalModal.auditModal.show({
      getTableData: getTableData,
      id: row.id,
      type: 'nurseMedicalEducation',
      title: '审核教育经历',
      tableFormat: [
        {
          就读时间: `readTime`,
          毕业时间: `graduationTime`
        },
        {
          毕业学校: `graduationSchool`,
          专业: `readProfessional`
        },
        {
          学历: `education`
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
      .then(() => nurseFilesService.commonDelById('nurseWorkExperience', row.id))
      .then(() => getTableData())
  }

  useEffect(() => {
    getTableData()
  }, [])

  return (
    <BaseLayout title='教育经历' btnList={btnList}>
      <BaseTable
        dataSource={tableData}
        columns={columns}
        surplusHeight={365}
        tip={
          '填写说明：记录专业教育经历，从第一学历至最高学历逐一填写。照片上传务必上传彩色原图、照片内容与学历信息内容一致。'
        }
      />
      <editEducationalExperienceModal.Component getTableData={getTableData} />
    </BaseLayout>
  )
})
const Wrapper = styled.div``
