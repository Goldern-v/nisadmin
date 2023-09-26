import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Modal, Input, Button, Select } from 'antd'
import { ModalComponentProps } from 'src/libs/createModal'

const Option = Select.Option
export interface Props extends ModalComponentProps {
}

export default function EditLeaveModal(props: Props) {
  const [formList, setFormList] = useState<any>([]);
  let { visible, onCancel, onOk } = props


  const onSave = async (sign: boolean) => {
    
  }

  useLayoutEffect(() => {
    if (visible) {
      console.log('useLayoutEffect')
    }
  }, [visible]);

  return (
    <Modal
      title="添加"
      visible={visible}
      onCancel={onCancel}
      forceRender
      centered
      footer={[
        <Button key='back' onClick={onCancel}>
          取消
        </Button>,
        <Button key='save' type='primary' onClick={() => onSave(false)}>
          确定
        </Button>,
      ]}
    >

      <Select>
        {formList.map((item: any) => (
          <Select.Option value={item.code} key={item.code}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
    </Modal>
  )
}
const Wrapper = styled.div``
