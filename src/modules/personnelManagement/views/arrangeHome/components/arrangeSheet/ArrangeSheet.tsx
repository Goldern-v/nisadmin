import classNames from 'classnames'
import update from 'immutability-helper'
import moment from 'moment'
import createModal from 'src/libs/createModal'
import service from 'src/services/api'
import styled from 'styled-components'
import React, { useLayoutEffect, useState } from 'react'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { Input, message, Modal, Tooltip } from 'src/vendors/antd'
import { getWeekString, getWeekString2 } from 'src/utils/date/week'
import { observer } from 'mobx-react-lite'
import { appStore } from 'src/stores'
import { cloneJson } from 'src/utils/json/clone'

import AddAccumulativeLeaveModal from '../../modal/AddAccumulativeLeaveModal'
import AddRemakeModal from '../../modal/AddRemakeModal'
import EditEffectiveTimeModal from '../../modal/EditEffectiveTimeModal'
import EditVacationCountModal_wh from '../../modal/EditEffectiveTimeModal_wh'
import EditVacationCountModal from '../../modal/EditVacationCountModal'
import BalanceHour from './BalanceHour'
import Cell from './Cell'
import HolidayHour from './HolidayHour'
import NightHourCell from './NightHourCell'
import PostScoreCell from './postScoreCell'
import PublicHour from './PublicHour'
import TotalCell from './TotalCell'
import TotalHoliday from './TotalHoliday'
import PeriodHour from './PeriodHour'
import { createContextMenu } from './ContextMenu'
import { sheetViewModal } from '../../viewModal/SheetViewModal'

// import CellLeft from './CellLeft'  // 产品提的新需求  等待产品整理好再做
import WeekBalanceHour from "./WeekBalanceHour"; //本周结余时数
export interface Props {
  /** 编辑模式 */
  isEdit: boolean;
  surplusHeight: number;
  isEditable: boolean;
}

