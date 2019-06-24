import styled from 'styled-components'
import React from 'react'
import { Input, InputNumber,  Form, Modal, Select, message } from 'antd'
import BaseTable from 'src/components/BaseTable'
import service from 'src/services/api'
import { authStore } from 'src/stores/index'
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
    this.state = { data: [], editingKey: false, selectData1: [], educationName: '', patientEvent: '', messageType: '' }
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
        title: '医嘱',
        dataIndex: 'operation',
        width: '15%',
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
              <a onClick={() => {this.getSelectData()}}>
                修改
              </a>
            </div>
          )
        }
      }
    ]
  }
  public getSelectData = () => {
    service.healthyApiService.getPushType().then((res) => {
      if (res && res.data) {
        this.setState({ selectData1: res.data })
      }
    })
    this.setState({ editingKey: true })
  }
  public getMealList = () => {
    let postData = {
      wardCode: authStore.selectedDeptCode // string 必须参数 科室编码
    }
    service.healthyApiService.getPushList2(postData).then((res) => {
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
  public handleOk() {
    const postData = {
      serialNo: this.state.data.serialNo, // string 非必须参数
      wardCode: this.state.data.wardCode, // string 非必须参数
      educationId: this.state.data.educationId, // string 非必须参数
      educationName: this.state.educationName, // string 非必须参数
      createDateTime: this.state.data.createDateTime, // string 非必须参数
      operator: this.state.data.operator, // string 非必须参数
      messageType: this.state.messageType, // string 非必须参数
      patientEvent: this.state.patientEvent, // string 非必须参数
    }
    service.healthyApiService.preservationPushType2(postData).then((res) => {
      if (res) {
        message.success('修改成功')
        this.getMealList()
        this.setState({ editingKey: false })
      }
    })
  }
  public componentWillMount () {
    this.getMealList()
  }
  public isEditing = (record: any) => record.key === this.state.editingKey
  public columns: any = []
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
          pagination={false}
        />
        <Modal
          title='推送设置'
          visible={this.state.editingKey}
          onOk={this.handleOk.bind(this)}
          okText='保存'
          cancelText='返回'
          onCancel={() => {
            this.setState({ editingKey: false })
          }}
        >
          <div className='category'>
            <div>宣教:</div>
            <Input
              placeholder='输入名称进行检索'
              onChange={(e) => {
                this.setState({ educationName: e.target.value })
              }}
            />
            <a>查询</a>
          </div>
          <div className='category'>
            <div>医嘱内容：</div>
            <Input
              placeholder='输入名称进行检索'
              onChange={(e) => {
                this.setState({ patientEvent: e.target.value })
              }}
            />
          </div>

          <div className='category'>
            <div>推送类型：</div>
            <Select onChange={value => this.setState({ messageType: value }) } showSearch style={{ width: '100%' }} placeholder='选择类型'>
              {this.state.selectData1.map((item: any) => (
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
