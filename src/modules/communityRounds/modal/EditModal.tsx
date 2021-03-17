import styled from "styled-components";
import { observer } from "mobx-react-lite";
import React, { useState, useEffect } from "react";
import { Input, Row, Col, Modal, message as Message, Select, DatePicker } from "antd";
import Form from "src/components/Form/Form";
import { Rules } from "src/components/Form/interfaces";
import { checkWardService } from "../services/CheckWardService";
import { appStore, authStore } from "src/stores";
import moment from 'moment'
import MultiFileUploader, { FileItem } from '../components/MultiFileUploader'

export interface Props {
  visible: boolean;
  params: any;
  onCancel: any;
  onOk: any;
  onOkCallBack?: any;
}

export default observer(function EditModal(props: Props) {
  const { visible, params, onCancel, onOk } = props;
  const [editLoading, setEditLoading] = useState(false);
  const formRef = React.createRef<Form>();
  const communityList: any = [
    { name: "前进社区", code: "前进社区" },
    { name: "汉水社区", code: "汉水社区" },
    { name: "吉田社区", code: "吉田社区" },
    { name: "满春社区", code: "满春社区" },
    { name: "六角社区", code: "六角社区" },
  ]
  const keyPointsList: any = [
    { name: "基础护理", code: "基础护理" },
    { name: "科室管理", code: "科室管理" },
    { name: "技术水平-护士操作规范", code: "技术水平-护士操作规范" },
    { name: "安全管理", code: "安全管理" },
    { name: "职责制度", code: "职责制度" },
    { name: "护理服务", code: "护理服务" },
  ]
  const [peopleAttachList, setPeopleAttachList] = useState([] as FileItem[])
  const [contentAttachList, setContentAttachList] = useState([] as FileItem[])
  const [srDate, setSrDate] = useState(moment().format("YYYY-MM-DD HH:mm"))
  const [allData, setAllData] = useState({} as any)

  // 弹窗必填项
  const rules: Rules = {};

  // 初始化数据
  useEffect(() => {
    if (visible) {
      setTimeout(async () => {
        let current = formRef.current;
        if (!current) return;
        let dataAll: any = {}
        if (params.id) {
          await checkWardService.getDetail(params.id).then((res: any) => {
            dataAll = res.data
            setAllData(res.data || {})
          })
          let data: any = dataAll.pageItem || {};
          const { empName, community, keyPoints, existProblems, improvement, recordExpand, srContent, lecturer, lectureContent, lectureExpand } = data;
          current.setFields({
            empName,
            community,
            keyPoints: keyPoints.split(","),
            existProblems,
            improvement,
            recordExpand,
            srContent,
            lecturer,
            lectureContent,
            lectureExpand
          });
          setSrDate(moment(srDate).format("YYYY-MM-DD HH:mm"))
          setPeopleAttachList(dataAll.attachment ?.filter((item: any) => item.type == '0'))
          setContentAttachList(dataAll.attachment ?.filter((item: any) => item.type == '1'))
        } else {
          current.clear();
          setSrDate(moment().format("YYYY-MM-DD HH:mm"));
          setPeopleAttachList([]);
          setContentAttachList([]);
          // 人员为当前登陆人员  默认默认不可修改
          current.setFields({ empName: authStore.user ?.empName });
        }
      }, 100);
    }
  }, [visible, params.id]);

  // 获取附件id合并string
  const getAttachListIds = (data: any, type?: any) => {
    if (data && data.length) {
      let str = '';
      let semicolon = "";
      data.map((item: any, index: any) => {
        let text = type ? item : item.id || "";
        semicolon = text && index !== data.length - 1 ? "," : "";
        str += text + semicolon;
      })
      return str
    }
  }

  const checkForm = () => {
    let current = formRef.current;
    if (current) {
      current
        .validateFields()
        .then(res => {
          current = formRef.current;
          if (current) {
            let newParams = current.getFields();
            // 日期 检查重点格式转化
            newParams.srDate = srDate ? moment(srDate).format("YYYY-MM-DD HH:mm") : moment().format("YYYY-MM-DD HH:mm");
            newParams.keyPoints = getAttachListIds(newParams.keyPoints, 'keyPoints')
            // 公共数据处理
            let record: any = { ...newParams }
            let pageItem: any = {
              ...newParams,
              empName: authStore.user ?.empName,
              empNo: authStore.user ?.empNo,
              lecturerAttachmentId: getAttachListIds(peopleAttachList),
              contentAttachmentId: getAttachListIds(contentAttachList)
            }
            let attachmentList: any = [...peopleAttachList, ...contentAttachList]
            if (params.id) {
              record.id = allData.record.id;
              record.status = allData.record.status;
              pageItem.id = allData.pageItem.id;
              pageItem.recordId = allData.pageItem.recordId;
              setEditLoading(true);
              let obj: any = {
                record,
                pageItem,
                attachmentList
              }
              checkWardService.saveOrUpdate(obj).then(res => {
                setEditLoading(false);
                let msg = "查房记录修改成功";
                Message.success(msg);
                onOk();
              });
            } else {
              let obj: any = {
                record,
                pageItem,
                attachmentList
              }
              checkWardService.saveOrUpdate(obj).then(res => {
                setEditLoading(false);
                let msg = "查房记录添加成功";
                Message.success(msg);
                onOk();
              });
            }
          }
        })
        .catch(e => {
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
      width={800}
      visible={visible}
      onCancel={handleCancel}
      onOk={checkForm}
      confirmLoading={editLoading}
      title={params.id ? "修改" : "添加"}
    >
      <Wrapper>
        <Form ref={formRef} rules={rules}>
          <Row>
            <Col span={3} className="label">
              时间:
            </Col>
            <Col span={20}>
              <Form.Field>
                <DatePicker
                  showTime
                  value={moment(srDate)}
                  format="YYYY-MM-DD HH:mm"
                  onChange={(data: any) => setSrDate(data.format('YYYY-MM-DD HH:mm') || moment().format("YYYY-MM-DD HH:mm"))}
                />
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={3} className="label">
              人员:
            </Col>
            <Col span={20}>
              <Form.Field name="empName">
                <Input placeholder="请输入人名" disabled />
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={3} className="label">
              社区:
            </Col>
            <Col span={20}>
              <Form.Field name="community">
                <Select>
                  {communityList.map((item: any) => (
                    <Select.Option value={item.code} key={item.name}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={3} className="label">
              检查重点:
            </Col>
            <Col span={20}>
              <Form.Field name="keyPoints">
                <Select mode="multiple">
                  {keyPointsList.map((item: any) => (
                    <Select.Option value={item.code} key={item.name}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Field>
            </Col>
          </Row>
          <div className='title'>一、本周质控检查记录</div>
          <Row>
            <Col span={3} className="label">
              存在问题:
            </Col>
            <Col span={20}>
              <Form.Field name="existProblems">
                <Input.TextArea autosize={{ minRows: 3 }} placeholder="请输入存在问题" />
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={3} className="label">
              持续改进:
            </Col>
            <Col span={20}>
              <Form.Field name="improvement">
                <Input.TextArea autosize={{ minRows: 3 }} placeholder="请输入需要持续改进的地方" />
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={3} className="label">
              其他:
            </Col>
            <Col span={20}>
              <Form.Field name="recordExpand">
                <Input.TextArea autosize={{ minRows: 3 }} placeholder="请输入补充内容" />
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={3}>附件:</Col>
            <Col span={20}>
              <UploadWrapper>
                <MultiFileUploader
                  type='0'
                  data={peopleAttachList}
                  onChange={(attachList: FileItem[]) => setPeopleAttachList(attachList)}
                />
              </UploadWrapper>
            </Col>
          </Row>
          <div className='title'>二、护理业务查房</div>
          <Row>
            <Col span={3} className="label">
              查房内容:
            </Col>
            <Col span={20}>
              <Form.Field name="srContent">
                <Input.TextArea autosize={{ minRows: 3 }} placeholder="请输入查房内容" />
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={3} className="label">
              小讲课人员:
            </Col>
            <Col span={20}>
              <Form.Field name="lecturer">
                <Input.TextArea autosize={{ minRows: 3 }} placeholder="请输入小讲课人员" />
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={3} className="label">
              小讲课内容:
            </Col>
            <Col span={20}>
              <Form.Field name="lectureContent">
                <Input.TextArea autosize={{ minRows: 3 }} placeholder="请输入小讲课内容" />
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={3} className="label">
              其他:
            </Col>
            <Col span={20}>
              <Form.Field name="lectureExpand">
                <Input.TextArea autosize={{ minRows: 3 }} placeholder="请输入补充内容" />
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={3}>附件:</Col>
            <Col span={20}>
              <UploadWrapper>
                <MultiFileUploader
                  type='1'
                  data={contentAttachList}
                  onChange={(attachList: FileItem[]) => setContentAttachList(attachList)}
                />
              </UploadWrapper>
            </Col>
          </Row>
        </Form>
      </Wrapper>
    </Modal>
  );
})
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
  .title {
    font-size: 14px;
    font-weight: 900;
    margin: 15px 0;
  }
`;
const UploadWrapper = styled.div`
  &>div{
    float: left;
    margin-bottom: 15px;
  }
`