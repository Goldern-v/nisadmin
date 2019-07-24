import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Button, Input, message as Message, Modal } from 'antd'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { ColumnProps } from 'antd/lib/table'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import DeptSelect from 'src/components/DeptSelect'
import DeptFielShareService from './../api/DeptFielShareService'

import CatalogEditModal from './../components/DeptFileShareCatalogEditModal'

const api = new DeptFielShareService()

export interface Props extends RouteComponentProps { }

export default observer(function NursingRulesTypeSetting() {
  const { history } = appStore;
  const [catalog, setCatalog] = useState([] as any);
  const [editIdx, setEditIdx] = useState(-1);
  const [editParams, setEditParams] = useState({} as any);

  const [tableLoading, setTableLoading] = useState(false);

  const [editModalVisible, setEditModalVisible] = useState(false);

  const [deptCode, setDeptCode] = useState('');

  // useEffect(() => {
  //   getCatalog();
  // }, [])

  const setOrderNo = (e: any, index: number, record: any) => {
    setEditIdx(-1);
    let newArr = catalog.concat();
    if (newArr[index].orderNo == e.target.value) return;

    newArr[index].orderNo = e.target.value;
    setCatalog(newArr);

    setTableLoading(true);
    api.saveOrUpdateCatalog(newArr[index]).then(res => {
      setTableLoading(false);
      if (res.code == '200') Message.success('修改成功');
    }, err => {
      setTableLoading(false)
    })
  }

  const handleOpenEdit = (record: any) => {
    setEditParams({ ...record });
    setEditModalVisible(true);
  }

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: '提示',
      content: '是否删除?',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      centered: true,
      onOk: () => {
        api.deleteCatalog(id).then(res => {
          if (res.code == 200) {
            Message.success('删除成功');
            getCatalog();
          } else {
            Message.error('删除失败');
          }
        })
      }
    })
  }

  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      key: 'orderNo',
      dataIndex: 'orderNo',
      width: 50,
      align: 'center',
      render: (text: string, record: any, index: number) => {
        if (editIdx == index) {
          return <Input size="small" defaultValue={record.orderNo} onBlur={(e) => setOrderNo(e, index, record)} />
        } else {
          return <span onClick={() => setEditIdx(index)}>{record.orderNo}</span>
        }
      }
    },
    {
      title: '目录名称',
      key: 'catalog',
      dataIndex: 'catalog',
      align: 'left',
    },
    {
      title: '操作',
      key: 'operation',
      width: 100,
      align: 'center',
      render: (text: string, record: any) => {
        return <DoCon className="operation">
          <span onClick={() => handleOpenEdit(record)}>编辑</span>
          <span onClick={() => { handleDelete(record.id) }}>删除</span>
        </DoCon>
      }
    },
  ];

  const getCatalog = (_deptCode?: any) => {
    setTableLoading(true);
    api.getCatalog({ deptCode: _deptCode || deptCode }).then(res => {
      setTableLoading(false);
      if (res.data instanceof Array) {
        setCatalog(res.data)
      }
    }, err => {
      setTableLoading(false);
    })
  }

  const handleAdd = () => {
    setEditParams({
      id: '',
      name: '',
      orderNo: ''
    })
    setEditModalVisible(true);
  }

  const handleCancel = () => {
    setEditModalVisible(false);
  }

  const handleOk = () => {
    getCatalog();
    handleCancel();
  }

  const handleDeptChange = (deptCode: any) => {
    setDeptCode(deptCode);
    getCatalog(deptCode);
  }

  return <Wrapper>
    <div className="topbar">
      <div className="float-left">
        <div className="item title">目录设置</div>
      </div>
      <div className="float-right">
        <div className="item">
          <Button onClick={handleAdd}>添加</Button>
        </div>
        <div className="item">
          <Button onClick={() => history.goBack()}>返回</Button>
        </div>
      </div>
      <div className="item dept-select"><DeptSelect onChange={handleDeptChange} /></div>
    </div>
    <div className="main-contain">
      <BaseTable
        columns={columns}
        rowKey="id"
        loading={tableLoading}
        surplusHeight={215}
        dataSource={catalog} />
    </div>
    <CatalogEditModal visible={editModalVisible} params={editParams} onCancel={handleCancel} onOk={handleOk} deptCode={deptCode} />
  </Wrapper>
})

const Wrapper = styled.div`
position:relative;
padding-top: 55px;
height: 100%;
width: 100%;
background: #fff;

div.topbar{
  position:absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 10px 15px;
  box-sizing: border-box;
  height: 55px;
  overflow: hidden;
  border-bottom: 1px solid #ddd;
  .float-left{
    float:left;
  }

  .float-right{
    float:right;
  }
  
  .item{
    display: inline-block;
    margin-right: 10px;
    &.title{
      vertical-align: middle;
      line-height: 35px;
      font-size: 16px;
      font-weight: bold;
    }
    &.type-select{
      margin-left: 50px;
      .ant-select{ 
        min-width: 120px;
      }
    }
    &.dept-select{
      display: none;
    }
    &>div{
      display: inline-block;
      vertical-align: middle;
    }
    .label{}
    .content{}
  }
}

.main-contain{
  height: 100%;
  width: 500px;
  .operation{
    .disabled{
      color: #aaa;
      cursor: not-allowed;
      :hover{
        font-weight: normal;
      }
    }
  }
}
`