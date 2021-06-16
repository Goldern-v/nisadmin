/** 多级表头 */
import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button } from "antd";

interface ChildItem {
  flex: number;
  title: string;
}

export interface Props {
  mainTitle: string;
  children: string[];
}

export default function MergeTh(props: Props) {
  let { mainTitle, children } = props;

  return (
    <PTitleTh>
      <MergeTitle>{mainTitle}</MergeTitle>
      <PTitleCon>
        {children.map((item: string, index: number, arr: any) => (
          <CTitleBox
            key={index}
            style={{
              ...{ flex: 1, width: 0 },
              ...(index == arr.length - 1 ? { border: 0 } : {})
            }}
          >
            {item}
          </CTitleBox>
        ))}
      </PTitleCon>
    </PTitleTh>
  );
}
const Wrapper = styled.div``;
const PTitleTh = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
const PTitleCon = styled.div`
  display: flex;
  align-items: stretch;
  flex: 1;
  .title-text {
    display: block;
    padding: 4px 0;
    overflow: hidden;
  }
`;
const CTitleBox = styled.div`
  flex: 1;
  border-right: 1px solid #e8e8e8;
  box-sizing: content-box;
  padding: 4px 0;
`;

const MergeTitle = styled.div`
  padding: 4px 0;
  border-bottom: 1px solid #e8e8e8;
`;
