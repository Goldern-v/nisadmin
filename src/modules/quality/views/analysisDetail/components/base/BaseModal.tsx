import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { Modal, message } from 'antd'
import { ModalComponentProps } from 'src/libs/createModal'
import { observer } from 'src/vendors/mobx-react-lite'
import { getModal } from '../../AnalysisDetailModal'

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
  const analysisDetailModal = useRef(getModal())
  const onSave = async () => {
    try {
      await sectionData!.onSave.call(analysisDetailModal.current, data)
      message.success('保存成功')
      onCancel()      
    } catch (e) {
    }
  }

  useLayoutEffect(() => {
    if (visible) {
      let data = analysisDetailModal.current.getSectionData(sectionData.sectionId)
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
      width={(sectionData && sectionData.modalWidth) || 700}
      centered
    >
      {Component && <Component {...props.sectionData} data={data} setData={setData} />}
    </Modal>
  )
})
