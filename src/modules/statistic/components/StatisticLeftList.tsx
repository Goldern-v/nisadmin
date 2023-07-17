import LeftMenu from 'src/components/LeftMenu'
import styled from 'styled-components'
import React, { useEffect } from 'react'
import { appStore } from 'src/stores'

import { ReactComponent as PBTJ } from '../img/PBTJ.svg'
import { ReactComponent as HLRYTJ } from '../img/HLRYTJ.svg'
import { ReactComponent as HZCXTJ } from '../img/HZCXTJ.svg'
import { ReactComponent as ZZHSDA } from '../img/ZZHSDA.svg'

// 左侧列表数据
const LEFT_MENU_CONFIG = [
  ...appStore.hisMatch({
    map: {
      // 贵州省医
      gzsrm: [
        {
          title: "发热患者统计",
          icon: <ZZHSDA />,
          path: "/statistic/发热患者统计",
        },
        {
          title: "PDA使用情况统计",
          icon: <ZZHSDA />,
          path: "/statistic/PDA使用情况统计",
        },
        {
          title: "电话回访率统计",
          icon: <ZZHSDA />,
          path: "/statistic/电话回访率统计",
        },
        {
          title: "患者输血情况统计",
          icon: <ZZHSDA />,
          path: "/statistic/患者输血情况统计",
        }
      ],
      // 其他医院
      other: [
        {
          title: "排班统计",
          icon: <PBTJ />,
          children: [
            { title: "护士排班表", path: "/statistic/护士排班表" },
            {
              title: "护士排班统计（按班次）",
              path: "/statistic/护士排班统计（按班次）"
            },
            ...appStore.hisMatch({
              map: {
                nys: [
                  {
                    title: "护士日班统计（按月份)",
                    path: "/statistic/护士日班统计（按月份）"
                  },
                ],
                default: [
                  {
                    title: "护士白班统计（按月份)",
                    path: "/statistic/护士白班统计（按月份）"
                  },
                ]
              }
            }),
            {
              title: "护士夜班统计（按月份）",
              path: "/statistic/护士夜班统计（按月份）"
            },
            {
              title: "护士休假统计（按月份）",
              path: "/statistic/护士休假统计（按月份）"
            },
            {
              title: "护士节假日排班表",
              path: "/statistic/护士节假日排班表",
              hide: ['nys','whyx','whhk'].includes(appStore.HOSPITAL_ID)
            },
            {
              title: `科室排班统计（按班次${appStore.HOSPITAL_ID === "lcey" ? '/按工时' : ''}）`,
              path: `/statistic/科室排班统计（按班次${appStore.HOSPITAL_ID === "lcey" ? '/按工时' : ''}）`,
              // hide: appStore.HOSPITAL_ID == "nys"
            },
            {
              title: "科室白班统计（按月份）",
              path: "/statistic/科室白班统计（按月份）",
              hide: appStore.HOSPITAL_ID == "nys"
            },
            {
              title: "科室夜班统计（按月份）",
              path: "/statistic/科室夜班统计（按月份）",
              hide: appStore.HOSPITAL_ID == "nys"
            },
            {
              title: "科室休假统计（按月份）",
              path: "/statistic/科室休假统计（按月份）",
              hide: appStore.HOSPITAL_ID == "nys"
            },
            ...appStore.hisMatch({
              map: {
                dgxg: [{ title: '科室白班统计（按季度）', path: '/statistic/科室白班统计（按季度）', hide: appStore.HOSPITAL_ID == "nys" },
                { title: '科室夜班统计（按季度）', path: '/statistic/科室夜班统计（按季度）', hide: appStore.HOSPITAL_ID == "nys" },
                { title: '科室休假统计（按季度）', path: '/statistic/科室休假统计（按季度）', hide: appStore.HOSPITAL_ID == "nys" }],
                default: []
              }
            }),
            {
              title: "科室节假日排班表",
              path: "/statistic/科室节假日排班表",
              hide: ['nys','whyx','whhk'].includes(appStore.HOSPITAL_ID)
            }
          ]
        },
        {
          title: "护理人员统计",
          icon: <HLRYTJ />,
          children: appStore.hisMatch({
            map: {
              jmfy: [
                {
                  title: "护士学历分布",
                  path: "/statistic/护士学历分布",
                },
                {
                  title: "护士初始学历分布",
                  path: "/statistic/护士初始学历分布",
                },
                {
                  title: "护士男女分布", path: "/statistic/护士男女分布",
                },
                {
                  title: "护士工作年限分布", path: "/statistic/护士工作年限分布",
                },
                {
                  title: "护士职称分布",
                  path: "/statistic/护士职称分布",
                },
                {
                  title: "护士在职状态分析", path: "/statistic/护士在职状态分析",
                },
                {
                  title: "护士离职原因分析", path: "/statistic/护士离职原因分析",
                },
                { title: "护理人员一览表", path: "/statistic/护理人员一览表" },
              ],
              default: [
                {
                  title: "护士学历分布",
                  path: "/statistic/护士学历分布",
                },
                {
                  title: "护士男女分布", path: "/statistic/护士男女分布",
                },
                {
                  title: "护士工作年限分布", path: "/statistic/护士工作年限分布",
                },
                {
                  title: "护士在职状态分析", path: "/statistic/护士在职状态分析",
                },
                {
                  title: "护士离职原因分析", path: "/statistic/护士离职原因分析",
                },
                {
                  title: '护理人员统计',
                  path: '/statistic/护理人员统计',
                  hide: ['jmfy', 'nys', 'whyx','sdlj','whhk', 'qzde'].includes(appStore.HOSPITAL_ID),
                },
                {
                  title: "护士层级分布", path: "/statistic/护士层级分布",
                },
                { title: "护理人员一览表", path: "/statistic/护理人员一览表" },
                { title: "护理人员一览表(层级)", path: "/statistic/护理人员一览表(层级)" },
                {
                  title: "科室护士明细表",
                  path: "/statistic/科室护士明细表",
                  hide: ['nys'].includes(appStore.HOSPITAL_ID)
                },
                ...appStore.hisMatch({
                  map: {
                    'lcey,hj,sdlj,nfsd,qzde,qzde,lyrm': [
                      {
                        title: "护士职称分布",
                        path: "/statistic/护士职称分布",
                      },
                    ],
                    other: []
                  },
                  vague:true
                }),
                ...appStore.hisMatch({
                  map: {
                    'sdlj,qzde': [
                      {
                        title: "护士职务分布",
                        path: "/statistic/护士职务分布",
                      },
                    ],
                    other: []
                  }
                })
              ]
            }
          })
        },
        // 厚街演示显示，正式打包屏蔽
        // {
        //   title: "病区设备统计",
        //   icon: <ZZHSDA />,
        //   hide: appStore.HOSPITAL_ID !== "hj",
        //   path: "/statistic/病区设备统计",
        // },

      ]
    }
  }),
  ...appStore.hisMatch({
    map: {
      gzhd:[
        {
          title: "执行单统计",
          icon: <HZCXTJ />,
          path: "/statistic/wardExecute",
        },
      ],
      '925,zjhj': [
        {
          title: '病人流转统计',
          icon: <HZCXTJ />,
          path: '/statistic/patientFlow',
        },
        {
          title: '设备使用统计',
          icon: <HZCXTJ />,
          path: '/statistic/equipment',
        }
      ],
      other: []
    },
  }),

  ...appStore.hisMatch({
    map: {
      nys: [
        {
          title: "护理质量统计",
          icon: <HZCXTJ />,
          path: "/statistic/护理质量统计",
        },
        { title: '现有专业技术资格', path: '/statistic/现有专业技术资格', icon: <HZCXTJ /> },
        { title: '现有专业技术资格级别', path: '/statistic/现有专业技术资格级别', icon: <HZCXTJ /> },
        { title: '现任专业技术职务', path: '/statistic/现任专业技术职务', icon: <HZCXTJ /> },
        { title: '现任专业技术职务级别', path: '/statistic/现任专业技术职务级别', icon: <HZCXTJ /> },
      ],
      other: []
    }
  })
];
export default function BedSituation() {
  useEffect(() => {
  });
  return (
    <Con>
      <LeftMenu config={LEFT_MENU_CONFIG} menuTitle="统计查询" />
    </Con>
  );
}

const Con = styled.div`
  /* height: 100%; */
  height: calc(100vh - 94px);
  position: relative;
  background: #f8f8f8;
  box-shadow: 3px 7px 7px 0px rgba(0, 0, 0, 0.1);
  border-top: 0;
`;
