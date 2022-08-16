import update from 'immutability-helper'
import moment from 'moment'
import createModal from 'src/libs/createModal'
import emitter from 'src/libs/ev'
import service from 'src/services/api'
import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { RouteComponentProps } from 'react-router'
import { Divider, message, Popconfirm, Switch, Table, Tag } from 'antd'
import { appStore, authStore, scheduleStore } from 'src/stores'
import { globalModal } from 'src/global/globalModal'
import { Icon } from 'src/vendors/antd'
import { overflow } from 'html2canvas/dist/types/css/property-descriptors/overflow'

import PostScoreCell from '../../../../components/arrangeSheet/postScoreCell'
import AddShiftModal from '../../modal/AddShiftModal'
import AddShiftModal_wh from '../../modal/AddShiftModal_wh'

// import { Link } from 'react-router-dom'

// import { authStore, scheduleStore } from 'src/stores'
// import emitter from 'src/libs/ev'

// const Option = Select.Option
export interface Props extends RouteComponentProps {
}

// let colorMap: any = {
//   red: '红色',
//   green: '绿色',
//   blue: '蓝色',
//   yellow: '黄色',
//   black: '黑色',
//   gray: '灰色'
// }

// let colorMapCN: any = {
//   红色: 'red',
//   绿色: 'green',
//   蓝色: 'blue',
//   黄色: 'yellow',
//   黑色: 'black',
//   灰色: 'gray'
// }
let colorLumpMap: any = {
  red: '红色', //#F23D35
  green: '绿色', //#32B378
  blue: '蓝色', //#007AFF
  yellow: '黄色', //#f7ff02
  gray: '灰色', //#999999
  white: '白色' //#ffffff
}

