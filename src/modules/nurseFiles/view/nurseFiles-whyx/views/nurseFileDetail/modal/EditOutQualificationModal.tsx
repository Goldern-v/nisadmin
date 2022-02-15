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
const Option = Select.Option
export interface Props extends ModalComponentProps {
  data?: any
  signShow?: string
  getTableData?: () => {}
}
const rules: Rules = {
  certificateName: (val) => !!val || '请选择证书名称',
  grade: (val) => !!val || '请填写级别',
  issueUnit: (val) => !!val || '请填写发证单位',
  issueDate: (val) => !!val || '请选择发证时间',
  certificateNo: (val) => !!val || '请填写证书编号',
  validityDate: (val) => !!val || '请选择证书有效期',
  urlImageOne: (val) => !!val || '请上传附件',
}
export default function EditPersonWinningModal(props: Props) {
  const [title, setTitle] = useState('')

  let { visible, onCancel, onOk, data, signShow } = props
  let refForm = React.createRef<Form>()
  const certificateName = ['专科护士', '英语等级证书', '心里咨询师', '药师', '健康管理营养师', '院校老师']

  const onFieldChange = () => { }

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
    value.validityDate && (value.validityDate = value.validityDate.format('YYYY-MM-DD'))
    value.issueDate && (value.issueDate = value.issueDate.format('YYYY-MM-DD'))
    value.urlImageOne && (value.urlImageOne = value.urlImageOne.join(','))
    !value.certificateName && (value.certificateName = certificateName[0])
    !value.grade && (value.grade = nurseFileDetailViewModal.getDict('级别')[0]?.name)
    nurseFilesService.commonSaveOrUpdate('nurseWHQualificationOut', { ...obj, ...value, sign }).then((res: any) => {
      message.success('保存成功')
      props.getTableData && props.getTableData()
      emitter.emit('refreshNurseFileDeatilLeftMenu')
      onCancel()
    })
  }

  /** 自动关联进修时常 */
  // const computedStudyHour = () => {
  //   if (refForm.current) {
  //     let startDate = refForm.current.getField('startDate')
  //     let endDate = refForm.current.getField('endDate')
  //     if (startDate && endDate) {
  //       let day = moment(endDate).diff(moment(startDate), 'd') + 1
  //       if (day > 0) {
  //         refForm.current.setField('studyHour', day)
  //       }
  //     }
  //   }
  // }

  useLayoutEffect(() => {
    if (refForm.current && visible) refForm!.current!.clean()
    /** 如果是修改 */
    if (data && refForm.current && visible) {
      refForm!.current!.setFields({
        certificateName: data.certificateName,
        grade: data.grade,
        certificateNo: data.certificateNo,
        validityDate: data.validityDate ? moment(data.validityDate) : null,
        issueDate: data.issueDate ? moment(data.issueDate) : null,
        issueUnit: data.issueUnit,
        urlImageOne: data.urlImageOne ? data.urlImageOne.split(',') : []
      })
    }
    if (signShow === '修改') {
      setTitle('修改院外工作资质')
    } else if (signShow === '添加') {
      setTitle('添加院外工作资质')
    }
  }, [visible])
  const onChangeSelect = (value: any) => {
    if (!!value) {
      refForm!.current!.setFields({ grade: value })
    }
  };

  const onSearchSelect = (value: any) => {
    if (!!value) {
      refForm!.current!.setFields({ grade: value })
    }
  };

  const onBlurSelect = () => {
  };
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
      <Form ref={refForm} rules={rules} labelWidth={100} onChange={onFieldChange}>
        <Row>
          {/*  参与成员字段没有配置 */}
          <Col span={24}>
            <Form.Field label={`证书名称`} name='certificateName' required>
              {/* <AutoComplete filterOption dataSource={nurseFileDetailViewModal.getDict('级别').map((item) => item.name)} /> */}
              <Select
                showSearch
                placeholder={<span style={{ color: '#333' }}>{certificateName[0]}</span>}
                optionFilterProp="children"
                filterOption={(input, option: any) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {certificateName.map((item) =>
                  <Option key={item} value={item}>{item}</Option>
                )}
              </Select>
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`级别`} name='grade' required>
              {/* <AutoComplete filterOption dataSource={nurseFileDetailViewModal.getDict('级别').map((item) => item.name)} /> */}
              <Select
                showSearch
                placeholder={<span style={{ color: '#333' }}>{nurseFileDetailViewModal.getDict('级别')[0]?.name}</span>}
                optionFilterProp="children"
                filterOption={(input, option: any) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                onChange={(e) => onChangeSelect(e)}
                onSearch={(value) => onSearchSelect(value)}
                onBlur={() => onBlurSelect()}
              >
                {nurseFileDetailViewModal.getDict('级别').map((item) =>
                  <Option key={item.code} value={item.code}>{item.name}</Option>
                )}
              </Select>
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`发证单位`} name='issueUnit' required>
              <Input maxLength={25} />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`发证时间`} name='issueDate' required>
              <DatePicker />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`证书编号`} name='certificateNo' required>
              <Input maxLength={25} />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`证书有效期`} name='validityDate' required>
              <DatePicker />
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
