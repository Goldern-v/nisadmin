import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseLayout from '../components/BaseLayout'
import BaseTable from 'src/components/BaseTable'
import { authStore, appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { ColumnProps } from 'antd/lib/table'
import createModal from 'src/libs/createModal'
import EditWritingsModal from '../modal/EditWritingsModal'
import { nurseFilesService } from 'src/modules/nurseFiles/services/NurseFilesService'
import limitUtils from 'src/modules/nurseFiles/views/nurseFileDetail/utils/limit.ts'
import { globalModal } from 'src/global/globalModal'
import Zimage from 'src/components/Zimage'
export interface Props extends RouteComponentProps {}
export default observer(function Writings () {
  const editWritingsModal = createModal(EditWritingsModal)
  const btnList = [
    {
      label: '添加',
      onClick: () =>
        editWritingsModal.show({
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
      title: '发表日期',
      dataIndex: 'publicDate',
      key: '2',
      width: 140,
      align: 'center'
    },
    {
      title: '题目',
      dataIndex: 'title',
      key: '3',
      width: 150,
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
      title: '出版或刊登物',
      dataIndex: 'publication',
      key: '5',
      width: 150,
      align: 'center'
    },
    {
      title: '附件',
      dataIndex: 'fj',
      key: '6',
      width: 120,
      align: 'center',
      render: (text: any, row: any, index: any) => {
        return <DoCon>{row.urlImageOne && <Zimage text='查看' src={row.urlImageOne} />}</DoCon>
      }
    },
    {
      title: '状态',
      dataIndex: 'auditedStatusName',
      key: '61',
      width: 120,
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
            {limitUtils(row) ? (
              <span
                onClick={() => {
                  editWritingsModal.show({ data: row, signShow: '修改' })
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
                  type: 'nursePaperExperience',
                  title: '审核著作译文论文',
                  tableFormat: [
                    {
                      发表日期: `publicDate`,
                      题目: `title`
                    },
                    {
                      本人排名: `rank`,
                      出版或刊登物: `publication`
                    }
                  ],
                  fileData: [
                    {
                      附件1: row.urlImageOne
                      // 附件2: require(`../../../images/证件空态度.png`)
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
    nurseFilesService.nursePaperExperience(appStore.queryObj.empNo).then((res) => {
      setTableData(res.data)
    })
  }
  useEffect(() => {
    getTableData()
  }, [])

  return (
    <BaseLayout title='著作译文论文' btnList={btnList}>
      <BaseTable dataSource={tableData} columns={columns} surplusHeight={305} type={['spaceRow', 'fixedWidth']} tip={'填写说明：登记2010年以后发表的著作专利课题论文新技术新业务情况， 其中所登记的论文要求为第一作者或通讯作者，第二及以后排名的不需要登记；新技术新业务前三名要求登记，第四名及以后排名不需登记。'}/>
      <editWritingsModal.Component getTableData={getTableData} />
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
