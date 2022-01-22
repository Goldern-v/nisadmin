import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { qualityControlRecordEditModel as qcModel } from "./../model/QualityControlRecordEditModel";
import { observer } from "mobx-react-lite";
import { Switch, DatePicker, Progress } from "antd";
import moment from "moment";
import { numToChinese } from "src/utils/number/numToChinese";
import { appStore } from "src/stores";
export interface Props {
  setpChange?: (step: number) => void;
}
export default observer(function PreviewPannel(props: Props) {
  const { setpChange } = props;
  const { master, baseInfo, itemGroupList, yxGradeObj } = qcModel;

  const result = (() => {
    let shi = 0;
    let fou = 0;
    let buShiYong = 0;
    let total = 0;
    let rate = 0;
    let totalScore = 0;
    let deductScore = 0;

    for (let i = 0; i < itemGroupList.length; i++) {
      let itemList = itemGroupList[i].itemList;

      if (itemList)
        for (let j = 0; j < itemList.length; j++) {
          let item = itemList[j];
          switch (item.qcItemValue) {
            case "是":
              shi++;
              break;
            case "否":
              fou++;
              break;
            case "不适用":
              buShiYong++;
              break;
          }

          // 分数类型累计分数
          if (baseInfo.useScore) {
            if (item.fixedScore) totalScore += item.fixedScore;

            if (item.remarkDeductScore) {
              deductScore += Number(item.remarkDeductScore);
            } else if (item.subItemList) {
              item.subItemList
                .filter((subItem: any) => subItem.checked)
                .forEach(
                  (subItem: any) => (deductScore += Number(subItem.fixedScore))
                );
            }
          }
        }
    }

    total = shi + fou;
    // 使用题数计算通过率
    if (total && !baseInfo.useScore)
      rate = parseInt(((shi / total) * 10000).toString()) / 100;
    // 使用分数计算通过率
    else
      rate =
        totalScore == 0 ? 0 : ((totalScore - deductScore) * 100) / totalScore;

    return {
      shi,
      fou,
      buShiYong,
      rate,
      totalScore,
      deductScore,
    };
  })();

  const itemGroupRate = (itemGroup: any) => {
    let itemList = itemGroup.itemList;
    if (!itemList) return 100;

    let total = 0;
    let shi = 0;
    let fou = 0;

    for (let i = 0; i < itemList.length; i++) {
      let item = itemList[i];
      total++;
      if (item.qcItemValue == "是") shi++;

      if (item.qcItemValue == "否") fou++;
    }

    total = shi + fou;

    if (!total) return 100;

    if (!shi) return 0;

    return parseInt(((shi / total) * 10000).toString()) / 100;
  };

  const strokeColor = (itemGroup: any) => {
    if (itemGroupRate(itemGroup) < 100) return "#EBA65B";
    return "#00a680";
  };

  const handleItmeGroupClick = (itemGroup: any, idx: number) => {
    setpChange && setpChange(1);

    setTimeout(() => {
      let target = document.getElementById(`itemGroupItem${idx}`);
      if (target) target.scrollIntoView();
    }, 500);
  };

  return (
    <Wrapper>
      <div className="master-area">
        {/* 贵州省医不需要追踪评价 */}
        {appStore.HOSPITAL_ID !== "gzsrm" && (
          <div className="item">
            <div className="label">是否需要追踪评价:</div>
            <div className="content">
              <Switch
                checked={master.followEvaluate}
                onChange={(val) => {
                  let newMaster = { ...master, followEvaluate: val };
                  if (!val) newMaster.followEvaluateDate = "";
                  qcModel.setMaster(newMaster);
                }}
              />
            </div>
          </div>
        )}
        {appStore.HOSPITAL_ID !== "gzsrm" && (
          <div className="item">
            <div className="label">{master.followEvaluate && "追踪日期:"}</div>
            <div className="content">
              {master.followEvaluate && (
                <DatePicker
                  allowClear={false}
                  disabled={!master.followEvaluate}
                  format="YYYY-MM-DD"
                  value={
                    master.followEvaluateDate
                      ? moment(master.followEvaluateDate)
                      : undefined
                  }
                  onChange={(date) => {
                    qcModel.setMaster({
                      ...master,
                      followEvaluateDate: date.format("YYYY-MM-DD"),
                    });
                  }}
                />
              )}
            </div>
          </div>
        )}
        <div className="item item-large">
          {baseInfo.useScore ? (
            <div>
              本次评估结果为：得分(
              {["whyx"].includes(appStore.HOSPITAL_ID)
                ? yxGradeObj.totalScore - yxGradeObj.deductScore
                : result.totalScore - result.deductScore}
              ) 总分(
              {["whyx"].includes(appStore.HOSPITAL_ID)
                ? 100
                : result.totalScore}
              )
            </div>
          ) : (
            <div>
              本次评估结果为：是(
              {["whyx"].includes(appStore.HOSPITAL_ID)
                ? yxGradeObj.right
                : result.shi}
              ) 否(
              {["whyx"].includes(appStore.HOSPITAL_ID)
                ? yxGradeObj.fault
                : result.fou}
              ){" "}
              {!["gzsrm"].includes(appStore.HOSPITAL_ID) &&
                `不适用(${result.buShiYong})`}
            </div>
          )}
          <br />
          <div>
            通过率为：
            {["whyx"].includes(appStore.HOSPITAL_ID)
              ? yxGradeObj.rate
              : result.rate}
            %
          </div>
        </div>
      </div>
      <div className="item-gorup-info">
        <div className="top-title">
          <div className="left">检查内容</div>
          <div className="right">通过率</div>
        </div>
        {itemGroupList.map((itemGroup: any, itemGroupIdx: number) => (
          <div
            className="item"
            key={itemGroupIdx}
            onClick={() => handleItmeGroupClick(itemGroup, itemGroupIdx)}
          >
            <div className="title">{`${numToChinese(itemGroupIdx + 1)}、${
              itemGroup.qcItemTypeName
            }`}</div>
            <div className="rate">
              <Progress
                percent={itemGroupRate(itemGroup)}
                format={(percent) => percent + "%"}
                strokeColor={strokeColor(itemGroup)}
              />
            </div>
          </div>
        ))}
      </div>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  .master-area {
    margin-top: 10px;
    line-height: 24px;
    padding: 10px 20px;
    background-color: #f2f2f2;
    font-size: 14px;
    .item {
      width: 50%;
      margin: 5px 0;
      display: inline-block;
      &.item-large {
        width: 100%;
      }
      & > div {
        display: inline-block;
        vertical-align: middle;
        min-height: 32px;
      }
      .label {
        width: 130px;
      }
      .content {
        width: 200px;
        & > * {
          width: 100%;
        }
        .ant-switch {
          width: auto;
        }
      }
    }
  }
  .item-gorup-info {
    margin-top: 45px;
    margin-right: 15px;
    position: relative;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    .top-title {
      position: absolute;
      width: 100%;
      left: 0;
      top: -25px;
      color: #666;
      .left {
        float: left;
      }
      .right {
        float: right;
      }
    }
    .item {
      display: flex;
      font-size: 14px;
      line-height: 30px;
      border-bottom: 1px dashed #ddd;
      cursor: pointer;
      :hover {
        background: rgba(0, 0, 0, 0.02);
      }
      &:last-of-type {
        border-bottom: none;
      }

      .title {
        flex: 1;
      }
      .ant-progress-text {
        font-size: 14px;
      }
      .rate {
        margin-left: 15px;
        width: 150px;
      }
    }
  }
`;
