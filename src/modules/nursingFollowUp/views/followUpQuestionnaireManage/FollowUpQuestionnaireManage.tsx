import styled from 'styled-components'
import React, { useState, useEffect, Fragment } from 'react'
import { Button } from 'antd'
import { PageHeader, PageTitle, Place } from 'src/components/common'
import BaseTable from 'src/components/BaseTable'
import { DatePicker, Select, Input, ColumnProps, PaginationConfig, Modal, message, Switch } from 'src/vendors/antd'
import FollowUpGroupModal from '../components/FollowUpGroupModal'
import createModal from 'src/libs/createModal'
import FormPageBody from '../components/FormPageBody'
import FollowUpQuestionnaireManageServices from './services/FollowUpQuestionnaireManageServices'
export interface Props { }
const api = new FollowUpQuestionnaireManageServices();
export default function FollowUpQuestionnaireManage(props: any) {
  const [editVisible, setEditVisible] = useState(false)
  const [formCodeChange, setFormCodeChange] = useState("")
  const [dataTotal, setDataTotal] = useState(0)
  const [deptSelect, setDeptSelect] = useState('')
  const [diseasList, setDiseasList] = useState([])
  const [searchText, setSearchText] = useState('')
  const [tableData, setTableData] = useState([])
  const [pageLoading, setPageLoading] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState([] as number[] | string[])
  //科室列表
  const [deptList, setDeptList] = useState([] as any)
  //宣教接口请求参数
  const [query, setQuery] = useState({
    wardCode: '',
    pageSize: 20,
    pageIndex: 1
  });
  const onChangeSearchText = (e: any) => {
    setSearchText(e.target.value)
  }
  const handleDeptSelect = (item: any) => {
    setQuery({ ...query, wardCode: item.code });
  }
  const getData = () => {
    setPageLoading(true)
    api
      .visitTemplate({
        ...query,
        diseaseTypeId: deptSelect,
        keyword: searchText,
      })
      .then((res) => {
        setPageLoading(false)
        setSelectedRowKeys([])
        setDataTotal(res.data.totalCount)
        setTableData(res.data.list)
      }, err => setPageLoading(false))
  }
  const onSave = (record: any) => {
    setPageLoading(true)
    api
      .setVisitTemplateDiseaseType({
        formCode: record.formCode,
        diseaseTypeId: record.visitDiseaseTypeList[0].diseaseTypeId,
      })
      .then((res) => {
        setPageLoading(false)
        // getData()
      }, err => setPageLoading(false))
  }
  //是否启用
  const changeStatus = (record: any, check: any) => {
    record.status = check ? 1 : 0
    setTableData([...tableData])
    setPageLoading(true)
    api
      .setVisitTemplateStatus({
        formCode: record.formCode,
        status: record.status,
      })
      .then((res) => {
        setPageLoading(false)
        if (res.code == "200") {
          message.success("操作成功！");
        }
      }, err => setPageLoading(false))
  }
  const handlePageSizeChange = (current: number, size: number) => {
    setQuery({ ...query, pageSize: size, pageIndex: 1 })
  }
  const handlePageChange = (current: number) => {
    setQuery({ ...query, pageIndex: current })
  }
  const handleDetailView = (bookId: string) => { }
  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      key: 'key',
      width: 15,
      align: 'center',
      render: (text: string, record: any, index: number) => index + 1
    },
    {
      title: '随访问卷',
      dataIndex: 'formName',
      key: 'formName',
      align: 'center',
      width: 150
    },
    {
      title: '是否启用',
      dataIndex: 'status',
      key: '是否排班',
      width: 50,
      align: 'center',
      render: (text: any, record: any, index: any) =>
        <span>
          <Switch
            size='small'
            onChange={(check: any) => changeStatus(record, check)}
            checked={record.status == 1 ? true : false}
          />
        </span>
    },
    {
      title: '操作',
      dataIndex: '',
      key: 'operation',
      align: 'center',
      width: 50,
      render: (text: string, record: any) => {
        return <Fragment>
          <span onClick={e => viewContent(record)} className="operation-span">查看</span>
        </Fragment>
      }
    },
  ];
  //查看随访问卷
  const viewContent = (record: any) => {
    setEditVisible(true)
    setFormCodeChange(record.formCode)
  }
  useEffect(() => {
    getData()
  }, [
    query.pageIndex,
    query.pageSize,
    query.wardCode,
    deptSelect
  ])
  useEffect(() => {
    getDeptList();
    getAllList();
  }, []);
  const getDeptList = () => {
    api.getDeptList().then(res => {
      if (res.data.deptList instanceof Array) setDeptList(res.data.deptList);
    })
  }
  const getAllList = () => {
    api.getAllList().then(res => {
      if (res.data instanceof Array) setDiseasList(res.data);
    })
  }
  return <Wrapper>
    <PageHeader>
      <Place />
      <Input
        placeholder='请输入随访问卷关键字检索'
        style={{ width: 220 }}
        value={searchText}
        onChange={onChangeSearchText}
        className='input_hj'
      />
      <Button type="primary" onClick={() => getData()}>
        查询
      </Button>
    </PageHeader>
    <div className="main-contain">
      <div className="left">
        <div className="title">科室</div>
        <div className="content">
          <div
            className={query.wardCode == '' ? 'dept-item selected' : 'dept-item'}
            onClick={() => handleDeptSelect({ code: '' })}>
            <span className="before" />公共<span className="after" />
          </div>
          {deptList.map((item: any) => {
            let classes = ['dept-item'];
            if (query.wardCode == item.code) classes.push('selected')
            return <div
              key={item.code}
              className={classes.join(' ')}
              id={`dept${item.code}`}
              onClick={() => handleDeptSelect(item)}>
              <span className="before" />{item.name}<span className="after" />
            </div>
          })}
        </div>
      </div>
      <div className="right">
        <BaseTable columns={columns}
          dataSource={tableData}
          onRow={record => {
            return {
              onDoubleClick: () => handleDetailView(record.id)
            }
          }}
          pagination={{
            pageSizeOptions: ['10', '20', '30', '40', '50'],
            onShowSizeChange: handlePageSizeChange,
            onChange: handlePageChange,
            total: dataTotal,
            showSizeChanger: true,
            showQuickJumper: true,
            pageSize: query.pageSize,
            current: query.pageIndex
          }}
          loading={pageLoading}
          surplusHeight={220} />
      </div>
    </div>
    {
      editVisible && <FormPageBody
        visible={editVisible}
        formCode={formCodeChange}
        onOk={() => {
          setEditVisible(false)
          getData()
        }}
        onCancel={() => setEditVisible(false)} />
    }
  </Wrapper>
}
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  margin-left:20px;
  position: relative;

  .float-right{
  float: right;
  }
  .input_hj {
  margin-left: 20px;
  }
  #box_select {
  .ant-select-selection{
    border: 0;
    background: #fff;
  }
  }
  .topbar{
  height: 60px;
  // border-bottom: 1px solid #ddd;
  // background: #f8f8f8;
  // box-shadow: 3px 3px 6px 0px rgba(0,0,0,0.15);
  span{
    display: inline-block;
    vertical-align: middle;
  }
  .title{
    margin-left: 20px;
    font-size: 20px;
    font-weight: bold;
    color: #000;
    line-height: 70px;
  }
  .float-right{
    margin-top: 18px;
    margin-right: 5px;
    display: inline-block;
    &>span{
      margin-right: 10px
    }
    .type{
      margin-right: 15px;
      .ant-select{
        min-width: 100px;
      }
    }
    .upload{
      margin-right: 5px;
    }
    .search-input{
      margin-right: 5px;
      width: 150px;
    }
    .btn-group{
      .search{
        margin-right: 15px;
      }
    }
  }
}

