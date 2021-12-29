import styled from "styled-components";
import React, { useState, useEffect } from "react";
import {
  Button,
  Radio,
  Icon,
  Input,
  InputNumber,
  Row,
  Col,
  Checkbox,
} from "antd";
import {
  qualityControlRecordEditModel as qcModel,
  Emp,
  BedNurse,
} from "./../model/QualityControlRecordEditModel";
import MultipleImageUploader from "src/components/ImageUploader/MultipleImageUploader";
const { TextArea } = Input;
// import Zimage from 'src/components/Zimage'
import { observer } from "mobx-react-lite";
import { numToChinese } from "src/utils/number/numToChinese";
import { appStore } from "src/stores";

export interface Props {
  itemGroup: any;
  baseInfo: any;
  index: number;
}

export default observer(function QcItemGroup(props: Props) {
  const { itemGroup, baseInfo, index } = props;
  const { itemListErrObj } = qcModel;
  // let deductMarksType = baseInfo.useSubItemFixedScore
  //   ? "自定义扣分"
  //   : "问题总扣分";

  // const handleAttachUrlsChange = (urls: any, ids: any, idx: number) => {
  //   let newItemGroup = { ...itemGroup };
  //   let newItem = newItemGroup.itemList[idx];
  //   newItem.attachUrls = urls.join(",");
  //   newItem.attachIds = ids.join(",");
  //   qcModel.upadteItemGroup(newItemGroup, index);
  // };

  // const handleItemValueChange = (val: any, idx: number) => {
  //   let newItemGroup = { ...itemGroup };
  //   let newItem = newItemGroup.itemList[idx];
  //   newItem.qcItemValue = val;
  //   qcModel.upadteItemGroup(newItemGroup, index);
  // };

  // const handleItemRemarkChange = (val: any, idx: number) => {
  //   let newItemGroup = { ...itemGroup };
  //   let newItem = newItemGroup.itemList[idx];
  //   newItem.remark = val;
  //   qcModel.upadteItemGroup(newItemGroup, index);
  // };

  const handleItemChange = (newItem: any, idx: number) => {
    let newItemGroup = { ...itemGroup };
    newItemGroup.itemList[idx] = newItem;

    qcModel.upadteItemGroup(newItemGroup, index);
  };

  // const setAllQcItemValue = (val: string) => {
  //   let newItemGroup = { ...itemGroup }
  //   for (let i = 0; i < newItemGroup.itemList.length; i++) {
  //     let item = newItemGroup.itemList[i]
  //     item.qcItemValue = val

  //     if (qcModel.baseInfo.useScore) {
  //       if (val === '否' && !item.subItemList) {
  //         if (item.remarkDeductScore === null || item.remarkDeductScore === '') {
  //           item.remarkDeductScore = item.fixedScore.toString()
  //         }
  //       } else if (val === '是') {
  //         item.remarkDeductScore = ''
  //         if (item.subItemList)
  //           item.subItemList = item.subItemList.map((subItem: any) => ({ ...subItem, checked: false }))
  //       }
  //     }

  //     qcModel.setItemListErrObj(newItemGroup.itemList[i].qcItemCode, false)
  //   }
  //   qcModel.upadteItemGroup(newItemGroup, index)
  // }

  const handleRemarkChange = (val: string) => {
    let newItemGroup = { ...itemGroup };
    newItemGroup.remark = val;
    qcModel.upadteItemGroup(newItemGroup, index);
  };

  const itemConClass = (qcItemCode: string) => {
    let classList = ["itemCon"];

    if (Object.keys(itemListErrObj).indexOf(qcItemCode) >= 0) {
      if (itemListErrObj[qcItemCode].err) classList.push("error");
    }

    return classList.join(" ");
  };

  const formatQcItemDesc = (qcItemDesc?: string) => {
    if (!qcItemDesc) return <span />;

    if (qcItemDesc.match(/\n/))
      return (
        <pre
          style={{
            whiteSpace: "pre-wrap",
            wordBreak: "break-all",
            color: "#999",
          }}
        >
          （{`${qcItemDesc}`}）
        </pre>
      );

    return <span style={{ color: "#999" }}>{`（${qcItemDesc}）`}</span>;
  };
  const formatFLagIndex = (code: string) => {
    let arr = code.split("-");
    if (!(arr && arr.length == 2)) return code;
    if (arr && Number(arr[0]) === 1) return "";
    return Number(arr[0]) - 1 + "-" + arr[1];
  };

  return (
    <QuestionItem>
      <div className="titleCon" id={`itemGroupItem${index}`}>
        <div className="titleLeftCon">
          {`${index > 0 ? numToChinese(index) + "、" : ""}${
            itemGroup.qcItemTypeName
          }`}
        </div>
      </div>
      {itemGroup.itemList.map((item: any, itemIndex: number) => (
        <div
          className={itemConClass(item.qcItemCode)}
          key={itemIndex}
          id={`itemGroupItem${index}-${itemIndex}`}
        >
          <div className="itemTitleCon">
            <span style={{ marginRight: 5 }}>
              {formatFLagIndex(item.itemShowCode)}
            </span>
            {item.qcNameFill || item.qcItemName}
            {item.fixedScore ? (
              <span style={{ color: "#999" }}>（{item.fixedScore}分）</span>
            ) : (
              ""
            )}
            <div>{formatQcItemDesc(item.qcItemDeductDesc)}</div>
          </div>
          {item.fillDataList && (
            <Row gutter={10}>
              {item.fillDataList.map((fillItem: any, fillItemIdx: number) => (
                <Col
                  span={8}
                  key={`fillItem-${index}-${itemIndex}-${fillItemIdx}`}
                  style={{ display: "flex", margin: "2.5px 0" }}
                >
                  <div style={{ lineHeight: "20px", color: "#666" }}>
                    自定义内容{fillItemIdx + 1}：
                  </div>
                  <Input
                    size="small"
                    style={{ flex: 1, fontSize: "12px" }}
                    value={fillItem.itemValue}
                    onChange={(e) => {
                      let newFillDataList = [...item.fillDataList];
                      newFillDataList[fillItemIdx].itemValue = e.target.value;

                      handleItemChange(
                        { ...item, fillDataList: newFillDataList },
                        itemIndex
                      );
                    }}
                  />
                </Col>
              ))}
            </Row>
          )}
          {(item.subItemList || []).length > 0 && (
            <div className="itemMidCon">
              {qcModel.baseInfo.useScore && (
                <div className="sub-item-list">
                  {(item.subItemList || []).map(
                    (subItem: any, subItemIdx: number) => (
                      <div
                        key={subItem.subItemCode}
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          let newSubItemList = [...item.subItemList];
                          let currentChecked =
                            newSubItemList[subItemIdx].checked;
                          if (!currentChecked) {
                            let index = newSubItemList.findIndex(
                              (v) => v.checked
                            );
                            index > -1 &&
                              (newSubItemList[index].checked = false);
                          }
                          newSubItemList[subItemIdx].checked = !currentChecked;

                          qcModel.setItemListErrObj(item.qcItemCode, false);

                          handleItemChange(
                            {
                              ...item,
                              qcItemValue: currentChecked
                                ? ""
                                : !currentChecked &&
                                  subItem.fixedScore &&
                                  subItem.fixedScore > 0
                                ? "否"
                                : "是",
                              subItemList: newSubItemList,
                            },
                            itemIndex
                          );
                        }}
                      >
                        <Icon
                          type="check-square"
                          className={subItem.checked ? "checked" : "unchecked"}
                        />
                        <span style={{ verticalAlign: "middle" }}>
                          {subItem.subItemName}
                          {baseInfo.useSubItemFixedScore && (
                            <span>({subItem.fixedScore})</span>
                          )}
                        </span>
                      </div>
                    )
                  )}
                  {/* {
              (item.subItemList || []).length > 0 && 
              <div>
                <span
                  style={{
                    marginRight: '5px',
                    marginLeft: '26px',
                    verticalAlign: 'middle',
                    color: 'rgba(0, 0, 0, 0.65)',
                  }}>
                  {deductMarksType}
                </span>
                <InputNumber
                  style={{
                    display: 'inline-block',
                    verticalAlign: 'middle'
                  }}
                  size="small"
                  max={item.fixedScore || undefined}
                  min={0}
                  value={!isNaN(item.remarkDeductScore) ? Number(item.remarkDeductScore) : 0}
                  onChange={(val) => {
                    qcModel.setItemListErrObj(item.qcItemCode, false)
                    handleItemChange({
                      ...item,
                      qcItemValue: val ? '否' : '是',
                      remarkDeductScore: val?.toString() || '',
                    }, itemIndex)
                  }} />
                {baseInfo.useSubItemFixedScore && <span
                  style={{
                    marginRight: '5px',
                    marginLeft: '26px',
                    verticalAlign: 'middle',
                    color: 'rgba(0, 0, 0, 0.65)',
                  }}>
                  问题总扣分
                </span>}
                {baseInfo.useSubItemFixedScore && <InputNumber
                  style={{
                    display: 'inline-block',
                    verticalAlign: 'middle'
                  }}
                  size="small"
                  readOnly={true}
                  value={
                    (item.subItemList || []).reduce((pre:any,itemScore:any)=>{
                      if(itemScore.checked){
                        return Number(pre + itemScore.fixedScore)
                      }else{
                        return Number(pre)
                      }
                    },Number(item.remarkDeductScore))
                  }
                />}
              </div>
            } */}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
      {/* {appStore.hisMatch({
      map: {
        nys: '',
        other: <div className='notesCon'>
          <div className='notesLeftCon'>备注</div>
          <div className='notesRightCon'>
            <TextArea
              rows={4}
              value={itemGroup.remark}
              autosize
              onChange={(e) => handleRemarkChange(e.target.value)} />
          </div>
        </div>
      }
    })} */}
    </QuestionItem>
  );
});

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
    .fl-right {
      float: right;
    }
  }
  .itemCon {
    box-sizing: border-box;
    min-height: 60px;
    padding: 4px 0;
    border-bottom: 0.5px dashed #bbbbbb;
    &.error {
      color: red;
      .ant-radio-wrapper {
        span {
          color: red;
        }
      }
    }
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
            color: ${(p) => p.theme.$mtc};
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

  .img-upload {
    .inner {
      width: 50px;
      height: 50px;
    }
    .tip {
      top: 85%;
      font-size: 12px;
    }
  }

  .sub-item-list {
    background: rgba(0, 0, 0, 0.05);
    padding: 5px 20px;
    margin: 5px 0;
    & > div {
      margin: 2.5px 0;
    }
  }

  i.anticon-check-square {
    color: #999;
    font-size: 16px;
    vertical-align: middle;
    margin-right: 10px;
    &.checked {
      color: red;
    }
    &.unchecked {
      position: relative;
      &::after {
        content: "";
        width: 10px;
        height: 10px;
        background-color: #eee;
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
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
