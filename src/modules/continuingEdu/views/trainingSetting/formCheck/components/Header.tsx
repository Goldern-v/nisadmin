import { observer } from "mobx-react-lite";
import styled from "styled-components";
import React, { useState } from "react";
import { appStore } from "src/stores";
import { Button } from "antd";
import BreadcrumbBox from "src/layouts/components/BreadcrumbBox";
import CheckModal from "../modal/CheckModal";

interface Props {
  detailData: any;
  onload: any;
}

export default observer(function Header(props: Props) {
  let nodeName = props.detailData.statusDesc || "";
  const [editVisible, setEditVisible] = useState(false); // 弹窗状态
  const [params, setParams] = useState({}); //弹窗传参

  let nodeDataList = JSON.parse(
    JSON.stringify(props.detailData.flowTaskHisList || [])
  );
  nodeDataList.reverse();
  //当前下标
  let currentNodeIndex =
    nodeDataList.findIndex((item: any) => item.flag == 1) || 0;
  //下一个审核阶段
  let nextNode = nodeDataList[currentNodeIndex - 1] || {};

  //根据当前状态和角色显示按钮名称
  const onRole = (nodeName: string) => {
    setParams({
      taskId: appStore.queryObj.taskId,
      title: nodeName
    });
    setEditVisible(true);
  };
  const handleEditCancel = () => {
    setEditVisible(false);
    setParams({});
  };
  const onOkCallBack = () => {
    handleEditCancel();
    props.onload();
  };

  return (
    <Con>
      <TopHeader>
        <BreadcrumbBox
          style={{
            paddingLeft: 0,
            paddingTop: 10,
            paddingBottom: 2
          }}
          data={[
            {
              name: "培训设置管理"
            },
            {
              name: "资质准入审核",
              link: "/continuingEdu/资质准入审核"
            }
          ]}
        />
        <div className="topHeaderTitle">
          <div className="title">资质准入审核</div>
          <div className="topHeaderButton">
            {nextNode.taskTitle && !appStore.queryObj.checkResult && (
              <Button onClick={() => onRole(nextNode.taskTitle)} type="primary">
                {nextNode.taskTitle}
              </Button>
            )}
            <Button onClick={() => {}}>打印</Button>
            <Button
              onClick={() => {
                if (window.opener) window.close();
                appStore.history.goBack();
              }}
            >
              返回
            </Button>
          </div>
        </div>
        <div className="topHeaderStatus">
          状态：
          <span style={{ color: "#6767ff" }}>{nodeName}</span>
        </div>
      </TopHeader>
      <CheckModal
        visible={editVisible}
        params={params}
        onCancel={handleEditCancel}
        onOkCallBack={onOkCallBack}
      />
    </Con>
  );
});

const Con = styled.div`
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  padding-left: 20px;
  position: relative;
`;
const TopHeader = styled.div`
  .topHeaderClass {
    font-size: 14px;
    margin-top: 13px;
    color: #999;
    .topHeaderSpan1 {
      cursor: pointer;
    }
    .topHeaderSpan1:hover {
      color: #00a680;
    }
    .topHeaderSpan2 {
      cursor: pointer;
    }
    .topHeaderSpan2:hover {
      color: #00a680;
    }
  }
  .topHeaderTitle {
    margin-top: 2px;
    font-size: 20px;
    font-weight: 500;
    color: #000;
    .topHeaderButton {
      position: absolute;
      top: 45px;
      right: 20px;
      button {
        margin-left: 10px;
      }
    }
    .title {
      font-weight: bold;
      min-height: 30px;
    }
  }
  .topHeaderStatus {
    height: 25px;
    line-height: 25px;
    color: #999;
  }
`;
