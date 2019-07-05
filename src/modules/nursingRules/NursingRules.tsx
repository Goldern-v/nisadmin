import React, { Component } from 'react';
import styled from 'styled-components'
import { Input, Button, message as Message, Select, Modal, Pagination } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { authStore } from 'src/stores'
import BaseTable from 'src/components/BaseTable'

import NewNursingRulesAddModal from './components/NewNursingRulesAddModal'
import PreviewModal from './components/PreviewModal'
// import CustomPagination from './components/CustomPagination';

import NursingRulesApiService from './api/NursingRulesApiService'
import createModal from 'src/libs/createModal'

const api = new NursingRulesApiService();

const PreviewModalWrapper = createModal(PreviewModal);

export interface Props { }

export default class NursingRules extends Component<Props> {
  state = {
    data: [],
    query: {
      name: '',
      pageIndex: 1,
      pageSize: 10,
      fileType: ''
    },
    dataTotal: 0,
    newRuleModalgVisible: false,
    preview: {
      url: '',
      type: '',
      title: ''
    },
    tableLoading: false,
    typeList: [] as any
  }

  constructor(props: Props) {
    super(props);

    this.hadleSearch = this.hadleSearch.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.openNewRuleDialog = this.openNewRuleDialog.bind(this);
  }

  componentDidMount() {
    api.getType().then(res => {
      if (res.data instanceof Array) this.setState({ typeList: res.data });
    });

    this.setTableData()
  }

  setTableData() {
    this.setState({ tableLoading: true });
    api
      .getList(this.state.query)
      .then(res => {
        let data = res.data;
        this.setState({
          dataTotal: data.totalCount || 0,
          data: data.list.map((item: any, idx: number) => {
            let deptName = item.deptName;
            let sizeFile = this.bytesToSize(item.sizeFile);
            if (item.deptCode == '全院' || item.deptName == '公共' || item.publicUse == '1')
              deptName = '公共'

            return {
              ...item,
              key: idx,
              deptName,
              sizeFile
            }
          })
        });

        this.setState({ tableLoading: false });
      }, err => {
        this.setState({ tableLoading: false });
      })
  }

  hadleSearch(): void {
    this.setState({
      query: {
        ...this.state.query,
        pageIndex: 1
      }
    }, () => {
      this.setTableData();
    })
  }

  handleSearchChange(e: any): void {
    this.setState({
      query: {
        ...this.state.query,
        name: e.target.value
      }
    })
  }

  handlePreview(record: any) {
    // api
    //   .download({ id: record.id })
    //   .then(res => {
    //     if (this.state.preview.url)
    //       window.URL.revokeObjectURL(this.state.preview.url);

    //     let previewUrl = window.URL.createObjectURL(new Blob([res.data], {
    //       type: res.data.type
    //     }))

    //     }, () => {
    //       PreviewModalWrapper.show();
    //     });
    //   })

    this.setState({
      preview: {
        url: '/crNursing/nursingInstitution' + record.path,
        type: record.type,
        title: record.name
      }
    })
    PreviewModalWrapper.show();

  }

  handleDownload(record: any) {
    api
      .download({ id: record.id })
      .then(res => {
        this.fileDownload(res, record)
      })
  }

  fileDownload(res: any, record?: any) {
    let filename = record.fileName
    // decodeURIComponent
    // "attachment;filename=????2019-3-18-2019-3-24??.xls"
    // "application/json"
    let blob = new Blob([res.data], {
      type: res.data.type // 'application/vnd.ms-excel;charset=utf-8'
    })
    // console.log('fileDownload', res)
    // if (res.data.type && res.data.type.indexOf('excel') > -1) {
    if (true) {
      let a = document.createElement('a')
      let href = window.URL.createObjectURL(blob) // 创建链接对象
      a.href = href
      a.download = filename // 自定义文件名
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(href)
      document.body.removeChild(a) // 移除a元素
    }
  }

  handleDelete(record: any) {
    // console.log(record)
    Modal.confirm({
      title: '提示',
      content: '是否删除该护理制度?',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      centered: true,
      onOk: () => {
        api
          .deleteFile({ id: record.id })
          .then(res => {
            Message.success(`文件 ${record.fileName} 删除成功`);
            this.setTableData();
          }, err => {
            Message.error(`文件 ${record.fileName} 删除失败`);
          })
      }
    })

  }

  handlePageChange(page: number) {
    let { query } = this.state;

    this.setState({
      query: {
        ...query,
        pageIndex: page
      }
    }, () => {
      this.setTableData()
    });
  }

  handlePageSizeChange(page: number, size: number) {
    let { query } = this.state;
    this.setState({
      query: {
        ...query,
        pageSize: size,
        pageIndex: 1
      }
    }, () => {
      this.setTableData()
    });

  }

  openNewRuleDialog() {
    this.setState({
      newRuleModalgVisible: true,
      deptList: authStore.deptList
    })
  }

  handleModalOk() {
    this.setState({
      newRuleModalgVisible: false
    });
    this.setTableData();
  }

  handleModalCancel() {
    this.setState({
      newRuleModalgVisible: false
    })
  }

  bytesToSize(bytes: number) {
    if (bytes === 0) return '0 B';
    var k = 1000, // or 1024
      sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      i = Math.floor(Math.log(bytes) / Math.log(k));

    return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
  }

  handleFileTypeChange(fileType: any) {
    this.setState({ query: { ...this.state.query, fileType } })
  }

