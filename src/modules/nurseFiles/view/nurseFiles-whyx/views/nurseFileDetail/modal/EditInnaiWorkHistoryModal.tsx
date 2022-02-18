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
import { appStore, authStore } from 'src/stores'
import moment from 'moment'

import loginViewModel from 'src/modules/login/LoginViewModel'
// 加附件
import ImageUploader from 'src/components/ImageUploader'
import emitter from 'src/libs/ev'
import { AutoComplete } from 'src/vendors/antd'
const Option = Select.Option
export interface Props extends ModalComponentProps {
  id?: number
  data?: any
  signShow?: string
  getTableData?: () => {}
}
const uploadCard = () => Promise.resolve('123')
const rules: Rules = {
  startTime: (val) => !!val || '请填写时间',
  // endTime: (val) => !!val || '请填写时间',
  unit: (val) => !!val || '请填写单位',
  department: (val) => !!val || '请填写科室',
}
export default function EditWorkHistoryModal(props: Props) {
  let { visible, onCancel, onOk, data, signShow } = props
  const [title, setTitle] = useState('')
  let refForm = React.createRef<Form>()

  const onFieldChange = () => { }

  const onSave = async (sign: boolean) => {
    let obj = {
      empNo: nurseFileDetailViewModal.nurserInfo.empNo,
      empName: nurseFileDetailViewModal.nurserInfo.empName,
      urlImageOne: '',
      insideOutsideState: '1'
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
    value.startTime && (value.startTime = value.startTime.format('YYYY-MM-DD'))
    value.endTime && (value.endTime = value.endTime.format('YYYY-MM-DD'))
    // todo
    nurseFilesService.commonSaveOrUpdate('nurseWHWorkExperienceIn', { ...obj, ...value, sign }).then((res: any) => {
      message.success('保存成功')
      props.getTableData && props.getTableData()
      emitter.emit('refreshNurseFileDeatilLeftMenu')
      onCancel()
    })
  }
  const onChange = (val: any) => {
    console.log(val)
  }

  useLayoutEffect(() => {
    if (refForm.current && visible) refForm!.current!.clean()
    /** 如果是修改 */
    if (data && refForm.current && visible) {
      refForm!.current!.setFields({
        startTime: data.startTime ? moment(data.startTime) : null,
        endTime: data.endTime ? moment(data.endTime) : null,
        unit: data.unit,
        professionalWork: data.professionalWork,
        professional: data.professional,
        post: data.post,
        department: data.department
      })
      // refForm.current.setField('unit', 123)
    }
    if (signShow === '修改') {
      setTitle('修改院内工作经历')
    } else if (signShow === '添加') {
      setTitle('添加院内工作经历')
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
      <Form ref={refForm} labelWidth={100} onChange={onFieldChange} rules={rules}>
        <Row>
          <Row gutter={12}>
            <Col span={15}>
              <Form.Field label={`时间`} name='startTime' required suffix='到'>
                <DatePicker />
              </Form.Field>
            </Col>
            <Col span={9}>
              <Form.Field name='endTime' required>
                <DatePicker />
              </Form.Field>
            </Col>
          </Row>
          <div
            style={{
              margin: '-10px 0px 10px 64px',
              color: 'rgba(0,0,0,0.45)',
              fontSize: 14,
              position: 'relative',
              top: -10,
              textAlign: 'right'
            }}
          >
            <span style={{ color: "red" }}>*</span>空则为至今
          </div>
          <Col span={24}>
            <Form.Field label={`单位`} name='unit' required>
              <Input maxLength={25} />
            </Form.Field>
          </Col>
          {/* todo */}
          <Col span={24}>
            <Form.Field label={`科室`} name='department' required>
              {/* <Input maxLength={25}/> */}
              <Select
                showSearch
                optionFilterProp="children"
                onChange={onChange}
                filterOption={(input, option: any) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {nurseFileDetailViewModal.getDict('全部科室').map(item =>
                  <Option value={item.name}>{item.name}</Option>
                )}
              </Select>
            </Form.Field>
          </Col>

          {/* <Col span={24}>
            <Form.Field label={`专业技术工作`} name='professionalWork'>
              <AutoComplete dataSource={nurseFileDetailViewModal.getDict('专业技术工作').map((item) => item.name)} />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`技术职称`} name='professional'>
              <AutoComplete dataSource={nurseFileDetailViewModal.getDict('技术职称').map((item) => item.name)} />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`职务`} name='post'>
              <AutoComplete dataSource={nurseFileDetailViewModal.getDict('职务').map((item) => item.name)} />
            </Form.Field>
          </Col> */}
        </Row>
      </Form>
    </Modal>
  )
}
const Wrapper = styled.div``
