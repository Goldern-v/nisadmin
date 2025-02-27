import LeftMenu from "src/components/LeftMenu";
import styled from "styled-components";
import React, { useLayoutEffect, useState } from "react";
import { RouteComponentProps } from "src/components/RouterView";
import { appStore } from "src/stores";
import { observer } from "mobx-react-lite";
import NurseFilesListView_hj from "./view/nurseFiles-hj/views/nurseFilesList/NurseFilesListView";
import NurseFilesListView_wh from "./view/nurseFiles-wh/views/nurseFilesList/NurseFilesListView";
import NurseFilesListView_whyx from "./view/nurseFiles-whyx/views/nurseFilesList/NurseFilesListView";
import NurseFilesListView_nys from "./view/nurseFiles-nys/views/nurseFilesList/NurseFilesListView";
import NurseFilesListView_gzhd from "./view/nurseFiles-gzhd/views/nurseFilesList/NurseFilesListView";
import NurseFilesListView_lcey from "./view/nurseFiles-lcey/views/nurseFilesList/NurseFilesListView";
import NurseFilesListView_gzsrm from "./view/nurseFiles-gzsrm/views/nurseFilesList/NurseFilesListView";
import NurseFilesListView_jmfy from "./view/nurseFiles-jmfy/views/nurseFilesList/NurseFilesListView";
import NurseFilesListView_dghl from "./view/nurseFiles-dghl/views/nurseFilesList/NurseFilesListView";
import NurseFilesListView_dgxg from "./view/nurseFiles-dgxg/views/nurseFilesList/NurseFilesListView";
import NurseFilesListView_yczyy from "./view/nurseFiles-yczyy/views/nurseFilesList/NurseFilesListView";
import NurseFilesListView_fqfybjy from "./view/nurseFiles-fqfybjy/views/nurseFilesList/NurseFilesListView";
import RetiredRetirees from "./view/retiredRetirees/RetiredRetireesView";
import RetiredRetireesNys from "./view/retiredRetirees-nys/RetiredRetireesView";
import StatisticsView from "./view/statistics/StatisticsView";
import StatisticsViewWHYX from "./view/statistics-whyx/StatisticsView";
//护士调动
import HumanResource from "./view/nurseFiles-nys/views/humanResource/HumanResource";
//院级小组
import NurseGroupManage from "./view/nurseFiles-nys/views/nurseGroupManage/NurseGroupManage";
//护理进实习花名册
import TraineeFiles from "./view/traineeFiles/TraineeFiles";
import TraineeFiles_nys from "./view/traineeFiles_nys/TraineeFiles";
//厚街护理进修生花名册
import NursingEduFiles from "./view/nursingEduFiles/NursingEduFiles";
//护理实习生轮班
import TraineeShift from "./view/traineeShift/TraineeShift";
//查询统计-科室创新
import 科室创新 from "./view/科室创新/科室创新";

import AddSecondMenuModal from "./view/traineeShift/modal/AddSecondMenuModal"; // 添加修改弹窗
import { traineeShiftModal } from "./view/traineeShift/TraineeShiftModal"; // 实习生轮班公共数据仓库
import { traineeShiftApi } from "./view/traineeShift/api/TraineeShiftApi"; // 实习生轮班接口
import { ReactComponent as ZZHSDA } from "./images/ZZHSDA.svg";
import { ReactComponent as TXHSCX } from "./images/TXHSCX.svg";
import { ReactComponent as CXTJ } from "./images/CXTJ.svg";
import qs from "qs";
// 广西江滨人员调动
import StaffMovementEnquiry from "./view/StaffMovementEnquiry";

