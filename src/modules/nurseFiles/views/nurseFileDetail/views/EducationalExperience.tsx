import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseLayout from '../components/BaseLayout'
import BaseTable from 'src/components/BaseTable'
import { authStore, appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { ColumnProps } from 'antd/lib/table'
import createModal from 'src/libs/createModal'
import EditEducationalExperienceModal from '../modal/EditEducationalExperienceModal'
import { nurseFilesService } from 'src/modules/nurseFiles/services/NurseFilesService'
import { globalModal } from 'src/global/globalModal'
import limitUtils from 'src/modules/nurseFiles/views/nurseFileDetail/utils/limit.ts'
import Zimage from 'src/components/Zimage'
export interface Props extends RouteComponentProps {}
export default observer(function EducationalExperience () {
  const editEducationalExperienceModal = createModal(EditEducationalExperienceModal)
  const btnList = [
    {
      label: '添加',
      onClick: () =>
        editEducationalExperienceModal.show({
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
      width: 60
    },
    {
      title: '就读时间',
      dataIndex: 'readTime',
      key: '2',
      width: 130,
      align: 'center'
    },
    {
      title: '毕业时间',
      dataIndex: 'graduationTime',
      key: '3',
      width: 130,
      align: 'center'
    },
    {
      title: '毕业学校',
      dataIndex: 'graduationSchool',
      key: '4',
      width: 100,
      align: 'center'
    },
    {
      title: '专业',
      dataIndex: 'readProfessional',
      key: '5',
      width: 100,
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
      title: '附件',
      dataIndex: 'fj',
      key: '7',
      width: 150,
      align: 'center',
      render: (text: any, row: any, index: any) => {
        return (
          <DoCon>
            {row.urlImageTwo && <Zimage text='毕业证' src={row.urlImageTwo} />}
            {row.urlImageOne && <Zimage text='学位证' src={row.urlImageOne} />}
          </DoCon>
        )
      }
    },
    {
      title: '状态',
      dataIndex: 'auditedStatusName',
      key: '8',
      width: 150,
      align: 'center'
    },
    {
      title: '操作',
      dataIndex: '9',
      key: '9',
      width: 100,
      align: 'center',
      render: (text: any, row: any, index: any) => {
        return (
          <DoCon>
            {limitUtils(row) ? (
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
              onClick={() => {
                globalModal.auditModal.show({
                  getTableData: getTableData,
                  id: row.id,
                  type: 'nurseMedicalEducation',
                  title: '审核特殊资格证',
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
                  fileData: [
                    {
                      毕业证: row.urlImageTwo,
                      学位证: row.urlImageOne
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
    nurseFilesService.nurseMedicalEducation(appStore.queryObj.empNo).then((res) => {
      setTableData(res.data)
    })
  }
  useEffect(() => {
    getTableData()
  }, [])
  return (
    <BaseLayout title='教育经历' btnList={btnList}>
      <BaseTable dataSource={tableData} columns={columns} surplusHeight={365} type={['spaceRow']} tip={'填写说明：记录专业教育经历，从第一学历至最高学历逐一填写。照片上传务必上传彩色原图、照片内容与学历信息内容一致。'}/>
      <editEducationalExperienceModal.Component getTableData={getTableData} />
    </BaseLayout>
  )
})
const Wrapper = styled.div``

const DoCon = styled.div`
  display: flex;
  justify-content: space-around;
  font-size: 12px;
  color: ${(p) => p.theme.$mtc};
  a {
    cursor: pointer;
  }
  span {
    cursor: pointer;
  }
`
