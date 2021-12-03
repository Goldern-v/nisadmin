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
      // 复制排班 后端的计算逻辑是传入日期往后推一周 所以前端要在算中的日期往前推一周
      selectViewModal.params.copyStartTime = fun_date(new Date(values['date-picker']), 7)
      selectViewModal.params.copyEndTime = fun_date(new Date(values['date-picker']), 13)
      sheetViewModal.handleCopy(false);
      resetFields();
    });
  }

  // 传入日期和天数 计算出传入天数后的日期  
  const fun_date = (date: Date, num: number) => {
    var date2 = new Date(date);
    date2.setDate(date.getDate() + num);
    //num是正数表示之后的时间，num负数表示之前的时间，0表示今天
    var time2 = date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate();
    return time2;
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
        <div style={{ marginLeft: '160px', color: '#ccc' }}>
          <Icon style={{ color: '#c9c9c9' }} type="exclamation-circle" />
          <span> 从选择日期起复制这一周的排班</span>
        </div>
      </Modal>
    </Wrapper>
  );
}

const Wrapper = styled.div`
`;
export default Form.create()(observer(CopyScheduling)) as any