// 引入自动推送设置页面
export interface Props extends RouteComponentProps {}
export default observer(function NurseFilesView(props: Props) {
  const [dataList, setDataList]: any = useState([]); // 实习生动态菜单树
  const OnTheJobComponent = (() => {
    switch (appStore.HOSPITAL_ID) {
      case "wh":
      case "gdsfy":
      case 'lyyz':
      case 'qhwy':
      case 'zzwy':
      case 'dglb':
      case "wjgdszd":
      case "fssdy":
      case "gxjb":
      case "fsxt":
      case "925":
      case "sdlj":
      case "nfsd":
      case "lyrm":
      case "nfzxy":
      case "gdtj":
      case "ytll":
      case "stmz":
      case 'qzde':
      case 'dghm':
      case "lcey":
      case 'zjhj':
        return NurseFilesListView_wh;
      case "nys":
        return NurseFilesListView_nys;
      case "gzhd":
        return NurseFilesListView_gzhd;
      case "lcey":
        return NurseFilesListView_lcey;
      case "gzsrm":
        return NurseFilesListView_gzsrm;
      case "jmfy":
        return NurseFilesListView_jmfy;
      case "dghl":
        return NurseFilesListView_dghl;
      case "dgxg":
        return NurseFilesListView_dgxg;
      case "yczyy":
        return NurseFilesListView_yczyy;
      case "fqfybjy":
        return NurseFilesListView_fqfybjy;
      case "whyx":
      case 'whhk':
      case 'zhzxy':
        return NurseFilesListView_whyx;
      default:
        return NurseFilesListView_hj;
    }
  })();
  const onTheJobCon = {
    title: "在职护士档案",
    path: "/nurseFile/onTheJob",
    component: OnTheJobComponent,
    icon: <ZZHSDA />,
  };
  const retiredRetireesCon = {
    title:appStore.HOSPITAL_ID =='qhwy'?"离职/退休/调岗人员查询": "离职/退休人员查询",
    path: "/nurseFile/retiredRetirees",
    component: RetiredRetirees,
    icon: <TXHSCX />,
  };
  const nursingEduFilesCon = {
    title: "护理进修生花名册",
    path: "/nurseFile/nursingEduFiles",
    hide: () => ["ytll"].includes(appStore.HOSPITAL_ID),
    component: NursingEduFiles,
    icon: <TXHSCX />,
  };
  const traineeFilesCon = {
    title: "护理实习生花名册",
    path: "/nurseFile/traineeFiles",
    component: TraineeFiles,
    icon: <TXHSCX />,
  };
  const nursingRoundsCon = {
    title: "护理实习生轮科",
    icon: <TXHSCX />,
    hide: appStore.hisMatch({
      map: {
        "hj,lyrm,qhwy,fsxt,whhk,925,dglb,stmz,zjhj": false,
        'dghm,ytll': true,
        other: !appStore.isDev,
      },
      vague: true,
    }),
    addIcon: true,
    children: dataList,
  };
  const LEFT_MENU_CONFIG_NYS = [
    onTheJobCon,
    {
      title: "护士调动",
      path: "/nurseFile/humanResource",
      component: HumanResource,
      icon: <TXHSCX />,
    },
    {
      title: "院级小组管理",
      path: "/nurseFile/nurseGroupManage",
      component: NurseGroupManage,
      // hidden: !appStore.isDev,
      icon: <TXHSCX />,
    },
    {
      title: "离职/退休人员查询",
      path: "/nurseFile/retiredRetirees",
      component: RetiredRetireesNys,
      icon: <TXHSCX />,
    },
    {
      title: "实习护士",
      path: `/nurseFile/traineeFiles?${qs.stringify({ fileName: "实习护士" })}`,
      component: TraineeFiles_nys,
      icon: <TXHSCX />,
    },
  ];
  const LEFT_MENU_CONFIG_WH = [
    onTheJobCon,
    retiredRetireesCon,
    {
      title: "查询统计",
      icon: <CXTJ />,
      children: [
        {
          title: "文章",
          path: "/nurseFile/article",
          component: StatisticsView,
        },
        {
          title: "个人获奖",
          path: "/nurseFile/personWinning",
          component: StatisticsView,
        },
        {
          title: "专科护士",
          path: "/nurseFile/specializNurse",
          component: StatisticsView,
        },
        {
          title: "外出进修",
          path: "/nurseFile/outStudy",
          component: StatisticsView,
        },
        {
          title: "主持科研课题",
          path: "/nurseFile/hostScienceCourse",
          component: StatisticsView,
        },
        {
          title: "参与科研课题",
          path: "/nurseFile/goScienceCourse",
          component: StatisticsView,
        },
        {
          title: "科研课题获奖",
          path: "/nurseFile/scienceResult",
          component: StatisticsView,
        },

        {
          title: "专利",
          path: "/nurseFile/patent",
          component: StatisticsView,
        },
        {
          title: "学会任职",
          path: "/nurseFile/learnJob",
          component: StatisticsView,
        },
        {
          title: "社会兼职",
          path: "/nurseFile/socialJob",
          component: StatisticsView,
        },


        {
          title: "专著",
          path: "/nurseFile/monograph",
          component: StatisticsView,
        },
        {
          title: "举办继续教育培训班",
          path: "/nurseFile/continueStudy",
          component: StatisticsView,
        },
        {
          title: "工作经历",
          path: "/nurseFile/workExperience",
          component: StatisticsView,
        },
        {
          title: "医学学历教育",
          path: "/nurseFile/medicalEducation",
          component: StatisticsView,
        },
        {
          title: "岗位变动",
          path: "/nurseFile/transferPost",
          component: StatisticsView,
        },
        {
          title: "职称变动",
          path: "/nurseFile/title",
          component: StatisticsView,
        },
        {
          title: "层级变动",
          path: "/nurseFile/hierarchy",
          component: StatisticsView,
        },
        {
          title: "编制变动",
          path: "/nurseFile/workConversion",
          component: StatisticsView,
          hide: appStore.hisMatch({
              map: {
                  "sdlj,qzde": true,
                  other: false,
              },
              vague: true
          })
        },
        {
          title: "科室创新",
          path: "/nurseFile/科室创新",
          hide: !appStore.isDev,
          component: 科室创新,
        },
      ],
    },
    ...appStore.hisMatch({
      map: {
        "qhwy,ytll,whhk,dglb,sdlj,qzde,dghm": [
          nursingEduFilesCon
        ],
        other: [],
      },
      vague: true,
    }),
    {
      title: "护理实习生花名册",
      path: "/nurseFile/traineeFiles",
      hide: appStore.hisMatch({
        map: {
          "qhwy,whhk,dglb,sdlj,qzde,dghm": false,
          other: !appStore.isDev,
        },
        vague: true,
      }),
      component: TraineeFiles,
      icon: <TXHSCX />,
    },
    nursingRoundsCon,
    ...appStore.hisMatch({
      map: {
        'dghm': [
          {
            title: "人员调动查询",
            path: "/nurseFile/staffMovementEnquiry",
            component: StaffMovementEnquiry,
            icon: <TXHSCX />,
          },
        ],
        other: [],
      },
      vague: true
    }),
  ];

  const LEFT_MENU_CONFIG_NFZXY = [
    onTheJobCon,
    retiredRetireesCon,
    {
      title: "查询统计",
      icon: <CXTJ />,
      children: [
        {
          title: "文章",
          path: "/nurseFile/article",
          component: StatisticsView,
        },
        {
          title: "个人获奖",
          path: "/nurseFile/personWinning",
          component: StatisticsView,
        },
        {
          title: "专科护士",
          path: "/nurseFile/specializNurse",
          component: StatisticsView,
        },
        {
          title: "外出进修",
          path: "/nurseFile/outStudy",
          component: StatisticsView,
        },
        {
          title: "主持科研课题",
          path: "/nurseFile/hostScienceCourse",
          component: StatisticsView,
        },
        {
          title: "参与科研课题",
          path: "/nurseFile/goScienceCourse",
          component: StatisticsView,
        },
        {
          title: "科研课题获奖",
          path: "/nurseFile/scienceResult",
          component: StatisticsView,
        },
        {
          title: "专利",
          path: "/nurseFile/patent",
          component: StatisticsView,
        },
        {
          title: "学会任职",
          path: "/nurseFile/learnJob",
          component: StatisticsView,
        },
        {
          title: "专著",
          path: "/nurseFile/monograph",
          component: StatisticsView,
        },
        {
          title: "举办继续教育培训班",
          path: "/nurseFile/continueStudy",
          component: StatisticsView,
        },
        {
          title: "工作经历",
          path: "/nurseFile/workExperience",
          component: StatisticsView,
        },
        {
          title: "医学学历教育",
          path: "/nurseFile/medicalEducation",
          component: StatisticsView,
        },
        {
          title: "岗位变动",
          path: "/nurseFile/transferPost",
          component: StatisticsView,
        },
        {
          title: "职称变动",
          path: "/nurseFile/title",
          component: StatisticsView,
        },
        {
          title: "层级变动",
          path: "/nurseFile/hierarchy",
          component: StatisticsView,
        },
        {
          title: "编制变动",
          path: "/nurseFile/workConversion",
          component: StatisticsView,
        },
        {
          title: "科室创新",
          path: "/nurseFile/科室创新",
          hide: !appStore.isDev,
          component: 科室创新,
        },
      ],
    },
    nursingEduFilesCon,
    traineeFilesCon,
    nursingRoundsCon,
  ];


  const LEFT_MENU_CONFIG_HJ = [
    onTheJobCon,
    retiredRetireesCon,
    ...appStore.hisMatch({
      map: {
        'whsl,925,zhzxy,lcey,zjhj': [
          {
            title: "查询统计",
            icon: <CXTJ />,
            children: [
              {
                title: "文章",
                path: "/nurseFile/article",
                component: StatisticsView,
              },
              {
                title: "个人获奖",
                path: "/nurseFile/personWinning",
                component: StatisticsView,
              },
              {
                title: "专科护士",
                path: "/nurseFile/specializNurse",
                component: StatisticsView,
              },
              {
                title: "外出进修",
                path: "/nurseFile/outStudy",
                component: StatisticsView,
              },
              {
                title: "主持科研课题",
                path: "/nurseFile/hostScienceCourse",
                component: StatisticsView,
              },
              {
                title: "参与科研课题",
                path: "/nurseFile/goScienceCourse",
                component: StatisticsView,
              },
              {
                title: "科研课题获奖",
                path: "/nurseFile/scienceResult",
                component: StatisticsView,
              },

              {
                title: "专利",
                path: "/nurseFile/patent",
                component: StatisticsView,
              },
              {
                title: "学会任职",
                path: "/nurseFile/learnJob",
                component: StatisticsView,
              },
              {
                title: "资质管理（院内）",
                path: "/nurseFile/innaiQualification",
                component: StatisticsViewWHYX,
                hidden:appStore.HOSPITAL_ID !=='925'
              },
              {
                title: "资质管理（院外）",
                path: "/nurseFile/outQualification",
                component: StatisticsViewWHYX,
                hidden:appStore.HOSPITAL_ID !=='925'
              },
              {
                title: "专著",
                path: "/nurseFile/monograph",
                component: StatisticsView,
              },
              {
                title: "举办继续教育培训班",
                path: "/nurseFile/continueStudy",
                component: StatisticsView,
              },
              {
                title: "工作经历",
                path: "/nurseFile/workExperience",
                component: StatisticsView,
              },
              {
                title: "医学学历教育",
                path: "/nurseFile/medicalEducation",
                component: StatisticsView,
              },
              {
                title: "在院工作情况",
                path: "/nurseFile/workRegistrationForm",
                component: StatisticsView,
                hidden:appStore.HOSPITAL_ID !=='925'
              },
              {
                title: "岗位变动",
                path: "/nurseFile/transferPost",
                component: StatisticsView,
              },
              {
                title: "职称变动",
                path: "/nurseFile/title",
                component: StatisticsView,
              },
              {
                title: "层级变动",
                path: "/nurseFile/hierarchy",
                component: StatisticsView,
              },
              {
                title: "编制变动",
                path: "/nurseFile/workConversion",
                component: StatisticsView,
              },
              {
                title: "科室创新",
                path: "/nurseFile/科室创新",
                hide: !appStore.isDev,
                component: 科室创新,
              },
              {
                title: "立功嘉奖",
                path: "/nurseFile/MakeAwards",
                component: StatisticsView,
                hidden:appStore.HOSPITAL_ID !=='925'
              },
            ],
          },
        ],
        'other': []
      },
      vague: true
    }),
    nursingEduFilesCon,
    traineeFilesCon,
    ...appStore.hisMatch({
      map: {
        gxjb: [
          {
            title: "人员调动查询",
            path: "/nurseFile/staffMovementEnquiry",
            component: StaffMovementEnquiry,
            icon: <TXHSCX />,
          },
        ],
        other: [],
      },
    }),
    nursingRoundsCon,
  ];

  const LEFT_MENU_CONFIG_WHYX = [
    onTheJobCon,
    retiredRetireesCon,
    {
      title: "查询统计",
      icon: <CXTJ />,
      children: [
        // 新
        {
          title: "基本信息",
          path: "/nurseFile/baseInfo",
          component: StatisticsViewWHYX,
        },
        {
          title: "专科护士",
          path: "/nurseFile/specializNurse",
          component: StatisticsViewWHYX,
        },
        {
          title: "外出进修",
          path: "/nurseFile/outStudy",
          component: StatisticsViewWHYX,
        },
        // 新
        {
          title: "学术活动",
          path: "/nurseFile/academicActivity",
          component: StatisticsViewWHYX,
        },
        // 新
        {
          title: "资质管理（院内）",
          path: "/nurseFile/innaiQualification",
          component: StatisticsViewWHYX,
        },
        // 新
        {
          title: "资质管理（院外）",
          path: "/nurseFile/outQualification",
          component: StatisticsViewWHYX,
        },
        {
          title: "文章",
          path: "/nurseFile/article",
          component: StatisticsViewWHYX,
        },
        {
          title: "专著",
          path: "/nurseFile/monograph",
          component: StatisticsViewWHYX,
        },
        {
          title: "主持科研课题",
          path: "/nurseFile/hostScienceCourse",
          component: StatisticsViewWHYX,
        },
        {
          title: "参与科研课题",
          path: "/nurseFile/goScienceCourse",
          component: StatisticsViewWHYX,
        },
        {
          title: "科研课题获奖",
          path: "/nurseFile/scienceResult",
          component: StatisticsViewWHYX,
        },
        {
          title: "专利",
          path: "/nurseFile/patent",
          component: StatisticsViewWHYX,
        },
        {
          title: "科室创新",
          path: "/nurseFile/innovationDepartment",
          // hide: !appStore.isDev,
          component: StatisticsViewWHYX,
        },
        {
          title: "学会任职",
          path: "/nurseFile/learnJob",
          component: StatisticsViewWHYX,
        },
        {
          title: "个人获奖",
          path: "/nurseFile/personWinning",
          component: StatisticsViewWHYX,
        },
        {
          title: "举办继续教育培训班",
          path: "/nurseFile/continueStudy",
          component: StatisticsViewWHYX,
        },
        {
          title: "院外工作经历",
          path: "/nurseFile/workExperienceOut",
          component: StatisticsViewWHYX,
        },
        {
          title: "院内工作经历",
          path: "/nurseFile/workExperienceIn",
          component: StatisticsViewWHYX,
        },
        {
          // title: "医学学历教育",
          title: "临床护理工作登记",
          path: "/nurseFile/medicalEducation",
          component: StatisticsViewWHYX,
        },
        {
          title: "岗位变动",
          path: "/nurseFile/transferPost",
          component: StatisticsViewWHYX,
        },
        {
          title: "职称变动",
          path: "/nurseFile/title",
          component: StatisticsViewWHYX,
        },
        {
          title: "层级变动",
          path: "/nurseFile/hierarchy",
          component: StatisticsViewWHYX,
        },
        {
          title: "编制变动",
          path: "/nurseFile/workConversion",
          component: StatisticsViewWHYX,
        },
      ],
    },
    {
      title: "护理实习生花名册",
      path: "/nurseFile/traineeFiles",
      hide: !appStore.isDev,
      component: TraineeFiles,
      icon: <TXHSCX />,
    },
    nursingRoundsCon,
  ];
  const LEFT_MENU_CONFIG_LYRM = [
    onTheJobCon,
    {
      title: "查询统计",
      icon: <CXTJ />,
      children: [
        {
          title: "文章",
          path: "/nurseFile/article",
          component: StatisticsView,
        },
        {
          title: "个人获奖",
          path: "/nurseFile/personWinning",
          component: StatisticsView,
        },
        {
          title: "专科护士",
          path: "/nurseFile/specializNurse",
          component: StatisticsView,
        },
        {
          title: "外出进修",
          path: "/nurseFile/outStudy",
          component: StatisticsView,
        },
        {
          title: "主持科研课题",
          path: "/nurseFile/hostScienceCourse",
          component: StatisticsView,
        },
        {
          title: "参与科研课题",
          path: "/nurseFile/goScienceCourse",
          component: StatisticsView,
        },
        {
          title: "科研课题获奖",
          path: "/nurseFile/scienceResult",
          component: StatisticsView,
        },

        {
          title: "专利",
          path: "/nurseFile/patent",
          component: StatisticsView,
        },
        {
          title: "学会任职",
          path: "/nurseFile/learnJob",
          component: StatisticsView,
        },
        {
          title: "专著",
          path: "/nurseFile/monograph",
          component: StatisticsView,
        },
        {
          title: "举办继续教育培训班",
          path: "/nurseFile/continueStudy",
          component: StatisticsView,
        },
        {
          title: "工作经历",
          path: "/nurseFile/workExperience",
          component: StatisticsView,
        },
        {
          title: "医学学历教育",
          path: "/nurseFile/medicalEducation",
          component: StatisticsView,
        },
        {
          title: "岗位变动",
          path: "/nurseFile/transferPost",
          component: StatisticsView,
        },
        {
          title: "职称变动",
          path: "/nurseFile/title",
          component: StatisticsView,
        },
        {
          title: "层级变动",
          path: "/nurseFile/hierarchy",
          component: StatisticsView,
        },
        {
          title: "编制变动",
          path: "/nurseFile/workConversion",
          component: StatisticsView,
        },
        {
          title: "科室创新",
          path: "/nurseFile/科室创新",
          hide: !appStore.isDev,
          component: 科室创新,
        },
      ],
    },
    retiredRetireesCon,
    nursingEduFilesCon,
    traineeFilesCon,
    nursingRoundsCon,
  ];

  const menuConfig = () => {
    switch (appStore.HOSPITAL_ID) {
      case "wh":
      case "gdsfy":
      case 'lyyz':
      case 'qhwy':
      case 'ytll':
      case 'wjgdszd':
      case 'zzwy':
      case 'dglb':
      case 'sdlj':
      case 'qzde':
      case 'dghm':
        return LEFT_MENU_CONFIG_WH;
      case "nys":
        return LEFT_MENU_CONFIG_NYS;
      case "whyx":
      case 'whhk':
      case 'jmfy':
        return LEFT_MENU_CONFIG_WHYX;
      case "lyrm":
      case "stmz":
        return LEFT_MENU_CONFIG_LYRM;
      case "nfzxy":
      case "fssdy":
        return LEFT_MENU_CONFIG_NFZXY;
      default:
        return LEFT_MENU_CONFIG_HJ;
    }
  };

  let currentRoutePath = props.match.url || "";
  let currentRoute = getTargetObj(menuConfig(), "path", currentRoutePath);
  // 筛选目标对象
  function getTargetObj(listDate: any, targetKey: string, targetName: string) {
    let chooseRoute = listDate.find((item: any) => {
      if (item.children) {
        return item.children.find(
          (item1: any) => item1[targetKey].split("?")[0] === targetName
        );
      } else {
        return item[targetKey].split("?")[0] === targetName;
      }
    });
    if (chooseRoute && chooseRoute.children) {
      chooseRoute = chooseRoute.children.find(
        (item1: any) => item1[targetKey].split("?")[0] === targetName
      );
    }
    return chooseRoute;
  }

  // 初始化动态菜单 菜单权限
  useLayoutEffect(() => {
    if (
      [
        "hj",
        "wjgdszd",
        "gzhd",
        "lcey",
        "gxjb",
        "fssdy",
        "fsxt",
        '925',
        "gzsrm",
        "jmfy",
        "gzsrm",
        "fqfybjy",
        "nfzxy",
        "qhwy",
        'whhk',
        'zzwy',
        'dglb',
        'lyrm',
        'zhzxy', 'dghm', 'zjhj','gdsfy',
        appStore.isDev ? "wh" : "wh_production",
      ].indexOf(appStore.HOSPITAL_ID) >= 0
    )
      getList();
  }, [props.history.location.pathname]);

  // 厚街实习生轮班动态菜单列表
  const getList = () => {
    traineeShiftApi.queryAllRotationScheduleSheets().then((res: any) => {
      let newArr: any = [];
      if (res.data) {
        let arr = res.data;
        if (arr.length > 0) {
          arr.map((item: any, index: number) => {
            var obj: any = {
              id: item.id,
              title: item.title,
              component: TraineeShift,
              path: `/nurseFile/${item.title}`,
            };
            newArr.push(obj);
          });
          setDataList(newArr);
        }
      }
    });
  };

  // 创建实习生轮科弹窗
  const handleEditCancel = () => {
    traineeShiftModal.isOkBtn = false;
  };
  const handleEditOk = () => {
    getList();
    handleEditCancel();
  };

  return (
    <Wrapper>
      <LeftMenuCon>
        <LeftMenu config={menuConfig()} menuTitle="系统设置" />
      </LeftMenuCon>
      <MainCon>
        {currentRoute && currentRoute.component && (
          <currentRoute.component
            getId={currentRoute && currentRoute.id}
            getTitle={currentRoute && currentRoute.title}
          />
        )}
      </MainCon>
      <AddSecondMenuModal
        visible={traineeShiftModal.isOkBtn}
        onCancel={handleEditCancel}
        onOk={handleEditOk}
      />
    </Wrapper>
  );
});
const Wrapper = styled.div`
  overflow: hidden;
  height: calc(100vh-50px);
  display: flex;
  align-items: stretch;
`;

const LeftMenuCon = styled.div`
  width: 200px;
`;
const MainCon = styled.div`
  flex: 1;
  width: 0;
  align-items: stretch;
  display: flex;
  flex-direction: column;
`;

const TopCon = styled.div`
  height: 45px;
  background: #f8f8f8;
  box-shadow: 3px 3px 6px 0px rgba(0, 0, 0, 0.15);
  border-bottom: 1px solid #dbe0e4;
  font-size: 13px;
  position: relative;
  font-size: 16px;
  color: #333333;
  padding: 0 20px;
  display: flex;
  align-items: center;
  z-index: 1;
`;

const TableCon = styled.div`
  flex: 1;
  margin: 15px;
  background: #fff;
  border: 1px solid rgba(228, 228, 228, 1);
`;