  render() {
    const { query, data, dataTotal, newRuleModalgVisible, preview, tableLoading, typeList } = this.state;
    const rulesColumns: ColumnProps<any>[] = [
      {
        title: '序号',
        dataIndex: 'key',
        key: 'key',
        width: 50,
        align: 'center',
        render: (text: string, record: any, index: number) => {
          const { pageIndex, pageSize } = query;
          return (pageIndex - 1) * pageSize + index + 1;
        }
      }, {
        title: '制度名称',
        dataIndex: 'name',
        key: 'name',
        className: 'align-left',
        align: 'left',
        render: (text: string) => {
          return <div className="rule-name" title={text}>{text}</div>
        }
      }, {
        title: '大小',
        dataIndex: 'sizeFile',
        key: 'sizeFile',
        align: 'center',
        width: 80
      }, {
        title: '格式',
        dataIndex: 'type',
        key: 'type',
        align: 'center',
        width: 56
      }, {
        title: '上传人',
        dataIndex: 'empName',
        key: 'empName',
        align: 'center',
        width: 80
      }, {
        title: '权限',
        dataIndex: 'deptName',
        key: 'deptName',
        className: 'align-left',
        align: 'left',
        width: 150
      }, {
        title: '上传时间',
        dataIndex: 'uploadTime',
        key: 'uploadTime',
        align: 'center',
        width: 150
      }, {
        title: '操作',
        key: 'opetation',
        align: 'center',
        width: 150,
        render: (text: string, record: any) => {
          return <div>
            <span onClick={this.handlePreview.bind(this, record)} className="operate-text">预览</span>
            <span onClick={this.handleDownload.bind(this, record)} className="operate-text">下载</span>
            <span onClick={this.handleDelete.bind(this, record)} className="operate-text">删除</span>
          </div>
        }
      }
    ];

    return <Contain className="nursing-rules">
      <div className="topbar">
        <div className="title">护理制度</div>
        <div className="float-right">
          <span className="type-label">护理类型：</span>
          <span className="type-content">
            <Select defaultValue={query.fileType} value={query.fileType} onChange={this.handleFileTypeChange.bind(this)}>
              <Select.Option value="">全部</Select.Option>
              {typeList.map((item: any) => <Select.Option value={item.type} key={item.id}>{item.type}</Select.Option>)}
            </Select>
          </span>
          <span className="search-input">
            <Input
              value={query.name}
              placeholder="输入名称进行检索"
              ref="searchInput"
              onChange={this.handleSearchChange} />
          </span>
          <Button onClick={this.hadleSearch} type="primary">查询</Button>
          <Button onClick={this.openNewRuleDialog}>新建</Button>
        </div>
      </div>
      <div className="main-contain">
        <BaseTable
          columns={rulesColumns}
          dataSource={data}
          pagination={{
            pageSizeOptions: ['10', '20', '30', '40', '50'],
            onShowSizeChange: this.handlePageSizeChange.bind(this),
            onChange: this.handlePageChange.bind(this),
            total: dataTotal,
            showSizeChanger: true,
            showQuickJumper: true,
            pageSize: query.pageSize,
            current: query.pageIndex
          }}
          spaceRowNumber={query.pageSize}
          loading={tableLoading}
          type={['spaceRow']}
          surplusHeight={215}
        />
        {/* <div className="custom-pagination">
          <Pagination
            pageSizeOptions={['10', '20', '30', '40', '50']}
            onShowSizeChange={this.handlePageSizeChange.bind(this)}
            onChange={this.handlePageChange.bind(this)}
            total={dataTotal}
            showSizeChanger
            showQuickJumper
            pageSize={query.pageSize}
            current={query.pageIndex} />
        </div> */}
        {/* <CustomPagination
          onChange={this.handlePageChange.bind(this)}
          onShowSizeChange={this.handlePageSizeChange.bind(this)}
          page={query.pageIndex}
          size={query.pageSize}
          total={dataTotal} /> */}
      </div>
      <NewNursingRulesAddModal
        fileTypeList={typeList}
        onOk={this.handleModalOk.bind(this)}
        onCancel={this.handleModalCancel.bind(this)}
        visible={newRuleModalgVisible} />
      <PreviewModalWrapper.Component
        url={preview.url}
        type={preview.type}
        name={preview.title}
        onClose={() => PreviewModalWrapper.hide()} />
    </Contain>
  }
}

const Contain = styled.div`
  position: relative;
  height: 100%;
  .topbar{
    height: 60px;
    overflow: hidden;
    .title{
      font-size: 20px;
      display: inline-block;
      font-weight: bold;
      margin-left: 15px;
      margin-top: 15px;
    }
    .float-right{
      float: right;
      margin-top: 15px;
      margin-right: 15px;
      .search-input{
        width: 180px;
        display: inline-block;
        vertical-align: middle;
      }
      button{
        margin-left: 15px;
        vertical-align: middle;
      }
    }
    .type-label{
      margin-right:5px;
      vertical-align: middle;
    }
    .type-content{
      .ant-select{
        vertical-align: middle;
      }
      margin-right:15px;
      .ant-select-selection{
        min-width: 150px;
      }
    }
  }
  .main-contain{
    position: absolute;
    top: 60px;
    left: 15px;
    right: 15px;
    bottom: 10px;
    background: #fff;
    height: calc(100vh - 120px);
    td{
      position: relative;
      &.align-left{
        padding-left: 15px!important;
      }
      div.rule-name{
        position: absolute;
        left: 15px;
        right: 15px;
        line-height: 30px;
        top: 0;
        bottom: 0;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space:nowrap
      }
    }
    .operate-text{
      margin-right:5px;
      cursor: pointer;
      color: #1db38b;
      &:hover{
        font-weight: bold;
      }
    }
    .ant-table-wrapper{
      position: absolute;
      top: 10px;
      left: 10px;
      right: 10px;
      bottom: 34px;
    }
    .custom-pagination{
      position: absolute;
      padding: 10px 15px;
      bottom:0;
      left: 0;
      right: 0;
      .ant-pagination {
        float: right;
      }
    }
  }
`