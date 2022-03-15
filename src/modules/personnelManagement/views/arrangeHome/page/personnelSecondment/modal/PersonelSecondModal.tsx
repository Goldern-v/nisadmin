import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Modal, Input, Button, Radio, DatePicker, Select, Row, Col, message, Spin } from 'antd'
import { ModalComponentProps } from 'src/libs/createModal'
import Form from 'src/components/Form'
import { to } from 'src/libs/fns'
import { Rules } from 'src/components/Form/interfaces'
import { Checkbox } from 'src/vendors/antd'
import service from 'src/services/api'
import moment from 'moment'
import { authStore } from 'src/stores'
import { personelSecondServices } from '../service/PersonelSecondServices'
import { globalModal } from 'src/global/globalModal'

const Option = Select.Option
export interface Props extends ModalComponentProps {
  /** 表单提交成功后的回调 */
  onOkCallBack?: () => void
}

/** 设置规则 */
const rules: Rules = {
  deptCodeTransferTo: (val) => !!val || '请选择接收科室',
  empNoTransferTo: (val) => !!val || '请选择借出护士',
  startDate: (val) => !!val || '请选择借出时间'
  // detailTransferTo: (val) => !!val || '请输入借出说明'
}

export default function PersonelSecondModal(props: Props) {
  const [title, setTitle] = useState('人员借出')
  const [deptList, setDeptList] = useState([])
  const [nurseList, setNurseList] = useState([])
  const [modalLoading, setModalLoading] = useState(false)

  let { visible, onCancel } = props
  let refForm = React.createRef<Form>()

  const onSave = async () => {
    if (!refForm.current) return
    let [err, value] = await to(refForm.current.validateFields())
    if (err) return
    let data: any = { ...value }
    data.empNo = authStore!.user!.empNo
    data.deptCode = authStore.selectedDeptCode || authStore.defaultDeptCode
    data.deptName = authStore.selectedDeptCode ? authStore.selectedDeptName : authStore.defaultDeptName
    data.empNameTransferTo = (nurseList.find((item: any) => item.empNo == data.empNoTransferTo) as any)!.empName
    data.deptNameTransferTo = (deptList.find((item: any) => item.code == data.deptCodeTransferTo) as any)!.name
    data.startDate = moment(data.startDate).format('YYYY-MM-DD')
    /** 保存接口 */
    globalModal.confirm('确定要保存吗？', '保存后，该护士会在指定日期自动借出。').then((res) => {
      personelSecondServices.saveOrUpdate(data).then((res: any) => {
        message.success('保存成功')
        props.onOkCallBack && props.onOkCallBack()
        onCancel()
      })
    })
  }

  useLayoutEffect(() => {
    if (refForm.current && visible) refForm!.current!.clean()
    /** 如果是修改 */
    if (refForm.current && visible) {
      setModalLoading(true)
      Promise.all([
        service.commonApiService.getNursingUnitAll(),
        personelSecondServices.getNursingByDeptCode(authStore.selectedDeptCode)
      ]).then((res) => {
        setModalLoading(false)
        setDeptList(res[0].data.deptList.filter((item: any) => item.code !== authStore.selectedDeptCode))
        setNurseList(res[1].data.filter((item: any) => item.empNo))
      })
      /** 表单数据初始化 */
      refForm!.current!.setFields({
        deptCodeTransferTo: '',
        empNoTransferTo: null,
        startDate: moment(),
        detailTransferTo: ''
      })
    }
  }, [visible])

  return (
    <Modal title={title} visible={visible} onCancel={onCancel} onOk={onSave} okText='保存' forceRender>
      <Spin spinning={modalLoading}>
        <Form ref={refForm} rules={rules} labelWidth={80}>
          <Row>
            <Col span={24}>
              <Form.Field label={`接收科室`} name='deptCodeTransferTo' required>
                <Select
                  showSearch
                  filterOption={(input: any, option: any) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {deptList.map((item: any, index: number) => (
                    <Select.Option value={item.code} key={index}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Field>
            </Col>

            <Col span={24}>
              <Form.Field label={`借出护士`} name='empNoTransferTo' required>
                <Select
                  showSearch
                  filterOption={(input: any, option: any) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {nurseList.map((item: any, index: number) => (
                    <Select.Option value={item.empNo} key={item.empNo + index + item.empName + index}>
                      {item.empName}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`借出日期`} name='startDate' required>
                <DatePicker />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`借出说明`} name='detailTransferTo'>
                <Input.TextArea />
              </Form.Field>
            </Col>
          </Row>
        </Form>
      </Spin>
    </Modal>
  )
}
const Wrapper = styled.div``
