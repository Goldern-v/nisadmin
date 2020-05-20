import styled from "styled-components";
import React from "react";
import { formApplyModal } from "../../../FormApplyModal"; // 仓库数据

interface Props {}

export default function CJJS(props: Props) {
  return <Wrapper>护理人员岗位层级晋升申请表</Wrapper>;
}
const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  background: red;
`;
