import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router";
import { ScrollUl } from "src/components/common";
import { Spin, Tooltip } from "antd";
import { appStore } from "src/stores/index";
import { observer } from "mobx-react-lite";
import { ReactComponent as JXJY } from "../images/icon/JXJY.svg";
import HomeApi from "src/modules/home-wh/api/HomeApi.ts";
import OnDetailCheck from "../common/OnDetailCheck";

export interface Props extends RouteComponentProps {}

export default observer(function ContinuingEducation() {
  const [loadingTable, setLoadingTable] = useState(false); //loading
  const [tableData, setTableData] = useState([]); //表格数据

  //初始化 获取表格数据内容
  useEffect(() => {
    setLoadingTable(true);
    HomeApi.getMyNotificationList().then((res: any) => {
      setLoadingTable(false);
      setTableData(res.data || []);
    });
  }, []);

  //封装函数
  const renderSubMenu = () => {
    return tableData.map((item: any) => {
      return (
        <Li
          // className={item.alreadyRead == 1 ? "notRead" : ""}
          onClick={() => OnDetailCheck(item)}
        >
          <Content className="content">
            <Tooltip placement="top" title={item.title}>
              {item.title}
            </Tooltip>
            <span className={item.alreadyRead != 1 ? "redIcon" : ""} />
          </Content>
          <Time>{item.createTime}</Time>
        </Li>
      );
    });
  };

  return (
    <Wrapper>
      <Spin className="loading" spinning={loadingTable} />
      <Title>
        <I>
          <JXJY />
        </I>
        <World>继续教育通知</World>
        <More onClick={() => appStore.history.push(`/allEduData`)}>更多 ></More>
      </Title>
      <Ul>{renderSubMenu()}</Ul>
    </Wrapper>
  );
});
const Wrapper = styled.div`
  width: 335px;
  height: calc(50vh - 47px);
  margin-bottom: 15px;
  width: 335px;
  background: rgba(255, 255, 255, 1);
  border-radius: 2px;
  border: 1px solid rgba(221, 221, 221, 1);
  box-sizing: border-box;
  .loading {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -10px;
    margin-top: -10px;
  }
`;
const Title = styled.div`
  width: 335px;
  height: 45px;
  padding: 0 15px;
  box-sizing: border-box;
  background: #7bbc9b;
`;
const Ul = styled(ScrollUl)`
  height: calc(50vh - 95px);
  width: 335px;
  overflow: auto;
  padding-inline-start: 0 !important;
  color: #333;
  /* .notRead {
    color: #333 !important; */
  }
`;
const I = styled.span`
  display: inline-block;
  margin-top: 15px;
  vertical-align: middle;
`;
const World = styled.span`
  display: inline-block;
  margin-left: 10px;
  width: 96px;
  font-size: 15px;
  font-weight: 900;
  color: #fff;
  vertical-align: middle;
  margin-bottom: -9px;
`;
const More = styled.span`
  float: right;
  height: 17px;
  font-size: 12px;
  font-weight: 400;
  color: #fff;
  line-height: 17px;
  margin-top: 15px;
  &:hover {
    cursor: pointer;
  }
`;
const Li = styled.li`
  padding: 7px 15px 7px 15px;
  border-bottom: 1px solid #ddd;
  box-sizing: border-box;
  list-style-type: none;
  &:hover {
    cursor: pointer;
  }
  &:hover .content {
    color: #00a65a;
  }
`;
const Content = styled.span`
  position: relative;
  display: inline-block;
  width: 210px;
  font-size: 13px;
  font-weight: 400;
  line-height: 18px;
  vertical-align: middle;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  .redIcon {
    display: inline-block;
    background: red;
    border-radius: 50%;
    height: 5px;
    width: 5px;
    position: absolute;
    left: 0;
    top: 0;
  }
`;
const Time = styled.span`
  float: right;
  vertical-align: middle;
  font-size: 12px;
  margin-top: 3px;
`;
