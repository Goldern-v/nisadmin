import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Input, Pagination, Form, Modal, Select, Radio, message } from 'antd'
import BaseTable from 'src/components/BaseTable'
import service from 'src/services/api'
import { authStore, appStore } from 'src/stores'
import emitter from 'src/libs/ev'
const { Option } = Select
const EditableContext = React.createContext<any>({})
const deptCode = authStore.selectedDeptCode

class EditableTable extends React.Component<any, any> {
  public constructor(props: any) {
    super(props)
    this.state = {
      data: [],
      arrayData: [],
      searchData: [],
      type: 0, // 0-修改 1-新增
      searchValue: '',
      missionId: undefined,
      rowData: {},
      editingKey: false,
      selectData: [],
      operationTiming: '',
      educationName: '',
      messageType: '',
      operation: '',
      timeout: null,
      loading: false,
      loadingTable: false,
      total: 0,
      pageSize: 10,
      pageIndex: 1, // 当前页数
      confirmLoading: false
    }
    this.columns = [
      {
        title: '序号',
        dataIndex: 'key',
        key: 'key',
        render: (text: any, record: any, index: number) => index + 1,
        align: 'center',
        width: 60
      },
      {
        title: '手术',
        dataIndex: 'operation',
        width: 100,
        align: 'left',
        editable: true
      },
      {
        title: '时机',
        dataIndex: 'operationTiming',
        width: 60,
        align: 'center',
        editable: true
      },
      {
        title: '推送宣教',
        dataIndex: 'educationName',
        width: 280,
        align: 'left',
        editable: true
      },
      {
        title: '推送类型',
        dataIndex: 'messageTypeName',
        width: 120,
        align: 'left',
        editable: true
      },
      {
        title: '创建人',
        dataIndex: 'operatorName',
        width: 100,
        align: 'center',
        editable: true
      },
      {
        title: '创建时间',
        dataIndex: 'createDateTime',
        width: 160,
        align: 'center',
        editable: true
      },
      {
        title: '操作',
        dataIndex: '操作',
        align: 'center',
        width: 180,
        render: (text: any, record: any) => {
          return (
            <div>
              <a
                style={{ fontSize: '13px' }}
                onClick={() => {
                  this.setState({ type: 0 })
                  this.getSelectData(record, 0)
                }}
              >
                修改
              </a>
              <a onClick={() => this.handleDelete(record)} style={{ marginLeft: '15px', fontSize: '13px' }}>
                删除
              </a>
              <a onClick={() => this.preview(record)} style={{ marginLeft: '15px', fontSize: '13px' }}>
                预览
              </a>
            </div>
          )
        }
      }
    ]
    /** 监听事件 */
    emitter.removeAllListeners('自动推送设置-添加-手术')
    emitter.addListener('自动推送设置-添加-手术', () => {
      this.setState({ type: 1 })
      this.getSelectData({}, 1)
    })

    /** 监听事件 --- 控制刷新列表数据*/
    emitter.removeAllListeners('自动推送设置-刷新-手术')
    emitter.addListener('自动推送设置-刷新-手术', () => {
      this.getMealList(null, null)
    })
  }

  //添加和修改
  public getSelectData = (record: any, value: number) => {
    // 如果是添加 则清空数据
    if (value === 1) {
      this.setState({ missionId: undefined })
      this.setState({ operation: '' })
      this.setState({ messageType: '' })
      this.setState({ operationTiming: '' })
      this.setState({sex: ''})
    }
    // 如果是修改则回显数据
    if (value === 0) {
      this.setState({ missionId: record.educationName })
      this.setState({ searchValue: record.educationName })
      this.setState({ operation: record.operation })
      this.setState({ operationTiming: record.operationTiming })
      this.setState({ sex: record.sex === '*' ? '不限' : record.sex})
    }
    this.setState({ rowData: record })
    service.healthyApiService.getPushType().then((res) => {
      if (res && res.data) {
        this.setState({ selectData: res.data })
        // 如果是修改则回显数据
        if (value === 0) {
          this.setState({ messageType: record.messageType })
        }
      }
    })
    this.setState({ editingKey: true })
  }

  // 删除
  public handleDelete = (record: any) => {
    Modal.confirm({
      title: '提示',
      content: '是否删除该推送宣教?',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      centered: true,
      onOk: () => {
        service.healthyApiService.detelePushType1(record).then((res) => {
          this.getMealList(null, null)
          message.success('删除成功')
        })
      }
    })
  }

  //预览
  public preview = (record: any) => {
    let getEducationId = record.educationId
    appStore.history.push(`/setting/自动推送字典详情?id=${getEducationId}&type=2`)
  }

  public isEditing = (record: any) => record.key === this.state.editingKey
  public columns: any = []

