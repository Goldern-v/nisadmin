import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Modal, Input, Button, Radio, DatePicker, Select, Row, Col, message } from 'antd'
import { ModalComponentProps } from 'src/libs/createModal'
import Form from 'src/components/Form'
import { nurseFilesService } from '../../../services/NurseFilesService'
import { nurseFileDetailViewModal } from '../NurseFileDetailViewModal'
import { appStore } from 'src/stores'
import { to } from 'src/libs/fns'
import { Rules } from 'src/components/Form/interfaces'
import moment from 'moment'
import emitter from 'src/libs/ev'
import MultipleImageUploader from 'src/components/ImageUploader/MultipleImageUploader'
import YearPicker from 'src/components/YearPicker'
import { AutoComplete } from 'src/vendors/antd'
import { dateFormat3 } from 'src/modules/nurseHandBookNew/views/detail-lyrm/config'
const Option = Select.Option
export interface Props extends ModalComponentProps {
  data?: any,
  signShow?: string,
  getTableData?: () => {}
}
const rules: Rules = {
  patentLevel: (val) => {
    if (val) {
      if (/^第[零一二三四五六七八九十百千万亿兆]*$/.test(val))
        return true

      return '填写为“第三”，不能为3或者第3'
    } else {
      return true
    }
  },
  patentNumber: (val) => {
    if (val) {
      console.log('test-exp', val, /^ZL [0-9]{4} [0-9] [0-9]{7}\.[0-9X]$/.test(val))
      if (/^ZL [0-9]{4} [0-9] [0-9]{7}\.[0-9X]$/.test(val))
        return true

      return '例：ZL 2019 2 1585466.2(ZL均为大写，ZL与后面数字之间有一个空格，第四个数与第五个数之间一个空格，第五位数与第六位数之间一个空格，后面的.为英文状态下的点)'
    } else {
      return true
    }
  },
  // time: (val) => !!val || '请填写时间',
  // awardWinningName: (val) => !!val || '请填写获奖/推广创新项目名称',
  // rank: (val) => !!val || '请填写本人排名',
  // awardlevel: (val) => !!val || '请填写授奖级别',
  // approvalAuthority: (val) => !!val || '请填写批准机关'
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
    value.grantNoticeDate && (value.grantNoticeDate = value.grantNoticeDate.format(dateFormat3))
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
          grantNoticeDate: data.grantNoticeDate ? moment(data.grantNoticeDate) : null,
          urlImageOne: data.urlImageOne ? data.urlImageOne.split(',') : []
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
              <Form.Field label={`专利名称`} name='patentName'>
                <Input />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`专利排名`} name='patentLevel'>
                <AutoComplete dataSource={nurseFileDetailViewModal.getDict('专利排名').map((item) => item.name)} />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`专利号`} name='patentNumber'>
                <Input />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`发证单位`} name='cardUnit'>
                <Input />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`发证时间`} name='cardDate'>
                <DatePicker />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`专利类型`} name='patentType'>
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
              <Form.Field label={`是否成果转化`} name='isResultTransfor'>
                <Select>
                  <Select.Option value='是'>是</Select.Option>
                  <Select.Option value='否'>否</Select.Option>
                </Select>
              </Form.Field>
            </Col>
            {!['dglb'].includes(appStore.HOSPITAL_ID) && <Col span={24}>
              <Form.Field label={`授权公告日`} name='grantNoticeDate'>
                <DatePicker format={dateFormat3} />
              </Form.Field>
            </Col>}

            <Col span={24}>
              <Form.Field label={`附件`} name='urlImageOne'>
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
