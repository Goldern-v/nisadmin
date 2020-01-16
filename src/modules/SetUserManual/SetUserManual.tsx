import styled from "styled-components";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { appStore } from "src/stores";
import { Button, Modal, message as Message, Input, Switch } from "antd";
import { TableHeadCon } from "src/components/BaseTable";
import { PageTitle } from "src/components/common";
import BaseTable, { DoCon } from "src/components/BaseTable";
import createModal from "src/libs/createModal";
import { setUserManualApi } from "./api/SetUserManualApi";
import EditModal from "./modal/EditModal";

export default function SetUserManual() {
  // const [auth, setAuth] = useState(Boolean); //权限控制
  const [editVisible, setEditVisible] = useState(false);
  const [editParams, setEditParams] = useState({} as any);
  const [loading, setLoading] = useState(false); // loading
  const [tableList, setTableList] = useState([] as any); //表格数据
  const [effect, setEffect] = useState(true);
  const [editIdx, setEditIdx] = useState(-1);

  useLayoutEffect(() => {
    setEffect(false);
  }, []);

  // 初始化
  useEffect(() => {
    setEffect(true);
    getTableData();
  }, []);

  // 查询
  const getTableData = () => {
    if (effect) {
      setLoading(true);
      setUserManualApi.setGetData().then((res: any) => {
        setLoading(false);
        if (res.data) {
          setTableList(res.data || []);
        }
      });
    }
  };

  // 添加/修改
  const reUpload = (record: any) => {
    setEditParams({
      id: record.id,
      type: record.type,
      icon: record.icon,
      orderNo: record.orderNo,
      isShow: record.isShow
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
        setUserManualApi
          .setDel(record.id)
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

  // 手动输入目录顺序
  const setOrderNo = (e: any, index: number, record: any) => {
    setEditIdx(-1);
    let newArr = tableList.concat();
    if (newArr[index].orderNo == e.target.value) return;
    newArr[index].orderNo = e.target.value;
    setTableList(newArr);
    setLoading(true);
    setUserManualApi.saveOrUpdate(newArr[index]).then(
      (res: any) => {
        setLoading(false);
        if (res.code == "200") Message.success("修改成功");
        getTableData();
      },
      err => {
        setLoading(false);
      }
    );
  };

  const columns: any = [
    {
      title: "序号",
      dataIndex: "key",
      key: "index",
      width: 50,
      align: "center",
      render: (text: string, record: any, index: number) => {
        if (editIdx == index) {
          return (
            <Input
              size="small"
              defaultValue={record.orderNo}
              onBlur={e => setOrderNo(e, index, record)}
            />
          );
        } else {
          return (
            <span onClick={() => setEditIdx(index)}>{record.orderNo}</span>
          );
        }
      }
    },
    {
      title: "目录名称",
      dataIndex: "type",
      align: "left"
    },
    {
      title: "是否显示",
      dataIndex: "isShow",
      width: 100,
      align: "center",
      render: (text: any, record: any, index: any) =>
        record.id ? (
          <span>
            <Switch
              disabled={true}
              size="small"
              onChange={(check: any) => {
                record.isShow = check;
                setTableList([...tableList]);
              }}
              checked={text}
            />
          </span>
        ) : (
          ""
        )
    },
    {
      title: "操作",
      dataIndex: "操作",
      width: 150,
      render(text: string, record: any) {
        return (
          <DoCon>
            <span onClick={() => reUpload(record)}>修改</span>
            <span onClick={() => handleDelete(record)}>删除</span>
          </DoCon>
        );
      }
    }
  ];

  return (
    <Wrapper>
      <Header>
        <LeftIcon>
          <div className="item title">平台使用手册目录设置</div>
        </LeftIcon>
        <RightIcon>
          <Button onClick={() => setEditVisible(true)}>添加</Button>
        </RightIcon>
      </Header>
      <Table>
        <BaseTable
          dataSource={tableList}
          columns={columns}
          surplusHeight={250}
          loading={loading}
        />
      </Table>
      <EditModal
        visible={editVisible}
        params={editParams}
        onCancel={handleEditCancel}
        onOk={handleEditOk}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  padding-top: 55px;
  height: 100%;
  width: 100%;
`;
const Header = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 10px 15px;
  box-sizing: border-box;
  height: 55px;
  overflow: hidden;
  border-bottom: 1px solid #ddd;
  background: #fff;
  font-size: 16px;
  font-weight: bold;
`;
const LeftIcon = styled.div`
  float: left;
`;
const RightIcon = styled.div`
  float: right;
`;
const Table = styled.div`
  padding: 15px 15px;
  box-sizing: border-box;
  height: 100%;
  width: 650px;
`;
