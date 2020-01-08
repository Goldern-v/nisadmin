import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button, Popover } from "antd";
import { appStore } from "src/stores";
export interface Props {
  children: React.ReactNode;
}

const content = () => {
  const Wrapper = styled.div`
    font-size: 12px;
    color: #333;
    width: 250px;
    .top-con {
      display: flex;
      justify-content: space-between;
      .title {
        font-weight: bold;
      }
      .time {
        color: #999;
      }
    }
    .mid-con {
      margin: 5px 0 15px;
      text-align: left;
    }
    .bottom-con {
      border-top: 1px dashed #dddddd;
      background: rgba(248, 248, 248, 1);
      margin: 0 -15px -11px;
      padding: 10px 15px 11px;
      .text-row {
        .label {
          color: #666;
        }
        .value {
          color: #333;
        }
      }
    }
  `;
  return appStore.isDev ? (
    <Wrapper>
      <div className="top-con">
        <div className="title">张荣 登记：</div>
        <div className="time">15分钟前</div>
      </div>
      <div className="mid-con">
        12床患者和16床患者需要翻身，张美你注意下还有16床的患者口服药还没有服用，刘丽要督促一下。
      </div>
      <div className="bottom-con">
        <div className="text-row">
          <span className="label">提醒班次：</span>
          <span className="value">2019-01-02 N班</span>
        </div>
        <div className="text-row">
          <span className="label">提醒护士：</span>
          <span className="value">张美，刘丽，王雨</span>
        </div>
      </div>
    </Wrapper>
  ) : (
    <Wrapper />
  );
};

/** 中间层，处理 */
export default function TdCell(props: Props) {
  return (
    <Popover
      placement="rightTop"
      title={null}
      content={content()}
      trigger="hover"
    >
      <Wrapper>
        <div className="has-message" />
        {props.children}
      </Wrapper>
    </Popover>
  );
}
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  .has-message {
    position: absolute;
    top: 0;
    right: 0;
    width: 0;
    height: 0;
    border-width: 9px 0 0 9px;
    border-style: solid;
    border-color: #fd3701 transparent !important;
    z-index: 1;
  }
`;
