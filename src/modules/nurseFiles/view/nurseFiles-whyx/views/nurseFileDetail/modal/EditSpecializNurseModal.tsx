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
  nurseName: (val) => !!val || '请填写专科护士名称',
  cardUnit: (val) => !!val || '请填写发证单位',
  cardNumber: (val) => !!val || '请填写证书编号',
  nurseLevel: (val) => !!val || '请填写级别',
  cardNumberDate: (val) => !!val || '请填写发证时间',
  urlImageOne: (val) => !!val || '请上传附件'
}
export default function EditSpecializNurseModal(props: Props) {
  const [title, setTitle] = useState('')

  let { visible, onCancel, onOk, data, signShow } = props
  let refForm = React.createRef<Form>()

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
    let [err, value] = await to(refForm.current.validateFields())
    if (err) return
    if (!Object.keys(value).length) {
      return message.warning('数据不能为空')
    }
    value.cardNumberDate && (value.cardNumberDate = value.cardNumberDate.format('YYYY-MM-DD'))
    value.urlImageOne && (value.urlImageOne = value.urlImageOne.join(','))
    nurseFilesService.commonSaveOrUpdate('nurseWHSpecializNurse', { ...obj, ...value, sign }).then((res: any) => {
      message.success('保存成功')
      props.getTableData && props.getTableData()
      emitter.emit('refreshNurseFileDeatilLeftMenu')
      onCancel()
    })
  }

  // 参数人员
  const handleChange = (value: any) => {
    console.log(`Selected: ${value}`);
  }

  useLayoutEffect(() => {
    if (refForm.current && visible) refForm!.current!.clean()
    /** 如果是修改 */
    if (data && refForm.current && visible) {
      refForm!.current!.setFields({
        nurseName: data.nurseName,
        cardUnit: data.cardUnit,
        cardNumber: data.cardNumber,
        nurseLevel: data.nurseLevel,
        cardNumberDate: data.cardNumberDate ? moment(data.cardNumberDate) : null,
        urlImageOne: data.urlImageOne ? data.urlImageOne.split(',') : []
      })
    }
    if (signShow === '修改') {
      setTitle('修改所获奖励')
    } else if (signShow === '添加') {
      setTitle('添加专科护士信息')
    }
  }, [visible])
  const onChangeSelect = (value: any) => {
    if (!!value) {
      refForm!.current!.setFields({ nurseName: value })
    }
  };

  const onSearchSelect = (value: any) => {
    if (!!value) {
      refForm!.current!.setFields({ nurseName: value })
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
        // <Button key='submit' type='primary' onClick={() => onSave(true)}>
        //   提交审核
        // </Button>
      ]}
    >
      <Form ref={refForm} rules={rules} labelWidth={120} onChange={onFieldChange}>
        <Row>
          <Col span={24}>
            <Form.Field label={`专科护士名称`} name='nurseName' required>
              <Select
                showSearch
                optionFilterProp="children"
                filterOption={(input, option: any) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                onChange={(e) => onChangeSelect(e)}
                onSearch={(value) => onSearchSelect(value)}
                onBlur={() => onBlurSelect()}
              >
                {nurseFileDetailViewModal.getDict('专科护士名称').map((item) => (
                  <Select.Option value={item.code} key={item.code}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`发证单位`} name='cardUnit' required>
              <Input />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`证书编号`} name='cardNumber' required>
              <Input />
            </Form.Field>
          </Col>
          <Col span={24}>
            {/* todo 接口联调 后端要去掉 院级 */}
            <Form.Field label={`级别`} name='nurseLevel' required>
              <AutoComplete dataSource={nurseFileDetailViewModal.getDict('级别').map((item) => item.name)} />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`发证时间`} name='cardNumberDate' required>
              <DatePicker />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`附件`} name='urlImageOne' required>
              <MultipleImageUploader text='添加图片' tip={'上传专科护士证书扫描件'} />
            </Form.Field>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
const Wrapper = styled.div``
