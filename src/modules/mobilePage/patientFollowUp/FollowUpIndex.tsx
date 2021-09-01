import styled from "styled-components";
import React, { useEffect, useState } from "react";

import FollowUpList from "./components/FollowUpList";
import Tabbar from "./components/Tabbar";
import { foolowUp } from "./api/FoolowUp";

export interface Props {
  location: {
    search: "",
    state: {
      patientId: 71007865;
    };
  };
}

export default function FollowUpIndex(props: Props) {
  // 当前激活的tab-item的key值
  const [activeKey, setActiveKey] = useState("1");

  const [patientId, setPatientId] = useState('');
  const [visitId, setVisitId] = useState(1);

  // 顶部tab栏渲染数组
  const [tabConfig, setTabConfig] = useState([
    { title: "全部", key: "1", length: 2 },
    { title: "待填写", key: "2", length: 1 },
    { title: "已提交", key: "3", length: 1 },
  ]);

  // 患者随访列表数组
  const [followUpListArr, setFollowUpListArr] = useState([]);
  const [noWriteList, setNoWriteList] = useState([{}]);
  const [writedList, setWritedList] = useState([{}]);
  const [renderList, setRenderList] = useState([{}]);

  // 切换
  const changeActive = (value: string) => {
    if (activeKey != value) {
      setActiveKey(value);
      switch (value) {
        case "1":
          setRenderList(followUpListArr);
          break;
        case "2":
          setRenderList(noWriteList);
          break;
        case "3":
          setRenderList(writedList);
          break;
      }
    }
  };
  const getFoolowUp = (patientId: any) => {
    foolowUp
      .queryPageListByPatientId({
        patientId,
        status: 0,
        pageSize: 10,
        pageIndex: 1,
      })
      .then((res) => {
        console.log(res);
        let allList = res.data.list || [];
        let noWriteList: Array<any> = [];
        let writedList: Array<any> = [];
        allList.forEach((item: any) => {
          if (item.status == 2) {
            noWriteList.push(item);
          } else if (item.status == 3) {
            writedList.push(item);
          }
        });
        setFollowUpListArr(allList);
        setNoWriteList(noWriteList);
        setWritedList(writedList);
        setRenderList(allList);
        setTabConfig([
          { title: "全部", key: "1", length: allList.length },
          { title: "待填写", key: "2", length: noWriteList.length },
          { title: "已提交", key: "3", length: writedList.length },
        ]);
      });
  };

  useEffect(() => {
    let patientId: any;
    if (typeof props.location.search == 'string') {
      patientId = props.location.search.split("?")[1].split("=")[1]
    }
    document.title = "随访问卷";
    setPatientId(patientId);
    getFoolowUp(patientId);
  }, []);

  return (
    <Wrapper>
      <div>
        <Tabbar
          tabConfig={tabConfig}
          activeKey={activeKey}
          changeActive={changeActive}
        />
        <FollowUpList
          followUpListArr={renderList}
          {...props}
          visitId={visitId}
          patientId={patientId}
        />
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  background-color: #f5f5f9;
  height: 100vh;
`;
