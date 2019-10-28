import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { Input, Radio, ColumnProps, AutoComplete, Icon, message, Row, Col, DatePicker } from 'src/vendors/antd'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { cloneJson } from 'src/utils/json/clone'
import { LastImproveItem, DetailItem } from '../../types'
import { globalModal } from 'src/global/globalModal'
import Form from 'src/components/Form'
import { useLayoutEffect } from 'src/types/react'
export interface Props {
  sectionId: string
  data: any
  index: any
  setData: any
}

export default function 护士会议记录弹窗(props: Props) {
  let { sectionId, setData, data, index } = props
  let refForm = React.createRef<Form>()
  let cloneData: any = cloneJson(data || { list: [] })
  let list: DetailItem[] = cloneData.list
  let obj = list[index]

  const onFieldChange = (name: any, value: any, form: Form<any>) => {
    Object.assign(obj, form.getFields())
    setData(cloneData)
  }

  useLayoutEffect(() => {
    if (refForm!.current) {
      refForm!.current.setFields(obj)
    }
  }, [index])
  return (
    <Wrapper>
      <Form ref={refForm} labelWidth={80} onChange={onFieldChange}>
        <Col span={24}>
          <Form.Field label={`会议类型`} name='meetingType'>
            <Radio.Group>
              <Radio value={'QCWMT001'}>周会</Radio>
              <Radio value={'QCWMT002'}>月会</Radio>
            </Radio.Group>
          </Form.Field>
        </Col>
        <Row>
          <Col span={24}>
            <Form.Field label={`会议时间`} name='meetingDate'>
              <Input />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`会议地点`} name='meetingLocation'>
              <Input />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`会议主持`} name='compereEmpNames'>
              <Input />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`记录人`} name='recorderEmpNames'>
              <Input />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`到会人`} name='attendeeEmpNames'>
              <Input />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`查看人员`} name='viewedEmpNames'>
              <Input />
            </Form.Field>
          </Col>

          <Col span={24}>
            <Form.Field label={`会议签名`} name='signedEmpNames'>
              <Input.TextArea rows={4} placeholder='(每人浏览内容后签名)' />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`一、传到会议`} name='meetingConveyed'>
              <Input.TextArea rows={4} placeholder='(每人浏览内容后签名)' />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`二、工作中问题及整改`} name='problemRectification'>
              <Input.TextArea rows={4} placeholder='(每人浏览内容后签名)' />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`三、护士发言`} name='nurseStatement'>
              <Input.TextArea rows={4} placeholder='(每人浏览内容后签名)' />
            </Form.Field>
          </Col>
        </Row>
      </Form>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  position: relative;
  text {
    min-height: 200px !important;
    resize: none;
  }
  .button-con {
    position: absolute;
    top: -13px;
    right: 0;
  }

  .text-box {
    background: #fafafa;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 2px;
    border: 1px solid #ddd;
    position: relative;
    .delete-btn {
      position: absolute;
      top: 10px;
      right: 10px;
      cursor: pointer;
    }
    .label {
      input {
        &:focus {
          background: ${(p) => p.theme.$mlc};
        }
        margin: 0 10px;
      }
    }
    textarea {
      margin-top: 10px;
      resize: none;
      min-height: 80px;
      &:focus {
        background: ${(p) => p.theme.$mlc};
      }
    }
    .img-con {
      float: left;
      width: 100px;
      height: 100px;
      position: relative;
      margin: 15px 5px 5px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .close-btn {
        position: absolute;
        top: 4px;
        right: 4px;
        color: #fff;
        cursor: pointer;
      }
    }
  }
  .add-btn {
    width: 300px;
    display: block;
    margin: 10px auto 0;
  }
`

const HeadCon = styled.div``
