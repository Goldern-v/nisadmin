import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Modal, Row, Col, DatePicker } from 'antd'
import moment from 'moment'
import { wardRegisterService } from './../../services/WardRegisterService'
import { fileDownload } from 'src/utils/file/file'

export default function 登记本全科室导出(props: any) {
  const { payload } = props
  const [loading, setLoading] = useState(false)
  const title = `${payload.registerName}导出`

  const openExport = () => {
    let startDate = moment().set('D', 1)
    let endDate = moment()

    Modal.confirm({
      centered: true,
      title,
      content: (<div>
        <Row style={{ marginBottom: '15px' }}>
          <Col span={6} style={{ lineHeight: '30px' }}>开始时间：</Col>
          <Col span={18}>
            <DatePicker
              defaultValue={startDate}
              allowClear={false}
              onChange={(_moment) => startDate = _moment} />
          </Col>
        </Row>
        <Row>
          <Col span={6} style={{ lineHeight: '30px' }}>结束时间：</Col>
          <Col span={18}>
            <DatePicker
              defaultValue={endDate}
              allowClear={false}
              onChange={(_moment) => endDate = _moment} />
          </Col>
        </Row>
      </div>),
      onOk() {
        setLoading(true)
        wardRegisterService.exportAllWard(
          payload.registerCode,
          startDate.format('YYYY-MM-DD'),
          endDate.format('YYYY-MM-DD'),
        ).then(res => {
          setLoading(false)
          fileDownload(res)
        }, () => setLoading(false))

      }
    })
  }

  return <Wrapper>
    <Button loading={loading} onClick={openExport}>{title}</Button>
  </Wrapper>
}

const Wrapper = styled.div`
  position: absolute;
  width: max-content;
  padding: 15px;
  left: calc( 50% + 100px);
  top: calc( 50% + 30px);
  transform: translate(-50%,-50%);
  button{
    height:300px;
    height: 60px;
    line-height: 30px;
    font-size: 16px;
    letter-spacing: 2px;
  }
`