import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "src/components/RouterView";
import _ from "lodash";
import { HorizontalMenuItem } from "src/types/horizontalMenu";
import TopCon from "./components/TopCon";
import LeftMenu from "./components/LeftMenu";
import BaseInfo from "./views/BaseInfo";
import WorkHistory from "./views/WorkHistory";
// import SpecialCard from "./views/SpecialCard";
import EducationalExperience from "./views/EducationalExperience";
import LevelChange from "./views/LevelChange";
import ContinuingEducation from "./views/ContinuingEducation";
import Writings from "./views/Writings";
import Awards from "./views/Awards";
import CheckFile from "./views/CheckFile";
// import BadAction from "./views/BadAction";
// import ThreeBases from "./views/ThreeBases";
// import ExaminationResults from "./views/ExaminationResults";
import WorkRegistrationForm from "./views/WorkRegistrationForm";
import NurseJuniorSpecialFile from "./views/NurseJuniorSpecialFile";
import OnEducation from "./views/OnEducation";
import FileList from "./views/FileList";
import { nurseFileDetailViewModal } from "./NurseFileDetailViewModal";
import { appStore } from "src/stores";
import { Spin } from "antd";
import { observer } from "mobx-react-lite";
import { nurseFilesService } from "../../services/NurseFilesService";
import SorceAppendModal from "src/modules/continuingEdu/components/SorceAppendModal";
import qs from "qs";
import { empDetailModel } from "src/modules/continuingEdu/views/empDetail/models/EmpDetailModel";
import StudyAndTariningEmpDetailTable from "src/modules/continuingEdu/views/empDetail/TableView";
import TestView from "src/modules/continuingEdu/views/empDetail/TestView_nys";
export interface Props extends RouteComponentProps<{ type?: string }> {
  payload: HorizontalMenuItem[];
}

const studyAndTrainingTypeList = [
  '学分记录', '学时记录', '学习记录', '练习记录', '实操记录', '演练记录', '实践记录'
]

const ROUTE_LIST = [
  {
    type: "baseInfo",
    component: BaseInfo,
    name: "基本信息"
  },
  {
    type: "workHistory",
    component: WorkHistory,
    name: "工作经历"
  },
  // {
  //   type: "specialCard",
  //   component: SpecialCard,
  //   name: "特殊资格证"
  // },
  {
    type: "educationalExperience",
    component: EducationalExperience,
    name: "教育经历"
  },
  {
    type: "levelChange",
    component: LevelChange,
    name: "职称及层级"
  },
  {
    type: "ctnEdu",
    component: ContinuingEducation,
    name: "继续教育"
  },
  {
    type: "writings",
    component: Writings,
    indexList: ["著作", "论文"],
    name: "著作与论文"
  },
  {
    type: "awards",
    component: Awards,
    name: "所获奖励"
  },
  // {
  //   type: 'badAction',
  //   component: BadAction,
  //   name: '不良行为'
  // },
  // {
  //   type: "examinationResults",
  //   component: ExaminationResults,
  //   name: "年度考核结果"
  // },
  // {
  //   type: "threeBases",
  //   component: ThreeBases,
  //   name: "医院三基考核"
  // },
  {
    type: "checkFile",
    component: CheckFile,
    name: "培训与考核"
  },
  {
    type: "workRegistrationForm",
    component: WorkRegistrationForm,
    name: "工作情况登记"
  },
  {
    type: "nurseJuniorSpecialFile",
    component: NurseJuniorSpecialFile,
    name: "专科护士"
  },
  {
    type: "onEducation",
    component: OnEducation,
    name: "外出进修"
  },
  // 学习培训的个人详情模块
  ...studyAndTrainingTypeList.map((name: string) => ({
    type: name,
    component: StudyAndTariningEmpDetailTable,
    name
  })),
  {
    type: "考试记录",
    component: TestView,
    name: "考试记录"
  },
];

export default observer(function NurseFileDetail(props: Props, context: any) {
  // appStore.match.params.type
  let currentRouteType = props.match.params.type;
  let CurrentRoute = ROUTE_LIST.find(item => item.type === currentRouteType);
  const pannelName = empDetailModel.pannelName

  const [sorceAppendVisible, setSorceAppendVisible] = useState(false)

  useEffect(() => {
    nurseFilesService.nurseInformation(appStore.queryObj.empNo).then(res => {
      nurseFileDetailViewModal.nurserInfo = res.data;
    });
    nurseFileDetailViewModal.init();
  }, []);

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

  return (
    <Wrapper>
      <TopCon />
      <MainCon>
        <LeftMenuCon>
          <LeftMenu routeList={ROUTE_LIST} />
        </LeftMenuCon>
        <DetailCon>
          <Spin spinning={nurseFileDetailViewModal.pageSpinning}>
            {CurrentRoute && CurrentRoute.component && (
              <CurrentRoute.component
                {...{
                  shouldSorceAppendOpen: () => setSorceAppendVisible(true),
                  addBtnHide: false
                }} />
            )}
          </Spin>
        </DetailCon>
      </MainCon>
      <SorceAppendModal
        visible={sorceAppendVisible}
        empNo={appStore.queryObj.empNo}
        onOk={handleSourceAppend}
        onCancel={() => setSorceAppendVisible(false)}
      />
    </Wrapper>
  );
});
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const LeftMenuCon = styled.div`
  width: 160px;
  position: relative;
  z-index: 1;
  background: rgba(248, 248, 248, 1);
  box-shadow: 3px 7px 7px 0px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(228, 228, 228, 1);
`;
const MainCon = styled.div`
  flex: 1;
  height: calc(100vh - 230px);
  align-items: stretch;
  display: flex;
`;

const DetailCon = styled.div`
  flex: 1;
  overflow: auto;
`;
