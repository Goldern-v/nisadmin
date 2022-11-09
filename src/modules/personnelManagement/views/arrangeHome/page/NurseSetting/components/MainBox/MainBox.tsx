import update from 'immutability-helper'
import createModal from 'src/libs/createModal'
import emitter from 'src/libs/ev'
import service from 'src/services/api'
import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { RouteComponentProps } from 'react-router'
import { Icon, message, Modal, Switch, Table } from 'antd'
import { appStore, authStore, scheduleStore } from 'src/stores'
import { globalModal } from 'src/global/globalModal'
import { observer } from 'mobx-react-lite'

import AddScheduleNursingModal from '../../modal/AddScheduleNursingModal'
import addTutorModal from '../../modal/AddTutorModal'

export interface Props extends RouteComponentProps { }

export default observer(function MainBox() {
  const [userList, setUserList] = useState(new Array());
  const [loading, setLoading] = useState(false);
  const [userTypeList, setUserTypeList] = useState([] as any[]);

  const addScheduleNursingModal = createModal(AddScheduleNursingModal);
  const AddTutorModal = createModal(addTutorModal);

  const columns = [
    {
      title: "序号",
      dataIndex: "index",
      key: "index",
      width: 35,
      render: (text: string, record: any, index: any) => index + 1,
    },
    {
      title: "列入排班",
      dataIndex: "rangeShow",
      key: "是否排班",
      width: 80,
      render: (text: any, record: any, index: any) =>
        record.id ? (
          <span>
            <Switch
              size="small"
              onChange={(check: any) => {
                record.rangeShow = check;
                setUserList([...userList]);
              }}
              checked={text}
            />
          </span>
        ) : (
          ""
        ),
    },
    {
      title: "所在科室",
      dataIndex: "deptName",
      width: 180,
      key: "deptName",
    },
    {
      title: "工号(类型)",
      dataIndex: "empNo",
      key: "empNo",
      width: 120,
      render: (empNo: string, record: any, index: number) => {
        let usetTypeName = "";
        if (userTypeList.length > 0) {
          let target = userTypeList.find(
            (item: any) => item.code === record.userType
          );
          if (target && target.name) usetTypeName = target.name;
        }
        if (['whyx','whhk'].includes(appStore.HOSPITAL_ID)) {
          return <span style={{ color: record.userType == 1 ? '#ff3030' : record.userType == 2 ? "#007aff" : "" }}>{empNo || usetTypeName}</span>
        }
        return empNo || usetTypeName;
      },
    },
    {
      title: "姓名",
      dataIndex: "empName",
      key: "empName",
      width: 90,
    },
    {
      title: "性别",
      dataIndex: "sex",
      key: "sex",
      width: 65,
      render(text: any) {
        if (text === "0") return "男";
        if (text === "1") return "女";
        return text;
      },
    },

    ...appStore.hisMatch({
      map: {
        other: [
          {
            title: "职称",
            dataIndex: "newTitle",
            width: "10%",
            key: "newTitle",
          },
          {
            title: "层级",
            dataIndex: "nurseHierarchy",
            key: "nurseHierarchy",
            width: "10%",
          },
          {
            title: "职务",
            dataIndex: "job",
            key: "job",
            width: 120,
          },
        ],
        nys: [
          {
            title: "职称",
            dataIndex: "newTitle",
            width: "10%",
            key: "newTitle",
          },
          {
            title: "类型",
            dataIndex: "nurseHierarchy",
            key: "nurseHierarchy",
            width: "10%",
          },
          {
            title: "职务",
            dataIndex: "job",
            key: "job",
            width: 120,
          },
          {
            title: "周工时",
            dataIndex: "timeLimit",
            key: "timeLimit",
            width: 70,
          },
        ],
        'wh,gzsrm,gxjb,lyyz,qhwy,ytll,dglb': [
          {
            title: "开始时间",
            dataIndex: "startDate",
            key: "startDate",
            width: 120,
          },
          {
            title: "周工时",
            dataIndex: "timeLimit",
            key: "timeLimit",
            width: 70,
          },
        ],
      },
      vague: true
    }),
    {
      title: "操作",
      key: "操作",
      width: 120,
      render(text: any, row: any) {
        return (
          <DoCon>
            {['whyx','whhk'].includes(appStore.HOSPITAL_ID) && <>
              <span
                onClick={() => {
                  let usetTypeName = "";
                  if (userTypeList.length > 0) {
                    let target = userTypeList.find(
                      (item: any) => item.code === row.userType
                    );
                    if (target && target.name) usetTypeName = target.name;
                  }
                  globalModal
                    .confirm("设置", <div><p>姓名：{row.empName}</p><p>工号(类型)：{row.empNo || usetTypeName}</p><p>确认{row.resignationFlag == 1 ? '取消' : ''}设为未脱教护士吗？</p></div>)
                    .then(res => {
                      let data = {
                        id: row.id,
                        resignationFlag: row.resignationFlag == 1 ? '0' : '1'
                      }
                      service.scheduleUserApiService.setResignation(data).then(res => {
                        message.success(`设置成功`);
                        getUserList();
                      })
                    });
                }}
              >
                {row.resignationFlag == 1 ? '取消未脱教' : '设为未脱教'}
              </span>
              {/* {['1', '2'].includes(row.userType) && */}
              <span onClick={() => {
                AddTutorModal.show({
                  editData: row,
                  onOkCallBack: () => {
                    message.success(`设置成功`);
                    getUserList();
                  }

                })
              }}>
                导师设置
              </span>
              {/* } */}
            </>
            }
            <span
              onClick={() => {
                Modal.confirm({
                  title: "删除确认",
                  content: "确定要删除此排班人员吗？",
                  okText: "确认",
                  cancelText: "取消",
                  centered: true,
                  maskClosable: true,
                  onOk: () => {
                    if (appStore.HOSPITAL_ID == "nys") {
                      service.scheduleUserApiService
                        .delete(row.id)
                        .then((res) => {
                          message.success("删除成功");
                          getUserList();
                        });
                    } else {
                      if (!row.empNo) {
                        service.scheduleUserApiService
                          .delete(row.id)
                          .then((res) => {
                            message.success("删除成功");
                            getUserList();
                          });
                      } else {
                        message.warning("只有工号为空的护士才能删除");
                      }
                    }
                  },
                });
              }}
            >
              删除
            </span>
          </DoCon>
        );
      },
    },
  ];

  useEffect(() => {
    service.commonApiService.dictInfo("sch_wh_user_type").then((res) => {
      setUserTypeList(res.data);
    });
  }, []);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    getUserList();

    //
  }, [authStore.selectedDeptCode]); // <= 执行初始化操作，需要注意的是，如果你只是想在渲染的时候初始化一次数据，那么第二个参数必须传空数组。

  emitter.removeAllListeners("获取选中人员列表");

  emitter.addListener("获取选中人员列表", (callback: any) => {
    if (callback) {
      callback(userList).then((res: any) => {
        getUserList();
      });
    }
  });

  emitter.removeAllListeners("刷新人员列表");

  emitter.addListener("刷新人员列表", () => {
    getUserList();
  });

  emitter.removeAllListeners("删除排班人员");

  emitter.addListener("删除排班人员", () => {
    getUserList();
  });

  emitter.removeAllListeners("添加排班人员");

  emitter.addListener("添加排班人员", () => {
    addScheduleNursingModal.show({
      getTableData: getUserList,
    });
  });

  emitter.removeAllListeners("全部列入排班");
  emitter.addListener("全部列入排班", () => {
    let list = userList.map((item: any) => {
      return {
        ...item,
        rangeShow: true
      }
    })
    setUserList(list);
  });

  const getUserList = () => {
    let deptCode = scheduleStore.getDeptCode(); // '2508' ||
    setLoading(true);
    service.scheduleUserApiService.getByDeptCode(deptCode).then((res) => {
      setLoading(false);

      let tableData = res.data
        .sort((a: any, b: any) => a.sortValue - b.sortValue)
        .map((item: any, key: number) => ({ ...item, key, sortValue: key }));
      setUserList(tableData);
    });
  };

  /** 拖拽start */

  const moveRow = (dragIndex: number, hoverIndex: number) => {
    const dragRow = userList[dragIndex];
    if (!dragRow) return;
    setUserList(
      update(userList, {
        $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]],
      })
    );
  };

  /** 拖拽end */

  return (
    <Wrapper>
      {/* {JSON.stringify(userList)} */}
      <BaseTable
        bordered
        size="small"
        columns={columns}
        dataSource={userList}
        pagination={false}
        surplusHeight={232}
        loading={loading}
        moveRow={moveRow}
        type={["diagRow", "spaceRow"]}
        fixedFooter={true}
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
      <addScheduleNursingModal.Component />
      <AddTutorModal.Component />
    </Wrapper>
  );
});

const Wrapper = styled.div`
  width: 100%;
  table,
  tr,
  td,
  th,
  th div {
    text-align: center !important;
    padding: 3px !important;
    /* .ant-table-selection-column{
      width: 30px!important;
    } */
  }

  /* 表格前端打勾样式 */
  .ant-table-thead > tr > th.ant-table-selection-column,
  .ant-table-tbody > tr > td.ant-table-selection-column,
  .ant-table-thead > tr:first-child > th:first-child {
    width: 20px !important;
    max-width: 20px !important;
  }

  /* tr > th .ant-table-selection-column {
    width: 30px!important;
  } */

  .ant-input {
    width: none;
    margin: 0;
    padding: 0;
    text-align: center;
  }
  .ant-input:focus {
    outline: none !important;
    border: none !important;
    background: yellow !important;
    color: black !important;
    border-radius: 0px;
  }
`;
