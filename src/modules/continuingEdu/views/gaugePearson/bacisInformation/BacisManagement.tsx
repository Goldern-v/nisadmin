import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import BacisHaeder from "./components/BacisHeader"
import BacisTable from "./components/BacisTable";
import { bacisManagData } from "./bacisPostgraduate";


// interface Props{
//   formName: any;
// }
export default observer(function BacisManagement() {
  useEffect(() => {
    bacisManagData.init();
  }, []);
  return (
    <Wrapper>
      <BacisHaeder /> 
      <ScrollCon>
        <BacisTable />
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