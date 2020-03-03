import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Modal, InputNumber } from 'antd'
import { observer } from 'mobx-react-lite'
import { ModalComponentProps } from "src/libs/createModal";
export interface Props extends ModalComponentProps {
  onOkCallBack?: Function,
  data?: any
}

export default observer(function ExamScoreEditModal(props: Props) {
  const { visible, onOkCallBack, onCancel } = props
  const [loading, setLoading] = useState(false)

  const [itemList, setItemList] = useState([
    {
      id: 1,
      score: 40,
      editScore: 0,
      desc: '走位操作标'
    },
    {
      id: 2,
      score: 10,
      editScore: 5,
      desc: '手势操作标准'
    },
    {
      id: 3,
      score: 50,
      editScore: 0,
      desc: '抽血操作标准'
    },
  ] as any)

  let finalScore = 0

  let totalScore = 0
  let deductScore = 0
  for (let i = 0; i < itemList.length; i++) {
    let item = itemList[i]
    totalScore += item.score || 0
    deductScore += item.editScore || 0
  }
  finalScore = totalScore - deductScore

  const handleOK = () => {
    setLoading(true)
    setTimeout(() => {
      onCancel()
      onOkCallBack && onOkCallBack()
    }, 1000)
  }

  useEffect(() => {
    if (visible) {
      console.log('open')
    }
  }, [visible])

  return <Modal
    width={500}
    confirmLoading={loading}
    visible={visible}
    onOk={handleOK}
    onCancel={onCancel}
    centered
    title="上传考核成绩">
    <Wrapper>
      <div className="main-title">最终成绩：{finalScore}分</div>
      {itemList.map((item: any, idx: number) =>
        <div className="edit-item" key={idx}>
          <span >
            <span>{idx + 1}.</span>
            <span className="desc" title={item.desc}>{item.desc}</span>
            （满分{item.score || 0}分）：扣
          </span>
          <span className="content">
            <InputNumber
              size="small"
              min={0}
              max={item.score || 0}
              className="score-edit"
              value={item.editScore}
              onChange={(val: any) => {
                let newItemList = itemList.concat()
                newItemList[idx].editScore = val
                setItemList(newItemList)
              }}
              precision={2} />
          </span>
          <span>分</span>
        </div>)}
    </Wrapper>
  </Modal>
})

const Wrapper = styled.div`
&>div{
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