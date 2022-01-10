import styled from "styled-components";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { RouteComponentProps } from "react-router";
import {
  Modal,
  Input,
  Button,
  Radio,
  DatePicker,
  Select,
  Row,
  Col,
  message,
  Icon,
  Tag
} from "antd";
import { ModalComponentProps } from "src/libs/createModal";
import Form from "src/components/Form";
import { observer } from "mobx-react-lite";

import { to } from "src/libs/fns";
import { Rules } from "src/components/Form/interfaces";
import { appStore, authStore } from "src/stores";
import service from "src/services/api";
import { Spin } from "src/vendors/antd";

const Option = Select.Option;
export interface Props extends ModalComponentProps {
  editData?: any;
  onOkCallBack?: () => any;
}
const rules: Rules = {
  tutor: (val) => !!val || "请选择导师",
};
export default observer(function AddTutorModal(props: Props) {
  let { visible, onCancel, editData } = props;
  const [title, setTitle]: any = useState("导师设置");
  const [modalLoading, setModalLoading]: any = useState(false);
  const [tutorList, setTutorList]: any = useState([]);
  const [selTutorList, setSelTutorList]: any = useState([]);

  let refForm = React.createRef<Form>();

  const onFieldChange = (name: string, value: any, form: Form<any>) => { };

  const onSave = async () => {
    if (!refForm.current) return;
    let [err, value] = await to(refForm.current.validateFields());
    if (err) return;
    value.id = editData.id
    service.scheduleUserApiService.setTotur(value).then(res => {
      if (res.code == 200) {
        props.onOkCallBack && props.onOkCallBack();
        onCancel();
      }
    })


  };

  useLayoutEffect(() => {
    if (refForm.current && visible) refForm!.current!.clean();
    if (refForm.current && visible) {
      setModalLoading(true);
      let from = refForm.current;
      service.scheduleUserApiService.getTotur(editData.deptCode).then(res => {
        if (res.code == 200) {
          if (editData.tutor) {
            let tutorData = res.data.find((item: any) => item.code == editData.tutor)
            from!.setFields({ tutor: editData.tutor })
            setSelTutorList([tutorData])
          } else {
            from!.setFields({ tutor: '' })
            setSelTutorList([])
          }
          setTutorList(res.data)

          setModalLoading(false);
        }
      })
    }
  }, [visible]);
  const handleClose = (removedTag: string) => {
    let from = refForm.current;
    from!.setFields({ tutor: '' })
    setSelTutorList([])
  };
  const handleChange = (value: string) => {
    let from = refForm.current;
    from!.setFields({ tutor: value })
    let activeVal = tutorList.find((item: any) => item.code == value);
    setSelTutorList([activeVal])
  }
  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={onCancel}
      onOk={onSave}
      okText="保存"
      forceRender
      destroyOnClose
      width={480}
    >
      <Wrapper>
        <Spin spinning={modalLoading}>
          <Form
            ref={refForm}
            labelWidth={80}
            onChange={onFieldChange}
            rules={rules}
          >
            <Col span={24}>
              <Form.Field label={`选择导师`} name="dept">
                <div>
                  <Select onChange={handleChange} onSelect={handleChange} showSearch optionFilterProp="children" filterOption={(input, option: any) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  >
                    {tutorList.map((item: any) => {
                      return <Select.Option value={item.code} key={item.code}>{item.name}</Select.Option>
                    })}
                  </Select>
                </div>
              </Form.Field>
            </Col>
            <Col span={24} className='tutor'>
              <Form.Field label={`已选导师`} name="tutor" required>
                <Input style={{ opacity: 0, width: '0px' }} />
              </Form.Field>
              <div className="tag">
                {selTutorList.length ? selTutorList.map((item: any, index: any) => {
                  return <Tag
                    key={index}
                    closable
                    onClose={() => { handleClose(item) }}>
                    {item.name}
                  </Tag>
                }) : <span style={{ fontSize: '16px' }}>无</span>}
              </div>
            </Col>
          </Form>
          <Aside>
            <Icon
              type="info-circle"
              className="icon"
            />
            设置导师后，导师的排班会显示当前带教的实习生/进修生信息
          </Aside>
        </Spin>
      </Wrapper>
    </Modal>
  );
});
const Aside = styled.div`
  font-size: 12px;
  color: #666;
  .icon {
    color: #c4c2c2;
    margin-right: 5px;
    font-size: 18px;
    vertical-align: middle;
  }
`;
const Wrapper = styled.div`
  .tutor {
    position: relative;
    .bsYmaX {
      align-items: center;
    }
    .tag {
      position: absolute;
      top: 6px;
      left: 100px;
    }
  }
`
