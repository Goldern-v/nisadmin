import React, {useLayoutEffect} from "react";
import LeftMenu from "./leftMenu";
import Main from "./main";
import styled from "styled-components";
import {LEFT_MENU} from "./config";
import {RouteComponentProps} from "src/components/RouterView";

export default function Indicator(props: RouteComponentProps<{ name?: string }>) {
  return (
    <Wrapper>
      {/* 左侧菜单 */}
      <MenuWrapper>
        <LeftMenu config={LEFT_MENU} menuTitle="敏感指标"/>
      </MenuWrapper>
      {/* 右侧主要信息 */}
      <MainWrapper>
        <Main name={props.match.params.name || ''}/>
      </MainWrapper>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  height: calc(100vh - 50px);
  display: flex;
  align-items: stretch;
  overflow: hidden;
`;

const MenuWrapper = styled.div`
  width: 200px;
`;

const MainWrapper = styled.div`
  flex:1;
`
