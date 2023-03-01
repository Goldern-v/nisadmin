import { Col, Input, Modal, Radio, Row } from 'antd'
import { observer } from 'mobx-react'
import React, { useLayoutEffect, useState } from 'react'
import { globalModal } from 'src/global/globalModal'
import { ModalComponentProps } from 'src/libs/createModal'
import { Obj } from 'src/libs/types'
import styled from 'styled-components'

export interface Props {
  onOkCb: Function
  selectedList: any
  visible: boolean
  onCancel: () => void
}
export default observer(function (props: Props) {
  const { visible, onCancel, onOkCb, selectedList } = props

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
    <Modal
      title="批量审核"
      visible={visible}
      width={800}
      onOk={() => {
        onCancel()
        globalModal.signModal.show({
          onCallBack: (empNo: string, password: string) => {
            onOkCb(params)
          }
        })
      }}
      onCancel={onCancel}
    >
      <Wrapper>
        <Row>
          <Col span={4}>审核内容:</Col>
          <Col span={20} className="ctx-box">
            {selectedList.map((v: Obj) => (
              <div key={v.id} className='ctx-item'>{v.title}</div>
            ))}
          </Col>
        </Row>
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
      </Wrapper>
    </Modal>
  )
})

const Wrapper = styled.div`
  line-height: 28px;
  font-size: 16px;
  .ctx-box {
    display: flex;
    flex-wrap: wrap;
  }
  .ctx-item {
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 10px;
    padding: 5px;
    background-color: #eeeeee;
    & +.ctx-item {
      margin-left: 10px;
    } 
  }
`