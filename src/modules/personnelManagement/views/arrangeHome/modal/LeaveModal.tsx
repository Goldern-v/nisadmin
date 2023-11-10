import styled from "styled-components";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { Modal, Input, Button } from "antd";
import BaseTable, { DoCon } from "src/components/BaseTable";
import { nurseFilesService } from 'src/modules/nurseFiles/view/nurseFiles-wh/services/NurseFilesService'
import { observer } from "mobx-react-lite";
import { ModalComponentProps } from "src/libs/createModal";
import { appStore } from 'src/stores'

export interface Props extends ModalComponentProps {
  
}

let OBJ = {
  pageNum:1,
  pageSize:5,
  total:0,
}
export default observer(function LeaveModal(props: Props) {
  let {visible,onCancel} = props
  const [loadingTable, setLoadingTable] = useState(false);
  const [creatorStr, setCreatorStr] = useState("");
  const [tableData, setTableData] = useState([])

  const toDetail = (row: any) => {
    appStore.history.push(`/selfNurseFile/leaveRecordDetail?id=${row.id}`);
  }

  const columns: any = [
    {
      title: '序号',
      dataIndex: '',
      key: '1',
      render: (text: any, record: any, index: number) => index + 1,
      align: 'center',
      width: 60
    },
    {
      title: '申请人',
      dataIndex: 'creatorName',
      key: '2',
      width: 200,
      align: 'center'
    },
    {
      title: '请假单',
      dataIndex: 'recordName',
      key: '2',
      width: 200,
      align: 'center'
    },
   
    {
      title: '请假时间',
      dataIndex: 'leaveTime',
      key: '4',
      width: 120,
      align: 'center',
      render: (text: any, row: any, index: number) => {
        return (row.leaveStartTime || "") + "-" + (row.leaveEndTime || "")
      }
    },
    
    {
      title: '申请时间',
      dataIndex: 'createTime',
      key: '',
      align: 'center',
      width: 120
    },
    {
      title: '休假情况',
      dataIndex: 'createTime',
      key: '',
      align: 'center',
      width: 120,
      render: (text: any, row: any, index: number) => {
        if(row.recordType===1){
          return (
            <span>{row.leaveDuration}</span>
          )
        }else{
          let leaveDetail = JSON.parse(row.leaveDetail)
          return (
            <div>
              公休{leaveDetail.sabbatical}天，
              其他{leaveDetail.otherDays}天，
              婚假{leaveDetail.hunjia}天
            </div>
          )
        }
      }
    },
    {
      title: '操作',
      dataIndex: '操作',
      key: '操作',
      width: 80,
      align: 'center',
      render: (text: any, row: any, index: number) => {
        return (
          <DoCon>
            <span onClick={() => toDetail(row)}>
              查看
            </span>
          </DoCon>
        )
      }
    }
  ];

  useEffect(() => {
    if (visible) {
      getTableData()
    }
  }, [visible]);

  const getTableData = () => {
    let params = {
      type:1,
      pageNum:OBJ.pageNum,
      pageSize:OBJ.pageSize
    }
    nurseFilesService.leaveApplication(params).then((res) => {
      if(res.data){
        let data = res.data.list
        if(creatorStr) data = res.data.list.filter((item:any)=>item.creatorName.includes(creatorStr))
        setTableData(data)
      } 
    })
  }

  return (
    <Wrapper>
      <Modal
        className="modal"
        title="请假记录"
        width="1200px"
        visible={visible}
        onCancel={onCancel}
        footer={null}
        forceRender
        centered
      >
        <TopPart>
          <Input 
            style={{width:"150px"}}
            placeholder="申请人姓名"
            value={creatorStr} 
            onChange={(e:any) => {
              setCreatorStr(e.target.value)
            }}
          />
           <Button style={{marginLeft:"20px"}} onClick={getTableData}>
              查询
            </Button>
        </TopPart>
        <BaseTable
          dataSource={tableData}
          columns={columns}
          wrapperStyle={{ padding: 0 }}
          pagination={{
            current: OBJ.pageNum,
            total: OBJ.total,
            pageSize: OBJ.pageSize
          }}
          onChange={pagination => {
            OBJ.pageNum = pagination.current || 1;
            OBJ.total = pagination.total || 0;
            OBJ.pageSize = pagination.pageSize || 5;
            getTableData()
          }}
        />
      </Modal>
    </Wrapper>
  );
});
const Wrapper = styled.div`
  #baseTable {
    padding: 0px 0px !important;
  }
`
const TopPart = styled.div`
  margin-bottom:20px;
`