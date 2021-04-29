import styled from "styled-components"
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { appStore } from "src/stores"
import qs from "qs"
import { Button } from "src/vendors/antd"
import PatientDialog from '../patientDialog'
import Form from '../form'
import formModel from './model'
import api from '../../api'
import { message } from "antd";
import moment from "moment";

interface Props {

}

export default observer((props: Props) => {
  const { history, location, match } = appStore
  const search = qs.parse(location.search.replace('?', ''))
  const [patientVisible, setPatientVisible] = useState(false)

  const setFormModel = async (modalId: string) => {
    const { data } = await api.getItem(modalId)
    formModel.setMaster(data.master)
    formModel.setItemDataMap(data.itemDataMap)
  }

  const handlePatientSelect = (item: any) => {
    setPatientVisible(false)
    formModel.setMaster(item)
  }

  const handleSave = async (commit = false) => {
    await api.updateItem(formModel.getMaster(), formModel.getItemDataMap(), commit)
    message.success(`${commit ? '提交' : '保存'}成功`)
    history.goBack()
  }

  const cancelCommit = async () => {
    await api.cancelCommit(formModel.getMaster().id)
    message.success(`操作成功`)
    history.goBack()
  }

  useEffect(() => {
    formModel.initData()
    formModel.setMaster({ 'formCode': search.formId })
    if (search.id) {
      const promise = setFormModel(search.id)
    }
  }, [])

  return (
    <Wrapper>
      <HeadWrapper>
        <span style={{ fontWeight: "bold" }}>{search.name}</span>
        <div className='right-bottom'>
          <Button className="con-item" onClick={() => setPatientVisible(true)}>患者选择</Button>
          {
            formModel.getMaster().status === '1' ?
              <Button className="con-item" onClick={() => cancelCommit()}>取消提交</Button>
              :
              <React.Fragment>
                <Button className="con-item" onClick={() => handleSave()}>保存</Button>
                <Button className="con-item" onClick={() => handleSave(true)}>提交</Button>
              </React.Fragment>

          }
          <Button className="con-item" onClick={() => history.goBack()}>返回</Button>
        </div>
      </HeadWrapper>
      <FormWrapper>
        <Form formCode={search.formId}/>
      </FormWrapper>
      {/* 患者弹窗 */}
      <PatientDialog
        visible={patientVisible}
        onOk={handlePatientSelect}
        onCancel={() => setPatientVisible(false)}
      />
    </Wrapper>
  )
})

const Wrapper = styled.div`
  
`

const HeadWrapper = styled.div`
  height: 60px;
  background: #fff;
  font-size: 16px;
  display:flex;
  align-items: center;
  padding: 0 10px;
  justify-content: space-between;
  .right-bottom{
    .con-item{
      margin-left: 15px;
    }
  }
`
const FormWrapper = styled.div`
`