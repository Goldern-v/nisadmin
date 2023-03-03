import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseLayout from '../components/BaseLayout'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { authStore, appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { ColumnProps } from 'antd/lib/table'
import createModal from 'src/libs/createModal'
// import EditWorkHistoryModal from '../modal/EditWorkHistoryModal'
import { nurseFilesService } from '../../../services/NurseFilesService'
// import { auditedStatusEnum } from 'src/libs/enum/common'
// import { globalModal } from 'src/global/globalModal'
// import limitUtils from '../utils/limit'
// import { openAuditModal } from '../config/auditModalConfig'
import { isSelf,editFlag } from './BaseInfo'
import Do from '../components/Do'
import EditMakeAwardsModal from '../modal/EditMakeAwardsModal'

export interface Props extends RouteComponentProps {}

export default observer(function MakeAwards() {
  const editMakeAwardsModal = createModal(EditMakeAwardsModal)
  const [tableData, setTableData] = useState([])
  const getTableData = () => {
    nurseFilesService.commonfindByEmpNoSubmit('nurseWHRewardExperience', appStore.queryObj.empNo).then((res) => {
      setTableData(res.data)
      // setGetId(res.data)
    })
  }
  const btnList = [
    {
      label: '添加',
      onClick: () =>
        editMakeAwardsModal.show({
          signShow: '添加'
        })
    }
  ]
  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      dataIndex: '',
      key: '1',
      render: (text: any, record: any, index: number) => index + 1,
      align: 'center',
      width: 60
    },
    {
      title: '年度',
      dataIndex: 'year',
      key: '2',
      width: 100,
      align: 'center'
    },
   
    {
      title: '嘉奖名称',
      dataIndex: 'rewardName',
      key: '4',
      width: 100,
      align: 'center'
    },
    
    {
      title: '状态',
      dataIndex: 'auditedStatusName',
      key: '',
      align: 'center',
      width: 120
    },
    Do('nurseWHRewardExperience', editMakeAwardsModal, getTableData)
  ]

  useEffect(() => {
    getTableData()
  }, [])

  return (
    <BaseLayout title='立功嘉奖' btnList={isSelf() || editFlag() ? btnList : []}>
      <BaseTable
        dataSource={tableData}
        columns={columns}
        surplusHeight={250}
        type={['spaceRow', 'fixedWidth']}
        tip={'填写说明：从院校毕业后参加工作开始填写，不含院内轮训。如毕业后在多个单位工作过，请按照时间顺序逐一填写'}
      />
      {/* <EditMakeAwardsModal */}
      <editMakeAwardsModal.Component getTableData={getTableData} />
    </BaseLayout>
  )
})
const Wrapper = styled.div``
