import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Modal, Row, Col, Select, Input, message } from 'antd'
import { ModalComponentProps } from "src/libs/createModal"
import { authStore, appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import moment from 'moment'
import qs from 'qs'

const Option = Select.Option

export interface Props extends ModalComponentProps {
  deptCode: string,
  templateList: any[]
}

export default observer(function WardLogAddModal(props: Props) {
  const { onOk, onCancel, visible, deptCode, templateList } = props
  const { deptList } = authStore
  const { history } = appStore
  const [params, setParams] = useState({
    deptCode: '',
    templateId: ''
  } as any)

  const filterTemplateList = templateList || []
    .filter((item: any) => {
      if (item.wardCode == "000000" || item.wardCode == params.deptCode)
        return true

      return false
    })

  const handleOk = () => {
    if (!params.templateId) message.error('未选择新建模板')
    onCancel()
    history.push(`/wardLogEdit?${qs.stringify(params)}`)
  }

  useEffect(() => {
    if (visible)
      setParams({
        deptCode: deptCode,
        templateId: ''
      })
  }, [visible])

  return <Modal
    title="新建病区日志"
    visible={visible}
    centered
    width={400}
    onOk={handleOk}
    onCancel={onCancel}>
    <Wrapper>
      <Row className="item-row">
        <Col span={4}>
          <div className="label">科 室:</div>
        </Col>
        <Col span={16}>
          <Select
            value={params.deptCode}
            showSearch
            style={{ width: '100%' }}
            filterOption={(input: string, option: any) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            onChange={(deptCode: any) => {
              let newParams = { ...params, deptCode }

              let templpateSelected = templateList.find((item: any) => params.templateId == item.id)


              if (templpateSelected) {
                if (templpateSelected.id != "000000" && templpateSelected.id != deptCode)
                  newParams.templateId = ''
              }

              setParams(newParams)
            }}>
            {deptList.map((item: any) =>
              <Option
                value={item.code}
                key={item.code}>
                {item.name}
              </Option>)}
          </Select>
        </Col>
      </Row>
      <Row className="item-row">
        <Col span={4}>
          <div className="label">应 用:</div>
        </Col>
        <Col span={16}>
          <Select
            value={params.templateId}
            showSearch
            style={{ width: '100%' }}
            filterOption={(input: string, option: any) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            onChange={(templateId: any) => setParams({ ...params, templateId })}>
            {filterTemplateList.map((item: any) =>
              <Option
                value={item.id}
                key={item.id}>
                {item.name}
              </Option>)}
          </Select>
        </Col>
      </Row>
      <Row className="item-row">
        <Col span={4}>
          <div className="label">创建人:</div>
        </Col>
        <Col span={16}>
          <Input value={`${authStore.user?.empName || ''} ${moment().format('YYYY-MM-DD')}`} />
        </Col>
      </Row>
    </Wrapper>
  </Modal>
})

const Wrapper = styled.div`
  .item-row{
    margin-bottom: 20px;
    &:last-of-type{
      margin-bottom: 0;
    }
  }
  .label{
    text-align: right;
    margin-right: 10px;
    line-height: 32px;
  }
`