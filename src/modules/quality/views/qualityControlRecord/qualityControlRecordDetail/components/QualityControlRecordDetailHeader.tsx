import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { appStore, authStore } from "src/stores";
const BG = require("../../../../images/顶部背景.png");
import { Button, message, Modal } from "antd";
import BreadcrumbBox from "src/layouts/components/BreadcrumbBox";
import createModal from "src/libs/createModal";
import BqclModal from "../modal/BqclModal";
import BqclModalNys from "../modal/BqclModalNys";
import HlbModal from "../modal/HlbModal";
import EjkhszModal from "../modal/EjkhszModal";
import { qualityControlRecordApi } from "./../../api/QualityControlRecordApi";
import qs from "qs";
import { fileDownload } from "src/utils/file/file"
import { navTitle } from "src/modules/quality/data/qcTitle";
import QcPrint from './QcPrint'

interface Props {
  detailData: any;
  onload: any;
}

export default function qualityControlRecordDetailHeader(props: Props) {
  const topHeaderBack = () => {
    // appStore.history.push(
    //   props.detailData.master.qcLevel == '3'
    //     ? `/qcThree?noRefresh=1`
    //     : props.detailData.master.qcLevel == '2'
    //       ? `/qcTwo?noRefresh=1`
    //       : `/qcThree?noRefresh=1`
    // )
    appStore.history.length == 1 ? window.close() : appStore.history.goBack();
  };
  let master = props.detailData.master || {};
  let nodeDataList = JSON.parse(
    JSON.stringify(props.detailData.nodeDataList || [])
  );
  nodeDataList.reverse();
  let [deleteLoading, setDeleteLoading] = useState(false);
  let currentNodeIndex =
    nodeDataList.findIndex((item: any) => item.status == "1") || 0;
  /** 当前 */
  let currentNode = nodeDataList[currentNodeIndex] || {};
  /** 下一个 */
  let nextNode = nodeDataList[currentNodeIndex - 1] || {};

  const bqclModal = createModal(BqclModal);
  const bqclModalNys = createModal(BqclModalNys);
  const hlbModal = createModal(HlbModal);
  const ejkhszModal = createModal(EjkhszModal);

  const [printing, setPrinting] = useState(false)

  const onAduit = (handleType: string) => {
    switch (handleType) {
      case "2":
        bqclModal.show({
          id: appStore.match.params.id,
          nodeCode: nextNode.nodeCode,
          title: nextNode.nodeName,
          onOkCallBack: props.onload
        });
        break;

      case "21":
        bqclModalNys.show({
          id: appStore.match.params.id,
          nodeCode: nextNode.nodeCode,
          onOkCallBack: props.onload,
          list: props.detailData.itemGroupList || []
        });

      case "3":
        ejkhszModal.show({
          id: appStore.match.params.id,
          qcLevel: master.qcLevel,
          nodeCode: nextNode.nodeCode,
          title: nextNode.nodeName,
          onOkCallBack: props.onload
        });
        break;
      default:
        {
          hlbModal.show({
            id: appStore.match.params.id,
            nodeCode: nextNode.nodeCode,
            title: nextNode.nodeName,
            onOkCallBack: props.onload
          });
        }
    }
  };

  const handleEdit = () => {
    if (!master.id || !master.qcCode) {
      message.error("缺少质控编码或ID");
      return;
    }

    appStore.history.push(
      `/qualityControlRecordEdit?${qs.stringify({
        qcCode: master.qcCode,
        id: master.id
      })}`
    );
  };

  const handleDelete = () => {
    if (!master.id) {
      message.error("缺少质控ID");
      return;
    }

    Modal.confirm({
      title: "提示",
      content: "是否删除该评价表?",
      onOk: () => {
        setDeleteLoading(true);
        qualityControlRecordApi.formDelete(master.id).then(
          res => {
            message.success("删除成功!", 1, () => {
              setDeleteLoading(false);
              if (history.length <= 1) {
                window.close();
              } else {
                appStore.history.goBack();
              }
            });
          },
          () => setDeleteLoading(false)
        );
      }
    });
  };

  const handleCancel = () => {
    if (!master.id) {
      message.error("缺少质控ID");
      return;
    }

    Modal.confirm({
      title: "提示",
      content: "是否撤销该评价表?",
      onOk: () => {
        setDeleteLoading(true);
        qualityControlRecordApi
          .revokeHandleForNode({
            id: master.id,
            nodeCode: currentNode.nodeCode
          })
          .then(
            res => {
              message.success("撤销成功!", 1, () => {
                setDeleteLoading(false);

                if (history.length <= 1) {
                  window.close();
                } else {
                  appStore.history.goBack();
                }
              });
            },
            () => setDeleteLoading(false)
          );
      }
    });
  };

  const statusText = () => {
    if (!master.nextNodePendingName && master.status == "-1") return "待提交";
    return master.status == "1" ? "已完成" : master.nextNodePendingName;
  };

  const exportQcItem = () => {
    qualityControlRecordApi
      .exportQcItemDetail(master.id)
      .then(res => fileDownload(res))
  }

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
              name: navTitle(master.qcLevel),
              link:
                master.qcLevel == "3" ? "/qcThree" :
                  master.qcLevel == "2" ? "/qcTwo" :
                    appStore.HOSPITAL_ID == 'hj' ? '/qcOneHj' :
                      appStore.HOSPITAL_ID == 'nys' ? '/qcOneNys' : '/qcOne'
            },
            {
              name: "记录详情"
            }
          ]}
        />
        <div className="topHeaderTitle">
          <div className="title">{master.qcName}</div>
          <div className="topHeaderButton">
            {nextNode.nodeName && (
              <Button
                onClick={() => onAduit(nextNode.handleType)}
                type="primary"
                disabled={!nextNode.canHandle}
              >
                {nextNode.nodeName}
              </Button>
            )}
            {master &&
              appStore.hisMatch({
                map: {
                  wh: master.qcLevel == "2",
                  other: true
                }
              }) &&
              master.status == "-1" &&
              master.creatorNo == (authStore.user && authStore.user.empNo) && (
                <React.Fragment>
                  <Button onClick={handleEdit} disabled={deleteLoading}>
                    编辑
                  </Button>
                  <Button
                    onClick={handleDelete}
                    type="danger"
                    ghost
                    disabled={deleteLoading}
                  >
                    删除
                  </Button>
                </React.Fragment>
              )}
            { currentNode.canUpdate && (
                <React.Fragment>
                  {currentNode.nodeCode === 'commit' && <Button
                    onClick={handleDelete}
                    type="danger"
                    ghost
                    disabled={deleteLoading}
                  >
                    删除
                  </Button>}
                  <Button
                    onClick={handleCancel}
                    type="danger"
                    ghost
                    disabled={deleteLoading}
                  >
                    撤销
                  </Button>
                </React.Fragment>
              )
            }
            {/* {master &&
              master.canUpdate &&
              appStore.hisMatch({
                map: {
                  wh: master.qcLevel == "2" && master.creatorNo == authStore.user?.empNo,
                  other: true
                }
              }) && (
                <React.Fragment>
                  <Button
                    onClick={handleDelete}
                    type="danger"
                    ghost
                    disabled={deleteLoading}
                  >
                    删除
                  </Button>
                  <Button
                    onClick={handleCancel}
                    type="danger"
                    ghost
                    disabled={deleteLoading}
                  >
                    撤销
                  </Button>
                </React.Fragment>
              )
            } */}
            {appStore.hisMatch({
              map: {
                wh: false,
                other: true,
              }
            }) &&
              master.id && (
                <React.Fragment>
                  <Button onClick={exportQcItem}>导出</Button>
                  {appStore.HOSPITAL_ID == 'nys' && (
                    <Button onClick={() => setPrinting(true)}>打印</Button>
                  )}
                </React.Fragment>
              )}
            <Button onClick={topHeaderBack}>返回</Button>
          </div>
        </div>
        <div className="topHeaderStatus">
          状态：<span style={{ color: "#6767ff" }}>{statusText()}</span>
        </div>
      </TopHeader>
      <bqclModalNys.Component />
      <bqclModal.Component />
      <hlbModal.Component />
      <ejkhszModal.Component />
      <QcPrint
        printing={printing}
        data={props.detailData}
        afterPrinting={() => setPrinting(false)} />
    </Con>
  );
}

const Con = styled.div` 
  box-sizing:border-box;
  height: 100%;
  width: 100%;
  /* background: url(${BG}); */
  /* background:linear-gradient(180deg,rgba(248,248,252,1) 0%,rgba(235,236,240,1) 100%); */
  padding-left: 20px;
  /* border-bottom: 1px solid #ddd; */
  position: relative;
`;
const TopHeader = styled.div`
  /* height: 26px;
  line-height: 26px; */
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
    /* font-weight: bold; */
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
