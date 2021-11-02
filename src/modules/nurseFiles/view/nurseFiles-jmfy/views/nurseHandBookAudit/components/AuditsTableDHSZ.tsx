import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
// import { RouteComponentProps } from 'react-router'
import BaseTable, { DoCon } from 'src/components/BaseTable'
// import windowHeight from 'src/hooks/windowHeight'
import { nurseFilesService } from '../../../services/NurseFilesService'
import store, { appStore } from 'src/stores'
// import AuditText from './auditText/AuditText'
import emitter from 'src/libs/ev'
import { Button } from 'antd'
import { globalModal } from 'src/global/globalModal'
import { getTitle } from '../../nurseFileDetail/config/title'
import { openAuditModal } from '../../nurseFileDetail/config/auditModalConfig'
import { message } from 'src/vendors/antd'
import FormPageBody from '../../../../../../nurseHandBook/components/FormPageBody'
import GroupsAduitModalJM from 'src/global/modal/GroupsAduitModal-jm'
import createModal from 'src/libs/createModal'

export interface Props {
  type: string
  needAudit: boolean
  active: boolean
}

export default function AuditsTableDHSZ(props: Props) {
  let { type, needAudit } = props
  let { empName, post, deptName, nurseHierarchy, nearImageUrl } = store.appStore.queryObj
  const [tableData, setTableData] = useState([])
  const [current, setCurrent] = useState(1)
  const [total, setTotal] = useState(0)
  const [pageSize, setPageSize] = useState(20)
  const [selectedRows, setSelectedRows] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [loading, setLoading] = useState(false)
  const [editVisible2, setEditVisible2] = useState(false)
  const [pathChange, setPathChange] = useState("")
  const [idChange, setIdChange] = useState("")
  const groupsAduitModalJM = createModal(GroupsAduitModalJM)

  const toDetails = (record: any) => {
    // openAuditModal(
    //   getTitle(row.othersMessage.auditedEntityName),
    //   { ...row.othersMessage, id: row.othersMessage.fileId, empNo: appStore.queryObj.empNo, saveStatus: row.othersMessage.auditedEntityName },
    //   () => emitter.emit('refreshNurseAuditTable')
    // )
    appStore.history.push(`/nurseHandBookDetailView/?type=${record.auditedManageDto.entityName}&&id=${record.auditedManageDto.fileId}&&fileId=${record.auditedManageDto.id}&&audit=1&&isAdd=`)
  }
  
  const onEdit = (record: any) => {
    // openAuditModal(
    //   getTitle(row.othersMessage.auditedEntityName),
    //   { ...row.othersMessage, id: row.othersMessage.fileId, empNo: appStore.queryObj.empNo, saveStatus: row.othersMessage.auditedEntityName },
    //   () => emitter.emit('refreshNurseAuditTable')
    // )
    appStore.history.push(`/nurseHandBookDetailView/?type=${record.auditedManageDto.entityName}&&id=${record.auditedManageDto.fileId}&&fileId=${record.auditedManageDto.id}&&audit=&&isAdd=`)
  }

  const columns: any = [
    {
      title: '序号',
      dataIndex: '',
      render: (text: any, record: any, index: number) => index + 1,
      align: 'center',
      width: 50
    },
    {
      title: '类型',
      dataIndex: 'typeName',
      key: 'typeName',
      align: 'center',
      width: 100
    },
    {
      title: '名称',
      dataIndex: 'title',
      key: 'title',
      align: 'center',
      width: 120
    },
    {
      title: '科室',
      dataIndex: 'wardName',
      key: 'wardName',
      align: 'center',
      width: 100
    },
    {
      title: '提交人',
      dataIndex: 'commiterName',
      key: 'commiterName',
      align: 'center',
      width: 60
    },
    {
      title: '提交时间',
      dataIndex: 'commitTime',
      key: 'commitTime',
      width: 80,
      align: 'center'
    },
    {
      title: '上传附件',
      dataIndex: 'files[0].name',
      width: 200,
      align: 'center',
      render: (text: string, record: any) => {
        return (
          <div>
            {record.files.map((item: any, index: number) => (
              <div><a href='javascript:;'onClick={() => setDetailModal(item)} key={item.name}>{item.name}</a></div>
            ))}
          </div>
        )
      }
    },
    {
      title: '操作',
      dataIndex: 'cz',
      width: 50,
      align: 'center',
      render: (text: any, row: any, c: any) => {
        return (
          <DoCon>
            {needAudit&&<span onClick={() => toDetails(row)}>审核</span>}
            {!needAudit&&<span onClick={() => onEdit(row)}>查看</span>}
          </DoCon>
        )
      }
    }
  ]

  const onChange = (pagination: any) => {
    pagination.current && onload(pagination.current, pagination.pageSize)
  }
  const onload = (current: any, pageSize: any) => {
    setLoading(true)
    let getDateFun = props.needAudit
      ? nurseFilesService.nurseManualAuditPending(appStore.queryObj.commiterNo)
      : nurseFilesService.nurseManualAuditProcessed(appStore.queryObj.commiterNo)
    getDateFun.then((res) => {
      setLoading(false)
      setTableData(res.data)
      setTotal(res.data.totalCount)
      setCurrent(res.data.pageIndex)
      setPageSize(res.data.pageSize)
    })
  }
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      setSelectedRows(selectedRows)
      setSelectedRowKeys(selectedRowKeys)
    }
  }

  //查看随访问卷
  const setDetailModal = (item: any) => {
    // window.open(item.path)
    setEditVisible2(true)
    let str:any = item.path;
    let pdfStr:any = item.pdfPath;
    let index = str.lastIndexOf("\.");
    let type = str.substr(index+1,str.length);
    let start = str.indexOf("/crNursing/")
    if(type=='jpg'||type=='png'||type=='pdf'){
      let path = str.substring(start,start+item.path.length)
      setPathChange(path)
    }else{
      let pdfPath = pdfStr.substring(start,start+pdfStr.length)
      setPathChange(pdfPath)
    }
    setIdChange(item.id)
  }

  const openGroupModal = () => {
    if (selectedRows.length == 0) {
      return message.warning('请至少勾选一条记录')
    }
    groupsAduitModalJM.show({
      selectedRows,
      getTableData: () => {
        setSelectedRows([])
        setSelectedRowKeys([])
        emitter.emit('refreshNurseAuditTable')
      }
    })
  }

  useEffect(() => {
    if (props.active) {
      emitter.addListener('refreshNurseAuditTable', () => onload(current, pageSize))
      onload(current, pageSize)
    }
    return () => {
      emitter.removeAllListeners('refreshNurseAuditTable')
    }
  }, [props.active])
  return (
    <Wrapper>
      <GroupPostBtn onClick={() => onload(current, pageSize)}>刷新</GroupPostBtn>
      {props.needAudit && (
        <GroupPostBtn style={{ right: 110 }} onClick={openGroupModal}>
          批量审核
        </GroupPostBtn>
      )}

      <BaseTable
        dataSource={tableData}
        columns={columns}
        surplusHeight={320}
        type={[]}
        // pagination={{
        //   current: current,
        //   total: total,
        //   pageSize: pageSize,
        //   pageSizeOptions: ['10', '20', '30'],
        //   showSizeChanger: true
        // }}
        onRow={(record: any) => {
          return {
            onDoubleClick: () => toDetails(record)
          }
        }}
        onChange={onChange}
        rowSelection={rowSelection}
        loading={loading}
      />
      <FormPageBody
        visible={editVisible2}
        path={pathChange}
        id={idChange}
        onOk={() => {}}
        onCancel={() => setEditVisible2(false)} />
      <groupsAduitModalJM.Component/>
    </Wrapper>
  )
}
const Wrapper = styled.div``
const GroupPostBtn = styled(Button)`
  position: fixed !important;
  top: 189px;
  right: 30px;
`
