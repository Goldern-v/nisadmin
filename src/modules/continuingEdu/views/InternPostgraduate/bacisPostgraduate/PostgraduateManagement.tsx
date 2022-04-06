import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import PostgraduateHeader from "./components/PostgraduateHeader"
import PostgraduateTable from "./components/PostgraduateTable";


// interface Props{
//   formName: any;
// }
export default observer(function BacisManagement() {
  return (
    <Wrapper>
      <PostgraduateHeader /> 
      <ScrollCon>
        <PostgraduateTable />
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