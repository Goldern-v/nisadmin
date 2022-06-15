import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BaseTable from "src/components/BaseTable";
import { useColumns } from "./hook/useColumns";

export interface Props {
  sectionId: string;
  data: any;
  setData: any;
}
export default observer(function TableModal(props: Props) {
  let { setData, data } = props;
  const columns = useColumns({
    tempList: data?.tempList || [],
    isEdit: true,
    setData,
  });
  return (
    <Wrapper>
      <BaseTable dataSource={data?.list || []} columns={columns} />
    </Wrapper>
  );
});

const Wrapper = styled.div`
  position: relative;
  #baseTable {
    padding: 20px 0px 0px;
  }
  .add {
    position: absolute;
    right: 0;
    top: -13px;
  }
  .ant-input,
  .ant-select-selection {
    width: 100%;
    height: 100%;
    border: 0;
    outline: none;
    background: transparent;
    padding: 0 5px;
    border-radius: 0;
    &:focus {
      background: ${(p) => p.theme.$mlc};
    }
  }
  td {
    padding: 0 !important;
  }
`;
