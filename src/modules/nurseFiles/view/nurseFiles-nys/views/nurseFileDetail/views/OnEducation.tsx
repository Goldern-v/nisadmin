import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseLayout from '../components/BaseLayout'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { Modal } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import createModal from 'src/libs/createModal'
import EditOnEducationModal from '../modal/EditOnEducationModal'

import { globalModal } from 'src/global/globalModal'
import { authStore } from 'src/stores'
import limitUtils from '../utils/limit'
import Zimage from 'src/components/Zimage'
import { nurseFileDetailViewModal } from '../NurseFileDetailViewModal'
import { nurseFilesService } from '../../../services/NurseFilesService'
import { message } from 'antd/es'
export interface Props extends RouteComponentProps { }
export default observer(function Awards() {
  const editOnEducationModal = createModal(EditOnEducationModal)
  const btnList = [
    {
      label: '添加',
      onClick: () => editOnEducationModal.show({ signShow: '添加' })
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
      title: '进修专业',
      dataIndex: 'studyMajor',
      key: 'studyMajor',
      width: 200,
      align: 'center'
    },
    {
      title: '进修单位',
      dataIndex: 'unit',
      key: 'unit',
      width: 210,
      align: 'center'
    },
    {
      title: '进修单位所属地',
      dataIndex: 'unitLocal',
      key: 'unitLocal',
      width: 110,
      align: 'center'
    },
    {
      title: '进修开始时间',
      dataIndex: 'startDate',
      key: 'winningYear',
      width: 100,
      align: 'center'
    },
    {
      title: '进修结束时间',
      dataIndex: 'endDate',
      key: 'endDate',
      width: 100,
      align: 'center'
    },
    {
      title: '进修时长(天)',
      dataIndex: 'studyHour',
      key: 'studyHour',
      width: 80,
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
              <React.Fragment>
                <span
                  onClick={() => {
                    editOnEducationModal.show({ data: row, signShow: '修改' })
                  }}
                >
                  修改
              </span>
                <span onClick={() => deleteRecord(row.id)}>删除</span>
              </React.Fragment>
            ) : (
                ''
              )}

            <span
              onClick={() => {
                globalModal.auditModal.show({
                  getTableData: getTableData,
                  id: row.id,
                  empNo: row.empNo || row.commiterNo,
                  type: 'nurseOutStudy',
                  title: '审核外出进修',
                  tableFormat: [
                    {
                      进修专业: `studyMajor`,
                      进修单位: `unit`
                    },
                    {
                      进修单位所属地: `unitLocal`,
                      进修开始时间: `startDate`
                    },
                    {
                      进修结束时间: `endDate`,
                      '进修时长(天)': `studyHour`
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
    nurseFilesService
      .onEducationNoSubmit('nurseOutStudy', appStore.queryObj.empNo)
      .then((res) => {
        setTableData(res.data)
      })
  }

  const deleteRecord = (id: string) => {
    Modal.confirm({
      title: '提示',
      content: '是否删除该记录?',
      centered: true,
      onOk: () => {
        nurseFilesService
          .onEducationDelById('nurseOutStudy', id)
          .then(res => {
            message.success('删除成功')
            getTableData()
          })

      }
    })
  }
  useEffect(() => {
    getTableData()
  }, [])

  return (
    <BaseLayout title='外出进修' btnList={btnList}>
      <BaseTable
        dataSource={tableData}
        columns={columns}
        surplusHeight={305}
      // // type={['spaceRow']}
      // tip={
      //   '填表说明：登记2010年及以后时间所获得的省市级以上奖励，如为团体奖励，请注明排名情况，授奖级别是指省级（或市级）/一（二、三、优秀）等奖。批准机关指证书盖章单位名称。'
      // }
      />
      <editOnEducationModal.Component getTableData={getTableData} />
    </BaseLayout>
  )
})
const Wrapper = styled.div``
