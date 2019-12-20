import styled from "styled-components";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { Modal, Input } from "antd";
import BaseTable, { DoCon } from "src/components/BaseTable";
import emitter from "src/libs/ev";
import { arrangeService } from "../services/ArrangeService";
import { selectViewModal } from "../viewModal/SelectViewModal";
import { ModalComponentProps } from "src/libs/createModal";
import { sheetViewModal } from "../viewModal/SheetViewModal";
import { observer } from "mobx-react-lite";
import { cleanCell } from "../components/arrangeSheet/cellClickEvent";
import { cloneJson } from "src/utils/json/clone";
import { ArrangeItem } from "../types/Sheet";

export interface Props extends ModalComponentProps {
  id: string;
}

export interface Props {}

export default observer(function AsClassModal(props: Props) {
  // const [editingKey, setEditingKey] = useState(false)
  const [loadingTable, setLoadingTable] = useState(false);
  let { visible, onCancel } = props;

  const onFieldChange = () => {};
  const onOk = () => {
    onCancel();
  };

  const columns: any = [
    {
      title: "加减班日期",
      dataIndex: "workDate",
      key: "workDate",
      width: 100,
      align: "center",
      marginLeft: "20px"
    },
    {
      title: "星期",
      dataIndex: "week",
      key: "week",
      width: 60,
      align: "center"
    },
    {
      title: "姓名",
      dataIndex: "empName",
      key: "empName",
      width: 60,
      align: "center"
    },
    {
      title: "工号",
      dataIndex: "empNo",
      key: "empNo",
      width: 60,
      align: "center"
    },

    {
      title: "类别",
      dataIndex: "statusType",
      key: "statusType",
      width: 60,
      align: "center",
      render: (text: any, record: any) => {
        return text == "1" ? "加班" : text == "2" ? "减班" : text;
      }
    },

    {
      title: "时间",
      width: 100,
      align: "center",
      render: (text: any, record: any) => {
        return `${record.startDate} - ${record.endDate}`;
      }
    },
    {
      title: "工时",
      dataIndex: "hour",
      key: "hour",
      width: 100,
      align: "center"
    },
    {
      title: "白班",
      dataIndex: "settingMorningHour",
      key: "settingMorningHour",
      width: 60,
      align: "center"
    },
    {
      title: "夜班",
      dataIndex: "settingNightHour",
      key: "settingNightHour",
      width: 60,
      align: "center"
    },
    {
      title: "操作",
      dataIndex: "操作",
      width: 100,
      align: "center",
      render: (a: any, record: any, c: any) => {
        let cellObj: ArrangeItem | any = sheetViewModal.getCellObjByName(
          record.empName,
          record.workDate
        );

        if (cellObj) {
          if (!cellObj.rangeName) {
            return (
              <DoCon>
                <div style={{ color: "#666" }}>班次为空</div>
              </DoCon>
            );
          }
          if (cellObj.schAddOrSubs && cellObj.schAddOrSubs.length) {
            return (
              <DoCon>
                <span onClick={() => clean(record)}>清除</span>
                <span onClick={() => enter(record)}>覆盖</span>
              </DoCon>
            );
          } else {
            return (
              <DoCon>
                <span onClick={() => enter(record)}>填入</span>
              </DoCon>
            );
          }
        } else {
          return (
            <DoCon>
              <div style={{ color: "#666" }}>时间不匹配</div>
            </DoCon>
          );
        }
      }
    }
  ];

  useEffect(() => {
    if (visible) {
      sheetViewModal.getExpectAsList();
    }
  }, [visible]);

  const handleOk = () => {
    sheetViewModal.expectAsClassList.forEach((record: any) => {
      enter(record);
    });
    onCancel();
  };

  const enter = (record: any) => {
    let cellObj = sheetViewModal.getCellObjByName(
      record.empName,
      record.workDate
    );
    if (cellObj && cellObj.rangeName) {
      cellObj.schAddOrSubs = [
        {
          startDate: record.startDate,
          endDate: record.endDate,
          statusType: record.statusType,
          hour: Number(record.effectiveTime),
          settingNightHour: record.settingNightHour,
          settingMorningHour: record.settingMorningHour
        }
      ];
    }
    sheetViewModal.expectAsClassList = [...sheetViewModal.expectAsClassList];
    setLoadingTable(true);
    setTimeout(() => setLoadingTable(false), 100);
  };
  const clean = (record: any) => {
    let cellObj = sheetViewModal.getCellObjByName(
      record.empName,
      record.workDate
    );
    cellObj && (cellObj.schAddOrSubs = []);
    sheetViewModal.expectAsClassList = [...sheetViewModal.expectAsClassList];
  };
  return (
    <Wrapper>
      <Modal
        className="modal"
        title="期望加减班"
        width="1000px"
        okText="全部填入"
        cancelText="返回"
        onOk={handleOk}
        visible={visible}
        onCancel={onCancel}
        forceRender
        centered
      >
        <BaseTable
          dataSource={sheetViewModal.expectAsClassList}
          columns={columns}
          wrapperStyle={{ padding: 0 }}
        />
      </Modal>
    </Wrapper>
  );
});
const Wrapper = styled.div`
  #baseTable {
    padding: 0px 0px !important;
  }
`;
const TitleCon = styled.div`
  height: 35px;
  font-weight: 900;
  font-size: 16px;
`;
const SpanOne = styled.span`
  display: inline-block;
  width: 75px;
  text-align: justify;
  margin-left: 35px;
`;
