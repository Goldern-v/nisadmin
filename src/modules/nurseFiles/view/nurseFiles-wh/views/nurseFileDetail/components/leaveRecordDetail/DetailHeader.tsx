import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { appStore, authStore } from "src/stores";
import { Button } from "antd";
import BreadcrumbBox from "src/layouts/components/BreadcrumbBox";
import printing from "printing";
import { leaveRecordModal } from './modal';
interface Props {
  type: string;
  status?: string;
}
export default function QualityControlTempleteDetailHeader(props: Props) {
  const topHeaderBack = () => {
    appStore.history.length == 1 ? window.close() : appStore.history.goBack();
  };

  const titleName = () => {
    const titleMap = {
      test: '聘用人员请（休）假审批报告表',
      other: '军队人员请休假（外出）审批报告表',
    }
    return titleMap[props.type] ? titleMap[props.type] : titleMap.other;
  }
  
  const ButtonGroup = () => {
    switch (props.status) {
      case '1':

      default:
        return (
          <>
            <Button onClick={onSubmit} type="primary">提交</Button>
            <Button onClick={onStaging}>暂存</Button>
          </>
        )
    }
  }

  const onSubmit = () => {

  }

  const onStaging = () => {
    console.log('onStaging', leaveRecordModal.employeePager);
  }

  const onPrint = () => {
    leaveRecordModal.onPrint();
  }

  return (
    <Con>
      <TopHeader>
        <BreadcrumbBox
          style={{
            paddingLeft: 0,
            paddingTop: 10,
            paddingBottom: 2,
          }}
          data={[
            {
              name: '请假记录',
              // link: "/selfNurseFile/LeaveRecord",
            },
            {
              name: "请假申请",
            },
          ]}
        />
        <div className="topHeaderTitle">
          <div className="title">{titleName()}</div>
          <div className="topHeaderStatus">
            状态：
            <span style={{ color: "#6767ff" }}>
              待提交
            </span>
          </div>
          <div className="topHeaderButton">
            <Button onClick={topHeaderBack}>返回</Button>
            { ButtonGroup() }
            <Button onClick={onPrint}>打印</Button>
          </div>
        </div>
       
      </TopHeader>
    </Con>
  );
}

const Con = styled.div` 
  box-sizing:border-box;
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
    font-size: 12px;
    height: 25px;
    line-height: 25px;
    color: #999;
  }
`;
