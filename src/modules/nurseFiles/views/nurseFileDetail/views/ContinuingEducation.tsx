import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseLayout from '../components/BaseLayout'
import BaseTable from 'src/components/BaseTable'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { ColumnProps } from 'antd/lib/table'
import createModal from 'src/libs/createModal'
import EditContinuingEducationModal from '../modal/EditContinuingEducationModal'
import { globalModal } from 'src/global/globalModal'
import { nurseFilesService } from 'src/modules/nurseFiles/services/NurseFilesService'
export interface Props extends RouteComponentProps {}
export default observer(function EducationalExperience () {
  const editContinuingEducationModal = createModal(EditContinuingEducationModal)
  const btnList = [
    {
      label: '添加',
      onClick: () =>
        editContinuingEducationModal.show({
          signShow: '添加'
        })
    }
  ]
  // 附件属性是什么
  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
      ksTime: '2015-09',
      jsTime: '2017-07',
      pxDW: '护理职工学院',
      pxLR: '全程护理',
      xs: '376',
      fj: '有',
      zt: '待护士长审核'
    },
    {
      key: '2',
      name: '杨平',
      age: 28,
      address: '西湖区湖底公园1号',
      ksTime: '2014-09',
      jsTime: '2016-07',
      pxDW: '护理职工学院',
      pxLR: '全程护理',
      xs: '376',
      fj: '有',
      zt: '待护士长审核'
    },
    {
      key: '3',
      name: '赵立',
      age: 29,
      address: '西湖区湖底公园1号',
      ksTime: '2013-09',
      jsTime: '2015-07',
      pxDW: '护理职工学院',
      pxLR: '全程护理',
      xs: '376',
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
      width: 80
    },
    {
      title: '开始时间',
      dataIndex: 'startTime',
      key: '2',
      width: 150,
      align: 'center'
    },
    {
      title: '结束时间',
      dataIndex: 'startTime',
      key: '3',
      width: 150,
      align: 'center'
    },
    {
      title: '培训单位',
      dataIndex: 'trainingUnit',
      key: '4',
      width: 200,
      align: 'center'
    },
    {
      title: '培训内容',
      dataIndex: 'trainingContent',
      key: '5',
      width: 200,
      align: 'center'
    },
    {
      title: '学时',
      dataIndex: 'hours',
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
      render: (a: any, row: any, c: any) => {
        return (
          <DoCon>
            {row.urlImageOne && (
              <a href={row.urlImageOne} target='_blank'>
                查看{' '}
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
      render: (text: any, row: any, index: number) => {
        return (
          <DoCon>
            <span
              onClick={() => {
                editContinuingEducationModal.show({ data: row, signShow: '修改' })
              }}
            >
              修改
            </span>
            <span
              onClick={() => {
                globalModal.auditModal.show({
                  id: row.id,
                  type: 'nurseContinuingEducation',
                  title: '审核继续教育',
                  tableFormat: [
                    {
                      开始时间: `startTime`,
                      结束时间: `startTime`
                    },
                    {
                      培训单位: `trainingUnit`,
                      培训内容: `trainingContent`
                    }
                  ],
                  fileData: [
                    {
                      附件1: row.urlImageOne,
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
    nurseFilesService.nurseContinuingEducation(appStore.queryObj.empNo).then((res) => {
      setTableData(res.data)
    })
  }
  useEffect(() => {
    getTableData()
  }, [])
  return (
    <BaseLayout title='继续教育' btnList={btnList}>
      <BaseTable dataSource={tableData} columns={columns} surplusHeight={365} type={['spaceRow', 'fixedWidth']} />
      <editContinuingEducationModal.Component getTableData={getTableData} />
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
