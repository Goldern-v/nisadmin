import { observer } from "mobx-react";
import React, { useState } from "react";
import styled from "styled-components";
import EditButton from "../../EditButton";
import OneLevelTitle from "../../OneLevelTitle";
import TextareaModal from "./modal";

export interface Props {
  sectionTitle?: string | undefined;
  modalTitle?: string | undefined;
  text: string;
  onSave: Function;
}
export default observer(function TextareaSection(props: Props) {
  const { sectionTitle, modalTitle, text } = props;
  const [isShow, setIsShow] = useState(false);
  return (
    <Wrapper>
      <div className="title">
        <OneLevelTitle text={sectionTitle} />
        <EditButton onClick={() => setIsShow(true)}>编辑</EditButton>
      </div>
      <div className="context">{props.text}</div>
      <TextareaModal
        visible={isShow}
        value={text}
        title={modalTitle || "编辑" + sectionTitle}
        onClose={() => setIsShow(false)}
        onOk={(text: any) => props.onSave(text)}
      />
    </Wrapper>
  );
});

const Wrapper = styled.div`
margin-top: 15px;
  .title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
  }
  .context {
    font-size: 16px;
  }
`;
