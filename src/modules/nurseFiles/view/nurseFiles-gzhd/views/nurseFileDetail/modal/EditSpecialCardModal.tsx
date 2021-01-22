import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
// import { RouteComponentProps } from 'react-router'
import { Modal, Input, Button, Radio, DatePicker, Select, Row, Col, message, Alert } from 'antd'
import { ModalComponentProps } from 'src/libs/createModal'
import Form from 'src/components/Form'
import { nurseFilesService } from '../../../services/NurseFilesService'
// import { nurseFileDetailViewModal } from '../NurseFileDetailViewModal'
// import { TITLE_LIST, POST_LIST } from '../../nurseFilesList/modal/AddNursingModal'
import { to } from 'src/libs/fns'
import { Rules } from 'src/components/Form/interfaces'
import moment from 'moment'
// import loginViewModel from 'src/modules/login/LoginViewModel'
// import ImageUploader from 'src/components/ImageUploader'
import { appStore, authStore } from 'src/stores'
// import service from 'src/services/api'
import { observer } from 'mobx-react-lite'
import emitter from 'src/libs/ev'
import MultipleImageUploader from 'src/components/ImageUploader/MultipleImageUploader'

// const Option = Select.Option
export interface Props extends ModalComponentProps {
  id?: number
  data?: any
  signShow?: string
  getTableData?: () => {}
}

const rules: Rules = {
  time: (val) => !!val || '获得时间',
  specialQualificationName: (val) => !!val || '资格名称',
  specialQualificationNo: (val) => !!val || '资格证编号'
}

export default observer(function EditWorkHistoryModal(props: Props) {
  const [title, setTitle] = useState('')
  const uploadOption = {
    empNo: appStore.queryObj.empNo,
    type: '4',
    auditedStatus:
      (authStore.user && authStore.user.post) === '护长'
        ? 'waitAuditedNurse'
        : (authStore.user && authStore.user.post) === '护理部'
          ? 'waitAuditedDepartment'
          : ''
  }

  let { visible, onCancel, onOk, data, signShow } = props

  let refForm = React.createRef<Form>()

  const onFieldChange = () => { }

  const onSave = async (sign: boolean) => {
    let obj = { ...uploadOption }

    if (!sign) obj.auditedStatus = 'noSubmit'

    if (signShow === '修改') {
      Object.assign(obj, { id: data.id })
    }

    if (!refForm.current) return
    let [err, value] = await to(refForm.current.validateFields())
    if (err) return
    value.time && (value.time = value.time.format('YYYY-MM-DD'))
    value.urlImageOne && (value.urlImageOne = value.urlImageOne.join(','))
    nurseFilesService.nurseSpecialQualificationAdd({ ...obj, ...value, sign }).then((res: any) => {
      message.success('保存成功')
      props.getTableData && props.getTableData()
      emitter.emit('refreshNurseFileDeatilLeftMenu')
      onCancel()
    })
  }

  useLayoutEffect(() => {
    if (refForm.current && visible) refForm!.current!.clean()
    /** 如果是修改 */
    if (data && refForm.current && visible) {
      refForm!.current!.setFields({
        time: moment(data.time),
        specialQualificationName: data.specialQualificationName,
        specialQualificationNo: data.specialQualificationNo,
        urlImageOne: data.urlImageOne ? data.urlImageOne.split(',') : []
      })
    }
    if (signShow === '修改') {
      setTitle('修改特殊资格证')
    } else if (signShow === '添加') {
      setTitle('添加特殊资格证')
    }
  }, [visible])
  // const testClick = () => {
  //   console.log('title44444444444445555555555', title)
  // }
  return (
    <div>
      {/* <Button onClick={testClick}>test</Button> */}
      <Modal
        title={title}
        visible={visible}
        onCancel={onCancel}
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
        okText='保存'
        forceRender>
        <Form ref={refForm} rules={rules} labelWidth={80} onChange={onFieldChange}>
          <Row>
            <Col span={24}>
              <Form.Field label={`获得时间`} name='time' required>
                <DatePicker />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`资格名称`} name='specialQualificationName' required>
                <Input />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`资格证编号`} name='specialQualificationNo' required>
                <Input />
              </Form.Field>
            </Col>

            <Col span={24}>
              <Form.Field label={`附件`} name='urlImageOne'>
                <MultipleImageUploader text='添加图片' uploadOption={uploadOption} />
              </Form.Field>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  )
})
const Wrapper = styled.div``
