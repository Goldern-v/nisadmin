import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Input, Row, Col, Modal, message as Message, Select } from "antd";
import Form from "src/components/Form/Form";
import { Rules } from "src/components/Form/interfaces";
import { trainingManualModal } from '../TrainingManualModal'
import { trainingManualApi } from "../api/TrainingManualApi";
import { authStore } from "src/stores/index";

export interface Props {
  visible: boolean;
  params: any;
  onCancel: any;
  onOk: any;
  onOkCallBack?: any;
}

export default function SettingEditModal(props: Props) {
  const { visible, params, onCancel, onOk } = props;
  const [editLoading, setEditLoading] = useState(false);
  const formRef = React.createRef<Form>();
  const [list, setList] = useState([]);
  // 层级
  const nurseHierarchyArr = [
    { name: "N0", code: "N0" },
    { name: "N1", code: "N1" },
    { name: "N2", code: "N2" },
    { name: "N3", code: "N3" },
    { name: "N4", code: "N4" },
    { name: "N5", code: "N5" }
  ]
  // 考核形式
  const assessmentFormArr = [
    { name: "提问法", code: "提问法" },
    { name: "现场提问", code: "现场提问" },
    { name: "直接观察法", code: "直接观察法" },
    { name: "床边考核", code: "床边考核" },
    { name: "线上/线下理论考核", code: "线上/线下理论考核" },
    { name: "个案汇报", code: "个案汇报" }
  ]

  // 必填项
  const rules: Rules = {
    nurseHierarchy: val => !!val || "层级不能为空",
    officialRank: val => !!val || "职称不能为空",
    // trainingKeyPointId: val => !!val || "类型名称不能为空",
    // knowledgePointDivisionId: val => !!val || "知识点划分不能为空",
    modulesDivision: val => !!val || "教学模块划分不能为空",
    divisionExplain: val => !!val || "划分说明不能为空",
    methodDivision: val => !!val || "教学方法划分",
    evaluateMethod: val => !!val || "评价方法不能为空"
  };

  // 根据层级获取职级
  const getOfficialRank = (val: any) => {
    const nurseHierarchyObj: any = {
      N0: '轮科护士',
      N1: '初级责任护士',
      N2: '初级责任护士',
      N3: '高级责任护士',
      N4: '高级责任护士',
      N5: '专科护士'
    };
    return nurseHierarchyObj[val]
  }

  // 获取知识点划分、教学方式级联数据内容
  const getTree = (knowledgePointDivisionVal: any, learningFormVal: any) => {
    if (knowledgePointDivisionVal) {
      const obj = trainingManualModal.trainingKeyPointTree.find((item: any) => item.id == knowledgePointDivisionVal)
      trainingManualModal.knowledgePointDivisionTree = { ...obj }
      setList(obj.childList)
      if (learningFormVal) {
        const temp = obj.childList.find((item: any) => item.id === learningFormVal)
        if (!temp) {
          formRef?.current?.setFields({
            knowledgePointDivisionId: ''
          })
        }
        trainingManualModal.learningFormTree = list.find((o: any) => o.id == learningFormVal)
      }
    }
  }

  // 新增修改初始化数据
  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        let current = formRef.current;
        if (!current) return;
        if (params.id) {
          // 修改回显数据
          const { nurseHierarchy, trainingKeyPointId, knowledgePointDivisionId, learningFormId, assessmentForm, modulesDivision, divisionExplain, methodDivision, evaluateMethod, officialRank } = params;
          getTree(trainingKeyPointId, knowledgePointDivisionId)
          current.setFields({
            nurseHierarchy,
            // officialRank: getOfficialRank(nurseHierarchy),
            // trainingKeyPointId,
            // knowledgePointDivisionId,
            // learningFormId,
            assessmentForm,
            modulesDivision,
            divisionExplain,
            methodDivision,
            evaluateMethod,
            officialRank
          });
        } else {
          // 新增清空内容，层级职称赋予默认值不可改
          current.clear();
          current.setFields({
            nurseHierarchy: trainingManualModal.tabKeyName,
            // officialRank: getOfficialRank(trainingManualModal.tabKeyName),
            // trainingKeyPointId: trainingManualModal.trainingKeyPointTree.name,
            // knowledgePointDivisionId: trainingManualModal.knowledgePointDivisionTree.name,
            // learningFormId: trainingManualModal.learningFormTree.name,
          });
        }
      }, 100);
    }
  }, [visible]);

  // 表单变化函数
  const onFormChange = (name: string, value: any, from: Form) => {
    let data = from.getFields();
    getTree(data.trainingKeyPointId, data.knowledgePointDivisionId)
  };

  // 修改保存
  const checkForm = () => {
    let current = formRef.current;
    if (current) {
      current
        .validateFields()
        .then(res => {
          current = formRef.current;
          if (current) {
            let newParams = current.getFields();
            newParams.sort = Number(newParams.sort);
            if (!newParams.empNo) {
              newParams.empNo = authStore.user?.empNo
            }
            if (!newParams.empName) {
              newParams.empName = authStore.user?.empName
            }
            if (!newParams.deptCode) {
              newParams.deptCode = authStore.user?.deptCode
            }
            if (!newParams.deptName) {
              newParams.deptName = authStore.user?.deptName
            }
            newParams.assessmentForm = newParams.evaluateMethod
            if (params.id) {
              newParams.id = params.id;
              setEditLoading(true);
              trainingManualApi.addOrUpdateTrainingListRecord(newParams).then(res => {
                setEditLoading(false);
                let msg = "培训计划修改成功";
                Message.success(msg);
                onOk();
              }).catch(e => {
                setEditLoading(false);
              })
            } else {
              trainingManualApi.addOrUpdateTrainingListRecord(newParams).then(res => {
                setEditLoading(false);
                let msg = "培训计划添加成功";
                Message.success(msg);
                onOk(res);
              }).catch(e => {
                setEditLoading(false);
              })
            }
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

  return (
    <Modal
      visible={visible}
      forceRender={true}
      onCancel={handleCancel}
      onOk={checkForm}
      confirmLoading={editLoading}
      title={params.id ? "修改" : "添加"}
    >
      <Wrapper>
        <Form ref={formRef} rules={rules} onChange={onFormChange}>
          <Row>
            <Col span={6} className="label">
              层级:
            </Col>
            <Col span={18}>
              <Form.Field name="nurseHierarchy">
                <Select disabled>
                  {nurseHierarchyArr.map(item => (
                    <Select.Option value={item.code} key={item.name}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={6} className="label">
              职称:
            </Col>
            <Col span={18}>
              <Form.Field name="officialRank">
                <Input placeholder="名称" />
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={6} className="label">
              教学模块划分:
            </Col>
            <Col span={18}>
              {/* <Form.Field name="trainingKeyPointId">
                <Select>
                  {trainingManualModal.trainingKeyPointTree.map((item: any) => (
                    <Select.Option value={item.id} key={item.name}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Field> */}
              <Form.Field name="modulesDivision">
                <Input placeholder="教学模块划分" />
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={6} className="label">
              划分说明:
            </Col>
            <Col span={18}>

              {/* <Form.Field name="knowledgePointDivisionId">
                <Select>
                  {
                    list.map((item: any) => (
                      <Select.Option value={item.id} key={item.name}>
                        {item.name}
                      </Select.Option>
                    ))
                  }
                </Select>
              </Form.Field> */}
              <Form.Field name="divisionExplain">
                <Input placeholder="划分说明" />
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={6} className="label">
              教学方式划分:
            </Col>
            <Col span={18}>
              <Form.Field name="methodDivision">
                <Select>
                  {trainingManualModal.learningFormTree.childList && trainingManualModal.learningFormTree.childList.map((item: any) => (
                    <Select.Option value={item.name} key={item.name}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={6} className="label">
              评价方法:
            </Col>
            <Col span={18}>
              <Form.Field name="evaluateMethod">
                <Select>
                  {assessmentFormArr.map(item => (
                    <Select.Option value={item.code} key={item.name}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Field>
            </Col>
          </Row>
        </Form>
      </Wrapper>
    </Modal>
  );
}
const Wrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  .label {
    line-height: 32px;
  }
  .ant-switch {
    margin-left: 10px;
    margin-top: 8px;
  }
`;
