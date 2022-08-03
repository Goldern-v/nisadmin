import styled from "styled-components";
import { observer } from "mobx-react-lite";
import React, { useState, useEffect } from "react";
import BaseTable, { DoCon } from "src/components/BaseTable";
import { Button, Modal, message as Message } from "antd";
import {PromotionManagementApi} from "../api/PromotionManagement";
import {PromotionUtils} from "../PromotionUtils"
import createModal from "src/libs/createModal";
import { appStore } from "src/stores";
import qs from 'qs'

interface Props {}

export default observer(function ApplyTable(props: Props) {
  const { history } = appStore

  const columns: any = [
    {
      title: "序号",
      dataIndex: "",
      render: (text: any, record: any, index: number) => index + 1,
      align: "center",
      width: 50
    },
    {
      title: "工号",
      dataIndex: "empNo",
      align: "center",
      width: 200
    },
    {
      title: "姓名",
      dataIndex: "empName",
      align: "center",
      width: 80
    },
    {
      title: "科室",
      dataIndex: "deptName",
      align: "center",
      width: 100
    },
    {
      title: "层级",
      dataIndex: "currentLevel",
      align: "center",
      width: 100
    },
    {
      title: "最后提交晋升等级",
      dataIndex: "formName",
      align: "center",
      width: 100
    },
    {
      title: "最后提交时间",
      dataIndex: "updateTime",
      align: "center",
      width: 100
    },
    {
      title: "操作",
      dataIndex: "cz",
      width: 100,
      align: "center",
      render(text: any, record: any) {
        let data: any = [{
          text: "查看",
          function: handleExamine
        }];
        return (
          <DoCon>
            {data.map((item: any, index: any) => (
              <span
                key={index}
                style={{color:item.color?item.color:''}}
                onClick={() => (item.function ? item.function(record) : {})}
              >
                {item.text}
              </span>
            ))}
          </DoCon>
        );
      }
    }
  ];

  const handleExamine = (record:any)=>{
    console.log(record)
    const obj = {
      id: record.id,
      currentLevel:record.currentLevel,
      lastCommitTime: record.lastCommitTime,
      formName:record.formName,
      formCode:record.formCode,
      empName:record.empName,
      status:record.status,
    }

    // console.log(record)
    history.push(`/continuingEdu/examOrExercise?${qs.stringify(obj)}`)
  }

   

  return (
    <Wrapper>
      <BaseTable
        loading={PromotionUtils.tableLoading}
        dataSource={PromotionUtils.tableList}
        columns={columns}
        surplusHeight={230}
        pagination={{
          current: PromotionUtils.pageIndex,
          total: PromotionUtils.total,
          pageSize: PromotionUtils.pageSize,
        }}
        onChange={(pagination) => {
          PromotionUtils.pageIndex = pagination.current;
          PromotionUtils.total = pagination.total;
          PromotionUtils.pageSize = pagination.pageSize;
          PromotionUtils.onload();
        }}
      />
    </Wrapper>
  );
});
const Wrapper = styled.div`
  padding: 0 20px;
  box-sizing: border-box;
`;
