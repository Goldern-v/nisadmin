import styled from "styled-components";
import React from "react";
import { observer } from "src/vendors/mobx-react-lite";
import BaseTable, { DoCon } from "src/components/BaseTable";
import { message as Message, Modal, Input } from "src/vendors/antd";
import { nursingDataModal } from "../NursingDataModal";

interface Props {}

export default observer(function Content(props: Props) {
  const data: any = [
    {
      name: "111",
      value: 11
    },
    {
      name: "222",
      value: 22
    },
    {
      name: "333",
      value: 33
    },
    {
      name: "444",
      value: 44
    },
    {
      name: "555",
      value: 55
    },
    {
      name: "666",
      value: 66
    },
    {
      name: "777",
      value: 77
    }
  ];
  return (
    <Wrapper>
      <Cont className="specialCont">
        <Title>1、护理数据配置相关数据</Title>
        <Data>
          {data.map((item: any, index: number) => (
            <div key={index} className="main">
              <div className="name">{item.name}</div>
              <Input value={item.value} disabled style={{ width: "300px" }} />
            </div>
          ))}
        </Data>
      </Cont>
      <Cont>
        <Title>1、护理数据配置相关数据</Title>
        <Data>
          {data.map((item: any, index: number) => (
            <div key={index} className="main">
              <div className="name">{item.name}</div>
              <Input value={item.value} disabled style={{ width: "300px" }} />
            </div>
          ))}
        </Data>
      </Cont>
      <Cont>
        <Title>1、护理数据配置相关数据</Title>
        <Data>
          {data.map((item: any, index: number) => (
            <div key={index} className="main">
              <div className="name">{item.name}</div>
              <Input value={item.value} disabled style={{ width: "300px" }} />
            </div>
          ))}
        </Data>
      </Cont>
      <Cont>
        <Title>1、护理数据配置相关数据</Title>
        <Data>
          {data.map((item: any, index: number) => (
            <div key={index} className="main">
              <div className="name">{item.name}</div>
              <Input value={item.value} disabled style={{ width: "300px" }} />
            </div>
          ))}
        </Data>
      </Cont>
    </Wrapper>
  );
});
const Wrapper = styled.div`
  box-shadow: rgba(0, 0, 0, 0.5) 0px 5px 10px 0px;
  background: rgb(255, 255, 255);
  padding: 15px 30px;
  box-sizing: border-box;
  height: calc(100vh - 120px);
  overflow-y: auto;
  .specialCont {
    margin-top: 0 !important;
  }
`;
const Cont = styled.div`
  border: 1px solid #ccc;
  background: rgb(238, 253, 238);
  padding: 0 20px 30px 20px;
  margin-top: 20px;
`;
const Title = styled.div`
  font-size: 15px;
  height: 50px;
  line-height: 50px;
  font-weight: bold;
  border-bottom: 1px solid #ccc;
`;
const Data = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .main {
    margin-top: 25px;
    height: 50px;
    width: 33%;
  }
  .name {
    margin-left: 5px;
    height: 25px;
    line-height: 25px;
  }
`;
