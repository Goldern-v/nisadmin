import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import ApplicationN1 from "./view/ApplicationN1";
import ApplicationN2 from "./view/ApplicationN2";
import ApplicationN3 from "./view/ApplicationN3";
import ApplicationN4 from "./view/ApplicationN4";
import { PromotionAppUtils } from "../PromotionAppUtils";
import { Spin, Icon } from "antd";
import moment from "moment";

export interface Props {
  printRef?: any;
}

export default observer(function PromotionTable(props: Props) {
  return (
    <Wrapper>
      <div className="table-left">
        <Spin spinning={PromotionAppUtils.loading}>
          {PromotionAppUtils.tabsKey == "1" && (
            <ApplicationN1 printRef={props.printRef} />
          )}
          {PromotionAppUtils.tabsKey == "2" && (
            <ApplicationN2 printRef={props.printRef} />
          )}
          {PromotionAppUtils.tabsKey == "3" && (
            <ApplicationN3 printRef={props.printRef} />
          )}
          {PromotionAppUtils.tabsKey == "4" && (
            <ApplicationN4 printRef={props.printRef} />
          )}
        </Spin>
      </div>
      <div className="table-right">
        <div className="right-head">审核过程</div>
        <div className="audit-mian">
          {PromotionAppUtils.handlenodeDto.length ? (
            PromotionAppUtils.handlenodeDto.map((item: any, idx: number) =>
              idx == 0 ? (
                item.status == 0 ? (
                  <div className="audit-item" key={idx}>
                    <div className="emp-img">
                      <img src={item.nearImageUrl} alt="" />
                    </div>
                    <div className="info">
                      <div className="step-title">
                        <span>{item.nodeName}</span>
                      </div>
                      <div className="emp-name">未完成</div>
                    </div>
                  </div>
                ) : (
                  <div className="audit-item" key={idx}>
                    <div className="emp-img">
                      <img src={item.nearImageUrl} alt="" />
                      <Icon
                        type="check-circle"
                        theme="filled"
                        className="step-status success"
                      />
                    </div>
                    <div className="info">
                      <div className="step-title">
                        <span>{item.nodeName}</span>
                      </div>
                      <div className="emp-name">{item.handlerName}</div>
                      <div className="emp-name">{`${
                        item.handleTime
                      } (星期${moment(item.handleTime).format("E")})`}</div>
                    </div>
                  </div>
                )
              ) : item.status != 0 ? (
                <div className="audit-item" key={idx}>
                  <div className="emp-img">
                    <img src={item.nearImageUrl} alt="" />
                    {item.noPass == true || item.nodeCode == "withdraw" ? (
                      <Icon
                        type="close-circle"
                        theme="filled"
                        className="step-status error"
                      />
                    ) : (
                      <Icon
                        type="check-circle"
                        theme="filled"
                        className="step-status success"
                      />
                    )}
                  </div>
                  <div className="info">
                    <div className="step-title">
                      <span>{item.handlerName}</span>
                    </div>
                    <div className="emp-name">{item.handleContent}</div>
                    <div className="emp-name">{item.nodeName}</div>
                    <div className="emp-name">{`${
                      item.handleTime
                    } (星期${moment(item.handleTime).format("E")})`}</div>
                  </div>
                </div>
              ) : (
                <div className="audit-item" key={idx}>
                  <div className="emp-img">
                    <img src={item.nearImageUrl} alt="" />
                  </div>
                  <div className="info">
                    <div className="step-title">
                      <span>{item.nodeName}</span>
                    </div>
                    <div className="emp-name">未完成</div>
                  </div>
                </div>
              )
            )
          ) : (
            <div className="right-nomains">暂无审核记录~</div>
          )}
        </div>
      </div>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  height: 100%;
  padding: 5px ;
  background-color: #f2f2f2;
  display: flex;
  .table-left{
    flex:1;
  }
  .table-right{
    width: 300px;
    height: 680px;
    margin-left: 7px;
    background-color: #fff;
    box-shadow: 0px 1px 5px 0px #999;
    .right-head{
      display: flex;
      align-items: center;
      font-size: 21px;
      height: 45px;
      font-weight: bold;
      border-bottom: 1px solid #ccc;
      ::before{
        content: '';
        margin-left: 20px ;
        display: block;
        width: 10px;
        height: 21px;
        background-color: #00a680;
      }
    }
    .right-nomains{
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ccc;
      font-size: 17px;
    }
  }
  .audit-mian{
    height: 600px;
    overflow-y:auto;
  }
  .audit-item{
    color: #666;
    padding-top: 40px;
    position: relative;
    &::before{
      position: absolute;
      content: '';
      width:1px;
      height: 100%;
      background: #ddd;
      top: 0;
      left: 20px;
    }
    &:first-of-type{
      padding-top:0;
    }
    &:last-of-type{
      &::before{
        height:40px;
      }
    }
    .emp-img{
      width: 40px;
      position: relative;
      float: left;
      img{
        height: 40px;
        width: 40px;
        background: #ddd;
        border-radius: 50%;
        object-fit: cover;
        display:inline-block;
        background: url('${require("src/assets/护士默认头像.png")}');
        background-size: 100%;
      }
      .step-status{
        position:absolute;
        right: 0;
        bottom: 0;
        background: #fff;
        border-radius: 50%;
        &.error{
          color: red;
        }
        &.success{
          color: rgb(2, 159, 123);
        }
      }
    }
    .info{
      font-size: 13px;
      padding-left: 45px;
      .desc{
        padding: 5px;
        border-radius: 3px;
        background: #eee;
      }
    }
  }
`;
