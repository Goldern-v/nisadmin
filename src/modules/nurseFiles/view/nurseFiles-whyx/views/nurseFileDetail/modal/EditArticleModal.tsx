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
// import YearPicker from 'src/components/YearPicker'

import { AutoComplete } from 'src/vendors/antd'
const Option = Select.Option
const { MonthPicker } = DatePicker;
export interface Props extends ModalComponentProps {
  data?: any
  signShow?: string
  getTableData?: () => {}
}
const rules: Rules = {
  periodicalNumber: (val) => {
    if (val) {
      if (
        /^ISSN [0-9]{4}-[0-9]{4}$/.test(val)
        || /^CN.+$/.test(val)
        || /^ISSN [0-9]{4}-[0-9]{4}、CN.+$/.test(val)
      )
        return true

      return '字母均为大写，不要出现中文字，如“国际刊号”等。例：ISSN 1003-8914、CN 11-1592/R（统一为国际在前、国内在后）'
    } else {
      return true
    }
  },
  pageNumber(val) {
    if(val) {
      if (/^[0-9]\-[0-9]$/.test(val)) return true
      return '请输入正确的起始页码，起始页码和结束页码的数字，中间用减号相隔）'
    } else return true
  }
  // time: (val) => !!val || '请填写时间',
  // awardWinningName: (val) => !!val || '请填写获奖/推广创新项目名称',
  // rank: (val) => !!val || '请填写本人排名',
  // awardlevel: (val) => !!val || '请填写授奖级别',
  // approvalAuthority: (val) => !!val || '请填写批准机关'
}
export default function EditArticleModal(props: Props) {
  const [title, setTitle] = useState('')

  let { visible, onCancel, onOk, data, signShow } = props
  let refForm = React.createRef<Form>()

  const onFieldChange = () => { }

  const onSave = async (sign: boolean) => {
    let obj = {
      empNo: nurseFileDetailViewModal.nurserInfo.empNo,
      empName: nurseFileDetailViewModal.nurserInfo.empName
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

    value.publicYear && (value.publicYear = value.publicYear.format('YYYY年MM月'))
    value.urlImageOne && (value.urlImageOne = value.urlImageOne.join(','))
    value.urlImageTwo && (value.urlImageTwo = value.urlImageTwo.join(','))
    nurseFilesService.commonSaveOrUpdate('nurseWHArticle', { ...obj, ...value, sign }).then((res: any) => {
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
          publicYear: data.publicYear ? moment(data.publicYear) : null,
          urlImageOne: data.urlImageOne ? data.urlImageOne.split(',') : [],
          urlImageTwo: data.urlImageTwo ? data.urlImageTwo.split(',') : []
        }
      })
    }
    if (signShow === '修改') {
      setTitle('修改文章')
    } else if (signShow === '添加') {
      setTitle('添加文章')
    }
  }, [visible])

  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={onCancel}
      forceRender
      centered
      width={560}
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
              <Form.Field label={`杂志名称`} name='magazineName'>
                <Input maxLength={25} />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`文章名称`} name='articleName'>
                <Input maxLength={25} />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`作者`} name='articleAuthor'>
                <Select>
                  {nurseFileDetailViewModal.getDict('作者').map((item) => (
                    <Option value={item.name} key={'zuozhe-' + item.name}>{item.name}</Option>
                  ))}
                </Select>
              </Form.Field>
            </Col>
            {/* todo */}
            <Col span={24}>
              <Form.Field label={`期刊年月`} name='publicYear'>
                {/* <YearPicker /> */}
                <MonthPicker format="YYYY年MM月" />
              </Form.Field>
            </Col>
            {/* <Col span={24}>
              <Form.Field label={`期刊号`} name='periodicalNumber'>
                <Input />
              </Form.Field>
            </Col> */}
            {/* todo */}
            <Col span={24}>
              <Form.Field label={`卷期号`} name='volumeNumber'>
                <Input maxLength={25} />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`起止页码`} name='pageNumber'>
                <Input  maxLength={25} placeholder='请输入起止页码，例如：1-56' />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`文章类别`} name='articleType'>
                <AutoComplete dataSource={nurseFileDetailViewModal.getDict('文章类别').map((item) => item.name)} />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`论文收录网站`} name='influencingFactors'>
                <AutoComplete dataSource={nurseFileDetailViewModal.getDict('论文收录网站').map((item) => item.name)} />
              </Form.Field>
            </Col>
            {/* <Col span={24}>
              <Form.Field label={`文章扫描件`} name='urlImageOne'>
                <MultipleImageUploader text='添加图片' tip={'上传杂志封面页、目录页、发表文章内容页、封底扫描件'} />
              </Form.Field>
            </Col> */}
            {/* todo */}
            <Col span={24}>
              <Form.Field label={`封面扫描件`} name='urlImageOne'>
                <MultipleImageUploader text='添加图片' tip={'上传杂志封面页、目录页、发表文章内容页、封底扫描件'} />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`目录扫描件`} name='urlImageOne'>
                <MultipleImageUploader text='添加图片' tip={'上传杂志封面页、目录页、发表文章内容页、封底扫描件'} />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`正文扫描件`} name='urlImageOne'>
                <MultipleImageUploader text='添加图片' tip={'上传杂志封面页、目录页、发表文章内容页、封底扫描件'} />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`封底扫描件`} name='urlImageOne'>
                <MultipleImageUploader text='添加图片' tip={'上传杂志封面页、目录页、发表文章内容页、封底扫描件'} />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`网络下载件`} name='urlImageTwo'>
                <MultipleImageUploader text='添加图片' tip={'上传从收录网站下载的完整版文章内容'} />
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
