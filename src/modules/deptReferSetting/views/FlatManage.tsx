import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Button, Modal, message as Message, Select } from 'antd'
import { Link } from 'react-router-dom'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { ColumnProps } from 'antd/lib/table'
import DeptSelect from 'src/components/DeptSelect'

import FlatManageEditModal from './../components/FlatManageEditModal'
import PreviewModal from './../components/PreviewModal'
import createModal from 'src/libs/createModal'

import FlatManageService from './../api/FlatManageService'

const api = new FlatManageService();

export interface Props extends RouteComponentProps { }

const Option = Select.Option

export default function DeptFileShare() {
  const [tableData, setTableData] = useState([] as any)
  const [dataTotal, setDataTotal] = useState(0 as number);

  const [editParams, setEditParams] = useState({} as any);

  const [editVisible, setEditVisible] = useState(false)

  const PreviewModalWrapper = createModal(PreviewModal);

  const [query, setQuery] = useState({
    deptCode: '',
    // manageType: '',
    pageSize: 20,
    pageIndex: 1
  } as any)
  useEffect(() => {

  }, []);

  useEffect(() => {
    if (query.deptCode) getTableData()
  }, [query])

  const [tableLoading, setTableLoading] = useState(false)

  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      dataIndex: 'key',
      key: 'key',
      width: 50,
      align: 'center',
      render: (text: string, record: any, index: number) => {
        const { pageIndex, pageSize } = query
        return (pageIndex - 1) * pageSize + index + 1
      }
    },
    {
      title: '管理类型',
      dataIndex: 'manageType',
      key: 'manageType',
      className: 'align-left',
      align: 'left',
      render: (text: string) => {
        return (
          <div className='elips' title={text}>
            {text}
          </div>
        )
      }
    },
    {
      title: '管理指标说明文件',
      dataIndex: 'fileName',
      key: 'fileName',
      className: 'align-left',
      align: 'left',
      // width: 150,
      render: (text: string) => {
        return (
          <div className='elips' title={text}>
            {text}
          </div>
        )
      }
    },
    {
      title: '操作',
      key: 'opetation',
      align: 'center',
      width: 120,
      render: (text: string, record: any) => {
        return (
          <DoCon>
            <span onClick={() => handlePreview(record)}>
              预览
            </span>
            <span onClick={() => reUpload(record)}>
              修改
            </span>
            <span onClick={() => handleDelete(record)}>
              删除
            </span>
          </DoCon>
        )
      }
    }
  ];

  const handlePreview = (record: any) => {

    let typeArr = record.path.split('.');

    PreviewModalWrapper.show({
      url: `/crNursing/asset/flatManageSetting${record.path}`,
      type: typeArr[typeArr.length - 1],
      name: record.manageType
    });
  }
  const reUpload = (record: any) => {
    setEditParams({
      id: record.id,
      manageType: record.manageType
    })
    setEditVisible(true)
  }
  const handleDelete = (record: any) => {
    let content = <div>
      <div>您确定要删除选中的记录吗？</div>
      <div>删除后将无法恢复。</div>
    </div>
    Modal.confirm({
      title: '提示',
      content,
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        api.delete(record.id)
          .then(res => {
            if (res.code == 200) {
              Message.success('文件删除成功')
              getTableData();
            } else
              Message.error('文件删除失败')
          })
          .catch(err => {
            Message.error('文件删除失败')
          })
      }
    })
  }

  const handleDeptChange = (deptCode: any) => {
    setQuery({ ...query, deptCode });
  }

  const handleEditCancel = () => {
    setEditVisible(false)
    setEditParams({});
  }

  const handleEditOk = () => {
    getTableData();
    handleEditCancel()
  }

  const getTableData = () => {
    setTableLoading(true);

    api.getList(query)
      .then(res => {
        setTableLoading(false)
        if (res.data) {
          setDataTotal(res.data.totalCount || 0);
          setTableData(res.data.list);
        }
      }, err => {
        setTableLoading(false)
      })
  }

  return <Wrapper>
    <div className="topbar">
      <div className="float-left">
        <div className="item title">扁平管理设置</div>
      </div>
      <div className="float-right">
        <div className="item">
          <div className="label">科室：</div>
          <div className="content">
            <DeptSelect onChange={handleDeptChange} />
          </div>
        </div>
        <div className="item">
          <Button onClick={() => getTableData()}>查询</Button>
        </div>
        <div className="item">
          <Button type="primary" onClick={() => setEditVisible(true)}>添加</Button>
        </div>
      </div>
    </div>
    <div className="main-contain">
      <BaseTable
        columns={columns}
        rowKey="id"
        dataSource={tableData}
        loading={tableLoading}
        surplusHeight={tableData.length > 0 ? 235 : 195}
        pagination={{
          pageSizeOptions: ['10', '20', '30', '40', '50'],
          onShowSizeChange: (pageIndex, pageSize) => setQuery({ ...query, pageSize }),
          onChange: (pageIndex, pageSize) => setQuery({ ...query, pageIndex }),
          total: dataTotal,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSize: query.pageSize,
          current: query.pageIndex
        }} />
    </div>
    <FlatManageEditModal
      visible={editVisible}
      params={editParams}
      onCancel={handleEditCancel}
      deptCode={query.deptCode}
      onOk={handleEditOk} />
    <PreviewModalWrapper.Component />
  </Wrapper>
}
const Wrapper = styled.div`
position:relative;
  padding-top: 65px;
  height: 100%;
  width: 100%;

  div.topbar{
    position:absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 10px 15px;
    box-sizing: border-box;
    padding-top:18px;
    height: 60px;
    overflow: hidden;
    .float-left{
      float:left;
    }

    .float-right{
      float:right;
    }
    
    .item{
      display: inline-block;
      margin-right: 10px;
      vertical-align: middle;
      :last-of-type{
        margin-right: 0;
      }
      &.title{
        font-size: 20px;
        color: #000;
        font-weight: bold;
        margin-left: 5px;
      }
      &.link{
        margin-right: 50px;
      }
      &>div{
        display: inline-block;
        vertical-align: middle;
      }
      .label{

      }
      .content{
        .year-picker{
          width: 95px;
        }
        .report-record{
          min-width: 140px;
        }
      }
    }
  }

  .main-contain{
    height: 100%;
    width: 100%;
    padding: 15px;
    padding-top: 0;
    td {
      position: relative;
      &.align-left {
        padding-left: 15px !important;
      }
      div.elips {
        position: absolute;
        left: 15px;
        right: 15px;
        line-height: 30px;
        top: 0;
        bottom: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
`