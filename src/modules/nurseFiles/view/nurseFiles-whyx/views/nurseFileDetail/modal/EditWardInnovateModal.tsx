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

  const onFieldChange = (val: any) => {
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
    // 获取表单值
    let [err, value] = await to(refForm.current.validateFields())
    if (err) return
    if (!Object.keys(value).length) {
      return message.warning('数据不能为空')
    }
    value.startDate && (value.startDate = value.startDate.format('YYYY-MM-DD'))
    value.endDate && (value.endDate = value.endDate.format('YYYY-MM-DD'))
    value.urlImageOne && (value.urlImageOne = value.urlImageOne.join(','))
    // todo
    nurseFilesService.commonSaveOrUpdate('nurseWHOutStudy', { ...obj, ...value, sign }).then((res: any) => {
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
    console.log(val, 777)
  }

  useLayoutEffect(() => {
    if (refForm.current && visible) refForm!.current!.clean()
    /** 如果是修改 */
    // todo
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
      <Form ref={refForm} rules={rules} labelWidth={100} onChange={onFieldChange}>
        <Row>
          <Col span={24}>
            <Form.Field label={`申报人`} name='studyMajor'>
              <Input  maxLength={25}/>
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`申报科室`} name='participant'>
              {/* <AutoComplete filterOption dataSource={nurseFileDetailViewModal.getDict('级别').map((item) => item.name)} /> */}
              <Select
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
          </Col>
          <Col span={24}>
            <Form.Field label={`申报时间`} name='startDate' onValueChange={computedStudyHour}>
              <DatePicker />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`登记单位`} name='unit'>
              <Input maxLength={25}/>
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`登记号`} name='unit'>
              <Input maxLength={25}/>
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`参与成员`} name='participant'>
              {/* <AutoComplete filterOption dataSource={nurseFileDetailViewModal.getDict('级别').map((item) => item.name)} /> */}
              <Select
                mode='multiple'
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
          </Col>
          <Col span={24}>
            <Form.Field label={`创新类别`} name='participant1'>
              {/* <AutoComplete filterOption   dataSource={nurseFileDetailViewModal.getDict('级别').map((item) => item.name)} /> */}
              <Select>
                {['服务创新', '技术创新', '管理创新'].map((item) =>
                  <Option key={item} value={item}>{item}</Option>
                )}
              </Select>
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`创新级别`} name='participant2'>
              {/* <AutoComplete filterOption   dataSource={nurseFileDetailViewModal.getDict('级别').map((item) => item.name)} /> */}
              <Select>
                {['一级', '二级', '三级', '改良'].map((item) =>
                  <Option key={item} value={item}>{item}</Option>
                )}
              </Select>
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`推广区域`} name='participant3'>
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
