import styled from 'styled-components'
import React, { useState, useLayoutEffect, useEffect } from 'react'
import { ModalComponentProps } from 'src/libs/createModal'
import { Modal, message, Button, Row, Col, Spin, Input, Radio, Select, DatePicker } from 'antd'
import { educationList } from './../data/education'
import { traineeFilesApi } from './../api/TraineeFilesApi'
import Form from 'src/components/Form'
import { Rules } from "src/components/Form/interfaces";
import { appStore } from "src/stores";
import service from "src/services/api"; //获取科室公共接口
import moment from "moment";

export interface Props extends ModalComponentProps {
  okCallback?: Function,
  id: string | number,
  status?: string
}

export default function TraineeAuditModal(props: Props) {
  const { visible, onCancel, okCallback, id, status } = props

  const [info, setInfo] = useState({} as any)

  const [loading, setLoading] = useState(false)

  const formRef = React.createRef<Form>();

  const [deptList, setDeptList]: any = useState([]); // 科室

  // 弹窗必填项
  const rules: Rules = {
    name: val => !!val || "姓名不能为空",
    sex: val => !!val || "性别不能为空",
    schoolName: val => !!val || "院校不能为空",
    major: val => !!val || "专业不能为空",
    education: val => !!val || "学历不能为空",
    idCardNo: val => !!val || "身份证号码不能为空",
    phone: val => !!val || "联系电话不能为空",
    isResident: val => appStore.HOSPITAL_ID !== 'lyrm' &&  (!!val || "是否住宿不能为空"),
    studyTime: val => appStore.HOSPITAL_ID !== 'gzhd' && (!!val || "实习时间不能为空"),
    studyDeptCode: val => !!val || "实习科室不能为空",
    isCPCMember: val => appStore.HOSPITAL_ID == 'gzhd' && (!!val || "党员不能为空"),
    isGroupLeader: val => !!val || "是否组长不能为空",
    address: val => !!val || "家庭住址不能为空",
    emergencyContactPerson: val => !!val || "紧急联系人不能为空",
    emergencyContactPhone: val => !!val || "紧急联系人电话不能为空"
  };

  const educationText = () => {
    let target = educationList.find((item: any) => item.code == info.education)

    if (target) return target.name

    return ''
  }

  const getInfo = () => {
    setLoading(true)
    traineeFilesApi
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
    console.log(params,status, status === 'edit', 9999999)
    if (status === 'edit') {
      let current: any = formRef.current;
      console.log(current, 'current')
      if (current) {
        current
          .validateFields()
          .then((res: any) => {
            let newParams = current.getFields();
            console.log(newParams, 88888);
            newParams.internshipBegin = newParams.studyTime && newParams.studyTime[0]
              ? newParams.studyTime[0].format("YYYY-MM-DD")
              : "";
            newParams.internshipEnd = newParams.studyTime && newParams.studyTime[1]
              ? newParams.studyTime[1].format("YYYY-MM-DD")
              : "";
            newParams.studyDeptName = newParams.studyDeptCode
              ? deptList.find(
                (item: any) => item.code === newParams.studyDeptCode
              ).name
              : "";
              if (params.identifier){
                newParams.id = params.id;
                traineeFilesApi
                  .saveOrUpdateInfo(newParams)
                  .then(res => {
                    message.success('保存成功')
                    okCallback && okCallback()
                    onCancel()
                  })
                  .catch((e: any) => {
                    console.log(e);
                    setLoading(false)
                  });
              } else {
                message.error('实习编号为空，请联系管理员！')
              }
          })
          .catch((e: any) => {
            console.log(e);
            setLoading(false)
          });
      }
    } else {
      traineeFilesApi
      .auditInfo(params)
      .then(res => {
        message.success('保存成功')
        okCallback && okCallback()
        onCancel()
      }, () => setLoading(false))
    }
    
  }

  // 初始化科室
  const getDeptList = () => {
    service.commonApiService.getNursingUnitAll().then(res => {
      setDeptList(res.data.deptList);
    });
  };

  useLayoutEffect(() => {
    if (visible) {
      setInfo({})
      getInfo()
      getDeptList();
    }
  }, [visible])

  // 初始化 判断是否修改回显数据
  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        console.log(info.identifier, info, 'info 基本信息')
        let current: any = formRef.current;
        if (!current) return;
        if (info.identifier) {
          current.clear();
          let data: any = { ...info };
          const {
            identifier,
            name,
            sex,
            age,
            schoolName,
            major,
            education,
            idCardNo,
            phone,
            isResident,
            dormitoryNumber,
            internshipBegin,
            internshipEnd,
            studyDeptCode,
            studyDeptName,
            isGroupLeader,
            address,
            emergencyContactPerson,
            emergencyContactPhone,
            remark,
            isCPCMember,
            isOnJob
          } = data;
          console.log(education, '学历')
          current.setFields({
            identifier,
            name,
            sex: sex === "男" ? "0" : "1",
            isOnJob: isOnJob === '在院' ? '1' : '0',
            age,
            schoolName,
            major,
            education,
            idCardNo,
            phone,
            isResident: isResident === "否" ? "0" : "1",
            isCPCMember: isCPCMember === "否" ? "0" : "1",
            dormitoryNumber,
            isGroupLeader: isGroupLeader === "否" ? "0" : "1",
            address,
            emergencyContactPerson,
            emergencyContactPhone,
            remark,
            studyDeptCode,
            studyTime: internshipBegin && internshipEnd ? [moment(internshipBegin), moment(internshipEnd)] : []
          });
        } else {
          current.clear();
        }
      }, 100);
    }
  }, [visible, formRef]);

  return (
    <Modal
      title="审核"
      centered
      onCancel={onCancel}
      width={status === 'edit' ? 600 : 440}
      visible={visible}
      confirmLoading={loading}
      footer={<div>
        <Button
          disabled={loading}
          onClick={() => onCancel()}>关闭</Button>
        {(info.status === 0 || status === 'edit') && <Button
          disabled={loading}
          type="primary"
          onClick={() => handleSave()}>
          {status === 'edit' ? '保存' : '保存到花名册'}
        </Button>}
      </div>}>
      <Wrapper>
        {status !== 'edit' ? <Spin spinning={loading}>
          <Row>
            <Col span={8} className="label">姓名：</Col>
            <Col span={16}>{info.name}</Col>
          </Row>
          <Row>
            <Col span={8} className="label">性别：</Col>
            <Col span={16}>{info.sex === '0' ? "男" : "女"}</Col>
          </Row>
          <Row>
            <Col span={8} className="label">院校：</Col>
            <Col span={16}>{info.schoolName}</Col>
          </Row>
          <Row>
            <Col span={8} className="label">专业：</Col>
            <Col span={16}>{info.major}</Col>
          </Row>
          <Row>
            <Col span={8} className="label">学历：</Col>
            <Col span={16}>{educationText()}</Col>
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
            <Col span={8} className="label">实习时间：</Col>
            <Col span={16}>
              {`${info.internshipBegin || ''} 至 ${info.internshipEnd || ''}`}
            </Col>
          </Row>
          <Row>
            <Col span={8} className="label">实习科室：</Col>
            <Col span={16}>{info.studyDeptName}</Col>
          </Row>
          <Row>
            <Col span={8} className="label">是否组长：</Col>
            <Col span={16}>{info.isGroupLeader ? '是' : '否'}</Col>
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
        </Spin> :
        <Form ref={formRef} rules={rules}>
          {info.identifier && (
            <Row>
              <Col span={6} className="label">
                <span className="mustWrite">*</span> 实习编号:
              </Col>
              <Col span={16}>
                <Form.Field name="identifier">
                  <Input disabled />
                </Form.Field>
              </Col>
            </Row>
          )}
          <Row>
            <Col span={6} className="label">
              <span className="mustWrite">*</span> 姓名:
            </Col>
            <Col span={16}>
              <Form.Field name="name">
                <Input />
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={6} className="label">
              <span className="mustWrite">*</span> 性别:
            </Col>
            <Col span={16}>
              <Form.Field name="sex">
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="0">男</Radio.Button>
                  <Radio.Button value="1">女</Radio.Button>
                </Radio.Group>
              </Form.Field>
            </Col>
          </Row>
          {appStore.HOSPITAL_ID == 'hj' &&
            <Row>
              <Col span={6} className="label">
                在院状态:
              </Col>
              <Col span={16}>
                <Form.Field name="isOnJob">
                  <Radio.Group buttonStyle="solid">
                    <Radio.Button value="0">离院</Radio.Button>
                    <Radio.Button value="1">在院</Radio.Button>
                  </Radio.Group>
                </Form.Field>
              </Col>
            </Row>
          }
          <Row>
            <Col span={6} className="label">
              <span className="mustWrite">*</span> 院校:
            </Col>
            <Col span={16}>
              <Form.Field name="schoolName">
                <Input />
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={6} className="label">
              <span className="mustWrite">*</span> 专业:
            </Col>
            <Col span={16}>
              <Form.Field name="major">
                <Input />
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={6} className="label">
              <span className={"mustWrite"}>*</span> 学历:
            </Col>
            <Col span={16}>
              <Form.Field name="education">
                <Select defaultValue="7">
                  <Select.Option value="9">博士</Select.Option>
                  <Select.Option value="8">研究生</Select.Option>
                  <Select.Option value="7">本科</Select.Option>
                  <Select.Option value="6">大专</Select.Option>
                  <Select.Option value="5">中专</Select.Option>
                </Select>
              </Form.Field>
            </Col>
          </Row>
          {appStore.HOSPITAL_ID == 'gzhd' &&
            <Row>
              <Col span={6} className="label">
                <span className="mustWrite">*</span> 是否党员:
              </Col>
              <Col span={16}>
                <Form.Field name="isCPCMember">
                  <Radio.Group buttonStyle="solid">
                    <Radio.Button value="1">是</Radio.Button>
                    <Radio.Button value="0">否</Radio.Button>
                  </Radio.Group>
                </Form.Field>
              </Col>
            </Row>
          }
          <Row>
            <Col span={6} className="label">
              <span className={"mustWrite"}>*</span> 身份证号码:
            </Col>
            <Col span={16}>
              <Form.Field name="idCardNo">
                <Input />
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={6} className="label">
              <span className={"mustWrite"}>*</span> 联系电话:
            </Col>
            <Col span={16}>
              <Form.Field name="phone">
                <Input />
              </Form.Field>
            </Col>
          </Row>
          {
            appStore.HOSPITAL_ID !=='lyrm' &&
              <Row>
                <Col span={6} className="label">
                  <span className={"mustWrite"}>*</span> 是否住宿:
                </Col>
                <Col span={16}>
                  <Form.Field name="isResident">
                    <Radio.Group buttonStyle="solid">
                      <Radio.Button value="1">是</Radio.Button>
                      <Radio.Button value="0">否</Radio.Button>
                    </Radio.Group>
                  </Form.Field>
                </Col>
              </Row>
          }
          {
            appStore.HOSPITAL_ID !=='lyrm' && <Row>
              <Col span={6} className="label">
                宿舍编号:
              </Col>
              <Col span={16}>
                <Form.Field name="dormitoryNumber">
                  <Input />
                </Form.Field>
              </Col>
            </Row>
          }
          <Row>
            <Col span={6} className="label">
              <span className={"mustWrite"}>*</span> 实习时间:
            </Col>
            <Col span={16}>
              <Form.Field name="studyTime">
                <DatePicker.RangePicker />
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={6} className="label">
              <span className="mustWrite">*</span> 实习科室:
            </Col>
            <Col span={16}>
              <Form.Field name="studyDeptCode">
                <Select
                  style={{ width: 180 }}
                  allowClear
                  showSearch
                  filterOption={(input: any, option: any) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {deptList.map((item: any) => {
                    return (
                      <Select.Option value={item.code} key={item}>
                        {item.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={6} className="label">
              <span className={"mustWrite"}>*</span> 是否组长:
            </Col>
            <Col span={16}>
              <Form.Field name="isGroupLeader">
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="1">是</Radio.Button>
                  <Radio.Button value="0">否</Radio.Button>
                </Radio.Group>
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={6} className="label">
              <span className={"mustWrite"}>*</span> 家庭住址:
            </Col>
            <Col span={16}>
              <Form.Field name="address">
                <Input />
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={6} className="label">
              <span className={"mustWrite"}>*</span> 紧急联系人:
            </Col>
            <Col span={16}>
              <Form.Field name="emergencyContactPerson">
                <Input />
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={6} className="label">
              <span className={"mustWrite"}>*</span> 紧急联系人电话:
            </Col>
            <Col span={16}>
              <Form.Field name="emergencyContactPhone">
                <Input />
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={6} className="label">
              备注:
            </Col>
            <Col span={16}>
              <Form.Field name="remark">
                <Input.TextArea rows={5} maxLength={100} />
              </Form.Field>
            </Col>
          </Row>
        </Form>
        }
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
  .mustWrite {
    color: red !important;
    margin-top: 2px;
  }
`