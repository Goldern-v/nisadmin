import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseLayout from '../components/BaseLayout'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { ColumnProps } from 'antd/lib/table'
import createModal from 'src/libs/createModal'
import EditAwardsModal from '../modal/EditAwardsModal'

import { globalModal } from 'src/global/globalModal'
import { authStore } from 'src/stores'
import limitUtils from '../utils/limit'
import Zimage from 'src/components/Zimage'
import { nurseFileDetailViewModal } from '../NurseFileDetailViewModal'
import { nurseFilesService } from '../../../services/NurseFilesService'
export interface Props extends RouteComponentProps { }
export default observer(function Awards() {
  const editAwardsModal = createModal(EditAwardsModal)
  const btnList = [
    {
      label: '添加',
      onClick: () => editAwardsModal.show({ signShow: '添加' })
    }
  ]

  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      render: (text: any, record: any, index: number) => index + 1,
      align: 'center',
      width: 55
    },
    {
      title: '获奖时间',
      dataIndex: 'time',
      width: 120,
      align: 'center'
    },
    {
      title: '奖项名称',
      dataIndex: 'awardWinningName',
      width: 220,
      align: 'center'
    },
    {
      title: '本人排名',
      dataIndex: 'rank',
      width: 90,
      align: 'center'
    },
    {
      title: '奖项级别',
      dataIndex: 'awardlevel',
      width: 90,
      align: 'center'
    },
    {
      title: '授奖机构',
      dataIndex: 'approvalAuthority',
      width: 90,
      align: 'center'
    },
    {
      title: '附件',
      width: 80,
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
            {limitUtils(row) ? (
              <span
                onClick={() => {
                  editAwardsModal.show({ data: row, signShow: '修改' })
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
                  type: 'nurseAwardWinning',
                  title: '审核所获奖励',
                  tableFormat: [
                    {
                      获奖时间: `time`,
                      奖项名称: `awardWinningName`
                    },
                    {
                      本人排名: `rank`,
                      奖项级别: `awardlevel`
                    },
                    {
                      授奖机构: `approvalAuthority`
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
    nurseFilesService.nurseAwardWinning(appStore.queryObj.empNo).then((res) => {
      setTableData(res.data)
    })
  }
  useEffect(() => {
    getTableData()
  }, [])

  return (
    <BaseLayout title='所获奖励' btnList={btnList}>
      <BaseTable
        dataSource={tableData}
        columns={columns}
        surplusHeight={305}
        // type={['spaceRow']}
        tip={
          '填表说明：登记2010年及以后时间所获得的省市级以上奖励，如为团体奖励，请注明排名情况，授奖级别是指省级（或市级）/一（二、三、优秀）等奖。批准机关指证书盖章单位名称。'
        }
      />
      <editAwardsModal.Component getTableData={getTableData} />
    </BaseLayout>
  )
})
const Wrapper = styled.div``
