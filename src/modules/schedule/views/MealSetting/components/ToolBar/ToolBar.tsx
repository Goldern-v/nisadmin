import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
// import { Link } from 'react-router-dom'

// import ModalBox from 'src/modules/schedule/views/components/Modal/ModalBox'

import emitter from 'src/libs/ev'

import { Button, message, Modal, Form, Input, TreeSelect, Switch } from 'antd'
// import { authStore, scheduleStore } from '@/stores'
import service from 'src/services/api'
// import moment from 'moment'
import { scheduleStore } from '@/stores'

// import emitter from 'src/libs/ev'

// const Option = Select.Option
export interface Props extends RouteComponentProps {}

export default function ToolBar () {
  const [count, setCount] = useState(0)

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    //
    console.log(count, setCount)

    emitter.removeAllListeners('弹窗编辑排班套餐')
    emitter.removeAllListeners('获取排班列表')

    // 获取排班列表
    emitter.addListener('获取排班列表', (callback: any) => {
      let deptCode = scheduleStore.getDeptCode()
      service.scheduleShiftApiService.getShiftListByCode(deptCode).then((res: any) => {
        if (res && res.data.data) {
          if (callback) {
            callback(res.data.data)
          }
        }
      })
    })

    emitter.addListener('弹窗编辑排班套餐', (record: any) => {
      fields = {
        mealName: {
          value: record.name || ''
        },
        id: {
          value: record.key || ''
        },
        mondayName: {
          value: record.mondayName || ''
        },
        tuesdayName: {
          value: record.tuesdayName || ''
        },
        wednesdayName: {
          value: record.wednesdayName || ''
        },
        thursdayName: {
          value: record.thursdayName || ''
        },
        fridayName: {
          value: record.fridayName || ''
        },
        saturdayName: {
          value: record.saturdayName || ''
        },
        sundayName: {
          value: record.sundayName || ''
        },
        status: {
          value: record.status != null ? record.status : true
        }
      }
      console.log('编辑排班-', record)
      addMeal('编辑排班套餐')
    })
    //
    console.log('初始化弹窗树', initalTreeData())
    //
  }, []) // <= 执行初始化操作，需要注意的是，如果你只是想在渲染的时候初始化一次数据，那么第二个参数必须传空数组。

  const save = (e: any) => {
    // 获取选中班次套餐
    // console.log('获取选中班次套餐', e)
    // return
    emitter.emit('获取选中班次套餐列表', (mealList: any) => {
      // message.success('保存排班班次套餐设置')
      console.log('获取选中班次套餐', mealList)
      // return
      mealList = mealList.filter((u: any) => {
        return u.status !== null
      })
      service.scheduleMealApiService.saveAll(mealList).then((res) => {
        message.success('保存排班班次套餐设置成功')
        emitter.emit('更新班次套餐列表')
        console.log('保存排班班次套餐', res)
      })
    })
  }

  let shiftList = new Array()
  let treeData = new Array()
  // let treeExpandedKeys = new Array()
  const initalTreeData = () => {
    shiftList = new Array()
    let deptCode = scheduleStore.getDeptCode()
    service.scheduleShiftApiService.getShiftListByCode(deptCode).then((res: any) => {
      console.log('获取排班列表', res)
      if (res && res.data.data) {
        shiftList = res.data.data
        console.log(shiftList)
        // 分类
        shiftList.map((s: any) => {
          let shift = treeData.filter((t) => {
            if (t.title === s.shiftType) {
              if (!t.hasOwnProperty('children')) {
                t.children = new Array()
              }
              (t.children as any).push({ title: s.name, value: s.name, key: s.shiftType + s.name, isLeaf: true })
              return t
            }
          })
          if (shift && shift.length > 0) {
            console.log(shift)
          } else {
            (treeData as any).push({
              title: s.shiftType,
              value: s.shiftType,
              key: s.shiftType,
              selectable: false,
              // disabled: true,
              isLeaf: false,
              children: [
                {
                  title: s.name,
                  value: s.name,
                  isLeaf: true,
                  key: s.shiftType + s.name
                }
              ]
            })
            //
            // ;(treeExpandedKeys as any).push(s.shiftType)
          }
        })
        console.log('分类', treeData)
      }
    })
  }

  // const treeSelectCon = () => (
  //   <TreeSelect
  //     style={{ width: inputWidth }}
  //     dropdownStyle={{ maxHeight: '400px', overflow: 'auto' }}
  //     treeData={treeData}
  //     searchPlaceholder='搜索'
  //     placeholder='请选班'
  //     allowClear
  //     showSearch
  //   />
  // )

  // const formItemLayout = {
  //   labelCol: { span: 2, offset: 0 },
  //   wrapperCol: { span: 1, offset: 0 }
  // }

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
        mealName: Form.createFormField({
          ...props.mealName,
          value: props.mealName.value
        }),
        mondayName: Form.createFormField({
          ...props.type,
          value: props.mondayName.value
        }),
        tuesdayName: Form.createFormField({
          ...props.startTime,
          value: props.tuesdayName.value
        }),
        wednesdayName: Form.createFormField({
          ...props.endTime,
          value: props.wednesdayName.value
        }),
        thursdayName: Form.createFormField({
          ...props.workHour,
          value: props.thursdayName.value
        }),
        fridayName: Form.createFormField({
          ...props.workHour,
          value: props.fridayName.value
        }),
        saturdayName: Form.createFormField({
          ...props.workHour,
          value: props.saturdayName.value
        }),
        sundayName: Form.createFormField({
          ...props.color,
          value: props.sundayName.value
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
    //

    // layout='inline' {...formItemLayout}
    return (
      <Form layout='inline'>
        <Form.Item label='套餐名称' style={FormFlexLayoutStyle()}>
          {getFieldDecorator('mealName', {
            rules: [{ required: false, message: '班次套餐名称在同一科室下为唯一' }]
          })(<Input style={{ width: inputWidth }} />)}
        </Form.Item>
        <Form.Item label='星期一' style={FormFlexLayoutStyle()}>
          {getFieldDecorator('mondayName', {
            rules: [{ required: false, message: '' }]
          })(
            <TreeSelect
              style={{ width: inputWidth }}
              dropdownStyle={{ maxHeight: '400px', overflow: 'auto' }}
              treeData={treeData}
              searchPlaceholder='搜索'
              placeholder='请选班'
              allowClear
              showSearch
            />
          )}
        </Form.Item>
        <Form.Item label='星期二' style={FormFlexLayoutStyle()}>
          {getFieldDecorator('tuesdayName', {
            rules: [{ required: false, message: '' }]
          })(
            <TreeSelect
              style={{ width: inputWidth }}
              dropdownStyle={{ maxHeight: '400px', overflow: 'auto' }}
              treeData={treeData}
              searchPlaceholder='搜索'
              placeholder='请选班'
              allowClear
              showSearch
            />
          )}
        </Form.Item>
        <Form.Item label='星期三' style={FormFlexLayoutStyle()}>
          {getFieldDecorator('wednesdayName', {
            rules: [{ required: false, message: '' }]
          })(
            <TreeSelect
              style={{ width: inputWidth }}
              dropdownStyle={{ maxHeight: '400px', overflow: 'auto' }}
              treeData={treeData}
              searchPlaceholder='搜索'
              placeholder='请选班'
              allowClear
              showSearch
            />
          )}
        </Form.Item>
        <Form.Item label='星期四' style={FormFlexLayoutStyle()}>
          {getFieldDecorator('thursdayName', {
            rules: [{ required: false, message: '' }]
          })(
            <TreeSelect
              style={{ width: inputWidth }}
              dropdownStyle={{ maxHeight: '400px', overflow: 'auto' }}
              treeData={treeData}
              searchPlaceholder='搜索'
              placeholder='请选班'
              allowClear
              showSearch
            />
          )}
        </Form.Item>
        <Form.Item label='星期五' style={FormFlexLayoutStyle()}>
          {getFieldDecorator('fridayName', {
            rules: [{ required: false, message: '' }]
          })(
            <TreeSelect
              style={{ width: inputWidth }}
              dropdownStyle={{ maxHeight: '400px', overflow: 'auto' }}
              treeData={treeData}
              searchPlaceholder='搜索'
              placeholder='请选班'
              allowClear
              showSearch
            />
          )}
        </Form.Item>
        <Form.Item label='星期六' style={FormFlexLayoutStyle()}>
          {getFieldDecorator('saturdayName', {
            rules: [{ required: false, message: '' }]
          })(
            <TreeSelect
              style={{ width: inputWidth }}
              dropdownStyle={{ maxHeight: '400px', overflow: 'auto' }}
              treeData={treeData}
              searchPlaceholder='搜索'
              placeholder='请选班'
              allowClear
              showSearch
            />
          )}
        </Form.Item>
        <Form.Item label='星期日' style={FormFlexLayoutStyle()}>
          {getFieldDecorator('sundayName', {
            rules: [{ required: false, message: '' }]
          })(
            <TreeSelect
              style={{ width: inputWidth }}
              dropdownStyle={{ maxHeight: '400px', overflow: 'auto' }}
              treeData={treeData}
              searchPlaceholder='搜索'
              placeholder='请选班'
              allowClear
              showSearch
            />
          )}
        </Form.Item>
        <Form.Item label='启用' style={FormFlexLayoutStyle('266px')}>
          {getFieldDecorator('status', { valuePropName: 'checked' })(<Switch />)}
        </Form.Item>
      </Form>
    )
  })

  const handleFormChange = (changedFields: any) => {
    fields = { ...fields, ...changedFields }
    console.log('handleFormChange', changedFields, customizedForm)
    // console.log('onFieldsChange', props, changedFields)
    //   let diff = 0
    //   // let dateFormat = 'YYYY-MM-DD HH:mm:ss'
    //   try {
    //     if (Object.keys(changedFields).indexOf('startTime') > -1) {
    //       diff = fields.endTime.value.diff(changedFields.startTime.value, 'hours')
    //     } else if (Object.keys(changedFields).indexOf('endTime') > -1) {
    //       diff = changedFields.endTime.value.diff(fields.startTime.value, 'hours')
    //     }
    //     if (diff) {
    //       diff = Math.abs(diff)
    //       fields.workHour.value = `${diff}`
    //       customizedForm.setFieldsValue({ thursdayName: diff })
    //     }
    //   } catch (error) {
    //     //
    //   }
    //   console.log('工时', diff, fields.endTime)
  }

  let fields = {
    mealName: {
      value: ''
    },
    id: {
      value: ''
    },
    mondayName: {
      value: ''
    },
    tuesdayName: {
      value: ''
    },
    wednesdayName: {
      value: ''
    },
    thursdayName: {
      value: ''
    },
    fridayName: {
      value: ''
    },
    saturdayName: {
      value: ''
    },
    sundayName: {
      value: ''
    },
    status: {
      value: true
    }
  }

  const getShiftIdByName = (name: string) => {
    let result = shiftList.filter((s) => s.name === name)
    if (result.length > 0) {
      return result[0].id
    } else {
      return ''
    }
  }

  const onOk = () => {
    console.log('提交表单', fields, shiftList)
    const postData = {
      id: fields.id.value, // 	Long 必须参数 班次套餐名称
      name: fields.mealName.value, // 	Long 必须参数 班次套餐名称
      deptCode: scheduleStore.getDeptCode(), // string 必须参数 科室编码
      monday: getShiftIdByName(fields.mondayName.value) || '', // string 必须参数 所属类别
      tuesday: getShiftIdByName(fields.tuesdayName.value) || '', // string 必须参数 开始时间
      wednesday: getShiftIdByName(fields.wednesdayName.value) || '', // string 必须参数 结束时间
      thursday: getShiftIdByName(fields.thursdayName.value) || '', // string 必须参数 标准工时
      friday: getShiftIdByName(fields.fridayName.value) || '', // string 必须参数 标准工时
      saturday: getShiftIdByName(fields.saturdayName.value) || '', // string 必须参数 标准工时
      sunday: getShiftIdByName(fields.sundayName.value) || '', // string 必须参数 班次套餐颜色
      status: fields.status.value || false // Boolean 必须参数 启用状态 true或者false
    }
    console.log('提交表单postData', postData)
    service.scheduleMealApiService.save(postData).then((res) => {
      message.success('添加班次套餐成功')
      emitter.emit('更新班次套餐列表')
      console.log('添加班次套餐成功', res)
      // 更新班次套餐列表
    })
    // message.success('onOk')
  }

  let inputWidth = '250px'
  // let dataSource = ['A班', 'P班', 'N班', '休假', '进修学习', '其他']
  // let dataSourceColor = ['red', 'green', 'blue', 'yellow', 'black', 'gray']

  // let modalInfo: any = null

  const addMeal = (title: string) => {
    // message.success('添加班次套餐')
    // console.log('Modal', Modal)
    if (title === '添加排班套餐') {
      fields = {
        mealName: {
          value: ''
        },
        id: {
          value: ''
        },
        mondayName: {
          value: ''
        },
        tuesdayName: {
          value: ''
        },
        wednesdayName: {
          value: ''
        },
        thursdayName: {
          value: ''
        },
        fridayName: {
          value: ''
        },
        saturdayName: {
          value: ''
        },
        sundayName: {
          value: ''
        },
        status: {
          value: true
        }
      }
    }
    // if (!modalInfo) {
    Modal.confirm({
      title: title + '',
      centered: true,
      // visible: false,
      onOk: onOk,
      onCancel: () => {
        message.success('onCancel')
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
      <Title>班次套餐设置</Title>
      <div style={{ flex: 1 }} />
      <Button
        onClick={() => {
          addMeal('添加排班')
        }}
        style={{ marginLeft: 20, marginRight: 10 }}
      >
        添加班次套餐
      </Button>
      <Button onClick={save} style={{ marginLeft: 20, marginRight: 10 }}>
        保存
      </Button>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  /* background: #eee; */
  height: 100%;
  padding: 0 20px 20px 20px;
  display: inline-flex;
  width: 100%;
  align-items: flex-end;

  form.Item {
    width: '250px';
    display: flex !important;
    margin-right: 60px !important;
    margin-bottom: 0;
    justify-content: flex-end !important;
  }
`
const FormFlexLayoutStyle = (offset: string = '60px') => ({
  display: 'flex',
  marginRight: offset,
  marginBottom: 0,
  justifyContent: 'flex-end'
})

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
