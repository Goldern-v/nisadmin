import styled from "styled-components";
import React, { useEffect, useState } from "react";
export interface Props {}

export default function FollowUpList(props: any) {
  const [listNum, setListNum] = useState(5);
  const toDetail = (masterId: any, formCode: any,isRead:any) => {
    console.log(props);
    let state = { masterId, formCode, patientId: props.patientId,isRead };
    sessionStorage.setItem("state", JSON.stringify(state));
    props.history.replace({
      pathname: "/FollowUpDetail",
      state,
    });
    // appStore.history.push(`/followUpDetail?patientId=71007865&visitId=1`);
  };
  useEffect(() => {}, []);

  return (
    <Wrapper>
      <div className="list-content">
        {props.followUpListArr.map((item: any, index: any) => {
          // if(index<listNum){
          return (
            <div
              className="list-item"
              key={item.masterId}
              onClick={() => toDetail(item.masterId, item.formCode,item.isRead)}
            >
              <div className="fl-top">
                <div
                  className="tips-point"
                  style={{ display: !item.isRead ? "block" : "none" }}
                />
                <div className="fl-title">{item.formName}</div>
                <div
                  className="fl-status"
                  style={{
                    border: `1px solid ${
                      item.status == 3 ? "#7da340" : "#dc4343"
                    }`,
                    color: `${item.status == 3 ? "#7da340" : "#dc4343"}`,
                  }}
                >
                  {item.status == 3 ? "已提交" : "待填写"}
                </div>
              </div>
              <div className="fl-bot">
                <div className="fl-deptName">{item.deptName}</div>
                <div className="fl-time">{item.recordDate}</div>
              </div>
            </div>
          );
          // }
        })}
        <div className="loading" />
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  .list-content {
    overflow: hidden;
    height: 100%;
    padding-top: 40px;
    background-color: #f5f5f9;
    .list-item {
      position: relative;
      padding: 0px 20px;
      height: 80px;
      width: 325px;
      margin: 15px auto 0;
      background-color: #fff;
      border: 1px solid #999;
      border-radius: 10px;
      box-sizing: border-box;
      .fl-top {
        justify-content: space-between;
        .tips-point {
          position: absolute;
          top: 10px;
          left: 7px;
          width: 12px;
          height: 12px;
          background-color: #d10606;
          border-radius: 50%;
        }
        .fl-title {
          font-size: 16px;
        }
        .fl-status {
          line-height: 25px;
          width: 57px;
          height: 25px;
          text-align: center;
          border-radius: 15px;
          margin-top: 10px;
          font-size: 14px;
        }
      }
      .fl-bot {
        color: #8b8b8b;
        font-size: 14px;
        .fl-deptName {
          margin-right: 20px;
        }
      }
      .fl-top,
      .fl-bot {
        display: flex;
        line-height: 40px;
      }
    }
  }
`;
