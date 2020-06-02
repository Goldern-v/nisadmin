import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Modal, Input, Button, message as Message } from "antd";
import Form from "src/components/Form";
import { userManualApi } from "../api/UserManualApi";

export interface Props {
  visible: boolean;
  onOk: any;
  onCancel: any;
  params?: any;
  type?: any;
}

export default function FileEditModal(props: Props) {
  const refForm = React.createRef<Form>();
  const { visible, onOk, onCancel, params, type } = props;
  const [uploadLoading, setUploadLoading] = useState(false);
  const [acceptingNewParams, setAcceptingNewParams] = useState(false);
  let uploadAccept = ".pdf";

  const openImportFile = () => {
    let target = document.querySelector(
      ".new-nursing-rules-add-modal .file-content"
    ) as HTMLElement;
    target.click();
  };

  const handleImportFileChange = (e: any) => {
    let target = e.target;
    let nameEL = document.querySelector(
      ".new-nursing-rules-add-modal .file-name"
    ) as HTMLInputElement;
    let fName = target.value.split("\\");
    fName = fName[fName.length - 1];
    nameEL.value = fName;
    let current = refForm.current;
    if (current) {
      let fileName = current.getField("fileName");
      if (!fileName) {
        let newName = fName.split(".");
        if (newName.length >= 2) newName.pop();

        current.setField("fileName", newName.join("."));
      }
    }
  };

  useEffect(() => {
    if (visible) {
      let nameEL = document.querySelector(
        ".new-nursing-rules-add-modal .file-name"
      ) as HTMLInputElement;
      if (nameEL && nameEL.value) nameEL.value = "";
      setTimeout(() => {
        if (refForm && refForm.current)
          refForm.current.clear(() => {
            if (refForm && refForm.current && params instanceof Object) {
              if (params.id) setAcceptingNewParams(true);
              let keys = Object.keys(params);
              if (keys.length > 0) {
                refForm.current.setFields({
                  fileName: params.fileName
                });
                //防止在handleFormChange中把目录字段替换为空字符
                new Promise(resolve =>
                  setTimeout(() => resolve("ok"), 100)
                ).then(() => {
                  setAcceptingNewParams(false);
                });
              }
            }
          });
      });
    }
  }, [visible]);

  const handleOkBtn = () => {
    if (refForm && refForm.current) {
      let formData = refForm.current.getFields();
      let fileEL = document.querySelector(
        ".new-nursing-rules-add-modal .file-content"
      ) as HTMLInputElement;
      let nameEl = document.querySelector(
        ".new-nursing-rules-add-modal .file-name"
      ) as HTMLInputElement;
      let file: any;
      let data = new FormData();
      if (fileEL.files && fileEL.files.length > 0) file = fileEL.files[0];

      if (!formData.fileName) return Message.error("未填写文件名称");

      if (!params.id) {
        if (!(file && nameEl.value)) return Message.error("未选择上传文件");
      }
      data.append("file", file);
      for (let x in formData) {
        data.append(x, formData[x]);
      }

      setUploadLoading(true);

      let successCallback = (res?: any, msg?: any) => {
        Message.success(msg || "添加成功");
        setUploadLoading(false);
        onOk();
      };

      let failedCallback = (err?: any, msg?: any) => {
        Message.error(msg || "添加失败");
        setUploadLoading(false);
      };
      data.append("type", type);
      if (params && Object.keys(params).length > 0) {
        //判断是否有文件名选择是重新上传还是修改
        if (nameEl.value) {
          //重新上传
          Promise.all([
            userManualApi.delete(params.id),
            userManualApi.upload(data)
          ]).then(
            res => {
              if (res[1].code == 200) {
                successCallback(null, "修改成功");
              } else {
                let msg = "修改失败";
                if (res[1].desc) msg = res[1].desc;
                failedCallback(null, msg);
              }
            },
            err => {
              failedCallback(err);
            }
          );
        } else {
          //修改
          userManualApi
            .update({
              id: params.id,
              fileName: formData.fileName
            })
            .then(
              res => {
                if (res.code == 200) {
                  successCallback(null, "修改成功");
                } else {
                  let msg = "修改失败";
                  if (res.desc) msg = res.desc;
                  failedCallback(null, msg);
                }
              },
              err => {
                failedCallback(err);
              }
            );
        }
      } else {
        //新建
        userManualApi.upload(data).then(
          res => {
            if (res.code == 200) successCallback();
            else failedCallback();
          },
          err => {
            failedCallback(err);
          }
        );
      }
    }
  };

  const FileContent = () => {
    if (visible) {
      return (
        <Input
          type="file"
          className="file-content"
          onChange={handleImportFileChange}
        />
      );
    } else return "";
  };

  const handleCancel = () => {
    if (uploadLoading) return;
    onCancel && onCancel();
  };

  return (
    <Modal
      className="new-nursing-rules-add-modal"
      title={params.id ? "修改" : "添加"}
      onOk={handleOkBtn}
      centered
      confirmLoading={uploadLoading}
      onCancel={handleCancel}
      visible={visible}
    >
      <ModalContent>
        <Form ref={refForm}>
          <div className="row">
            <span className="label">文件名称:</span>
            <span className="content">
              <Form.Field name="fileName">
                <Input className="ipt" />
              </Form.Field>
            </span>
          </div>
          <div className="row">
            <span className="label">文件上传:</span>
            <span className="content">
              <input
                readOnly
                className="ipt ant-input file-name"
                placeholder="请上传文件"
              />
              <Button onClick={openImportFile} className="more">
                ...
              </Button>
              <span style={{ display: "none" }}>{FileContent()}</span>
            </span>
          </div>
        </Form>
      </ModalContent>
    </Modal>
  );
}

const ModalContent = styled.div`
  .row {
    display: flex;
    margin-bottom: 10px;
    .label {
      width: 90px;
      text-align: right;
      line-height: 32px;
    }
    .content {
      .ipt {
        width: 260px !important;
      }
      input,
      button,
      .ant-select {
        vertical-align: middle;
        margin-left: 20px;
      }
      .more {
        width: 50px;
      }
    }
  }
`;
