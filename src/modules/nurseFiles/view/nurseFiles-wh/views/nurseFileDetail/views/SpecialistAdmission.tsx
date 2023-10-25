import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseLayout from '../components/BaseLayout'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { ColumnProps } from 'antd/lib/table'
import createModal from 'src/libs/createModal'
import { nurseFilesService } from '../../../services/NurseFilesService'
import { isSelf, editFlag } from './BaseInfo'
import SpecialistAdmissionModal
  from "src/modules/nurseFiles/view/nurseFiles-wh/views/nurseFileDetail/modal/SpecialistAdmissionModal";
import Column from "antd/lib/table/Column";
import {message} from "antd";

export interface Props extends RouteComponentProps { }

export default observer(function SpecialistAdmission() {
  const specialistAdmissionModal = createModal(SpecialistAdmissionModal)
  const [tableData, setTableData] = useState([])
  const getTableData = () => {
    nurseFilesService.findByEmpNoByLyrm( appStore.queryObj.empNo).then((res) => {
      setTableData(res.data)
    })
  }
  const btnList = [
    {
      label: '添加',
      onClick: () => specialistAdmissionModal.show({ signShow: '添加',isAudit:false })
    }
  ]

  const columns: any = [
    {
      title: '序号',
      dataIndex: '',
      key: '序号',
      render: (text: any, record: any, index: number) => index + 1,
      align: 'center',
      width: 55
    },
    {
      title: '准入项目',
      dataIndex: 'admittedItem',
      key: 'admittedItem',
      width: 200,
      align: 'center',
    },
    {
      title: '申请理由',
      dataIndex: 'reason',
      key: 'reason',
      width: 120,
      align: 'center'

    },
    {
      title: '完成内容',
      dataIndex: 'content',
      key: 'content',
      width: 200,
      align: 'center',
    },
    {
      title: '夜班次数',
      dataIndex: 'nightShifts',
      key: 'nightShifts',
      width: 100,
      align: 'center'
    },
    {
      title: '状态',
      dataIndex: 'auditedStatusName',
      key: 'auditedStatusName',
      width: 80,
      align: 'center'
    },
    {
      title: '操作',
      dataIndex: 'volumeNumber',
      key: 'volumeNumber',
      width: 150,
      align: 'center',
      render: (text: any, row: any, c: any) => {
        return (
            <DoCon>
              {/*<span>修改</span>*/}
              <span onClick={() =>handleDetail(row.id)}>查看</span>
              <span onClick={()=>handleDelete(row.id)}>删除</span>
            </DoCon>
        )
      }
    },
    // Do('nurseWHArticle', editArticleModal, getTableData)
  ]
  const handleDetail =(id:number)=>{
    nurseFilesService.getLyrmById(id).then((res:any)=>{
      if(res.code =='200'){
        specialistAdmissionModal.show({ signShow: res.data.auditedStatusName,data:res.data,
        isAudit:['待审核', '已审核'].includes(res.data.auditedStatusName)
        })
      }
    })
  }
const handleDelete =(id:number)=>{
    nurseFilesService.deleteLyrmById(id).then((res:any)=>{
      message.success('删除成功')
      getTableData()
    })
}
  useEffect(() => {
    getTableData()
  }, [ appStore.queryObj.empNo])

  return (
    <BaseLayout title='专科准入' btnList={isSelf() || editFlag() ? btnList : []}>
      <BaseTable dataSource={tableData} columns={columns} surplusHeight={260} surplusWidth={250} type={['spaceRow']} />
      <specialistAdmissionModal.Component getTableData={getTableData} />
    </BaseLayout>
  )
})
