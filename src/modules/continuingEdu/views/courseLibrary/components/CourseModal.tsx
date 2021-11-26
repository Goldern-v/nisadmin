import {
  Modal,
  Row,
  Col,
  Input,
  Radio,
  Select,
  message,
  Button,
  InputNumber,
} from "antd";
import { observer } from "mobx-react";
import React, {
  createRef,
  useState,
  useLayoutEffect,
  ChangeEvent,
  useEffect,
  useMemo,
} from "react";
import createModal, { ModalComponentProps } from "src/libs/createModal";
import styled from "styled-components";
import Form from "src/components/Form";
import { courseLibraryModal, RadioItem } from "../modal";
import Zimage from "src/components/Zimage";
import { getFileType, getFilePrevImg } from "src/utils/file/file";
import { courseLibraryApi, getResponseData } from "../api/courseLibraryApi";
import { authStore } from "src/stores";
import PreviewModal from "src/utils/file/modal/PreviewModal";
import ReactZmage from "react-zmage";

export interface Prop extends ModalComponentProps {
  courseType?: number;
  data?: any;
  modalType: number; // 弹窗类型 0: 新建 1: 修改 2: 查看
  onOkCallback?: () => void;
}

export default observer(function courseModal(props: Prop) {
  const {
    visible,
    data,
    onCancel,
    modalType,
    courseType,
    onOkCallback,
  } = props;
  const refForm = createRef<Form>();
  const titleArr = ["添加课件", "修改", "查看"];
  const [loading, setLoading] = useState(false);

  // const setStatusList = () => {
  //   const type = data ? data.type : courseLibraryModal.courseType;
  //   switch (type) {
  //     case 1:
  //       return [
  //         {
  //           label: "全院可见",
  //           value: 1,
  //         },
  //         {
  //           label: "授权可见",
  //           value: 2,
  //         },
  //       ];
  //     case 2:
  //       return [
  //         {
  //           label: "个人可见",
  //           value: 3,
  //         },
  //       ];
  //     default:
  //       return [];
  //   }
  // };
  let statusList = useMemo(() => {
    const type = data ? data.type : courseLibraryModal.courseType;
    switch (type) {
      case 1:
        return [
          {
            label: "全院可见",
            value: 1,
          },
          {
            label: "授权可见",
            value: 2,
          },
        ];
      case 2:
        return [
          {
            label: "个人可见",
            value: 3,
          },
        ];
      default:
        return [];
    }
  }, [courseLibraryModal.curTab]);
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
      multi: 3600,
    },
    {
      name: "分",
      code: "min",
      multi: 60,
    },
    {
      name: "秒",
      code: "s",
      multi: 1,
    },
  ];
  const defaultFormData = () => {
    if (data) {
      // let arr = courseLibraryModal.formatSec(data.viewingTime)
      let { courseName, isDownload, state, remark } = data;
      return {
        courseName,
        isDownload,
        state,
        remark,
        // duration: arr[0] || undefined,
        // durationType: arr[1] || ''
      };
    }
    let state = statusList.length > 0 ? statusList[0].value : "";
    return {
      courseName: "",
      // duration: undefined,
      // durationType: durationTypeList[0].code,
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
  const [courseFile, setCourseFile] = useState({} as any);
  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.persist();
    let files = e.target.files || [];
    // 视频只允许MP4格式
    const extList = [
      "doc",
      "docx",
      "pdf",
      "ppt",
      "pptx",
      "xls",
      "xlsx",
      "mp4",
      "png",
      "jpg",
      "jpeg",
      "gif",
    ];
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
    let isOk = fileExtList.find((item: any) => extList.indexOf(item) == -1);
    if (isOk) {
      message.warning("暂不支持该该类型的文件 ");
      return;
    }
    let hideLoading = message.loading("正在上传，请稍等", 0);

    let postData = new FormData();
    postData.append("file", files[0]);
    getResponseData(() => courseLibraryApi.updateFile(postData))
      .then((res) => {
        setCourseFile(res);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        hideLoading();
      });
  };
  const delFile = () => {
    fileInputRef.current && (fileInputRef.current.value = "");
    setCourseFile({});
  };
  const onSave = () => {
    let errMsgList = [] as string[];
    if (!formData.courseName) {
      errMsgList.push("课件名称不能为空");
    }
    if (!courseFile) {
      errMsgList.push("课件不能为空");
    }
    // if (!formData.duration || formData.duration <= 0) {
    //   errMsgList.push("课件时长不能为空或小于等于0");
    // }
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
    // let { duration, durationType, ...other } = formData;
    let params = {
      ...formData,
      id: data ? data.id : "",
      viewingTime: 0,
      // viewingTime: (duration as number) * (durationTypeList.find(v => v.code === durationType)?.multi || 1),
      type: data ? data.type : courseLibraryModal.courseType,
      attachmentId: courseFile.id,
    };
    getResponseData(() => courseLibraryApi.saveOrUpdate(params))
      .then((res) => {
        message.success("保存成功");
        onOkCallback && onOkCallback();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const previewModal = createModal(PreviewModal);

  const preview = () => {
    if (getFileType(courseFile.path) == "img")
      ReactZmage.browsing({
        backdrop: "rgba(0,0,0, .8)",
        set: [{ src: courseFile.path }],
      });
    else
      previewModal.show({
        title: formData.courseName || courseFile.name,
        path: courseFile.path,
      });
  };
  const download = () => {
    let a = document.createElement("a");
    a.href = courseFile.path;
    a.download = courseFile.name; // 自定义文件名
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a); // 移除a元素
  };
  useEffect(() => {
    // statusList = setStatusList();
    Object.assign(formData, defaultFormData());
    setFormData(formData);
  }, [data]);
  // 初始化数据
  useLayoutEffect(() => {
    // if (!visible) return;
    if (refForm.current && visible) refForm!.current!.clean();
    Object.assign(formData, defaultFormData());
    setFormData(formData);
    let file = data
      ? {
          id: data.attachmentId,
          path: data.coursePath,
          name:
            data.courseName +
            data.coursePath.slice(data.coursePath.lastIndexOf(".")),
        }
      : {};
    setCourseFile(file);
    /** 如果是修改 */
    refForm.current && refForm!.current!.setFields(formData);
  }, [visible]);

  return (
    <Modal
      width={600}
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
            {modalType < 2 ? (
              <Col span={24}>
                <Form.Field label="课件名称：" name="courseName">
                  <Input value={formData.courseName} />
                </Form.Field>
              </Col>
            ) : (
              <p className="title">{formData.courseName}</p>
            )}
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
                      {modalType < 2 && (
                        <div className="delete" onClick={delFile} title="删除">
                          ×
                        </div>
                      )}
                      {modalType < 2 ? (
                        ""
                      ) : (
                        <>
                          <Button type="primary" onClick={preview}>
                            预览
                          </Button>
                          <Button type="primary" onClick={download}>
                            下载
                          </Button>
                        </>
                      )}
                    </div>
                  )}
                  {modalType < 2 ? (
                    <div className="tip">
                      *仅支持上传.doc、.docx、.pdf、.ppt、.pptx、.xls、.xlsx、.mp4、图片等类型文件
                    </div>
                  ) : (
                    ""
                  )}
                </FileBox>
              </Form.Field>
            </Col>
            {modalType < 2 ? (
              <>
                {/* <Col span={24} className="duration">
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
                </Col>*/}
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
              </>
            ) : (
              ""
            )}
            <Col span={24}>
              <Form.Field label={"备   注："} name="remark">
                <Input.TextArea rows={4} value={formData.remark} />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label="上传人：">
                <div className="person__content">
                  {modalType === 0
                    ? authStore.user && authStore.user.empName
                    : data && data.empName}
                </div>
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
        <previewModal.Component />
      </Wrapper>
    </Modal>
  );
});

const Wrapper = styled.div`
  .title {
    font-size: 16px;
    font-weight: bold;
  }
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
    .delete {
      width: 20px;
      height: 20px;
      font-size: 18px;
      background: #ccc;
      color: #fff;
      text-align: center;
      border-radius: 50%;
      line-height: 20px;
      margin: 0 4px;
      cursor: pointer;
    }
    .ant-btn + .ant-btn {
      margin-left: 10px;
    }
  }
  .tip {
    font-size: 13px;
    color: #999;
    margin-top: 6px;
  }
`;
const PreviewBox = styled.div`
  margin-left: -38px;
`;
