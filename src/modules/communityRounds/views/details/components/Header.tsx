import styled from "styled-components";
import React from "react";
import { appStore } from "src/stores";
import { Button } from "antd";
import BreadcrumbBox from "src/layouts/components/BreadcrumbBox";
import HlbModal from "../modal/HlbModal";
import TjModal from "../modal/TjModal";
import createModal from "src/libs/createModal";

interface Props {
  detailData: any;
  onload: any;
}

export default function Header(props: Props) {
  //接口头部数据
  let Title = props.detailData.record || {};

  //弹窗
  const hlbModal = createModal(HlbModal);
  const tjModal = createModal(TjModal);

  let nodeDataList = JSON.parse(
    JSON.stringify(props.detailData.handlenodeDto || [])
  );
  nodeDataList.reverse();
  //当前下标
  let currentNodeIndex =
    nodeDataList.findIndex((item: any) => item.status == "1") || 0;
  //下一个审核阶段
  let nextNode = nodeDataList[currentNodeIndex - 1] || {};

  //根据当前状态和角色显示按钮名称
  const onRole = (nodeName: string) => {
    switch (nodeName) {
      case "护士长审核":
        {
          hlbModal.show({
            id: appStore.match.params.id,
            nodeCode: nextNode.nodeCode,
            title: "护士长审核",
            onOkCallBack: props.onload
          });
        }
        break;
      case "提交":
        {
          tjModal.show({
            id: appStore.match.params.id,
            nodeCode: nextNode.nodeCode,
            title: "是否提交",
            onOkCallBack: props.onload
          });
        }
        break;
      case "护理部审核":
        {
          hlbModal.show({
            id: appStore.match.params.id,
            nodeCode: nextNode.nodeCode,
            title: "护理部审核",
            onOkCallBack: props.onload
          });
        }
        break;
    }
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
              name: "查房记录",
              link: "/checkWard"
            },
            {
              name: "记录详情"
            }
          ]}
        />
        <div className="topHeaderTitle">
          <div className="title">社区查房记录表</div>
          <div className="topHeaderButton">
            {nextNode.nodeName && (
              <Button
                onClick={() => onRole(nextNode.nodeName)}
                type="primary"
                disabled={!nextNode.canHandle}
              >
                {nextNode.nodeName}
              </Button>
            )}
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
          <span style={{ color: "#6767ff" }}>{Title.finish ? '已结束' : Title.nextNodePendingName}</span>
        </div>
      </TopHeader>
      <hlbModal.Component />
      <tjModal.Component />
    </Con>
  );
}

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