export default function MainBox() {
  const [tableLoading, setTableLoading] = useState(false);
  const [shiftList, setShiftList] = useState(new Array());

  const [selectAll, setSelectAll] = useState(false);

  /** 禁用的班次 */
  const [disableArrangeList, setDisableArrangeList]: any = useState([]);

  /** 颜色 */
  const [colorMap, setColorMap]: [any, any] = useState({});
  const [colorMapCN, setColorMapCN]: [any, any] = useState({});

  const addShiftModal = createModal(
    appStore.hisMatch({
      map: {
        'wh,lyyz,qhwy,wjgdszd,ytll': AddShiftModal_wh,
        // gxjb: AddShiftModal_wh,
        other: AddShiftModal
      },
      vague: true
    }),
  );


  const dstTime = ():boolean => {
    const nowTime=moment().format('YYYY-MM-D HH:mm:ss')
    const year=moment().year()
    const dstTimeStart=moment(`${year}-05-01`)
    const dstTimeEnd=moment(`${year}-09-30`)
    return moment(nowTime).isBetween(dstTimeStart,dstTimeEnd)
    
  }
  const handleSwitchClick = (checked: boolean) => {
    const newArr = shiftList.map((item: any) => {
      item.status = checked
      return item
    })
    setShiftList(newArr)
    setSelectAll(checked)
  }

  const columns = appStore.HOSPITAL_ID !== "lcey" ? 
  [
    {
      title: "序号",
      dataIndex: "index",
      key: "index",
      width: 50,
      render: (text: string, record: any, index: any) => index + 1
    },
    {
      title: () => {
        return (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span>列入排班</span>
          </div>
        )
      },
      dataIndex: "status",
      key: "是否排班",
      width: 100,
      render: (text: any, record: any, index: any) =>
        record.id ? (
          <span>
            <Switch
              size="small"
              onChange={(check: any) => {
                record.status = check;
                // console.log(record, userList, 'chekc')
                setShiftList([...shiftList]);
              }}
              checked={text}
            />
          </span>
        ) : (
          ""
        )
    },
    {
      title: "班次名称",
      dataIndex: "name",
      key: "name",
      width: 150,
    },
    {
      title: "类别",
      dataIndex: "shiftType",
      key: "shiftType",
      width: 100,
    },
    {
      title: "颜色标记",
      dataIndex: "nameColor",
      key: "nameColor",
      width: 100,
      render: (text: string, record: any) =>
        text && text.length > 0 ? (
          <span>
            {['whyx', 'fssdy'].includes(appStore.HOSPITAL_ID) ?
              <Tag color={record.backgroundColor} key={text}>
                <span style={{ color: record.nameColor }}>{colorMapCN[text]}</span>
              </Tag> :
              <Tag color={record.nameColor} key={text}>
                {colorMapCN[text]}
              </Tag>}

          </span>
        ) : (
          ""
        )
    },
    {
      title: "上班时间",
      dataIndex: "workTime",
      key: "workTime",
      width: 200
    },
    {
      title: "工时(小时）",
      dataIndex: "effectiveTime",
      key: "effectiveTime",
      width: 90
    },
    {
      title: "白小时数",
      dataIndex: "settingMorningHour",
      key: "settingMorningHour",
      width: 90
    },
    {
      title: "夜小时数",
      dataIndex: "settingNightHour",
      key: "settingNightHour",
      width: 90
    },
    ...appStore.hisMatch({
      map: {
        whyx: [
          {
            title: "班次岗位系数",
            width: 70,
            align: "center",
            dataIndex: "coefficient",
            key: "coefficient",
            render(text: string, record: any) {
              return record.id ? <DoCon>
                {text ? text : "-"}
              </DoCon> : ""
            }
          },
          {
            title: "列入患护比",
            dataIndex: "npProportion",
            key: "npProportion",
            width: 70,
            align: "center",
            render(text: string, record: any) {
              return record.id ? <DoCon>
                {record.npProportion == '1' ? "是" : "否"}
              </DoCon> : ""
            }
          },
        ],

        other: []
      },
    }),
    ...appStore.hisMatch({
      map: {
        nys: [
          {
            title: "周班次数",
            dataIndex: "rangeLimit",
            key: "rangeLimit",
            width: 70
          }
        ],
        other: []
      }
    }),
  ]:[
    {
      title: "序号",
      dataIndex: "index",
      key: "index",
      width: '5%',
      render: (text: string, record: any, index: any) => index + 1
    },
    {
      title: () => {
        return (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span>列入排班</span>
          </div>
        )
      },
      dataIndex: "status",
      key: "是否排班",
      width: '10%',
      render: (text: any, record: any, index: any) =>
        record.id ? (
          <span>
            <Switch
              size="small"
              onChange={(check: any) => {
                record.status = check;
                // console.log(record, userList, 'chekc')
                setShiftList([...shiftList]);
              }}
              checked={text}
            />
          </span>
        ) : (
          ""
        )
    },
    {
      title: "班次名称",
      dataIndex: "name",
      key: "name",
      width: '10%'
    },
    {
      title: "类别",
      dataIndex: "shiftType",
      key: "shiftType",
      width: '7%'
    },
    {
      title: "颜色标记",
      dataIndex: "nameColor",
      key: "nameColor",
      width: '10%',
      render: (text: string, record: any) =>
        text && text.length > 0 ? (
          <span>
            {
              <Tag color={record.nameColor} key={text}>
                {colorMapCN[text]}
              </Tag>}

          </span>
        ) : (
          ""
        )
    },
    {
      title: "夏上班时间",
      dataIndex: "workTime",
      key: "workTime",
      width: '20%'
    },
    {
      title: "夏工时(小时）",
      dataIndex:"effectiveTime",
      key: "effectiveTime",
      width: '13%'
    },
    {
      title: "夏白小时数",
      dataIndex: "settingMorningHour",
      key: "settingMorningHour",
      width: '10%'
    },
    {
      title: "夏夜小时数",
      dataIndex: "settingNightHour",
      key: "settingNightHour",
      width: '10%'
    },
    {
      title: "冬上班时间",
      dataIndex: 'winWorkTime',
      key: 'winWorkTime',
      width: '20%'
    },
    {
      title: "冬工时(小时）",
      dataIndex: "winterEffectiveTime",
      key: "winterEffectiveTime",
      width:'13%'
    },
    {
      title: "冬白小时数",
      dataIndex: "settingWinMorningHour",
      key: "settingWinMorningHour",
      width: '10%'
    },
    {
      title: "冬夜小时数",
      dataIndex: "settingWinNightHour",
      key: "settingWinNightHour",
      width:'10%'
    },
  ];
  // new:南医三护士长可以编辑排班设置
  let promise =
    (appStore.HOSPITAL_ID == "wh" || appStore.HOSPITAL_ID == "gxjb" || ["lyyz","qhwy", "ytll"].includes(appStore.HOSPITAL_ID))
      ? authStore.isRoleManage
      : (authStore.user && authStore.user.post) == "护理部" ||
      (authStore.user && authStore.user.empName) == "管理员" ||
      authStore.isRoleManage;

  if (promise) {
    if (appStore.HOSPITAL_ID == 'whyx' && authStore.isSuperAdmin) {
      columns.push({
        title: "操作",
        dataIndex: "title",
        width: 100,
        key: "title",
        render: (text: string, record: any) => {
          if (disableArrangeList.includes(record.name)) {
            return "";
          } else {
            return (
              <DoCon>
                <span
                  onClick={(e: any) => {
                    addShiftModal.show({
                      editData: record,
                      // 添加字段type：区分医院和登陆者身份
                      type: appStore.HOSPITAL_ID == "nys" ? "nys" : null,
                      identity:
                        authStore.isRoleManage &&
                        (authStore.user && authStore.user.empName) !== "管理员",
                      onOkCallBack: () => {
                        getShiftList();
                      }
                    });
                  }}
                >
                  编辑
                </span>
                <span
                  onClick={() => {
                    globalModal
                      .confirm("确认删除", "确认删除该套餐？")
                      .then(res => {
                        service.scheduleShiftApiService
                          .delete(record.id)
                          .then(res => {
                            emitter.emit("更新班次列表");
                          });
                        message.success(`删除${record.name}成功`);
                      });
                  }}
                >
                  删除
                </span>
              </DoCon>
            );
          }
          <DoCon>
            <span
              onClick={(e: any) => {
                addShiftModal.show({
                  editData: record,
                  onOkCallBack: () => {
                    getShiftList();
                  }
                });
                // emitter.emit('弹窗编辑排班', record)
              }}
            >
              编辑
            </span>
            <span
              onClick={() => {
                globalModal.confirm("确认删除", "确认删除该套餐？").then(res => {
                  service.scheduleShiftApiService.delete(record.id).then(res => {
                    emitter.emit("更新班次列表");
                  });
                  message.success(`删除${record.name}成功`);
                });
              }}
            >
              删除
            </span>
          </DoCon>;
        }
      });
    } else if (appStore.HOSPITAL_ID != 'whyx') {
      columns.push({
        title: "操作",
        dataIndex: "title",
        width: '10%',
        key: "title",
        render: (text: string, record: any) => {
          if (disableArrangeList.includes(record.name)) {
            return "";
          } else {
            return (
              <DoCon>
                <span
                  onClick={(e: any) => {
                    addShiftModal.show({
                      editData: record,
                      clickType:"editForm",
                      // 添加字段type：区分医院和登陆者身份
                      type: appStore.HOSPITAL_ID == "nys" ? "nys" : null,
                      identity:
                        authStore.isRoleManage &&
                        (authStore.user && authStore.user.empName) !== "管理员",
                      onOkCallBack: () => {
                        getShiftList();
                      }
                    });
                  }}
                >
                  编辑
                </span>
                <span
                  onClick={() => {
                    globalModal
                      .confirm("确认删除", "确认删除该套餐？")
                      .then(res => {
                        service.scheduleShiftApiService
                          .delete(record.id)
                          .then(res => {
                            emitter.emit("更新班次列表");
                          });
                        message.success(`删除${record.name}成功`);
                      });
                  }}
                >
                  删除
                </span>
              </DoCon>
            );
          }
          <DoCon>
            <span
              onClick={(e: any) => {
                addShiftModal.show({
                  editData: record,
                  onOkCallBack: () => {
                    getShiftList();
                  }
                });
                // emitter.emit('弹窗编辑排班', record)
              }}
            >
              编辑
            </span>
            <span
              onClick={() => {
                globalModal.confirm("确认删除", "确认删除该套餐？").then(res => {
                  service.scheduleShiftApiService.delete(record.id).then(res => {
                    emitter.emit("更新班次列表");
                  });
                  message.success(`删除${record.name}成功`);
                });
              }}
            >
              删除
            </span>
          </DoCon>;
        }
      });
    }
  }
  // new: 武汉市一增加是否为责护
  let isWh = ['wh', 'lyyz', 'qhwy', "ytll"].includes(appStore.HOSPITAL_ID)
  if (isWh) {
    columns.splice(4, 0, {
      title: "是否为责护",
      dataIndex: "isZh",
      key: "isZh",
      width: 100,
      render: (text: string, record: any) => {
        const enumsType = {
          "1": "是",
          "0": "否"
        }
        return <div>
          {Object.keys(enumsType).includes(text + '') ? enumsType[text] : ""}
        </div>
      }
    });
  }
  let data = {
    key: "",
    id: "",
    createTime: "",
    deptCode: "",
    effectiveTime: "",
    // endTime: '',
    name: "",
    nameColor: "",
    shiftType: "",
    workTime: "",
    // startTime: '',
    status: ""
  };

  let allUser = new Array();

  let tableData = new Array();
  let selectedRowsArray = new Array();

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    getShiftList();

    service.commonApiService.dictInfo("sch_range_no_change").then(res => {
      setDisableArrangeList(res.data.map((item: any) => item.name));
    });

    service.commonApiService.dictInfo("sch_range_color").then(res => {
      let colorMap: any = {};
      let colorMapCN: any = {};
      res.data.map((item: any) => {
        colorMap[item.name] = item.code;
        colorMapCN[item.code] = item.name;
      });
      setColorMap(colorMap);
      setColorMapCN(colorMapCN);
    });
    //
  }, []); // <= 执行初始化操作，需要注意的是，如果你只是想在渲染的时候初始化一次数据，那么第二个参数必须传空数组。

  emitter.removeAllListeners("获取选中班次列表");
  emitter.removeAllListeners("更新班次列表");

  emitter.addListener("获取选中班次列表", (callback: any) => {
    if (callback) {
      callback(shiftList);
    }
  });

  emitter.addListener("更新班次列表", (data?:any) => {
    getShiftList(data||'');
  });
  const getShiftList = (data?:any) => {
    let deptCode = scheduleStore.getDeptCode(); // '2508' ||
    setTableLoading(true);
    let obj = {
      deptCode,
      ...data
    }
    service.scheduleShiftApiService.getShiftListByCode(obj).then(res => {
      setTableLoading(false);

      let oneUser = new Object();
      allUser = new Array();
      selectedRowsArray = new Array();
      // columns

      if (res && res.data) {
        tableData = res.data;
        let rowKeys = new Array();
        tableData.map((oneObj: any, index: number) => {
          if (oneObj.status === true) {
            rowKeys.push(oneObj.id);
          } else {
            oneObj.status = false;
          }
          oneUser = new Object();
          for (const key in data) {
            if (data.hasOwnProperty(key) && oneObj.hasOwnProperty(key)) {
              (oneUser as any)[key] = oneObj[key];
            }
            if (key === "id") {
              (oneUser as any).key = oneObj[key];
            }
          }
          (allUser as any).push(oneUser);
          selectedRowsArray.push(oneUser);
        });
        setShiftList(tableData);
      }
    });
  };

  const moveRow = (dragIndex: number, hoverIndex: number) => {
    const dragRow = shiftList[dragIndex];
    if (!dragRow) return;
    setShiftList(
      update(shiftList, {
        $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]]
      })
    );
  };
  return (
    <Wrapper>
      <div>
      <BaseTable
        bordered
        size="small"
        columns={columns}
        dataSource={shiftList}
        pagination={false}
        surplusHeight={272}
        fixedFooter={true}
        moveRow={moveRow}
        type={["diagRow", "spaceRow"]}
        loading={tableLoading}
        footer={() => (
          <span>
            <Icon
              type="info-circle"
              style={{ color: "#fa8c16", marginRight: "5px" }}
            />
            可以通过拖拽排序,修改数据后需保存
          </span>
        )}
      />
      </div>

      <addShiftModal.Component />

    </Wrapper>
  );
}
const Wrapper = styled.div`
  /* background:green; */
  /* height: 100%; */
  /* padding: 0 20px 20px 20px; */
  table,
  tr,
  td,
  th,
  th div {
    text-align: center !important;
    padding: 3px !important;
    

  }
  table {
    width:1300px;
  }
  /* 表格前端打勾样式 */
  .ant-table-thead > tr > th.ant-table-selection-column,
  .ant-table-tbody > tr > td.ant-table-selection-column,
  .ant-table-thead > tr:first-child > th:first-child {
    width: 60px !important;
    max-width: 60px !important;
  }
`;
