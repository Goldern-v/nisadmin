import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseLayout from '../components/BaseLayout'
import BaseTable from 'src/components/BaseTable'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { ColumnProps } from 'antd/lib/table'
import createModal from 'src/libs/createModal'
import EditThreeBasesModal from '../modal/EditThreeBasesModal'
import { nurseFilesService } from 'src/modules/nurseFiles/services/NurseFilesService'
import { globalModal } from 'src/global/globalModal'

export interface Props extends RouteComponentProps {}
export default observer(function ThreeBases () {
  const editThreeBasesModal = createModal(EditThreeBasesModal)
  const btnList = [
    {
      label: '添加',
      onClick: () =>
        editThreeBasesModal.show({
          signShow: '添加 '
        })
    }
  ]
  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
      nd: '2018',
      lnkf: '89',
      czkf: '93',
      fj: '有',
      zt: '已审核'
    },
    {
      key: '2',
      name: '杨春',
      age: 24,
      address: '西湖区湖底公园1号',
      nd: '2018',
      lnkf: '84',
      czkf: '86',
      fj: '有',
      zt: '已审核'
    },
    {
      key: '3',
      name: '赵平',
      age: 34,
      address: '西湖区湖底公园1号',
      nd: '2018',
      lnkf: '79',
      czkf: '91',
      fj: '有',
      zt: '已审核'
    },
    {
      key: '4',
      name: '易小惠',
      age: 33,
      address: '西湖区湖底公园1号',
      nd: '2018',
      lnkf: '86',
      czkf: '89',
      fj: '有',
      zt: '已审核'
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
      title: '理论考核成绩(分)',
      dataIndex: 'theoryScore',
      key: '3',
      width: 200,
      align: 'center'
    },
    {
      title: '操作考核成绩(分)',
      dataIndex: 'technologyScore',
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
              <a href={row.urlImageOne} target='_blank'>
                查看
              </a>
            )}
          </DoCon>
        )
      }
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
      dataIndex: 'cz',
      key: '8',
      width: 100,
      align: 'center',
      render: (text: any, row: any, index: number) => {
        return (
          <DoCon>
            <span
              onClick={() => {
                editThreeBasesModal.show({ data: row, signShow: '修改' })
              }}
            >
              修改
            </span>
            <span
              onClick={() => {
                globalModal.auditModal.show({
                  id: row.id,
                  type: 'nurseHospitalsThreeBase',
                  title: '审核特殊资格证',
                  tableFormat: [
                    {
                      年度: `year`,
                      理论考核成绩_分: `theoryScore`
                    },
                    {
                      操作考核成绩_分: `technologyScore`
                    }
                  ],
                  fileData: [
                    {
                      附件1: row.urlImageOne,
                      附件2: require(`../../../images/证件空态度.png`)
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
    nurseFilesService.nurseHospitalsThreeBase(appStore.queryObj.empNo).then((res) => {
      setTableData(res.data)
    })
  }
  useEffect(() => {
    getTableData()
  }, [])

  return (
    <BaseLayout title='医院三基考核' btnList={btnList}>
      <BaseTable dataSource={tableData} columns={columns} surplusHeight={365} type={['spaceRow', 'fixedWidth']} />
      <editThreeBasesModal.Component getTableData={getTableData} />
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
