import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { ScrollBox } from 'src/components/common'
import { practicalScoreEvalService } from '../services/PracticalScoreEvalService'
import 操作技术评分 from './templates/操作技术评分'
import { Button, Modal, Spin } from 'antd'
import { message } from 'src/vendors/antd'

export interface Props {
  visible: boolean,
  orginPrams: any,
  onCancel: Function,
  onOk: Function,
}

export default function 操作技术评分标准编辑(props: Props) {
  const { orginPrams, visible, onCancel, onOk } = props

  const [editParams, setEditParams] = useState({} as any)
  const [loading, setLoading] = useState(false)

  const handleSave = () => {
    setLoading(true)
    practicalScoreEvalService
      .saveOrUpdatePracticalTable(editParams)
      .then(res => {
        setLoading(false)
        message.success('保存成功')

        onOk()
      }, () => setLoading(false))
  }

  useEffect(() => {
    if (visible) {
      if (Object.keys(orginPrams).length > 0) {
        setEditParams(JSON.parse(JSON.stringify(orginPrams)))
      } else {
        setLoading(true)

        practicalScoreEvalService.
          getAddPracticalTableContent(1)
          .then(res => {
            setLoading(false)
            setEditParams({
              ...res.data,
              practicalTableId: ''
            })
          }, () => setLoading(false))
      }
    }
  }, [visible])

  return <Modal
    title={'操作技术评分标准编辑'}
    visible={visible}
    centered
    confirmLoading={loading}
    bodyStyle={{ padding: 0 }}
    width={840}
    onOk={() => handleSave()}
    onCancel={() => onCancel()}>
    <Wrapper>
      <Spin spinning={loading}>
        {!loading ? (
          <PageWrapper>
            <操作技术评分
              questionList={editParams.questionList || []}
              editable
              onEditChange={(payload: any) => setEditParams(payload)}
              baseInfo={editParams} />
          </PageWrapper>
        ) : (
          <div className="loading-content"></div>
        )}
      </Spin>
    </Wrapper>
  </Modal>
}

// @ts-ignore
const Wrapper = styled(ScrollBox)`
  background: #ddd;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  .loading-content{
    width: 100%;
    height: 500px;
  }
`

const PageWrapper = styled.div`
  background: #fff;
  margin: 30px auto;
  width: 740px;
  min-height: 1040px;
  padding: 30px;
  table{
    width: 100%;
    border-collapse: collapse;
    border-color: #000;
  }
  td,th{
    text-align: left;
    line-height: 20px;
    font-size: 14px;
    color: #000;
    padding: 0;
    border: 1px #000 solid;
    padding: 2px 8px;
    word-break: break-all;
    &.selected{
      position: relative;
      &::after{
        content: '√';
        display: inline-block;
        position: absolute;
        top: 50%;
        left: -4px;
        color: #000;
        font-size: 30px;
        transform: translateY(-50%);
      }
    }
    &.align-center{
      text-align: center;
    }
    &.small-font-size{
      font-size: 12px;
    }
  }
  .main-title{
    line-height: 45px;
    font-size: 24px;
    font-weight: bold;
    color: #000;
    letter-spacing: 5px;
    text-align: center;
  }
  .form-name{
    letter-spacing: 1px;
    font-weight: bold;
    color: #000;
    text-align: center;
  }
  .flex-row{
    display: flex;
  }
  .bold{
    font-weight: bold;
  }
`