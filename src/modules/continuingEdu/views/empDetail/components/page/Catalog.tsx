import styled from "styled-components";
import React, { useState, useEffect } from "react";
export default function Catalogue() {
  let catalogueList = [
    {
      title: "基本信息",
      page: 1,
    },
    {
      title: "学分记录",
      page: 2,
    },
    {
      title: "学时记录",
      page: 3,
    },
    {
      title: "学习记录",
      page: 4,
    },
    {
      title: "培训记录",
      page: 5,
    },
    {
      title: "考试记录",
      page: 6,
    },
    {
      title: "练习记录",
      page: 7,
    },
    {
      title: "讲课记录",
      page: 8,
    },
  ];
  return (
    <Wrapper>
      <div className="title">层级培训手册目录</div>
      <div className="list">
        {catalogueList.map((item, index) => {
          return (
            <div className="item">
              <span>{item.title}</span>
              <span className="underline" />
              <span>{item.page}</span>
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .title {
    font-size: 30px;
    text-align: center;
    font-weight: 600;
    font-family: "黑体" !important;
    margin-bottom: 30px;
  }
  .list {
    font-weight: 600;
    font-family: "黑体" !important;
    .item {
      display: flex;
      align-items: center;
      span {
        margin: 0 5px;
        font-size: 22px;
        font-weight: 600;
        font-family: "黑体" !important;
        font-weight: bold;
      }
      .underline {
        flex: 1;
        border-bottom: 1px dashed #000;
      }
    }
  }
`;
