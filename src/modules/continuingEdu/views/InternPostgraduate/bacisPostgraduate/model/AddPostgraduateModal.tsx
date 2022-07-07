import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { Modal, Input, Row, Col,message as Message, Select, DatePicker} from 'antd';
import React, { useState, useEffect } from "react";
import Form from "src/components/Form/Form";
import { Rules } from "src/components/Form/interfaces";
import {internPostgraduateApi} from "../../api/InternPostgraduate"
import moment from 'moment'

export interface Props {
  visible: boolean
  onOk: any
  onCancel: any
  params?: any
  allowClear?: boolean
  loading?: boolean
  onOkCallBack?: boolean
}
export default observer(function AddInternModal(props: Props){
  const { visible, onCancel, onOk,params, allowClear, loading } = props
  const [editLoading, setEditLoading] = useState(false);
  const formRef = React.createRef<Form>();
  const [yearPickerIsOpen,setyearPickerIsOpen] =useState(false)
  const [startPickerIsOpen,setstartPickerIsOpen] =useState(false)
  const [endPickerIsOpen,setendPickerIsOpen] =useState(false)
  const [deucOption, setdeucOption] = useState([]); // 科室信息

  const setFormItem = (key: any, value: any) => {
    if (formRef.current) formRef.current.setField(key, value)
  }

  // 必填项
  const rules: Rules = {
    year: val => !!val || "年份不能为空",
    natureOfLearning: val => !!val || "学习性质不能为空",
    name: val => !!val || "姓名不能为空",
    sex: val => !!val || "性别不能为空",
    age: val => !!val || "年龄不能为空",
    post: val => !!val || "职务不能为空",
    title: val => !!val || "职称不能为空",
    education: val => !!val || "学历不能为空",
    originalWorkUnit: val => !!val || "选送单位不能为空",
    studyDeptName01: val => !!val || "进修科室不能为空",
    studyTimeBegin: val => !!val || "开始时间不能为空",
    studyTimeEnd: val => !!val || "结束时间不能为空",
    duration: val => !!val || "时长不能为空",
    mattersForStudy: val => !!val || "特殊事宜不能为空",
    phone: val => !!val || "联系电话不能为空",
    teachingTeacher: val => !!val || "带教老师不能为空",
    operationScore: val => !!val || "操作成绩不能为空",
    theoryScore: val => !!val || "理论成绩不能为空",
  };
  // 职务
  const nurseDutyArr = [
    { name: "护士", code: "护士" },
    { name: "护士长", code: "护士长" },
    { name: "科护士长", code: "科护士长" },
    { name: "护理部副主任", code: "护理部副主任" },
    { name: "护理部主任", code: "护理部主任" },
    { name: "其他", code: "其他" },
  ]
  // 职称
  const nurseProfessionalArr = [
    { name: "护士", code: "护士" },
    { name: "护师", code: "护师" },
    { name: "主管护师", code: "主管护师" },
    { name: "副主任护师", code: "副主任护师" },
    { name: "主任护师", code: "主任护师" },
  ]
  // 学历
  const nurseHierarchyArr = [
    { name: "博士", code: "9" },
    { name: "研究生", code: "8" },
    { name: "本科", code: "7" },
    { name: "大专", code: "6" },
    { name: "中专", code: "5" },
  ]

  // 初始化科室
  const getDeptList = () => {
   internPostgraduateApi.getnursingAll().then((res)=>{
          let deptListall = [];
          deptListall = res.data.deptList
          deptListall.unshift({code:'',name:'全部'})
          setdeucOption(deptListall)
        }).catch((err)=>{
          console.log(err);
        })
  };
  useEffect(() => {
    if(visible){
      setTimeout(() => {
        getDeptList();
        let current: any = formRef.current;
        if (!current) return;
        if(params){
          current.clear()
          let data = {...params}
          let {
            year,
            natureOfLearning,
            name,
            sex,
            age,
            post,
            title,
            education,
            originalWorkUnit,
            studyDeptName01,
            studyTimeEnd,
            studyTimeBegin,
            duration,
            mattersForStudy,
            phone,
            teachingTeacher, 
            operationScore,
            theoryScore,
            remark,
          } = data;
          nurseHierarchyArr.map((item:any)=>{
            if(item.name == education){
              education = item.code
            }
          })
          current.setFields({
            year: year ? moment(year.toString()) :null,
            natureOfLearning,
            name,
            sex:sex=="男"?'0':'1',
            age,
            post,
            title,
            education,
            originalWorkUnit,
            studyDeptName01,
            studyTimeEnd:studyTimeEnd?moment(studyTimeEnd):null,
            studyTimeBegin:studyTimeBegin?moment(studyTimeBegin):null,
            duration,
            mattersForStudy,
            phone,
            teachingTeacher, 
            operationScore,
            theoryScore,
            remark,
          })
         
        }else{
          current.clear()
          current.setFields({
            year:moment(),
            sex:'0',
            education:'9'
          })
        }
      }, 100);
    }
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
            let addParams = {...newParams,year:moment(newParams.year).format("YYYY"),id}
            internPostgraduateApi.getSaveFormData(addParams).then((res)=>{
              console.log(res);
              onOk && onOk()
            })
            .catch((err)=>{
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
    setFormItem("year" , value)
    setyearPickerIsOpen(false)
  }
  const handlePanelStartChange = (value: any) => {
    if(formRef.current && formRef.current.state.values.studyTimeEnd){
      let hours = (moment
        .duration(moment(formRef.current.state.values.studyTimeEnd, 'YYYY/MM/DD HH:mm')
        .diff(moment(value, 'YYYY/MM/DD HH:mm'))
        ).asHours()).toFixed(2);
      setFormItem("duration" , hours)
    }
    
    setstartPickerIsOpen(false)
    setFormItem("studyTimeBegin" , value)
  }
  const handlePanelEndChange = (value: any) => {
    if(formRef.current && formRef.current.state.values.studyTimeEnd){
      let hours = (moment
        .duration(moment(value, 'YYYY/MM/DD HH:mm')
        .diff(moment(formRef.current.state.values.studyTimeBegin, 'YYYY/MM/DD HH:mm'))
        ).asHours()).toFixed(2);
      setFormItem("duration" , hours)
    }
    setendPickerIsOpen(false)
    setFormItem("studyTimeEnd" , value)
  }


  return(
    <Modal title={params ? "修改进修生":"添加进修生"}  visible={visible} onOk={handleOk} onCancel={handleCancel}  confirmLoading={editLoading}>
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
              <Form.Field label={`学习性质：`} name="natureOfLearning" required>
                <Select>
                    <Select.Option value={'参观学习'}>参观学习</Select.Option>
                    <Select.Option value={'进修'}>进修</Select.Option>
                </Select>
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
             <Form.Field label={`职务：`}  name="post" required>
               <Select>
                {nurseDutyArr.map(item => {
                  return <Select.Option value={item.code} key={item.code}>{item.name}</Select.Option>
                })}
               </Select>
             </Form.Field>
            </Col>
            <Col span={24}>
             <Form.Field label={`职称：`}  name="title" required>
               <Select>
                {nurseProfessionalArr.map(item => {
                  return <Select.Option value={item.code} key={item.code}>{item.name}</Select.Option>
                })}
               </Select>
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
              <Form.Field label={`选送单位`} name="originalWorkUnit" required>
                <Input placeholder="请输入" />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`进修科室：`} name="studyDeptName01" required>
              <Select>
                {deucOption.map((item:any) => {
                  return <Select.Option value={item.code} key={item.code}>{item.name}</Select.Option>
                })}
               </Select>
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`开始时间：`} name="studyTimeBegin" required>
              <DatePicker showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD HH:mm" onChange={()=>{setstartPickerIsOpen(false)}} onOk={handlePanelStartChange}  />
              {/* <DatePicker
                  showTime={{ format: 'HH:mm' }}
                  open={startPickerIsOpen}
                  onChange={()=>{setstartPickerIsOpen(false)}}
                  onOpenChange={(status)=>{setstartPickerIsOpen(status)}}
                  onPanelChange={handlePanelStartChange}
                /> */}
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`结束时间：`} name="studyTimeEnd" required>
              <DatePicker showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD HH:mm" onChange={()=>{setendPickerIsOpen(false)}} onOk={handlePanelEndChange} />
              {/* <DatePicker
                  showTime={{ format: 'HH:mm' }}
                  open={endPickerIsOpen}
                  onChange={()=>{setendPickerIsOpen(false)}}
                  onOpenChange={(status)=>{setendPickerIsOpen(status)}}
                  onPanelChange={handlePanelEndChange}
                /> */}
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`时长：`} name="duration" required>
                <Input placeholder="请输入" />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`特殊事宜：`} name="mattersForStudy" required>
                <Input placeholder="请输入" />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`联系电话：`} name="phone" required>
                <Input placeholder="请输入" />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`带教老师：`} name="teachingTeacher" required>
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