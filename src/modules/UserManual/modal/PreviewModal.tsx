import React from "react";
import { Modal, Button } from "antd";

import { ModalComponentProps } from "src/libs/createModal";
import PdfProtcetView from "src/components/PdfProtcetView";
import Watermark from "src/components/Watermark";

export interface Props extends ModalComponentProps {
  name?: string;
  type?: string;
  url?: string;
}

export default function PreviewModal(props: Props) {
  let { visible, url, type, name, onClose } = props;

  let pdfHeight = window.innerHeight * 0.8;

  const Content = function() {
    switch (type) {
      case "jpg":
      case "gif":
      case "jpeg":
        return (
          <Watermark>
            <img src={url} width="100%" />
          </Watermark>
        );
      case "pdf":
      case "txt":
        // return <object type="application/pdf" width="100%" style={{ height: `${pdfHeight}px` }} data={url} />
        return (
          <Watermark>
            <iframe
              src={url}
              style={{ height: `${pdfHeight}px`, width: "99%" }}
            />
          </Watermark>
        );
      default:
        return (
          <div
            style={{
              height: "300px",
              lineHeight: "300px",
              textAlign: "center"
            }}
          >
            {`.${type} `}文件不支持预览，请在app内查看
          </div>
        );
    }
  };
  return (
    <Modal
      visible={visible}
      title={name}
      width={"900px"}
      centered
      onCancel={onClose}
      footer={null}
      onOk={onClose}
      wrapClassName="fullModal"
    >
      {visible && Content()}
    </Modal>
  );
}
