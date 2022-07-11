import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { message, Modal } from 'antd'
import { ModalComponentProps } from 'src/libs/createModal'
import { observer } from 'src/vendors/mobx-react-lite'

import { useInstance } from '../../hook/useModel'

export interface Props extends ModalComponentProps {
  /** 表单提交成功后的回调 */
  onOkCallBack?: () => {}
  Component: any
  sectionData: {
    sectionId: string
    sectionTitle?: string
    modalTitle?: string
    modalWidth?: any
    [p: string]: any
  }
}

export default observer(function BaseModal(props: Props) {
  let { visible, onCancel, Component, sectionData } = props
  const [data, setData]: any = useState(null)
  const {instance} = useInstance() 
  const onSave = async () => {
    try {
      await sectionData!.onSave.call(instance, data)
      message.success('保存成功')
      onCancel()      
    } catch (e) {
    }
  }

  useLayoutEffect(() => {
    if (visible) {
      let data = instance.getSectionData(sectionData.sectionId)
      setData(data)
    }
  }, [visible])

  return (
    <Modal
      title={sectionData && sectionData.modalTitle}
      visible={visible}
      onCancel={onCancel}
      onOk={onSave}
      okText='保存'
      forceRender
      width={(sectionData && sectionData.modalWidth) || 1000}
      centered
    >
      {Component && <Component {...props.sectionData} data={data} setData={setData} />}
    </Modal>
  )
})
