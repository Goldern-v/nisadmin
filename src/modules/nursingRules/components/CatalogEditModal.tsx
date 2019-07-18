import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Select, Input, Row, Col, Modal, message as Message } from 'antd'
import Form from 'src/components/Form/Form'
import { Rules } from 'src/components/Form/interfaces'
import NursingRulesApiService from './../api/NursingRulesApiService'

const api = new NursingRulesApiService()

export interface Props {
  visible: boolean,
  params: any,
  onCancel: any,
  onOk: any
}

export default function CatalogEditModal(props: Props) {
  const { visible, params, onCancel, onOk } = props;
  const [editLoading, setEditLoading] = useState(false);
  const formRef = React.createRef<Form>();

  const rules: Rules = {
    name: (val) => !!val || '目录名不能为空',
    orderNo: (val) => !!val || '排序号不能为空',
  }

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        let current = formRef.current;

        if (!current) return

        if (params.id) {
          const { name, orderNo } = params;
          current.setFields({
            name,
            orderNo,
          });
        } else {
          current.clear();
        }
      }, 100)
    }
  }, [visible]);

  const checkForm = () => {
    let current = formRef.current;
    if (current) {
      current.validateFields().then(res => {
        current = formRef.current;
        if (current) {
          let newParams = { ...params, ...current.getFields() };

          setEditLoading(true);
          api.saveOrUpdateCatalog(newParams).then(res => {
            let msg = '目录创建成功';
            if (params.id) msg = '目录修改成功'

            Message.success(msg)
            onOk();
          })
            .finally(() => {
              setEditLoading(false);
            })
        }
      })
        .catch(e => {
          console.log(e)
        })
    }
  }

  const handleCancel = () => {
    if (editLoading) return;
    onCancel && onCancel();
  }

  return <Modal
    visible={visible}
    onCancel={handleCancel}
    onOk={checkForm}
    confirmLoading={editLoading}
    title={params.id ? '修改目录' : '新建目录'}>
    <Wrapper>
      <Form ref={formRef} rules={rules}>
        <Row>
          <Col span={4} className="label">目录名:</Col>
          <Col span={20}>
            <Form.Field name="name">
              <Input placeholder="目录名" />
            </Form.Field>
          </Col>
        </Row>
        <Row>
          <Col span={4} className="label">排序号:</Col>
          <Col span={20}>
            <Form.Field name="orderNo">
              <Input placeholder="排序号" />
            </Form.Field>
          </Col>
        </Row>
      </Form>
    </Wrapper>
  </Modal>
}
const Wrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  .label{
    line-height: 32px;
  }
`