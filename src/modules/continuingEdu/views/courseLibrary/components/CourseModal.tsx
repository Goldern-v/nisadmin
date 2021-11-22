import { Modal, Row, Col, Input, Radio, Select, message, Button, InputNumber } from "antd";
import { observer } from "mobx-react";
import React, {
  createRef,
  useState,
  useLayoutEffect,
  ChangeEvent,
} from "react";
import { ModalComponentProps } from "src/libs/createModal";
import styled from "styled-components";
import Form from "src/components/Form";
import { courseLibraryModal, RadioItem } from "../modal";
import Zimage from "src/components/Zimage";
import { getFileType, getFilePrevImg } from "src/utils/file/file";
import { courseLibraryApi, getResponseData } from "../api/courseLibraryApi";
import { authStore } from "src/stores";

export interface Prop extends ModalComponentProps {
  courseType?: string;
  data?: any;
  modalType: number; // 弹窗类型 0: 新建 1: 修改 2: 查看
  onOkCallback?: () => void
}

export default observer(function courseModal(props: Prop) {
  const { visible, data, onCancel, modalType, courseType, onOkCallback } = props;
  const refForm = createRef<Form>();
  const titleArr = ["添加课件", "修改", "查看"];
  const [loading, setLoading] = useState(false);

  const setStatusList = () => {
    const type = data ? data.type : courseType;
    switch (type) {
      case 1:
        return [
          {
            label: "全院可见",
            value: "1",
          },
          {
            label: "授权可见",
            value: "2",
          },
        ];
      case 2:
        return [
          {
            label: "个人可见",
            value: "3",
          },
        ];
      default:
        return [];
    }
  };
  let statusList: RadioItem[] = setStatusList();
  const downloadList = [
    {
      label: "是",
      value: 1,
    },
    {
      label: "否",
      value: 0,
    },
  ];
  const durationTypeList = [
    {
      name: "时",
      code: "h",
      multi: 3600
    },
    {
      name: "分",
      code: "m",
      multi: 60
    },
    {
      name: "秒",
      code: "s",
      multi: 1
    },
  ];
  const defaultFormData = () => {
    if (data) return data;
    let state = statusList.length > 0 ? statusList[0].value : "";
    return {
      courseName: "",
      duration: "",
      durationType: durationTypeList[0].code,
      isDownload: 1,
      state,
      remark: "",
    };
  };
  const [formData, setFormData] = useState(defaultFormData);
  // 表单数据修改时触发
  const onFormChange = (name: string, value: any, from: Form) => {
    let data = from.getFields();
    Object.assign(formData, data);
    setFormData(formData);
  };
  const fileInputRef = createRef<HTMLInputElement>();
  // 上传文件
  const updateFile = () => {
    fileInputRef.current && fileInputRef.current.click();
  };
  const [courseFile, setCourseFile] = useState({} as any)
  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.persist();
    let files = e.target.files || [];
    // 视频只允许MP4格式
    const videoExtList = [
      "avi",
      "rmvb",
      "rm",
      "asf",
      "divx",
      "mpg",
      "mpeg",
      "mpe",
      "wmv",
      "mkv",
      "vob",
    ];
    console.log("test-files", files);
    // 过滤不符合的后缀的文件
    let fileExtList: any = [];
    for (let key in files) {
      let name = files[key].name;
      if (Number(key) <= files.length - 1) {
        var index = name.lastIndexOf(".");
        var ext = name.substr(index + 1);
        fileExtList.push(ext);
      }
    }
    let isOk = fileExtList.find((item: any) => videoExtList.indexOf(item) > -1);
    if (isOk) {
      message.warning("暂时只支持上传MP4格式视频！");
      return;
    }
    let hideLoading = message.loading("正在上传，请稍等", 0);

    let postData = new FormData();
    postData.append("file", files[0]);
    getResponseData(() => courseLibraryApi.updateFile(postData))
      .then((res) => {
        console.log("test-res", res);
        // const data = {
        //   ...formData,
        //   file: res,
        // };
        // Object.assign(formData,  { file: res })
        // setFormData(formData);
        // console.log('test-form', formData)
        setCourseFile(res)
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        hideLoading();
      });
  };
  const onSave = () => {
    console.log("test-ormData", formData);
    let errMsgList = [] as string[];
    if (!formData.courseName) {
      errMsgList.push("课件名称不能为空");
    }
    if (!courseFile) {
      errMsgList.push("课件不能为空");
    }
    if (!formData.duration || formData.duration <= 0) {
      errMsgList.push("课件时长不能为空或小于等于0");
    }
    if (errMsgList.length > 0) {
      errMsgList.length > 1
        ? Modal.error({
            title: "提示",
            content: (
              <div>
                {errMsgList.map((errMsg: string, idx: number) => (
                  <div key={idx}>{errMsg}</div>
                ))}
              </div>
            ),
          })
        : message.error(errMsgList[0]);

      return;
    }
    setLoading(true);
    let { duration, durationType, ...other } = formData;
    let params = {
      ...other,
      viewingTime: duration * (durationTypeList.find(v => v.code === durationType)?.multi || 1),
      field_2	: data ? data.type : courseType,
      attachmentId: courseFile.id
    };
    data && (params = { ...params , id: data.id })
    getResponseData(() => courseLibraryApi.saveOrUpdate(params)).then(res => {
      console.log('test-res', res)
      message.success('保存成功')
      onOkCallback && onOkCallback()
    }).catch(err => {
      console.log(err)
    }).finally(() => {
      setLoading(false)
    })
  };
  // 初始化数据
  useLayoutEffect(() => {
    // if (!visible) return;
    if (refForm.current && visible) refForm!.current!.clean();
    setFormData(defaultFormData);
    console.log("test-formData", formData);
    setCourseFile({})
    /** 如果是修改 */
    refForm.current && refForm!.current!.setFields(formData);
  }, [visible]);

  return (
    <Modal
      width={500}
      title={titleArr[modalType]}
      visible={visible}
      onCancel={onCancel}
      onOk={onSave}
      destroyOnClose
      confirmLoading={loading}
      okText="保存"
      forceRender
      centered
    >
      <Wrapper>
        <Form ref={refForm} labelWidth={70} onChange={onFormChange}>
          <Row>
            <Col span={24}>
              <Form.Field label="课件名称：" name="courseName">
                <Input value={formData.courseName} />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label="上传课件：" name="file">
                <FileBox>
                  {!courseFile.id ? (
                    <Button type="primary" onClick={updateFile}>
                      上传课件
                    </Button>
                  ) : (
                    <div className="file-box__item">
                      {getFileType(courseFile.path) == "img" ? (
                        <Zimage
                          src={courseFile.path}
                          className="type-img"
                          alt=""
                        />
                      ) : (
                        <img
                          src={getFilePrevImg(courseFile.path)}
                          className="type-img"
                          alt=""
                        />
                      )}
                      <div className="name">{courseFile.name}</div>
                      <Button type="primary" onClick={() => {}}>
                        预览
                      </Button>
                    </div>
                  )}
                  <div className="tip">
                    *仅支持上传.word、.pdf、.excel、ppt、.mp4、图片等类型文件
                  </div>
                </FileBox>
              </Form.Field>
            </Col>
            <Col span={24} className="duration">
              <Form.Field label="观看时长：" name="duration">
                <InputNumber min={0.1} value={formData.duration} />
              </Form.Field>
              <Form.Field labelWidth={0} name="durationType">
                <Select value={formData.durationType}>
                  {durationTypeList.map((val: any) => (
                    <Select.Option value={val.code} key={val.code}>
                      {val.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label="允许下载：" name="isDownload">
                <Radio.Group
                  options={downloadList}
                  value={formData.isDownload}
                />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`状    态：`} name="state">
                <Radio.Group options={statusList} value={formData.state} />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={"备   注："} name="remark">
                <Input.TextArea rows={4} value={formData.remark} />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label="上传人：">
                <div className="person__content">{modalType === 0 ? authStore.user && authStore.user.empName : data && data.empName}</div>
              </Form.Field>
            </Col>
          </Row>
        </Form>
        <input
          type="file"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={onFileChange}
          multiple={false}
        />
      </Wrapper>
    </Modal>
  );
});

const Wrapper = styled.div`
  .ant-col .label {
    display: block;
    margin-right: 0;
    text-align-last: justify;
    line-height: 32px;
  }
  .duration {
    .formField-wrapper {
      display: inline-flex;
    }
    .formField-container {
      width: auto;
    }
    .ant-input-number-input {
      width: 70px;
    }
    .ant-select {
      width: 60px !important;
      margin-left: 10px;
    }
  }
  textarea {
    resize: none;
  }
  .person__content {
    background: #f0f0f0;
    padding: 0 10px;
    border: 1px solid #d7d8d7;
    line-height: 30px;
    height: 32px;
    border-radius: 4px;
    display: inline-block;
  }
`;
const FileBox = styled.div`
  .file-box__item {
    display: flex;
    align-items: center;
    .type-img {
      width: 30px;
    }
    .name {
      flex: 1;
      padding: 0 10px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
  .tip {
    font-size: 13px;
    color: #999;
    margin-top: 6px;
  }
`;
