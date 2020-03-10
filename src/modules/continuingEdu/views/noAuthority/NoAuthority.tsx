import styled from "styled-components";
import React from "react";
import { observer } from "mobx-react-lite";
const background = require("./img/background.png");

export default observer(function NoAuthority() {
  return (
    <Wrapper>
      <div>
        <img className="no" src={background} alt="" />
        <p className="p1">暂无权限</p>
        <p className="p2">您还没有页面操作权限，可联系管理员开放</p>
      </div>
    </Wrapper>
  );
});
const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  margin: auto;
  div {
    width: 400px;
    height: 500px;
    margin: auto;
    margin-top: 100px;
    text-align: center;
  }
  .p1 {
    font-size: 33px;
    font-weight: 500;
    color: rgba(153, 153, 153, 1);
    line-height: 40px;
    margin-bottom: 0 !important;
  }
  .p2 {
    font-size: 16px;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 31px;
  }
  .no {
    margin-left: -25px;
    margin-bottom: 10px;
  }
`;
