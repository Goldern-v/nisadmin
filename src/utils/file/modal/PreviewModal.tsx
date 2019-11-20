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
  message
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
}

/** 设置规则 */
const rules: Rules = {
  publicDate: val => !!val || "请填写发表日期"
};

export default function PreviewModal(props: Props) {
  let { visible, onCancel, path, title } = props;
  let [modalLoading, setModalLoading] = useState(false);
  let [pdfPath, setPdfPath] = useState("");
  let [noFile, setNoFile] = useState(false);
  let refVideo = React.createRef<HTMLVideoElement>();

  const onSave = async () => {
    onCancel();
  };

  useLayoutEffect(() => {
    if (path) {
      let fileType = getFileType(path);
      console.log(fileType, "fileType");
      if (visible) {
        if (fileType == "video" && refVideo.current) {
          refVideo.current.play();
        } else if (fileType == "img") {
        } else if (fileType == "word") {
          setModalLoading(true);
          setNoFile(true);

          // setNoFile(false);
          // setModalLoading(false);
          // setPdfPath(
          //   "http://60.6.218.17:9093/crNursing/asset/print/archive//0001252165_1/eval_30128_1.pdf#toolbar=0"
          // );
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
              setPdfPath(clearFilePath(path) + ".pdf#toolbar=0");
            })
            .catch(res => {
              setNoFile(true);
              setModalLoading(false);
            });
        }
      } else {
        if (fileType == "video" && refVideo.current) {
          refVideo.current.pause();
        }
        setNoFile(true);
        setModalLoading(false);
      }
    }
  }, [visible]);

  return (
    <Modal
      width={900}
      title={title}
      visible={visible}
      onCancel={onCancel}
      onOk={onSave}
      okText="确定"
      forceRender
      centered
    >
      <Wrapper>
        {getFileType(path) == "video" ? (
          <div className="video-con">
            {visible && <video src={path} ref={refVideo} controls />}
          </div>
        ) : getFileType(path) == "img" ? (
          <div className="img-con">
            <img src={path} alt="" />
          </div>
        ) : (
          <Spin spinning={modalLoading}>
            {!noFile ? (
              <PdfPrview path={pdfPath} />
            ) : (
              <NoPrview loading={modalLoading} />
            )}
          </Spin>
        )}
      </Wrapper>
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
