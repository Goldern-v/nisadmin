import styled from 'styled-components'
import React, { useState, useLayoutEffect } from 'react'
import { Modal, Input, DatePicker, Select, Row, Col, message, Spin,InputNumber } from 'antd'
import { ModalComponentProps } from 'src/libs/createModal'
import Form from 'src/components/Form'
import { to } from 'src/libs/fns'
import { Rules } from 'src/components/Form/interfaces'
import service from 'src/services/api'
import moment from 'moment'
import { authStore,appStore } from 'src/stores'
import { personelSecondServices } from '../service/PersonelSecondServices'
import { globalModal } from 'src/global/globalModal'

const Option = Select.Option
/**青海借调 */
const IS_QHWY = ['qhwy'].includes(appStore.HOSPITAL_ID)
export interface Props extends ModalComponentProps {
  /** 表单提交成功后的回调 */
  onOkCallBack?: () => void,
  recordData?:{}
}

/** 设置规则 */
const rules: Rules = {
  // nurseNum: (val) => !!val || '请填写护士总数',
  // patientNum: (val) => !!val || '请填写患者总数',
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

  let { visible, onCancel, recordData} = props
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
     if(IS_QHWY){
      personelSecondServices.saveOrUpdateByAudit(data).then((res: any) => {
        message.success('保存成功')
        props.onOkCallBack && props.onOkCallBack()
        onCancel()
      })
     } else{
      personelSecondServices.saveOrUpdate(data).then((res: any) => {
        message.success('保存成功')
        props.onOkCallBack && props.onOkCallBack()
        onCancel()
      })
     }
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
      if(recordData){
        /** 编辑 */
        refForm!.current!.setFields({
          id:recordData['id'],
          nurseNum: recordData['nurseNum'],
          patientNum: recordData['patientNum'],
          deptCodeTransferTo: recordData['deptCodeTransferTo'],
          empNoTransferTo: recordData['empNoTransferTo'],
          startDate: moment(recordData['startDate']),
          detailTransferTo: recordData['detailTransferTo'],
        })
      }else{
        /** 表单数据初始化 */
        refForm!.current!.setFields({
          nurseNum: null,
          patientNum: null,
          deptCodeTransferTo: '',
          empNoTransferTo: null,
          startDate: moment(),
          detailTransferTo: ''
        })
      }
    }
  }, [visible])

  return (
    <Modal title={title} visible={visible} onCancel={onCancel} onOk={onSave} okText='保存' forceRender>
      <Spin spinning={modalLoading}>
        <Form ref={refForm} rules={rules} labelWidth={80}>
          <Row>
          {IS_QHWY && (
              <React.Fragment>
                <Col span={24}>
                  <Form.Field label={`护士总数`} name="nurseNum" required>
                    <InputNumber />
                  </Form.Field>
                </Col>
                <Col span={24}>
                  <Form.Field label={`患者总数`} name="patientNum" required>
                    <InputNumber />
                  </Form.Field>
                </Col>
              </React.Fragment>
            )}
            <Col span={24}>
              <Form.Field label={`接收科室`} name='deptCodeTransferTo' required>
                <Select
                  showSearch
                  filterOption={(input: any, option: any) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {deptList.map((item: any, index: number) => (
                    <Option value={item.code} key={index}>
                      {item.name}
                    </Option>
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
                    <Option value={item.empNo} key={item.empNo + index + item.empName + index}>
                      {item.empNo  + '-' + item.empName}
                    </Option>
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