.main-contain{
  position: absolute;
  left: 0;
  right: 0;
  top: 35px;
  bottom: 0;
  padding: 15px;
  padding-bottom: 0;
  height: calc(100vh - 95px);
  &>div{
    background: #fff;
  }
  .left{
    height: 100%;
    float: left;
    width: 250px;
    overflow: hidden;
    border: 1px solid #ddd;
    margin-right: 8px;
    padding-top: 40px;
    .title{
      text-indent: 16px;
      margin-top: -40px;
      border-bottom: 1px solid #ddd;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      font-weight: bold;
      background-color: #ECEFF1;
    }
    .content{
      height: 100%;
      width: 100%;
      overflow: auto;
      .dept-item{
        line-height: 24px;
        cursor: pointer;
        position: relative;
        text-indent: 30px;
        &:hover{
          background: #00A680;
          color: #fff;
          &.selected{
            color: #fff;
          }
        }
        &.selected{
          background: #00A680;
          color: #fff;
          font-weight: bold;
        }
        .before{
          position: absolute;
          display: block;
          height: 100%;
          width: 0;
          border-left: 1px dashed #aaa;
          left: 10px;
          top: 0;
        }
        .after{
          position: absolute;
          display: block;
          height: 0;
          width: 10px;
          border-top: 1px dashed #aaa;
          left: 11px;
          top: 50%;
        }
        &:first-of-type{
          .before{
            height: 50%;
            bottom: 0;
            top: auto;
          }
        }
        &:last-of-type{
          .before{
            height: 50%;
            bottom: auto;
            top: 0;
          }
        }
      }
    }
  }
  .right{
    border: 1px solid #ddd;
    height: 100%;
    overflow: hidden;
    tr{
      :hover td{
        background-color: #f5f5f5;
      }
    }
    td{
      font-weight: normal!important;
      &.name{
        position: relative;
        >div{
          position: absolute;
          left: 0;
          top: 0;
          line-height: 32px;
          height: 32px;
          right: 0;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          padding: 0 10px;
        }
      }
      &.type,&.dept-name{
        padding-left: 8px!important;
      }
    }
    .operation-span{
      color: rgb(0, 166, 128);
      cursor: pointer;
      &:hover{
        font-weight: bold;
      }
      &.delete-span{
        margin-left: 10px;
      }
    }
  }
}
.left .content{
  ::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 8px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 10px;
  }
  ::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.1);
  }
  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    // box-shadow: inset 0 0 5px #ffffff;
    // border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.1);
  }
}
`
const ModalWrapper = styled.div`
  text-align:center;
  .file-name-input{
    width: 250px;
    margin-right: 20px;
  }
`