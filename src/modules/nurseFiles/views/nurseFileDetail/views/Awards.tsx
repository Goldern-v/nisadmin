import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseLayout from '../components/BaseLayout'
import BaseTable from 'src/components/BaseTable'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { ColumnProps } from 'antd/lib/table'
import createModal from 'src/libs/createModal'
import EditAwardsModal from '../modal/EditAwardsModal'
import { nurseFilesService } from 'src/modules/nurseFiles/services/NurseFilesService'
import { globalModal } from 'src/global/globalModal'
import { authStore } from 'src/stores'
export interface Props extends RouteComponentProps {}
export default observer(function Awards () {
  const editAwardsModal = createModal(EditAwardsModal)
  const btnList = [
    {
      label: '添加',
      onClick: () => editAwardsModal.show({ signShow: '添加' })
    }
  ]
  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号'
    },
    {
      key: '2',
      name: '杨春',
      age: 24,
      address: '西湖区湖底公园1号'
    },
    {
      key: '3',
      name: '赵平',
      age: 34,
      address: '西湖区湖底公园1号'
    },
    {
      key: '4',
      name: '易小惠',
      age: 33,
      address: '西湖区湖底公园1号'
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
      title: '时间',
      dataIndex: 'time',
      key: '2',
      width: 150,
      align: 'center'
    },
    {
      title: '获奖/推广创新项目名称',
      dataIndex: 'awardWinningName',
      key: '3',
      width: 220,
      align: 'center'
    },
    {
      title: '本人排名',
      dataIndex: 'rank',
      key: '4',
      width: 100,
      align: 'center'
    },
    {
      title: '授奖级别',
      dataIndex: 'awardlevel',
      key: '5',
      width: 200,
      align: 'center'
    },
    {
      title: '批准机关',
      dataIndex: 'approvalAuthority',
      key: '6',
      width: 150,
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
      dataIndex: '8',
      key: '8',
      width: 100,
      align: 'center',
      render: (text: any, row: any, index: number) => {
        return (
          <DoCon>
            <span
              onClick={() => {
                editAwardsModal.show({ data: row, signShow: '修改' })
              }}
            >
              修改
            </span>
            {(authStore.post === '护长' && row.auditedStatusName === '待护士长审核') ||
              authStore.post === '护理部' ||
              (authStore.post === '护理部主任' && row.auditedStatusName === '待护理部审核') ||
              (row.auditedStatusName === '待护理部主任审核' && (
                <span
                  onClick={() => {
                    globalModal.auditModal.show({
                      id: row.id,
                      type: 'nurseAwardWinning',
                      title: '审核所获奖励',
                      tableFormat: [
                        {
                          时间: `time`,
                          获奖_推广创新项目名称: `awardWinningName`
                        },
                        {
                          本人排名: `rank`,
                          授奖级别: `awardlevel`
                        },
                        {
                          批准机关: `approvalAuthority`
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
              ))}
          </DoCon>
        )
      }
    }
  ]
  const [tableData, setTableData] = useState([])
  const getTableData = () => {
    nurseFilesService.nurseAwardWinning(appStore.queryObj.empNo).then((res) => {
      setTableData(res.data)
    })
  }
  useEffect(() => {
    getTableData()
  }, [])

  return (
    <BaseLayout title='所获奖励' btnList={btnList}>
      <BaseTable dataSource={tableData} columns={columns} surplusHeight={365} type={['spaceRow', 'fixedWidth']} />
      <editAwardsModal.Component getTableData={getTableData} />
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
