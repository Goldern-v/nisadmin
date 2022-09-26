import styled from 'styled-components'
import React, { useState, useLayoutEffect } from 'react'
import { Modal, Button, Select, Row, Col, message } from 'antd'
import { ModalComponentProps } from 'src/libs/createModal'
import Form from 'src/components/Form'
import { nurseFilesService } from '../../../services/NurseFilesService'
import { nurseFileDetailViewModal } from '../NurseFileDetailViewModal'
import { to } from 'src/libs/fns'
import { Rules } from 'src/components/Form/interfaces'
import moment from 'moment'
import MultipleImageUploader from 'src/components/ImageUploader/MultipleImageUploader'
import YearPicker from 'src/components/YearPicker'
import {appStore} from "src/stores";

export interface Props extends ModalComponentProps {
  data?: any
  signShow?: string
  getTableData?: () => {}
}
let rules: Rules = {
  year: (val) => !!val || '请选择年份',
  standardInfo: (val) => !!val || '请选择达标情况',
  theoryAssess: (val) => !!val || '请填选择理论考核',
  operateAssess: (val) => !!val || '请选择操作考核',
  urlImageOne: (val) =>{
    if(!['sdlj', 'nfsd'].includes(appStore.HOSPITAL_ID)){
      return !!val || '请上传图片'
    }
  },
  // theoryAssessMakeup: (val) => !!val || '请选择理论补考',
  // operateAssessMakeup: (val) => !!val || '请选择操作补考'
}
export default function EditPersonWinningModal(props: Props) {
  const [title, setTitle] = useState('')

  let { visible, onCancel, onOk, data, signShow } = props
  let refForm = React.createRef<Form>()

  const onFieldChange = (value: string) => {
    if (refForm && refForm.current) {
      if (value === 'theoryAssess') {
        if (refForm.current.getFields()[value] === '合格') {
          refForm.current.setFields({
            theoryAssessMakeup: '',
          })
        } else {
          refForm!.current!.setFields({
            theoryAssessMakeup: '合格',
          })
        }
      }
      if (value === 'operateAssess') {
        if (refForm.current.getFields()[value] === '合格') {
          refForm.current.setFields({
            operateAssessMakeup: '',
          })
        } else {
          refForm!.current!.setFields({
            operateAssessMakeup: '合格',
          })
        }
      }
    }
  }

  const onSave = async (sign: boolean) => {
    let obj = {
      empNo: nurseFileDetailViewModal.nurserInfo.empNo,
      empName: nurseFileDetailViewModal.nurserInfo.empName,
      // auditedStatus: '',
      urlImageOne: ''
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
    value.year && (value.year = value.year.format('YYYY'))
    // value.endDate && (value.endDate = value.endDate.format('YYYY-MM-DD'))
    value.urlImageOne && (value.urlImageOne = value.urlImageOne.join(','))
    nurseFilesService.commonSaveOrUpdate('nurseWHEduSanki', { ...obj, ...value, sign }).then((res: any) => {
      message.success('保存成功')
      props.getTableData && props.getTableData()
      // emitter.emit('refreshNurseFileDeatilLeftMenu')
      onCancel()
    })
  }
  const [theoryAssess, setTheoryAssess] = useState('')
  const onTheoryAssessChange = (val: string) => {
    setTheoryAssess(val)
    if (val === '不合格') {
      rules = {...rules, theoryAssessMakeup: (val) => !!val || '请选择理论补考',}
    } else {
      delete rules.theoryAssessMakeup

    }

  }
  const [operateAssess, setOperateAssess] = useState('')
  const onOperateAssessChange = (val: string) => {
    setOperateAssess(val)
    if (val === '不合格') {
      rules = {...rules, operateAssessMakeup: (val) => !!val || '请选择操作补考',}
    } else {
      delete rules.operateAssessMakeup
    }
  }

  const onCancel1 = () => {
    setTheoryAssess('')
    setOperateAssess('')
    onCancel()
  }


  useLayoutEffect(() => {
    if (refForm.current && visible) refForm!.current!.clean()
    /** 如果是修改 */
    if (data && refForm.current && visible) {
      refForm!.current!.setFields({
        standardInfo: data.standardInfo,
        theoryAssess: data.theoryAssess,
        theoryAssessMakeup: data.theoryAssessMakeup,
        operateAssess: data.operateAssess,
        operateAssessMakeup: data.operateAssessMakeup,
        year: data.year ? moment(data.year) : null,
        urlImageOne: data.urlImageOne ? data.urlImageOne.split(',') : []
      })
      setTheoryAssess(data.theoryAssess)
      setOperateAssess(data.operateAssess)
    }
    if (signShow === '修改') {
      setTitle('修改')
    } else if (signShow === '添加') {
      setTitle('添加')
      refForm!.current!.setFields({
        standardInfo: '是',
        theoryAssess: '合格',
        theoryAssessMakeup: '',
        operateAssess: '合格',
        operateAssessMakeup: '',
        year: moment(),
      })
    }
  }, [visible])


  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={onCancel1}
      forceRender
      centered
      footer={[
        <Button key='back' onClick={onCancel1}>
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
      <Form ref={refForm} rules={rules} labelWidth={120} onChange={onFieldChange}>
        <Row>
          <Col span={24}>
            <Form.Field label={`年份`} name='year' required>
              {/* <Input /> */}
              <YearPicker />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`达标情况`} name='standardInfo' required>
              <Select>
                {['是', '否'].map((item) => (
                  <Select.Option value={item}  key={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`附件`} name='urlImageOne' >
              <MultipleImageUploader text='添加图片' />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`理论考核`} name='theoryAssess' onValueChange={onTheoryAssessChange} required>
              <Select>
                {['合格', '不合格'].map((item) => (
                  <Select.Option value={item} key={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
            </Form.Field>
          </Col>
         { theoryAssess === '不合格' &&
          <Col span={24}>
            <Form.Field label={`理论补考`} name='theoryAssessMakeup' required>
              <Select>
                {['合格', '不合格'].map((item) => (
                  <Select.Option value={item} key={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
            </Form.Field>
          </Col>
        }
        <Col span={24}>
          <Form.Field label={`操作考试`} name='operateAssess' onValueChange={onOperateAssessChange} required>
            <Select>
              {['合格', '不合格'].map((item) => (
                <Select.Option value={item} key={item}>
                  {item}
                </Select.Option>
              ))}
            </Select>
          </Form.Field>
        </Col>
        { operateAssess === '不合格' &&
          <Col span={24}>
          <Form.Field label={`操作补考`} name='operateAssessMakeup' required>
            <Select>
              {['合格', '不合格'].map((item) => (
                <Select.Option value={item} key={item}>
                  {item}
                </Select.Option>
              ))}
            </Select>
          </Form.Field>
        </Col>
        }
        </Row>
      </Form>
    </Modal>
  )
}
const Wrapper = styled.div``
