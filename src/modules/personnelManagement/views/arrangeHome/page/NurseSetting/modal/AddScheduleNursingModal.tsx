import styled from "styled-components";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { RouteComponentProps } from "react-router";
import {
  Modal,
  Input,
  Button,
  Radio,
  DatePicker,
  Select,
  Row,
  Col,
  message,
  Icon
} from "antd";
import { ModalComponentProps } from "src/libs/createModal";
import Form from "src/components/Form";

import { to } from "src/libs/fns";
import { Rules } from "src/components/Form/interfaces";
import { appStore, authStore } from "src/stores";
import moment from "moment";

import loginViewModel from "src/modules/login/LoginViewModel";
// 加附件
import ImageUploader from "src/components/ImageUploader";
import emitter from "src/libs/ev";

import service from "src/services/api";
import {
  TITLE_LIST,
  POST_LIST,
  CURRENTLEVEL_LIST
} from "src/modules/nurseFiles/view/nurseFiles-hj/views/nurseFilesList/modal/AddNursingModal";
import { statisticsViewModal } from "src/modules/nurseFiles/view/statistics/StatisticsViewModal";
import { Spin } from "src/vendors/antd";
import { DictItem } from "src/services/api/CommonApiService";
const Option = Select.Option;
export interface Props extends ModalComponentProps {
  getTableData?: () => void;
}
const uploadCard = () => Promise.resolve("123");
const rules: Rules = {
  empName: val => !!val || "请输入姓名"
};

if (appStore.HOSPITAL_ID == "wh") {
  rules.userType = val => !!val || "请选择类型";
}

const TYPE_LIST = ["实习", "进修"];
export default function AddScheduleNursingModal(props: Props) {
  let { visible, onCancel, onOk, getTableData } = props;
  const [title, setTitle]: any = useState("");
  const [titleList, setTitleList]: any = useState([]);
  const [postList, setPostList]: any = useState([]);
  const [levelList, setLevelList]: any = useState([]);
  const [userTypeList, setUserTypeList]: any = useState([]);
  const [modalLoading, setModalLoading]: any = useState(false);
  let refForm = React.createRef<Form>();

  const onFieldChange = () => {};

  const onSave = async () => {
    if (!refForm.current) return;

    let [err, value] = await to(refForm.current.validateFields());

    if (err) return;
    value.deptName = authStore.selectedDeptName;
    value.deptCode = authStore.selectedDeptCode;
    if (value.startDate !== undefined)
      value.startDate = value.startDate
        ? value.startDate.format("YYYY-MM-DD")
        : "";
    service.scheduleUserApiService.saveOrUpdate(value).then(res => {
      message.success("保存成功");
      getTableData && getTableData();
    });
  };

  useLayoutEffect(() => {
    if (refForm.current && visible) refForm!.current!.clean();
    /** 如果是修改 */
    if (refForm.current && visible) {
      appStore.hisAdapter({
        hj: () => {
          refForm!.current!.setFields({
            empName: "",
            sex: "1",
            newTitle: "",
            nurseHierarchy: "",
            job: ""
          });
        },
        wh: () => {
          refForm!.current!.setFields({
            empName: "",
            sex: "1",

            userType: "",
            startDate: moment()
          });
        }
      });

      setTitle("添加排班人员");
      setModalLoading(true);
      statisticsViewModal.initDict().then(res => {
        setTitleList(statisticsViewModal.getDict("技术职称"));
        setPostList(statisticsViewModal.getDict("职务"));
        setLevelList(statisticsViewModal.getDict("层级"));
        setModalLoading(false);
      });
      service.commonApiService.dictInfo("sch_wh_user_type").then(res => {
        setUserTypeList(res.data);
      });
      // refForm.current.setField('unit', 123)
    }
  }, [visible]);

  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={onCancel}
      onOk={onSave}
      okText="保存"
      forceRender
      width={480}
    >
      <Spin spinning={modalLoading}>
        <Form
          ref={refForm}
          labelWidth={60}
          onChange={onFieldChange}
          rules={rules}
        >
          <Row>
            <Col span={24}>
              <Form.Field label={`姓名`} name="empName" required>
                <Input />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`姓别`} name="sex">
                <Select>
                  <Select.Option value="0" key={0}>
                    男
                  </Select.Option>
                  <Select.Option value="1" key={1}>
                    女
                  </Select.Option>
                </Select>
              </Form.Field>
            </Col>

            {appStore.hisAdapter({
              hj: () => (
                <React.Fragment>
                  <Col span={24}>
                    <Form.Field label={`职称`} name="newTitle">
                      <Select>
                        {TITLE_LIST.map((item: string) => (
                          <Select.Option value={item} key={item}>
                            {item}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Field>
                  </Col>
                  <Col span={24}>
                    <Form.Field label={`层级`} name="nurseHierarchy">
                      <Select
                        showSearch
                        filterOption={(input: any, option: any) =>
                          option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                        style={{ width: "100%" }}
                        placeholder="选择层级"
                      >
                        {CURRENTLEVEL_LIST.map((item: string) => (
                          <Select.Option value={item} key={item}>
                            {item}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Field>
                  </Col>
                  <Col span={24}>
                    <Form.Field label={`职务`} name="job">
                      <Select>
                        {POST_LIST.map((item: string) => (
                          <Select.Option value={item} key={item}>
                            {item}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Field>
                  </Col>
                </React.Fragment>
              ),
              wh: () => (
                <React.Fragment>
                  <Col span={24}>
                    <Form.Field label={`类型`} name="userType" required>
                      <Select>
                        {userTypeList.map((item: DictItem) => (
                          <Select.Option value={item.code} key={item.name}>
                            {item.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Field>
                  </Col>
                  <Col span={24}>
                    <Form.Field label={`开始时间`} name="startDate">
                      <DatePicker />
                    </Form.Field>
                  </Col>
                </React.Fragment>
              )
            })}
          </Row>
        </Form>
        <Aside>
          <Icon
            type="info-circle"
            style={{ color: "#fa8c16", marginRight: "5px" }}
          />
          {appStore.HOSPITAL_ID == "wh"
            ? "注：只能添加没有工号的人员，有工号的正式人员请联系管理员进行添加"
            : "注：只能添加没有工号的进修人员，有工号的正式人员请联系管理员进行添加"}
        </Aside>
      </Spin>
    </Modal>
  );
}
const Aside = styled.div`
  font-size: 12px;
  color: #666;
`;
