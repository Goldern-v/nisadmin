import styled from "styled-components";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { appStore } from "src/stores";
import { Button, Select, Modal } from "antd";
import { TableHeadCon } from 'src/components/BaseTable'
import { PageTitle } from 'src/components/common'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import AddModal from "../modal/AddModal";
import PreviewModal from "../modal/PreviewModal";
import createModal from "src/libs/createModal";
interface Props {
  getTitle: any
}

export default function RightContent(props: Props) {
  const { getTitle } = props //获取当前页面标题
  const auth = true //权限控制
  const addModal = createModal(AddModal) //添加修改弹窗
  const previewModal = createModal(PreviewModal) //预览弹窗
  // 添加/修改
  const handleAdd = (type: number) => {
    switch (type) {
      case 1:
        {
          addModal.show (
            { title: '添加'}
          );
        }
      break;
      case 2:
        {
          addModal.show (
            { title: '修改'}
          );
        }
      break;
    }
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
      }
    });
  };
  // 预览
  const handlePreview = (record: any) => {
    previewModal.show()
  };
  // 下载
  const handleDownload = (record: any) => {
  };

  useEffect(() => {
  }, [])
  const tableList: any = [
    {
      name: "首页手册",
      type:"text",
      time: "2020-01-01 14:00",
      people: '吴敏'
    },
    {
      name: "审核管理手册",
      type:"text",
      time: "2020-01-01 14:00",
      people: '金梅'
    },
    {
      name: "排班管理手册",
      type:"text",
      time: "2020-01-01 14:00",
      people: '仲杰'
    },
    {
      name: "病区登记手册",
      type:"text",
      time: "2020-01-01 14:00",
      people: '石威'
    },
    {
      name: "通知公告手册",
      type:"text",
      time: "2020-01-01 14:00",
      people: '威军'
    }
  ]
  const columns: any = [
    {
      key: 'index',
      title: '序号',
      width: 50,
      align: 'center',
      render: (text: string, record: any, index: number) =>
        index + 1
    },
    {
      title: '文件名称',
      dataIndex: 'name',
      width: 320,
      align: 'left'
    },
    {
      title: '文件格式',
      dataIndex: 'type',
      width: 90,
      align: 'center'
    },
    {
      title: '上传日期',
      dataIndex: 'time',
      width: 180,
      align: 'center'
    },
    {
      title: '上传人',
      dataIndex: 'people',
      width: 110,
      align: 'center'
    },
    {
      title: '操作',
      dataIndex: '操作',
      width: 180,
      render(text: string, record: any) {
        return (
          <DoCon>
            <span onClick={() => handlePreview(record)}>预览</span>
            { auth && <span onClick={() => handleAdd(2)}>修改</span> }
            { auth && <span onClick={() => handleDelete(record)}>删除</span> }
            <span onClick={() => handleDownload(record)}>下载</span>
          </DoCon>
        )
      }
    }
  ]
  return (
    <Wrapper>
      <Header>
        <LeftIcon>
          <PageTitle maxWidth={1000}>{getTitle}</PageTitle>
        </LeftIcon>
        <RightIcon>
        <Select
          placeholder='请输入文件名称关键字搜索'
        >
        </Select>
        <Button onClick={() => {}}>查询</Button>
        { auth && <Button type='primary' onClick={() => handleAdd(1)}>添加</Button> }
        </RightIcon>
      </Header>
      <Table>
        <BaseTable
          dataSource={tableList}
          columns={columns}
          surplusHeight={190}
          surplusWidth={300}
        />
      </Table>
      <addModal.Component />
      <previewModal.Component />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`
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
`
const LeftIcon = styled.div`
  height: 55px;
  font-size: 13px;
  position: relative;
  font-size: 13px;
  color: #333333;
  padding: 0;
  display: flex;
  align-items: center;
`
const RightIcon = styled.div`
  height: 55px;
  font-size: 13px;
  position: relative;
  font-size: 13px;
  color: #333333;
  padding: 0 0 0 15px;
  display: flex;
  align-items: center;
`
const Table = styled.div`
  padding: 0 15px;
  box-sizing: border-box;
`
