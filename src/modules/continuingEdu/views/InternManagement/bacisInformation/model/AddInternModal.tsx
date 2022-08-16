import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { Modal, Input, Row, Col,message as Message, Select, DatePicker} from 'antd';
import React, { useState, useEffect } from "react";
import Form from "src/components/Form/Form";
import { Rules } from "src/components/Form/interfaces";
import {trainingSettingApi} from '../../api/TrainingSettingApi'
import moment from 'moment'

export interface Props {
  visible: boolean
  onOk: any
  onCancel: any
  params?:any
  allowClear?: boolean
  loading?: boolean
}
export default observer(function AddInternModal(props: Props){
  const { visible, onCancel, onOk, params, allowClear, loading } = props
  const [editLoading, setEditLoading] = useState(false);
  const formRef = React.createRef<Form>();
  const [yearPickerIsOpen,setyearPickerIsOpen] =useState(false)

  const setFormItem = (key: any, value: any) => {
    if (formRef.current) formRef.current.setField(key, value)
  }

  // 必填项
  const rules: Rules = {
    year: val => !!val || "年份不能为空",
    name: val => !!val || "姓名不能为空",
    sex: val => !!val || "性别不能为空",
    age: val => !!val || "年龄不能为空",
    education: val => !!val || "学历不能为空",
    graduatedUniversity: val => !!val || "毕业学校不能为空",
    phone: val => !!val || "联系电话不能为空",
    address: val => !!val || "家庭地址不能为空",
    currentAddress: val => !!val || "现住址不能为空",
    emergencyContactPhone: val => !!val || "父母电话不能为空",
    specialty: val => !!val || "特长不能为空",
    schoolPosition: val => !!val || "在校职务不能为空",
    healthStatus: val => !!val || "健康状况不能为空",
    height: val => !!val || "身高不能为空",
    weight: val => !!val || "体重不能为空",
    // teachTeacher: val => !!val || "带教老师不能为空",
    // operationScore: val => !!val || "操作成绩不能为空",
    // theoryScore: val => !!val || "理论成绩不能为空"
  };
  // 学历
  const nurseHierarchyArr = [
    { name: "博士", code: "9" },
    { name: "研究生", code: "8" },
    { name: "本科", code: "7" },
    { name: "大专", code: "6" },
    { name: "中专", code: "5" },
  ]

  useEffect(() => {
    setTimeout(() => {
      let current: any = formRef.current;
      if (!current) return;
      if(params){
        current.clear()
        let data = {...params}
        let {
          year,
          name,
          sex, 
          age, 
          education,
          graduatedUniversity ,
          phone,
          address,
          currentAddress,
          emergencyContactPhone,
          specialty,
          schoolPosition,
          healthStatus,
          height,
          weight,
          teachTeacher,
          operationScore,
          theoryScore,
          remark,
        } = data
        nurseHierarchyArr.map((item:any)=>{
          if(item.name == education){
            education = item.code
          }
        })
        current.setFields({
          year:year?moment(year.toString()):null,
          name,
          sex:sex=='男'? '0' : '1', 
          age, 
          education,
          graduatedUniversity ,
          phone,
          address,
          currentAddress,
          emergencyContactPhone,
          specialty,
          schoolPosition,
          healthStatus,
          height,
          weight,
          teachTeacher,
          operationScore,
          theoryScore,
          remark,
        })
      }else{
        current.clear()
        current.setFields({
          sex:'0',
          year:moment(),
          education:'9'
        })
      }
    }, 100);
  }, [visible]);


  const handleOk = () => {
    let current = formRef.current;
    if (current) {
      current
        .validateFields()
        .then(res => {
          current = formRef.current;
          if (current) {
            let newParams = current.getFields();
            console.log(params);
            
            let id = params ? params.id : null
            let addParams = {...newParams,year:moment(newParams.year).format("YYYY"),id}
            console.log(addParams);
            
            trainingSettingApi.AddFormSave(addParams).then((res)=>{
              if(res.code == '200'){
                onOk && onOk()
              }
            }).catch((err)=>{
              console.log(err);
              
            })
            
          }
        }).catch(e => {
          console.log(e);
        });
    }
    
  };
  const handleCancel = () => {
    if (editLoading) return;
    onCancel && onCancel();
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  // 表单变化函数
  const onFormChange = (name: string, value: any, from: Form) => {
    let data = from.getFields();
    // getTree(data.trainingKeyPointId, data.knowledgePointDivisionId)
  };
  const handlePanelChange = (value: any) => {
    setyearPickerIsOpen(false)
    setFormItem("year" , value)
  }


  return(
    <Modal title={params ? "修改实习生":"添加实习生"} visible={visible} onOk={handleOk} onCancel={handleCancel}  confirmLoading={editLoading}>
        <Form ref={formRef} rules={rules} onChange={onFormChange}>
          <Row>
            <Col span={24}>
            <Form.Field label={`年份：`} name='year' required>
                <DatePicker
                  open={yearPickerIsOpen}
                  mode='year'
                  format='YYYY'
                  onChange={()=>{setyearPickerIsOpen(false)}}
                  onOpenChange={(status)=>{setyearPickerIsOpen(status)}}
                  onPanelChange={handlePanelChange}
                />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`姓名：`} name="name" required>
                <Input placeholder="请输入" />
              </Form.Field>
            </Col>
            <Col span={24}>
             <Form.Field label={`性别：`} name="sex" required>
               <Select>
                   <Select.Option value={'0'}>男</Select.Option>
                   <Select.Option value={'1'}>女</Select.Option>
               </Select>
             </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`年龄：`} name="age" required>
                <Input placeholder="请输入" />
              </Form.Field>
            </Col>
            <Col span={24}>
             <Form.Field label={`学历：`}  name="education" required>
               <Select>
                {nurseHierarchyArr.map(item => {
                  return <Select.Option value={item.code} key={item.code}>{item.name}</Select.Option>
                })}
               </Select>
             </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`毕业学校：`} name="graduatedUniversity" required>
                <Input placeholder="请输入" />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`联系电话：`} name="phone" required>
                <Input placeholder="请输入" />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`家庭住址：`} name="address" required>
                <Input placeholder="请输入" />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`现住址：`} name="currentAddress" required>
                <Input placeholder="请输入" />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`父母电话：`} name="emergencyContactPhone" required>
                <Input placeholder="请输入" />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`特长：`} name="specialty" required>
                <Input placeholder="请输入" />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`在校职务：`} name="schoolPosition" required>
                <Input placeholder="请输入" />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`健康状况：`} name="healthStatus" required>
                <Input placeholder="请输入" />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`身高：`} name="height" required>
                <Input placeholder="请输入" />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`体重：`} name="weight" required>
                <Input placeholder="请输入" />
              </Form.Field>
            </Col>
            {/* <Col span={24}>
              <Form.Field label={`带教老师：`} name="teachTeacher" required>
                <Input placeholder="请输入" />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`操作成绩：`} name="operationScore" required>
                <Input placeholder="请输入" />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`理论成绩：`} name="theoryScore" required>
                <Input placeholder="请输入" />
              </Form.Field>
            </Col> */}
            <Col span={24}>
              <Form.Field label={`备注：`} name="remark" >
                <Input placeholder="请输入" />
              </Form.Field>
            </Col>
          </Row>
        </Form>
      </Modal>
  )
})