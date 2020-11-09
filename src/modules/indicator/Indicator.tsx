import React, {useEffect, useLayoutEffect, useState} from "react";
import LeftMenu from "./leftMenu";
import Main from "./main";
import styled from "styled-components";
import {LEFT_MENU} from "./config";
import {Radio, Button, DatePicker} from "antd";
import {RouteComponentProps} from "src/components/RouterView";
import {crrentMonth} from "src/utils/moment/crrentMonth";

// 护理质量相关数据
import NursingData from "./mainView/nursingData/NursingData";

export interface Props extends RouteComponentProps<{ name?: string }> {
}

export default function Indicator(props: Props) {
  const [templateShow, setTemplateShow] = useState(true);
  const [timeData, setTimeData]: any = useState(crrentMonth());
  const [nursingData, setNursingData] = useState(false); //是否展示护理主质量相关数据页面（--true展示）

  useLayoutEffect(() => {
    // 护理质量相关数据（吴敏）
    if (props.match.params.name === "护理质量相关数据") {
      setNursingData(true);
    } else {
      setNursingData(false);
    }
  }, [props.match.params.name, timeData]);

  const onload = async () => {
  };
  const onExport = async () => {
  };

  return (
    <Wrapper>
      <MenuWrapper>
        <LeftMenu config={LEFT_MENU} menuTitle="敏感指标"/>
      </MenuWrapper>
      <MainWrapper>
        <Main/>
      </MainWrapper>
      {/*{nursingData ? (*/}
      {/*  <div className="nursingData">*/}
      {/*    <NursingData getTitle={props.match.params.name}/>*/}
      {/*  </div>*/}
      {/*) : (*/}
      {/*  <MainCon>*/}
      {/*    <HeaderCon>*/}
      {/*      <span>日期:</span>*/}
      {/*      <DatePicker.RangePicker*/}
      {/*        value={timeData}*/}
      {/*        onChange={data => {*/}
      {/*          setTimeData(data);*/}
      {/*        }}*/}
      {/*        style={{width: 220, margin: "0 10px"}}*/}
      {/*      />*/}
      {/*      <Button*/}
      {/*        type="primary"*/}
      {/*        style={{marginRight: 10}}*/}
      {/*        onClick={() => onload()}*/}
      {/*      >*/}
      {/*        查询*/}
      {/*      </Button>*/}
      {/*      <Button onClick={() => onExport()}>导出excl</Button>*/}
      {/*    </HeaderCon>*/}
      {/*    {templateShow ? (*/}
      {/*      <MainScroll>*/}

      {/*      </MainScroll>*/}
      {/*    ) : (*/}
      {/*      <div*/}
      {/*        style={{*/}
      {/*          marginTop: "200px",*/}
      {/*          textAlign: "center",*/}
      {/*          fontSize: "30px"*/}
      {/*        }}*/}
      {/*      >*/}
      {/*        暂无数据*/}
      {/*      </div>*/}
      {/*    )}*/}
      {/*  </MainCon>*/}
      {/*)}*/}
    </Wrapper>
  );
}
const Wrapper = styled.div`
  height: calc(100vh - 50px);
  display: flex;
  align-items: stretch;
  overflow: hidden;
`;

const MenuWrapper = styled.div`
  width: 200px;
`;

const MainWrapper = styled.div`
  flex:1;
`

const MainCon = styled.div`
  box-sizing: border-box;
  flex: 1;
  width: 0;
  align-items: stretch;
  display: flex;
  height: 100%;
  overflow: hidden;
  flex-direction: column;
  padding: 5px 15px;
`;
const MainScroll = styled.div`
  flex: 1;
  height: 0;
  /* overflow-x: hidden;
  overflow-y: auto; */
  overflow: hidden;
  /* padding: 5px 15px; */
`;

const HeaderCon = styled.div`
  height: 50px;
  /* background: rgba(248, 248, 248, 1);
  box-shadow: 3px 3px 6px 0px rgba(0, 0, 0, 0.15);
  border-bottom: 1px solid #dbe0e4; */
  font-size: 13px;
  position: relative;
  font-size: 13px;
  color: #333333;
  padding: 0 20px;
  display: flex;
  align-items: center;
  z-index: 1;
`;
