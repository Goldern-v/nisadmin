import React, { useLayoutEffect, useState } from "react"
import { observer } from "mobx-react"
import {
  Modal,
  Button,
  Row,
  Col,
  Input,
  DatePicker,
  Select,
  message
} from "antd"
import Form from "src/components/Form"
import createModal, { ModalComponentProps } from "src/libs/createModal";
import { evalTypeGroup } from "../utils/evalType"
import styled from "styled-components"
// import SelectPeopleModal from "./SelectPeopleModal"
import SelectPeopleModal from "src/modules/notice/page/modal-hj/SelectPeopleModal"
import { teachingQualityEvalService } from "../services/TeachingQualityEvalService"

const RangePicker = DatePicker.RangePicker
const Option = Select.Option;

interface User {
  label?: string;
  key: string;
}

export interface Props extends ModalComponentProps {
  id?: any;
  // 教学质量管理的tab
  evalType: '1' | '2' | '3';
  /** 表单提交成功后的回调 */
  onOkCallBack?: () => void
}

export default observer(function AddEvaluationModal(props: Props) {

  let { visible, onCancel, onOkCallBack, evalType } = props;
  const defaultFormData = () => ({
    title: '',
    evalType: '' as Props['evalType'],
    beginTime: '',
    endTime: '',
    evalPersonList: [] as any[]
  })

  const [formData, setFormData] = useState(defaultFormData)
  let refForm = React.createRef<Form>()
  const selectPeopleModal = createModal(SelectPeopleModal)
  const [loading, setLoading] = useState(false)

  const onSave = () => {
    let errMsgList = [] as string[]
    if (!formData.title) {
      errMsgList.push('标题不能为空')
    }
    if (!formData.beginTime || !formData.endTime) {
      errMsgList.push('评价时间不能为空')
    }
    if (formData.evalPersonList.length === 0) {
      errMsgList.push('评教学员不能为空')
    }
    if (errMsgList.length > 0) {
      errMsgList.length > 1 ? Modal.error({
        title: '提示',
        content: (
          <div>
            {errMsgList.map((errMsg: string, idx: number) => <div key={idx}>{errMsg}</div>)}
          </div>
        )
      }) : message.error(errMsgList[0])

      return
    }

    setLoading(true)

    let data = {
      ...formData,
      evalPersonList: formData.evalPersonList.map((v: any) => ({
        empNo: v.empNo,
        empName: v.empName
      }))
    }
    teachingQualityEvalService.saveOrUpdateEvalPlan(data)
      .then(res => {
        setLoading(false)

        message.success('保存成功')
        onOkCallBack && onOkCallBack()

      }, () => setLoading(false))
    
  }
  const onCancelModal = () => {
    setFormData(defaultFormData())
    onCancel && onCancel()
  }
  // 表单数据修改时触发
  const onFormChange = (name: string, value: any, from: Form) => {
    let data = from.getFields()
    if (name === 'date') {
      let date = value.length === 2
        ? value.map((v: any) => v.format('YYYY-MM-DD HH:mm'))
        : ['', '']
      data = { ...data, beginTime: date[0], endTime: date[1] }
    }
    Object.assign(formData, data)
    setFormData(formData)
  }

  const formatSelectPeople = (payload: any) => {
    let newPersonList = [] as any[]

    payload.map((v: any, i:number) => {
      if (v.userList && v.userList.length > 0) {
        for (let j = 0; j < v.userList.length; j++) {
          let userItem = v.userList[j]

          newPersonList.push({
            empName: userItem.empName,
            empNo: userItem.empNo,
            label: userItem.empName,
            key: userItem.empNo
          })
        }
      } else {
        newPersonList.push({
          empName: v.label,
          empNo: v.key,
          label: v.label,
          key: v.key
        })
      }
    })

    return newPersonList
  }
  
  // 打开添加人员弹窗
  const setAddPeople = () => {
    selectPeopleModal.show({
      evalType: formData.evalType,
      checkedUserList: formData.evalPersonList,
      onOkCallBack: (payload: any) => {
        let evalPersonList = formatSelectPeople(payload)
        let data = { ...formData, evalPersonList }
        setFormData(data)
      },
      title: '选择评教学员',
      showReset: true
    })
  }

  const deleteUser = (user: User) => {
    let evalPersonList = formData.evalPersonList
      .filter((item: any) => item.key !== user.key)
      let data = { ...formData, evalPersonList }
      setFormData(data)
      
  };

  const onDeselect = (key: any) => {
    deleteUser(key);
  }

  // 初始化数据
  useLayoutEffect(() => {
    if (refForm.current && visible) refForm!.current!.clean();
    setFormData(defaultFormData())
    /** 如果是修改 */
    refForm.current &&
      refForm!.current!.setFields({
        evalType: evalType + ''
      });
  }, [visible])

  return (
    <Modal
      width={600}
      title="新建带教评价任务"
      visible={visible}
      onCancel={onCancelModal}
      centered
      confirmLoading={loading}
      okText="保存"
      forceRender
      footer={
        <div style={{ textAlign: "right" }}>
          <Button onClick={onCancel}>取消</Button>
          <Button
            type="primary"
            onClick={() => onSave()}>
            保存
          </Button>
        </div>
      }>
      <Wrapper>
        <Form
          ref={refForm}
          labelWidth={70}
          onChange={onFormChange}>
          <Row>
            <Col span={20}>
              <Form.Field label="名称" name="title">
                <Input />
              </Form.Field>
            </Col>
            <Col span={20}>
              <Form.Field label="评分类型" name="evalType">
                <Select>
                  {
                    Object.keys(evalTypeGroup).map(
                      v => <Select.Option value={v} key={v}>{evalTypeGroup[v].name}</Select.Option>
                    )
                  }
                </Select>
              </Form.Field>
            </Col>
            <Col span={20}>
              <Form.Field label="评价时间" name="date">
                <RangePicker />
              </Form.Field>
            </Col>
            <Col span={24} className="form__student">
              <Form.Field label="评教学员">
                <Button size="small" onClick={() => setAddPeople()}>...</Button>
              </Form.Field>
            </Col>
            <Col span={24}>
              {/* <Form.Field labelWidth={45} name="evalPersonList"> */}
                <SelectCon>
                  <Select
                    mode='tags'
                    placeholder='...'
                    labelInValue={true}
                    value={formData.evalPersonList}
                    open={false}
                    onDeselect={onDeselect}
                  />
                </SelectCon>
              {/* </Form.Field> */}
            </Col>
          </Row>
          <selectPeopleModal.Component />
        </Form>
      </Wrapper>
    </Modal >
  )
})

const Wrapper = styled.div`
  .form__student {
    justify-content: space-between;
    .bsYmaX {
      margin-bottom: 10px;
    }
    .formField-container {
      display: flex;
      min-height: 32px;
      justify-content: flex-end;
      align-items: center;
    }
  }
`

const SelectCon = styled.div`
  height: 100px;
  .ant-select {
    height: 100%;
    margin-left: 45px;
    width: calc(100% - 45px) !important;
    .ant-select-selection {
      height: 100%;
      box-sizing: border-box;
      overflow-y: auto;
    }
  }
`