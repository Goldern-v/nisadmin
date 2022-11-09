import { Radio } from 'antd'
import { Modal } from 'antd/es'
import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { auditSettingsModel as model } from '../model'

export interface Props {
}
export default observer(function AddRolesModal(props: Props) {
  const [value, setValue] = useState<number>(1)

  const handleChange = (e: any) => {
    setValue(e.target.value)
  }
  useEffect(() => {
    if (model.selectRoleVisible)
      setValue(model.editContentData[model.index].rollBackType)
    else
      setValue(1)
  }, [model.selectRoleVisible])
  
  return (
    <Modal
      title='审核方式'
      visible={model.selectRoleVisible}
      onOk={() => model.handelOkByNode(value)}
      onCancel={(() => model.handleVisible(false, -1))}
      okText='保存'
      centered
    >
      <Wrapper>
        <span>驳回节点：</span>
        <Radio.Group value={value} onChange={(e) => handleChange(e)}>
          <Radio value={1}>上一级</Radio>
          <Radio value={2}>返回第一级别</Radio>
        </Radio.Group>
      </Wrapper>
    </Modal>
  )
})

const Wrapper = styled.div`
padding: 10px 0;
`