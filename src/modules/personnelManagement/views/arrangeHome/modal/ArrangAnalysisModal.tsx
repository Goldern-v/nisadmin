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
import { ColumnProps, Popover, Tag } from "src/vendors/antd";
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

  /**
   * 数组对象去重合并
   * @param arr 数组对象
   * @returns
   */
  const removeDuplicate=(arr:any[])=> {
    const newArr: any[] = [];
    const arrKey: any[] = [];
    arr.forEach((item) => {
      let index = arrKey.indexOf(item.name);
      if (index == -1) {
        arrKey.push(item.name);
        newArr.push(item);
      } else {
        newArr[index] = mergeObject(newArr[index], item);
      }
    });
    return newArr;
  }

  /**
   * 合并两个对象内容对象key的值也合并
   * @param obj
   * @param target
   * @returns
   */
  const mergeObject = (obj:any, target:any) =>{
    let cloneObj = {};
    Object.keys(obj).forEach((item) => {
      if (item != "name" && item != "key") {
        cloneObj[item] = obj[item].concat(target[item]);
      } else {
        cloneObj[item] = obj[item];
      }
    });
    return cloneObj;
  }
  useLayoutEffect(() => {
    if (visible) {
      setColumns([
        {
          title: "班次",
          width: 70,
          align: "center",
          dataIndex: "name"
        },
        ...appStore.hisMatch({
          map: {
            fssdy: [
              {
                title: "合计",
                width: 70,
                dataIndex: "name",
                align: "center",
                render(text: string, record: any, index: number) {
                  let total: any = 0;
                  let keys = Object.keys(record);
                  for (let key of keys) {
                    // console.log(key, record[key], "aaa");
                    if (!(key == "name" || key === "key")) {
                      total += record[key].length;
                    }
                  }
                  return total;
                }
              }
            ],
            other: []
          }
        }),
        ...sheetViewModal.dateList.map((date, index) => {
          return {
            title: <Th date={date} />,
            width: 70,
            dataIndex: date,
            align: "center",
            render(text: any, record: any, index: any) {
              const content = (
                <div>
                  {text?.length
                    ? text.map((item: any) => {
                      let userId = item.userId;
                      let [user, list] = sheetViewModal.getUser(userId);
                      return <Tag>{user && user.empName}</Tag>;
                    })
                    : "无"}
                </div>
              );

              return (
                <Popover
                  placement="rightTop"
                  title={"排班人员"}
                  content={content}
                  trigger="hover"
                >
                  <div style={{ cursor: "pointer" }}>{text?.length}</div>
                </Popover>
              );
            }
          };
        }),
        ...appStore.hisMatch({
          map: {
            fssdy: [],
            other: [
              {
                title: "合计",
                width: 70,
                dataIndex: "name",
                align: "center",
                render(text: string, record: any, index: number) {
                  let total: any = 0;
                  let keys = Object.keys(record);
                  for (let key of keys) {
                    if (!(key == "name" || key === "key")) {
                      total += record[key].length;
                    }
                  }
                  return total;
                }
              }
            ]
          }
        }),
      ]);

      let list = [];
      let settingsList = [];
      let allCell = sheetViewModal.getAllCell(false);
      for (let i = 0; i < sheetViewModal.arrangeMenu.length; i++) {
        let obj: any = {
          name: sheetViewModal.arrangeMenu[i].name
        };
        let settingsObj: any = {
          name: sheetViewModal.arrangeMenu[i].name
        }
        for (let d of sheetViewModal.dateList) {
          obj[d] = allCell.filter(
            (item: any) => item.workDate == d && item.rangeName == obj.name
          );
          settingsObj[d] = allCell.filter((item: any) => {
            return item.workDate == d && item.settings && item.settings[0].rangeName == settingsObj.name
            }
         );
        }
        if (['fssdy'].includes(appStore.HOSPITAL_ID)) {
          // 没有被选择的班次不统计
          let flag = false
          let flag1 = false
          Object.keys(obj).forEach((item, index) => {
            if ((item !== 'key' && item !== 'name') && obj[item].length) {
              flag = true
            }
          })
          Object.keys(settingsObj).forEach((item, index) => {
            if ((item !== 'key' && item !== 'name') && settingsObj[item].length) {
              flag1 = true
            }
          })
          flag && list.push(obj);
          flag1 && settingsList.push(settingsObj)
        } else {
          list.push(obj);
          settingsList.push(settingsObj)
        }

      }

      // 追加排班也算进统计
      // let mergeArr = list.concat(settingsList)
      let mergeArr = [...list,...settingsList]
      let newArr = removeDuplicate(mergeArr)
      setDataSource(newArr);
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
