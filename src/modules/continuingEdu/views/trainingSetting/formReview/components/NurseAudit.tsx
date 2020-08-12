import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { appStore } from "src/stores";
import BaseTabs from "src/components/BaseTabs";
import { formReviewModal } from "../FormReviewModal";
import BaseTable, { DoCon } from "src/components/BaseTable";
import { Button } from "antd";
import qs from "qs";

export default observer(function NurseAudit() {
  const [activeKey, setActiveKey]: any = useState("0");

  const columns: any = [
    {
      title: "序号",
      dataIndex: "",
      render: (text: any, record: any, index: number) => index + 1,
      align: "center",
      width: 50
    },
    {
      title: "标题",
      dataIndex: "formName",
      align: "left"
    },
    {
      title: "提交人",
      dataIndex: "submitterEmpName",
      align: "center",
      width: 120
    },
    {
      title: "工号",
      dataIndex: "submitterEmpNo",
      align: "center",
      width: 100
    },
    {
      title: "提交时间",
      dataIndex: "submitTime",
      align: "center",
      width: 190
    },
    {
      title: "状态",
      dataIndex: "statusDesc",
      width: 160,
      align: "center"
    },
    {
      title: "操作",
      dataIndex: "cz",
      width: 100,
      align: "center",
      render: (text: any, record: any) => {
        return (
          <DoCon>
            {activeKey == "0" ? (
              <span onClick={() => handleDetail(record)}>审核</span>
            ) : (
              <span onClick={() => handleDetail(record, true)}>查看</span>
            )}
          </DoCon>
        );
      }
    }
  ];

  // 表格
  const ReviewTable = (
    <Wrapper>
      {/* {needAudit && <GroupPostBtn>批量审核</GroupPostBtn>} */}
      <PostBtn
        onClick={() => {
          formReviewModal.onload();
        }}
      >
        刷新
      </PostBtn>
      <BaseTable
        loading={formReviewModal.tableLoading}
        dataSource={formReviewModal.tableList}
        columns={columns}
        surplusHeight={270}
        // rowSelection={needAudit ? rowSelection : false}
        pagination={{
          current: formReviewModal.pageIndex,
          total: formReviewModal.total,
          pageSize: formReviewModal.pageSize
        }}
        onChange={pagination => {
          formReviewModal.pageIndex = pagination.current;
          formReviewModal.total = pagination.total;
          formReviewModal.pageSize = pagination.pageSize;
          formReviewModal.onload();
        }}
      />
    </Wrapper>
  );

  // tabs
  const TABS_LIST_NURSE = [
    {
      title: "待我审核",
      component: ReviewTable
    },
    {
      title: "我已审核",
      component: ReviewTable
    }
  ];

  // 初始化
  useEffect(() => {
    if (activeKey == "0") {
      formReviewModal.type = "queryToAuditPageList";
    } else {
      formReviewModal.type = "queryAuditedPageList";
    }
    formReviewModal.onload();
  }, [activeKey]);

  // 审核 查看 ---true查看
  const handleDetail = (record: any, checkResult?: any) => {
    let newQuery = {
      taskId: record.taskId,
      formId: record.formId,
      code: record.formCode,
      name: record.formName,
      submitterEmpNo: record.submitterEmpNo,
      checkResult: checkResult ? "查看" : "审核"
    } as any;
    appStore.history.push(`/continuingEduFormCheck?${qs.stringify(newQuery)}`);
  };

  return (
    <Wrapper>
      <MainCon>
        <BaseTabs
          config={TABS_LIST_NURSE}
          defaultActiveKey={activeKey}
          onChange={(key: any) => {
            setActiveKey(key);
          }}
        />
      </MainCon>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  height: calc(100vh - 55px)
  display: flex;
  flex-direction: column;
`;

const MainCon = styled.div`
  flex: 1;
  height: calc(100vh - 115px);
  align-items: stretch;
  display: flex;
  margin: 0 15px;
`;
const PostBtn = styled(Button)`
  position: fixed !important;
  top: 109px;
  right: 33px;
`;
