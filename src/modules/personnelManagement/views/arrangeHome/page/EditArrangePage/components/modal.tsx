import styled from "styled-components";
import React, { useEffect } from "react";
import { Icon, DatePicker, Modal, Form } from "antd";
import { observer } from "mobx-react-lite";
import { FormComponentProps } from 'antd/lib/form/Form'
import { selectViewModal } from '../../../viewModal/SelectViewModal'
import { sheetViewModal } from '../../../viewModal/SheetViewModal'

export interface Props extends FormComponentProps {
  visible: boolean
  handleOk: () => void
  handleCancel: () => void
}

export interface Props {
}

function CopyScheduling(props: Props) {
  let {
    form: { getFieldDecorator, validateFields, resetFields }, handleOk, handleCancel, visible
  } = props
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  const config = {
    rules: [{ type: 'object', required: true, message: '请选择日期' }],
  };
  const onSave = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      const values = {
        ...fieldsValue,
        'date-picker': fieldsValue['date-picker'].format('YYYY-MM-DD'),
      };
      handleOk()
      selectViewModal.params.copyTime = values['date-picker']
      sheetViewModal.handleCopy(false);
      resetFields();
    });
  }
  useEffect(() => {
    if (visible) {
      resetFields()
    }
  }, [visible])

  return (
    <Wrapper>
      <Modal
        title="复制排班"
        visible={visible}
        onOk={onSave}
        onCancel={handleCancel}
      >
        <Form {...formItemLayout}>
          <Form.Item label="复制排班日期" >
            {getFieldDecorator('date-picker', config)(<DatePicker />)}
          </Form.Item>
        </Form>
        <div style={{ marginLeft: '160px', color: 'rgba(0, 0, 0, 0.45)' }}>
          <Icon style={{ color: 'rgba(0, 0, 0, 0.30)' }} type="exclamation-circle" />
          <span> 复制选择日期本周的排班数据</span>
        </div>
      </Modal>
    </Wrapper>
  );
}

const Wrapper = styled.div`
`;
export default Form.create()(observer(CopyScheduling)) as any
