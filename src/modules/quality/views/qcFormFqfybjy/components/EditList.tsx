import styled from "styled-components";
import React, { useState, useEffect, Fragment } from "react";
import { qcFormFqfybjyService } from "../api/qcFormFqfybjyService";
import { Button, Input, message as Message } from "antd";
import { educationList } from "src/modules/mobilePage/traineeInfoSubmit/data/education";

export interface Props {
  arr: any[];
  editList: string[];
  input: Function;
  save: () => void;
}

export default function EditList(props: Props) {
  const handleInput = (e: any, key: string, num: number) => {
    let newArr = JSON.parse(JSON.stringify(props.arr));
    newArr[num][key] = e;
    props.input(newArr);
  };

  return (
    <Wrapper>
      {props.arr.map((item: any, i: number) => (
        <div className="edit-item" key={i}>
          {props.editList.map((key: string, i1: number) => {
            if (
              ["content"].includes(key) ||
              (key === "author" && props.editList.length == 1)
            ) {
              return (
                <Input.TextArea
                  key={i1}
                  className="def-ipt def-textarea"
                  value={item[key]}
                  onInput={(e) => handleInput(e.currentTarget.value, key, i)}
                />
              );
            }
            return (
              <Input
                key={i1}
                className="def-ipt"
                value={item[key]}
                onInput={(e) => handleInput(e.currentTarget.value, key, i)}
              />
            );
          })}
        </div>
      ))}
      {!!props.arr.length && (
        <Button size="small" onClick={() => props.save()}>
          保存
        </Button>
      )}
    </Wrapper>
  );
}
const Wrapper = styled.div`
  .edit-item {
    border-bottom: 1px solid #f0f0f0;
  }
  .def-ipt {
    border: none;
    border-radius: 0;
    margin: 0 0 2px 0;
    padding: 0;
    line-height: 24px;
    height: 24px;
    text-align: right;
    &.def-textarea {
      resize: vertical;
      min-height: 24px;
      height: auto;
      text-align: left;
    }
  }
`;
