import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { PageHeader, PageTitle, Place } from "src/components/common";
import {
  DatePicker,
  Select,
  ColumnProps,
  PaginationConfig,
  Input,
  message
} from "src/vendors/antd";
import DeptSelect from "src/components/DeptSelect";
import { appStore, authStore } from "src/stores";
import BaseTable from "src/components/BaseTable";

import { useCallback } from "src/types/react";
import { DoCon } from "src/components/BaseTable";
import { observer } from "mobx-react-lite";
import { DictItem } from "src/services/api/CommonApiService";
import { arrangeService } from "../../services/ArrangeService";
import { getCurrentMonth } from "src/utils/date/currentMonth";
import service from "src/services/api";
import User from "src/models/User";
import moment from "moment";
import createModal from "src/libs/createModal";
import EditStandardTimeModal from "./modal/EditStandardTimeModal";
import { globalModal } from "src/global/globalModal";
export interface Props {}
export default observer(function StandardTime() {
  const [dataSource, setDataSource] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);

  const editStandardTimeModal = createModal(EditStandardTimeModal);

  const columns: ColumnProps<any>[] = [
    {
      title: "科室",
      align: "center",
      width: 200,
      render(text: any, record: any) {
        return authStore.selectedDeptName;
      }
    },
    {
      title: "起始日期",
      dataIndex: "startDate",
      align: "center",
      width: 150
    },
    {
      title: "标准工时",
      dataIndex: "initialHour",
      align: "center",
      width: 150
    },
    {
      title: "操作",
      dataIndex: "",
      align: "center",
      width: 100,
      render(text: any, record: any) {
        return (
          <DoCon>
            {/* <span
              onClick={() => {
                editStandardTimeModal.show({
                  oldData: record,
                  onOkCallBack() {
                    getData();
                  }
                });
              }}
            >
              编辑
            </span> */}
            <span
              onClick={() => {
                globalModal
                  .confirm("删除确认", "你确定要删除改记录吗？")
                  .then(res => {
                    arrangeService.schInitialHourDelete(record.id).then(res => {
                      message.success("删除成功");
                      getData();
                    });
                  });
              }}
            >
              删除
            </span>
          </DoCon>
        );
      }
    }
  ];

  const [total, setTotal] = useState(0);

  const getData = () => {
    setPageLoading(true);

    arrangeService
      .schInitialHourGetList({
        deptCode: authStore.selectedDeptCode
      })
      .then(res => {
        setPageLoading(false);
        setDataSource(res.data);
      });
  };

  const onDetail = (record: any) => {};
  useEffect(() => {
    getData();
  }, [authStore.selectedDeptCode]);

  return (
    <Wrapper>
      <PageHeader>
        <PageTitle>标准工时设置</PageTitle>
        <Place />
        <span className="label">科室:</span>
        <DeptSelect onChange={() => {}} />
        <Button onClick={() => getData()}>查询</Button>
        <Button
          type="primary"
          onClick={() => {
            editStandardTimeModal.show({
              onOkCallBack() {
                getData();
              }
            });
          }}
        >
          添加
        </Button>
      </PageHeader>
      <BaseTable
        loading={pageLoading}
        dataSource={dataSource}
        columns={columns}
        wrapperStyle={{ margin: "0 15px" }}
        type={["index"]}
        surplusHeight={200}
      />
      <editStandardTimeModal.Component />
    </Wrapper>
  );
});
const Wrapper = styled.div`
  .input-cell {
    padding: 0 !important;
    input {
      border: 0;
      border-radius: 0;
      box-shadow: none;
      outline: none;
      text-align: center;
      &:focus {
        background: ${p => p.theme.$mlc};
      }
    }
  }
`;
