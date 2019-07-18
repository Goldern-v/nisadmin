import locale from 'antd/lib/date-picker/locale/zh_CN'
import moment from 'moment'
import emitter from 'src/libs/ev'
import service from 'src/services/api'
import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { Button, DatePicker, Form, Icon, Input, message, Modal, Popconfirm, Switch, TreeSelect } from 'antd'
import { scheduleStore, appStore } from 'src/stores'
import { splitRecord } from '../MainBox/utils/splitRecord'

const dateFormat = 'YYYY-MM-DD'
const { WeekPicker } = DatePicker

interface Props {
  fullPage: boolean
  setFullPage: any
}

export default function ToolBar(props: Props) {
  const { fullPage, setFullPage } = props
  const [pageTitle, setPageTitle] = useState('编辑排班')
  const [formatDay, setFormatDay] = useState('七')
  const [formatMonth, setFormatMonth] = useState('七')
  const [isPublished, setIsPublished] = useState(false)

  // let weekValue: any = moment(monthStart, dateFormat)
  // 编辑排班
  const [monthStart, setMonthStart] = useState(() => {
    let date = new Date()
    let firstDay = date.setDate(1)

    if (scheduleStore.getStartTime()) {
      return scheduleStore.getStartTime()
    }
    return moment(firstDay).format(dateFormat)
  })
  const [defaultEndTime, setdefaultEndTime] = useState(() => {
    let date = new Date()

    if (scheduleStore.getEndTime()) {
      setFormatMonth(`${moment(scheduleStore.getEndTime()).month() + 1}`)
      setFormatDay(`${moment(scheduleStore.getEndTime()).date()}`)
      return scheduleStore.getEndTime()
    }
    return date
  })

  const [weekValue, setWeekValue] = useState(moment(monthStart, dateFormat))

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    //
    // console.log(count, setCount, setMonthStart, setdefaultEndTime, setPageTitle, setWeekValue)

    emitter.removeAllListeners('弹窗编辑排班套餐')
    emitter.removeAllListeners('获取排班列表')
    emitter.removeAllListeners('设置页面标题')

    // setPageTitle
    emitter.addListener('设置页面标题', (title: any) => {
      setPageTitle(title)
    })

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

      addMeal('编辑排班套餐')
    })
    //
    initalTreeData()
    //
    if (!scheduleStore.getStartTime()) {
      onWeekChange(new Date())
    }
  }, []) // <= 执行初始化操作，需要注意的是，如果你只是想在渲染的时候初始化一次数据，那么第二个参数必须传空数组。

  const save = (e: any, isPublish: boolean = false) => {
    // let hideLoading = message.loading('正在保存')
    // emitter.emit('排班列表载入动画', true)
    let postData: any = new Array()
    let postLine: any = new Array()
    let startTime = scheduleStore.getStartTime()
    // let endTime = scheduleStore.getEndTime()
    setIsPublished(isPublish)

    emitter.emit('获取编辑排班列表', (shiftData: any, shiftListData: any) => {
      // return console.log('获取编辑排班列表', shiftData, shiftListData, postData)

      let weekDayToNumber: any = {
        mondayName_1: 0,
        tuesdayName_1: 1,
        wednesdayName_1: 2,
        thursdayName_1: 3,
        fridayName_1: 4,
        saturdayName_1: 5,
        sundayName_1: 6,
        mondayName_2: 7,
        tuesdayName_2: 8,
        wednesdayName_2: 9,
        thursdayName_2: 10,
        fridayName_2: 11,
        saturdayName_2: 12,
        sundayName_2: 13
      }
      shiftData.map((nurse: any, index: any) => {
        splitRecord(nurse, scheduleStore.getWeeks().length).forEach((item: any) => {
          emitter.emit('根据班次code获取班次详情', item.Name, (shiftItem: any) => {
            shiftItem = shiftItem || {}

            postLine = {
              id: {
                userId: nurse.id || '',
                workDate: moment(startTime)
                  .add('d', item.index)
                  .format(dateFormat)
              },
              newTitle: nurse.newTitle || '',
              sortValue: nurse.sortValue || '',
              nurseHierarchy: nurse.nurseHierarchy || '',
              rangeId: shiftItem.id || '',
              status: isPublish ? '1' : '0',
              thisWeekHour: nurse.thisWeekHour,
              workTime: shiftItem.workTime || '',
              rangeName: item.Name || shiftItem.name,
              rangeNameCode: item.Code || shiftItem.name,
              remark: nurse.remark,
              shiftType: shiftItem.shiftType || '',
              nameColor: item.Color || shiftItem.nameColor || '',
              effectiveTime: item.EffectiveTime != undefined ? item.EffectiveTime : shiftItem.effectiveTime,
              deptCode: scheduleStore.getDeptCode()
            }
            postData.push(JSON.parse(JSON.stringify(postLine)))
          })
        })
      })

      setTimeout(() => {
        let weekRange = {
          startTime: scheduleStore.getStartTime(),
          endTime: scheduleStore.getEndTime()
        }
        // hideLoading()
        service.schedulingApiService.update(postData, weekRange).then((res) => {
          if (res && (res.desc || res.data.desc)) {
            message.success(res.desc || res.data.desc)
            if (isPublish) {
              emitter.emit('发布并更新排班列表')
              console.log('发布成功')
            } else {
              emitter.emit('更新排班列表表格')
              console.log('暂存成功')
            }
          }
        })
      }, 200)
    })
  }

  let shiftList = new Array()
  let treeData = new Array()

  const initalTreeData = () => {
    shiftList = new Array()
    let deptCode = scheduleStore.getDeptCode()
    service.scheduleShiftApiService.getShiftListByCode(deptCode).then((res: any) => {
      if (res && res.data) {
        shiftList = res.data

        // 分类
        shiftList.map((s: any) => {
          let shift = treeData.filter((t) => {
            if (t.title === s.shiftType) {
              if (!t.hasOwnProperty('children')) {
                t.children = new Array()
              }
              ;(t.children as any).push({ title: s.name, value: s.name, key: s.shiftType + s.name, isLeaf: true })
              return t
            }
          })
          if (shift && shift.length > 0) {
          } else {
            ;(treeData as any).push({
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
          }
        })
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
    onFieldsChange(props: any, changedFields: any) {
      // props = { ...props, ...changedFields }
      props.onChange(changedFields)
    },
    mapPropsToFields(props: any) {
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
      console.log('添加班次套餐成功')
      emitter.emit('更新班次套餐列表')
      console.log('添加班次套餐成功', res)
      // 更新班次套餐列表
    })
    console.log('onOk')
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
        console.log('onCancel')
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

  const resetShift = () => {
    message.info('重置排班')
    emitter.emit('重置排班列表')
  }

  const copyShift = () => {
    message.info('正在复制上周排班')
    emitter.emit('获取编辑排班列表', (shiftData: any, shiftListData: any) => {
      // return console.log(shiftData, 'shiftDatashiftDatashiftDatashiftData')
      emitter.emit('排班列表载入动画', true)
      const postData = {
        startTime: scheduleStore.getStartTime(),
        endTime: scheduleStore.getEndTime(),
        copyStatus: scheduleStore.getWeeks().length == 2 ? '1' : '',
        ids: shiftData.map((item: any) => item.id)
      }
      service.schedulingApiService.copyPrevSettingRange(postData).then((res) => {
        if (res && res.data) {
          emitter.emit('更新复制上周排班', res.data)
        }
      })
    })
  }

  // {/* <ModalBox title={'添加排班/编辑排班'} /> */}
  // 选择日期间段发生改变时执行
  // const onChange = (date: any, dateString: any) => {
  //   console.log(date, dateString)
  //   // 更新排班列表
  //   scheduleStore.setStartTime(dateString[0])
  //   scheduleStore.setEndTime(dateString[1])
  //   emitter.emit('更新排班列表')
  // }

  const onWeekChange = (date: any, dateString?: string) => {
    let weekFirstDay = moment(date)
      .startOf('week')
      .add('d', 0)
    let weekLastDay = moment(date)
      .startOf('week')
      .add('d', 6)
    setWeekValue(weekFirstDay)
    console.log(
      'WeekPicker',
      weekFirstDay.format(dateFormat),
      weekLastDay.format(dateFormat),
      defaultEndTime,
      dateString
    )

    setFormatMonth(`${weekLastDay.month() + 1}`)
    setFormatDay(`${weekLastDay.date()}`)

    setdefaultEndTime(weekLastDay.format(dateFormat))
    // 更新排班列表
    scheduleStore.setStartTime(weekFirstDay.format(dateFormat))
    scheduleStore.setEndTime(weekLastDay.format(dateFormat))
    emitter.emit('更新排班列表')
  }

  let startWeekNumber = moment(scheduleStore.getStartTime()).isoWeek()
  let endWeekNumber = moment(scheduleStore.getEndTime()).isoWeek()
  let weekString = ''
  let weekLength = 1
  if (startWeekNumber == endWeekNumber) {
    weekString = `第${startWeekNumber}周 `
  } else {
    weekString = `第${startWeekNumber} - ${endWeekNumber}周 `
    weekLength = 2
  }
  let dateString =
    weekString +
    ` ${moment(scheduleStore.getStartTime()).format('MM/DD')} - ${moment(scheduleStore.getEndTime()).format('MM/DD')}`

  return (
    <Wrapper>
      <Title>{pageTitle}</Title>
      <div style={{ flex: 1 }} />
      <Input
        addonAfter={<Icon type='calendar' />}
        value={dateString}
        style={{ width: weekLength == 1 ? 220 : 270, marginRight: 3 }}
        readOnly
      />
      <Button onClick={() => resetShift()} className='button-tools'>
        重置排班
      </Button>
      <Button onClick={() => copyShift()} className='button-tools'>
        复制上周排班
      </Button>
      <Button
        onClick={() => {
          emitter.emit('同步排班人员')
        }}
        className='button-tools'
      >
        同步排班人员
      </Button>
      <Button onClick={save} className='button-tools'>
        暂存
      </Button>
      {!isPublished ? (
        <Button onClick={(e: any) => save(e, true)} className='button-tools'>
          发布排班
        </Button>
      ) : (
        <Popconfirm
          placement='top'
          title={'你已经发布过排班，是否继续发布'}
          onConfirm={(e: any) => save(e, true)}
          okText='发布'
          cancelText='取消'
        >
          <Button className='button-tools'>发布排班</Button>
        </Popconfirm>
      )}
      <Button onClick={() => setFullPage(!fullPage)} className='button-tools'>
        {fullPage ? '退出全屏' : '全屏'}
      </Button>
      <Button onClick={() => appStore.history.push('/scheduleHome')} className='button-tools'>
        返回
      </Button>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  /* background: #eee; */
  height: 100%;
  padding: 0 20px 15px 20px;
  display: inline-flex;
  width: 100%;
  align-items: flex-end;
  margin-top: 5px;

  .button-tools {
    margin: 0px 3px !important;
  }

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
