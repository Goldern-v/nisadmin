import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button } from "antd";
import BaseTable from "src/components/BaseTable";
import { ColumnProps } from "antd/lib/table";
export interface Props {}

export default function UpdateTable() {
  const dataSource: any[] = [];
  const columns: ColumnProps<any>[] = [
    {
      title: "项目名称"
    },
    {
      title: "列宽度"
    },
    {
      title: "基数"
    },
    {
      title: "下拉选项预设值"
    }
  ];
  return (
    <Wrapper>
      <div className="down-file-con">
        选择上传文件，
        <aside>下载题库模板</aside>
      </div>
      <BaseTable dataSource={dataSource} columns={columns} type={[""]} />
    </Wrapper>
  );
}
const Wrapper = styled.div`
  .down-file-con {
    font-size: 12px;
    color: #666;
    aside {
      color: blue;
      text-decoration: underline;
    }
  }
`;
