import styled from "styled-components";
// import React from 'react'
import { Checkbox, Radio, Icon, Input, Row, Col, Spin } from "antd";
import React, { useState, useEffect } from "react";
import Zimage from "src/components/Zimage";
import { CheckboxChangeEvent } from "src/vendors/antd";
import { cloneJson } from "src/utils/json/clone";
import { numToChinese } from "src/utils/number/numToChinese";
import { useRef } from "src/types/react";
const { TextArea } = Input;
import printing from "printing";
import { appStore } from "src/stores";
export interface Props {
  detailData: any;
}
export default function qualityControlRecordDetailMidLeft(props: Props) {
  const pageRef: any = useRef<HTMLElement>();
  let [messageBoxData, setMessageBoxData]: any = useState({});
  let [itemConData, setItemConData]: any = useState([]);
  let [itemCount, setItemCount]: any = useState({});
  let [userList, setUserList]: any = useState([]);
  let [bedNurseList, setBedNurseList]: any = useState([]);
  let [onlyReadError, setOnlyReadError]: any = useState(false);
  let [causeList, setCauseList]: any = useState([]);
  let hushi = appStore.HOSPITAL_ID == 'wh' ? '执行护士' : '管床护士'
  let zhuyuanhao = appStore.HOSPITAL_ID == 'wh' ? '诊疗号' : '住院号'

  //
  const { detailData } = props;

  const qcCode = detailData?.master?.qcCode || ''
  let qcMatchCode = appStore.HOSPITAL_ID as string
  if (appStore.HOSPITAL_ID == 'wh' && qcCode == 'QCTP209') qcMatchCode = 'QCTP209'

  const onPrint = (isPrint: boolean) => {
    let printFun = isPrint ? printing : printing.preview;
    let title = document.title;
    document.title = detailData.master.qcName;
    printFun(pageRef.current, {
      injectGlobalCss: true,
      scanStyles: false,
      css: `
         .ant-btn {
           display: none;
         }
         .print-page {
           box-shadow: none;
           -webkit-print-color-adjust: exact;
           margin: 0 auto;
           border: 0;
         }
         .page-title {
           min-height: 20px;
           padding: 0px 30px 20px;
           display: block !important;
           font-size: 30px;
           text-align: center;
         }
         .page-title .title {
           text-align: center;
           margin-right: 0;
         }
         table, img {
           page-break-inside: avoid;
         }
         pre {
          page-break-after: avoid;
         }
         * {
           color: #000 !important;
         }
         .footer-title {
           min-height: 0;
           margin-bottom: 0;
         }
         table { page-break-inside:auto }
         tr{ page-break-inside:avoid; page-break-after:auto }
      `
    });
    setTimeout(() => {
      document.title = title;
    }, 500);
  };
  (window as any).onPrint = onPrint;
  useEffect(() => {
    if (detailData.master) {
      setMessageBoxData(detailData.master);
    }
    if (detailData.itemGroupList) {
      setItemConData(
        detailData.itemGroupList.map((item: any, index: number) => {
          return { ...item, index: numToChinese(index + 1) };
        })
      );
    }
    if (detailData.itemCount) {
      setItemCount(detailData.itemCount);
    }
    if (detailData.userList) {
      setUserList(detailData.userList);
    }
    if (detailData.bedNurseList) {
      setBedNurseList(detailData.bedNurseList);
    }
    if (detailData.causeList) {
      setCauseList(detailData.causeList);
    }
    //接口没有数据？？？？
    // const apiData: any = []
    // setItemConData(apiData)
  }, [props]);

  const titleBoxChange = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      setItemConData(
        cloneJson(itemConData).filter((item: any) => {
          let fl = item.itemList.filter((o: any) => {
            return o.qcItemValue == "否";
          });
          if (fl.length == 0) {
            return false;
          } else {
            item.itemList = fl;
            return true;
          }
        })
      );
      setOnlyReadError(true);
    } else {
      setItemConData(
        detailData.itemGroupList.map((item: any, index: number) => {
          return { ...item, index: numToChinese(index + 1) };
        })
      );
      setOnlyReadError(false);
    }
  };

  const itemRadioChange = (e: any) => { };
  // 附件
  const itemAttachmentCheck = () => { };

  return (
    <Con ref={pageRef} className="print-page">
      {/* <Spin spinning={false}> */}
      <div className="page-title" style={{ display: "none" }}>
        {detailData.master && detailData.master.qcName}
      </div>
      <MessageBox>
        <div className="boxLeft">
          <div>质控日期：{messageBoxData.evalDate}</div>
          <div>质控病区：{messageBoxData.wardName}</div>
          {appStore.hisMatch({
            map: {
              nys: <span></span>,
              QCTP209: <span></span>,
              other: <div>
                床号：{messageBoxData.bedLabel && messageBoxData.bedLabel + "床"}
              </div>
            },
            currentHospitalId: qcMatchCode
          })}
          <div>需要跟踪评价：{messageBoxData.followEvaluate ? "是" : "否"}</div>
          <div>
            质控结果：是({itemCount.yesSize}) 否({itemCount.noSize}) 不适用(
            {itemCount.inapplicableSize})
          </div>
          {messageBoxData.hasArchiveItem && (
            <div>是否归档：{messageBoxData.archive ? "是" : "否"}</div>
          )}
        </div>

        <div className="boxRight">
          <div>
            质控人：
            {userList.map((item: any, index: number, arr: any) => (
            <span key={index}>
              {item.empName}
              {index != arr.length - 1 ? "、" : ""}
            </span>
          ))}
          </div>
          {appStore.hisMatch({
            map: {
              nys: <span></span>,
              QCTP209: <span></span>,
              other: <React.Fragment>
                <div>
                  {hushi}：
                  {bedNurseList
                    .map((item: any, index: number, arr: any) => (
                      <span key={index}>
                        {item.empName}
                        {item.nurseHierarchy ? `(${item.nurseHierarchy})` : ""}
                        {index != arr.length - 1 ? "、" : ""}
                      </span>
                    ))}
                </div>
                <div>{zhuyuanhao}：{messageBoxData.inpNo}</div>
              </React.Fragment>
            },
            currentHospitalId: qcMatchCode
          })}
          <div>跟踪日期：{messageBoxData.followEvaluateDate}</div>
          <div>
            通过率：
            {messageBoxData.evalRate &&
              messageBoxData.evalRate.toFixed(2) + "%"}
          </div>
        </div>
      </MessageBox>
      <OnlyReadError>
        <Checkbox onChange={titleBoxChange}>只看错题</Checkbox>
      </OnlyReadError>
      <QuestionCon>
        {detailData.fillItemList && (
          <div style={{ margin: "15px 0 0", fontSize: 14, fontWeight: "bold" }}>
            {detailData.fillItemList.map((item: any) => {
              return item.itemContent.replace("%s", item.itemValue) + "  ";
            })}
          </div>
        )}
        {itemConData.map((itemGroup: any, itemGroupIndex: number) => (
          <QuestionItem key={itemGroupIndex}>
            <div className="titleCon">
              <div className="titleLeftCon">
                {itemGroup.index}、{itemGroup.qcItemTypeName}
              </div>
            </div>
            {itemGroup.itemList.map((item: any, itemIndex: number) => (
              <div className="itemCon" key={itemIndex}>
                <div className="itemTitleCon">
                  {item.itemShowCode} {item.qcItemName}
                </div>
                <div className="itemMidCon">
                  <Radio.Group
                    value={item.qcItemValue}
                    disabled
                    buttonStyle="solid"
                  >
                    <Radio
                      value={"是"}
                      style={{ marginLeft: "20px", marginRight: "30px" }}
                    >
                      是
                    </Radio>
                    <Radio
                      value={"否"}
                      style={{ marginLeft: "20px", marginRight: "30px" }}
                    >
                      否
                    </Radio>
                    <Radio
                      value={"不适用"}
                      style={{ marginLeft: "20px", marginRight: "30px" }}
                    >
                      不适用
                    </Radio>
                  </Radio.Group>
                  <div className="itemAttachmentCon">
                    {item.attachUrls && (
                      <Zimage
                        text={
                          <span>
                            <Icon type="paper-clip" />{" "}
                            {item.attachUrls.split(",").length}
                          </span>
                        }
                        list={item.attachUrls.split(",")}
                      />
                    )}
                  </div>
                  {appStore.hisMatch({
                    map: {
                      nys: <div className="notesCon" style={{ borderBottom: 'none' }}>
                        <div className="notesLeftCon">备注</div>
                        <div className="notesRightCon">
                          <TextArea
                            readOnly
                            autosize={{ minRows: 1 }}
                            value={item.remark}
                          />
                        </div>
                      </div>,
                      other: ''
                    },
                  })}
                </div>
              </div>
            ))}
            {appStore.hisMatch({
              map: {
                nys: '',
                other: ((onlyReadError && itemGroup.remark) || !onlyReadError) && (
                  <div className="notesCon">
                    <div className="notesLeftCon">备注</div>
                    <div className="notesRightCon">
                      <TextArea
                        rows={4}
                        readOnly
                        value={itemGroup.remark}
                        autosize
                      />
                    </div>
                  </div>
                )
              }
            })}
          </QuestionItem>
        ))}

        {!onlyReadError && (
          <QuestionBottomCon>
            <div className="questionBottomTitle">问题可能原因</div>
            <div className="questionBottomCheckbox">
              {causeList.map((item: any, index: number) => (
                <Checkbox disabled key={index} checked={item.checked}>
                  {item.causeContent}
                </Checkbox>
              ))}
            </div>
          </QuestionBottomCon>
        )}
      </QuestionCon>
      {/* </Spin> */}
    </Con>
  );
}

