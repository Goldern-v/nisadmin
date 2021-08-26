import styled from "styled-components";
import React, { useState, useEffect } from "react";

export interface Props {}

export default function Tabbar(props: any) {
  const changeTab = (value: string) => {
    props.changeActive(value);
  };
  useEffect(() => {}, []);

  return (
    <Wrapper>
      <div className="tab-list">
        {props.tabConfig.map((item: any) => {
          return (
            <div className="tab-item" key={item.key}>
              <div
                className={`tab-text ${
                  props.activeKey === item.key ? "active-tab" : ""
                }`}
                key={item.key}
                onClick={() => changeTab(item.key)}
              >
                {`${item.title}(${item.length})`}
              </div>
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  .tab-list {
    color: #000;
    position: fixed;
    width: 100vw;
    z-index: 2;
    font-size: 14px;
    background-color: #fff;
    display: flex;
    justify-content: space-around;
    height: 40px;
    .tab-item {
      padding: 0 5px 0;
      height: 40px;
      box-sizing: border-box;
      .tab-text {
        width: 75px;
        height: 38px;
        line-height: 40px;
        text-align: center;
        &.active-tab {
          border-bottom: 2px solid #00a680;
        }
      }
    }
  }
`;
