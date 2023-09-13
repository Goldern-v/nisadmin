import { Modal, Radio } from 'antd'
import { observer } from 'mobx-react'
import React, { useLayoutEffect, useState } from 'react'
import { globalModal } from 'src/global/globalModal'
import { ModalComponentProps } from 'src/libs/createModal'
import styled from 'styled-components'

export interface Props extends ModalComponentProps {
  onOkCb: Function
}
export default observer(function (props: Props) {
  const { visible, onCancel, onOkCb } = props

  const [status, setStatus] = useState('')
  useLayoutEffect(() => {
    if (visible) {
      setStatus('')
    }
  }, [visible])
  return (
    <Wrapper>
      <Modal
        title="审核"
        visible={visible}
        width={500}
        onOk={() => {
          onCancel()
          globalModal.signModal.show({
            onCallBack: (empNo: string, password: string) => {
              onOkCb(status)
            }
          })
        }}
        onCancel={onCancel}
      >
        <div style={{ lineHeight: '28px', fontSize: '16px' }}>
          <Radio.Group
            value={status}
            onChange={(e) => setStatus(e.target.value)}>
            <Radio value={'-1'}>同意撤回</Radio>
            <Radio value={'2'}>驳回撤回</Radio>
          </Radio.Group>
        </div>
      </Modal>
    </Wrapper>
  )
})

const Wrapper = styled.div`

`