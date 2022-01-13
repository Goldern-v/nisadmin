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
import form from 'antd/lib/form'
const Option = Select.Option
export interface Props extends ModalComponentProps {
  data?: any
  signShow?: string
  getTableData?: () => {}
}
const rules: Rules = {
  // time: (val) => !!val || '请填写时间',
}
export default function EditPersonWinningModal(props: Props) {
  const [title, setTitle] = useState('')

  let { visible, onCancel, onOk, data, signShow } = props
  let refForm = React.createRef<Form>()

  const [participantsList, setParticipantsList]: any= useState([])
  const [storage, setStorage]: any= useState([])


  const onFieldChange = (val: any) => {
    if (signShow === '添加') {
      if (refForm.current && refForm.current.state?.values?.allDeptAll === undefined && refForm.current.state?.values?.participants?.length > 0) {
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
      // auditedStatus: '',
      urlImageOne: '',
      declarantDeptName: ''
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
    // 获取表单值
    let [err, value] = await to(refForm.current.validateFields())
    if (err) return
    if (!Object.keys(value).length) {
      return message.warning('数据不能为空')
    }
    value.declarantDate && (value.declarantDate = value.declarantDate.format('YYYY-MM-DD'))
    value.urlImageOne && (value.urlImageOne = value.urlImageOne.join(','))
    value.participants && (value.participants = value.participants.join(','))
    // 传后端的申报科室名称
    nurseFileDetailViewModal.getDict('全部科室').forEach(item => {{
      if (item.code === value.declarantDeptCode) {
        obj.declarantDeptName = item.name
      }
    }})
    nurseFilesService.commonSaveOrUpdate('nurseWHInnovationDept', { ...obj, ...value, sign }).then((res: any) => {
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
    for(let i in arr) {
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
    // todo
    if (data && refForm.current && visible) {
      refForm!.current!.setFields({
        declarant: data.declarant,
        declarantDeptCode: data.declarantDeptCode,
        registerUnit: data.registerUnit,
        declarantDate: data.declarantDate ? moment(data.declarantDate) : null,
        endDate: data.endDate ? moment(data.endDate) : null,
        registerNo: data.registerNo,
        participants: data.participants && data.participants.split(','), // todo
        innovationType: data.innovationType,
        innovationGrade: data.innovationGrade,
        promotionArea: data.promotionArea,
        urlImageOne: data.urlImageOne ? data.urlImageOne.split(',') : []
      })
    }
    if (signShow === '修改') {
      setTitle('修改科室创新')
    } else if (signShow === '添加') {
      setTitle('添加科室创新')
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
        <Button key='submit' type='primary' onClick={() => onSave(true)}>
          提交审核
        </Button>
      ]}
    >
      {/* todo 整一个都要调- 新模块 -原本没有新增修改 */}
      <Form ref={refForm} rules={rules} labelWidth={120} onChange={onFieldChange}>
        <Row>
          <Col span={24}>
            <Form.Field label={`申报人`} name='declarant'>
              <Input  maxLength={25}/>
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`申报科室`} name='declarantDeptCode'>
              {/* <AutoComplete filterOption dataSource={nurseFileDetailViewModal.getDict('级别').map((item) => item.name)} /> */}
              <Select
                allowClear
                showSearch
                optionFilterProp="children"
                filterOption={(input, option: any) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              > 
                {nurseFileDetailViewModal.getDict('全部科室').map((item) =>
                  <Option key={item.code} value={item.code}>{item.name}</Option>
                )}
              </Select>
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`申报时间`} name='declarantDate' onValueChange={computedStudyHour}>
              <DatePicker />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`登记单位`} name='registerUnit'>
              <Input maxLength={25}/>
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`登记号`} name='registerNo'>
              <Input maxLength={25}/>
            </Form.Field>
          </Col>
          {signShow !== '修改' && <Col span={24}>
            <Form.Field label={`参与人员所属科室`} name='allDeptAll'>
              {/* <AutoComplete filterOption dataSource={nurseFileDetailViewModal.getDict('级别').map((item) => item.name)} /> */}
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
          <Col span={24}>
            <Form.Field label={`参与成员`} name='participants'>
              {/* <AutoComplete filterOption dataSource={nurseFileDetailViewModal.getDict('级别').map((item) => item.name)} /> */}
              <Select
                mode='multiple'
                allowClear
                showSearch
                optionFilterProp="children"
                // onSelect={onSelect}
                disabled={signShow === '修改'}
                filterOption={(input, option: any) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              > 
                {storage.map((item: any) =>
                  <Option key={item.code} value={item.name}>{item.name}</Option>
                )}
              </Select>
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`创新类别`} name='innovationType'>
              {/* <AutoComplete filterOption   dataSource={nurseFileDetailViewModal.getDict('级别').map((item) => item.name)} /> */}
              <Select>
                {['服务创新', '技术创新', '管理创新'].map((item) =>
                  <Option key={item} value={item}>{item}</Option>
                )}
              </Select>
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`创新级别`} name='innovationGrade'>
              {/* <AutoComplete filterOption   dataSource={nurseFileDetailViewModal.getDict('级别').map((item) => item.name)} /> */}
              <Select>
                {['一级', '二级', '三级', '改良'].map((item) =>
                  <Option key={item} value={item}>{item}</Option>
                )}
              </Select>
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`推广区域`} name='promotionArea'>
              {/* <AutoComplete filterOption   dataSource={nurseFileDetailViewModal.getDict('级别').map((item) => item.name)} /> */}
              <Select>
                {['科室推广', '区域推广', '全院推广'].map((item) =>
                  <Option key={item} value={item}>{item}</Option>
                )}
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
