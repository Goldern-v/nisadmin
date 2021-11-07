import React, { useLayoutEffect } from "react"
import { observer } from "mobx-react"
import {
  Modal,
  Button,
  Row,
  Col,
  Input,
  Select,
  DatePicker
} from "antd"
import Form from "src/components/Form"
import createModal, { ModalComponentProps } from "src/libs/createModal";
import { evalTypeGroup } from "../utils/evalType"
import styled from "styled-components"
import moment from 'src/vendors/moment'
import SelectPeopleModal from './SelectPeopleModal'

const RangePicker = DatePicker.RangePicker

export interface Props extends ModalComponentProps {
  id?: any;
  // 教学质量管理的tab
  evalType: '1' | '2' | '3';
  /** 表单提交成功后的回调 */
  onOkCallBack?: () => any
}

export default observer(function AddEvaluationModal(props: Props) {

  let { visible, onCancel, onOkCallBack, evalType } = props;
  const formData = {
    title: '',
    evalType: '',
    beginTime: '',
    endTime: '',
    people: []
  }
  let refForm = React.createRef<Form>()
  const selectPeopleModal = createModal(SelectPeopleModal)

  const onSave = () => {
    console.log('test-', formData);
  }
  // 表单数据修改时触发
  const onFormChange = (name: string, value: any, from: Form) => {
    let data = from.getFields()
    console.log('test-name', name, value, data)
    if (name === 'date') {
      let date = value.length === 2 ? value.map((v: any) => v.format('YYYY-MM-DD')) : ['', '']
      data = { ...data, date, beginTime: date[0], endTime: date[1] }
    }
    Object.assign(formData, data)
  }
  // 打开添加人员弹窗
  const setAddPeople = () => {
    console.log('test-1', 1);
    selectPeopleModal.show({
      evalType,
      people: formData.people
    })
  }
  // 初始化数据
  useLayoutEffect(() => {
    if (refForm.current && visible) refForm!.current!.clean();
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
      onCancel={onCancel}
      centered
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
          labelWidth={90}
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
    .formField-container {
      display: flex;
      min-height: 32px;
      justify-content: flex-end;
      align-items: center;
    }
  }
`