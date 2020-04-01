

import React, { useState, useEffect, useLayoutEffect } from "react"
import styled from "styled-components"
import { ModalComponentProps } from "src/libs/createModal";
import { Spin } from "src/vendors/antd"
import {
  Modal,
} from "antd"
import StudyContent from './../../trainingInfoReview/components/pageContents/StudyContent'
import { trainingInfoReviewService } from './../../trainingInfoReview/api/TrainingInfoReviewService'

export interface Props extends ModalComponentProps {
  title?: string,
  cetpId: string
}

export default function StudyInfoModal(props: Props) {
  const { visible, onCancel, cetpId, title } = props
  const [loading, setLoading] = useState(false)
  const scrollTopRef = React.createRef<HTMLDivElement>()
  const [data, setData] = useState({} as any)

  useLayoutEffect(() => {
    if (visible) {
      if (scrollTopRef.current)
        scrollTopRef.current.scrollIntoView()

      setLoading(true)
      trainingInfoReviewService
        .getBaseInfo(cetpId)
        .then(res => {
          setLoading(false)
          if (res.data) setData(res.data)
        }, err => setLoading(false))
    } else {
      setData({})
    }
  }, [visible])

  return <Modal
    footer={null}
    width={800}
    title={title}
    bodyStyle={{
      // padding: 0,
      background: '#eee'
    }}
    onCancel={onCancel}
    visible={visible}
    centered>
    <Spin spinning={loading}>
      <Wrapper>
        <div ref={scrollTopRef}></div>
        <StudyContent data={data} />
      </Wrapper>
    </Spin>
  </Modal>
}

const Wrapper = styled.div`
background: #fff;
  border: 1px solid #ddd;
  /* width: 760px; */
  padding: 15px 20px;
  margin: 15px auto;
  min-height: 800px;
  padding-top:0;
  margin-top: 0;
  .main-title{
    padding: 15px;
    text-align: center;
    font-size: 28px;
    color: #000;
    line-height: 30px;
  }
  .content-item-title{
    font-size: 14px;
    margin: 10px 0;
    ::before{
      content:'';
      display: inline-block;
      height: 18px;
      width: 5px;
      background: rgba(112, 182, 3, 1);
      vertical-align: sub;
      margin-right: 10px;
    }
  }
`