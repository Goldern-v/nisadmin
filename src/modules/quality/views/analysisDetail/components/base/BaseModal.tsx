import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { Modal, message } from 'antd'
import { ModalComponentProps } from 'src/libs/createModal'
import { appStore } from "src/stores";
import { observer } from 'src/vendors/mobx-react-lite'
import { getModal } from '../../AnalysisDetailModal'

export interface Props extends ModalComponentProps {
  /** 表单提交成功后的回调 */
  onOkCallBack?: () => {}
  Component: any,
  handleList:any,
  sectionData: {
    sectionId: string
    sectionTitle?: string
    modalTitle?: string
    modalWidth?: any
    [p: string]: any
  }
}

export default observer(function BaseModal(props: Props) {
  let { visible, onCancel, Component, sectionData,handleList } = props
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

  const canEdit = ()=>{
    if(appStore.HOSPITAL_ID != "whyx") return false
    return !!handleList?.find((li:any)=>li.nodeName==="护理部审核" && li.state=="1")
  }

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
      <div style={{ ...(canEdit() ? {pointerEvents:'none'} : {}) }}>
        {Component && <Component {...props.sectionData} data={data} setData={setData} />}
      </div>
    </Modal>
  )
})
