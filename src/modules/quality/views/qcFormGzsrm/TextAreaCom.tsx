import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { qcFormGzsrmService } from "./api/qcFormGzsrmService";
import { DatePicker, message as Message } from "antd";
import { appStore } from "src/stores";
import moment from "moment";

export interface Props {
  text: string;
  label: string;
  qcMasterId: Number;
  input: Function;
  date?: string | null;
  dateLabel?: string;
  changeDate?: Function;
}
export default function TextAreaCom(props: Props) {
  const save = () => {
    qcFormGzsrmService[props.label]({
      qcMasterId: props.qcMasterId,
      [props.label]: props.text,
      ...(props.dateLabel ? { [props.dateLabel]: props.date } : {}),
    })
      .then((res: any) => {
        Message.success("保存成功");
      })
      .catch((err: any) => {
        Message.warning(err);
      });
  };
  return (
    <Wrapper>
      <textarea
        value={props.text}
        onInput={(e) => props.input(e.currentTarget.value)}
      />
      <div className="btn-box">
        <button onClick={save}>保存</button>
        {["gzsrm"].includes(appStore.HOSPITAL_ID) && !!props.changeDate ? (
          <DatePicker
            className="btn-box__date"
            value={props.date ? moment(props.date) : undefined}
            onChange={(e) => {
              let v = e ? e.format("YYYY-MM-DD HH:mm") : "";
              (props.changeDate as Function)(v);
            }}
            format="YYYY-MM-DD HH:mm"
            showTime={{ format: "HH:mm" }}
          />
        ) : (
          ""
        )}
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  textarea {
    resize: none;
    overflow-y: auto;
    width: 100%;
    outline: none;
    border: none;
    background: none;
  }
  .btn-box {
    display: flex;
    align-items: center;
    border-top: 1px solid #ccc;
    .btn-box__date {
      min-width: 160px !important;
    }
  }
  button {
    background: none;
    outline: none;
    border: none;
    cursor: pointer;
    white-space: nowrap;
  }
  button:hover {
    color: #00a680;
  }
`;