  public getMealList = (current: any, pageSize: any) => {
    this.setState({ loadingTable: true })
    let postData = {
      pageSize: pageSize ? pageSize : this.state.pageSize,
      pageIndex: current ? current : this.state.pageIndex,
      wardCode: authStore.selectedDeptCode // string 必须参数 科室编码
    }
    service.healthyApiService.getPushList1(postData).then((res) => {
      this.setState({ loadingTable: false })
      this.setState({ total: res.data ? res.data.totalCount : 0 })
      if (res.data && res.data.list && Object.keys(res.data.list).length > 0) {
        let array: any = []
        res.data.list.map((item: any) => {
          item.key = item.serialNo
          array.push(item)
        })
        this.setState({ data: array })
      }
    })
  }

  public componentWillMount() {
    this.getMealList(null, null)
  }

  public searchChange(value: any) {
    if (!value) {
      return
    }
    this.setState({ missionId: value })
    let educationName = this.state.arrayData.filter((item: any) => item.missionId === value)[0].name
    this.setState({ searchValue: educationName })
  }

  public save(form: any, key: any) {
    form.validateFields((error: any, row: any) => {
      if (error) {
        return
      }
      const newData = [...this.state.data]
      const index = newData.findIndex((item) => key === item.key)
      if (index > -1) {
        const item = newData[index]
        newData.splice(index, 1, {
          ...item,
          ...row
        })
        this.setState({ data: newData, editingKey: '' })
      } else {
        newData.push(row)
        this.setState({ data: newData, editingKey: '' })
      }
    })
  }

  public edit(key: any) {
    this.setState({ editingKey: key })
  }

  //实时查询
  public toSearch(value: any) {
    if (this.state.timeout) {
      clearTimeout(this.state.timeout)
      this.setState({ timeout: null })
    }
    this.setState({ searchValue: value })
    let postData = {
      educationName: value,
      // wardCode: authStore.selectedDeptCode,
      messageType: ''
    }
    this.setState({ loading: true })
    service.healthyApiService.getBriefMission(postData).then((res) => {
      if (res && res.data && res.data.length > 0) {
        let array: any = []
        this.setState({ arrayData: res.data })
        res.data.map((item: any) => {
          array.push(<Option key={item.missionId}>{item.name}</Option>)
        })
        this.setState({ loading: false })
        this.setState({ timeout: setTimeout(this.setState({ children: array }), 300) })
      } else {
        this.setState({ loading: false })
        this.setState({ timeout: setTimeout(this.setState({ children: [] }), 300) })
      }
    })
  }

  //保存
  public handleOk() {
    if (!this.state.operationTiming || !this.state.operation || !this.state.messageType || !this.state.searchValue) {
      message.warning('保存前请将每一项信息填写完整')
      return
    }
    this.setState({ confirmLoading: true })
    let postData = {}
    // 修改入参
    if (this.state.type === 0) {
      postData = {
        serialNo: this.state.rowData.serialNo, // string 非必须参数
        wardCode: this.state.rowData.wardCode, // string 非必须参数
        educationId: this.state.rowData.educationId, // string 非必须参数
        educationName: this.state.searchValue, // string 非必须参数
        operationTiming: this.state.operationTiming, // string 非必须参数(手术时机)
        createDateTime: this.state.rowData.createDateTime, // string 非必须参数
        operator: this.state.rowData.operator, // string 非必须参数
        messageType: this.state.messageType, // string 非必须参数
        operation: this.state.operation, // string 非必须参数
        sex: this.state.sex === '不限' ? '*' : this.state.sex

      }
    }
    // 新增入参
    if (this.state.type === 1) {
      let user = JSON.parse(sessionStorage.getItem('user') || '[]')
      let empNo = user.empNo
      postData = {
        serialNo: '', // string 非必须参数
        wardCode: authStore.selectedDeptCode, // string 非必须参数
        educationId: this.state.missionId, // string 非必须参数
        operationTiming: this.state.operationTiming, // string 非必须参数(手术时机)
        educationName: this.state.searchValue, // string 非必须参数
        messageType: this.state.messageType, // string 非必须参数
        operator: empNo,
        operation: this.state.operation, // string 非必须参数
        sex: this.state.sex === '不限' ? '*' : this.state.sex
      }
    }
    service.healthyApiService.preservationPushType1(postData).then((res) => {
      if (res) {
        this.setState({ confirmLoading: false })
        message.success(this.state.type === 0 ? '修改成功！' : '新增成功！')
        this.getMealList(null, null)
        this.setState({ editingKey: false })
      }
    })
  }

  public onChangePagination(page: any, pageSize: any) {
    this.setState({ pageIndex: page })
    this.getMealList(page, pageSize)
  }
  public onShowSizeChange(current: any, size: any) {
    this.setState({ pageSize: size })
    this.getMealList(current, size)
  }

