import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Table, Input, InputNumber, Popconfirm, Form } from 'antd'
import BaseTable from 'src/components/BaseTable'

const data: any = []
data.push({
  key: '一次性针头',
  物品类别: `一次性针头`,
  预计重量: 10,
  备注: `注意安全`
})
data.push({
  key: '血袋',
  物品类别: `血袋`,
  预计重量: 2
})
data.push({
  key: '药品盒子',
  物品类别: `药品盒子`,
  预计重量: 4
})
data.push({
  key: '输液袋',
  物品类别: `输液袋`,
  预计重量: 7
})
data.push({
  key: '其他',
  物品类别: `其他`,
  预计重量: 6
})
for (let i = 0; i < 2; i++) {
  data.push({
    key: i,
    物品类别: ``,
    预计重量: ''
  })
}
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
    this.state = { data, editingKey: '' }
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
        title: '物品类别',
        dataIndex: '物品类别',
        width: '25%',
        editable: true
      },
      {
        title: '预计重量(kg)',
        dataIndex: '预计重量',
        width: '15%',
        editable: true
      },
      {
        title: '备注',
        dataIndex: '备注',
        width: '30%',
        editable: true
      },
      {
        title: '操作',
        dataIndex: '操作',
        width: 100,
        render: (text: any, record: any) => {
          const { editingKey } = this.state
          const editable = this.isEditing(record)
          return (
            <div>
              {editable ? (
                <span>
                  <EditableContext.Consumer>
                    {(form) => (
                      <a href='javascript:;' onClick={() => this.save(form, record.key)} style={{ marginRight: 8 }}>
                        保存
                      </a>
                    )}
                  </EditableContext.Consumer>
                  <Popconfirm title='取消后会丢失改动的数据，确认取消?' onConfirm={() => this.cancel(record.key)}>
                    <a>取消</a>
                  </Popconfirm>
                </span>
              ) : (
                <a data-disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
                  编辑
                </a>
              )}
            </div>
          )
        }
      }
    ]
  }

  public isEditing = (record: any) => record.key === this.state.editingKey
  public columns: any = []
  public cancel = (key: any) => {
    this.setState({ editingKey: '' })
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
      </EditableContext.Provider>
    )
  }
}

const EditableFormTable = Form.create()(EditableTable)

export default EditableFormTable
