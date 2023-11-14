import styled from "styled-components";
import React, { useState, useEffect } from 'react';
import { Modal, Table, Button, Input, message as Message } from 'antd'

export interface Props {
  visible: boolean
  onOk: any
  onCancel: any
  groupRoleList: any
}

interface DataType {
  qcCode: string;
  qcName: string;
  comePoint: string;
  measure: string;
  trace: string;
}

export default function AddEventModel (props: Props){
  const {visible , onCancel,  onOk, groupRoleList} = props;
  const [loadingState, setLoadingState] = useState(false);
  const [nursingQualityList, setNursingQualityList]:any[] = useState([])

  useEffect(()=>{
    if(groupRoleList.length){
      setNursingQualityList(groupRoleList)
    }
  },[groupRoleList])
  const handleOk = () => {
    setLoadingState(true)
    Message.success('添加成功')
    onOk && onOk(nursingQualityList)
    setLoadingState(false)
  }
  const getTableColumns = (data: any) => {
    let columns: any = [
      {
        title: "表单名称",
        key: "qcName",
        dataIndex: "qcName",
        align: "center",
        width: 160,
        render: ((text:any, key:any, rowKey: any)=>{
          let firstList =  data.findIndex((item:any)=> item.qcName === text)
          return firstList == rowKey ? text : ''
        })
      },
      {
        title: "主要问题",
        key: "comePoint",
        dataIndex: "comePoint",
        width: 280,
        align: "center",
      },
      {
        title: '措施',
        key: "measure",
        dataIndex: "measure",
        width: 200,
        align: "center",
        render: (text: any, key: any , rowKey: any) => {
          return (
            <input
              value={text}
              onChange={(e) => {
                data[rowKey]["measure"] = e.target.value;
                setNursingQualityList([...data]);
              }}
            />
          );
        },
      },
      {
        title: '有效追踪',
        key: "trace",
        dataIndex: "trace",
        width: 200,
        align: "center",
        render: (text: any, key: any, rowKey:any) => {
          return (
            <input
              value={text}
              onChange={(e) => {
                data[rowKey]["trace"] = e.target.value;
                setNursingQualityList([...data]);
              }}
            />
          );
        },
      },
    ];
    return columns;
  };
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record: DataType) => ({
      disabled: record.qcName === 'Disabled User', // Column configuration not to be checked
      name: record.qcName,
    }),
  };
  return (
    <Modal
      title='新建护理质量分析报告'
      visible={visible}
      onCancel={onCancel}
      onOk={handleOk}
      confirmLoading={loadingState}
      centered
      width={1200}
    >
      <Wrapper
        style={{ width: "1180px", margin: "0 auto" }}
      >
        <Table
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
          bordered
          pagination={false}
          dataSource={nursingQualityList}
          columns={getTableColumns(nursingQualityList)}
        />
      </Wrapper>
    </Modal>
  )
}

const Wrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  .ant-table-row {
    input {
      width: 100%;
      border: none;
      resize: none;
      outline: none;
      text-align: center;
    }
  }
  .ant-table-thead > tr > th, .ant-table-tbody > tr > td{
    padding: 0;
  }
  
`