  public render() {
    const columns = this.columns.map((col: any) => {
      if (!col.editable) {
        return col
      }
      return {
        ...col,
        onCell: (record: any) => ({
          record,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record)
        })
      }
    })
    return (
      <Wrapper>
        <EditableContext.Provider value={this.props.form}>
          <BigBox>
            <BaseTable
              size='small'
              // components={components}
              bordered
              dataSource={this.state.data}
              columns={columns}
              rowClassName={() => 'editable-row'}
              // pagination={false}
              pagination={false}
              // scroll={{ y: 304 }}
              surplusHeight={280}
              loading={this.state.loadingTable}
            />
            <PaginationBox>
              <Pagination
                total={this.state.total}
                pageSize={this.state.pageSize}
                current={this.state.pageIndex}
                onChange={(page, pageSize) => this.onChangePagination(page, pageSize)}
                onShowSizeChange={(current, size) => this.onShowSizeChange(current, size)}
                showSizeChanger
                showQuickJumper
              />
            </PaginationBox>
          </BigBox>
          <Modal
            title='推送设置'
            visible={this.state.editingKey}
            onOk={this.handleOk.bind(this)}
            width='650px'
            okText='保存'
            confirmLoading={this.state.confirmLoading}
            cancelText='返回'
            onCancel={() => {
              this.setState({ editingKey: false })
            }}
          >
            <div className='category' style={{ marginTop: '30px' }}>
              <SpanOne>
                <span>宣</span>教:
              </SpanOne>
              <Select
                showSearch
                filterOption={(input: any, option: any) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                value={this.state.missionId}
                style={{ width: '72%' }}
                defaultActiveFirstOption={false}
                showArrow={false}
                loading={this.state.loading}
                onChange={this.searchChange.bind(this)}
                onSearch={this.toSearch.bind(this)}
                notFoundContent='没有你查找的内容'
                placeholder='输入名称进行检索'
              >
                {this.state.children}
              </Select>
            </div>
            <div className='category' style={{ marginTop: '40px' }}>
              <SpanOne>手术名称:</SpanOne>
              <Input
                defaultValue=''
                style={{ width: '72%' }}
                value={this.state.operation}
                onChange={(e) => {
                  this.setState({ operation: e.target.value })
                }}
              />
            </div>
            <div className='category' style={{ marginTop: '40px' }}>
              <SpanOne>
                <span>时</span>机:
              </SpanOne>
              <Radio.Group
                onChange={(e) => {
                  this.setState({ operationTiming: e.target.value })
                }}
                value={this.state.operationTiming}
              >
                <Radio value='术前'>术前</Radio>
                <Radio value='术后'>术后</Radio>
              </Radio.Group>
            </div>
            {appStore.HOSPITAL_ID === 'nys' && <div className='category' style={{ marginTop: '30px' }}>
              <SpanOne>性别:</SpanOne>
              <Select
                value={this.state.sex}
                onChange={(value: any) => this.setState({ sex: value })}
                style={{ width: '72%' }}
                placeholder='选择类别'
              >
                {['不限', '男', '女' ].map((item: any) => (
                  <Select.Option value={item} key={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
            </div>}
            <div className='category' style={{ marginTop: '40px', marginBottom: '30px' }}>
              <SpanOne>推送类型：</SpanOne>
              <Select
                value={this.state.messageType}
                onChange={(value: any) => this.setState({ messageType: value })}
                showSearch
                filterOption={(input: any, option: any) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                style={{ width: '72%' }}
                placeholder='选择类型'
              >
                {this.state.selectData.map((item: any) => (
                  <Select.Option value={item.messageCode} key={item.messageCode}>
                    {item.messageName}
                  </Select.Option>
                ))}
              </Select>
            </div>
          </Modal>
        </EditableContext.Provider>
      </Wrapper>
    )
  }
}

const SpanOne = styled.span`
  display: inline-block;
  width: 75px;
  text-align: justify;
  margin-left: 35px;
  span {
    margin-right: 28px;
  }
`
const SpanTwo = styled.span`
  padding-left: 75px;
  color: red;
  line-height: 25px;
`
const Wrapper = styled.div`
  .ant-table-body {
    .ant-table-row td:nth-child(4) {
      padding-left: 20px !important;
    }
    .ant-table-row td:nth-child(2) {
      padding-left: 20px !important;
    }
    .ant-table-row td:nth-child(5) {
      padding-left: 20px !important;
    }
  }
`
const PaginationBox = styled.div`
  clear: both;
  text-align: right;
  padding-right: 19px;
`
const BigBox = styled.div`
  padding-bottom: 20px;
`

const EditableFormTable = Form.create()(EditableTable) as any
export default EditableFormTable
