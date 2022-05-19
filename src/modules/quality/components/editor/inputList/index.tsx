import { observer } from "mobx-react";
import React, { useState } from "react";
import { Place } from "src/components/common";
import list from "src/modules/personnelManagement/views/arrangeHome/page/nightShiftStatistics/list";
import styled from "styled-components";
import EditButton from "../../EditButton";
// import TextareaModal from "./modal";

export interface Props {
  sectionTitle?: string | undefined;
  modalTitle?: string | undefined;
  onSave: Function;
  list: any[]
}
export default observer(function TextareaSection(props: Props) {
  const { sectionTitle, modalTitle, list } = props;
  const [isShow, setIsShow] = useState(false);
  return (
    <Wrapper>
      <div className="title">
        {list.map((v:any, i: number) => (
          <React.Fragment key={i}>
            <div className="item-title">{v.title}</div>
            <div className="item-val">{v.key}</div>
          </React.Fragment>
        ))}
        <Place/>
        <EditButton onClick={() => setIsShow(true)}>编辑</EditButton>
      </div>
      {/* <TextareaModal
        visible={isShow}
        value={text}
        title={modalTitle || "编辑" + sectionTitle}
        onClose={() => setIsShow(false)}
        onOk={(text: any) => props.onSave(text)}
      /> */}
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
