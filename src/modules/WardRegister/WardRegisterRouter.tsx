import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button } from "antd";
import LeftMenuPage from "src/components/LeftMenuPage";
import { appStore } from "src/stores";
import HandoverRegister from "./page/HandoverRegister/HandoverRegister";

export interface Props {}

export default function WardRegisterRouter() {
  const leftMenuConfig = [
    {
      title: "物品交接登记本",
      path: "/wardRegister",
      component: HandoverRegister
    }
  ];

  return (
    <Wrapper>
      <LeftMenuPage leftMenuConfig={leftMenuConfig} />
    </Wrapper>
  );
}
const Wrapper = styled.div``;
