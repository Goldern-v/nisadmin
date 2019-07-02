import styled from 'styled-components'
import React from 'react'
import * as ReactDOM from 'react-dom'
import { Input, InputNumber, Form, Button, Modal, Select, Pagination, message, Tooltip } from 'antd'
import BaseTable from 'src/components/BaseTable'
import { authStore } from 'src/stores/index'
import service from 'src/services/api'
import props from 'src/modules/healthPropaganda/editor/configs/props'
import emitter from 'src/libs/ev'
const { Option } = Select
export interface Props {
  placeholder: any
}
// import TableHeader from 'src/modules/setting/view/common/TableHeader.tsx'

const FormItem = Form.Item
const EditableContext = React.createContext<any>({})

class EditableCell extends React.Component<any> {
  public getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber />
    }
    return <Input />
  }

  public render() {
    const { editing, dataIndex, title, inputType, record, index, ...restProps } = this.props
    return (
      <EditableContext.Consumer>
        {(form) => {
          const { getFieldDecorator } = form
          return (
            <td {...restProps}>
              {editing ? (
                <FormItem style={{ margin: 0 }}>
                  {getFieldDecorator(dataIndex, {
                    rules: [
                      {
                        required: true,
                        message: `Please Input ${title}!`
                      }
                    ],
                    initialValue: record[dataIndex]
                  })(this.getInput())}
                </FormItem>
              ) : (
                restProps.children
              )}
            </td>
          )
        }}
      </EditableContext.Consumer>
    )
  }
}

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
      rowData: [],
      editingKey: false,
      selectData1: [],
      selectData2: [],
      educationName: '',
      patientEvent: '',
      patientId: '',
      messageType: '',
      timeout: null,
      loading: false,
      loadingTable: false,
      total: 0,
      pageSize: 10,
      pageIndex: 1 ,// 当前页数
      getEducationId:''
    }
    this.columns = [
      {
        title: '序号',
        dataIndex: '1',
        key: '1',
        render: (text: any, record: any, index: number) => index + 1,
        align: 'center',
        width: 40
      },
      {
        title: '事件',
        dataIndex: 'patientEvent',
        width: '10%',
        align: 'center',
        editable: true
      },
      {
        title: '推送宣教',
        dataIndex: 'educationName',
        width: '27%',
        // render: (text: any) => (
        //   <Tooltip placement='topLeft' title={text}>
        //     {text}
        //   </Tooltip>
        // ),
        // overflow: 'hidden',
        // whiteSpace: 'nowrap',
        // textOverflow: 'ellipsis',
        // cursor: 'pointer',
        align: 'left',
        editable: true
      },
      {
        title: '推送类型',
        dataIndex: 'messageTypeName',
        width: '14%',
        align: 'left',
        editable: true
      },
      {
        title: '创建人',
        dataIndex: 'operator',
        width: '11%',
        align: 'center',
        editable: true
      },
      {
        title: '创建时间',
        dataIndex: 'createDateTime',
        width: '19%',
        align: 'center',
        editable: true
      },
      {
        title: '操作',
        dataIndex: '操作',
        align: 'center',
        width: 100,
        render: (text: any, record: any) => {
          return (
            <Wrapper>
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
            </Wrapper>
          )
        }
      }
    ]

    /** 监听事件 --- 控制添加弹窗的状态*/
    emitter.removeAllListeners('自动推送设置-添加-事件')
    emitter.addListener('自动推送设置-添加-事件', () => {
      this.setState({ type: 1 })
      this.getSelectData({}, 1)
    })

    /** 监听事件 --- 控制刷新列表数据*/
    emitter.removeAllListeners('自动推送设置-刷新-事件')
    emitter.addListener('自动推送设置-刷新-事件', () => {
      this.getMealList(null, null)
    })

  }
  public getSelectData = (record: any, value: number) => {
    // 如果是添加 则清空数据
    if (value === 1) {
      this.setState({ missionId: undefined })
      this.setState({ patientId: '' })
      this.setState({ messageType: '' })
    }
    // 如果是修改则回显数据
    if (value === 0) {
      this.setState({ searchValue: record.educationName })
      this.setState({ missionId: record.educationName })
    }
    this.setState({ rowData: record })
    service.healthyApiService.getPushType().then((res) => {
      if (res && res.data) {
        this.setState({ selectData1: res.data })
        // 如果是修改则回显数据
        if (value === 0) {
          this.setState({ messageType: record.messageType })
        }
      }
    })
    service.healthyApiService.getEventType().then((res) => {
      if (res && res.data) {
        this.setState({ selectData2: res.data })
        // 如果是修改则回显数据
        if (value === 0) {
          let eventCode = res.data.filter((item: any) => item.eventName === record.patientEvent)[0].eventCode
          this.setState({ patientId: eventCode })
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
        service.healthyApiService.deteleAutomatic(record).then((res) => {
          this.getMealList(null, null)
          message.success('删除成功')
        })
      }
    })
  }

  //预览
  public preview = (record:any) => {
    let getEducationId = record.educationId
    console.log(getEducationId,'0000000000')
    let missionUrl = (getEducationId:any) => `/crNursing/nurseList/content.html?id=${getEducationId}`
    let url = missionUrl(getEducationId); 
    url = "http://120.25.105.45:9864" + url;
    console.log(url)
    window.location.href = url
    // http://120.25.105.45:9864/crNursing/nurseList/content.html?id=199573
  }

  public getMealList = (current: any, pageSize: any) => {
    this.setState({ loadingTable: true })
    let postData = {
      pageSize: pageSize ? pageSize : this.state.pageSize,
      pageIndex: current ? current : this.state.pageIndex,
      wardCode: authStore.selectedDeptCode // string 必须参数 科室编码
    }
    service.healthyApiService.getAutomatic(postData).then((res) => {
      this.setState({ loadingTable: false })
      this.setState({ total: res.data ? res.data.totalCount : 0 })
      if (res.data && res.data.list && Object.keys(res.data.list).length > 0) {
        let array: any = []
        res.data.list.map((item: any) => {
          item.key = item.serialNo
          array.push(item)
        })
        this.setState({ data: array })
      } else {
        this.setState({ data: [] })
      }
    })
  }
  public searchChange(value: any) {
    if (!value) {
      return
    }
    this.setState({ missionId: value })
    let educationName = this.state.arrayData.filter((item: any) => item.missionId === value)[0].name
    this.setState({ searchValue: educationName })
  }
  //时时查询
  public toSearch(value: any) {
    let postData = {
      educationName: value,
      wardCode: authStore.selectedDeptCode,
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
        this.setState({ children: array })
      } else {
        this.setState({ loading: false })
        this.setState({ children: [] })
      }
    })
  }

  public handleOk() {
    if (!this.state.searchValue || !this.state.patientId || !this.state.messageType) {
      message.warning('保存前请将每一项信息填写完整')
      return
    }
    let postData = {}
    let eventName = this.state.selectData2.filter((item: any) => item.eventCode === this.state.patientId)[0].eventName
    // 修改入参
    if (this.state.type === 0) {
      postData = {
        serialNo: this.state.rowData.serialNo, // string 非必须参数
        wardCode: this.state.rowData.wardCode, // string 非必须参数
        educationId: this.state.rowData.educationId, // string 非必须参数
        educationName: this.state.searchValue, // string 非必须参数
        createDateTime: this.state.rowData.createDateTime, // string 非必须参数
        operator: this.state.rowData.operator, // string 非必须参数
        messageType: this.state.messageType, // string 非必须参数
        patientEvent: eventName // string 非必须参数
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
        educationName: this.state.searchValue, // string 非必须参数
        messageType: this.state.messageType, // string 非必须参数
        patientEvent: eventName, // string 非必须参数
        operator: empNo
      }
    }
    service.healthyApiService.preservationAutomatic(postData).then((res) => {
      if (res) {
        message.success(this.state.type === 0 ? '修改成功！' : '新增成功！')
        this.getMealList(null, null)
        this.setState({ editingKey: false })
      }
    })
  }
  public isEditing = (record: any) => record.key === this.state.editingKey
  public columns: any = []
  public componentWillMount() {
    this.getMealList(null, null)
  }
  public edit(key: any) {
    this.setState({ editingKey: key })
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
    const options = this.state.data.map((d: any) => <Option key={d.value}>{d.text}</Option>)
    const components = {
      body: {
        cell: EditableCell
      }
    }

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
              components={components}
              bordered
              dataSource={this.state.data}
              columns={columns}
              rowClassName={() => 'editable-row'}
              pagination={false}
              scroll={{ y: 304 }}
              loading={this.state.loadingTable}
              // getTableData={() => emitter.emit('refreshNurseAuditTable')}
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
            className='modal'
            centered={true}
            title='推送设置'
            visible={this.state.editingKey}
            onOk={this.handleOk.bind(this)}
            width='650px'
            okText='保存'
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
                value={this.state.missionId}
                style={{ width: '72%' }}
                // dropdownStyle={{height:'50px'}}
                placeholder='输入名称进行检索'
                defaultActiveFirstOption={false}
                showArrow={false}
                loading={this.state.loading}
                filterOption={false}
                onChange={this.searchChange.bind(this)}
                onSearch={this.toSearch.bind(this)}
                notFoundContent='没有你查找的内容'
              >
                {this.state.children}
              </Select>
            </div>
            <div className='category' style={{ marginTop: '40px' }}>
              <SpanOne>事件类型：</SpanOne>
              <Select
                value={this.state.patientId}
                onChange={(value) => this.setState({ patientId: value })}
                showSearch
                style={{ width: '72%' }}
                placeholder='选择类型'
              >
                {this.state.selectData2.map((item: any) => (
                  <Select.Option value={item.eventCode} key={item.eventCode}>
                    {item.eventName}
                  </Select.Option>
                ))}
              </Select>
            </div>
            <div className='category' style={{ marginTop: '40px', marginBottom: '30px' }}>
              <SpanOne>推送类型：</SpanOne>
              <Select
                value={this.state.messageType}
                onChange={(value) => this.setState({ messageType: value })}
                showSearch
                style={{ width: '72%', height: 40 }}
                placeholder='选择类型'
              >
                {this.state.selectData1.map((item: any) => (
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
    .ant-table-row td:nth-child(3) {
      padding-left: 20px !important;
    }
    .ant-table-row td:nth-child(4) {
      padding-left: 20px !important;
    }
  }
`
const PaginationBox = styled.div`
  clear: both;
  text-align: right;
  padding-top: 10px;
  padding-right: 19px;
`
const BigBox = styled.div`
  padding-bottom: 20px;
`

const EditableFormTable = Form.create()(EditableTable) as any

export default EditableFormTable
