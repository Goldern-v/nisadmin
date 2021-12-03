import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button, DatePicker, Modal, message } from "antd";
import BreadcrumbBox from "src/layouts/components/BreadcrumbBox";
import { Place } from "src/components/common";
import { observer } from "mobx-react-lite";
import { arrangeService } from "../../../services/ArrangeService";
import { sheetViewModal } from "../../../viewModal/SheetViewModal";
import { selectViewModal } from "../../../viewModal/SelectViewModal";
import ExpectSettingModal from "../../../modal/ExpectSettingModal";
import createModal from "src/libs/createModal";
import { appStore, authStore } from "src/stores";
import emitter from "src/libs/ev";

import moment from "moment";
import { Select } from "src/vendors/antd";
import ArrangAnalysisModal from "../../../modal/ArrangAnalysisModal";
import { copyRowClick } from "../../../components/arrangeSheet/cellClickEvent";
import { cloneJson } from "src/utils/json/clone";
import AsClassModal from "../../../modal/AsClassModal";
import AddScheduleNursingModal from "../../NurseSetting/modal/AddScheduleNursingModal";
import CopyScheduling from './modal'

export interface Props {
}

export default observer(function TopPart() {
  const [date, setDate] = useState([] as any[]);
  const [isInit, setIsInit] = useState(true);
  let expectSettingModal = createModal(ExpectSettingModal);
  let asClassModal = createModal(AsClassModal);
  let arrangAnalysisModal = createModal(ArrangAnalysisModal);
  const addScheduleNursingModal = createModal(AddScheduleNursingModal);
  let [visible, setVisible] = useState(false)
  const handleOk = () => {
    setVisible(false);
  };
  const handleCancel = () => {
    setVisible(false);
  };

  //重置排班
  const handleReset = () => {
    Modal.confirm({
      title: "提示",
      content: "确认要重置排班吗？重制后本页数据将会被清空",
      okText: "确定",
      cancelText: "取消",
      centered: true,
      onOk: () => {
        sheetViewModal.cleanAllCell();
      }
    });
  };

  //复制排班
  const handleCopy = () => {
    Modal.confirm({
      title: "提示",
      content: "确认要复制排班吗？复制后本页数据将会被覆盖",
      okText: "确定",
      okType: "danger",
      cancelText: "取消",
      centered: true,
      onOk: () => {
        sheetViewModal.handleCopy();
        // arrangeService.copyPrevSettingRange().then((res) => {
        //   // sheetViewModal.init()
        //   sheetViewModal.sheetTableData == res.data
        //   message.success('复制成功')
        // })
      }
    });
  };
  const gzsrmhandleCopy = () => {
    setVisible(true)
  }


  //撤回排班
  const cancelPush = () => {
    Modal.confirm({
      title: "提示",
      content: "确定需要撤回排班信息吗？",
      okText: "确定",
      okType: "danger",
      cancelText: "取消",
      centered: true,
      onOk: () => {
        sheetViewModal.saveSheetTableData("0");
      }
    });
  };

  //推送排班
  const handlePush = () => {
    Modal.confirm({
      title: "提示",
      content: appStore.HOSPITAL_ID == 'nys' ? "请再次确认审核无误，并发布排班信息吗？" : "确定需要发布排班信息吗？",
      okText: "确定",
      okType: "danger",
      cancelText: "取消",
      centered: true,
      onOk: () => {
        sheetViewModal.saveSheetTableData("1");
      }
    });
  };

  //同步排班
  const findSysnNurse = () => {
    Modal.confirm({
      title: "确定需要同步排班人员信息吗？",
      content: "同步排班人员前请确保已经暂存,未暂存的数据会丢失。",
      okText: "确定",
      okType: "danger",
      cancelText: "取消",
      centered: true,
      onOk: () => {
        sheetViewModal.findSysnNurse().then(res => {
          message.success("操作成功");
        });
      }
    });
  };


  let handleStatusChange = () => {
    setDate([
      moment(appStore.queryObj.startTime),
      moment(appStore.queryObj.endTime)
    ]);
    setIsInit(false);
  };
  // 分组数据
  const handleGroupChange = (value: any) => {
    selectViewModal.setParams("group", value);
  };
  // 班次交换
  const exchange = () => {
    if (sheetViewModal.copyCellList.length == 2) {
      let _cell = cloneJson([sheetViewModal.copyCellList[0]] as any);
      copyRowClick(
        [sheetViewModal.copyCellList[0]],
        [sheetViewModal.copyCellList[1]],
        false
      );
      copyRowClick([sheetViewModal.copyCellList[1]], _cell, false);
    }
  };
  useEffect(() => {
    if (isInit) {
      handleStatusChange();
    }
  });

  return (
    <Wrapper>
      <BreadcrumbBox
        data={[
          {
            name: "排班管理",
            link: "/personnelManagement/arrangeHome"
          },
          {
            name: "编辑排班"
          }
        ]}
        style={{
          padding: "5px 15px 0"
        }}
      />
      <div className="head-contain">
        {/* <div className='title'>编辑排班</div> */}
        {/* <Place /> */}
        <div className="item">
          <div className="label data">日期：</div>
          <div className="content">
            <DatePicker.RangePicker
              allowClear={false}
              value={
                selectViewModal.params.startTime
                  ? [
                    moment(selectViewModal.params.startTime),
                    moment(selectViewModal.params.endTime)
                  ]
                  : undefined
              }
              onChange={(dates: any) => {
                let isOk =
                  dates[1]._d.getTime() - dates[0]._d.getTime() >
                  2678400000 * 12;
                if (isOk) {
                  dates[1]._d = new Date(
                    dates[0]._d.getTime() + 2678400000 * 12
                  );
                  message.warning("日期范围不能超过一年！");
                }
                selectViewModal.params.startTime = dates[0].format(
                  "YYYY-MM-DD"
                );
                selectViewModal.params.endTime = dates[1].format("YYYY-MM-DD");
                sheetViewModal.getSheetTableData();
              }}
              style={{ width: 230 }}
              ranges={{
                本周: [moment().startOf("week"), moment().endOf("week")],
                上周: () => {
                  let date: any = [
                    moment(selectViewModal.params.startTime),
                    moment(selectViewModal.params.endTime)
                  ];
                  /** 判断是否是一周 */
                  let weeks = date[0].week();
                  let _date = date[0].format("YYYY-MM-DD");
                  if (
                    date[0].format("YYYY-MM-DD") ==
                    date[0].startOf("week").format("YYYY-MM-DD") ||
                    date[1].format("YYYY-MM-DD") ==
                    date[0].endOf("week").format("YYYY-MM-DD")
                  ) {
                    return [date[0].subtract(7, "d"), date[1].subtract(7, "d")];
                  }
                  return [
                    moment(_date)
                      .week(moment(_date).week() - 1)
                      .startOf("week"),
                    moment(_date)
                      .week(moment(_date).week() - 1)
                      .endOf("week")
                  ];
                },
                下周: () => {
                  /** 判断是否是一周 */
                  let date: any = [
                    moment(selectViewModal.params.startTime),
                    moment(selectViewModal.params.endTime)
                  ];
                  let weeks = date[0].week();
                  if (
                    date[0].format("YYYY-MM-DD") ==
                    date[0].startOf("week").format("YYYY-MM-DD") ||
                    date[1].format("YYYY-MM-DD") ==
                    date[0].endOf("week").format("YYYY-MM-DD")
                  ) {
                    return [date[0].add(7, "d"), date[1].add(7, "d")];
                  }
                  return [
                    moment()
                      .week(moment().week() + 1)
                      .startOf("week"),
                    moment()
                      .week(moment().week() + 1)
                      .endOf("week")
                  ];
                },
                本月: [moment().startOf("month"), moment().endOf("month")],
                上月: [
                  moment()
                    .month(moment().month() - 1)
                    .startOf("month"),
                  moment()
                    .month(moment().month() - 1)
                    .endOf("month")
                ],
                下月: [
                  moment()
                    .month(moment().month() + 1)
                    .startOf("month"),
                  moment()
                    .month(moment().month() + 1)
                    .endOf("month")
                ]
              }}
            />
          </div>
        </div>
        <div className="item">
          <div className="label">分组：</div>
          <div className="content">
            <Select
              value={selectViewModal.params.group}
              onChange={handleGroupChange}
              showSearch
              style={{ width: 120 }}
            >
              <Select.Option key="全部" value="">
                全部
              </Select.Option>
              {selectViewModal.params.groupList.map((item: any) => (
                <Select.Option value={item.id} key={item.id}>
                  {item.groupName}
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>
        <div className="item">
          <Button type="primary" onClick={() => sheetViewModal.init()}>
            查询
          </Button>
        </div>
        <div className="item">
          <Button onClick={handleReset}>重置排班</Button>
        </div>
        {['wh', 'gzsrm', 'gxjb'].includes(appStore.HOSPITAL_ID) && (
          <div className="item">
            <Button
              onClick={exchange}
              disabled={sheetViewModal.copyCellList.length != 2}
            >
              班次互换
            </Button>
          </div>
        )}

        <div className="item">
          <Button onClick={() => expectSettingModal.show()}>期望排班</Button>
        </div>
        {['wh', 'gzsrm', 'gxjb'].includes(appStore.HOSPITAL_ID) && (
          <div className="item">
            <Button onClick={() => asClassModal.show()}>申请加减班</Button>
          </div>
        )}

        <div className="item">
          <Button onClick={appStore.HOSPITAL_ID === 'gzsrm' ? gzsrmhandleCopy : handleCopy}>{appStore.HOSPITAL_ID == 'nys' ? '复制上周排班' : "复制排班"}</Button>
        </div>
        {['hj', 'dgxg'].includes(appStore.HOSPITAL_ID) && (
          <div className="item">
            <Button onClick={findSysnNurse}>同步排班人员</Button>
          </div>
        )}

        <div className="item">
          <Button
            type="primary"
            onClick={() => sheetViewModal.saveSheetTableData(undefined)}
          >
            暂存
          </Button>
        </div>
        <div className="item">
          <Button onClick={cancelPush} disabled={!sheetViewModal.isPush}>
            撤回
          </Button>
        </div>
        <div className="item">
          <Button
            type="primary"
            onClick={handlePush}
            disabled={sheetViewModal.isPush}
          >
            {appStore.HOSPITAL_ID == 'nys' ? '审核发布' : ' 发布'}
          </Button>
        </div>
        {['wh', 'gzsrm', 'gxjb'].includes(appStore.HOSPITAL_ID) && (
          <div className="item">
            <Button
              className="statistics"
              onClick={() => {
                arrangAnalysisModal.show({});
              }}
            >
              统计
            </Button>
          </div>
        )}
        {appStore.HOSPITAL_ID == "nys" && (
          <div className="item">
            <Button
              className="statistics"
              onClick={() => {
                addScheduleNursingModal.show({
                  init: true
                });
              }}
            >
              添加人员排班
            </Button>
          </div>
        )}

        <div className="item">
          <Button
            className="statistics"
            onClick={() => {
              appStore.history.push(
                "/personnelManagement/arrangeHome?noRefresh=1"
              );
            }}
          >
            返回
          </Button>
        </div>
      </div>
      <expectSettingModal.Component />
      <asClassModal.Component />
      <arrangAnalysisModal.Component />
      <addScheduleNursingModal.Component />
      <CopyScheduling
        visible={visible}
        handleOk={handleOk}
        handleCancel={handleCancel} />
    </Wrapper>
  );
});

const Wrapper = styled.div`
  .head-contain {
    display: flex;
    align-items: flex-end;
    height: 45px;
    padding: 5px 0 10px 20px;
    .title {
      font-size: 20px;
      margin-left: 10px;
    }
    .item {
      display: inline-block;
      margin-right: 10px;
      vertical-align: middle;
      & > div {
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
  button,
  select,
  .ant-calendar-picker,
  .ant-input,
  .ant-select,
  .ant-select-selection--single {
    height: 28px;
  }
  .ant-select-selection__rendered {
    line-height: 27px;
  }
  .ant-input {
    line-height: 1.3;
  }
`;
