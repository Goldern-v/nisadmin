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
export interface Props extends RouteComponentProps {}
export default observer(function EducationalExperience () {
  // 保存表格每行数据
  const [rowData, setRowData] = useState({ id: '', urlImageOne: '', urlImageTwo: '', auditedStatusName: '' })
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
  // 审核组件
  const AuditComponent = (
    <span
      onClick={() => {
        globalModal.auditModal.show({
          id: rowData.id,
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
              毕业证: rowData.urlImageTwo,
              学位证: rowData.urlImageOne
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
      width: 80
    },
    {
      title: '就读时间',
      dataIndex: 'readTime',
      key: '2',
      width: 150,
      align: 'center'
    },
    {
      title: '毕业时间',
      dataIndex: 'graduationTime',
      key: '3',
      width: 150,
      align: 'center'
    },
    {
      title: '毕业学校',
      dataIndex: 'graduationSchool',
      key: '4',
      width: 200,
      align: 'center'
    },
    {
      title: '专业',
      dataIndex: 'readProfessional',
      key: '5',
      width: 200,
      align: 'center'
    },
    {
      title: '学历',
      dataIndex: 'education',
      key: '6',
      width: 150,
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
            {row.urlImageTwo && (
              <a href={row.urlImageTwo} target='_blank'>
                毕业证
              </a>
            )}
            {row.urlImageOne && (
              <a href={row.urlImageOne} target='_blank'>
                学位证{' '}
              </a>
            )}
          </DoCon>
        )
      }
    },
    {
      title: '状态',
      dataIndex: 'auditedStatusName',
      key: '8',
      width: 200,
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
            {/* 保存行数据 */}
            {setRowData(row)}
            <span
              onClick={() => {
                editEducationalExperienceModal.show({ data: row, signShow: '修改' })
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
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log(count, setCount)
  })
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
      <BaseTable dataSource={tableData} columns={columns} surplusHeight={365} />
      <editEducationalExperienceModal.Component getTableData={getTableData} type={['spaceRow', 'fixedWidth']} />
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
