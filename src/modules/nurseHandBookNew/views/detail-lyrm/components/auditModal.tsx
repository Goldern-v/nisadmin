import { Col, Input, Modal, Radio, Row } from 'antd'
import { observer } from 'mobx-react'
import React, { useLayoutEffect, useState } from 'react'
import { globalModal } from 'src/global/globalModal'
import { ModalComponentProps } from 'src/libs/createModal'
import { Obj } from 'src/libs/types'
import styled from 'styled-components'

export interface Props extends ModalComponentProps{
  onOkCb: Function
}
export default observer(function (props: Props) {
  const { visible, onCancel, onOkCb } = props

  const [params, setParams] = useState<Obj>({
    isPass: true,
    handleContent: ''
  })
  useLayoutEffect(() => {
    if (visible) {
      setTimeout(() => {
        
      }, 300)
    }
  }, [visible])
  return (
    <Wrapper>
      <Modal
        title="审核"
        visible={visible}
        width={500}
        onOk={() => {
          // setVisible(false)
          onCancel()
          globalModal.signModal.show({
            onCallBack: (empNo: string, password: string) => {
              onOkCb(params)
            }
          })
        }}
        onCancel={onCancel}
      >
        <div style={{ lineHeight: '28px', fontSize: '16px' }}>
          <Row style={{ marginBottom: '10px' }}>
            <Col span={4}>审核结果:</Col>
            <Col span={20}>
              <Radio.Group
                value={params.isPass}
                onChange={(e) => setParams({ ...params, 'isPass': e.target.value })}>
                <Radio value={true}>通过</Radio>
                <Radio value={false}>不通过</Radio>
              </Radio.Group>
            </Col>
          </Row>
          <Row style={{ marginBottom: '10px' }}>
            <Col span={4}>意见或原因:</Col>
            <Col span={20}>
              <Input.TextArea
                value={params.handleContent}
                rows={4}
                onChange={(e) =>
                  setParams({ ...params, 'handleContent': e.target.value })
                } />
            </Col>
          </Row>
        </div>
      </Modal>
    </Wrapper>
  )
})

const Wrapper = styled.div`

`