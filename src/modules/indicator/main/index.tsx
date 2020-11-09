import styled from "styled-components";
import React, {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import Header from "./components/header/index";
import Content from "./components/content/index";

export interface Props {

}

export default observer(function main(props: Props) {
  return (
    <Wrapper>
      <Header title={'sss'}/>
      <Content/>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 5px 15px;
`;
