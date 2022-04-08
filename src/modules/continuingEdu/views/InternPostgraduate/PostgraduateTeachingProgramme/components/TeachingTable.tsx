import styled from "styled-components";
import { observer } from "mobx-react-lite";
import React, { useState, useEffect } from "react";
import BaseTable, { DoCon } from "src/components/BaseTable";
import { Button, Modal, message as Message } from "antd";
import {internPostgraduateApi} from "../../api/InternPostgraduate";
import {teachingPost} from "../TeachingPost"
import { getFileType, getFilePrevImg } from "src/utils/file/file";
import ReactZmage from "react-zmage";
import PreviewModal from "src/utils/file/modal/PreviewModal";
import createModal from "src/libs/createModal";
import { appStore } from "src/stores";
import qs from "qs";

interface Props {}

export default observer(function ApplyTable(props: Props) {
  const [editVisible, setEditVisible] = useState(false); // 控制一弹窗状态
  const [editParams, setEditParams] = useState({} as any); //修改弹窗回显数据
  const [tableLoading, settableLoading] = useState(false); //tabel的loading的控制
  const [tableData, setTableData] = useState([] as any) //tabel的数据
  const [tablequery, setTableQuery] = useState({
    pageIndex: 1,
    pageSize: 20,
    quarter: '',
    keyWord: '',
  } as any)

  const columns: any = [
    {
      title: "序号",
      dataIndex: "",
      render: (text: any, record: any, index: number) => index + 1,
      align: "center",
      width: 60
    },
    {
      title: "标题",
      dataIndex: "courseName",
      align: "center",
      width: 200
    },
    {
      title: "提交人",
      dataIndex: "submitter",
      align: "center",
      width: 80
    },
    {
      title: "提交时间",
      dataIndex: "uploadDate",
      align: "center",
      width: 100
    },
    {
      title: "修改时间",
      dataIndex: "modifyDate",
      align: "center",
      width: 100
    },
    {
      title: "操作",
      dataIndex: "cz",
      width: 100,
      align: "center",
      render(text: any, record: any) {
        let data: any = [{
          text: "下载",
          function: handDownload
        },
        {
          text: "预览",
          function: handlePreview
        },
        {
          text: "删除",
          color:'#f44',
          function: handleDelete
        }];
        return (
          <DoCon>
            {data.map((item: any, index: any) => (
              <span
                key={index}
                style={{color:item.color?item.color:''}}
                onClick={() => (item.function ? item.function(record) : {})}
              >
                {item.text}
              </span>
            ))}
          </DoCon>
        );
      }
    }
  ];

   //删除
   const handleDelete = (record: any) => {
    let content = (
      <div>
        <div>您确定要删除选中的记录吗？</div>
      </div>
    );
    Modal.confirm({
      title: "提示",
      content,
      okText: "确定",
      okType: "danger",
      cancelText: "取消",
      onOk: () => {
        internPostgraduateApi
          .deleteQueryPageList(record.id)
          .then(res => {
            if (res.code == 200) {
              Message.success("文件删除成功");
              teachingPost.onload();
            } else {
              Message.error(`${res.dec}`);
            }
          })
          .catch(e => {});
      }
    });
  };

  const previewModal = createModal(PreviewModal);
   // 点击预览
   const handlePreview = (record:any) => {
    if (getFileType(record.coursePath) == "img")
      ReactZmage.browsing({
        backdrop: "rgba(0,0,0, .8)",
        set: [{ src: record.coursePath }],
      });
    else
    console.log(record);
      previewModal.show({
        title: record.courseName,
        path: record.coursePath,
      });
  };

  // 下载
  const handDownload = (record: any) => {
    console.log(record.coursePath);
    let a = document.createElement("a");
    a.href = record.coursePath;
    a.download = record.courseName; // 自定义文件名
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a); // 移除a元素
  };
  const handleEditCancel = () => {
    setEditVisible(false);
    setEditParams({});
  };
  const handleEditOk = () => {
    handleEditCancel();
  };

  return (
    <Wrapper>
      <BaseTable
        loading={teachingPost.tableLoading}
        dataSource={teachingPost.tableList}
        columns={columns}
        surplusHeight={230}
        pagination={{
          current: teachingPost.pageIndex,
          total: teachingPost.total,
          pageSize: teachingPost.pageSize,
        }}
        onChange={(pagination) => {
          teachingPost.pageIndex = pagination.current;
          teachingPost.total = pagination.total;
          teachingPost.pageSize = pagination.pageSize;
          teachingPost.onload();
        }}
      />
      {/* <FormEditModal
        visible={editVisible}
        params={editParams}
        onCancel={handleEditCancel}
        onOk={handleEditOk}
      /> */}
    </Wrapper>
  );
});
const Wrapper = styled.div`
  padding: 0 20px;
  box-sizing: border-box;
`;
