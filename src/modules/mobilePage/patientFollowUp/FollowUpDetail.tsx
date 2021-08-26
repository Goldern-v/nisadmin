import Wrapper from "./style/fllowUpDetailStyle";
import React, { useState, useEffect } from "react";
import { foolowUp } from "./api/FoolowUp";
// 弹窗组件
import ModalComponent from "./components/ModalComponent";
// 输入框组件
import InputCom from "./components/InputCom";
import { Button as ButtonMb, List, Toast, DatePicker } from "antd-mobile";
import moment from "moment";
import zhCN from "antd-mobile/lib/date-picker/locale/zh_CN";

export interface Props {
  location: {
    search: "";
    state: { formCode: any; masterId: any; patientId: any };
  };
}

export default function FollowUpDetail(props: Props) {
  // 基本信息
  const [params, setParams] = useState({});
  const [writedParams, setWritedParams] = useState({});
  const [docParams, setDocParams] = useState({});
  const [finished, setFinished] = useState(false);
  const [master, setMaster] = useState({} as any);

  const isShow = (item: any) => {
    if (item.jsInteractive) {
      let key = item.jsInteractive.split("_")[0];
      let value = item.jsInteractive.split("_")[1];
      return params[key] == value || params[key].includes(value);
    } else {
      return true;
    }
  };
  const getParams = (arr: any) => {
    arr.map((item: any) => {
      if (
        item.name &&
        item.type != "checkbox" &&
        item.type != "checkbox_text"
      ) {
        params[item.name] = "";
      } else if (item.type == "checkbox" || item.type == "checkbox_text") {
        params[item.name] = [];
      }
      //  else if (item.type == "date(yyyy-mm-dd)") {
      // }
      setParams({ ...params });
      if (item.documentItemLists && item.documentItemLists.length != 0) {
        getParams(item.documentItemLists);
      }
    });
  };
  const onSure = () => {
    let subParams: any = {};
    Object.keys(params).map((key: any) => {
      if (typeof params[key] == "string") {
        subParams[key] = params[key];
      } else {
        subParams[key] = params[key].join(",");
      }
    });

    foolowUp
      .saveOrUpdateByPatient({
        master: { ...master, status: 2 },
        itemDataMap: subParams,
      })
      .then((res) => {
        console.log(res);
        Object.keys(res.data.itemDataMap).forEach((key: any) => {
          if (res.data.itemDataMap[key].includes(",")) {
            console.log(res.data.itemDataMap[key]);
            res.data.itemDataMap[key] = res.data.itemDataMap[key].split(",");
          }
        });
        setParams({ ...params, ...res.data.itemDataMap });
        setMaster(res.data.master);
        Toast.success("提交成功", 1);
      });
  };
  const onSumbit = (e: any) => {
    // console.log(params);
    let result = true;
    // console.log(result);
    if (result) {
      ModalComponent.prototype.showModal(e, "modal1");
    } else {
      ModalComponent.prototype.showModal(e, "modal2");
    }
  };
  useEffect(() => {
    let localState = sessionStorage.getItem("state");
    if (typeof localState == "string") {
      localState = JSON.parse(localState);
    }
    let { formCode, masterId, patientId } = props.location.state || localState;
    foolowUp.getReportMaster({ masterId }).then((res) => {
      setMaster(res.data.master);
      document.title = res.data.master.formName;
      setWritedParams(res.data.itemDataMap);
      foolowUp
        .getFollowUpContont({
          formCode,
          patientId,
          // visitId: 1,
        })
        .then((result) => {
          let realParams: any = {};
          getParams(result.data.documentItemDtos);
          Object.keys(res.data.itemDataMap).forEach((key: any) => {
            if (res.data.itemDataMap[key].includes(",")) {
              console.log(res.data.itemDataMap[key]);
              res.data.itemDataMap[key] = res.data.itemDataMap[key].split(",");
            }
          });
          setParams({ ...params, ...res.data.itemDataMap });
          result.data.documentItemDtos.forEach((item: any) => {
            realParams[item.module] = realParams[item.module] || {};
            let nameArr = item.documentName.split("-");
            nameArr.splice(0, 1);
            item.documentName = nameArr.join("-");
            item.name = item.documentItemLists[0].name;
            item.type = item.documentItemLists[0].type;
            item.documentItemLists.forEach((e: any, i: any) => {
              // let { saveValue, type, value, jsInteractive } = e;
              // item.documentItemLists[i] = {
              //   saveValue,
              //   type,
              //   value,
              //   jsInteractive,
              // };
              let relationKey = e.jsInteractive;
              if (relationKey) {
                item.documentItemLists[i].jsInteractive =
                  "V" + relationKey.split("V")[1];
              }
            });
            let { documentName, module, type, name, documentItemLists } = item;
            let firstObj = {
              // documentName,
              // module,
              type,
              name,
              ...item,
              // documentItemLists,
            };
            realParams[item.module][firstObj.name] = firstObj;
          });
          setDocParams(realParams);
        });
    });
  }, []);
  return (
    <Wrapper>
      <div className="content" style={{ display: finished ? "none" : "block" }}>
        <div className="patientinfo">
          <div className="info_header">
            <span className="patient_name">{master.patientName}</span>
            <span>
              {master.sex ? "女" : "男"}/{master.age}
            </span>
          </div>
          <div className="info_footer">
            <span className="patient_tel">{master.contactsPhone}</span>
            <span>{master.contactsName}</span>
          </div>
        </div>
        {Object.keys(docParams).map((value: any, key: any) => {
          return (
            <div key={key}>
              <div className="sub-title">
                <div className="title_h">{value}</div>
                {/* <div className="title_c" /> */}
              </div>
              {Object.keys(docParams[value]).map((v: any, k: any) => {
                return (
                  <div
                    className="card"
                    style={{
                      display: isShow(docParams[value][v].documentItemLists[0])
                        ? "block"
                        : "none",
                    }}
                  >
                    <div className="documentDescription">
                      {docParams[value][v].documentName.includes("-")
                        ? docParams[value][v].documentName.split("-")[1]
                        : docParams[value][v].documentName}
                    </div>
                    {docParams[value][v].documentItemLists.map(
                      (item: any, index: any) => {
                        // 输入框
                        if (item.type == "text") {
                          return (
                            <InputCom
                              key={item.id}
                              params={params}
                              status={master.status}
                              setParams={setParams}
                              keyWord={item.name}
                              value={params[item.name]}
                              company={item.suffixDescription}
                              label={
                                item.prefixDescription ||
                                docParams[value][v].documentDescription.split(
                                  "-"
                                )[1]
                              }
                            />
                          );
                          // 单选框
                        } else if (item.type == "radio") {
                          return (
                            <label>
                              <div className="radio-box">
                                <input
                                  disabled={master.status == 2}
                                  type="radio"
                                  name={item.name}
                                  value={item.saveValue}
                                  checked={params[item.name] == item.saveValue}
                                  onClick={(e: any) => {
                                    params[item.name] = e.currentTarget.value;
                                    setParams({ ...params });
                                  }}
                                />
                                {item.value}
                              </div>
                            </label>
                          );
                          // 单选框-输入框
                        } else if (item.type == "radio_text") {
                          return (
                            <label>
                              <div className="radio-box">
                                <input
                                  type="radio"
                                  name={item.name}
                                  disabled={master.status == 2}
                                  checked={params[item.name] == item.saveValue}
                                  value={item.saveValue}
                                  onClick={(e: any) => {
                                    params[item.name] = e.currentTarget.value;
                                    setParams({ ...params });
                                  }}
                                />
                                {item.value}
                                <input
                                  className="r-text"
                                  type="text"
                                  disabled={master.status == 2}
                                  placeholder="请输入"
                                  value={params[item.documentItemLists[0].name]}
                                  onChange={(e: any) => {
                                    params[item.documentItemLists[0].name] =
                                      e.currentTarget.value;
                                    setParams({ ...params });
                                  }}
                                />
                              </div>
                            </label>
                          );
                          // 多选框
                        } else if (item.type == "checkbox") {
                          return (
                            <label>
                              <div className="radio-box">
                                <input
                                  type="checkbox"
                                  disabled={master.status == 2}
                                  name={item.name}
                                  value={item.saveValue}
                                  checked={params[item.name].includes(
                                    item.saveValue
                                  )}
                                  onClick={(e: any) => {
                                    console.log(params[item.name]);
                                    console.log(params);
                                    console.log(item.name);

                                    let i = params[item.name].indexOf(
                                      e.currentTarget.value
                                    );
                                    if (i != -1) {
                                      params[item.name].splice(i, 1);
                                    } else {
                                      params[item.name].push(
                                        e.currentTarget.value
                                      );
                                    }
                                    setParams({ ...params });
                                  }}
                                />
                                {item.value}
                              </div>
                            </label>
                          );
                          // 多选框-输入框
                        } else if (item.type == "checkbox_text") {
                          return (
                            <label>
                              <div className="radio-box">
                                <input
                                  type="checkbox"
                                  name={item.name}
                                  disabled={master.status == 2}
                                  value={item.saveValue}
                                  checked={params[item.name].includes(
                                    item.saveValue
                                  )}
                                  onClick={(e: any) => {
                                    let i = params[item.name].indexOf(
                                      e.currentTarget.value
                                    );
                                    if (i != -1) {
                                      params[item.name].splice(i, 1);
                                    } else {
                                      params[item.name].push(
                                        e.currentTarget.value
                                      );
                                    }
                                    setParams({ ...params });
                                  }}
                                />
                                {item.value}
                                <input
                                  className="r-text"
                                  type="text"
                                  disabled={master.status == 2}
                                  placeholder="请输入"
                                  value={params[item.documentItemLists[0].name]}
                                  onChange={(e: any) => {
                                    params[item.documentItemLists[0].name] =
                                      e.currentTarget.value;
                                    setParams({ ...params });
                                  }}
                                />
                              </div>
                            </label>
                          );
                        } else if (item.type == "date(yyyy-mm-dd)") {
                          return (
                            <DatePicker
                              disabled={master.status == 2}
                              value={
                                params[item.name]
                                  ? moment(params[item.name]).toDate()
                                  : undefined
                              }
                              mode="date"
                              locale={zhCN}
                              onChange={(date) => {
                                setParams({
                                  ...params,
                                  [item.name]: moment(date).format(
                                    "YYYY-MM-DD"
                                  ),
                                });
                              }}
                            >
                              <List.Item arrow="horizontal">
                                {item.prefixDescription}
                              </List.Item>
                            </DatePicker>
                          );
                        }
                      }
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className="footer">
        <ButtonMb
          disabled={master.status == 2}
          type="primary"
          className="sumbit-btn"
          onClick={(e: any) => {
            onSumbit(e);
          }}
        >
          提交
        </ButtonMb>
      </div>
      <ModalComponent onSure={onSure} />
    </Wrapper>
  );
}
