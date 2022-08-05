import { TreeSelect } from "antd";
import { TreeSelectProps } from "antd/lib/tree-select";
import { observer } from "mobx-react";
import React, { useState } from "react";
import styled from "styled-components";
export interface Props extends TreeSelectProps {
  treeCheckable?: boolean
  list?: any[]
  dataConfig?: Record<string,string>
}

const { TreeNode, SHOW_CHILD } = TreeSelect;
const defDataConfig = {
  title: "name",
  value: "code",
  children: "children",
}

export default observer(function TreeSelectCom({
  treeCheckable = true,
  list = [],
  dataConfig = defDataConfig,
  ...restProps
}: Props) {

  const { title: cTit, value: cVal, children: cChild } = dataConfig;
  const mapNode = (arr: any[], multi: boolean = false) =>
    arr.map((v: any) => {
      return (
        <TreeNode title={v[cTit]} value={v[cVal]} key={v[cVal]} selectable={multi == false ? !v[cChild] : false} isLeaf={!v[cChild]}>
          { v[cChild] ? mapNode(v[cChild], multi) : '' }
        </TreeNode>
      );
    });
  // const [value, setValue] = useState<any[] | string>("");
  // const arr = [{code: '全院', name: '全院'},{"code":"100","name":"一楼片区","dictInfoList":[{"code":"042202","name":"骨二科护理单元"},{"code":"1302","name":"皮肤科护理单元"},{"code":"041102","name":"骨科护理单元"}],"id":""}]
  return (
    <Wrapper>
      <TreeSelect
        dropdownStyle={{ height: '30vh' }}
        maxTagCount={1}
        showCheckedStrategy={SHOW_CHILD}
        showSearch={true}
        allowClear={true}
        treeNodeFilterProp='title'
        {...{
          treeCheckable,
          ...restProps,
        }}
      >
        {mapNode(list, treeCheckable)}
      </TreeSelect>
    </Wrapper>
  );
});

const Wrapper = styled.div``;
