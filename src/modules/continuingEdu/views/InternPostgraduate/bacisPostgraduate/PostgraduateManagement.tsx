import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import PostgraduateHeader from "./components/PostgraduateHeader"
import PostgraduateTable from "./components/PostgraduateTable";
import { bacisPostgraduateData } from "./bacisPostgraduate"; // 仓库数据

// interface Props{
//   formName: any;
// }
export default observer(function BacisManagement() {
  useEffect(() => {
    bacisPostgraduateData.init();
  }, []);
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