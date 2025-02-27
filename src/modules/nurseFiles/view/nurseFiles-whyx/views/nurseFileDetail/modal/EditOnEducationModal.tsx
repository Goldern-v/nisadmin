import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Modal, Input, Button, Radio, DatePicker, Select, Row, Col, message } from 'antd'
import { ModalComponentProps } from 'src/libs/createModal'
import Form from 'src/components/Form'
import { nurseFilesService } from '../../../services/NurseFilesService'
import { nurseFileDetailViewModal } from '../NurseFileDetailViewModal'
import { TITLE_LIST, POST_LIST } from '../../nurseFilesList/modal/AddNursingModal'
import { to } from 'src/libs/fns'
import { Rules } from 'src/components/Form/interfaces'
import moment from 'moment'
import loginViewModel from 'src/modules/login/LoginViewModel'
// 加附件
import ImageUploader from 'src/components/ImageUploader'
import { authStore, appStore } from 'src/stores'
import service from 'src/services/api'
import emitter from 'src/libs/ev'
import MultipleImageUploader from 'src/components/ImageUploader/MultipleImageUploader'
import YearPicker from 'src/components/YearPicker'
const Option = Select.Option
export interface Props extends ModalComponentProps {
  data?: any
  signShow?: string
  getTableData?: () => {}
}
export default function EditPersonWinningModal(props: Props) {
  const [title, setTitle] = useState('')

  let { visible, onCancel, onOk, data, signShow } = props
  let rules: Rules =
  {
    studyMajor: (val) => !!val || '请填写进修专业',
    unit: (val) => !!val || '请填写进修单位',
    unitLocal: (val) => !!val || '请填写进修单位所属地',
    startDate: (val) => !!val || '请选择进修开始时间',
    endDate: (val) => !!val || '请选择进修结束时间',
    studyHour: (val) => !!val || '请选择进修时长(天)',
    urlImageOne: (val) => !!val || '请上传附件',
  }
  // if (signShow !== '修改') {
  //   rules = Object.assign(rules, {
  //     allDeptAll: (val: any) => !!val || '请选择参与人员所属科室',
  //     participants: (val: any) => !!val || '请填写参与成员',
  //   })
  // }
  let refForm = React.createRef<Form>()
  const [storage, setStorage]: any = useState([])
  const [participantsList, setParticipantsList]: any = useState([])

  const onFieldChange = (val: any) => {
    if (signShow === '添加') {
      if (refForm.current && refForm.current.state.values?.allDeptAll === undefined && refForm.current.state.values?.participants?.length > 0) {
        refForm!.current!.setFields({
          participants: [],
        })
        setParticipantsList([])
        setStorage([])
      }
    }
  }

  const onSave = async (sign: boolean) => {
    let obj = {
      empNo: nurseFileDetailViewModal.nurserInfo.empNo,
      empName: nurseFileDetailViewModal.nurserInfo.empName,
      auditedStatus: '',
      urlImageOne: ''
    }
    if ((authStore.user && authStore.user.post) == '护长') {
      obj.auditedStatus = 'waitAuditedNurse'
    } else if ((authStore.user && authStore.user.post) == '护理部') {
      obj.auditedStatus = 'waitAuditedDepartment'
    }
    if (signShow === '修改') {
      Object.assign(obj, { id: data.id })
    }
    if (!refForm.current) return
    let [err, value] = await to(refForm.current.validateFields())
    if (err) return
    if (!Object.keys(value).length) {
      return message.warning('数据不能为空')
    }
    value.startDate && (value.startDate = value.startDate.format('YYYY-MM-DD'))
    value.endDate && (value.endDate = value.endDate.format('YYYY-MM-DD'))
    value.urlImageOne && (value.urlImageOne = value.urlImageOne.join(','))
    let userList = []
    if (value.participants?.length > 0) {
      let obj = value.participants?.map((item: any) => {
        return participantsList.find((items: { code: any }) => items.code === item)
      })
      userList = obj.map((item: { [x: string]: any; code: any; name: any }) => {
        {
          item['empNo'] = item?.code
          item['empName'] = item?.name
          delete item?.code
          delete item?.name
          return item
        }
      })
      let { empNo, empName } = JSON.parse(sessionStorage.getItem('user') || '')
      userList.push({ empNo, empName })
    }
    nurseFilesService.commonSaveOrUpdate('nurseWHOutStudy', { ...obj, userList, ...value, sign }).then((res: any) => {
      message.success('保存成功')
      props.getTableData && props.getTableData()
      emitter.emit('refreshNurseFileDeatilLeftMenu')
      onCancel()
    })
  }

  /** 自动关联进修时常 */
  const computedStudyHour = () => {
    if (refForm.current) {
      let startDate = refForm.current.getField('startDate')
      let endDate = refForm.current.getField('endDate')
      if (startDate && endDate) {
        let day = moment(endDate).diff(moment(startDate), 'd') + 1
        if (day > 0) {
          refForm.current.setField('studyHour', day)
        }
      }
    }
  }

  const onSelect = (val: any) => {
    nurseFilesService.getUsers(val).then(res => {
      let newArr = participantsList.concat(res.data)
      setParticipantsList(removeSame(newArr))
      setStorage(res.data)
    })
  }
  // 数组去重
  const removeSame = (arr: any[]) => {
    let arr1 = []
    let newArr = []
    for (let i in arr) {
      if (arr1.indexOf(arr[i].code) == -1) {
        arr1.push(arr[i].code)
        newArr.push(arr[i])
      }
    }
    return newArr
  }

  useLayoutEffect(() => {
    if (refForm.current && visible) refForm!.current!.clean()
    /** 如果是修改 */
    if (data && refForm.current && visible) {
      refForm!.current!.setFields({
        studyMajor: data.studyMajor,
        unit: data.unit,
        unitLocal: data.unitLocal,
        startDate: data.startDate ? moment(data.startDate) : null,
        endDate: data.endDate ? moment(data.endDate) : null,
        studyHour: data.studyHour,
        urlImageOne: data.urlImageOne ? data.urlImageOne.split(',') : []
      })
    }
    if (signShow === '修改') {
      setTitle('修改外出进修')
    } else if (signShow === '添加') {
      setTitle('添加外出进修')
    }
  }, [visible])

  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={onCancel}
      forceRender
      centered
      footer={[
        <Button key='back' onClick={onCancel}>
          关闭
        </Button>,
        <Button key='save' type='primary' onClick={() => onSave(false)}>
          保存
        </Button>,
        // <Button key='submit' type='primary' onClick={() => onSave(true)}>
        //   提交审核
        // </Button>
      ]}
    >
      <Form ref={refForm} rules={rules} labelWidth={120} onChange={onFieldChange}>
        <Row>
          {/* {signShow !== '修改' && <Col span={24}>
            <Form.Field label={`参与人员所属科室`} name='allDeptAll' required>
              <Select
                allowClear
                showSearch
                optionFilterProp="children"
                onSelect={onSelect}
                filterOption={(input, option: any) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {nurseFileDetailViewModal.getDict('全部科室').map((item) =>
                  <Option key={item.code} value={item.code}>{item.name}</Option>
                )}
              </Select>
            </Form.Field>
          </Col>}
          {signShow !== '修改' && <Col span={24}>
            <Form.Field label={`参与成员`} name='participants' required>
              <Select
                mode='multiple'
                allowClear
                showSearch
                optionFilterProp="children"
                disabled={signShow === '修改'}
                filterOption={(input, option: any) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {storage.map((item: any) =>
                  <Option key={item.code} value={item.code}>{item.name}</Option>
                )}
              </Select>
            </Form.Field>
          </Col>} */}
          <Col span={24}>
            <Form.Field label={`进修专业`} name='studyMajor' required>
              <Input />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`进修单位`} name='unit' required>
              <Input />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`进修单位所属地`} name='unitLocal' required>
              <Select>
                {nurseFileDetailViewModal.getDict('进修单位').map((item) => (
                  <Select.Option value={item.code} key={item.code}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`进修开始时间`} name='startDate' onValueChange={computedStudyHour} required>
              <DatePicker />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`进修结束时间`} name='endDate' onValueChange={computedStudyHour} required>
              <DatePicker />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`进修时长(天)`} name='studyHour' required>
              <Input />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`附件`} name='urlImageOne' required>
              <MultipleImageUploader text='添加图片' />
            </Form.Field>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
const Wrapper = styled.div``
