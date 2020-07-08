import styled from "styled-components";
import React, { useState, useEffect, ChangeEvent } from "react";
import {
  Button,
  Icon,
  message,
  Progress,
  Row,
  Col,
  Select,
  DatePicker,
  TimePicker
} from "antd";
import { getFileType, getFileSize, getFilePrevImg } from "src/utils/file/file";
import Zimage from "src/components/Zimage";
import { stepServices } from "../services/stepServices";
import { stepViewModal } from "../StepViewModal";
import UpdateTable from "./table/UpdateTable";
import PXUpdateTable from "./table/PXUpdateTable";
import Form from "src/components/Form";
import moment from "moment";
import VideoInsertion from "./videoInsertion/VideoInsertion";
export interface Props {}

export default function Step4() {
  let refForm = React.createRef<Form>();
  const fileInputRef = React.createRef<HTMLInputElement>();
  const [fileList, setFileList] = useState([]);
  const [studyLinkList, setStudyLinkList] = useState([]);
  const [isNeedQuestionnaire, setIsNeedQuestionnaire] = useState("1");
  const [questionStatList, setQtionStatList] = useState([
    {
      questionCount: 0,
      questionnaireTitle: ""
    }
  ]);
  const [isHave, setIsHave] = useState("1");
  /** 上传文件状态 */
  const [progressEventMap, setProgressEventMap]: any = useState({});

  let totalFileSize = 0;
  let loadedFileSize = 0;

  // console.log(progressEventMap, "progressEventMapprogressEventMap");
  for (let key in progressEventMap) {
    if (progressEventMap[key].total) {
      totalFileSize += progressEventMap[key].total;
      loadedFileSize += progressEventMap[key].loaded;
    }
  }

  useEffect(() => {
    // console.log(
    //   stepViewModal.stepData1.teachingMethod,
    //   stepViewModal.stepData4.attachmentIds,
    //   stepViewModal.stepData4XX.studyLinkList,
    //   "stepViewModal.stepData4.attachmentIdsstepViewModal.stepData4.attachmentIds"
    // );
    setFileList(stepViewModal.stepData4.attachmentIds);
    stepViewModal.stepData4.videoList = stepViewModal.stepData4.attachmentIds.filter(
      (item: any) => item.type == "video/mp4"
    );
    setStudyLinkList(stepViewModal.stepData4XX.studyLinkList);
    setIsNeedQuestionnaire(
      stepViewModal.stepData4PX.isNeedQuestionnaire.toString()
    );
    setQtionStatList(stepViewModal.stepData4PX.questionStatList);
  }, []);

  useEffect(() => {
    let current = refForm.current;
    stepViewModal.stepData4.attachmentIds = fileList;
    if (!current) return;
    current.setFields({ studyLinkList, isNeedQuestionnaire, questionStatList });
  }, [fileList, studyLinkList, isNeedQuestionnaire, questionStatList]);

  const deleteFile = (index: number) => {
    fileList.splice(index, 1);
    setFileList([...fileList]);
    stepViewModal.stepData4.videoList = fileList.filter(
      (item: any) => item.type == "video/mp4"
    );
  };
  const updateFile = () => {
    fileInputRef.current && fileInputRef.current.click();
  };
  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.persist();
    let promiseList: any[] = [];
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
      "vob"
    ];
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
    for (let i = 0; i < files.length; i++) {
      let postData = new FormData();
      postData.append("file", files[i]);
      promiseList.push(() =>
        stepServices.uploadAttachment(postData, (progressEvent: any) => {
          let fileName = files[i].name;
          setProgressEventMap({
            ...progressEvent,
            [fileName]: progressEvent
          });
          // console.log(progressEvent, "progressEvent");
        })
      );
    }
    let hideLoading = message.loading("正在上传，请稍等", 0);
    let list: any = [...fileList];
    promiseList
      .reduce((total: any, current, index, arr) => {
        if (total) {
          return total.then((res: any) => {
            let item = {
              ...res.data,
              size: getFileSize(res.data.size),
              fileType: getFileType(res.data.path)
            };
            list.push(item);
            // console.log(list, "list");
            /** 最后一项 */
            if (index == arr.length - 1) {
              return current().then((res: any) => {
                let item = {
                  ...res.data,
                  size: getFileSize(res.data.size),
                  fileType: getFileType(res.data.path)
                };
                list.push(item);
              });
            } else {
              return current();
            }
          });
        } else {
          /** 如果只上传一个 */
          if (arr.length == 1) {
            return current().then((res: any) => {
              let item = {
                ...res.data,
                size: getFileSize(res.data.size),
                fileType: getFileType(res.data.path)
              };
              list.push(item);
            });
          }
          return current();
        }
      }, 0)
      .then((res: any) => {
        setFileList(list);
        stepViewModal.stepData4.videoList = list.filter(
          (item: any) => item.type == "video/mp4"
        );

        setProgressEventMap({});
        hideLoading();
      })
      .catch((e: any) => {
        hideLoading();
      });

    // Axios.all(promiseList)
    //   .then(res => {
    //     let list: any = [
    //       ...fileList,
    //       ...res.map(({ data: item }: any) => {
    //         return {
    //           ...item,
    //           size: getFileSize(item.size),
    //           fileType: getFileType(item.path)
    //         };
    //       })
    //     ];
    //     setFileList(list);
    //     setProgressEventMap({});
    //     hideLoading();
    //   })
    //   .catch(e => {
    //     hideLoading();
    //   });
  };
  const onFormChange = (name: string, value: any, from: Form) => {
    let data = from.getFields();
    stepViewModal.stepData4XX.studyLinkList = data.studyLinkList;
  };
  const onFormChangePX = (name: string, value: any, from: Form) => {
    let data = from.getFields();
    setIsHave(data.isNeedQuestionnaire);
    stepViewModal.stepData4PX.questionStatList = data.questionStatList;
    stepViewModal.stepData4PX.isNeedQuestionnaire = Number(
      data.isNeedQuestionnaire
    );
  };

  return (
    <Wrapper>
      <div className="btn-con">
        <Button onClick={updateFile}>
          <Icon type="upload" />
          上传
        </Button>
        <span className="aside">
          支持格式："图片；*.pdf;**.doc;**.docx;**.ppt;**.pptx;**.xls;**.xlsx*，“.mp4”
        </span>
      </div>
      <FileList>
        {!!totalFileSize && (
          <div style={{ padding: "0 30px 10px" }}>
            上传进度{" "}
            <Progress
              strokeColor={"#00A680"}
              percent={parseInt(
                ((loadedFileSize * 0.98) / totalFileSize) * 100 + ""
              )}
            />
            （{getFileSize(loadedFileSize * 0.98)}/{getFileSize(totalFileSize)}
            ）
          </div>
        )}

        {fileList && fileList.length > 0 && (
          <FilesBox>
            {fileList.map((item: any, index: number) => (
              <div className="file-box" key={index}>
                {getFileType(item.path) == "img" ? (
                  <Zimage src={item.path} className="type-img" alt="" />
                ) : (
                  <img
                    src={getFilePrevImg(item.path)}
                    className="type-img"
                    alt=""
                  />
                )}

                <div className="name">{item.name}</div>
                <div className="size">{item.size}</div>
                <Icon
                  type="close"
                  title="删除图片"
                  onClick={() => deleteFile(index)}
                />
              </div>
            ))}
          </FilesBox>
        )}
        {fileList &&
          fileList.length > 0 &&
          stepViewModal.stepData4.videoList.length > 0 && (
            <FilesBox>
              <VideoInsertion />
            </FilesBox>
          )}
        <input
          type="file"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={onFileChange}
          multiple={true}
        />
      </FileList>
      {stepViewModal.stepData1.teachingMethod === 1 && (
        <FilesBox>
          <Form ref={refForm} labelWidth={100} onChange={onFormChange}>
            <div style={{ fontSize: "14px" }}>
              外网资料
              <span
                style={{ marginLeft: "10px", color: "#ccc", fontSize: "13px" }}
              >
                外网链接请输入完整网址例如：http://www.123.com 或
                https://www.123.cn
              </span>
            </div>
            <Row>
              <Col span={24}>
                <Form.Field name="studyLinkList">
                  <UpdateTable />
                </Form.Field>
              </Col>
            </Row>
          </Form>
        </FilesBox>
      )}
      {stepViewModal.stepData1.teachingMethod === 2 && (
        <FilesBox>
          <div style={{ fontSize: "14px" }}> 满意度调查表 </div>
          <Form ref={refForm} labelWidth={100} onChange={onFormChangePX}>
            <Row style={{ marginTop: 10 }}>
              <Col span={22}>
                <Form.Field name="isNeedQuestionnaire">
                  <Select style={{ width: 120 }}>
                    <Select.Option value="1">需要</Select.Option>
                    <Select.Option value="0">不需要</Select.Option>
                  </Select>
                </Form.Field>
              </Col>
            </Row>
            {isHave === "1" && (
              <Row>
                <Col span={22}>
                  <Form.Field name="questionStatList">
                    <PXUpdateTable />
                  </Form.Field>
                </Col>
              </Row>
            )}
          </Form>
        </FilesBox>
      )}
    </Wrapper>
  );
}
const Wrapper = styled.div`
  position: relative;
  .ab {
    display: inline-block;
    position: absolute;
    right: 80px;
    top: 224px;
  }

  .btn-con {
    margin: 40px 30px 20px;
    display: flex;
    align-items: center;
  }
  .aside {
    font-size: 13px;
    margin-left: 20px;
    color: #999;
  }
`;
const FileList = styled.div`
  margin-bottom: 40px;
`;
const FilesBox = styled.div`
  padding: 12px 30px 12px;
  margin-top: -12px;
  /* border-bottom: 1px solid #ddd; */
  overflow: auto;
  /* max-height: 120px; */
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: #eaeaea;
  }
  &::-webkit-scrollbar-track {
    border-radius: 50px;
    background-color: #eaeaea;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 50px;
    background-color: #c2c2c2;
  }
  .file-box {
    width: 250px;
    height: 65px;
    background: rgba(246, 246, 246, 1);
    border-radius: 2px;
    float: left;
    margin-right: 8px;
    margin-bottom: 8px;
    padding: 10px 12px;
    position: relative;
    .type-img {
      position: absolute;
      left: 12px;
      top: 0;
      bottom: 0;
      width: 44px;
      height: 44px;
      margin: auto 0;
    }
    .name {
      margin: 0 5px 0 60px;
      font-size: 13px;
      color: #333;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .size {
      margin: 0 0px 0 60px;
      font-size: 13px;
      color: #999;
    }
    &:hover {
      .anticon-close {
        display: block;
      }
    }
    .anticon-close {
      display: none;
      position: absolute;
      right: 10px;
      top: 4px;
      height: 8px;
      width: 8px;
      cursor: pointer;
    }
  }
`;
