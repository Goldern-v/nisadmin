import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Table, Input, InputNumber, Popconfirm, Button, Form, Modal, Select, Radio, message } from 'antd'
import BaseTable from 'src/components/BaseTable'
import service from 'src/services/api'
import { authStore } from 'src/stores'
import emitter from 'src/libs/ev'
const { Option } = Select
// import TableHeader from 'src/modules/setting/view/common/TableHeader.tsx'
const FormItem = Form.Item
const EditableContext = React.createContext<any>({})
const deptCode = authStore.selectedDeptCode

class EditableCell extends React.Component<any> {
  public getInput = () => {
    if (this.props.inputType === 'number') {  
      return <InputNumber />
    }
    return <Input />
  }

  public render () {
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
  public constructor (props: any) {
    super(props)
    this.state = {
      data: [],
      arrayData: [],
      searchData: [],
      type: 0, // 0-修改 1-新增
      searchValue: '',
      missionId: '',
      rowData: {},
      visible: false,
      editingKey: false,
      selectData: [],
      operationTiming: '',
      educationName: '',
      messageType: '',
      operation: '',
      timeout: null,
      loading: false
    }
    this.columns = [
      {
        title: '序号',
        dataIndex: '1',
        key: '1',
        render: (text: any, record: any, index: number) => index + 1,
        align: 'center',
        width: 60
      },
      {
        title: '手术',
        dataIndex: 'operation',
        width: '15%',
        align: 'center',
        editable: true
      },
      {
        title: '时机',
        dataIndex: 'operationTiming',
        width: '8%',
        align: 'center',
        editable: true
      },
      {
        title: '推送宣教',
        dataIndex: 'educationName',
        width: '25%',
        align: 'center',
        editable: true
      },
      {
        title: '宣教编码',
        dataIndex: 'educationId',
        width: '15%',
        align: 'center',
        editable: true
      },
      {
        title: '推送类型',
        dataIndex: 'messageTypeName',
        width: '15%',
        align: 'center',
        editable: true
      },
      {
        title: '创建人',
        dataIndex: 'operator',
        width: '8%',
        align: 'center',
        editable: true
      },
      {
        title: '创建时间',
        dataIndex: 'createDateTime',
        width: '15%',
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
            <div>
                <a style={{ fontSize:'13px'}} onClick={() => {
                  this.setState({type: 0})
                  this.getSelectData(record, 0)
                  }}>
                  修改
                </a>
                <a onClick={() => this.handleDelete(record)} style={{marginLeft:"8px"}}>删除</a>
            </div>
          )
        }
      }
    ]
    /** 监听事件 */
    emitter.removeAllListeners('自动推送设置-添加-手术')
    emitter.addListener('自动推送设置-添加-手术', () => {
      this.setState({type: 1})
      this.getSelectData({}, 1)
    })
    
  }
  public getSelectData = (record: any, value: number) => {
    // 如果是添加 则清空数据
    if (value === 1) {
      this.setState({missionId: ''})
      this.setState({operation: ''})
      this.setState({messageType: ''})
      this.setState({operationTiming: ''})
    }
    // 如果是修改则回显数据
    if (value === 0) {
      this.setState({missionId: record.educationName})
      this.setState({searchValue: record.educationName})
      this.setState({operation: record.operation})
      this.setState({operationTiming: record.operationTiming})
    }
    this.setState({visible: false})
    this.setState({rowData: record})
    service.healthyApiService.getPushType().then((res) => {
      if (res && res.data) {
        this.setState({ selectData: res.data })
        // 如果是修改则回显数据
        if (value === 0) {
          this.setState({messageType: record.messageType})
        }
      }
    })
    this.setState({ editingKey: true })
  }
  // 删除
  public handleDelete = (record:any) => {
    Modal.confirm({
      title: '提示',
      content: '是否删除该推送宣教?',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        service.healthyApiService.detelePushType1(record).then((res) => {
          this.getMealList()
          message.success('删除成功')
        })
      }
    })
  }
  public isEditing = (record: any) => record.key === this.state.editingKey
  public columns: any = []
  public getMealList = () => {
    let postData = {
      wardCode: authStore.selectedDeptCode // string 必须参数 科室编码
    }
    service.healthyApiService.getPushList1(postData).then((res) => {
      if (res && res.data && Object.keys(res.data).length > 0) {
        let array: any = []
        res.data.map(
          (item: any) => {
          item.key = item.serialNo
          array.push(item)
        })
        this.setState({data: array})
      }
    })
  }
  public componentWillMount () {
    this.getMealList()
  }
  public save (form: any, key: any) {
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

  public edit (key: any) {
    this.setState({ editingKey: key })
  }

  public toSearch(value:any) {
    if (this.state.timeout){
      clearTimeout(this.state.timeout)
      this.setState({timeout: null})
    }
    this.setState({ searchValue: value })
    let postData = {
      educationName: value,
      wardCode: authStore.selectedDeptCode,
      messageType: ''
    }
    this.setState({loading: true})
    service.healthyApiService.getBriefMission(postData).then((res) => {
      if (res && res.data && res.data.length > 0) {
        let array: any = []
        this.setState({arrayData: res.data})
        res.data.map((item: any) => {
          array.push(<Option key={item.missionId}>{item.name}</Option>)
        })
        this.setState({loading: false})
        this.setState({timeout: setTimeout(this.setState({ children: array }), 300)})
      } else {
        this.setState({loading: false})
        this.setState({timeout: setTimeout(this.setState({ children: [] }), 300)})
      }
    })
  }
  public handleOk () {
    console.log(this.state, '[][[')
    if (!this.state.operationTiming || !this.state.operation || !this.state.messageType || !this.state.searchValue) {
      this.setState({visible: true})
      return
    }
    let postData = {}
    // 修改入参
    if (this.state.type === 0) {
      postData = {
        serialNo: this.state.rowData.serialNo, // string 非必须参数
        wardCode: this.state.rowData.wardCode, // string 非必须参数
        educationId: this.state.rowData.educationId, // string 非必须参数
        educationName: this.state.searchValue, // string 非必须参数
        operationTiming: this.state.operationTiming,// string 非必须参数(手术时机)
        createDateTime: this.state.rowData.createDateTime, // string 非必须参数
        operator: this.state.rowData.operator, // string 非必须参数
        messageType: this.state.messageType, // string 非必须参数
        operation: this.state.operation // string 非必须参数
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
        operationTiming: this.state.operationTiming,// string 非必须参数(手术时机)
        educationName: this.state.searchValue, // string 非必须参数
        messageType: this.state.messageType, // string 非必须参数
        operator: empNo,
        operation: this.state.operation // string 非必须参数
      }
    }
    service.healthyApiService.preservationPushType1(postData).then((res) => {
      if (res) {
        message.success(this.state.type === 0 ? '修改成功！' : '新增成功！')
        this.getMealList()
        this.setState({ editingKey: false })
      }
    })
  }

  public render () {
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
      <EditableContext.Provider value={this.props.form}>
        <BaseTable
          size='small'
          components={components}
          bordered
          dataSource={this.state.data}
          columns={columns}
          rowClassName={() => 'editable-row'}
          // pagination={false}
          pagination={{
          total: this.state.data.length,
          current: 1
        }}
        />
          <Modal
            title="推送设置"
            visible={this.state.editingKey}
            onOk={this.handleOk.bind(this)}
            okText="保存"
            cancelText="返回"
            onCancel={() => {
              this.setState({ editingKey: false })
            }}
          >
          <div className="category">
            <SpanOne><span>宣</span>教:</SpanOne>
            <Select
              showSearch
              value={this.state.missionId}
              style={{ width: '80%'}}
              defaultActiveFirstOption={false}
              showArrow={false}
              loading={this.state.loading}
              filterOption={false}
              onChange={(value) => this.setState({ missionId: value })}
              onSearch={this.toSearch.bind(this)}
              notFoundContent='没有你查找的内容'
              placeholder='输入名称进行'
            >
              {this.state.children}
            </Select>
          </div>
          <div className="category" style={{marginTop: '20px'}}>
          <SpanOne>手术名称:</SpanOne>
          <Input defaultValue="" style={{ width: '80%'}}
            value={this.state.operation}
            onChange={e => { this.setState({ operation: e.target.value }) }}/>
          </div>
          <div className="category" style={{marginTop: '20px'}}>
          <SpanOne><span>时</span>机:</SpanOne>
          <Radio.Group onChange={ e => { this.setState({operationTiming: e.target.value}) } } value={this.state.operationTiming}>
            <Radio value='术前'>术前</Radio>
            <Radio value='术后'>术后</Radio>
          </Radio.Group>
          </div>

          <div className="category" style={{marginTop: '20px'}}>
          <SpanOne>推送类型：</SpanOne>
          <Select value={this.state.messageType} onChange={value => this.setState({ messageType: value }) } showSearch style={{ width: '80%' }} placeholder='选择类型'>
            {this.state.selectData.map((item: any) => (
              <Select.Option value={item.messageCode} key={item.messageCode}>
                {item.messageName}
              </Select.Option>
            ))}
          </Select>
          </div>
          <div>{this.state.visible ? (<SpanTwo className="error">每一项不为空!</SpanTwo>) : ''}</div>
        </Modal>
      </EditableContext.Provider>
    )
  }
}

const SpanOne = styled.span`
display:inline-block;
width:75px;
text-align:justify;
  span{
    margin-right:28px;
  }
`
const SpanTwo = styled.span`
  padding-left: 75px;
  color: red;
  line-height: 25px;
`
const EditableFormTable = Form.create()(EditableTable)
export default EditableFormTable