import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Input, Row, Col, Modal, message as Message, Select } from "antd";
import Form from "src/components/Form/Form";
import { Rules } from "src/components/Form/interfaces";
import { trainingManualModal } from '../TrainingManualModal'
import { trainingManualApi } from "../api/TrainingManualApi";

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
    { name: "护理助手", code: "护理助手" },
    { name: "床边考核+护理助手", code: "床边考核+护理助手" },
    { name: "床边提问", code: "床边提问" },
    { name: "床边考核", code: "床边考核" },
    { name: "个案汇报", code: "个案汇报" }
  ]

  // 必填项
  const rules: Rules = {
    nurseHierarchy: val => !!val || "层级不能为空",
    officialRank: val => !!val || "职称不能为空",
    trainingKeyPointId: val => !!val || "类型名称不能为空",
    knowledgePointDivisionId: val => !!val || "知识点划分不能为空",
    learningFormId: val => !!val || "教学方式不能为空",
    assessmentForm: val => !!val || "考核形式不能为空"
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
      trainingManualModal.knowledgePointDivisionTree = trainingManualModal.trainingKeyPointTree.find((item: any) => item.id == knowledgePointDivisionVal)
    }
    if (learningFormVal) {
      trainingManualModal.learningFormTree = trainingManualModal.knowledgePointDivisionTree.childList.find((o: any) => o.id == learningFormVal)
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
          const { nurseHierarchy, trainingKeyPointId, knowledgePointDivisionId, learningFormId, assessmentForm } = params;
          getTree(trainingKeyPointId, knowledgePointDivisionId)
          current.setFields({
            nurseHierarchy,
            officialRank: getOfficialRank(nurseHierarchy),
            trainingKeyPointId,
            knowledgePointDivisionId,
            learningFormId,
            assessmentForm
          });
        } else {
          // 新增清空内容，层级职称赋予默认值不可改
          current.clear();
          trainingManualModal.cleanInit()
          current.setFields({
            nurseHierarchy: trainingManualModal.tabKeyName,
            officialRank: getOfficialRank(trainingManualModal.tabKeyName)
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
            if (params.id) {
              newParams.id = params.id;
              setEditLoading(true);
              trainingManualApi.addOrUpdateTrainingListRecord(newParams).then(res => {
                setEditLoading(false);
                let msg = "培训计划修改成功";
                Message.success(msg);
                onOk();
              });
            } else {
              trainingManualApi.addOrUpdateTrainingListRecord(newParams).then(res => {
                setEditLoading(false);
                let msg = "培训计划添加成功";
                Message.success(msg);
                onOk(res);
              });
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
      onCancel={handleCancel}
      onOk={checkForm}
      confirmLoading={editLoading}
      title={params.id ? "修改" : "添加"}
    >
      <Wrapper>
        <Form ref={formRef} rules={rules} onChange={onFormChange}>
          <Row>
            <Col span={5} className="label">
              层级:
            </Col>
            <Col span={19}>
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
            <Col span={5} className="label">
              职称:
            </Col>
            <Col span={19}>
              <Form.Field name="officialRank">
                <Input placeholder="名称" disabled />
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={5} className="label">
              类型名称:
            </Col>
            <Col span={19}>
              <Form.Field name="trainingKeyPointId">
                <Select>
                  {trainingManualModal.trainingKeyPointTree.map((item: any) => (
                    <Select.Option value={item.id} key={item.name}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={5} className="label">
              知识点划分:
            </Col>
            <Col span={19}>
              <Form.Field name="knowledgePointDivisionId">
                <Select>
                  {trainingManualModal.knowledgePointDivisionTree.childList && trainingManualModal.knowledgePointDivisionTree.childList.map((item: any) => (
                    <Select.Option value={item.id} key={item.name}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={5} className="label">
              教学方式:
            </Col>
            <Col span={19}>
              <Form.Field name="learningFormId">
                <Select>
                  {trainingManualModal.learningFormTree.childList && trainingManualModal.learningFormTree.childList.map((item: any) => (
                    <Select.Option value={item.id} key={item.name}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={5} className="label">
              考核形式:
            </Col>
            <Col span={19}>
              <Form.Field name="assessmentForm">
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
