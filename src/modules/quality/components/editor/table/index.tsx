import { observer } from "mobx-react";
import React, { useState } from "react";
import { Place } from "src/components/common";
import styled from "styled-components";
import EditButton from "../../EditButton";
import OneLevelTitle from "../../OneLevelTitle";
import TableModal from "./modal";
import BaseTable from 'src/components/BaseTable'

export interface Props {
  sectionTitle?: string | undefined;
  modalTitle?: string | undefined;
  list: any[];
  getColumns: (flag: boolean, setVal?: Function) => any[]
  onSave: Function;
}
export default observer(function TableSection(props: Props) {
  const { sectionTitle, modalTitle, list, getColumns } = props;
  const [isShow, setIsShow] = useState(false);
  return (
    <Wrapper>
      <div className="title">
        {sectionTitle && <OneLevelTitle text={sectionTitle} />}
        <Place/>
        <EditButton onClick={() => setIsShow(true)}>编辑</EditButton>
      </div>
      <div className="context">
        <BaseTable dataSource={list} columns={getColumns(false)} pagination={false}/>
      </div>
      <TableModal
        visible={isShow}
        value={list}
        title={modalTitle || "编辑" + sectionTitle}
        onClose={() => setIsShow(false)}
        getColumns={getColumns}
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
