import { observer } from "mobx-react";
import React from "react";
import BaseTable from "src/components/BaseTable";
import styled from "styled-components";
import { useInstance } from "../../hook/useModel";
import { useColumns, Props as ColumnsProps } from "./hook/useColumns";

export interface Props {
  sectionId: string;
  data: any;
  setData: any;
}
export default observer(function TableModal(props: Props) {
  let { setData, data, sectionId } = props;
  const { instance } = useInstance()
  // const [propsObj, setPropsObj] = useState<ColumnsProps>({
  //   tempList: data?.tempList || [],
  //   isEdit: true,
  //   setData,
  // })
    const section = instance.getSection(sectionId)
    const propsObj: ColumnsProps = {
      tempList: data?.tempList || [],
      isEdit: true,
      setData,
    }
    if (section?.listConfig?.setDataCb) {
      // const obj = { ...propsObj, setDataCb: section.setDataCb }
      // setPropsObj(obj)
      propsObj.setDataCb = section?.listConfig?.setDataCb
    }
  const columns = useColumns(propsObj);
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
