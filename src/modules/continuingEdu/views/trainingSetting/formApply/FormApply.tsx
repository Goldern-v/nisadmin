import styled from "styled-components";
import { observer } from "mobx-react-lite";
import React, { useLayoutEffect } from "react";
import ApplyHeader from "./components/ApplyHeader";
import ApplyTable from "./components/ApplyTable";
import { formApplyModal } from "./FormApplyModal"; // 仓库数据

interface Props {
  getFormName: any;
  getFormCode: any;
}

export default observer(function FormApply(props: Props) {
  useLayoutEffect(() => {
    if (formApplyModal && Object.keys(formApplyModal).length > 0) {
      formApplyModal.getTitle = props.getFormName;
      formApplyModal.getFormCode = props.getFormCode;
      formApplyModal.init();
    }
  }, [props.getFormName]);

  return (
    <Wrapper>
      <ApplyHeader />
      <ScrollCon>
        <ApplyTable />
      </ScrollCon>
    </Wrapper>
  );
});
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ScrollCon = styled.div`
  flex: 1;
`;
