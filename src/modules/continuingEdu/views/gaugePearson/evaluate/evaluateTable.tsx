import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import Header from "./components/header"
import Table from "./components/table";
import {evaluateDatas} from "./data"

// interface Props{
//   formName: any;
// }
export default observer(function BacisManagement() {
  useEffect(()=>{
    evaluateDatas.onload()
  },[])
  return (
    <Wrapper>
      <Header /> 
      <ScrollCon>
        <Table />
      </ScrollCon>
    </Wrapper>
  );
})

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ScrollCon = styled.div`
  flex: 1;
`;