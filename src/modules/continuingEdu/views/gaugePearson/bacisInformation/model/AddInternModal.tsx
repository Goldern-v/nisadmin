import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { Modal, Input, Row, Col,message as Message, Select, DatePicker} from 'antd';
import React, { useState, useEffect } from "react";
import Form from "src/components/Form/Form";
import { Rules } from "src/components/Form/interfaces";
import {trainingSettingApi} from '../../api/TrainingSettingApi'
import moment from 'moment'

interface Teaching {
  value:string,
  code:string,
}
interface dept {
  code:string,
  name:string,
}
export interface Props {
  visible: boolean
  onOk: any
  onCancel: any
  params?:any
  allowClear?: boolean
  loading?: boolean
  dataList: Array<Teaching>
}
export default observer(function AddInternModal(props: Props){
  const { visible, onCancel, onOk, params, allowClear, loading, dataList} = props
  const [editLoading, setEditLoading] = useState(false);
  const formRef = React.createRef<Form>();
  const [yearPickerIsOpen,setyearPickerIsOpen] =useState(false)
  const [deptList, setDeptList] = useState([] as dept[])

  const setFormItem = (key: any, value: any) => {
    if (formRef.current) formRef.current.setField(key, value)
  }

  // 必填项
  const rules: Rules = {
    year: val => !!val || "年份不能为空",
    name: val => !!val || "姓名不能为空",
    sex: val => !!val || "性别不能为空",
    birthday: val => !!val || "出生日期不能为空",
    education: val => !!val || "学历不能为空",
    region: val => !!val || "区域不能为空",
    sapCode: val => !!val || "SAP代码不能为空",
    studyDeptCode: val => !!val || "科室不能为空",
    incumbency: val => !!val || "在职情况为空",
    distributionDate: val => !!val || "分配日期不能为空",
    formalDate: val => !!val || "转正日期不能为空",
    teachEmpNos: val => !!val || "带教护士不能为空",
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
          birthday,
          education,
          degree,
          region,
          sapCode,
          studyDeptCode,
          incumbency,
          distributionDate,
          formalDate,
          teachEmpNo,
          teachEmpName,
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
          birthday:birthday? moment(birthday.toString()):null,
          education,
          degree,
          region,
          sapCode,
          studyDeptCode,
          incumbency,
          distributionDate:distributionDate? moment(distributionDate.toString()):null,
          formalDate:formalDate? moment(formalDate.toString()):null,
          teachEmpNos: teachEmpName && teachEmpNo ? `${teachEmpName},${teachEmpNo}`: '',
          remark,
        })
      }else{
        current.clear()
        current.setFields({
          year:moment(),
          sex:'0',
          education:'9',
          birthday:moment(),
          incumbency:'在职',
          distributionDate:moment(),
          formalDate:moment(),
        })
      }
      trainingSettingApi.getnursingDeptRole().then(res=>{
        // console.log(res);
        if(res.data?.deptList.length){
          let data:dept[] = res.data.deptList
          setDeptList(data)
        }
      })
      
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
            let id = params ? params.id : null;
            let addParams = {...newParams,year:moment(newParams.year).format("YYYY"),id,teachEmpNo: newParams.teachEmpNos.split(',')[1], teachEmpName: newParams.teachEmpNos.split(',')[0]}
            // console.log(addParams);
            
            trainingSettingApi.saveOrUpdateInfo(addParams).then((res)=>{
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

  // 表单变化函数
  const onFormChange = (name: string, value: any, from: Form) => {
    let data = from.getFields();
    // getTree(data.trainingKeyPointId, data.knowledgePointDivisionId)
  };
  const handlePanelChange = (value: any) => {
    setyearPickerIsOpen(false)
    setFormItem("year" , value)
  }

  const onValueChange = () => {
    let cardNumber = formRef?.current?.getField("sapCode");
    if (cardNumber)
      formRef?.current?.setField("sapCode", cardNumber.replace(/[^\d]/g,''));
  }


  return(
    <Modal title={params ? "修改规培人员":"添加规培人员"} visible={visible} onOk={handleOk} onCancel={handleCancel}  confirmLoading={editLoading}>
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
            {/* todo */}
            <Col span={24}>
             <Form.Field label={`出生日期`} name="birthday" required>
                <DatePicker />
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
              <Form.Field label={`学位：`}  name="degree">
                <Input placeholder="请输入" />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`区域：`}  name="region" required>
                <Input placeholder="请输入" />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`SAP代码：`} onValueChange={onValueChange}  name="sapCode" required>
                <Input placeholder="请输入" />
              </Form.Field>
            </Col>
            <Col span={24}>
             <Form.Field label={`科室：`}  name="studyDeptCode" required>
               <Select placeholder="请选择">
                {deptList.map(item => {
                  return <Select.Option value={item.code} key={item.code}>{item.name}</Select.Option>
                })}
               </Select>
             </Form.Field>
            </Col>
            <Col span={24}>
             <Form.Field label={`在职情况：`}  name="incumbency" required>
               <Select>
                {['在职', '离职'].map(item => {
                  return <Select.Option value={item} key={item}>{item}</Select.Option>
                })}
               </Select>
             </Form.Field>
            </Col>
            <Col span={24}>
             <Form.Field label={`分配日期：`} name="distributionDate" required>
                <DatePicker />
             </Form.Field>
            </Col>
            <Col span={24}>
             <Form.Field label={` 转正日期：`} name="formalDate" required>
                <DatePicker />
             </Form.Field>
            </Col>
            <Col span={24}>
             <Form.Field label={`带教护士：`} name="teachEmpNos" required>
              <Select>
                  {dataList.map((item:Teaching) => {
                    return <Select.Option value={item.value} key={item.code}>{item.code}</Select.Option>
                  })}
               </Select>
             </Form.Field>
            </Col>
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