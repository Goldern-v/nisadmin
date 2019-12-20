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
      title: "排班日期",
      dataIndex: "startDate",
      key: "startDate",
      width: 100,
      align: "center",
      marginLeft: "20px"
    },
    {
      title: "护士",
      dataIndex: "empName",
      key: "empName",
      width: 100,
      align: "center"
    },
    {
      title: "内容",
      dataIndex: "rangeName",
      key: "rangeName",
      width: 120,
      align: "center"
    },
    {
      title: "期望班次",
      dataIndex: "shiftType",
      key: "shiftType",
      width: 100,
      align: "center"
    },
    {
      title: "原因",
      dataIndex: "detail",
      key: "detail",
      width: 150,
      align: "center"
    },
    {
      title: "操作",
      dataIndex: "操作",
      key: "8",
      width: 100,
      align: "center",
      render: (a: any, record: any, c: any) => {
        let status = 0; /** 0-未填入 1-已经填入 2-休假 */
        let cellObj = sheetViewModal.getCellObjByName(
          record.empName,
          record.startDate
        );

        if (cellObj) {
          if (
            cellObj.rangeName == record.rangeName &&
            cellObj.statusType == "1"
          ) {
            status = 1;
          }
          return (
            <DoCon>
              {status == 0 && <span onClick={() => enter(record)}>填入</span>}
              {status == 1 && <span onClick={() => clean(record)}>撤回</span>}
            </DoCon>
          );
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
    sheetViewModal.expectList.forEach((record: any) => {
      enter(record);
    });
    onCancel();
  };

  const enter = (record: any) => {
    let cellObj = sheetViewModal.getCellObjByName(
      record.empName,
      record.startDate
    );
    if (cellObj) {
      cellObj!.rangeName = record.rangeName;
      cellObj!.settingNightHour = record.settingNightHour;
      cellObj!.settingMorningHour = record.settingMorningHour;
      cellObj!.nameColor = record.nameColor;
      cellObj!.effectiveTime = record.effectiveTime;
      cellObj!.effectiveTimeOld = record.effectiveTime;
      cellObj!.shiftType = record.shiftType;
      cellObj!.statusType = "1";
    }
    setLoadingTable(true);
    setTimeout(() => setLoadingTable(false), 100);
  };
  const clean = (record: any) => {
    let cellObj = sheetViewModal.getCellObjByName(
      record.empName,
      record.startDate
    );
    cellObj && cleanCell(cellObj);
    sheetViewModal.expectList = [...sheetViewModal.expectList];
  };
  return (
    <Wrapper>
      <Modal
        className="modal"
        title="期望加减班"
        width="800px"
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
