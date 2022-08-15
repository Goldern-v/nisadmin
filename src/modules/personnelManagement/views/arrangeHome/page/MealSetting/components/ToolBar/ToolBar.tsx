import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
// import { Link } from 'react-router-dom'

// import ModalBox from 'src/modules/schedule/views/components/Modal/ModalBox'

// BaseTreeSelect
import BaseTreeSelect from 'src/components/BaseTreeSelect'
import emitter from 'src/libs/ev'

import { Button, message, Modal, Form, Input, TreeSelect, Switch, Select, Cascader } from 'antd'
// import { authStore, scheduleStore } from 'src/stores'
import service from 'src/services/api'
// import moment from 'moment'
import { scheduleStore, appStore } from 'src/stores'
import BreadcrumbBox from 'src/layouts/components/BreadcrumbBox'
import DeptSelect from "src/modules/statistic/common/DeptSelect";
import { arrangeService } from "src/modules/personnelManagement/views/arrangeHome/services/ArrangeService";

// import emitter from 'src/libs/ev'

const Option = Select.Option
export interface Props extends RouteComponentProps { }

export default function ToolBar() {
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {

    emitter.removeAllListeners('弹窗编辑排班套餐')
    emitter.removeAllListeners('获取排班列表')

    // 获取排班列表
    emitter.addListener('获取排班列表', (callback: any) => {
      let deptCode = scheduleStore.getDeptCode()
      service.scheduleShiftApiService.getShiftListByCode(deptCode).then((res: any) => {
        if (res && res.data) {
          if (callback) {
            callback(res.data)
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
          value: record.id || ''
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
        },
        mondaySymbol: {
          value: record.mondaySymbolName || ''
        },
        tuesdaySymbol: {
          value: record.tuesdaySymbolName || ""
        }, 
        wednesdaySymbol: {
          value: record.wednesdaySymbolName || ''
        },
        thursdaySymbol: {
          value: record.thursdaySymbolName || ''
        },
        fridaySymbol: {
          value: record.fridaySymbolName || ''
        },
        saturdaySymbol: {
          value: record.saturdaySymbolName || ''
        },
        sundaySymbol: {
          value: record.sundaySymbolName || ''
        },
        mondaySymbolId: {
          value: record.mondaySymbol || ''
        },
        tuesdaySymbolId: {
          value: record.tuesdaySymbol || ''
        },
        wednesdaySymbolId: {
          value: record.wednesdaySymbol || ''
        },
        thursdaySymbolId: {
          value: record.thursdaySymbol || ''
        },
        fridaySymbolId: {
          value: record.fridaySymbol || ''
        },
        saturdaySymbolId: {
          value: record.saturdaySymbol || ''
        },
        sundaySymbolId: {
          value: record.sundaySymbol || ''
        },


        mondaySymbolColor: {
          value: record.mondaySymbolColor || ''
        },
        tuesdaySymbolColor: {
          value: record.tuesdaySymbolColor || ''
        },
        wednesdaySymbolColor: {
          value: record.wednesdaySymbolColor || ''
        },
        thursdaySymbolColor: {
          value: record.thursdaySymbolColor || ''
        },
        fridaySymbolColor: {
          value: record.fridaySymbolColor || ''
        },
        saturdaySymbolColor: {
          value: record.saturdaySymbolColor || ''
        },
        sundaySymbolColor: {
          value: record.sundaySymbolColor || ''
        },

      }
      addMeal('编辑排班套餐')
    })
    //
    initalTreeData()

    //符号
    getSchSymbolApi()

  }, []) // <= 执行初始化操作，需要注意的是，如果你只是想在渲染的时候初始化一次数据，那么第二个参数必须传空数组。

  // 符号接口
  // const [symbols, getSchSymbols] = useState([])
  let symbols = new Array()
  const getSchSymbolApi = () => {
    arrangeService.getSchSymbol().then(res => {
      // this.schSymbolList = res.data;
      if (res.code === '200') symbols = res.data
    });
  }

  const save = (e: any) => {
    // 获取选中班次套餐
    // console.log('获取选中班次套餐', e)
    // return
    emitter.emit('获取选中班次套餐列表', (mealList: any) => {
      // message.success('保存排班班次套餐设置')
      // console.log('获取选中班次套餐', mealList)
      // return
      mealList = mealList.filter((u: any) => {
        return u.status !== null
      })
      service.scheduleMealApiService.saveAll(mealList).then((res) => {
        message.success('保存排班班次套餐设置成功')
        // emitter.emit('更新班次套餐列表')
        // console.log('保存排班班次套餐', res)
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
      if (res && res.data) {
        shiftList = res.data.filter((item: any) => item.status)
        // 分类
        shiftList.map((s: any, sIndex: any) => {
          let shift = treeData.filter((t) => {
            if (t.title === s.shiftType) {
              if (!t.hasOwnProperty('children')) {
                t.children = new Array()
              }
              ; (t.children as any).push({
                title: s.name,
                value: s.name,
                key: s.shiftType + s.name + sIndex,
                shiftType: s.shiftType,
                isLeaf: true
              })
              return t
            }
          })
          if (shift && shift.length > 0) {
          } else {
            ; (treeData as any).push({
              title: s.shiftType,
              label: s.shiftType,
              value: s.shiftType,
              key: s.shiftType + sIndex,
              selectable: false,
              // disabled: true,
              isLeaf: false,
              children: [
                {
                  title: s.name,
                  label: s.name,
                  value: s.name,
                  shiftType: s.shiftType,
                  isLeaf: true,
                  key: s.shiftType + s.name + sIndex
                }
              ]
            })
            //
            // ;(treeExpandedKeys as any).push(s.shiftType)
          }
        })
      }
    })
  }

  let customizedForm: any = null
  const CustomizedForm = Form.create({
    // name: 'coordinated',
    onFieldsChange(props: any, changedFields: any) {
      // props = { ...props, ...changedFields }
      props.onChange(changedFields)
    },
    mapPropsToFields(props: any) {
      // console.log('mapPropsToFields', props)
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
          ...props.mondayName,
          value: props.mondayName.value
        }),
        tuesdayName: Form.createFormField({
          ...props.tuesdayName,
          value: props.tuesdayName.value
        }),
        wednesdayName: Form.createFormField({
          ...props.wednesdayName,
          value: props.wednesdayName.value
        }),
        thursdayName: Form.createFormField({
          ...props.thursdayName,
          value: props.thursdayName.value
        }),
        fridayName: Form.createFormField({
          ...props.fridayName,
          value: props.fridayName.value
        }),
        saturdayName: Form.createFormField({
          ...props.saturdayName,
          value: props.saturdayName.value
        }),
        sundayName: Form.createFormField({
          ...props.sundayName,
          value: props.sundayName.value
        }),
        status: Form.createFormField({
          ...props.status,
          value: props.status.value
        })
      }
    },
    onValuesChange(_: any, values: any) {
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
          })(<BaseTreeSelect style={{ width: inputWidth }} treeData={treeData} />)}
        </Form.Item>
        <Form.Item label='星期二' style={FormFlexLayoutStyle()}>
          {getFieldDecorator('tuesdayName', {
            rules: [{ required: false, message: '' }]
          })(<BaseTreeSelect style={{ width: inputWidth }} treeData={treeData} />)}
        </Form.Item>
        <Form.Item label='星期三' style={FormFlexLayoutStyle()}>
          {getFieldDecorator('wednesdayName', {
            rules: [{ required: false, message: '' }]
          })(<BaseTreeSelect style={{ width: inputWidth }} treeData={treeData} />)}
        </Form.Item>
        <Form.Item label='星期四' style={FormFlexLayoutStyle()}>
          {getFieldDecorator('thursdayName', {
            rules: [{ required: false, message: '' }]
          })(<BaseTreeSelect style={{ width: inputWidth }} treeData={treeData} />)}
        </Form.Item>
        <Form.Item label='星期五' style={FormFlexLayoutStyle()}>
          {getFieldDecorator('fridayName', {
            rules: [{ required: false, message: '' }]
          })(<BaseTreeSelect style={{ width: inputWidth }} treeData={treeData} />)}
        </Form.Item>
        <Form.Item label='星期六' style={FormFlexLayoutStyle()}>
          {getFieldDecorator('saturdayName', {
            rules: [{ required: false, message: '' }]
          })(<BaseTreeSelect style={{ width: inputWidth }} treeData={treeData} />)}
        </Form.Item>
        <Form.Item label='星期日' style={FormFlexLayoutStyle()}>
          {getFieldDecorator('sundayName', {
            rules: [{ required: false, message: '' }]
          })(<BaseTreeSelect style={{ width: inputWidth }} treeData={treeData} />)}
        </Form.Item>
        <Form.Item label='启用' style={FormFlexLayoutStyle('266px')}>
          {getFieldDecorator('status', { valuePropName: 'checked' })(<Switch />)}
        </Form.Item>
      </Form>
    )
  })

  const CustomizedFormJmfy = Form.create({
    // name: 'coordinated',
    onFieldsChange(props: any, changedFields: any) {
      // props = { ...props, ...changedFields }
      props.onChange(changedFields)
    },
    mapPropsToFields(props: any) {
      // console.log('mapPropsToFieldsJmfy', props)
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
          ...props.mondayName,
          value: props.mondayName.value
        }),
        tuesdayName: Form.createFormField({
          ...props.tuesdayName,
          value: props.tuesdayName.value
        }),
        wednesdayName: Form.createFormField({
          ...props.wednesdayName,
          value: props.wednesdayName.value
        }),
        thursdayName: Form.createFormField({
          ...props.thursdayName,
          value: props.thursdayName.value
        }),
        fridayName: Form.createFormField({
          ...props.fridayName,
          value: props.fridayName.value
        }),
        saturdayName: Form.createFormField({
          ...props.saturdayName,
          value: props.saturdayName.value
        }),
        sundayName: Form.createFormField({
          ...props.sundayName,
          value: props.sundayName.value
        }),
        status: Form.createFormField({
          ...props.status,
          value: props.status.value
        }),
        mondaySymbol: Form.createFormField({
          ...props.mondaySymbol,
          value: props.mondaySymbol.value
        }),
        tuesdaySymbol: Form.createFormField({
          ...props.tuesdaySymbol,
          value: props.tuesdaySymbol.value
        }), 
        wednesdaySymbol: Form.createFormField({
          ...props.wednesdaySymbol,
          value: props.wednesdaySymbol.value
        }), 
        thursdaySymbol: Form.createFormField({
          ...props.thursdaySymbol,
          value: props.thursdaySymbol.value
        }), 
        fridaySymbol: Form.createFormField({
          ...props.fridaySymbol,
          value: props.fridaySymbol.value
        }), 
        saturdaySymbol: Form.createFormField({
          ...props.saturdaySymbol,
          value: props.saturdaySymbol.value
        }), 
        sundaySymbol: Form.createFormField({
          ...props.sundaySymbol,
          value: props.sundaySymbol.value
        }),
        // mondaySymbolName: Form.createFormField({
        //   ...props.mondaySymbolName,
        //   value: props.mondaySymbolName.value
        // })
      }
    },
    onValuesChange(_: any, values: any) {
      console.log(values)
    }
  })((props: any) => {
    const { getFieldDecorator, getFieldValue, getFieldProps } = props.form
    customizedForm = props.form

    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 16 },
    };
    // layout='inline' {...formItemLayout}
    return (
      <Form layout='inline' {...formItemLayout}>
        <Form.Item label='套餐名称' style={FormFlexLayoutStyle()}>
          {getFieldDecorator('mealName', {
            rules: [{ required: false, message: '班次套餐名称在同一科室下为唯一' }]
          })(<Input style={{ width: inputWidth }} />)}
        </Form.Item>
        <Form.Item label='星期一' style={FormFlexLayoutStyle()}>
          {getFieldDecorator('mondayName', {
            rules: [{ required: false, message: '' }]
          })(<BaseTreeSelect style={{ width: inputWidthJmfy }} treeData={treeData} />)
          }
          {getFieldDecorator('mondaySymbol', {
            rules: [{ required: false, message: '' }]
          })(<Select disabled={!getFieldValue('mondayName')} style={{ width: 70, color: symbols.filter((item) => fields.mondaySymbol.value === item.id)[0]?.symbolColor || fields.mondaySymbolColor.value}}>
            {symbols.map((item: any) => (
              <Option value={item.id} style={{ color: item.symbolColor}}>{item.symbol}</Option>
            ))}
          </Select>)}
        </Form.Item>
        <Form.Item label='星期二' style={FormFlexLayoutStyle()}>
          {getFieldDecorator('tuesdayName', {
            rules: [{ required: false, message: '' }]
          })(<BaseTreeSelect style={{ width: inputWidthJmfy }} treeData={treeData} />)}
          {getFieldDecorator('tuesdaySymbol', {
            rules: [{ required: false, message: '' }]
          })(<Select disabled={!getFieldValue('tuesdayName')} style={{ width: 70, color: symbols.filter((item) => fields.tuesdaySymbol.value === item.id)[0]?.symbolColor || fields.tuesdaySymbolColor.value}}>
            {symbols.map((item: any) => (
              <Option value={item.id} style={{ color: item.symbolColor}}>{item.symbol}</Option>
            ))}
          </Select>)}
        </Form.Item>
        <Form.Item label='星期三' style={FormFlexLayoutStyle()}>
          {getFieldDecorator('wednesdayName', {
            rules: [{ required: false, message: '' }]
          })(<BaseTreeSelect style={{ width: inputWidthJmfy }} treeData={treeData} />)}
          {getFieldDecorator('wednesdaySymbol', {
            rules: [{ required: false, message: '' }]
          })(<Select disabled={!getFieldValue('wednesdayName')} style={{ width: 70, color: symbols.filter((item) => fields.wednesdaySymbol.value === item.id)[0]?.symbolColor || fields.wednesdaySymbolColor.value}}>
            {symbols.map((item: any) => (
              <Option value={item.id} style={{ color: item.symbolColor}}>{item.symbol}</Option>
            ))}
          </Select>)}
        </Form.Item>
        <Form.Item label='星期四' style={FormFlexLayoutStyle()}>
          {getFieldDecorator('thursdayName', {
            rules: [{ required: false, message: '' }]
          })(<BaseTreeSelect style={{ width: inputWidthJmfy }} treeData={treeData} />)}
          {getFieldDecorator('thursdaySymbol', {
            rules: [{ required: false, message: '' }]
          })(<Select disabled={!getFieldValue('thursdayName')} style={{ width: 70, color: symbols.filter((item) => fields.thursdaySymbol.value === item.id)[0]?.symbolColor || fields.thursdaySymbolColor.value}}>
            {symbols.map((item: any) => (
              <Option value={item.id} style={{ color: item.symbolColor}}>{item.symbol}</Option>
            ))}
          </Select>)}
        </Form.Item>
        <Form.Item label='星期五' style={FormFlexLayoutStyle()}>
          {getFieldDecorator('fridayName', {
            rules: [{ required: false, message: '' }]
          })(<BaseTreeSelect style={{ width: inputWidthJmfy }} treeData={treeData} />)}
          {getFieldDecorator('fridaySymbol', {
            rules: [{ required: false, message: '' }]
          })(<Select disabled={!getFieldValue('fridayName')} style={{ width: 70, color: symbols.filter((item) => fields.fridaySymbol.value === item.id)[0]?.symbolColor || fields.fridaySymbolColor.value}}>
            {symbols.map((item: any) => (
              <Option value={item.id} style={{ color: item.symbolColor}}>{item.symbol}</Option>
            ))}
          </Select>)}
        </Form.Item>
        <Form.Item label='星期六' style={FormFlexLayoutStyle()}>
          {getFieldDecorator('saturdayName', {
            rules: [{ required: false, message: '' }]
          })(<BaseTreeSelect style={{ width: inputWidthJmfy }} treeData={treeData} />)}
          {getFieldDecorator('saturdaySymbol', {
            rules: [{ required: false, message: '' }]
          })(<Select disabled={!getFieldValue('saturdayName')} style={{ width: 70, color: symbols.filter((item) => fields.saturdaySymbol.value === item.id)[0]?.symbolColor || fields.saturdaySymbolColor.value}}>
            {symbols.map((item: any) => (
              <Option value={item.id} style={{ color: item.symbolColor}}>{item.symbol}</Option>
            ))}
          </Select>)}
        </Form.Item>
        <Form.Item label='星期日' style={FormFlexLayoutStyle()}>
          {getFieldDecorator('sundayName', {
            rules: [{ required: false, message: '' }]
          })(<BaseTreeSelect style={{ width: inputWidthJmfy }} treeData={treeData} />)}
          {getFieldDecorator('sundaySymbol', {
            rules: [{ required: false, message: '' }]
          })(<Select disabled={!getFieldValue('sundayName')} style={{ width: 70, color: symbols.filter((item) => fields.sundaySymbol.value === item.id)[0]?.symbolColor || fields.sundaySymbolColor.value}}>
            {symbols.map((item: any) => (
              <Option value={item.id} style={{ color: item.symbolColor}}>{item.symbol}</Option>
            ))}
          </Select>)}
        </Form.Item>
        <Form.Item label='启用' style={FormFlexLayoutStyle('64px')}>
          {getFieldDecorator('status', { valuePropName: 'checked' })(<Switch />)}
        </Form.Item>
      </Form>
    )
  })

  const handleFormChange = (changedFields: any) => {
    //  mondaySymbolName: objSymbol['symbol'], mondaySymbolColor: objSymbol['symbolColor']
    fields = { ...fields, ...changedFields }
    // console.log('handleFormChange', changedFields, customizedForm)

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
    },
    mondaySymbol: { value: ''},
    tuesdaySymbol: { value: ''},
    wednesdaySymbol: { value: ''},
    thursdaySymbol: { value: ''},
    fridaySymbol: { value: ''}, 
    saturdaySymbol: { value: ''},
    sundaySymbol: { value: ''}, 

    mondaySymbolId: { value: ''},
    tuesdaySymbolId: { value: ''},
    wednesdaySymbolId: { value: ''},
    thursdaySymbolId: { value: ''},
    fridaySymbolId: { value: ''}, 
    saturdaySymbolId: { value: ''},
    sundaySymbolId: { value: ''}, 

    mondaySymbolColor: { value: ''},
    tuesdaySymbolColor: { value: ''},
    wednesdaySymbolColor: { value: ''},
    thursdaySymbolColor: { value: ''},
    fridaySymbolColor: { value: ''}, 
    saturdaySymbolColor: { value: ''},
    sundaySymbolColor: { value: ''}, 
  }

  const getShiftIdByName = (name: string) => {
    let result = shiftList.filter((s) => s.name === name)
    if (result.length > 0) {
      return result[0].id
    } else {
      return ''
    }
  }

  const onOk = async () => {
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
      status: fields.status.value || false, // Boolean 必须参数 启用状态 true或者false
      mondaySymbol: fields.mondaySymbol.value || '',
      tuesdaySymbol: fields.tuesdaySymbol.value || '', 
      wednesdaySymbol: fields.wednesdaySymbol.value || '', 
      thursdaySymbol: fields.thursdaySymbol.value || '',  
      fridaySymbol: fields.fridaySymbol.value || '', 
      saturdaySymbol: fields.saturdaySymbol.value || '',  
      sundaySymbol: fields.sundaySymbol.value || '',

      mondaySymbolId: fields.mondaySymbolId.value || '',
      tuesdaySymbolId: fields.tuesdaySymbolId.value || '', 
      wednesdaySymbolId: fields.wednesdaySymbolId.value || '', 
      thursdaySymbolId: fields.thursdaySymbolId.value || '',  
      fridaySymbolId: fields.fridaySymbolId.value || '', 
      saturdaySymbolId: fields.saturdaySymbolId.value || '',  
      sundaySymbolId: fields.sundaySymbolId.value || '',

    }
    if (['wh', 'lyyz', 'qhwy','whsl', 'ytll'].includes(appStore.HOSPITAL_ID)) {
      for (let key in postData) {
        if (key == 'monday' || key == 'tuesday' || key == 'wednesday' || key == 'thursday' || key == 'friday' || key == 'saturday' || key == 'sunday') {
          if (postData[key]) {
            let res = await service.scheduleMealApiService.check(postData[key])
          }
        }
      }
    }
    service.scheduleMealApiService.save(postData).then((res) => {
      message.success('添加班次套餐成功')
      emitter.emit('更新班次套餐列表')
      // console.log('添加班次套餐成功', res)
      // 更新班次套餐列表
    })
    // message.success('onOk')
  }

  let inputWidth = '250px'
  let inputWidthJmfy = '185px'
  // let dataSource = ['A班', 'P班', 'N班', '休假', '进修学习', '其他']
  // let dataSourceColor = ['red', 'green', 'blue', 'yellow', 'black', 'gray']

  // let modalInfo: any = null

  const addMeal = (title: string) => {
    // message.success('添加班次套餐')
    // console.log('Modal', Modal)

    if (title === '添加排班套餐' || title === '添加排班') {
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
        },
        mondaySymbol: { value: ''},
        tuesdaySymbol: { value: ''},
        wednesdaySymbol: { value: ''},
        thursdaySymbol: { value: ''},  
        fridaySymbol: { value: ''},
        saturdaySymbol: { value: ''}, 
        sundaySymbol: { value: ''}, 

        mondaySymbolId: { value: ''},
        tuesdaySymbolId: { value: ''},
        wednesdaySymbolId: { value: ''},
        thursdaySymbolId: { value: ''},  
        fridaySymbolId: { value: ''},
        saturdaySymbolId: { value: ''}, 
        sundaySymbolId: { value: ''}, 

        mondaySymbolColor: { value: ''},
        tuesdaySymbolColor: { value: ''},
        wednesdaySymbolColor: { value: ''},
        thursdaySymbolColor: { value: ''},  
        fridaySymbolColor: { value: ''},
        saturdaySymbolColor: { value: ''}, 
        sundaySymbolColor: { value: ''}, 
      }
    }
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
      icon: 'form',
      width: '500px',
      maskClosable: true,
      content: (
        <div>
          {appStore.HOSPITAL_ID === 'jmfy' ? 
            <CreateModal >
              <CustomizedFormJmfy {...fields} onChange={handleFormChange} />
            </CreateModal> : 
            <CustomizedForm {...fields} onChange={handleFormChange} />
          }
       </div>
      )
    })
    // } else {
    //   modalInfo.update({ visible: true })
    // }
  }

  // {/* <ModalBox title={'添加排班/编辑排班'} /> */}

  return (
    <div>
      <BreadcrumbBox
        data={[
          {
            name: '排班管理',
            link: '/personnelManagement/arrangeHome'
          },
          {
            name: '班次套餐设置'
          }
        ]}
      />

      <Wrapper>
        <Title>班次套餐设置</Title>
        <div style={{ flex: 1 }} />
        {appStore.HOSPITAL_ID == 'jmfy' &&
          <DeptSelect
            onChange={() => emitter.emit("更新班次套餐列表")}
          />
        }
        <Button
          onClick={() => {
            addMeal('添加排班套餐')
          }}
          style={{ marginLeft: 3, marginRight: 3 }}
        >
          添加班次套餐
        </Button>
        <Button onClick={save} style={{ marginLeft: 3, marginRight: 3 }}>
          保存
        </Button>
        <Button onClick={() => emitter.emit('更新班次套餐列表')} style={{ marginLeft: 3, marginRight: 3 }}>
          刷新
        </Button>
        <Button
          style={{ marginLeft: 3, marginRight: 3 }}
          onClick={() => appStore.history.push('/personnelManagement/arrangeHome')}
          className='button-tools'
        >
          返回
        </Button>
      </Wrapper>
    </div>
  )
}
const Wrapper = styled.div`
  /* background: #eee; */
  /* height: 100%; */
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
  font-weight: bold;
`

const CreateModal = styled.div`
.ant-modal-confirm-body{
    width: 100%;
}
  .ant-form-item-children{
    display: flex !important;
  }
  .ant-select{
    margin-top: 4px;
    margin-left: 10px;
  }
`
