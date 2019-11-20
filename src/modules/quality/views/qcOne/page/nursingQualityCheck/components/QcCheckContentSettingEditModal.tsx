import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Select, Input, Row, Col, Modal, message as Message } from 'antd'
import Form from 'src/components/Form/Form'
import { Rules } from 'src/components/Form/interfaces'
import { qcCheckContentSettingService } from './../api/QcCheckContentSettingService'

// const api = new DeptFielShareService()

export interface Props {
  visible: boolean,
  params: any,
  onCancel: any,
  onOk: any,
  deptCode: any
}

export default function QcCheckContentSettingEditModal(props: Props) {
  const { visible, params, onCancel, onOk, deptCode } = props;
  const [editLoading, setEditLoading] = useState(false);
  const formRef = React.createRef<Form>();

  const rules: Rules = {
    itemName: (val) => !!val || '质控内容不能为空',
    indexNo: (val) => {
      let num = parseInt(val, 10)
      if (val.trim() === '') return '排序号不能为空'
      if (isNaN(num) || num.toString().length !== val.length) return '排序号必须为整数'
      return true
    },
  }

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        let current = formRef.current;

        if (!current) return

        if (params.itemCode) {
          const { itemName, indexNo } = params;
          current.setFields({
            itemName,
            indexNo: indexNo.toString(),
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
          let newParams = {
            ...params,
            itemName: current.getFields().itemName,
            indexNo: parseInt(current.getFields().indexNo),
            oldItemCode: params.itemCode,
            wardCode: deptCode
          }

          setEditLoading(true);
          qcCheckContentSettingService.saveOrUpdate(newParams).then(res => {
            setEditLoading(false);
            let msg = '质控内容创建成功';
            if (params.itemCode) msg = '质控内容修改成功'

            Message.success(msg)
            onOk();
          }, err => {
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
    title={params.itemCode ? '修改质控内容' : '新建质控内容'}>
    <Wrapper>
      <Form ref={formRef} rules={rules}>
        <Row>
          <Col span={4} className="label">质控内容:</Col>
          <Col span={20}>
            <Form.Field name="itemName">
              <Input placeholder="质控内容" />
            </Form.Field>
          </Col>
        </Row>
        <Row>
          <Col span={4} className="label">排序号:</Col>
          <Col span={20}>
            <Form.Field name="indexNo">
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