const Con = styled.div`
  /* height: 100%; */
  margin: 0 auto;
  width: 760px;
  padding: 10px 20px;
  /* display: flex;
  flex-direction: column; */
  color: #000000;
  background: #fff;

  border: 1px solid #ddd;
`;
const MessageBox = styled.div`
  margin-top: 10px;
  min-height: 138px;
  line-height: 24px;
  padding: 10px 20px;
  background-color: #f2f2f2;
  font-size: 12px;
  display: flex;
  .boxLeft {
    flex: 1;
    width: 0;
  }
  .boxRight {
    flex: 1;
    width: 0;
  }
`;
const QuestionCon = styled.div`
  margin-top: 10px;
  /* flex: 1;
  height: 0; */
  font-size: 12px;
  padding-bottom: 20px;
`;
const QuestionItem = styled.div`
  .titleCon {
    margin: 5px 0 0;
    height: 30px;
    line-height: 30px;
    display: flex;
    .titleLeftCon {
      flex: 1;
      width: 0;
      font-size: 14px;
      font-weight: bold;
    }
  }
  .itemCon {
    box-sizing: border-box;
    min-height: 60px;
    padding: 4px 0;
    border-bottom: 0.5px dashed #bbbbbb;
    .itemTitleCon {
      min-height: 28px;
      line-height: 20px;
      padding: 4px 0;
    }
    .itemMidCon {
      margin-top: 5px;
      font-size: 12px;
      .itemAttachmentCon {
        display: inline-block;
        cursor: pointer;
        span {
          color: #333;
          &:hover {
            color: ${p => p.theme.$mtc};
          }
        }
      }
      .ant-radio-disabled + span {
        color: black;
      }
      .ant-radio-inner::after {
        background-color: #00a680;
      }
      span {
        font-size: 12px;
      }
    }
  }
  .notesCon {
    box-sizing: border-box;
    min-height: 116px;
    padding: 10px 0;
    display: flex;
    border-bottom: 0.5px dashed #bbbbbb;
    .notesLeftCon {
      width: 34px;
    }
    .notesRightCon {
      flex: 1;
      width: 0;
      font-size: 12px;
      textarea {
        font-size: 12px;
        resize: none;
        min-height: 90px !important;
      }
      .ant-input-disabled {
        color: black;
      }
    }
  }
`;
const QuestionBottomCon = styled.div`
  box-sizing: border-box;
  padding: 10px 0;
  height: 70px;
  .questionBottomCheckbox {
    margin-top: 10px;
    .ant-checkbox-wrapper {
      margin-right: 15px;
    }
    span {
      padding-right: 0;
      font-size: 12px;
      color: black;
    }
  }
`;

const OnlyReadError = styled.div`
  text-align: right;
  margin-top: 10px;
  margin-bottom: -35px;
  position: relative;
  z-index: 2;
`;
