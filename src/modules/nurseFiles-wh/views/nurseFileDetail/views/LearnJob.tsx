import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseLayout from '../components/BaseLayout'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { ColumnProps } from 'antd/lib/table'
import createModal from 'src/libs/createModal'

import { globalModal } from 'src/global/globalModal'
import { authStore } from 'src/stores'
import limitUtils from 'src/modules/nurseFiles-wh/views/nurseFileDetail/utils/limit.ts'
import Zimage from 'src/components/Zimage'
import { nurseFileDetailViewModal } from '../NurseFileDetailViewModal'
import EditLearnJobModal from '../modal/EditLearnJobModal'
import { nurseFilesService } from 'src/modules/nurseFiles-wh/services/NurseFilesService'
export interface Props extends RouteComponentProps {}
export default observer(function LearnJob() {
  const editLearnJobModal = createModal(EditLearnJobModal)
  const btnList = [
    {
      label: '添加',
      onClick: () => editLearnJobModal.show({ signShow: '添加' })
    }
  ]

  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      dataIndex: '1',
      key: '序号',
      render: (text: any, record: any, index: number) => index + 1,
      align: 'center',
      width: 55
    },
    {
      title: '起始时间',
      dataIndex: 'startDate',
      key: 'startDate',
      width: 120,
      align: 'center'
    },
    {
      title: '结束时间',
      dataIndex: 'endDate',
      key: 'endDate',
      width: 120,
      align: 'center'
    },
    {
      title: '任职学会名称',
      dataIndex: 'learnJobName',
      key: 'learnJobName',
      width: 120,
      align: 'center'
    },
    {
      title: '学会职位',
      dataIndex: 'learnPosition',
      key: 'learnPosition',
      width: 90,
      align: 'center'
    },
    {
      title: '学会级别',
      dataIndex: 'learnLevel',
      key: 'learnLevel',
      width: 90,
      align: 'center'
    },

    {
      title: '附件',
      dataIndex: 'fj',
      key: 'fj',
      width: 80,
      align: 'center',
      render: (text: any, row: any, index: any) => {
        return <DoCon>{row.urlImageOne ? <Zimage text='查看' list={row.urlImageOne.split(',')} /> : ''}</DoCon>
      }
    },
    {
      title: '状态',
      dataIndex: 'auditedStatusName',
      key: 'auditedStatusName',
      width: 120,
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
            {limitUtils(row) ? (
              <span
                onClick={() => {
                  editLearnJobModal.show({ data: row, signShow: '修改' })
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
                  type: 'nurseWHArticle',
                  title: '审核文章',
                  tableFormat: [
                    {
                      发表年份: `publicYear`,
                      杂志名称: `magazineName`
                    },
                    {
                      文章名称: `articleName`,
                      期刊号: `periodicalNumber`
                    },
                    {
                      卷号: `volumeNumber`,
                      起止页码: `pageNumber`
                    },
                    {
                      文章类别: `articleType`,
                      影响因子: `influencingFactors`
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
    nurseFilesService.commonfindByEmpNoSubmit('nurseWHLearnJob', appStore.queryObj.empNo).then((res) => {
      setTableData(res.data)
    })
  }
  useEffect(() => {
    getTableData()
  }, [])

  return (
    <BaseLayout title='所获奖励' btnList={btnList}>
      <BaseTable dataSource={tableData} columns={columns} surplusHeight={305} surplusWidth={250} type={['spaceRow']} />
      <editLearnJobModal.Component getTableData={getTableData} />
    </BaseLayout>
  )
})
const Wrapper = styled.div``
