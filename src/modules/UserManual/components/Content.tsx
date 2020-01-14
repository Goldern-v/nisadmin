import styled from "styled-components";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { appStore } from "src/stores";
import { Button, Modal, message as Message, Input } from "antd";
import { TableHeadCon } from "src/components/BaseTable";
import { PageTitle } from "src/components/common";
import BaseTable, { DoCon } from "src/components/BaseTable";
import FileEditModal from "../modal/FileEditModal";
import PreviewModal from "../modal/PreviewModal";
import createModal from "src/libs/createModal";
import { userManualApi } from "../api/UserManualApi";
interface Props {
  getTitle: any;
}

export default function RightContent(props: Props) {
  const { getTitle } = props; //获取当前页面标题
  const [auth, setAuth] = useState(Boolean); //权限控制
  const PreviewModalWrapper = createModal(PreviewModal); //预览弹窗
  const [searchText, setSearchText] = useState(""); // 搜索内容
  const [editVisible, setEditVisible] = useState(false);
  const [editParams, setEditParams] = useState({} as any);
  const [loading, setLoading] = useState(false); // loading
  const [tableList, setTableList] = useState([] as any); //表格数据
  const [totalCount, setTotalCount] = useState(Number); // 总页码
  const [effect, setEffect] = useState(true);
  const [query, setQuery] = useState({
    type: getTitle,
    fileName: "",
    pageSize: 20,
    pageIndex: 1
  } as any);

  useLayoutEffect(() => {
    setEffect(false);
  }, []);

  // 初始化
  useEffect(() => {
    setEffect(true);
    getTableData();
  }, [query]);

  // 查询
  const getTableData = () => {
    if (effect) {
      setLoading(true);
      userManualApi.getData(query).then(res => {
        setLoading(false);
        if (res.data.data) {
          setTableList(res.data.data.list || []);
          setTotalCount(res.data.data.totalCount || 0);
          setAuth(res.data.role || false);
        }
      });
    }
  };

  // 输入查询
  const onSearch = () => {
    setQuery({ ...query, fileName: searchText });
  };
  const onChangeSearchText = (e: any) => {
    setSearchText(e.target.value);
  };

  // 添加/修改
  const reUpload = (record: any) => {
    setEditParams({
      id: record.id,
      fileName: record.fileName
    });
    setEditVisible(true);
  };
  const handleEditCancel = () => {
    setEditVisible(false);
    setEditParams({});
  };
  const handleEditOk = () => {
    getTableData();
    handleEditCancel();
  };

  // 删除
  const handleDelete = (record: any) => {
    let content = (
      <div>
        <div>您确定要删除选中的记录吗？</div>
        <div>删除后将无法恢复。</div>
      </div>
    );
    Modal.confirm({
      title: "提示",
      content,
      okText: "确定",
      okType: "danger",
      cancelText: "取消",
      onOk: () => {
        userManualApi
          .delete(record.id)
          .then(res => {
            if (res.code == 200) {
              Message.success("文件删除成功");
              getTableData();
            } else {
              Message.error("文件删除失败");
            }
          })
          .catch(err => {
            Message.error("文件删除失败");
          });
      }
    });
  };

  // 预览
  const handlePreview = (record: any) => {
    PreviewModalWrapper.show({
      url: `/crNursing/asset/userManual${record.path}`,
      name: record.fileName,
      type: record.fileType
    });
  };

  // 下载
  const fileDownload = (res: any, record?: any) => {
    let fileType: any = record.originalFileName.split(".");
    fileType = fileType[fileType.length - 1];
    let filename = [record.fileName, fileType].join(".");
    let blob = new Blob([res.data], {
      type: res.data.type
    });
    if (true) {
      let a = document.createElement("a");
      let href = window.URL.createObjectURL(blob); // 创建链接对象
      a.href = href;
      a.download = filename; // 自定义文件名
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(href);
      document.body.removeChild(a); // 移除a元素
    }
  };
  const handleDownload = (record: any) => {
    userManualApi.getFileContent(record.id).then(res => {
      fileDownload(res, record);
    });
  };

  const columns: any = [
    {
      title: "序号",
      dataIndex: "key",
      key: "index",
      width: 50,
      align: "center",
      render: (text: string, record: any, index: number) => {
        const { pageIndex, pageSize } = query;
        return (pageIndex - 1) * pageSize + index + 1;
      }
    },
    {
      title: "文件名称",
      dataIndex: "fileName",
      align: "left"
    },
    {
      title: "文件格式",
      dataIndex: "fileType",
      width: 80,
      align: "center"
    },
    {
      title: "上传日期",
      dataIndex: "uploadTime",
      width: 150,
      align: "center"
    },
    {
      title: "上传人",
      dataIndex: "empName",
      width: 70,
      align: "center"
    },
    {
      title: "操作",
      dataIndex: "操作",
      width: 140,
      render(text: string, record: any) {
        return (
          <DoCon>
            <span onClick={() => handlePreview(record)}>预览</span>
            {auth && <span onClick={() => reUpload(record)}>修改</span>}
            {auth && <span onClick={() => handleDelete(record)}>删除</span>}
            <span onClick={() => handleDownload(record)}>下载</span>
          </DoCon>
        );
      }
    }
  ];

  return (
    <Wrapper>
      <Header>
        <LeftIcon>
          <PageTitle maxWidth={1000}>{getTitle}</PageTitle>
        </LeftIcon>
        <RightIcon>
          <Input
            placeholder="请输入文件名称关键字搜索"
            style={{ width: "230px", marginLeft: "10px" }}
            value={searchText}
            onChange={onChangeSearchText}
          />
          <Button onClick={onSearch}>查询</Button>
          {auth && (
            <Button type="primary" onClick={() => setEditVisible(true)}>
              添加
            </Button>
          )}
        </RightIcon>
      </Header>
      <Table>
        <BaseTable
          dataSource={tableList}
          columns={columns}
          surplusHeight={220}
          surplusWidth={300}
          nohorizontalScroll={appStore.wid > 1447}
          loading={loading}
          pagination={{
            pageSizeOptions: ["10", "20", "30", "40", "50"],
            onShowSizeChange: (pageIndex, pageSize) =>
              setQuery({ ...query, pageSize }),
            onChange: (pageIndex, pageSize) =>
              setQuery({ ...query, pageIndex }),
            total: totalCount,
            showSizeChanger: true,
            showQuickJumper: true,
            pageSize: query.pageSize,
            current: query.pageIndex
          }}
        />
      </Table>
      <FileEditModal
        visible={editVisible}
        params={editParams}
        type={getTitle}
        onCancel={handleEditCancel}
        onOk={handleEditOk}
      />
      <PreviewModalWrapper.Component />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;
const Header = styled(TableHeadCon)`
  justify-content: space-between;
  .ant-select {
    width: 230px;
    margin-right: 10px;
  }
  .ant-calendar-picker {
    margin-right: 20px;
  }
  button {
    margin-left: 10px;
  }
  .checkButton {
    margin-left: 0px;
  }
`;
const LeftIcon = styled.div`
  height: 55px;
  font-size: 13px;
  position: relative;
  font-size: 13px;
  color: #333333;
  padding: 0;
  display: flex;
  align-items: center;
`;
const RightIcon = styled.div`
  height: 55px;
  font-size: 13px;
  position: relative;
  font-size: 13px;
  color: #333333;
  padding: 0 0 0 15px;
  display: flex;
  align-items: center;
`;
const Table = styled.div`
  padding: 0 15px;
  box-sizing: border-box;
`;
