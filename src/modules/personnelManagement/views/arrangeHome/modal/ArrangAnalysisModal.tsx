import styled from "styled-components";
import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  Modal,
  Input,
  Button,
  Radio,
  DatePicker,
  Select,
  Row,
  Col,
  message
} from "antd";
import { ModalComponentProps } from "src/libs/createModal";
import Form from "src/components/Form";
import { to } from "src/libs/fns";
import { Rules } from "src/components/Form/interfaces";
import { ColumnProps } from "src/vendors/antd";
import BaseTable from "src/components/BaseTable";
import { sheetViewModal } from "../viewModal/SheetViewModal";
import { getWeekString2, getWeekString } from "src/utils/date/week";
import moment from "moment";
import { appStore } from "src/stores";
const Option = Select.Option;
export interface Props extends ModalComponentProps {
  /** 表单提交成功后的回调 */
  onOkCallBack?: () => {};
}

/** 设置规则 */
const rules: Rules = {
  publicDate: val => !!val || "请填写发表日期"
};

export default function ArrangAnalysisModal(props: Props) {
  const [title, setTitle] = useState("班次统计");

  let { visible, onCancel } = props;

  const [dataSource, setDataSource]: any = useState([]);
  const [columns, setColumns]: any = useState([]);

  useLayoutEffect(() => {
    if (visible) {
      setColumns([
        {
          title: "班次",
          width: 70,
          dataIndex: "name"
        },
        ...sheetViewModal.dateList.map((date, index) => {
          return {
            title: <Th date={date} />,
            width: 70,
            dataIndex: date,
            align: "center"
          };
        }),
        {
          title: "合计",
          width: 70,
          dataIndex: "name",
          align: "center",
          render(text: string, record: any, index: number) {
            let total: any = 0;
            for (let [key, value] of Object.entries(record)) {
              console.log(key, value, "aaa");
              if (!(key == "name" || key === "key")) {
                total += value;
              }
            }
            return total;
          }
        }
      ]);

      let list = [];
      let allCell = sheetViewModal.getAllCell(false);
      for (let i = 0; i < sheetViewModal.arrangeMenu.length; i++) {
        let obj: any = {
          name: sheetViewModal.arrangeMenu[i].name
        };
        for (let d of sheetViewModal.dateList) {
          obj[d] = allCell.filter(
            (item: any) => item.workDate == d && item.rangeName == obj.name
          ).length;
        }
        list.push(obj);
      }
      setDataSource(list);
    }
  }, [visible]);

  return (
    <Modal
      width={1000}
      title={title}
      visible={visible}
      onCancel={onCancel}
      footer={<Button onClick={onCancel}>关闭</Button>}
      okText="保存"
      centered
      forceRender
    >
      <BaseTable
        dataSource={dataSource}
        columns={columns}
        type={["index"]}
        surplusHeight={appStore.wih - (appStore.wih * 0.8 - 150)}
        wrapperStyle={{ padding: 0 }}
      />
    </Modal>
  );
}

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
