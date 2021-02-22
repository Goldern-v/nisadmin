import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Carousel, Input, Modal } from 'antd'
import { Place } from 'src/components/common'
import { authStore } from 'src/stores'
import moment from 'src/vendors/moment'
export interface Props {
  visible: boolean
  onOk: Function
  onCancel: Function
  recordList: any[]
}

export default function StudyNoteAuditModal(props: Props) {
  const { visible, onOk, onCancel, recordList } = props

  const onChange = (info: any) => {
    console.log(info)
  }

  const [loading, setLoading] = useState(false)

  return <Modal
    title="审核"
    visible={visible}
    confirmLoading={loading}
    onCancel={() => onCancel()}
    footer={<FooterCon>
      <Button type="primary">批量通过</Button>
      <Button type="danger">批量驳回</Button>
      <Place />
      <Button>确定</Button>
      <Button type="primary" disabled={loading}>取消</Button>
    </FooterCon>}>
    <Wrapper>
      <Carousel afterChange={onChange}>
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
      </Carousel>
      <div className="auditer-info">
        <span>审核人：</span>
        <Input style={{ width: 100 }} readOnly value={authStore.user?.empName} />
        <span>审核时间：</span>
        <Input style={{ width: 120 }} readOnly value={moment().format('YYYY-MM-DD HH:mm')} />
      </div>
    </Wrapper>
  </Modal>
}

const Wrapper = styled.div`
  .ant-carousel .slick-slide {
    text-align: center;
    height: 160px;
    line-height: 160px;
    background: #364d79;
    overflow: hidden;
  }

  .ant-carousel .slick-slide h3 {
    color: #fff;
  }

  .auditer-info{
    line-height:30px;
    font-size: 14px;
    margin-top: 10px;
  }
`

const FooterCon = styled.div`
  display: flex;
`