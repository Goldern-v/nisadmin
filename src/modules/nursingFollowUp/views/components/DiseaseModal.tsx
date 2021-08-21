import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Col, Input, InputNumber, Modal, Row, Select } from 'antd'
import FormCreateModal from './FormCreateModal'
import DiseaseManageServices from '../diseaseManage/services/DiseaseManageServices'
import { message } from 'antd/es'
const api = new DiseaseManageServices();
export interface Props {
  visible: boolean,
  onOk: Function,
  onCancel: Function,
  params?: any,
  isOtherEmp?: boolean,
  isAdd?: boolean,
}

export default function editModal(props: Props) {
  const { visible, onOk, onCancel, isAdd, params, isOtherEmp } = props
  const [loading, setLoading] = useState(false)
  const [formCreateVisible, setFormCreateVisible] = useState(false)
  const [formList, setFormList] = useState([] as any)
  const [editParmas, setEditPrams] = useState({
    periodsList: [],
    diseaseTypeName: '',
    diseaseTypeId: '',
    formCodeList: [],


  } as any)
  const { Option } = Select;
  const periodList = [];
  for (let i = 1; i <= 12; i++) {
    periodList.push(<Option key={i} value={i}>{i}个月</Option>);
  }
  const handleCreate = () => {
    setFormCreateVisible(true)
  }
  const handleOk = () => {
    if (editParmas.diseaseTypeName.trim() == '') {
      message.error('疾病名称不能为空')
      return
    }
    if (editParmas.periodsList.length == 0) {
      message.error('随访周期不能为空')
      return
    }
    editParmas.formCodeList = formList.map((item:any)=>item.formCode)
    if (editParmas.formCodeList.length == 0) {
      message.error('随访问卷不能为空')
      return
    }
    setLoading(true)
    api
      .saveOrUpdate(editParmas)
        .then(res => {
          setLoading(false)
          message.success('操作成功')
          onOk && onOk()
        }, () => setLoading(false))
    
  }
  const setDetailModal = (item:any) => {
    console.log(item);
    
  }
  useEffect(() => {
    if (visible) {
      if (!isAdd) {
        setEditPrams({
          diseaseTypeName: params.diseaseTypeName,
          diseaseTypeId: params.diseaseTypeId,
          periodsList: params.visitDiseaseTypeVsPeriodsList.map((item:any)=>item.periods),
        })
        setFormList([...params.visitTemplateList])
      }
    } else {
      setEditPrams({
        periodsList: [],
        diseaseTypeName: '',
        formList: [],
      })
    }
  }, [visible])

  return <Modal
    title={isAdd ? "添加疾病" : "编辑疾病"}
    confirmLoading={loading}
    centered
    visible={visible}
    onOk={() => {
      handleOk()
    }}
    onCancel={() => onCancel()}>
    <Wrapper>
      <Row>
        <Col span={6} className="label">疾病名称：</Col>
        <Col span={15}>
          <Input
            value={editParmas.diseaseTypeName}
            onChange={(e: any) =>
              setEditPrams({ ...editParmas, diseaseTypeName: e.target.value })} />
        </Col>
      </Row>
      <Row>
        <Col span={6} className="label">随访周期：</Col>
        <Col span={15}>
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            value={editParmas.periodsList}
            onChange={(value: any) => setEditPrams({ ...editParmas, periodsList:value.sort((a:any,b:any)=>a-b)})}
          >
            {periodList}
          </Select>
        </Col>
      </Row>
      <Row>
        <Col span={6} className="label">随访问卷：</Col>
        <Col span={15}>
          <Button onClick={handleCreate}>+添加</Button>
          {formList.map((item: any, index: number) => (
            <div key={index}>
              <a href='javascript:;'onClick={() => setDetailModal(item.formCode)}>{item.formName}</a>
              <span onClick={() => {
                formList.splice(index, 1)
                setFormList([...formList])
               } 
              }>删除</span>
            </div>
              
            ))}
        </Col>
      </Row>
      <FormCreateModal
        onCancel={() => setFormCreateVisible(false)}
        onOk={(item:any) => {
          setFormList(item)
          setFormCreateVisible(false)
        }}
        visible={formCreateVisible}
      />
    </Wrapper>
  </Modal>
}
const Wrapper = styled.div`
  line-height: 30px;
  &>*{
    margin-bottom: 10px;
  }
  .label{
    padding-right: 15px;
    text-align: right;
  }
`