import styled from "styled-components";
import React from "react";
import { formApplyModal } from "../../../FormApplyModal"; // 仓库数据

interface Props {}

export default function RYZY(props: Props) {
  return <Wrapper>护师人员执业/夜班准入资格申请表</Wrapper>;
}
const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  background: red;
`;
