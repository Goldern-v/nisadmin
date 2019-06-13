import React, { Component } from 'react';
import styled from 'styled-components'
import { Input, Button, message as Message, Table } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { authStore } from 'src/stores'
import BaseTable from 'src/components/BaseTable'

import NewNursingRulesAddModal from './components/NewNursingRulesAddModal'
import PreviewModal from './components/PreviewModal'
import CustomPagination from './components/CustomPagination';

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
      pageSize: 10
    },
    dataTotal: 149,
    newRuleModalgVisible: false,
    preview: {
      url: '',
      type: '',
      title: ''
    },
    tableLoading: false
  }

  constructor(props: Props) {
    super(props);

    this.hadleSearch = this.hadleSearch.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.openNewRuleDialog = this.openNewRuleDialog.bind(this);
  }

  componentDidMount() {
    this.setTableData();
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
    api
      .download({ id: record.id })
      .then(res => {
        if (this.state.preview.url)
          window.URL.revokeObjectURL(this.state.preview.url);

        let previewUrl = window.URL.createObjectURL(new Blob([res.data], {
          type: res.data.type
        }))
        this.setState({
          preview: {
            url: previewUrl,
            type: record.type,
            title: record.fileName
          }
        }, () => {
          PreviewModalWrapper.show();
        });
      })
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
    api
      .deleteFile({ id: record.id })
      .then(res => {
        Message.success(`文件 ${record.fileName} 删除成功`);
        this.setTableData();
      }, err => {
        Message.error(`文件 ${record.fileName} 删除失败`);
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

  handlePageSizeChange(size: number) {
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

  render() {
    const { query, data, dataTotal, newRuleModalgVisible, preview, tableLoading } = this.state;
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
        title: '文件名',
        dataIndex: 'fileName',
        key: 'fileName',
        align: 'center',
        render: (text: string) => {
          return <span style={{ wordBreak: 'break-all' }}>{text}</span>
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
        align: 'center',
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
          <span className="search-input">
            <Input
              value={query.name}
              placeholder="输入名称进行检索"
              ref="searchInput"
              onChange={this.handleSearchChange} />
          </span>
          <Button onClick={this.hadleSearch}>查询</Button>
          <Button onClick={this.openNewRuleDialog}>新建</Button>
        </div>
      </div>
      <div className="main-contain">
        <BaseTable
          columns={rulesColumns}
          dataSource={data}
          pagination={false}
          spaceRowNumber={query.pageSize}
          loading={tableLoading}
          type={['spaceRow']} surplusHeight={250} />
        <CustomPagination
          onChange={this.handlePageChange.bind(this)}
          onShowSizeChange={this.handlePageSizeChange.bind(this)}
          page={query.pageIndex}
          size={query.pageSize}
          total={dataTotal} />
      </div>
      <NewNursingRulesAddModal
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
      margin-left: 30px;
      margin-top: 15px;
    }
    .float-right{
      float: right;
      margin-top: 15px;
      margin-right: 30px;
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
  }
  .main-contain{
    position: absolute;
    top: 60px;
    left: 15px;
    right: 15px;
    bottom: 10px;
    background: #fff;
    .operate-text{
      margin-right:5px;
      cursor: pointer;
      &:hover{
        color: #1db38b;
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
      bottom:0;
      left: 0;
      right: 0;
    }
  }
`