import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Table, Input, InputNumber, Popconfirm, Form, Modal, Select, Radio, message } from 'antd'
import BaseTable from 'src/components/BaseTable'
import service from 'src/services/api'
import { authStore } from 'src/stores'

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
    this.state = { data: [], rowData: {}, editingKey: false, selectData: [], operationTiming: '', educationName: '', messageType: '', operation: ''}
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
        align: 'left',
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
                <a onClick={() => {this.getSelectData(record)}}>
                  修改
                </a>
                <Popconfirm
                  title='确认要删除?'
                  onConfirm={e => {
                    service.healthyApiService.detelePushType1(record).then((res) => {
                      this.getMealList()
                      message.success('删除成功')
                    })
                  }}
                >
                  <a href='javascript:;'>删除</a>
                </Popconfirm>
            </div>
          )
        }
      }
    ]
  }
  public getSelectData = (record: any) => {
    this.setState({rowData: record})
    service.healthyApiService.getPushType().then((res) => {
      if (res && res.data) {
        this.setState({ selectData: res.data })
      }
    })
    this.setState({ editingKey: true })
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
  public toSearch() {
    let postData = {
      educationName: this.state.educationName[0],
      wardCode: deptCode,
      // messageType: this.state.messageType
    }
    // console.log(postData.messageType,"0000000000000000000")

    service.healthyApiService.getBriefMission(postData).then((res) => {
      if (res && res.data && res.data.length > 0) {
        let array: any = []
        res.data.map((item: any, i: any) => {
          array.push(<Option key={i + 'key'}>{item.name}</Option>)
        })
        this.setState({ children: array })
      }
    })
  }
  public handleOk () {
    const postData = {
      serialNo: this.state.rowData.serialNo, // string 非必须参数
      wardCode: this.state.rowData.wardCode, // string 非必须参数
      educationId: this.state.rowData.educationId, // string 非必须参数
      educationName: this.state.educationName[0], // string 非必须参数
      operationTiming: this.state.operationTiming,// string 非必须参数(手术时机)
      createDateTime: this.state.rowData.createDateTime, // string 非必须参数
      operator: this.state.rowData.operator, // string 非必须参数
      messageType: this.state.messageType, // string 非必须参数
      operation: this.state.operation // string 非必须参数
    }
    service.healthyApiService.preservationPushType1(postData).then((res) => {
      if (res) {
        message.success('修改成功')
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
            onCancel={() => {this.setState({ editingKey: false })}}
          >
          <div className="category">
            <div>宣教:</div>
            <Select
              // maxTagTextLength= '3'
              mode='multiple'
              style={{ width: '100%'}}
              placeholder='输入名称进行检索'
              onChange={(value) => {
                this.setState({ educationName: value })
              }}
            >
              {this.state.children}
            </Select>
            <a onClick={this.toSearch.bind(this)}>查询</a>
          </div>
          <div className="category">
          <div>手术名称:</div>
          <Input defaultValue=""
            onChange={e => { this.setState({ operation: e.target.value }) }}/>

          </div>
          <div className="category">
          <div>时机:</div>
          <Radio.Group onChange={ e => { this.setState({operationTiming: e.target.value}) } } value={this.state.operationTiming}>
            <Radio value='术前'>术前</Radio>
            <Radio value='术后'>术后</Radio>
          </Radio.Group>
          </div>

          <div className="category">
          <div>推送类型：</div>
          <Select onChange={value => this.setState({ messageType: value }) } showSearch style={{ width: '100%' }} placeholder='选择类型'>
            {this.state.selectData.map((item: any) => (
              <Select.Option value={item.messageCode} key={item.messageCode}>
                {item.messageName}
              </Select.Option>
            ))}
          </Select>
          </div>
        </Modal>
      </EditableContext.Provider>
    )
  }
}

const EditableFormTable = Form.create()(EditableTable)

export default EditableFormTable
