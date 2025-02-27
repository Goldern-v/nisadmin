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
import { AutoComplete } from 'src/vendors/antd'
const Option = Select.Option
export interface Props extends ModalComponentProps {
  data?: any
  signShow?: string
  getTableData?: () => {}
}
const rules: Rules = {
  pressNumber: (val) => {
    if (val) {
      if (/^ISBN ([0-9]*-)+[0-9]*$/.test(val))
        return true

      return '例：ISBN 978-7-117-27226-1(前面字母必须为大写，ISBN与后面978开始的数字之间有一个空格，后面数字与数字之间为一个减号，一般四个减号)'
    } else {
      return true
    }
  }
  // time: (val) => !!val || '请填写时间',
  // awardWinningName: (val) => !!val || '请填写获奖/推广创新项目名称',
  // rank: (val) => !!val || '请填写本人排名',
  // awardlevel: (val) => !!val || '请填写授奖级别',
  // approvalAuthority: (val) => !!val || '请填写批准机关'
}
export default function EditMonographModal(props: Props) {
  const [title, setTitle] = useState('')

  let { visible, onCancel, onOk, data, signShow } = props
  let refForm = React.createRef<Form>()

  const onFieldChange = () => { }

  const onSave = async (sign: boolean) => {
    let obj = {
      empNo: nurseFileDetailViewModal.nurserInfo.empNo,
      empName: nurseFileDetailViewModal.nurserInfo.empName,
      urlImageOne: ''
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
    value.pressDate && (value.pressDate = value.pressDate.format('YYYY-MM-DD'))
    value.year && (value.year = value.year.format('YYYY'))
    value.urlImageOne && (value.urlImageOne = value.urlImageOne.join(','))
    nurseFilesService.commonSaveOrUpdate('nurseWHMonograph', { ...obj, ...value, sign }).then((res: any) => {
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
        ...data,
        ...{
          pressDate: data.pressDate ? moment(data.pressDate) : null,
          year: data.year ? moment(data.year) : null,
          urlImageOne: data.urlImageOne ? data.urlImageOne.split(',') : []
        }
      })
    }
    if (signShow === '修改') {
      setTitle('修改专著')
    } else if (signShow === '添加') {
      setTitle('添加专著')
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
      <Wrapper>
        <Form ref={refForm} rules={rules} labelWidth={100} onChange={onFieldChange}>
          <Row>
            <Col span={24}>
              <Form.Field label={`年份`} name='year'>
                <YearPicker />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`专著名称`} name='monographName'>
                <Input />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`出版社名称`} name='pressName'>
                <Input />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`出版号`} name='pressNumber'>
                <Input />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`出版日期`} name='pressDate'>
                <DatePicker />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`著者`} name='participation'>
                <AutoComplete dataSource={nurseFileDetailViewModal.getDict('参编').map((item) => item.name)} />
              </Form.Field>
            </Col>
            { ['zhzxy'].includes(appStore.HOSPITAL_ID)&&<Col span={24}>
              <Form.Field label={`起止页码`} name='pageNumber'>
                <Input />
              </Form.Field>
            </Col>}
            <Col span={24}>
              <Form.Field label={`附件`} name='urlImageOne'>
                <MultipleImageUploader
                  text='添加图片'
                  tip={'上传专著封面页、有自己参编名称一页，有出版号一页、目录页共四页的扫描件'}
                />
              </Form.Field>
            </Col>
          </Row>
        </Form>
      </Wrapper>
    </Modal>
  )
}
const Wrapper = styled.div`
  .formField-container.has-error{
    &>div:last-of-type{
      position: static;
    }
  }
`
