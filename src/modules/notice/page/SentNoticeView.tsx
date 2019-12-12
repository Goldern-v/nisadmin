import styled from "styled-components";
import React, { useState, useEffect, SetStateAction, Dispatch } from "react";
import { Select, Button, message } from "antd";
import { RouteComponentProps } from "react-router";
import createModal from "src/libs/createModal";
import SelectPeopleModal from "./modal/SelectPeopleModal";
import SelectPeopleModal_wh from "./modal-wh/SelectPeopleModal";
import { ChangeEvent } from "react";
import service from "src/services/api";
import { getFileSize, getFileType, getFilePrevImg } from "src/utils/file/file";
import { noticeService } from "../serveices/NoticeService";
import { appStore } from "src/stores";
import Zimage from "src/components/Zimage";
import { FileType } from "src/types/file";
import { Icon, Spin } from "src/vendors/antd";
interface User {
  label?: string;
  key: string;
}
export interface Props extends RouteComponentProps {}

export interface CheckUserItem {
  key: string;
  userList: any[];
}
export interface FileItem {
  name: string;
  size: string;
  type: string;
  id: string;
  path: string;
  fileType?: FileType;
}
export default function SentNoticeView() {
  const [title, setTitle]: [
    string,
    Dispatch<SetStateAction<string>>
  ] = useState("");
  const [content, setContent]: [
    string,
    Dispatch<SetStateAction<string>>
  ] = useState("");
  const [fileList, setFileList]: [
    FileItem[],
    Dispatch<SetStateAction<FileItem[]>>
  ] = useState([] as FileItem[]);
  const [checkedUserList, setCheckedUserList]: any = useState([]);
  const [pageLoading, setPageLoading]: any = useState(false);
  const [templateId, setTemplateId] = useState("");
  const [templateType, setTemplateType] = useState("");
  const selectPeopleModal = createModal(
    appStore.HOSPITAL_ID == "wh" ? SelectPeopleModal_wh : SelectPeopleModal
  );
  // const selectPeopleModal = createModal(SelectPeopleModal)
  const fileInputRef = React.createRef<HTMLInputElement>();
  const openSelectPeopleModal = () => {
    selectPeopleModal.show({
      checkedUserList: checkedUserList
    });
  };
  const onOkCallBack = (checkedUserList: CheckUserItem[]) => {
    setCheckedUserList(checkedUserList);
  };
  const updateFile = () => {
    fileInputRef.current && fileInputRef.current.click();
  };
  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.persist();
    let promiseList = [];
    let files = e.target.files || [];

    for (let i = 0; i < files.length; i++) {
      let postData = new FormData();
      postData.append("file", files[i]);
      promiseList.push(
        service.commonApiService.uploadAttachment(
          "mail",
          postData,
          (ProgressEvent: any) => {
            if (ProgressEvent.total > 100 * 1024 * 1024) {
              setTimeout(() => {
                message.warning("附件大小不能超过100M!");
              }, 100);
              setTimeout(() => {
                message.warning("附件大小不能超过100M!");
              }, 1000);

              Promise.reject("附件大小不能超过100M！");
            }
          }
        )
      );
    }
    let hideLoading = message.loading("正在上传，请稍等", 0);
    Promise.all(promiseList)
      .then(res => {
        let list: any = [
          ...fileList,
          ...res.map(({ data: item }: any) => {
            return {
              ...item,
              size: getFileSize(item.size),
              fileType: getFileType(item.path)
            };
          })
        ];
        setFileList(list);
        if (!title && list[0] && list[0].name) {
          setTitle(list[0].name.split(".")[0]);
        }
        hideLoading();
      })
      .catch(e => {
        hideLoading();
      });
  };

  const sendMail = () => {
    let hideLoading = message.loading("消息正在发送中...", 0);
    let id: any = templateId;
    let postObj: any = {
      id: templateType == "草" ? id : "",
      title,
      content
    };
    if (templateType == "转发") {
      postObj.forwardId = id;
    }
    noticeService
      .sendMail({
        mail: postObj,
        empNos: checkedUserList.reduce((prev: any, current: any) => {
          return [...prev, ...current.userList.map((item: any) => item.empNo)];
        }, []),
        fileIds: fileList.map(item => item.id),
        tempSave: false
      })
      .then(res => {
        hideLoading();
        message.success("消息发送成功！");
        appStore.history.replace("/notice?selectedMenu=发件箱");
      })
      .catch(() => {
        hideLoading();
      });
  };
  const saveTemplateMail = () => {
    let hideLoading = message.loading("消息正在存草稿...");
    let id: any = templateId;
    let postObj: any = {
      id: templateType == "草" ? id : "",
      title,
      content
    };
    noticeService
      .sendMail({
        mail: postObj,
        empNos: checkedUserList.reduce((prev: any, current: any) => {
          return [...prev, ...current.userList.map((item: any) => item.empNo)];
        }, []),
        fileIds: fileList.map(item => item.id),
        tempSave: true
      })
      .then(res => {
        hideLoading();

        message.success("消息存草稿成功！");
        appStore.history.push(`/notice?selectedMenu=草稿箱`);

        // appStore.history.push(`/notice?selectedMenu=草稿箱&id=${res.data.id}`)
        // res.data && res.data.id && setTemplateId(res.data.id)
      })
      .catch(() => {
        hideLoading();
      });
  };
  const deleteFile = (index: number) => {
    fileList.splice(index, 1);
    setFileList([...fileList]);
  };
  const onBack = () => {
    if (templateType == "转发") {
      appStore.history.push("/notice");
    } else {
      templateId
        ? appStore.history.push(`/notice?selectedMenu=草稿箱&id=${templateId}`)
        : appStore.history.push("/notice");
    }
  };

  const onDeselect = (user: User | User[]) => {
    if (user instanceof Array) {
      for (let i = 0; i < user.length; i++) {
        let index = checkedUserList.findIndex(
          (item: any) => item.key === user[i].key
        );
        if (index > -1) {
          checkedUserList.splice(index, 1);
        }
      }
      setCheckedUserList([...checkedUserList]);
    } else {
      let index = checkedUserList.findIndex(
        (item: any) => item.key === user.key
      );
      if (index > -1) {
        checkedUserList.splice(index, 1);
        setCheckedUserList([...checkedUserList]);
      }
    }
  };

  useEffect(() => {
    if (appStore.queryObj.templateId) {
      setPageLoading(true);
      setTemplateId(appStore.queryObj.templateId);
      setTemplateType(appStore.queryObj.templateType);
      noticeService
        .getDetail("草稿箱", appStore.queryObj.templateId)
        .then((res: any) => {
          setPageLoading(false);
          if (appStore.queryObj.templateType == "转发") {
            if (!res.data.title.includes("转发")) {
              res.data.title = "转发：" + res.data.title;
            }
            res.data.receiverList = [];
          }
          setTitle(res.data.title);
          setContent(res.data.content);
          setFileList(
            res.data.attachmentList.map((item: any) => {
              return {
                ...item,
                size: getFileSize(item.size),
                fileType: getFileType(item.path)
              };
            })
          );
          setCheckedUserList(
            res.data.receiverList.map((item: any) => {
              return {
                key: item.empName,
                userList: [item]
              };
            })
          );
        });
    }
  }, []);

  let hasContent = !!(title + content + fileList + checkedUserList);
  return (
    <Spin spinning={pageLoading}>
      <Wrapper>
        {/* {JSON.stringify(checkedUserList)} */}
        <InputBox>
          <div className="label">主&nbsp;题</div>
          <div className="input-con">
            <input
              type="text"
              className="text-input"
              placeholder="请输入主题"
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
            />
          </div>
        </InputBox>
        <InputBox>
          <div className="label">
            收件人
            <img
              src={require("../images/添加.png")}
              alt=""
              className="add-icon"
              onClick={openSelectPeopleModal}
            />
          </div>

          <div className="input-con" onClick={openSelectPeopleModal}>
            <Select
              mode="tags"
              placeholder="请添加收件人"
              value={checkedUserList}
              labelInValue={true}
              style={{ width: "100%" }}
              open={false}
              onDeselect={onDeselect}
            />
          </div>
        </InputBox>
        <InputBox style={fileList.length > 0 ? { border: 0 } : {}}>
          <div className="label">
            附&nbsp;件
            <img
              src={require("../images/添加.png")}
              alt=""
              className="add-icon"
              onClick={updateFile}
            />
          </div>

          <div
            className="input-con"
            onClick={updateFile}
            style={{ cursor: "pointer" }}
          />
          <div className="" />
        </InputBox>
        {fileList.length > 0 && (
          <FilesBox>
            {fileList.map((item: FileItem, index: number) => (
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
        <input
          type="file"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={onFileChange}
          multiple={true}
        />
        <Textarea
          className="scrollBox"
          placeholder="请输入消息内容..."
          value={content}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setContent(e.target.value)
          }
        />
        <FooterCon>
          <Button
            type="primary"
            style={{ marginRight: 15 }}
            onClick={sendMail}
            disabled={!hasContent}
          >
            发 送
          </Button>
          {templateType !== "转发" && (
            <Button
              style={{ marginRight: 15 }}
              onClick={saveTemplateMail}
              disabled={!hasContent}
            >
              存草稿
            </Button>
          )}

          <Button onClick={onBack}> 取 消 </Button>
        </FooterCon>
        <selectPeopleModal.Component onOkCallBack={onOkCallBack} />
      </Wrapper>
    </Spin>
  );
}
const Wrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: ${p => p.theme.$headerHeight};
  background: #fff;
  padding-top: 5px;
  display: flex;
  flex-direction: column;
`;

const InputBox = styled.div`
  min-height: 45px;
  border-bottom: 1px solid #dddddd;
  display: flex;
  align-items: center;
  overflow: hidden;
  .label {
    color: #333333;
    width: 110px;
    padding-left: 28px;
    font-weight: bold;
  }
  .input-con {
    flex: 1;
    min-height: 45px;
  }
  .text-input {
    border: 0;
    outline: none;
    width: 100%;
    min-height: 45px;
    font-size: 14px;
    font-weight: bold;
    color: #333333;
    padding-left: 10px;
    &::-webkit-input-placeholder {
      color: #bfbfbf;
      font-weight: normal;
    }
  }
  .add-icon {
    width: 14px;
    height: 14px;
    float: right;
    margin-top: 3px;
    margin-right: 13px;
    cursor: pointer;
  }
  .ant-select-selection {
    min-height: 30px;
    max-height: 120px;
    overflow: auto;
    padding: 8px 0;
    border: 0;
    outline: none;
    box-shadow: none !important;
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
  }
`;
const FilesBox = styled.div`
  padding: 12px 30px 12px;
  margin-top: -12px;
  border-bottom: 1px solid #ddd;
  overflow: auto;
  max-height: 120px;
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
    width: 260px;
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

const Textarea = styled.textarea`
  width: 100%;
  flex: 1;
  height: 0;
  outline: 0;
  border: 0;
  resize: none;
  padding: 15px 30px;
`;

const FooterCon = styled.div`
  height: 60px;
  background: rgba(247, 247, 247, 1);
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 30px;
`;
