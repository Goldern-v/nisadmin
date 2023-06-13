import { Button, Icon, message } from 'antd'
import { observer } from 'mobx-react'
import React, { useState } from 'react'
import styled from 'styled-components'
import SelectFormModal from './SelectFormModal'

export interface Props {
  maxSize?: number
  value?: any[],
  level?: string,
  onChange?: Function
}
/**
 * 选择汇总表
 */
export default observer(function SelectForm(props: Props) {
  const { value = [], maxSize = Infinity, level = '3' } = props
  const [visible, setVisible] = useState(false)
  const openModal = () => {
    setVisible(true)
  }
  const delItem = (item: any) => {
    const newArr = value.filter((v: any) => v.qcCode !== item.qcCode)
    props?.onChange?.(newArr)
  }
  const handleOk = (e: any[]) => {
    if (e.length > maxSize) return message.warning(`最多支持选择${maxSize}张`)
      props?.onChange?.(e)
    setVisible(false)
  }
  return (
    <Wrapper>
      {value.length < maxSize && <Button onClick={openModal} size="small" type='primary'>添加表单</Button>}
      {value.map((v: any) => (
        <div key={v.qcCode}>
          <img src={require('../../qualityControlRecord/assets/报告单@3x.png')} alt="" />
          {v.qcName}
          <Icon type="close-circle" onClick={() => delItem(v)} />
        </div>
      ))}
      <SelectFormModal visible={visible} actArr={value} onOk={(e: any[]) => handleOk(e)} onCancel={() => setVisible(false)} level={level} />
    </Wrapper>
  )
})

const Wrapper = styled.div`
text-align: left;
div {
  img {
    width: 16px;
    height: auto;
    margin-right: 4px;
  }
  >.anticon {
    margin-left: 4px;
  }
}
`