import styled from "styled-components";
import React, { useState, useEffect, ChangeEvent } from "react";
import {
  Button,
  Icon,
  message,
  Progress,
} from "antd";
import { getFileType, getFileSize, getFilePrevImg } from "src/utils/file/file";
import Zimage from "src/components/Zimage";
import service from "src/services/api";

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
const TYPES = [
  'png', 'jpg', 'jpeg', 'pdf', 'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'mp4'
]
/** 
 * count: 上传个数
 * allowType?: 允许上传附件格式 */
export interface Props {
  path?: string,
  setList: Function,
  list: any[],
  count?: number,
  isSample?: boolean, 
  allowType?: string[],
  uploadable?: boolean
}
/**上传附件 */
export default function Upload(props: Props) {
  const { path = 'NursingBook', setList, list, count = 3, isSample = true, allowType = TYPES, uploadable = true } = props
  const fileInputRef = React.createRef<HTMLInputElement>();
  const [fileList, setFileList] = useState<any[]>([]);

  /** 上传文件状态 */
  const [progressEventMap, setProgressEventMap]: any = useState({});
  let totalFileSize = 0;
  let loadedFileSize = 0;
  for (let key in progressEventMap) {
    if (progressEventMap[key].total) {
      totalFileSize += progressEventMap[key].total;
      loadedFileSize += progressEventMap[key].loaded;
    }
  }

  useEffect(() => {
    if (JSON.stringify(list) === JSON.stringify(fileList)) return
    setFileList(list);
  }, [list]);

  // useEffect(() => {
  //   setList(fileList);
  // }, [fileList]);

  const deleteFile = (index: number) => {
    fileList.splice(index, 1);
    setFileList([...fileList]);
    setFileList(v => {
      setList(v);
      return v
    })

  };
  const updateFile = () => {
    fileInputRef.current && fileInputRef.current.click();
  };
  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.persist();
    let promiseList: any[] = [];
    let files = e.target.files || [];

    if (files.length + fileList.length > count) {
      return message.warning(`附件最多允许${count}个!`)
    }
    
    for (let i = 0; i < files.length; i++) {
      // 过滤后缀
      let name = files[i].name;
      let index = name.lastIndexOf(".");
      let ext = name.substring(index + 1);
      if (allowType.indexOf(ext) === -1) return message.warning("请上传支持格式的文件!")
      
      let postData = new FormData();
      postData.append("file", files[i]);
      promiseList.push(() =>
        service.commonApiService.uploadAttachment(path, postData, (progressEvent: any) => {
          let fileName = files[i].name;
          setProgressEventMap({
            ...progressEvent,
            [fileName]: progressEvent
          });
        })
      );
    }
    let hideLoading = message.loading("正在上传，请稍等", 0);
    let list: any = [...fileList];
    if (promiseList && promiseList.length > 0) {
      promiseList
        .reduce((total: any, current, index, arr) => {
          if (total) {
            return total.then((res: any) => {
              let item = {
                ...res.data,
                size: getFileSize(res.data.size),
                fileType: getFileType(res.data.path),
              }
              list.push(item)
              /** 最后一项 */
              if (index === arr.length - 1)
                return current().then((res: any) => {
                  let item = {
                    ...res.data,
                    size: getFileSize(res.data.size),
                    fileType: getFileType(res.data.path),
                  }
                  list.push(item)
                })
              return current()
            })
          } else {
            /** 如果只上传一个 */
            if (arr.length === 1) {
              return current().then((res: any) => {
                let item = {
                  ...res.data,
                  size: getFileSize(res.data.size),
                  fileType: getFileType(res.data.path),
                }
                list.push(item)
              })
            }
            return current()
          }
        }, 0)
        .then((res: any) => {
          setFileList(list)
          setFileList(v => {
            setList(v);
            return v
          })
          setProgressEventMap({})
          hideLoading()
        })
        .catch((e: any) => {
          hideLoading()
        })
    } else {
      hideLoading()
    }
  };

  return (
    <Wrapper>
      {fileList.length < count && <div className="btn-con">
        <Button onClick={updateFile} disabled={!uploadable}>
          <Icon type="upload" />
          上传附件
        </Button>
        <span className="aside">
          仅支持格式:{allowType.join('、')};最多可上传{count}份
        </span>
      </div>}
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
                {getFileType(item.path) === "img" ? (
                  <Zimage src={item.path} className="type-img" alt="" />
                ) : (
                  <a href={item.path}>
                    <img
                      src={getFilePrevImg(item.path)}
                      className="type-img"
                      alt=""
                      />
                  </a>
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
  position: relative;

  .btn-con {
    margin: 5px 0px;
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
`;
const FilesBox = styled.div`
  padding: 5px 5px;
  overflow: auto;
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
