import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
// import { Link } from 'react-router-dom'

// import ModalBox from 'src/modules/schedule/views/components/Modal/ModalBox'

import emitter from 'src/libs/ev'

import { Button, message, Modal, Form, Input, AutoComplete, TimePicker, Switch } from 'antd'
// import { authStore, scheduleStore } from 'src/stores'
import service from 'src/services/api'
import moment from 'moment'
import { scheduleStore } from 'src/stores'

// import emitter from 'src/libs/ev'

// const Option = Select.Option
export interface Props extends RouteComponentProps {}

export default function ToolBar () {
  const [count, setCount] = useState(0)

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    //
    console.log(count, setCount)

    emitter.removeAllListeners('弹窗编辑排班')

    emitter.addListener('弹窗编辑排班', (record: any) => {
      fields = {
        shiftName: {
          value: record.name || ''
        },
        id: {
          value: record.key || ''
        },
        type: {
          value: record.shiftType || ''
        },
        workTime: {
          value: record.workTime || ''
        },
        workHour: {
          value: record.effectiveTime || ''
        },
        color: {
          value: colorMap[record.nameColor] || ''
        },
        status: {
          value: record.status != null ? record.status : true
        }
      }
      console.log('编辑排班-', record)
      addShift('编辑排班')
    })
  }, []) // <= 执行初始化操作，需要注意的是，如果你只是想在渲染的时候初始化一次数据，那么第二个参数必须传空数组。

  const save = (e: any) => {
    // 获取选中班次
    // console.log('获取选中班次', e)
    // return
    emitter.emit('获取选中班次列表', (shiftList: any) => {
      // message.success('保存排班班次设置')
      console.log('获取选中班次', shiftList)
      // return
      shiftList = shiftList.filter((u: any) => {
        return u.status !== null
      })
      service.scheduleShiftApiService.saveAll(shiftList).then((res) => {
        message.success('保存排班班次设置成功')
        // emitter.emit('更新班次列表')
        console.log('保存排班班次', res)
      })
    })
  }

  let customizedForm: any = null
  const CustomizedForm = Form.create({
    // name: 'coordinated',
    onFieldsChange (props: any, changedFields: any) {
      // props = { ...props, ...changedFields }
      props.onChange(changedFields)
    },
    mapPropsToFields (props: any) {
      console.log('mapPropsToFields', props)
      return {
        id: Form.createFormField({
          ...props.id,
          value: props.id.value
        }),
        shiftName: Form.createFormField({
          ...props.shiftName,
          value: props.shiftName.value
        }),
        type: Form.createFormField({
          ...props.type,
          value: props.type.value
        }),
        workTime: Form.createFormField({
          ...props.workTime,
          value: props.workTime.value
        }),
        // startTime: Form.createFormField({
        //   ...props.startTime,
        //   value: props.startTime.value
        // }),
        // endTime: Form.createFormField({
        //   ...props.endTime,
        //   value: props.endTime.value
        // }),
        workHour: Form.createFormField({
          ...props.workHour,
          value: props.workHour.value
        }),
        color: Form.createFormField({
          ...props.color,
          value: props.color.value
        }),
        status: Form.createFormField({
          ...props.status,
          value: props.status.value
        })
      }
    },
    onValuesChange (_: any, values: any) {
      console.log(values)
    }
  })((props: any) => {
    const { getFieldDecorator } = props.form
    customizedForm = props.form
    return (
      <Form layout='inline'>
        <Form.Item label='班次名称'>
          {getFieldDecorator('shiftName', {
            rules: [{ required: false, message: '班次名称在同一科室下为唯一' }]
          })(<Input style={{ width: inputWidth }} />)}
        </Form.Item>
        <Form.Item label='所属类别'>
          {getFieldDecorator('type', {
            rules: [{ required: false, message: '' }]
          })(
            <AutoComplete
              style={{ width: inputWidth }}
              dataSource={dataSource}
              placeholder='A班'
              filterOption={(inputValue: any, option: any) =>
                option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1 ||
                dataSource.indexOf(inputValue.toUpperCase()) > -1
              }
            />
          )}
        </Form.Item>
        <Form.Item label='上班时间'>
          {getFieldDecorator('workTime', {
            rules: [{ required: false, message: '' }]
          })(<Input style={{ width: inputWidth }} />)}
        </Form.Item>
        {/* <Form.Item label='开始时间'>
          {getFieldDecorator('startTime', {
            rules: [{ required: false, message: '' }]
          })(<TimePicker style={{ width: inputWidth }} />)}
        </Form.Item> */}
        {/* <Form.Item label='结束时间'>
          {getFieldDecorator('endTime', {
            rules: [{ required: false, message: '' }]
          })(<TimePicker style={{ width: inputWidth }} />)}
        </Form.Item> */}
        <Form.Item label='标准工时'>
          {getFieldDecorator('workHour', {
            rules: [{ required: false, message: '' }]
          })(<Input style={{ width: inputWidth }} placeholder='标准工时' />)}
        </Form.Item>
        <Form.Item label='颜色标记'>
          {getFieldDecorator('color', {
            rules: [{ required: false, message: '' }]
          })(
            <AutoComplete
              style={{ width: inputWidth }}
              dataSource={dataSourceColorCN}
              placeholder='红色'
              filterOption={(inputValue: any, option: any) =>
                option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1 ||
                (dataSourceColorCN.indexOf(inputValue) > -1 || dataSourceColorCN.indexOf(inputValue) === -1)
              }
            />
          )}
        </Form.Item>
        <Form.Item label='启用状态'>{getFieldDecorator('status', { valuePropName: 'checked' })(<Switch />)}</Form.Item>
      </Form>
    )
  })

  const handleFormChange = (changedFields: any) => {
    fields = { ...fields, ...changedFields }
    console.log('handleFormChange', changedFields, customizedForm)
    // console.log('onFieldsChange', props, changedFields)
    // let diff = 0
    // let dateFormat = 'YYYY-MM-DD HH:mm:ss'
    // try {
    //   if (Object.keys(changedFields).indexOf('startTime') > -1) {
    //     diff = fields.endTime.value.diff(changedFields.startTime.value, 'hours')
    //   } else if (Object.keys(changedFields).indexOf('endTime') > -1) {
    //     diff = changedFields.endTime.value.diff(fields.startTime.value, 'hours')
    //   }
    //   if (diff) {
    //     diff = Math.abs(diff)
    //     fields.workHour.value = `${diff}`
    //     customizedForm.setFieldsValue({ workHour: diff })
    //   }
    // } catch (error) {
    //   //
    // }
    // console.log('工时', diff, fields.endTime)
  }

  let fields = {
    shiftName: {
      value: ''
    },
    id: {
      value: ''
    },
    type: {
      value: 'A班'
    },
    // startTime: {
    //   value: moment(new Date(), 'HH:mm:ss')
    // },
    // endTime: {
    //   value: moment(new Date(), 'HH:mm:ss').add(8, 'h')
    // },
    workTime: {
      value: '8:00 - 16:00'
    },
    workHour: {
      value: '8'
    },
    color: {
      value: '灰色'
    },
    status: {
      value: true
    }
  }

  const onOk = () => {
    console.log('提交表单', fields)
    const postData = {
      id: fields.id.value, // 	Long 必须参数 班次名称
      name: fields.shiftName.value, // 	Long 必须参数 班次名称
      deptCode: scheduleStore.getDeptCode(), // string 必须参数 科室编码
      shiftType: fields.type.value, // string 必须参数 所属类别
      workTime: fields.workTime.value, // string
      // startTime: fields.startTime.value.format('HH:mm'), // string 必须参数 开始时间
      // endTime: fields.endTime.value.format('HH:mm'), // string 必须参数 结束时间
      effectiveTime: fields.workHour.value, // string 必须参数 标准工时
      nameColor: colorMapCN[fields.color.value], // string 必须参数 班次颜色
      status: fields.status.value // Boolean 必须参数 启用状态 true或者false
    }
    service.scheduleShiftApiService.save(postData).then((res) => {
      message.success('添加班次成功')
      emitter.emit('更新班次列表')
      console.log('添加班次成功', res)
      // 更新班次列表
    })
    // message.success('onOk')
  }

  let inputWidth = '250px'
  let dataSource = ['A班', 'P班', 'N班', '休假', '进修学习', '其他']
  let dataSourceColor = ['red', 'green', 'blue', 'yellow', 'black', 'gray']
  let dataSourceColorCN = ['红色', '绿色', '蓝色', '黄色', '黑色', '灰色']

  let colorMap:any = {
    'red':'红色',
    'green':'绿色',
    'blue':'蓝色',
    'yellow':'黄色',
    'black':'黑色',
    'gray':'灰色'
  }

  let colorMapCN:any = {
    '红色':'red',
    '绿色':'green',
    '蓝色':'blue',
    '黄色':'yellow',
    '黑色':'black',
    '灰色':'gray'
  }

  // let modalInfo: any = null

  const addShift = (title: string) => {
    // message.success('添加班次')
    // console.log('Modal', Modal)
    if (title === '添加排班') {
      fields = {
        shiftName: {
          value: ''
        },
        id: {
          value: ''
        },
        type: {
          value: 'A班'
        },
        workTime: {
          value: '8:00 - 16:00'
        },
        workHour: {
          value: '8'
        },
        color: {
          value: '灰色'
        },
        status: {
          value: true
        }
      }
    }

    // startTime: {
    //   value: moment(new Date(), 'HH:mm:ss')
    // },
    // endTime: {
    //   value: moment(new Date(), 'HH:mm:ss').add(8, 'h')
    // },
    // if (!modalInfo) {
    Modal.confirm({
      title: title + '',
      centered: true,
      // visible: false,
      onOk: onOk,
      onCancel: () => {
        // message.success('onCancel')
        // modalInfo.destroy()
      },
      iconType: 'form',
      width: '500px',
      content: (
        <div>
          <CustomizedForm {...fields} onChange={handleFormChange} />
        </div>
      )
    })
    // } else {
    //   modalInfo.update({ visible: true })
    // }
  }

  // {/* <ModalBox title={'添加排班/编辑排班'} /> */}

  return (
    <Wrapper>
      <Title>班次设置</Title>
      <div style={{ flex: 1 }} />
      <Button
        onClick={() => {
          addShift('添加排班')
        }}
        style={{ marginLeft: 5, marginRight: 5 }}
      >
        添加班次
      </Button>
      <Button onClick={save} style={{ marginLeft: 5, marginRight: 5 }}>
        保存
      </Button>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  /* background: #eee; */
  height: auto;
  padding: 0 20px 20px 20px;
  display: inline-flex;
  width: 100%;
  align-items: flex-end;

  form.Item {
    width: '250px';
  }
`
// const TimePicker = styled.div`
//   width: '200px';
// `

// const BreakLine = styled.div`
//   padding: 0 10px;
// `

// const LinkText = styled.div`
//   cursor: pointer;
// `

const Title = styled.div`
  font-size: 20px;
`
