import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Modal, Tag, message as Message } from 'antd'
import LabelSelect from './LabelSelect'
export interface Props {
  visible: boolean,
  labels: any[],
  onOk: any,
  questionIds: any[],
  onCancel: any,
  loading: boolean
}

export default function LabelsAppend(props: Props) {
  const { visible, labels, onOk, onCancel, loading, questionIds } = props;

  const [labelsEdit, setLabelsEdit] = useState([] as any);

  useEffect(() => {
    if (visible) {
      setLabelsEdit(labels);
    } else {
      setLabelsEdit([]);
    }
  }, [visible])

  const handleOk = () => {
    onOk && onOk(labelsEdit);
  }

  const handleCancel = () => {
    onCancel && onCancel();
  }

  const handleSelect = (label: any) => {
    if (!label.labelContent) return

    if (labelsEdit.filter((item: any) => item.labelContent == label.labelContent).length <= 0) {
      setLabelsEdit(labelsEdit.concat([label]))
    } else {
      Message.warning('已存在该标签')
    }
  }

  const LableList = () => {
    return labelsEdit.map((item: any, idx: number) => <Tag
      closable
      key={idx}
      color="red"
      onClose={() => {
        labelsEdit.splice(idx, 1)
        setLabelsEdit(labelsEdit);
      }}>
      {item.labelContent}
    </Tag>
    )
  }

  return <Modal
    visible={visible}
    onOk={handleOk}
    onCancel={handleCancel}
    title="添加标签"
    centered
    confirmLoading={loading}>
    <Wrapper>
      <div className="row">为选中的{questionIds.length}个题目添加标签：</div>
      <div className="row">
        <LabelSelect onSelect={handleSelect} />
      </div>
      <div className="label-list">{LableList()}</div>
    </Wrapper>
  </Modal>
}
const Wrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  .row{
    margin-bottom: 15px;
  }
`