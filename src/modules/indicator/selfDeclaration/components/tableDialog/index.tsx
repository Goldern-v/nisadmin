import styled from "styled-components"
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { Button, Modal, } from "antd"

const img = require('../../asset/word.png')

interface Props {
  visible: boolean
  onOk: Function
  onCancel: Function
}

export default observer((props: Props) => {
  const [current, setCurrent]: any = useState({})
  const { visible, onOk, onCancel } = props

  const tableList = [
    { code: 'R0001', name: '跌倒（坠床）相关信息收集表' },
    { code: 'R0002', name: '压力性损伤相关信息收集表' },
    { code: 'R0003', name: 'CVC非计划拔管相关信息收集表' },
    { code: 'R0004', name: 'PICC非计划拔管相关信息收集表' },
    { code: 'R0005', name: '导尿管非计划拔管相关信息收集表' },
    { code: 'R0006', name: '胃肠管（经口鼻）非计划拔管相关信息收集表' },
    { code: 'R0007', name: '气管导管非计划拔管相关信息收集表' },
    { code: 'R0008', name: 'CVC相关血流感染相关信息收集表' },
    { code: 'R0009', name: 'PICC相关血流感染相关信息收集表' },
    { code: 'R0010', name: '呼吸机相关肺炎（VAP）相关信息收集表' },
    { code: 'R0011', name: '导尿管相关尿路感染（CAUTI）相关信息收集表' },
  ]

  useEffect(() => {
  })

  return (
    <Modal
      title={`选择表单`}
      centered
      width={800}
      visible={visible}
      onCancel={() => onCancel()}
      footer={
        <div style={{ textAlign: "center" }}>
          <Button onClick={() => onCancel()}>
            取消
          </Button>
          <Button disabled={!current.code} onClick={() => onOk(current)}>
            创建
          </Button>
        </div>
      }
    >
      <Wrapper>
        {tableList.map(item => {
          return (
            <div className={(current && (current.code === item.code)) ? 'item select' : 'item'}
                 onClick={() => setCurrent(item)}
                 onDoubleClick={() => onOk(item)}>
              <img src={img} alt=""/>
              <span>{item.name}</span>
            </div>
          )
        })}
      </Wrapper>
    </Modal>
  )
})

const Wrapper = styled.div`
  display:flex;
  flex-wrap:wrap;
  .item{
    width: 50%;
    height: 60px;
    display:flex;
    align-items: center;
    padding: 0 10px;
    &.select{
      border: 1px solid rgb(29, 179, 139);
      border-radius: 5px;
    }
    img{
      width: 40px;
      height: 40px;
      margin-right: 10px;
    }
    &:hover{
      background: rgba(0, 166, 128, 0.05);
      border-color: rgb(29, 179, 139);
      box-shadow: rgb(0 166 128 / 20%) 0px 0px 0px 2px;
      cursor: pointer;
    }
  }
`