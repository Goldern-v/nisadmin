import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import ClinicalHeader from "./components/ClinicalHeader"
import ClinicalTable from './components/ClinicalTable'
import { clinicalManagData } from "./ClinicalPostgraduate";



export default observer(function ClinicalEvaluation() {
  useEffect(() => {
    clinicalManagData.init();
  }, []);
  return (
    <Wrapper>
      <ClinicalHeader /> 
      <ScrollCon>
        <ClinicalTable />
      </ScrollCon>
    </Wrapper>
  )
})

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ScrollCon = styled.div`
  flex: 1;
`;