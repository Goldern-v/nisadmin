import styled from 'styled-components'
import React, { useState, useLayoutEffect, useEffect } from 'react'
import { ModalComponentProps } from 'src/libs/createModal'
import { Modal, message, Button, Row, Col, Spin } from 'antd'
import { educationList } from '../data/education'
import { nursingEduFilesApi } from '../api/NursingEduFilesApi'

export interface Props extends ModalComponentProps {
  okCallback?: Function,
  id: string | number
}

export default function RefresherAuditModal(props: Props) {
  const { visible, onCancel, okCallback, id } = props

  const [info, setInfo] = useState({} as any)

  const [loading, setLoading] = useState(false)

  const educationText = () => {
    let target = educationList.find((item: any) => item.code == info.education)

    if (target) return target.name

    return ''
  }

  const getInfo = () => {
    setLoading(true)
    nursingEduFilesApi
      .queryToAuditInfoById(id)
      .then((res) => {
        setLoading(false)
        if (res.data) setInfo(res.data)
      }, () => setLoading(false))
  }

  const handleSave = () => {
    let params = { ...info }
    delete params.updateTime
    delete params.createTime

    setLoading(true)

    nursingEduFilesApi
      .auditInfo(params)
      .then(res => {
        message.success('保存成功')
        okCallback && okCallback()
        onCancel()
      }, () => setLoading(false))
  }

  useLayoutEffect(() => {
    if (visible) {
      setInfo({})
      getInfo()
    }
  }, [visible])

  return (
    <Modal
      title="审核"
      centered
      onCancel={onCancel}
      width={440}
      visible={visible}
      confirmLoading={loading}
      footer={<div>
        <Button
          disabled={loading}
          onClick={() => onCancel()}>关闭</Button>
        {info.status === 0 && <Button
          disabled={loading}
          type="primary"
          onClick={() => handleSave()}>
          保存到花名册
        </Button>}
      </div>}>
      <Wrapper>
        <Spin spinning={loading}>
          <Row>
            <Col span={8} className="label">姓名：</Col>
            <Col span={16}>{info.name}</Col>
          </Row>
          <Row>
            <Col span={8} className="label">性别：</Col>
            <Col span={16}>{info.sex ? "男" : "女"}</Col>
          </Row>
          <Row>
            <Col span={8} className="label">年龄：</Col>
            <Col span={16}>{info.age}</Col>
          </Row>
          <Row>
            <Col span={8} className="label">职称：</Col>
            <Col span={16}>{info.title}</Col>
          </Row>
          <Row>
            <Col span={8} className="label">职称：</Col>
            <Col span={16}>{info.title}</Col>
          </Row>
          <Row>
            <Col span={8} className="label">学历：</Col>
            <Col span={16}>{educationText()}</Col>
          </Row>
          <Row>
            <Col span={8} className="label">原单位名称：</Col>
            <Col span={16}>{info.originalWorkUnit}</Col>
          </Row>
          <Row>
            <Col span={8} className="label">原科室：</Col>
            <Col span={16}>{info.originalDepartment}</Col>
          </Row>
          <Row>
            <Col span={8} className="label">身份证号码：</Col>
            <Col span={16}>{info.idCardNo}</Col>
          </Row>
          <Row>
            <Col span={8} className="label">联系电话：</Col>
            <Col span={16}>{info.phone}</Col>
          </Row>
          <Row>
            <Col span={8} className="label">是否住宿：</Col>
            <Col span={16}>{info.isResident ? '是' : '否'}</Col>
          </Row>
          <Row>
            <Col span={8} className="label">宿舍编号：</Col>
            <Col span={16}>{info.dormitoryNumber}</Col>
          </Row>
          <Row>
            <Col span={8} className="label">进修时间：</Col>
            <Col span={16}>
              {`${info.studyTimeBegin || ''} 至 ${info.studyTimeEnd || ''}`}
            </Col>
          </Row>
          <Row>
            <Col span={8} className="label">进修科室1：</Col>
            <Col span={16}>{info.studyDeptName01}</Col>
          </Row>
          <Row>
            <Col span={8} className="label">进修科室2：</Col>
            <Col span={16}>{info.studyDeptName02}</Col>
          </Row>
          <Row>
            <Col span={8} className="label">进修科室2：</Col>
            <Col span={16}>{info.studyDeptName02}</Col>
          </Row>
          <Row>
            <Col span={8} className="label">家庭住址：</Col>
            <Col span={16}>{info.address}</Col>
          </Row>
          <Row>
            <Col span={8} className="label">紧急联系人：</Col>
            <Col span={16}>{info.emergencyContactPerson}</Col>
          </Row>
          <Row>
            <Col span={8} className="label">紧急联系人电话：</Col>
            <Col span={16}>{info.emergencyContactPhone}</Col>
          </Row>
          <Row>
            <Col span={8} className="label">备注：</Col>
            <Col span={16}>{info.remark}</Col>
          </Row>
        </Spin>
      </Wrapper>
    </Modal>
  )
}
const Wrapper = styled.div`
  margin: 0 auto;
  font-size: 14px;
  .ant-row{
    margin-bottom: 10px;
  }
  .label{
    padding-right: 10px;
    text-align: right;
  }
`