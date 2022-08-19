import moment from 'moment'
import Form from 'src/components/Form'
import ImageUploader from 'src/components/ImageUploader'
import emitter from 'src/libs/ev'
import loginViewModel from 'src/modules/login/LoginViewModel'
import service from 'src/services/api'
import styled from 'styled-components'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { Button, Col, DatePicker, Icon, Input, message, Modal, Radio, Row, Select } from 'antd'
import { ModalComponentProps } from 'src/libs/createModal'
import { observer } from 'mobx-react-lite'
import { to } from 'src/libs/fns'
import { Rules } from 'src/components/Form/interfaces'
import { appStore, authStore } from 'src/stores'
import {
  CURRENTLEVEL_LIST,
  POST_LIST,
  TITLE_LIST,
} from 'src/modules/nurseFiles/view/nurseFiles-hj/views/nurseFilesList/modal/AddNursingModal'
import { statisticsViewModal } from 'src/modules/nurseFiles/view/statistics/StatisticsViewModal'
import { Spin } from 'src/vendors/antd'
import { DictItem } from 'src/services/api/CommonApiService'

import { sheetViewModal } from '../../../viewModal/SheetViewModal'

// 加附件
const Option = Select.Option;
export interface Props extends ModalComponentProps {
  getTableData?: () => void;
  init?: boolean;
}
const uploadCard = () => Promise.resolve("123");
const rules: Rules = {
  empName: (val) => !!val || "请输入姓名",
};

if (["wh", "gzsrm","lyyz","qhwy", "ytll"].includes(appStore.HOSPITAL_ID)) {
  rules.userType = (val) => !!val || "请选择类型";
}

