import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Modal, Input, Button, Radio, DatePicker, Select, Row, Col, message, Spin } from 'antd'
import { ModalComponentProps } from 'src/libs/createModal'
import Form from 'src/components/Form'

import { nurseFileDetailViewModal } from '../NurseFileDetailViewModal'
import { TITLE_LIST, POST_LIST } from '../../nurseFilesList/modal/AddNursingModal'
import { to } from 'src/libs/fns'
import { Rules } from 'src/components/Form/interfaces'
import moment from 'moment'
// 加附件
import ImageUploader from 'src/components/ImageUploader'
import { appStore, authStore } from 'src/stores'
import service from 'src/services/api'
import emitter from 'src/libs/ev'
import MultipleImageUploader from 'src/components/ImageUploader/MultipleImageUploader'
import { nurseFilesService } from '../../../services/NurseFilesService'
const Option = Select.Option
export interface Props extends ModalComponentProps {
  id?: number
  data?: any
  getTableData?: () => {}
}

export default function EditWorkHistoryModal(props: Props) {
  let { visible, onCancel, onOk, data, id } = props
  const [loading, setLoading] = useState(false)
  const [mapsConfig, setMapsConfig] = useState([] as any[])
  let refForm = React.createRef<Form>()

  const onFieldChange = () => { }

  const uploadCard = async (file: any) => {
    let obj: any = {
      file,
      empNo: appStore.queryObj.empNo,
      type: '0'
    }

    const [err, res] = await to(service.commonApiService.uploadFile(obj))
    if (err) {
      return ''
    }
    if (res.data) {
      let pathImg = `${res.data.path}`
      return pathImg
    }
  }

  const onSave = async () => {
    let obj = {
      id: id,
      auditedStatus: ''
    }
    if ((authStore.user && authStore.user.post) == '护长') {
      obj.auditedStatus = 'waitAuditedNurse'
    } else if ((authStore.user && authStore.user.post) == '护理部') {
      obj.auditedStatus = 'waitAuditedDepartment'
    }

    if (!refForm.current) return
    let [err, value] = await to(refForm.current.validateFields())
    if (err) return

    value.birthday && (value.birthday = value.birthday.format('YYYY-MM-DD'))
    value.goWorkTime && (value.goWorkTime = value.goWorkTime.format('YYYY-MM-DD'))
    value.entryDate && (value.entryDate = value.entryDate.format('YYYY-MM-DD'))

    value.zyzsUrl && (value.zyzsUrl = value.zyzsUrl.join(','))

    nurseFilesService.saveOrUpdate({ ...value, ...obj }).then((res: any) => {
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

      let editParams = {
        birthday: data.birthday ? moment(data.birthday) : null,
        empName: data.empName,
        empNo: data.empNo,
        sex: data.sex,
        job: data.job,
        nation: data.nation,
        age: data.age,
        nativePlace: data.nativePlace,
        highestEducation: data.highestEducation,
        zyzsNumber: data.zyzsNumber,
        cardNumber: data.cardNumber,
        socialGroup: data.socialGroup,
        phone: data.phone,
        address: data.address,
        nearImageUrl: data.nearImageUrl,
        zyzsUrl: data.zyzsUrl ? data.zyzsUrl.split(',') : [],
        newTitle: data.newTitle,
        goWorkTime: data.goWorkTime ? moment(data.goWorkTime) : null,
        shoeSize: data.shoeSize,
        entryDate: data.entryDate ? moment(data.entryDate) : null,
      } as any

      // 处理含有扩展字段的情况
      if (Object.keys(data).includes('maps')) {
        service.commonApiService.listNurseExpand('User')
          .then((res: any) => {

            let newMapsConfig = (res.data || []).map((item: any) => {
              let options: any[] = []
              if (item.fieldSelectContent) {
                try {
                  options = JSON.parse(item.fieldSelectContent)
                } catch (e) { }
              }
              return {
                ...item,
                options
              }
            })

            newMapsConfig.forEach((item: any) => {
              let key = item.fieldCode

              switch (item.fieldType) {
                case "img":
                  editParams[`maps.${key}`] = data.maps[key] ? data.maps[key].split(',') : []
                case "date":
                  editParams[`maps.${key}`] = data.maps[key] ? moment(data.maps[key]) : null
                  break
                default:
                  editParams[`maps.${key}`] = data.maps[key] || ''
              }
            })

            refForm.current?.setFields(editParams)
            setMapsConfig(newMapsConfig)
            setLoading(false)
          })
      } else {
        refForm.current?.setFields(editParams)
        setLoading(false)
      }
    } else {
      setLoading(true)
      setMapsConfig([])
    }
  }, [visible])

  return (
    <Modal
      title='修改基本信息'
      width={1000}
      visible={visible}
      confirmLoading={loading}
      onCancel={onCancel}
      centered
      onOk={onSave}
      okText='保存'
      forceRender
    >
      <Spin spinning={loading}>
        <Form ref={refForm} labelWidth={140} onChange={onFieldChange} rules={{}}>
          <Row>
            <Col span={12}>
              <Form.Field label={`姓名`} name='empName'>
                <Input disabled />
              </Form.Field>
            </Col>
            <Col span={12}>
              <Form.Field label={`工号`} name='empNo'>
                <Input disabled />
              </Form.Field>
            </Col>
            <Col span={12}>
              <Form.Field label={`性别`} name='sex'>
                <Select>
                  <Option value='0'>男</Option>
                  <Option value='1'>女</Option>
                </Select>
              </Form.Field>
            </Col>
            <Col span={12}>
              <Form.Field label={`民族`} name='nation'>
                <Input />
              </Form.Field>
            </Col>
            <Col span={12}>
              <Form.Field label={`出身年月`} name='birthday'>
                <DatePicker />
              </Form.Field>
            </Col>
            <Col span={12}>
              <Form.Field label={`年龄`} name='age'>
                <Input />
              </Form.Field>
            </Col>
            <Col span={12}>
              <Form.Field label={`籍贯`} name='nativePlace'>
                <Input />
              </Form.Field>
            </Col>
            <Col span={12}>
              <Form.Field label={`职务`} name='job'>
                <Input />
              </Form.Field>
            </Col>{' '}
            <Col span={12}>
              <Form.Field label={`参加工作时间`} name='goWorkTime'>
                <DatePicker />
              </Form.Field>
            </Col>
            <Col span={12}>
              <Form.Field label={`最高学历`} name='highestEducation'>
                <Select>
                  <Option value='中专'>中专</Option>
                  <Option value='大专'>大专</Option>
                  <Option value='本科'>本科</Option>
                  <Option value='硕士'>硕士</Option>
                  <Option value='博士'>博士</Option>
                </Select>
              </Form.Field>
            </Col>
            <Col span={12}>
              <Form.Field label={`技术职称`} name='newTitle'>
                <Select>
                  <Option value='护士'>护士</Option>
                  <Option value='护师'>护师</Option>
                  <Option value='主管护师'>主管护师</Option>
                  <Option value='副主任护师'>副主任护师</Option>
                  <Option value='主任护师'>主任护师</Option>
                </Select>
              </Form.Field>
            </Col>
            <Col span={12}>
              <Form.Field label={`护士执业证书编号`} name='zyzsNumber'>
                <Input />
              </Form.Field>
            </Col>
            <Col span={12}>
              <Form.Field label={`身份证号`} name='cardNumber'>
                <Input />
              </Form.Field>
            </Col>
            <Col span={12}>
              <Form.Field label={`社会团体职务`} name='socialGroup'>
                <Input />
              </Form.Field>
            </Col>
            <Col span={12}>
              <Form.Field label={`手机号`} name='phone'>
                <Input />
              </Form.Field>
            </Col>
            <Col span={12}>
              <Form.Field label={`家庭住址`} name='address'>
                <Input />
              </Form.Field>
            </Col>
            <Col span={12}>
              <Form.Field label={`鞋码`} name='shoeSize'>
                <Input />
              </Form.Field>
            </Col>
            <Col span={12}>
              <Form.Field label={`入职时间`} name='entryDate'>
                <DatePicker />
              </Form.Field>
            </Col>
            {mapsConfig.map((item: any, idx: number) => (
              <Col span={12} key={idx}>
                <Form.Field label={item.fieldName} name={`maps.${item.fieldCode}`}>
                  {((fieldType: string) => {
                    switch (fieldType) {
                      case 'date':
                        return <DatePicker />
                      case 'select':
                      case 'select_edit':
                        return <Select
                          showSearch={fieldType === 'select_edit'}
                          onSearch={(val: any) => {
                            if (fieldType === 'select_edit' && refForm.current) {
                              refForm.current.setField(`maps.${item.fieldCode}`, val)
                            }
                          }}>
                          {item.options.map((opt: any, optIdx: number) => <Option key={`opt-${idx}-${optIdx}`} value={opt.code}>{opt.name}</Option>)}
                        </Select>
                      case 'img_1':
                        return <ImageUploader upload={uploadCard} text={`添加${item.fieldName}`} />
                      case 'img_2':
                        return <MultipleImageUploader text={`添加${item.fieldName}`} />
                      default:
                        return <Input />
                    }
                  })(item.fieldType)}
                </Form.Field>
              </Col>
            ))}
          </Row>
          <Row>
            <Col span={12}>
              <Form.Field label={`添加个人头像`} name='nearImageUrl'>
                <ImageUploader upload={uploadCard} text='添加个人头像' tip={'近期免冠照片或近期工作照片'} />
              </Form.Field>
            </Col>
            <Col span={12}>
              <Form.Field label={`添加护士执业证书`} name='zyzsUrl'>
                {/* <ImageUploader upload={uploadCard} text='添加护士执业证书' /> */}
                <MultipleImageUploader text='添加图片' />
              </Form.Field>
            </Col>
          </Row>
        </Form>
      </Spin>
    </Modal>
  )
}
const Wrapper = styled.div``
