import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Modal, Checkbox, message as Message } from 'antd'

const CheckboxGroup = Checkbox.Group

export interface Props {
  visible: boolean,
  labels: any[],
  onOk: any,
  questionIds: any[],
  onCancel: any,
  loading: boolean
}

export default function LabelsDelete(props: Props) {
  const { visible, labels, onOk, onCancel, loading, questionIds } = props;

  const [labelTotal, setLabelTotal] = useState([] as any);
  const [labelSelected, setLabelSelected] = useState([] as any);

  useEffect(() => {
    if (visible) {
      setLabelTotal(labels);
      setLabelSelected([])
    } else {
      setLabelTotal([]);
    }
  }, [visible])

  const handleChange = (list: any) => {
    setLabelSelected(list)
  }

  const handleOk = () => {
    onOk && onOk(labelSelected);
  }

  const handleCancel = () => {
    onCancel && onCancel();
  }

  return <Modal
    visible={visible}
    onOk={handleOk}
    onCancel={handleCancel}
    title="删除标签"
    centered
    confirmLoading={loading}>
    <Wrapper>
      <div className="row title">在选中的{questionIds.length}个题目中，将删除以下标签：</div>
      <div className="row list">
        <CheckboxGroup value={labelSelected} onChange={handleChange}>
          {labelTotal.map((item: any) => <div className="list-item" key={item.id}>
            <Checkbox value={item.id}>{item.labelContent}</Checkbox>
          </div>)}
        </CheckboxGroup>
      </div>
    </Wrapper>
  </Modal>
}
const Wrapper = styled.div`
  wdith: 80%;
  margin-align: 0 auto;
  .title{
    margin-bottom: 15px;
  }
  .list{
    .ant-checkbox-group{
      width: 100%;
    }
    .list-item{
      width: 50%;
      margin-bottom: 10px;
      float: left;
    }
  }
`