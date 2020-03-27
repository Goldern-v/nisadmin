import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Modal, InputNumber, Spin, message } from 'antd'
import { observer } from 'mobx-react-lite'
import { ModalComponentProps } from "src/libs/createModal";
import { trainingResultService } from './../../../api/TrainingResultService'
export interface Props extends ModalComponentProps {
  onOkCallBack?: Function,
  type: 'view' | 'edit',
  cetpId: string,
  empNo: string
}

export default observer(function ExamScoreEditModal(props: Props) {
  const { visible, onOkCallBack, onCancel, cetpId, empNo, type } = props
  const [loading, setLoading] = useState(false)

  const [itemList, setItemList] = useState([] as any[])

  let finalScore = 0

  let totalScore = 0
  let deductScore = 0
  for (let i = 0; i < itemList.length; i++) {
    let item = itemList[i]
    totalScore += item.fullScores || 0
    deductScore += item.deduction || 0
  }
  finalScore = totalScore - deductScore

  const handleOK = () => {
    Modal.confirm({
      title: '提示',
      centered: true,
      content: '确认修改该学员成绩?',
      onOk: () => {
        setLoading(true)

        trainingResultService
          .uploadScores({
            cetpId,
            empNo,
            itemDeductionList: itemList.map((item: any) => {
              return {
                id: item.id,
                deduction: item.deduction,
              }
            })
          })
          .then(res => {
            message.success('修改成功', 1, () => {
              onCancel()
              onOkCallBack && onOkCallBack()
            })
          }, err => setLoading(false))

      }
    })

  }

  const getOperateScoreList = () => {
    setLoading(true)
    trainingResultService.reviewScoreItemsByCetpId({
      cetpId,
      empNo
    }).then(res => {
      setLoading(false)
      if (res.data) setItemList(res.data)
    }, err => setLoading(false))
  }

  useEffect(() => {
    if (visible) getOperateScoreList()
  }, [visible])

  return <Modal
    width={500}
    confirmLoading={loading}
    visible={visible}
    onOk={handleOK}
    footer={type == 'view' ? null : <span>
      <Button onClick={() => onCancel && onCancel()}>取消</Button>
      <Button type="primary" loading={loading} onClick={() => handleOK()}>确定</Button>
    </span>}
    onCancel={onCancel}
    centered
    title={`${type == 'view' ? '查看' : '上传'}考核成绩`}>
    <Wrapper>
      <Spin spinning={loading}>
        <div className="main-title">最终成绩：{finalScore}分</div>
        {itemList.map((item: any, idx: number) =>
          <div className="edit-item" key={idx}>
            <span >
              <span>{idx + 1}.</span>
              <span className="desc" title={item.itemName}>{item.itemName}</span>
              （满分{item.fullScores || 0}分）：扣
            </span>
            <span className="content">
              <InputNumber
                min={0}
                size="small"
                max={item.fullScores || 0}
                className="score-edit"
                value={item.deduction}
                onChange={(val: any) => {
                  let newItemList = itemList.concat()
                  newItemList[idx].deduction = val
                  setItemList(newItemList)
                }}
                precision={2} />
            </span>
            <span>分</span>
          </div>)}
      </Spin>
    </Wrapper>
  </Modal>
})

const Wrapper = styled.div`
.edit-item{
  margin-bottom: 10px;
  &:last-of-type{
    margin-bottom: 0;
  }
}
  .main-title{
    font-size: 16px;
    color: #000;
  }
  .edit-item{
    font-size: 13px;
    .desc{
      width: 180px;
      display: inline-block;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    span{
      vertical-align: middle;
    }
  }
  .score-edit{
    width: 60px;
    margin: 0 5px;
    .ant-input-number-handler-wrap{
      display: none;
    }
  }
`