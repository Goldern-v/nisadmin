import styled from "styled-components";
import React, { useState, useEffect, ChangeEvent } from "react";
import { Button, Icon, message } from "antd";
import { getFileType, getFileSize, getFilePrevImg } from "src/utils/file/file";
import Zimage from "src/components/Zimage";
import { stepServices } from "../services/stepServices";
import { stepViewModal } from "../StepViewModal";
export interface Props {}

export default function Step4() {
  const fileInputRef = React.createRef<HTMLInputElement>();
  const [fileList, setFileList] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    console.log(
      stepViewModal.stepData4.attachmentIds,
      "stepViewModal.stepData4.attachmentIdsstepViewModal.stepData4.attachmentIds"
    );
    setFileList(stepViewModal.stepData4.attachmentIds);
  }, []);

  useEffect(() => {
    stepViewModal.stepData4.attachmentIds = fileList;
  }, [fileList]);

  const deleteFile = (index: number) => {
    fileList.splice(index, 1);
    setFileList([...fileList]);
  };
  const updateFile = () => {
    fileInputRef.current && fileInputRef.current.click();
  };
  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.persist();
    let promiseList: any = [];
    let files = e.target.files || [];

    for (let i = 0; i < files.length; i++) {
      let postData = new FormData();
      postData.append("file", files[i]);
      promiseList.push(stepServices.uploadAttachment(postData));
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
  return (
    <Wrapper>
      <div className="btn-con">
        <Button onClick={updateFile}>
          <Icon type="upload" />
          上传
        </Button>
      </div>
      <FileList>
        {fileList.length > 0 && (
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
        <input
          type="file"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={onFileChange}
          multiple={true}
        />
      </FileList>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  .btn-con {
    margin: 40px 30px 20px;
  }
`;
const FileList = styled.div``;
const FilesBox = styled.div`
  padding: 12px 30px 12px;
  margin-top: -12px;
  /* border-bottom: 1px solid #ddd; */
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
