import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router";
import { Button, Modal, message as Message, Select, message } from "antd";
import { Link } from "react-router-dom";
import BaseTable, { DoCon } from "src/components/BaseTable";
import { ColumnProps } from "antd/lib/table";
import DeptSelect from "src/components/DeptSelect";

import DeptFileEditModal from "./../components/DeptFileEditModal";

import createModal from "src/libs/createModal";

import DeptFielShareService from "./../api/DeptFielShareService";
import PreviewModal from "src/utils/file/modal/PreviewModal";
import moment from 'moment'

const api = new DeptFielShareService();

export interface Props extends RouteComponentProps { }

const Option = Select.Option;

export default function DeptFileShare() {
  const [tableData, setTableData] = useState([] as any);
  const [dataTotal, setDataTotal] = useState(0 as number);

  const [editParams, setEditParams] = useState({} as any);

  const [editVisible, setEditVisible] = useState(false);

  const PreviewModalWrapper = createModal(PreviewModal);

  const [catalogList, setCatalogList] = useState([] as any);

  const [query, setQuery] = useState({
    deptCode: "",
    fileName: "",
    catalog: "",
    pageSize: 20,
    pageIndex: 1
  } as any);
  // useEffect(() => {

  // }, []);

  useEffect(() => {
    if (query.deptCode) {
      getTableData();
    }
  }, [query]);

  const [tableLoading, setTableLoading] = useState(false);

  const columns: ColumnProps<any>[] = [
    {
      title: "序号",
      dataIndex: "key",
      key: "key",
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
      key: "fileName",
      className: "align-left",
      align: "left",
      render: (text: string) => {
        return (
          <div className="rule-name" title={text}>
            {text}
          </div>
        );
      }
    },
    {
      title: "文件格式",
      key: "fileType",
      align: "center",
      width: 80,
      render: (text: string, record: any) => {
        let typeArr = record.originalFileName.split(".");
        return typeArr[typeArr.length - 1] || "";
      }
    },
    {
      title: "目录",
      dataIndex: "catalog",
      key: "catalog",
      align: "center",
      width: 180
    },
    {
      title: "上传日期",
      dataIndex: "uploadTime",
      key: "uploadTime",
      align: "center",
      width: 150
    },
    {
      title: "上传人",
      dataIndex: "empName",
      key: "empName",
      align: "center",
      width: 70
    },
    {
      title: "操作",
      key: "opetation",
      align: "center",
      width: 140,
      render: (text: string, record: any) => {
        return (
          <DoCon>
            <span onClick={() => handlePreview(record)}>预览</span>
            <span onClick={() => reUpload(record)}>修改</span>
            <span onClick={() => handleDelete(record)}>删除</span>
            <span onClick={() => handleDownload(record)}>下载</span>
          </DoCon>
        );
      }
    }
  ];

  const handlePreview = (record: any) => {
    // let typeArr = record.originalFileName.split(".");
    if (!record.path) {
      message.error('上传文件路径为空')
      return
    }

    let path = `/crNursing/asset${record.path}`

    PreviewModalWrapper.show({
      path,
      // type: typeArr[typeArr.length - 1],
      title: record.fileName
    });
  };
  const reUpload = (record: any) => {
    setEditParams({
      id: record.id,
      fileName: record.fileName,
      catalog: record.catalog || ""
    });
    setEditVisible(true);
  };

  const fileDownload = (res: any, record?: any) => {
    let fileType: any = record.originalFileName.split(".");
    fileType = fileType[fileType.length - 1];
    let filename = [record.fileName, fileType].join(".");
    // decodeURIComponent
    // "attachment;filename=????2019-3-18-2019-3-24??.xls"
    // "application/json"
    let blob = new Blob([res.data], {
      type: res.data.type // 'application/vnd.ms-excel;charset=utf-8'
    });
    // console.log('fileDownload', res)
    // if (res.data.type && res.data.type.indexOf('excel') > -1) {
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
        api
          .delete(record.id)
          .then(res => {
            if (res.code == 200) {
              Message.success("文件删除成功");
              getTableData();
            } else Message.error("文件删除失败");
          })
          .catch(err => {
            Message.error("文件删除失败");
          });
      }
    });
  };

  const handleDeptChange = (deptCode: any) => {
    setQuery({ ...query, deptCode, catalog: "" });
    api.getCatalog({ deptCode }).then(res => {
      if (res.data) setCatalogList(res.data);
    });
  };

  const handleEditCancel = () => {
    setEditVisible(false);
    setEditParams({});
  };

  const handleEditOk = () => {
    getTableData();
    handleEditCancel();
  };

  const getTableData = () => {
    setTableLoading(true);
    console.log(123);

    api.getList(query).then(
      res => {
        setTableLoading(false);
        if (res.data) {
          setDataTotal(res.data.totalCount || 0);
          console.log(res.data.list);
          setTableData(res.data.list);
        }
      },
      err => {
        setTableLoading(false);
      }
    );
  };

  const handleDownload = (record: any) => {
    api.getFileContent(record.id).then(res => {
      fileDownload(res, record);
    });
  };

  return (
    <Wrapper>
      <div className="topbar">
        <div className="float-left">
          <div className="item title">病区文件</div>
        </div>
        <div className="float-right">
          <div className="item">
            <div className="label">科室：</div>
            <div className="content">
              <DeptSelect onChange={handleDeptChange} />
            </div>
          </div>
          <div className="item">
            <div className="label">目录：</div>
            <div className="content">
              <Select
                value={query.catalog}
                onChange={(catalog: any) => setQuery({ ...query, catalog })}
                style={{ width: 150 }}
              >
                <Option value="">全部</Option>
                {catalogList.map((item: any, index: number) => (
                  <Option value={item.catalog} key={item.id}>
                    {item.catalog}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
          <div className="item link">
            <Link to="/deptFileShareCatalogSetting">目录设置</Link>
          </div>
          <div className="item">
            <Button onClick={() => getTableData()}>查询</Button>
          </div>
          <div className="item">
            <Button type="primary" onClick={() => setEditVisible(true)}>
              添加
            </Button>
          </div>
        </div>
      </div>
      <div className="main-contain">
        <BaseTable
          columns={columns}
          rowKey="id"
          dataSource={tableData}
          loading={tableLoading}
          surplusHeight={235}
          pagination={{
            pageSizeOptions: ["10", "20", "30", "40", "50"],
            onShowSizeChange: (pageIndex, pageSize) =>
              setQuery({ ...query, pageSize }),
            onChange: (pageIndex, pageSize) =>
              setQuery({ ...query, pageIndex }),
            total: dataTotal,
            showSizeChanger: true,
            showQuickJumper: true,
            pageSize: query.pageSize,
            current: query.pageIndex
          }}
        />
      </div>
      <DeptFileEditModal
        visible={editVisible}
        params={editParams}
        deptCode={query.deptCode}
        catalogList={catalogList}
        onCancel={handleEditCancel}
        onOk={handleEditOk}
      />
      <PreviewModalWrapper.Component />
    </Wrapper>
  );
}
const Wrapper = styled.div`
  position: relative;
  padding-top: 65px;
  height: 100%;
  width: 100%;

  div.topbar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 10px 15px;
    box-sizing: border-box;
    padding-top: 18px;
    height: 60px;
    overflow: hidden;
    .float-left {
      float: left;
    }

    .float-right {
      float: right;
    }

    .item {
      display: inline-block;
      margin-right: 10px;
      vertical-align: middle;
      :last-of-type {
        margin-right: 0;
      }
      &.title {
        font-size: 20px;
        color: #000;
        font-weight: bold;
        margin-left: 5px;
      }
      &.link {
        margin-right: 50px;
      }
      & > div {
        display: inline-block;
        vertical-align: middle;
      }
      .label {
      }
      .content {
        .year-picker {
          width: 95px;
        }
        .report-record {
          min-width: 140px;
        }
      }
    }
  }

  .main-contain {
    height: 100%;
    width: 100%;
    padding: 15px;
    padding-top: 0;
    td {
      position: relative;
      &.align-left {
        padding-left: 15px !important;
      }
      div.rule-name {
        position: absolute;
        left: 15px;
        right: 15px;
        line-height: 30px;
        top: 0;
        bottom: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
`;