const TYPE_LIST = ["实习", "进修"];
export default observer(function AddScheduleNursingModal(props: Props) {
  let { visible, onCancel, onOk, getTableData, init } = props;
  const [title, setTitle]: any = useState("");
  const [titleList, setTitleList]: any = useState([]);
  const [postList, setPostList]: any = useState([]);
  const [levelList, setLevelList]: any = useState([]);
  const [userTypeList, setUserTypeList]: any = useState([]);
  const [nansanTypeList, setNansanTypeList]: any = useState([]);
  const [modalLoading, setModalLoading]: any = useState(false);
  let refForm = React.createRef<Form>();

  const onFieldChange = () => { };

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
    service.scheduleUserApiService.saveOrUpdate(value).then((res) => {
      message.success("保存成功");
      onCancel && onCancel();
      init && sheetViewModal.init();
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
            job: "",
          });
        },
        wh: () => {
          refForm!.current!.setFields({
            empName: "",
            sex: "1",

            userType: "",
            startDate: moment(),
          });
        },
        gzsrm: () => {
          refForm!.current!.setFields({
            empName: "",
            sex: "1",

            userType: "",
            startDate: moment(),
          });
        },
        lyyz: () => {
          refForm!.current!.setFields({
            empName: "",
            sex: "1",

            userType: "",
            startDate: moment(),
          });
        },
        qhwy: () => {
          refForm!.current!.setFields({
            empName: "",
            sex: "1",

            userType: "",
            startDate: moment(),
          });
        },
        ytll: () => {
          refForm!.current!.setFields({
            empName: "",
            sex: "1",

            userType: "",
            startDate: moment(),
          });
        },
      });

      setTitle("添加排班人员");
      // setModalLoading(true);

      const getDictInfo = appStore.hisMatch({
        map: {
          'wh,lyyz,qhwy,ytll': () => {
            statisticsViewModal.initDict().then((res) => {
              setTitleList(statisticsViewModal.getDict("技术职称"));
              setPostList(statisticsViewModal.getDict("职务"));
              setLevelList(statisticsViewModal.getDict("层级"));
              setModalLoading(false);
            });
            service.commonApiService
              .dictInfo("sch_wh_user_type")
              .then((res) => {
                setUserTypeList(res.data);
              });
          },
          gzsrm: () => {
            statisticsViewModal.initDict().then((res) => {
              setTitleList(statisticsViewModal.getDict("技术职称"));
              setPostList(statisticsViewModal.getDict("职务"));
              setLevelList(statisticsViewModal.getDict("层级"));
              setModalLoading(false);
            });
            service.commonApiService
              .dictInfo("sch_wh_user_type")
              .then((res) => {
                setUserTypeList(res.data);
              });
          },
          nys: () => {
            /** 层级 */
            service.commonApiService
              .dictInfo("user_new_hierarchy")
              .then((res) => {
                setLevelList(res.data);
              });

            /** 职务 */
            service.commonApiService.dictInfo("user_new_job").then((res) => {
              setPostList(res.data);
            });

            /** 职称 */
            service.commonApiService.dictInfo("user_new_title").then((res) => {
              setTitleList(res.data);
            });

            /** 类型 --南医三专有 */
            service.commonApiService
              .dictInfo("user_new_nansan_type")
              .then((res) => {
                setNansanTypeList(res.data);
              });
          },
          default: () => {
            service.commonApiService
              .dictInfo("sch_wh_user_type")
              .then((res) => {
                setUserTypeList(res.data);
              });
            /** 层级 */
            service.commonApiService
              .dictInfo("user_new_hierarchy")
              .then((res) => {
                setLevelList(res.data);
              });

            /** 职务 */
            service.commonApiService.dictInfo("user_new_job").then((res) => {
              setPostList(res.data);
            });

            /** 职称 */
            service.commonApiService.dictInfo("user_new_title").then((res) => {
              setTitleList(res.data);
            });
          },
        },
        vague: true,
      });
      getDictInfo();
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
            {appStore.HOSPITAL_ID == 'whyx' && <Col span={24}>
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
            }
            <Col span={24}>
              {appStore.HOSPITAL_ID !== "hj" ? (
                <Form.Field label={`姓名`} name="empName" required>
                  <Input />
                </Form.Field>
              ) : (
                <Form.Field label={`姓名`} name="empName">
                  <Select>
                    <Select.Option value="实习">实习</Select.Option>
                    <Select.Option value="进修">进修</Select.Option>
                  </Select>
                </Form.Field>
              )}
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
                        {titleList.map((item: any) => (
                          <Select.Option value={item.code} key={item.code}>
                            {item.name}
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
                        {levelList.map((item: any) => (
                          <Select.Option value={item.code} key={item.code}>
                            {item.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Field>
                  </Col>
                  <Col span={24}>
                    <Form.Field label={`职务`} name="job">
                      <Select>
                        {postList.map((item: any) => (
                          <Select.Option value={item.code} key={item.code}>
                            {item.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Field>
                  </Col>
                </React.Fragment>
              ),
              nys: () => (
                <React.Fragment>
                  <Col span={24}>
                    <Form.Field label={`工号`} name="empNo">
                      <Input />
                    </Form.Field>
                  </Col>
                  <Col span={24}>
                    <Form.Field label={`职称`} name="newTitle">
                      <Select>
                        {titleList.map((item: any) => (
                          <Select.Option value={item.code} key={item.code}>
                            {item.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Field>
                  </Col>
                  <Col span={24}>
                    <Form.Field label={`类型`} name="nurseHierarchy">
                      <Select
                        showSearch
                        filterOption={(input: any, option: any) =>
                          option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                        style={{ width: "100%" }}
                        placeholder="选择类型"
                      >
                        {nansanTypeList.map((item: any) => (
                          <Select.Option value={item.code} key={item.code}>
                            {item.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Field>
                  </Col>
                  <Col span={24}>
                    <Form.Field label={`职务`} name="job">
                      <Select>
                        {postList.map((item: any) => (
                          <Select.Option value={item.code} key={item.code}>
                            {item.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Field>
                  </Col>
                  <Col span={24}>
                    <Form.Field label={`周工时`} name="timeLimit">
                      <Input />
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
                  <Col span={24}>
                    <Form.Field label={`周工时`} name="timeLimit">
                      <Input />
                    </Form.Field>
                  </Col>
                </React.Fragment>
              ),
              gzsrm: () => (
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
                  <Col span={24}>
                    <Form.Field label={`周工时`} name="timeLimit">
                      <Input />
                    </Form.Field>
                  </Col>
                </React.Fragment>
              ),
              lyyz: () => (
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
                  <Col span={24}>
                    <Form.Field label={`周工时`} name="timeLimit">
                      <Input />
                    </Form.Field>
                  </Col>
                </React.Fragment>
              ),
              qhwy: () => (
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
                  <Col span={24}>
                    <Form.Field label={`周工时`} name="timeLimit">
                      <Input />
                    </Form.Field>
                  </Col>
                </React.Fragment>
              ),
              ytll: () => (
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
                  <Col span={24}>
                    <Form.Field label={`周工时`} name="timeLimit">
                      <Input />
                    </Form.Field>
                  </Col>
                </React.Fragment>
              ),
              nfzxy: () => (
                <React.Fragment>
                  <Col span={24}>
                    <Form.Field label={`职称`} name="newTitle">
                      <Select>
                        {titleList.map((item: any) => (
                          <Select.Option value={item.code} key={item.code}>
                            {item.name}
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
                        {levelList.map((item: any) => (
                          <Select.Option value={item.code} key={item.code}>
                            {item.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Field>
                  </Col>
                  <Col span={24}>
                    <Form.Field label={`职务`} name="job">
                      <Select>
                        {postList.map((item: any) => (
                          <Select.Option value={item.code} key={item.code}>
                            {item.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Field>
                  </Col>
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
          {["wh", "gzsrm","lyyz","qhwy", "ytll"].includes(appStore.HOSPITAL_ID)
            ? "注：只能添加没有工号的人员，有工号的正式人员请联系管理员进行添加"
            : "注：只能添加没有工号的进修人员，有工号的正式人员请联系管理员进行添加"}
        </Aside>
      </Spin>
    </Modal>
  );
});
const Aside = styled.div`
  font-size: 12px;
  color: #666;
`;
