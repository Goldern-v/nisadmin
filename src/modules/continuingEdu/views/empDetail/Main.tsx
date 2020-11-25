import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { observer } from "mobx-react-lite";
import { empDetailModel } from "./models/EmpDetailModel";
import { appStore } from "src/stores";
import qs from "qs";

import SorceAppendModal from "./../../components/SorceAppendModal";
import BaseInfo from "./BaseInfo";
import 实习生详情 from "./实习生详情";
import 进修生详情 from "./进修生详情";
import 其他人员详情 from "./其他人员详情";
import TableView from "./TableView";
import Writings from "src/modules/nurseFiles/view/nurseFiles-nys/views/nurseFileDetail/views/Writings"
import SpecialCard from "src/modules/nurseFiles/view/nurseFiles-nys/views/nurseFileDetail/views/SpecialCard"
import EducationalExperience from "src/modules/nurseFiles/view/nurseFiles-nys/views/nurseFileDetail/views/EducationalExperience"
// import { userTypeList } from "../其他人员/data/options";

export interface Props extends RouteComponentProps { }

export default observer(function Main(props: any) {
  const { history, queryObj } = appStore;
  let userType = queryObj.userType || ''

  let Routes_Config = [
    {
      name: "基本信息",
      title: "基本信息",
      component: (() => {
        switch (userType) {
          case '1':
            return 实习生详情
          case '2':
            return 进修生详情
          case '3':
          case '4':
          case '99':
            return 其他人员详情
          default:
            return BaseInfo
        }
      })()
    },
    {
      name: "学分记录",
      title: "学分记录",
      component: TableView
    },
    {
      name: "学时记录",
      title: "学时记录",
      component: TableView
    },
    {
      name: "学习记录",
      title: "学习记录",
      component: TableView
    },
    {
      name: "培训记录",
      title: "培训记录",
      component: TableView
    },
    {
      name: "考试记录",
      title: "考试记录",
      component: TableView
    },
    {
      name: "练习记录",
      title: "练习记录",
      component: TableView
    },
    {
      name: "实操记录",
      title: "实操记录",
      component: TableView
    },
    {
      name: "演练记录",
      title: "演练记录",
      component: TableView
    },
    {
      name: "实践记录",
      title: "实践记录",
      component: TableView
    },
    {
      name: "讲课记录",
      title: "讲课记录",
      component: TableView
    },
  ] as any[]

  if (appStore.HOSPITAL_ID === 'nys') {
    Routes_Config = Routes_Config.concat([
      {
        name: "特殊资格证",
        title: "特殊资格证",
        component: SpecialCard
      },
      {
        name: "教育经历",
        title: "教育经历",
        component: EducationalExperience
      },
      {
        name: "著作译文论文",
        title: "著作译文论文",
        component: Writings
      },
    ])
  }

  const [sorceAppendVisible, setSorceAppendVisible] = useState(false);

  const [data, setData] = useState({
    id: "",
    empCode: "",
    empName: "",
    nurseHierarchy: "",
    newTitle: "",
    deptCode: "",
    deptName: "",
    status: ""
  } as any);

  const pannelName = appStore.match.params.pannelName || "";

  useEffect(() => {
    let search: any = appStore.location.search;
    let query = {} as any;
    if (search) query = qs.parse(search.replace("?", ""));
    setData({ ...data, ...query });

    // empDetailModel.init()
  }, []);

  const targetComponent = () => {
    for (let i = 0; i < Routes_Config.length; i++) {
      if (appStore.match.params.pannelName == Routes_Config[i].name)
        return Routes_Config[i];
    }
    return Routes_Config[0];
  };
  const handleRouteChange = (name: string) => {
    let search: any = appStore.location.search;
    appStore.history.replace(`/continuingEduEmpDetail/${name}${search}`);
  };

  const handleSourceAppend = () => {
    setSorceAppendVisible(false);
    let url = appStore.match.url;
    let search: any = appStore.location.search;
    let query = {} as any;

    if (search) query = qs.parse(search.replace("?", ""));

    if (query.sourceChange >= 0)
      query.sourceChange = Number(query.sourceChange) + 1;
    else query.sourceChange = 1;

    appStore.history.replace(`${url}?${qs.stringify(query)}`);

    if (pannelName == "学分记录") {
      empDetailModel.getTabelData();
    }
  };

  const TargetRoute = targetComponent();

  return (
    <Wrapper>
      <div className="topbar">
        <div className="nav">
          <Link to="/continuingEdu">学习培训</Link>
          <span> / </span>
          {appStore.hisMatch({
            map: {
              'hj': <React.Fragment>
                {queryObj.userType && <Link to="/continuingEdu/其他人员">其他人员</Link>}
                {!queryObj.userType && <Link to="/continuingEdu/人员管理">正式人员</Link>}
              </React.Fragment>,
              other: <Link to="/continuingEdu/人员管理">人员管理</Link>
            }
          })}
          <span> / {data.empName}</span>
        </div>
        <div className="emp-info">
          <span className="emp-img">
            <img src={appStore.queryObj.nearImageUrl || ""} alt="" />
          </span>
          <span>
            <span className="emp-name">{data.empName}</span>
            <br />
            {queryObj.userTypeName && <span className="emp-sub">
              {queryObj.userTypeName}
            </span>}
            {!queryObj.userTypeName && <span className="emp-sub">
              {data.newTitle} | {data.nurseHierarchy} | {data.deptName} |{" "}
              {data.status}
            </span>}
          </span>
        </div>
        <div className="btn-group">
          {/* <Button onClick={() => setSorceAppendVisible(true)}>添加学分</Button> */}
          <Button onClick={() => history.goBack()}>返回</Button>
        </div>
      </div>
      <div className="main-contain">
        <div className="left-menu">
          {Routes_Config.map((item: any) => {
            return (
              <div
                key={item.name}
                className={
                  TargetRoute.name == item.name
                    ? "active menu-item"
                    : "menu-item"
                }
                onClick={() => handleRouteChange(item.name)}
              >
                {item.title}
              </div>
            );
          })}
        </div>
        <div className="route-view">
          <TargetRoute.component shouldSorceAppendOpen={() => setSorceAppendVisible(true)} addBtnHide={true} />
        </div>
      </div>
      <SorceAppendModal
        visible={sorceAppendVisible}
        empNo={appStore.queryObj.empNo}
        onOk={handleSourceAppend}
        onCancel={() => setSorceAppendVisible(false)}
      />
    </Wrapper>
  );
});
const defaultImg = require("./../../assets/护士默认头像.png");
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 135px;
  .topbar {
    padding: 10px 15px;
    margin-top: -135px;
    height: 135px;
    background: url("./static/media/顶部背景.7f60fe00.png");
    background-size: cover;
    box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid #dbe0e4;
    .nav {
      margin-bottom: 15px;
      a {
        color: #666;
      }
    }
    .emp-info {
      display: inline-block;
      > span {
        vertical-align: middle;
        display: inline-block;
      }
      .emp-img {
        width: 72px;
        height: 72px;
        border-radius: 50%;
        background: #ddd;
        margin-right: 10px;
        background: url(${defaultImg});
        overflow: hidden;
        img {
          width: 74px;
          height: 74px;
          position: relative;
          top: -1px;
          left: -1px;
          object-fit: cover;
        }
      }
      .emp-name {
        font-size: 16px;
        margin-bottom: 4px;
        font-weight: bold;
        display: inline-block;
      }
      .emp-sub {
        font-size: 12px;
      }
    }
    .btn-group {
      float: right;
      margin-top: 20px;
      .ant-btn {
        margin-left: 10px;
        :first-of-type {
          margin-left: 0;
        }
      }
    }
  }

  .main-contain {
    width: 100%;
    height: 100%;
    height: calc(100vh - 185px);
    .left-menu {
      float: left;
      box-shadow: 3px 7px 7px 0px rgba(0, 0, 0, 0.1);
      border-right: 1px solid rgba(228, 228, 228, 1);
      width: 160px;
      height: 100%;
      overflow-y: auto;
      background: url("/static/media/侧边背景.5cb403af.png");
      background-color: rgba(0, 0, 0, 0);
      background-size: 120% auto;
      background-repeat: no-repeat;
      height: calc(100vh - 185px);
      ::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 8px;
        /*高宽分别对应横竖滚动条的尺寸*/
        height: 10px;
      }
      ::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 5px;
        box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.2);
        background: rgba(0, 0, 0, 0.1);
      }
      /*定义滚动条轨道 内阴影+圆角*/
      ::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        // box-shadow: inset 0 0 5px #ffffff;
        // border-radius: 5px;
        background-color: rgba(0, 0, 0, 0.1);
      }
      .menu-item {
        height: 32px;
        border-bottom: 1px solid #e5e5e5;
        line-height: 30px;
        padding: 0 16px;
        font-size: 13px;
        color: #333;
        cursor: pointer;
        position: relative;
        :hover {
          color: #fff;
          background: #00a680;
        }
        &.active {
          color: #fff;
          background: #00a680;
        }
      }
    }

    .route-view {
      overflow: hidden;
      height: 100%;
    }
  }
`;
