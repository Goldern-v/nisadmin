import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseLayout from '../components/BaseLayout'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import {  appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { ColumnProps } from 'antd/lib/table'
import createModal from 'src/libs/createModal'
import EditEducationalExperienceModal from '../modal/EditEducationalExperienceModal'
import { nurseFilesService } from '../../../services/NurseFilesService'
import Zimage from 'src/components/Zimage'
import { isSelf, editFlag } from './BaseInfo'
import Do from '../components/Do'
export interface Props extends RouteComponentProps { }
export default observer(function EducationalExperience() {
  const editEducationalExperienceModal = createModal(EditEducationalExperienceModal)
  const [tableData, setTableData] = useState([])
  const getTableData = () => {
    nurseFilesService.commonfindByEmpNoSubmit('nurseWHMedicalEducation', appStore.queryObj.empNo).then((res) => {
      setTableData(res.data)
    })
  }
  const btnList = [
    {
      label: '添加',
      onClick: () =>
        editEducationalExperienceModal.show({
          signShow: '添加'
        })
    }
  ]
  const columns: ColumnProps<any>[] = ['zhzxy'].includes(appStore.HOSPITAL_ID) ? [
    {
      title: '序号',
      dataIndex: '',
      key: '1',
      render: (text: any, record: any, index: number) => index + 1,
      align: 'center',
      width: 60
    },
    {
      title: '就读时间',
      dataIndex: 'readTime',
      key: '2',
      width: 120,
      align: 'center'
    },
    {
      title: '毕业时间',
      dataIndex: 'graduationTime',
      key: '3',
      width: 120,
      align: 'center'
    },
    {
      title: '毕业学校',
      dataIndex: 'graduationSchool',
      key: '4',
      width: 140,
      align: 'center'
    },
    {
      title: '就读专业',
      dataIndex: 'readProfessional',
      key: '5',
      width: 120,
      align: 'center'
    },
    {
      title: '学历',
      dataIndex: 'education',
      key: '6',
      width: 100,
      align: 'center'
    },
    {
      title: '学位',
      dataIndex: 'degree',
      key: 'degree',
      width: 100,
      align: 'center'
    },
    {
      title: '工作单位',
      dataIndex: 'workCompany',
      key: '8',
      width: 120,
      align: 'center'
    },
    {
      title: '附件',
      dataIndex: 'fj',
      key: '7',
      width: 100,
      align: 'center',
      render: (text: any, row: any, index: any) => {
        return <DoCon>{row.urlImageOne ? <Zimage text='查看' list={row.urlImageOne.split(',')} /> : ''}</DoCon>
      }
    },
    Do('nurseWHMedicalEducation', editEducationalExperienceModal, getTableData)
  ] : [
    {
      title: '序号',
      dataIndex: '',
      key: '1',
      render: (text: any, record: any, index: number) => index + 1,
      align: 'center',
      width: 60
    },
    {
      title: '就读时间',
      dataIndex: 'readTime',
      key: '2',
      width: 120,
      align: 'center'
    },
    {
      title: '毕业时间',
      dataIndex: 'graduationTime',
      key: '3',
      width: 120,
      align: 'center'
    },
    {
      title: '毕业学校',
      dataIndex: 'graduationSchool',
      key: '4',
      width: 140,
      align: 'center'
    },
    {
      title: '就读专业',
      dataIndex: 'readProfessional',
      key: '5',
      width: 120,
      align: 'center'
    },
    {
      title: '学历',
      dataIndex: 'education',
      key: '6',
      width: 100,
      align: 'center'
    },
    {
      title: '学位',
      dataIndex: 'degree',
      key: 'degree',
      width: 100,
      align: 'center'
    },
    {
      title: '附件',
      dataIndex: 'fj',
      key: '7',
      width: 100,
      align: 'center',
      render: (text: any, row: any, index: any) => {
        return <DoCon>{row.urlImageOne ? <Zimage text='查看' list={row.urlImageOne.split(',')} /> : ''}</DoCon>
      }
    },
    Do('nurseWHMedicalEducation', editEducationalExperienceModal, getTableData)
  ]

  useEffect(() => {
    getTableData()
  }, [])
  return (
    <BaseLayout title='护理专业教育及工作经历' btnList={isSelf() || editFlag() ? btnList : []}>
      <BaseTable
        dataSource={tableData}
        columns={columns}
        surplusHeight={255}
        type={['spaceRow']}
      />
      <editEducationalExperienceModal.Component getTableData={getTableData} />
    </BaseLayout>
  )
})
const Wrapper = styled.div``
