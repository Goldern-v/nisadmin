import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Modal, Input, Button, Radio, DatePicker, Select, Row, Col, message, AutoComplete } from 'antd'
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
import { find } from 'tslint/lib/utils'
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
    startTime: (val) => !!val || '请选择开始时间',
    endTime: (val) => !!val || '请选择结束时间',
    academicName: (val) => !!val || '请填写学术活动名称',
    hostArea: (val) => !!val || '请选择举办地域',
    hostUnit: (val) => !!val || '请填写举办单位',
    hostAddress: (val) => !!val || '请填写举办地点',
    qualification: (val) => !!val || '请填写以何种资格获得邀请',
    // urlImageOne: (val) => !!val || '请上传附件',
  }
  // if (signShow !== '修改') {
  //   rules = Object.assign(rules, {
  //     allDeptAll: (val: any) => !!val || '请选择参与人员所属科室',
  //     participants: (val: any) => !!val || '请填写参与成员',
  //   })
  // }
  let refForm = React.createRef<Form>()
  const [participantsList, setParticipantsList]: any = useState([])
  const [storage, setStorage]: any = useState([])
  const onFieldChange = (val: any) => {
    // if (signShow === '添加') {
    //   if (refForm.current && refForm.current.state.values?.allDeptAll === undefined && refForm.current.state.values?.participants?.length > 0) {
    //     refForm!.current!.setFields({
    //       participants: [],
    //     })
    //     setParticipantsList([])
    //     setStorage([])
    //   }
    // }
  }

  const onSave = async (sign: boolean) => {
    let obj = {
      empNo: nurseFileDetailViewModal.nurserInfo.empNo,
      empName: nurseFileDetailViewModal.nurserInfo.empName,
      // auditedStatus: '',
      urlImageOne: '',
    }
    // if ((authStore.user && authStore.user.post) == '护长') {
    //   obj.auditedStatus = 'waitAuditedNurse'
    // } else if ((authStore.user && authStore.user.post) == '护理部') {
    //   obj.auditedStatus = 'waitAuditedDepartment'
    // }
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
      // let { empNo, empName } = JSON.parse(sessionStorage.getItem('user') || '')
      // userList.push({ empNo, empName })
    }

    nurseFilesService.commonSaveOrUpdate('nurseWHAcademic', { ...obj, userList, ...value, sign }).then((res: any) => {
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
  useEffect(() => {
    if (visible) {
      nurseFilesService.getAllUsers().then(res => {
        setStorage(res.data)
        setParticipantsList(removeSame(res.data))
      })
    }
  },[signShow,visible])

  useLayoutEffect(() => {
    if (refForm.current && visible) refForm!.current!.clean()
    /** 如果是修改 */
    if (data && refForm.current && visible) {
      refForm!.current!.setFields({
        studyMajor: data.studyMajor,
        unit: data.unit,
        unitLocal: data.unitLocal,
        startTime: data.startTime ? moment(data.startTime) : null,
        endTime: data.endTime ? moment(data.endTime) : null,
        academicName: data.academicName,
        hostArea: data.hostArea,
        hostUnit: data.hostUnit,
        hostAddress: data.hostAddress,
        qualification: data.qualification,
        urlImageOne: data.urlImageOne ? data.urlImageOne.split(',') : []
      })
    }
    if (signShow === '修改') {
      setTitle('修改学术活动')
    } else if (signShow === '添加') {
      setTitle('添加学术活动')
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
            <Form.Field label={`参与人员所属科室`} name='allDeptAll' >
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
          </Col>} */}
          {signShow !== '修改' && <Col span={24}>
            <Form.Field label={`参与成员`} name='participants' >
              {/* <AutoComplete filterOption dataSource={nurseFileDetailViewModal.getDict('级别').map((item) => item.name)} /> */}
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
          </Col>}
          <Col span={24}>
            <Form.Field label={`开始时间`} name='startTime' onValueChange={computedStudyHour} required>
              <DatePicker />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`结束时间`} name='endTime' onValueChange={computedStudyHour} required>
              <DatePicker />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`学术活动名称`} name='academicName' required>
              <Input />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`举办地域`} name='hostArea' required>
              <Select>
                {['国内', '国外', '省内', '省外', '其他'].map((item) => (
                  <Select.Option value={item} key={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`举办单位`} name='hostUnit' required>
              <Input maxLength={25} />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`举办地点`} name='hostAddress' required>
              <Input maxLength={25} />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`以何种资格获得邀请`} name='qualification' required>
              {/* <Input maxLength={25} /> */}
              <Select>
                {['讲学、审编、评审的专家', '指定的学会负责人、会议主持人', '担任理事、委员，参加本学会召开的年会', '论文被选定进行大会交流', '国际、国家级心血管领域的重要会议', '与医院科研相关的会议'].map((item) => (
                  <Select.Option value={item} key={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`附件`} name='urlImageOne'>
              <MultipleImageUploader text='添加图片' />
            </Form.Field>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
const Wrapper = styled.div``
