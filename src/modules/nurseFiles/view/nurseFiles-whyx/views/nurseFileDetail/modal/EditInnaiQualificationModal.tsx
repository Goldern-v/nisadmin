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
  grantType: (val) => !!val || '请选择授权类别',
  grantName: (val) => !!val || '请填写授权名称',
  certificateUnit: (val) => !!val || '请填写认证部门',
  certificateDate: (val) => !!val || '请选择认证时间',
  certificateNo: (val) => !!val || '请填写证书编号',
  validityDate: (val) => !!val || '请选择有效期',
  urlImageOne: (val) => !!val || '请上传附件',
}
export default function EditPersonWinningModal(props: Props) {
  const [title, setTitle] = useState('')

  let { visible, onCancel, onOk, data, signShow } = props
  let refForm = React.createRef<Form>()

  // let [grantType, setGrantType] = useState('')

  // const grantType = ['岗位准入', '院区专长护士', '专科技术', 'POCT', '高风险操作授权', '教学指导权', '院内会诊指导权', '院外会诊指导权']
  // const grantName = {
  //   岗位准入: ['CSSD岗位资助证', '病区护士夜班资质准入（内、外科病区）', '特殊科室（OR、急诊、重症、介入）准入资格证', '新生儿护理准入资质', '护理文件书写准入资质', '外勤护士准入资质'],
  //   院区专长护士: ['气道护理', '糖尿病护理', '皮肤伤口护理', '居家护理上门资质认证', '心衰专长护士', '超滤专长护士'],
  //   专科技术: ['CPR资质证', 'CVC维护资质证', 'PVC置管/维护/拔管资质认证', 'PICC/MC维护资质证', '肠外营养液配置资质认证'],
  //   POCT: ['床旁血糖监测', '床旁血气分析'],
  //   高风险操作授权: ['PICC穿刺', '除颤仪操作', '鼻肠管置管', 'CRRT', 'IABP护理'],
  //   教学指导权: ['床边教学老师证', '健康教育讲师'],
  //   院内会诊指导权: ['危重症护理', '心衰护理', '皮肤伤口', '营养会诊', '急诊护理', '糖尿病护理', '老年护理', '静脉治疗', '血液净化', '康复会诊'],
  //   院外会诊指导权: ['心外科重症', '心内科重症', '儿科重症', '手术护理', '介入护理'],
  // }
  // 授权类别
  let [grantTypeList, setGrantTypeList]: any[] = useState([])
  const [selectGrantType, setSelectGrantType] = useState(grantTypeList[0]?.code)
  // 授权名称 -- 授权名称下拉框受授权类别控制
  let [authorizationName, setAuthorizationName]: any[] = useState([])

  // 授权类别
  const getCodeList = () => {
    service.commonApiService.getCodeList().then((res) => {
      setSelectGrantType(selectGrantType || res.data[0]?.code)
      setGrantTypeList(res.data || [])
    })
  }
  // 授权名称
  const getNameList = () => {
    service.commonApiService.getChildCodeList(selectGrantType).then(res => {
      setAuthorizationName(res.data || [])
    })
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
    value.certificateDate && (value.certificateDate = value.certificateDate.format('YYYY-MM-DD'))
    value.validityDate && (value.validityDate = value.validityDate.format('YYYY-MM-DD'))
    value.urlImageOne && (value.urlImageOne = value.urlImageOne.join(','))
    !value.grantType && (value.grantType = grantTypeList[0]?.name)
    value.grantType && (value.grantType = grantTypeList.filter((item: any) => item.code === value.grantType)[0]?.name)
    nurseFilesService.commonSaveOrUpdate('nurseWHQualificationIn', { ...obj, ...value, sign }).then((res: any) => {
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
    setSelectGrantType(val)
    // setGrantType(val)
    if (refForm.current) {
      refForm!.current!.setFields({
        grantName: '',
      })
    }
  }

  useLayoutEffect(() => {
    if (refForm.current && visible) refForm!.current!.clean()
    /** 如果是修改 */
    if (data && refForm.current && visible) {
      refForm!.current!.setFields({
        grantType: data.grantType,
        grantName: data.grantName,
        certificateUnit: data.certificateUnit,
        certificateNo: data.certificateNo,
        certificateDate: data.certificateDate ? moment(data.certificateDate) : null,
        validityDate: data.validityDate ? moment(data.validityDate) : null,
        urlImageOne: data.urlImageOne ? data.urlImageOne.split(',') : []
      })
    }
    if (signShow === '修改') {
      setTitle('修改院内工作资质')
    } else if (signShow === '添加') {
      if (refForm.current) {
        refForm!.current!.setFields({
          grantType: selectGrantType,
        })
      }
      setTitle('添加院内工作资质')
    }
  }, [visible])

  useLayoutEffect(() => {
    getCodeList()
    getNameList()
  }, [selectGrantType])

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
      <Form ref={refForm} rules={rules} labelWidth={100} >
        <Row>
          {/*  参与成员字段没有配置 */}
          <Col span={24}>
            <Form.Field label={`授权类别`} name='grantType' required>
              {/* <AutoComplete filterOption dataSource={nurseFileDetailViewModal.getDict('级别').map((item) => item.name)} /> */}
              <Select
                showSearch
                placeholder={<span style={{ color: '#333' }}>{grantTypeList[0]?.name}</span>}
                optionFilterProp="children"
                onSelect={onSelect}
                filterOption={(input, option: any) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {grantTypeList.map((item: { code: React.Key | undefined; name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined }) =>
                  <Option key={item.code} value={item.code}>{item.name}</Option>
                )}
              </Select>
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`授权名称`} name='grantName' required>
              {/* <AutoComplete filterOption dataSource={authorizationName.map((item: any) => item.name)} /> */}
              <Select
                showSearch
                optionFilterProp="children"
                // onSelect={onSelect}
                filterOption={(input, option: any) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {authorizationName.map((item: { code: React.Key | undefined; name: string }) =>
                  <Option key={item.code} value={item?.name}>{item?.name}</Option>
                )}
              </Select>
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`认证部门`} name='certificateUnit' required>
              <Input maxLength={25} />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`认证时间`} name='certificateDate' onValueChange={computedStudyHour} required>
              <DatePicker />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`证书编号`} name='certificateNo' required>
              <Input maxLength={25} />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`有效期至`} name='validityDate' onValueChange={computedStudyHour} required>
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
