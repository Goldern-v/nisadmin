import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Modal } from 'antd'
import { trainingInfoReviewService } from './../api/TrainingInfoReviewService'

export interface Props {
  visible: boolean,
  onCancel: Function,
  ceptId: string | number,
}

export default function SignQrCodeModal(props: Props) {
  const { visible, onCancel, ceptId } = props

  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState(false)

  const [req, setReq] = useState(null as any)

  const getQrCodeInfo = () => {
    setLoading(true)
    let reqMethod = trainingInfoReviewService
      .genSignInCode.bind(trainingInfoReviewService)

    setReq(reqMethod)

    reqMethod(ceptId)
      .then((res) => {
        console.log(res)

        setLoading(false)
        setReq(null)
      }, (err) => {
        if (err) setMsg(err.message)

        setLoading(false)
        setReq(null)
      })
  }

  useEffect(() => {
    if (ceptId && visible) {
      getQrCodeInfo()
    } else {
      if (req) req.abort && req.abort()
      setReq(null)
    }
  }, [visible, ceptId])

  return <Modal
    visible={visible}
    onCancel={() => onCancel()}
    centered>
    <Wrapper>

    </Wrapper>
  </Modal>
}
const Wrapper = styled.div``