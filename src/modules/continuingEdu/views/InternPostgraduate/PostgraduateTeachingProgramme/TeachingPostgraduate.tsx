import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import TeachingHeader from "./components/TeachingHeader"
import TeachingTable from "./components/TeachingTable";


// interface Props{
//   formName: any;
// }
export default observer(function BacisManagement() {
  return (
    <Wrapper>
      <TeachingHeader /> 
      <ScrollCon>
        <TeachingTable />
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