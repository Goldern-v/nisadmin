import styled from "styled-components";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { Input, Row, Col, Modal, message as Message, Select, Button, InputNumber, AutoComplete, Checkbox, Tag } from "antd";
import Form from "src/components/Form/Form";
import { Rules } from "src/components/Form/interfaces";
import { appStore } from "src/stores";
import DateTimePicker from "src/components/DateTimePicker";
import moment from "moment";
import { trainingResultService } from '../api/TrainingResultService'
export interface Props {
  visible: boolean;
  onCancel: any;
  onOk: any;
  onOkCallBack?: any;
}

export default function AddExamPaperModal(props: Props) {
  const { visible, onCancel, onOk } = props;
  const [editLoading, setEditLoading] = useState(false);
  const [allFormData, setAllFormData] = useState(
    {
      startTime: '',
      examDuration: '',
      openTime: '',
      openTimeUnit: "天",
      daysToArchive: 7,
    }
  );
  const formRef = React.createRef<Form>();
  // 不考时长单位
  const openTimeUnitList = [
    { name: "小时", code: "小时" },
    { name: "天", code: "天" },
    { name: "周", code: "周" }
  ];
  const [allUserList, setAllUserList]: any = useState([]);// 所有人员列表
  const [searchUserList, setSearchUserList]: any = useState([]);// 人员搜索列表
  const [searchWord, setSearchWord]: any = useState("");// 关键字搜索
  const [getCheckedbox, setGetCheckedbox]: any = useState([]); //选中的多选框
  const [checkedUserList, setCheckedUserList]: any = useState([]);// 选中人员
  const [people, setPeople]: any = useState([]);// 选中人员

  // 弹窗必填项
  const rules: Rules = {
    startTime: val => !!val || "补考开始时间不能为空",
    examDuration: val => !!val || "补考时长不能为空",
    openTime: val => !!val || "补考开放时长不能为空",
    openTimeUnit: val => !!val || "单位不能为空",
    daysToArchive: val => !!val || "归档不能为空",
  };


  // 设置初始值
  useEffect(() => {
    if (visible) {
      getAllUser()
    }
  }, [visible]);

  useLayoutEffect(() => {
    formRef.current && formRef.current.setFields({
      daysToArchive: 7,
      openTimeUnit: '天',
    });
  }, []);


  // 获取所有人员列表
  const getAllUser = () => {
    let obj: any = {
      cetpId: appStore.queryObj.id,
      keyWord: '',
      maxReturnCount: ''
    }
    trainingResultService.getParticipants(obj).then(res => {
      res.data && setAllUserList(res.data)
    });
  }

  // 保存
  const checkForm = () => {
    // 补考人员不能为空
    if (!checkedUserList.length) {
      Message.error('补考人员不能为空');
      return
    };
    let current = formRef.current;
    if (current) {
      current
        .validateFields()
        .then(res => {
          current = formRef.current;
          if (current) {
            let newParams = current.getFields();
            newParams.cetpId = appStore.queryObj.id
            newParams.participantList = checkedUserList;
            if (['nys'].includes(appStore.HOSPITAL_ID)) {
              newParams.endTime = endTime()
            }
            setEditLoading(true);
            trainingResultService.addResitExam(newParams).then((res: any) => {
              setEditLoading(false);
              let msg = "添加补考成功";
              Message.success(msg);
              onOk();
              setGetCheckedbox([])
              initClean()
            }).catch(e => {
              setEditLoading(false);
              console.log(e);
            });
          }
        })
    }
  };

  // 关闭弹窗
  const handleCancel = () => {
    if (editLoading) return;
    onCancel && onCancel();
    initClean()
  };

  // 表单变化函数
  const onFormChange = (name: string, value: any, from: Form) => {
    let data = from.getFields();
    setAllFormData(data)
    endTime()
    overTime()
  };

  // 计算考试开放结束时间
  const endTime = () => {
    if (
      allFormData.startTime &&
      allFormData.openTime &&
      allFormData.openTimeUnit
    ) {
      let unitMap: any = {
        小时: "h",
        天: "d",
        周: "w"
      };
      return moment(allFormData.startTime)
        .add(allFormData.openTime, unitMap[allFormData.openTimeUnit])
        .format("YYYY-MM-DD HH:mm");
    }
    return "";
  }

  // 计算归档时间
  const overTime = () => {
    if (allFormData.startTime && allFormData.daysToArchive) {
      if (
        allFormData.startTime &&
        allFormData.openTime &&
        allFormData.openTimeUnit
      ) {
        let unitMap: any = {
          小时: "h",
          天: "d",
          周: "w"
        };
        return moment(allFormData.startTime)
          .add(allFormData.openTime, unitMap[allFormData.openTimeUnit])
          .add(allFormData.daysToArchive, "d")
          .format("YYYY-MM-DD HH:mm");
      }
      return moment(allFormData.startTime)
        .add(allFormData.daysToArchive, "d")
        .format("YYYY-MM-DD HH:mm");
    }
    return "";
  }

  //通过关键字搜索添加补考成员
  const onSelect = (ev: any) => {
    let selectedUser = searchUserList.find((item: any) => item.key === ev);
    let selectedUserCheck = people.find((item: any) => item.empNo === ev);
    setCheckedUserList((prevList: any[]) => {
      let user = prevList.find((item: any) => item.key === ev);
      if (!user) {
        return [...prevList, selectedUser];
      } else {
        Message.warning("已经添加过改成员了！");
        return [...prevList];
      }
    });
    setGetCheckedbox((prevList: any[]) => {
      let user = prevList.find((item: any) => item.empNo === ev);
      if (!user) {
        return [...prevList, selectedUserCheck];
      } else {
        Message.warning("已经添加过改成员了！");
        return [...prevList];
      }
    });
  };
  //关键字搜索补考成员列表
  const handleSearch = (value: any) => {
    setSearchWord(value);
    let obj: any = {
      cetpId: appStore.queryObj.id,
      keyWord: value,
      maxReturnCount: value ? '' : 100
    }
    trainingResultService.getParticipants(obj).then(res => {
      setPeople(res.data)
      setSearchUserList(
        res.data.map((item: any) => ({
          ...item,
          label: item.empName,
          key: item.empNo,
          value: item.empNo,
          text: item.empName
        }))
      );
    });
  };

  // 关闭标签
  const closeTag = (e: any, item: any) => {
    setCheckedUserList(checkedUserList.filter((o: any) => o.empNo !== item.empNo))
    setGetCheckedbox(getCheckedbox.filter((o: any) => o.empNo !== item.empNo))
  }
  // 置空
  const onClean = () => {
    setCheckedUserList([]);
    setGetCheckedbox([])
  };

  // 清空数据
  const initClean = () => {
    setAllFormData(
      {
        startTime: '',
        examDuration: '',
        openTime: '',
        openTimeUnit: "",
        daysToArchive: 7,
      }
    )
  }
  return (
    <Modal
      width={800}
      visible={visible}
      onCancel={handleCancel}
      onOk={checkForm}
      title='补考设置'
      footer={
        <div style={{ textAlign: "center" }}>
          <Button onClick={handleCancel}>取消</Button>
          <Button type="primary" onClick={checkForm} loading={editLoading}>
            确定
          </Button>
        </div>
      }
    >
      <Wrapper>
        <Form ref={formRef} onChange={onFormChange} rules={rules}>
          <Row>
            <Col span={4} className="label">
              补考开始时间
            </Col>
            <Col span={20}>
              <Form.Field name="startTime">
                <DateTimePicker />
              </Form.Field>
            </Col>
          </Row>
          <DateSelectCon>
            <div className="date-row">
              <span className="date-label">补考时长</span>
              <Form.Field label={``} name="examDuration" labelWidth={1}>
                <InputNumber />
              </Form.Field>分钟
            </div>
            <div className="date-row">
              <span className="date-label">补考开放时长</span>
              <Form.Field label={``} name="openTime" labelWidth={1}>
                <InputNumber />
              </Form.Field>
              <Form.Field label={``} name="openTimeUnit" labelWidth={1}>
                <Select>
                  {openTimeUnitList.map(item => (
                    <Select.Option value={item.code} key={item.name}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Field>
              <span className="aside">
                {endTime()
                  ? `即：${endTime()} 结束`
                  : ""}
              </span>
            </div>
            <div className="date-row">
              <span className="date-label">补考结束</span>
              <Form.Field label={``} name="daysToArchive" labelWidth={1}>
                <InputNumber min={2} />
              </Form.Field>天后进行归档{" "}
              <span className="aside">
                {overTime() ? `即：${overTime()}` : ""}
              </span>
            </div>
          </DateSelectCon>
        </Form>
        <PeopleSelectCon>
          <div>补考人员设置</div>
          <div className='peopleSelection'>
            <AllPeople>
              <AutoComplete
                dataSource={searchUserList}
                style={{ width: "85%", margin: "10px 0 10px 18px" }}
                onSelect={onSelect}
                onSearch={handleSearch}
                value={searchWord}
              >
                <Input.Search placeholder="请输入人员名字关键字" />
              </AutoComplete>
              <AllCheckBox>
                <Checkbox.Group
                  className="label"
                  value={getCheckedbox}
                  onChange={(checkedValue: any) => {
                    setCheckedUserList(
                      checkedValue.map((item: any) => ({
                        ...item,
                        label: item.empName,
                        key: item.empNo,
                        value: item.empNo,
                        text: item.empName
                      }))
                    );
                    setGetCheckedbox(checkedValue)
                  }}
                >
                  {allUserList &&
                    allUserList.map((item: any, index: any) => {
                      return (
                        <div className="box" key={index}>
                          <Checkbox className="li" value={item}>
                            {item.empName} <span className={item.totalScores < 60 ? 'noPass' : 'pass'}>({item.totalScores}分)</span>
                          </Checkbox>
                        </div>
                      );
                    })}
                </Checkbox.Group>
              </AllCheckBox>
            </AllPeople>
            <SelectedPeople>
              {checkedUserList &&
                checkedUserList.map((item: any, index: any) => (
                  <Tag
                    key={index}
                    className="empNames"
                    closable
                    onClose={(e: any) => {
                      closeTag(e, item);
                    }}
                  >
                    {item.empName}
                  </Tag>
                ))
              }
              <div className="footer-con">
                <Button onClick={onClean}>重置</Button>
              </div>
            </SelectedPeople>
          </div>
        </PeopleSelectCon>
      </Wrapper>
    </Modal>
  );
}
const AllCheckBox = styled.div`
  width: 80%;
  margin: 0 0 10px 18px;
  height: 215px;
  overflow-y: scroll;
  .box {
      width: 100%;
      position: relative;
      line-height: 30px;
      color: rgba(0, 0, 0, 0.65);
      background-color: #fafafa;
      border: 1px solid #e8e8e8;
      margin: 0 0 10px 10px;
      padding: 0 10px;
      box-sizing: border-box;
      border-radius: 5px;
      height: 30px;
    }
  .li {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    .noPass {
      color: red;
    }
    .pass {
      color: blue
    }
  }
`
const PeopleSelectCon = styled.div`
  .peopleSelection {
    width: 100%;
    height: 280px;
    border: 1px solid #ccc;
    margin-top: 10px;
    border-radius: 5px;
    display: flex;
  }
`
const AllPeople = styled.div`
  flex:4;
  border-right: 1px solid #ccc;
  width: 100%;
  height: 280px;
  overflow-y: scroll;
`
const SelectedPeople = styled.div`
  flex:6;
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  .empNames {
    margin-bottom: 10px;
  }
  .footer-con {
    position: absolute;
    right: 95px;
    bottom: 85px;
    button {
      margin-left: 15px;
    }
  }
`

const Wrapper = styled.div`
  width: 85%;
  margin: 0 auto;
  .label {
    line-height: 32px;
  }
  .ant-switch {
    margin-left: 10px;
    margin-top: 8px;
  }
`;
const DateSelectCon = styled.div`
  .date-row {
    display: flex;
    align-items: center;
    height: 32px;
    margin-bottom: 20px;
    padding-left: 105px;
    font-size: 14px;
    .select-item {
      width: 120px;
      margin-left: 20px;
    }
    .aside {
      font-size: 12px;
      color: #666;
    }
    .date-label {
      margin-right: 20px;
    }
  }
  .label {
    width: 0;
    margin: 0;
  }
  .formField-wrapper {
    margin: 0;
  }
  .formField-container {
    width: 100px;
    margin-right: 20px;
  }
`;
