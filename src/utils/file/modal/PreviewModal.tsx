import styled from "styled-components";
import React, { useState, useEffect, useLayoutEffect } from "react";
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
import { getFileType, clearFilePath } from "../file";
import { Spin } from "src/vendors/antd";
import { httpNoError } from "src/libs/http/http";
import { appStore } from "src/stores";

const Option = Select.Option;
export interface Props extends ModalComponentProps {
  path: string;
  title: string;
  modalWidth?: number;
  attachmentList?: {
    path: string,
    name: string,
    [p: string]: any
  }[]
}

/** 设置规则 */
const rules: Rules = {
  publicDate: val => !!val || "请填写发表日期"
};

export default function PreviewModal(props: Props) {
  let { visible, onCancel, path, title, modalWidth, attachmentList } = props;
  let [modalLoading, setModalLoading] = useState(false);
  let [filePath, setFilePath] = useState("")
  let [fileList, setFileList] = useState([] as any[])
  let [noFile, setNoFile] = useState(false);
  let refVideo = React.createRef<HTMLVideoElement>();

  const changeFilePath = (path: string) => {
    let fileType = getFileType(path);
    console.log(fileType, "fileType");
    if (visible) {
      if (fileType == "video" && refVideo.current) {
        refVideo.current.play();
      } else if (fileType == "img") {
        setFilePath(path)
      } else if (fileType == "word" || fileType == "excel") {
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
            setNoFile(true);
            setModalLoading(false);
          });
      } else if (fileType == "pdf") {
        setNoFile(false);
        setFilePath(path)
      }
    } else {
      if (fileType == "video" && refVideo.current) {
        refVideo.current.pause();
      }
      setFilePath('')
      setNoFile(true);
      setModalLoading(false);
    }
  }

  const formatFileList = () => {
    let arr = [] as any[]
    if (attachmentList) arr = attachmentList.concat()
    let target = arr.find((item: any) => item.path === path)
    if (!target) arr.unshift({
      path: devPath(path),
      type: clearFilePath(path),
      title: title
    })

    let newArr = arr.map((item: any) => {
      let newPath = devPath(item.path)
      let pathArr = newPath.split('.')
      return {
        path: clearFilePath(newPath),
        type: pathArr[pathArr.length - 1],
        title: item.name || ''
      }
    })

    setFileList(newArr)
  }

  const onSave = async () => {
    onCancel();
  };

  const devPath = (path: string) => {
    if (appStore.isDev) return "/crNursing" +
      (path.split("/crNursing")[1] || path.split("/crNursing")[0])
    return path
  }

  useLayoutEffect(() => {
    if (path) changeFilePath(path)
    if (visible && attachmentList) {
      formatFileList()
    } else {
      setFileList([])
    }
  }, [visible]);

  let currentItem = fileList.find((item: any) => {
    return item.path == clearFilePath(filePath)
  })

  let currentTitle = title
  let currentIndex = fileList.indexOf(currentItem)
  if (currentItem && currentItem.title) currentTitle = currentItem.title

  // console.log(filePath)

  return (
    <Modal
      width={modalWidth || 900}
      title={currentTitle}
      visible={visible}
      onCancel={onCancel}
      onOk={onSave}
      okText="确定"
      forceRender
      centered
    >
      <Wrapper>
        {getFileType(filePath) == "video" ? (
          <div className="video-con">
            {visible && <video src={filePath} ref={refVideo} controls />}
          </div>
        ) : getFileType(filePath) == "img" ? (
          <div className="img-con">
            <img src={filePath} alt="" />
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
      {fileList.length > 1 && <IndexSelect>
        {currentIndex !== 0 && <div
          className="arrow-left"
          onClick={() => {
            let idx = currentIndex - 1
            let target = fileList[idx]
            if (target) changeFilePath(`${target.path}.${target.type}`)
          }}>
          <Icon type="left-square" theme="filled" />
        </div>}
        {currentIndex < (fileList.length - 1) && <div
          className="arrow-right"
          onClick={() => {
            let idx = currentIndex + 1
            let target = fileList[idx]
            if (target) changeFilePath(`${target.path}.${target.type}`)
          }}>
          <Icon type="right-square" theme="filled" />
        </div>}
      </IndexSelect>}
    </Modal>
  );
}
const Wrapper = styled.div`
  video {
    width: 100%;
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
  &>div{
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    :hover{
      color: #999;
    }
    &.arrow-left{
      left: 75px;
      font-size: 80px;
    }
    &.arrow-right{
      right: 75px;
      font-size: 80px;
    }
  }
`