export default observer(function ArrangeSheet(props: Props) {
  let { isEdit, surplusHeight, isEditable } = props;
  const [surplusWidth, setSurplusWidth]: any = useState(false);
  let contextMenu = createContextMenu();
  /** 修改工时 or 加减班 */

  let editEffectiveTimeModal = createModal(
    appStore.hisMatch({
      map: {
        'wjgdszd,wh,gxjb,lcey,dghl,fqfybjy,jmfy,nys,gzsrm,fssdy,fsxt,925,sdlj,whyx,gdtj,lyyz,qhwy,whsl,ytll,zhzxy,whhk,nfsd,whhk,dglb': EditVacationCountModal_wh,
        other: EditEffectiveTimeModal,
      },
      vague: true
    })
  );
  const addAccumulativeLeaveModal = createModal(AddAccumulativeLeaveModal);
  const addRemakeModal = createModal(AddRemakeModal);
  let editVacationCountModal = createModal(EditVacationCountModal);

  const nysGroupName =
    appStore.HOSPITAL_ID == "nys"
      ? [
        {
          title: "类别标题",
          dataIndex: "groupName",
          width: 70,
          fixed: "left",
          align: "center",
        },
      ]
      : [];

  const nysHandleDel =
    appStore.HOSPITAL_ID == "nys" && isEdit
      ? [
        {
          title: "操作",
          dataIndex: "",
          width: 70,
          align: "center",
          render(text: any, record: any, index: number) {
            return (
              <DoCon>
                <span onClick={() => handleDelete(record)}>删除</span>
              </DoCon>
            );
          },
        },
      ]
      : [];

  /**
   * 工时小计显示
   */
  //
  const manHourTitle = (): string => {
    let title = "工时小计";
    switch (appStore.HOSPITAL_ID) {
      case "dghl":
        title = "本周上班时数";
        break;
      default:
        title = "工时小计";
        break;
    }
    return title;
  };

  let columns: any = [
    {
      title: "序号",
      render: (text: string, row: any, index: number) => index + 1,
      fixed: "left",
      width: 40,
      align: "center",
    },
    ...nysGroupName,
    ...appStore.hisMatch({
      map: {
        'whyx,whhk': [
          {
            title: "组别",
            dataIndex: "groupNameAndNum",
            width: appStore.HOSPITAL_ID==='whyx'?120:70,
            fixed: "left",
            align: "center",
            // render(text: any, record: any) {
            //   return (
            //     <div style={{ color: record.groupColor }}>
            //       {record.groupName}
            //     </div>
            //   );
            // },
          },
        ],
        default: [],
      },
      vague:true
    }),
    ...appStore.hisMatch({map:{
        'wjgdszd':[],
        other:[{
          title: "工号",
          dataIndex: "empNo",
          width: 50,
          fixed: "left",
          align: "center",
        }],
      }}),
    //  分组名称 分组颜色
    ...appStore.hisMatch({
      map: {
        "dghl,fqfybjy": [
          {
            title: "分组名称",
            dataIndex: "groupName",
            width: 70,
            fixed: "left",
            align: "center",
            render(text: any, record: any) {
              return (
                <div style={{ color: record.groupColor }}>
                  {record.groupName}
                </div>
              );
            },
          },
        ],
        default: [],
      },
      vague: true,
    }),
    {
      title: "姓名",
      dataIndex: "empName",
      width:['whyx','whhk'].includes(appStore.HOSPITAL_ID)?120: 50,
      fixed: "left",
      align: "center",
      render(text: any, record: any) {
        if (['whyx','whhk'].includes(appStore.HOSPITAL_ID)) {
          return <div style={{ background: !!record.resignationFlag ? '#fff58a' : '' }}>
            <span style={{ color: record.empNo == '实习' ? "#ff3030" : record.empNo == '进修' ? "#007aff" : "" }}>{record.empName}</span>
            {record.extraUser && <React.Fragment>
              /<span style={{ color: record.extraUser.userType == 1 ? "#ff3030" : record.extraUser.userType == 2 ? "#007aff" : "" }}>{record.extraUser.empName}</span>
            </React.Fragment>
            }
          </div >
        }
        return <span>{record.empName}</span>
      },
    },
    ...appStore.hisMatch({
      map: {
        nys: [],
        other: [
          {
            title: "层级",
            dataIndex: "nurseHierarchy",
            width: 40,
            fixed: "left",
            align: "center",
          },
        ],
      },
    }),
    ...appStore.hisMatch({
      map: {
        'whyx,whhk': [
          {
            title: "职务",
            dataIndex: "job",
            width:appStore.HOSPITAL_ID==='whyx' ? 120 : 70,
            fixed: "left",
            align: "center",
          },
        ],
        other: [
          {
            title: "职称",
            dataIndex: "newTitle",
            width: 70,
            fixed: "left",
            align: "center",
          },
          {
            title: "年限",
            dataIndex: "year",
            width: 70,
            fixed: "left",
            align: "center",
          },
        ]
      },
      vague:true
    }),
    // ...appStore.hisMatch({
    //   map: {
    //     dgxg: [
    //       {
    //         title: "分管床位",
    //         dataIndex: "chargeBed",
    //         width: 100,
    //         fixed: "left",
    //         align: "center",
    //         render: (text: string, record: any) => {
    //           return isEditable ? (
    //             <Input
    //               style={{ background: "#fff" }}
    //               defaultValue={text}
    //               onChange={(e: any) => {
    //                 record.chargeBed = e.target.value;
    //               }}
    //             />
    //           ) : (
    //             <span>{text}</span>
    //           );
    //         },
    //       },
    //     ],
    //     other: [],
    //   },
    // }),
    ...appStore.hisMatch({
      map: {
        fssdy: [
          {
            title: "岗位级别",
            dataIndex: "postLevel",
            width: 100,
            fixed: "left",
            align: "center",
            render: (text: string, record: any) => {
              return isEditable ? (
                <Input
                  style={{ background: "#fff" }}
                  defaultValue={text}
                  onChange={(e: any) => {
                    record.postLevel = e.target.value;
                  }}
                />
              ) : (
                <span>{text}</span>
              );
            },
          },
          {
            title: "管床",
            dataIndex: "chargeBed",
            width: 100,
            fixed: "left",
            align: "center",
            render: (text: string, record: any) => {
              return isEditable ? (
                <Input
                  style={{ background: "#fff" }}
                  defaultValue={text}
                  onChange={(e: any) => {
                    record.chargeBed = e.target.value;
                  }}
                />
              ) : (
                <span>{text}</span>
              );
            },
          },
        ],
        other: []
      }
    }),
    ...sheetViewModal.dateList.map((date, index) => {
      return {
        title: <Th date={date} />,
        width: 70,
        render(text: any, record: any) {
          return (
            <Cell
              contextMenu={contextMenu}
              editEffectiveTimeModal={editEffectiveTimeModal}
              addAccumulativeLeaveModal={addAccumulativeLeaveModal}
              addRemakeModal={addRemakeModal}
              editVacationCountModal={editVacationCountModal}
              dataSource={record}
              index={index}
              isEdit={isEdit}
            />
          );
        },
      };
    }),
    ...appStore.hisMatch({
      map: {
        "whyx,qhwy,whhk,dglb": [
          {
            title: "备注",
            dataIndex: "empRemark",
            width: 100,
            align: "center",
            render: (text: string, record: any) => {
              return isEditable ? (
                <Input
                  style={{ background: "#fff" }}
                  defaultValue={text}
                  onChange={(e: any) => {
                    record.empRemark = e.target.value;
                  }}
                />
              ) : (
                <Tooltip placement="top" title={text}>
                  <span>{text}</span>
                </Tooltip>
              );
            },
          },
        ],
        other: [],
      },
      vague:true
    }),
    ...appStore.hisMatch({
      map: {
        'sdlj': [],//
        other: [
          {
            title: (
                <div>
                  <div>{manHourTitle()}</div>
                  <div>（小时）</div>
                </div>
            ),
            width: 70,
            align: "center",
            render(text: string, record: any) {
              return <TotalCell id={record.id} />;
            },
          },
        ],
      },
      vague:true,
    }),
    ...appStore.hisMatch({
      map: {
        "nfzxy": [
          {
            title: "备注",
            dataIndex: "empRemark",
            width: 100,
            align: "center",
            render: (text: string, record: any) => {
              return isEditable ? (
                <Input
                  style={{ background: "#fff" }}
                  defaultValue={text}
                  onChange={(e: any) => {
                    record.empRemark = e.target.value;
                  }}
                />
              ) : (
                <Tooltip placement="top" title={text}>
                  <span>{text}</span>
                </Tooltip>
              );
            },
          },
        ],
        other: [],
      },
      vague:true
    }),
  ];

  /** 东莞横沥特殊字段 */
  if (["dghl", "fsxt",'925', 'fssdy'].includes(appStore.HOSPITAL_ID)) {
    columns.push({
      title: (
        <div>
          <div>本周结余时数</div>
          <div>（小时）</div>
        </div>
      ),
      width: 70,
      align: "center",
      render(text: string, record: any) {
        return <WeekBalanceHour id={record.id} />;
      },
    });
  }

  /** 厚街特殊字段 */
  if (appStore.HOSPITAL_ID == "hj") {
    columns.push({
      title: (
        <div>
          <div>夜小时数</div>
          <div>（小时）</div>
        </div>
      ),
      width: 70,
      align: "center",
      render(text: string, record: any) {
        return <NightHourCell id={record.id} />;
      },
    });
  }

  /** 南医三特殊字段 */
  if (appStore.HOSPITAL_ID == "nys") {
    columns.push(
      {
        title: (
          <div>
            <div>本周</div>
            <div>积假</div>
          </div>
        ),
        width: 70,
        align: "center",
        dataIndex: "thisWeekHoliday",
        render: (text: string, record: any) => {
          // return <HolidayHourNys id={record.id}/>;
          return (
            <Input
              style={{ background: "#fff" }}
              disabled={!isEdit}
              defaultValue={text}
              onChange={(e: any) => {
                record.thisWeekHoliday = e.target.value;
              }}
            />
          );
        },
      },
      {
        title: (
          <div>
            <div>累积</div>
            <div>积假</div>
          </div>
        ),
        width: 70,
        align: "center",
        dataIndex: "totalHoliday",
        render: (text: string, record: any) => {
          // return <TotalHolidayHourNys id={record.id}/>;
          return (
            <Input
              style={{ background: "#fff", color: "#000" }}
              disabled={!isEdit}
              defaultValue={text}
              onChange={(e: any) => {
                record.totalHoliday = e.target.value;
              }}
            />
          );
        },
      },
      ...nysHandleDel
    );
  }

  /**南医三删除排班人员 */
  const handleDelete = (record: any) => {
    Modal.confirm({
      title: "删除确认",
      content: "确定要删除此排班人员吗？",
      okText: "确认",
      cancelText: "取消",
      centered: true,
      maskClosable: true,
      onOk: () => {
        service.scheduleUserApiService.delete(record.id).then((res) => {
          message.success("删除成功");
          sheetViewModal.init();
        });
      },
    });
  };

  /** 武汉特殊字段*/
  if (["wh", "gzsrm", "gxjb", "fsxt", '925', "whyx",'whhk','sdlj', 'fssdy',"gdtj", "lyyz", "qhwy","whsl","wjgdszd", 'ytll','zhzxy', 'nfsd', 'dglb'].includes(appStore.HOSPITAL_ID)) {
    columns.push(
        ...appStore.hisMatch({
          map: {
            //,sdlj
            'sdlj': [],//佛山杏坛去除累计结余添加本周结余
            other: [
              {
                title: (
                    <div>
                      <div>夜小时数</div>
                      <div>（小时）</div>
                    </div>
                ),
                width: 70,
                align: "center",
                render(text: string, record: any) {
                  return <NightHourCell id={record.id} />;
                },
              },
            ],
          },
          vague:true,
        }),

      // {
      //   title: (
      //     <div>
      //       <div>累计结余</div>
      //       <div>（小时）</div>
      //     </div>
      //   ),
      //   width: 70,
      //   align: "center",
      //   render(text: string, record: any) {
      //     return <BalanceHour id={record.id} />;
      //   },
      // },
      ...appStore.hisMatch({
        map: {
          //,sdlj
          'fsxt,925,sdlj': [],//佛山杏坛去除累计结余添加本周结余
          other: [
            {
              title: (
                <div>
                  <div>累计结余</div>
                  <div>（小时）</div>
                </div>
              ),
              width: 70,
              align: "center",
              render(text: string, record: any) {
                return <BalanceHour id={record.id} />;
              },
            },
          ],
        },
        vague:true,
      }),
        ...appStore.hisMatch({
          map: {
            'whyx,whhk': [
            ],
            other: [
              {
                title: (
                    <div>
                      <div>{['sdlj', 'nfsd'].includes(appStore.HOSPITAL_ID)?'工休结余':'公休结余'}</div>
                      <div>（天）</div>
                    </div>
                ),
                width: 70,
                align: "center",
                render(text: string, record: any) {
                  return <PublicHour id={record.id} />;
                },
              },
            ]
          },
          vague:true
        }),
      ...appStore.hisMatch({
        map: {
          'sdlj,nfsd': [
            {
              title: (
                <div>
                  <div>例假结余</div>
                  <div>（天）</div>
                </div>
              ),
              width: 70,
              align: "center",
              render(text: string, record: any) {
                return <PeriodHour id={record.id} />;
              },
            }
          ],
          other: [
            {
              title: (
                <div>
                  <div>节休结余</div>
                  <div>（天）</div>
                </div>
              ),
              width: 70,
              align: "center",
              render(text: string, record: any) {
                return <HolidayHour id={record.id} />;
              },
            }
          ]
        },
        vague:true
      }),

    );
  }

  /** 江门妇幼特殊字段*/
  if (["jmfy"].includes(appStore.HOSPITAL_ID)) {
    columns.push(
      {
        title: (
          <div>
            <div>夜小时数</div>
            <div>（小时）</div>
          </div>
        ),
        width: 70,
        align: "center",
        render(text: string, record: any) {
          return <NightHourCell id={record.id} />;
        },
      },
      {
        title: (
          <div>
            <div>当月积假</div>
            <div>（天）</div>
          </div>
        ),
        width: 70,
        align: "center",
        render(text: string, record: any) {
          return <TotalHoliday id={record.id} />;
        },
      },
      {
        title: (
          <div>
            <div>公休结余</div>
            <div>（天）</div>
          </div>
        ),
        width: 70,
        align: "center",
        render(text: string, record: any) {
          return <PublicHour id={record.id} />;
        },
      },
      {
        title: (
          <div>
            <div>节休结余</div>
            <div>（天）</div>
          </div>
        ),
        width: 70,
        align: "center",
        render(text: string, record: any) {
          return <HolidayHour id={record.id} />;
        },
      }
    );
  }

  /** 东莞横沥特殊字段*/
  if (["dghl", "fqfybjy"].includes(appStore.HOSPITAL_ID)) {
    columns.push(
      {
        title: (
          <div>
            <div>累计结余</div>
            <div>（小时）</div>
          </div>
        ),
        width: 70,
        align: "center",
        render(text: string, record: any) {
          return <BalanceHour id={record.id} />;
        },
      },
      {
        title: (
          <div>
            <div>年假天数</div>
            <div>（天）</div>
          </div>
        ),
        width: 70,
        align: "center",
        render(text: string, record: any) {
          return <PublicHour id={record.id} />;
        },
      }
    );
  }

  // 武汉亚心特殊字段
  if (["whyx","whhk"].includes(appStore.HOSPITAL_ID)) {
    columns.push(
      {
        title: (
          <div>
            <div>班次岗位分值汇总</div>
            {/* <div>（小时）</div> */}
          </div>
        ),
        width: 70,
        align: "center",
        render(text: string, record: any) {
          return <PostScoreCell id={record.id} />;
        },
      },
    );
  }

  useLayoutEffect(() => {
    try {
      (document as any)
        .getElementById("baseTable")!
        .querySelector(
          ".ant-table-fixed-left .ant-table-body-inner table.ant-table-fixed"
        )!.style.marginBottom =
        (document as any)
          .getElementById("baseTable")!
          .querySelector(".ant-table-footer")!.offsetHeight + "px";
    } catch (error) {
      console.log("同步备注滚动报错");
    }
    try {
      (document as any)
        .querySelector(".ant-table-body")!
        .addEventListener("scroll", (e: any) => {
          (document as any).querySelector(
            ".remark-con.real"
          )!.style.marginLeft = e.target.scrollLeft + "px";
        });
    } catch (error) { }
    try {
      setTimeout(() => {
        if (
          (document as any).querySelector("#arrangeSheet .ant-table-body") &&
          (document as any).querySelector("#arrangeSheet .ant-table-body")
            .scrollWidth ==
          (document as any).querySelector("#arrangeSheet .ant-table-body")
            .clientWidth
        ) {
          let widthNys =
            appStore.HOSPITAL_ID == "nys"
              ? 210 : 250;
          if (['whyx','whhk'].includes(appStore.HOSPITAL_ID)) {
            widthNys += 170
          }
          if (appStore.HOSPITAL_ID == 'wjgdszd') {
            widthNys = Number(widthNys- 50)
          }
          if (appStore.HOSPITAL_ID == 'fssdy') {
            widthNys += 200
          }
          if (['qhwy','nfzxy', 'whhk', 'dglb'].includes(appStore.HOSPITAL_ID)) {
            widthNys += 100
          }
          /** noscorll */
          (document as any).querySelector(
            "#arrangeSheet #baseTable"
          ).style.width =
            (sheetViewModal.dateList.length +
              appStore.hisMatch({
                map: {
                  hj: 3,
                  fqfybjy: 5,
                  nys: (isEdit ? 6 : 5),
                  'wjgdszd,wh,gxjb,jmfy,dghl,gzsrm,fsxt,925,whyx,whhk,gdtj,lyyz,qhwy,whsl,ytll,zhzxy,whhk,nfsd,dglb': 6,
                  fssdy: 7,
                  sdlj:3,
                  other: 2
                },
                vague: true
              })) *
            70 +
            widthNys +
            10 + (appStore.HOSPITAL_ID==='whyx'? 170 : 0) +
            "px";
          setSurplusWidth(false);
        } else {
          (document as any).querySelector("#arrangeSheet #baseTable") &&
            ((document as any).querySelector(
              "#arrangeSheet #baseTable"
            ).style.width = "auto");
          setSurplusWidth(isEdit ? 300 : 240);
        }
      }, 10);
    } catch (error) { }
    try {
      let remark = sheetViewModal.remark;
      (document as any).querySelector(
        ".remark-con.real textarea"
      ).value = remark;
    } catch (error) { }
  }, [sheetViewModal.sheetTableData, surplusWidth, sheetViewModal.remark]);

  // 拖拽排序
  const moveRow = (dragIndex: number, hoverIndex: number) => {
    switch (appStore.HOSPITAL_ID) {
      case "hj":
      case "wjgdszd":
        const dragRow = sheetViewModal.sheetTableData[dragIndex];
        if (!dragRow) return;
        sheetViewModal.sheetTableData = update(sheetViewModal.sheetTableData, {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]],
        });
        break;
      case "whyx":
      case "qhwy":
      case 'whhk':
      case 'dglb':
        const dragRowWhyx = sheetViewModal.sheetTableData[dragIndex];
        if (!dragRowWhyx) return;
        sheetViewModal.sheetTableData = update(sheetViewModal.sheetTableData, {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragRowWhyx]],
        });
        break;
      default:
        try {
          let pc = (document as any).querySelector(
            ".drop-over-downward,  .drop-over-upward"
          ).offsetParent.offsetParent.className;

          let sheetTableData = cloneJson(sheetViewModal.sheetTableData);
          let rightList = sheetTableData.map((item: any) => {
            return item.settingDtos;
          });
          let leftList = sheetTableData.map((item: any) => {
            delete item.settingDtos;
            return item;
          });

          if (pc == "ant-table-body") {
            /** min */
            rightList = update(rightList, {
              $splice: [[dragIndex, 1], [hoverIndex, 0, rightList[dragIndex]]],
            });
            // 东莞横沥移动单独处理：右边移动 护士信息一起移动
            if (["dghl", "fqfybjy"].includes(appStore.HOSPITAL_ID)) {
              leftList = update(leftList, {
                $splice: [[dragIndex, 1], [hoverIndex, 0, leftList[dragIndex]]],
              });
            }
          } else if (pc == "ant-table-body-outer") {
            /** left */
            leftList = update(leftList, {
              $splice: [[dragIndex, 1], [hoverIndex, 0, leftList[dragIndex]]],
            });
          }

          let list = leftList.map((item: any, index: number) => {
            item.settingDtos = rightList[index].map((r: any) => ({
              ...r,
              userId: item.id,
            }));
            return item;
          });
          sheetViewModal.sheetTableData = list;
          sheetViewModal.allCell = sheetViewModal.getAllCell(true);
        } catch (error) { }
    }
  };

  return (
    <Wrapper className={classNames({ isEdit })} id="arrangeSheet">
      {sheetViewModal.sheetTableData.length > 0 && (
        <BaseTable
          loading={sheetViewModal.tableLoading}
          surplusHeight={surplusHeight}
          surplusWidth={surplusWidth}
          columns={columns}
          // fixedFooter={true}
          dataSource={sheetViewModal.sheetTableData}
          footer={() => {
            return (
              <React.Fragment>
                {
                  appStore.hisMatch({
                    map: {
                      'qhwy,dglb':
                        <div className='remark-con system'>
                          <div className="remark-title">
                            系统标注:
                          </div>
                          <div>
                            <p>1.符号标识："▲" 代表全院应急；"★" 代表科室应急班；"<span style={{color:"red",fontSize:"18px"}}>➁</span>"代表二线；"<span style={{color:"red",fontSize:"18px"}}>➂</span>"代表三线；</p>
                          </div>
                      </div>,
                      'whyx,whhk':
                        <div className="remark-con system">
                          <div className="remark-title">
                            系统标注:
                          </div>
                          <div>
                            <p>
                              1.符号标识：“▲”代表<span className="underline">白班</span>应急；“★”代表<span className="underline">夜班应急</span>，左上角“<span style={{ color: "red" }}>♥</span>”代表<span className="underline">期望</span>排班。
                            </p>
                            <p>
                              2.字体颜色：名字<span style={{ color: "red" }}>红色</span>为<span className="underline">实习生</span>；名字<span style={{ color: "blue" }}>蓝色</span>为<span className="underline">进修生</span>；班次<span style={{ color: "red" }}>红色</span>为<span className="underline">各类休假</span>。
                            </p>
                            <p>
                              3.背景颜色：名字<span style={{ background: "#fff58a" }}>黄色</span>为<span className="underline">未脱教护士</span>；班次<span style={{ background: "#b2a595" }}>棕色</span>为<span className="underline">中夜班</span>。
                            </p>
                          </div>
                        </div>,
                      default:""
                    },
                    vague: true
                  })
                }
                <div className={"remark-con real"}>
                  <div className="remark-title">
                    {appStore.HOSPITAL_ID == "nys" ? "备注：" : "排班备注："}
                  </div>
                  <Input.TextArea
                    readOnly={!isEdit}
                    defaultValue={sheetViewModal.remark}
                    autosize={!isEdit}
                    onBlur={(e) => {
                      sheetViewModal.remark = e.target.value;
                    }}
                    style={{ minHeight: 100, textAlign: "left" }}
                    className={appStore.HOSPITAL_ID == "nys" ? "nysCss" : ""}
                  />
                </div>
                <div className={"remark-con space"}>
                  <div className="remark-title">
                    {appStore.HOSPITAL_ID == "nys" ? "备注：" : "排班备注："}
                  </div>
                  <Input.TextArea
                    value={sheetViewModal.remark}
                    autosize={!isEdit}
                    style={{ minHeight: 100, textAlign: "left" }}
                    className={appStore.HOSPITAL_ID == "nys" ? "nysCss" : ""}
                  />
                </div>
              </React.Fragment>
            );
          }}
          type={isEdit && !sheetViewModal.isPush ? ["diagRow"] : []}
          moveRow={moveRow}
        />
      )}
      {sheetViewModal.sheetTableData.length <= 0 && (
        <BaseTable
          loading={sheetViewModal.tableLoading}
          surplusHeight={surplusHeight}
          surplusWidth={surplusWidth}
          columns={columns}
          // fixedFooter={true}
          dataSource={sheetViewModal.sheetTableData}
          type={isEdit && !sheetViewModal.isPush ? ["diagRow"] : []}
          moveRow={moveRow}
        />
      )}
      <contextMenu.Component />
      <editEffectiveTimeModal.Component />
      <editVacationCountModal.Component />
      <addAccumulativeLeaveModal.Component />
      <addRemakeModal.Component />
    </Wrapper>
  );
});
const Wrapper = styled.div`
  background: #fff;
  .ant-table-tbody > tr:hover:not(.ant-table-expanded-row) > td,
  .ant-table-row-hover {
    background: #fff !important;
    > td {
      background: #fff !important;
    }
  }
  .ant-input {
    border: 0;
    border-radius: 0;
    text-align: center;
    outline: 0;
    box-shadow: none !important;
    padding: 4px;
    height: 27px;
  }
  #baseTable {
    /* margin: 10px;
    border-radius: 5px; */
    .ant-table-body td,
    .ant-table-tbody td {
      padding: 0 2px !important;
      font-size: 12px !important;
      height: 25px !important;
    }
    td {
      word-break: break-all;
    }
    /* tr {
      cursor: auto !important;
    } */
    .ant-table-column-title {
      font-size: 12px !important;
    }
    .ant-table-tbody > tr:hover:not(.ant-table-expanded-row) > td,
    .ant-table-row-hover > td {
      background: none;
    }
  }
  .ant-table-column-title {
    font-size: 13px !important;
    line-height: 1.3;
  }
  .ant-table-fixed-left {
    box-shadow: none;
    z-index: 0 !important;
  }
  /** fix table scroll bug */
  div.ant-table-body {
    background: #fafafa !important;
  }
  tbody.ant-table-tbody {
    background: #fff;
  }
  .ant-table-footer {
    border: 0 !important;
    background: #fafafa !important;
    z-index: 10;
    position: absolute;
    left: 0;
    right: 0;
  }
  .ant-table-body-outer::after {
    background: #fafafa !important;
  }
  &.isEdit {
    .ant-table-fixed-left {
      td {
        background: #f8f8f8 !important;
      }
    }
  }
  .remark-con {
    margin-top: -10px;
    width: 100%;
    textarea {
      resize: none;
    }
    .remark-title {
      margin-bottom: 5px;
      font-size: 12px;
    }
    &.space {
      position: relative;
      z-index: 2;
      opacity: 0;
      pointer-events: none;
      padding: 0 0 10px;
    }
    &.real {
      position: absolute;
      left: 0;
      z-index: 10;
      padding: 10px;
    }
    &.system {
      /* position: relative;
      z-index: 2;
      opacity: 0;
      pointer-events: none; */
      padding-top:10px;
      p {
        padding: 0;
        margin: 0;
        font-size:12px;
      }
      .underline {
        text-decoration:underline;
        font-weight: 600;
      }
    }
  }
  &.isEdit {
    .ant-table-body {
      tr {
        cursor: auto !important;
        /* pointer-events: none; */
      }
    }
  }
  .nysCss {
    text-align: left !important;
    padding: 0 20px;
    box-sizing: border-box;
  }
`;

function Th(props: { date: string }) {
  let date = props.date;
  const Con = styled.div`
    text-align: center;
    padding: 0px 0;
    font-size: 12px;
    line-height: 1.3;
    &.red-text {
      color: red;
    }
  `;
  return (
    <Con
      className={
        getWeekString2(date).indexOf("六") > -1 ||
          getWeekString(date).indexOf("日") > -1
          ? "red-text"
          : undefined
      }
    >
      <div>{moment(date).format("MM-DD")}</div>
      <div>{getWeekString2(date)}</div>
    </Con>
  );
}
