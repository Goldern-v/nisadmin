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
  // patentLevel: (val) => {
  //   if (val) {
  //     if (/^第[零一二三四五六七八九十百千万亿兆]*$/.test(val))
  //       return true

  //     return '填写为“第三”，不能为3或者第3'
  //   } else {
  //     return true
  //   }
  // },
  patentNumber: (val) => {
    if (val) {
      if (/^ZL [0-9]{4} [0-9] [0-9]{7}\.[0-9]$/.test(val))
        return true

      return '例：ZL 2019 2 1585466.2(ZL均为大写，ZL与后面数字之间有一个空格，第四个数与第五个数之间一个空格，第五位数与第六位数之间一个空格，后面的.为英文状态下的点)'
    } else {
      return true
    }
  },
  patentLevel: (val) => !!val || '请填写专利个人排名',
  patentName: (val) => !!val || '请填写专利名称',
  cardUnit: (val) => !!val || '请填写发证单位',
  cardDate: (val) => !!val || '请填写发证时间',
  patentType: (val) => !!val || '请填写专利类型',
  isResultTransfor: (val) => !!val || '请填写是否成果转化',
  grantNoticeDate: (val) => !!val || '请填写授权公告日',
  urlImageOne: (val) => !!val || '请上传附件',
}
export default function EditPatentModal(props: Props) {
  const [title, setTitle] = useState('')

  let { visible, onCancel, onOk, data, signShow } = props
  let refForm = React.createRef<Form>()

  const onFieldChange = () => { }

  const onSave = async (sign?: boolean) => {
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
    value.cardDate && (value.cardDate = value.cardDate.format('YYYY-MM-DD'))
    value.grantNoticeDate && (value.grantNoticeDate = value.grantNoticeDate.format('YYYY-MM-DD'))
    value.urlImageOne && (value.urlImageOne = value.urlImageOne.join(','))

    nurseFilesService.commonSaveOrUpdate('nurseWHPatent', { ...obj, ...value, sign }).then((res: any) => {
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
          cardDate: data.cardDate ? moment(data.cardDate) : null,
          urlImageOne: data.urlImageOne ? data.urlImageOne.split(',') : [],
          grantNoticeDate: data.grantNoticeDate ? moment(data.grantNoticeDate) : null,
        }
      })
    }
    if (signShow === '修改') {
      setTitle('修改专利')
    } else if (signShow === '添加') {
      setTitle('添加专利')
    }
  }, [visible])

  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={onCancel}
      okText='保存'
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
        <Form ref={refForm} rules={rules} labelWidth={120} onChange={onFieldChange}>
          <Row>
            <Col span={24}>
              <Form.Field label={`专利名称`} name='patentName' required>
                <Input maxLength={20} />
              </Form.Field>
            </Col>
            <Col span={24}>
              {/* todo 专利排名改为 专利个人排名*/}
              <Form.Field label={`专利个人排名`} name='patentLevel' required>
                {/* 原本的 */}
                {/* <AutoComplete dataSource={nurseFileDetailViewModal.getDict('专利排名').map((item) => item.name)} /> */}
                <AutoComplete dataSource={['第一人', '第二人', '第三人', '其他'].map((item) => item)} />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`专利号`} name='patentNumber' required>
                <Input />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`发证单位`} name='cardUnit' required>
                <Input maxLength={20} />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`发证时间`} name='cardDate' required>
                <DatePicker />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`专利类型`} name='patentType' required>
                {/* <AutoComplete dataSource={nurseFileDetailViewModal.getDict('专利类型').map((item) => item.name)} /> */}
                <Select>
                  {nurseFileDetailViewModal.getDict('专利类型').map((item) => (
                    <Select.Option value={item.code} key={item.code}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`是否成果转化`} name='isResultTransfor' required>
                <Select>
                  <Select.Option value='是'>是</Select.Option>
                  <Select.Option value='否'>否</Select.Option>
                </Select>
              </Form.Field>
            </Col>
            {/* todo 新增 */}
            <Col span={24}>
              <Form.Field label={`授权公告日`} name='grantNoticeDate' required>
                <DatePicker />
              </Form.Field>
            </Col>

            <Col span={24}>
              <Form.Field label={`附件`} name='urlImageOne' required>
                <MultipleImageUploader text='添加图片' tip={'上传专利证书扫描件'} />
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
