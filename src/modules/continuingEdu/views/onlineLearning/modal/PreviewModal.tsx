import styled from "styled-components";
import React, { useState, useLayoutEffect } from "react";
import { Modal, Icon, Button } from "antd";
import reactZmage from "react-zmage";
import { ModalComponentProps } from "src/libs/createModal";
import { getFileType, clearFilePath } from "src/utils/file/file";
import { Spin } from "src/vendors/antd";
import { httpNoError } from "src/libs/http/http";
import { appStore } from "src/stores";
import AnswerModal from "./AnswerModal";
export interface Props extends ModalComponentProps {
  learningFunc?: any;
  id?: any;
  finish?: string;
  path: string;
  title: string;
  modalWidth?: number;
  videoQuestionList?: any;
  attachmentList?: {
    path: string;
    name: string;
    [p: string]: any;
  }[];
}

export default function PreviewModal(props: Props) {
  let {
    visible,
    onCancel,
    path,
    title,
    modalWidth,
    attachmentList,
    learningFunc,
    id,
    finish,
    videoQuestionList
  } = props;
  let [modalLoading, setModalLoading] = useState(false);
  let [filePath, setFilePath] = useState("");
  let [fileList, setFileList] = useState([] as any[]);
  let [noFile, setNoFile] = useState(false);
  const [answerModalvisible, setAnswerModalVisible] = useState(false);
  const [answerModalparams, setAnswerModalParams] = useState({});
  const [finished, setFinished] = useState(true); // 判断当前是否可点击确认按钮完成学习
  const changeFilePath = (path: string, _visible?: boolean) => {
    if (_visible === undefined) _visible = visible;
    let fileType = getFileType(path);
    if (_visible) {
      if (fileType == "video") {
        let questionList: any = videoQuestionList
          ? videoQuestionList.find((item: any) => item.id == id)
          : {};
        let answerList: any =
          (questionList && questionList.viQuestionList) || [];
        let answerIndex: number = 0;
        setFilePath(path);
        setTimeout(() => {
          let videoRef: any = document.getElementById(
            "videoRef"
          ) as HTMLVideoElement;
          videoRef.play();
          var last = 0;
          // 视频没插题  可快进 可直接确定已读
          if (!questionList || !questionList.viQuestionList) {
            setFinished(false);
            return;
          }
          // 视频插题——获取当前视频播放时间点
          videoRef.ontimeupdate = function () {
            // 禁止快进（退）
            var current = videoRef.currentTime;
            if (current - last > 2) {
              videoRef.currentTime = last;
            } else {
              last = current;
            }
            // 判断视频是否看完（看完显示完成按钮）
            if (this.currentTime == videoRef.duration) {
              setFinished(false);
            } else {
              setFinished(true);
            }

            // 判断是否插题
            if (
              answerList &&
              answerList.length >= answerIndex + 1 &&
              parseInt(this.currentTime) * 1000 ==
              answerList[answerIndex].broadcastPoint
            ) {
              videoRef.pause();
              setAnswerModalParams(answerList[answerIndex]);
              setAnswerModalVisible(true);
              answerIndex++;
            }
          };
        }, 500);
      } else if (fileType == "img") {
        setFinished(false);
        setFilePath(path);
      } else if (fileType == "word" || fileType == "excel") {
        setFinished(false);
        setModalLoading(true);
        setNoFile(true);

        if (appStore.isDev) {
          path =
            "/crNursing" +
            (path.split("/crNursing")[1] || path.split("/crNursing")[0]);
        }

        httpNoError
          .get(clearFilePath(path) + ".pdf")
          .then(res => {
            setNoFile(false);
            setModalLoading(false);
            setFilePath(clearFilePath(path) + ".pdf#toolbar=0");
          })
          .catch(res => {
            setFilePath(clearFilePath(path) + ".pdf#toolbar=0");
            setNoFile(true);
            setModalLoading(false);
          });
      } else if (fileType == "pdf") {
        setFinished(false);
        setNoFile(false);
        setFilePath(path);
      }
    } else {
      let videoRef = document.getElementById("videoRef") as HTMLVideoElement;
      if (fileType == "video" && videoRef) {
        videoRef.pause();
      }
      setFilePath("");
      setNoFile(true);
      setModalLoading(false);
    }
  };

  const formatFileList = () => {
    let arr = [] as any[];
    if (attachmentList) arr = attachmentList.concat();
    let target = arr.find((item: any) => item.path === path);
    if (!target)
      arr.unshift({
        path: devPath(path),
        type: clearFilePath(path),
        title: title
      });

    let newArr = arr.map((item: any) => {
      let newPath = devPath(item.path);
      let pathArr = newPath.split(".");
      return {
        path: clearFilePath(newPath),
        type: pathArr[pathArr.length - 1],
        title: item.name || ""
      };
    });

    setFileList(newArr);
  };

  const onSave = async () => {
    onCancel();
    if (!finish && learningFunc) learningFunc(id);
  };

  const devPath = (path: string) => {
    if (appStore.isDev)
      return (
        "/crNursing" +
        (path.split("/crNursing")[1] || path.split("/crNursing")[0])
      );
    return path;
  };

  useLayoutEffect(() => {
    if (path) changeFilePath(path, visible);
    if (visible && attachmentList) {
      formatFileList();
    } else {
      setFileList([]);
    }
  }, [visible]);

  let currentItem = fileList.find((item: any) => {
    return item.path == clearFilePath(filePath);
  });

  let currentTitle = title;
  let currentIndex = fileList.indexOf(currentItem);
  if (currentItem && currentItem.title) currentTitle = currentItem.title;

  // console.log(filePath)
  let defaultWidth = 900;
  //武汉市一要加宽预览窗口大小
  if (appStore.HOSPITAL_ID == "wh" || appStore.HOSPITAL_ID == "gxjb") defaultWidth = 1100;

  // 插题完成回调
  const onOkCallBack = () => {
    setAnswerModalVisible(false);
    let fileType = getFileType(path);
    if (fileType == "video") {
      setTimeout(() => {
        let videoRef: any = document.getElementById(
          "videoRef"
        ) as HTMLVideoElement;
        videoRef.play();
      }, 500);
    }
  };

  return (
    <div>
      <Modal
        width={modalWidth || defaultWidth}
        title={currentTitle}
        visible={visible}
        onCancel={onCancel}
        forceRender
        centered
        footer={
          <div style={{ textAlign: "center" }}>
            <span>
              <Button onClick={onCancel}>取消</Button>
            </span>
            <span style={{ marginLeft: "10px" }}>
              <Button type="primary" onClick={onSave} disabled={finished}>
                完成
              </Button>
            </span>
          </div>
        }
      >
        <Wrapper>
          {getFileType(filePath) == "video" ? (
            <div className="video-con">
              {visible && <video src={filePath} id="videoRef" controls />}
            </div>
          ) : getFileType(filePath) == "img" ? (
            <div className="img-con">
              <img
                src={filePath}
                alt=""
                onClick={() =>
                  reactZmage.browsing({
                    src: filePath,
                    backdrop: "rgba(0,0,0,0.3)"
                  })
                }
              />
            </div>
          ) : (
            <Spin spinning={modalLoading}>
              {!noFile ? (
                <PdfPrview path={filePath} />
              ) : (
                <NoPrview loading={modalLoading} />
              )}
            </Spin>
          )}
        </Wrapper>
        {fileList.length > 1 && (
          <IndexSelect>
            {currentIndex !== 0 && (
              <div
                className={modalLoading ? "arrow-left disabled" : "arrow-left"}
                onClick={() => {
                  if (modalLoading) return;
                  let idx = currentIndex - 1;
                  let target = fileList[idx];
                  if (target) changeFilePath(`${target.path}.${target.type}`);
                }}
              >
                <Icon type="left-square" theme="filled" />
              </div>
            )}
            {currentIndex < fileList.length - 1 && (
              <div
                className={
                  modalLoading ? "arrow-right disabled" : "arrow-right"
                }
                onClick={() => {
                  if (modalLoading) return;
                  let idx = currentIndex + 1;
                  let target = fileList[idx];
                  if (target) changeFilePath(`${target.path}.${target.type}`);
                }}
              >
                <Icon type="right-square" theme="filled" />
              </div>
            )}
          </IndexSelect>
        )}
      </Modal>
      <AnswerModal
        visible={answerModalvisible}
        onOkCallBack={() => onOkCallBack()}
        params={answerModalparams}
      />
    </div>
  );
}
const Wrapper = styled.div`
  video {
    width: 100%;
    height: calc(80vh - 60px);
    min-height: 400px;
  }
  .img-con {
    height: 60vh;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
`;

function NoPrview({ loading }: { loading: boolean }) {
  const Wrapper = styled.div`
    height: 60vh;
    line-height: 60vh;
    text-align: center;
  `;
  return (
    <Wrapper>
      {loading ? "正在加载数据，请稍后" : "暂时无法预览该文件，请稍后再试"}
    </Wrapper>
  );
}
function PdfPrview({ path }: { path: string }) {
  const Wrapper = styled.div`
    iframe {
      height: 60vh;
      width: 100%;
    }
  `;
  return (
    <Wrapper>
      <iframe src={path} />
    </Wrapper>
  );
}

const IndexSelect = styled.div`
  & > div {
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    :hover {
      color: #999;
    }
    &.disabled {
      color: #777 !important;
      cursor: not-allowed;
    }
    &.arrow-left {
      left: 75px;
      font-size: 80px;
    }
    &.arrow-right {
      right: 75px;
      font-size: 80px;
    }
  }
`;
