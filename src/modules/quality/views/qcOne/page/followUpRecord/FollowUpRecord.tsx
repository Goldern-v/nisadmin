import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { PageHeader, PageTitle, Place } from "src/components/common";
import {
  DatePicker,
  Select,
  ColumnProps,
  PaginationConfig
} from "src/vendors/antd";
import DeptSelect from "src/components/DeptSelect";
import { appStore, authStore } from "src/stores";
import BaseTable from "src/components/BaseTable";
import createModal from "src/libs/createModal";
import EditFollowUpModal, { jdList } from "./modal/EditFollowUpModal";
import { qcOneService } from "../../services/QcOneService";
import { useCallback } from "src/types/react";
import { DoCon } from "src/modules/nurseFiles/view/nurseFiles-wh/views/nurseFilesList/NurseFilesListView";
import { qcOneSelectViewModal } from "../../QcOneSelectViewModal";
import { observer } from "mobx-react-lite";
import moment from "moment";
import { numToChinese } from "src/utils/number/numToChinese";
import YearPicker from "src/components/YearPicker";
export interface Props { }

export default observer(function FollowUpRecord() {
  const [dataSource, setDataSource] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);
  const [selectedJd, setselectedJd]: any = useState(moment().quarter());
  const [year, setYear]: any = useState(moment());
  const columns: ColumnProps<any>[] = [
    {
      title: "随访日期",
      dataIndex: "recordDate",
      align: "center",
      width: 100
    },
    {
      title: "季度",
      dataIndex: "quarter",
      align: "center",
      width: 100,
      render(text: any, record: any, index: number) {
        return text ? `第${numToChinese(text)}季度` : "";
      }
    },
    {
      title: "科室",
      dataIndex: "wardName",
      width: 150
    },
    {
      title: "患者姓名",
      dataIndex: "patientName",
      align: "center",
      width: 100
    },
    {
      title: "疾病诊断",
      dataIndex: "diagnosis",
      width: 150
    },
    {
      title: "住院起始时间",
      dataIndex: "admissionDate",
      align: "center",
      width: 180,
      render(text: any, record: any, index: number) {
        return (
          <span>
            {record.admissionDate} - {record.dischargeDate}
          </span>
        );
      }
    },
    {
      title: "家访内容",
      dataIndex: "accessContent",
      width: 150
    },
    {
      title: "反馈意见",
      dataIndex: "feedBack",
      width: 150
    },
    {
      title: "家访参加人员",
      dataIndex: "empNames",
      width: 150
    },
    {
      title: "创建人",
      dataIndex: "creatorName",
      align: "center",
      width: 100
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      align: "center",
      width: 150
    },
    {
      title: "操作",
      width: 100,
      render(text: any, record: any, index: number) {
        return (
          <DoCon>
            <span onClick={() => onDetail(record)}>查看详情</span>
          </DoCon>
        );
      }
    }
  ];
  const editFollowUpModal = createModal(EditFollowUpModal);

  const [pageOptions, setPageOptions]: any = useState({
    pageIndex: 1,
    pageSize: 20
  });
  const [total, setTotal]: any = useState(0);
  const getData = () => {
    let _startDate = "";
    let _endDate = "";
    let y = year.format("YYYY");
    if (selectedJd == 1) {
      _startDate = moment().format(`${y}-01-01`);
      _endDate = moment()
        .month(2)
        .endOf("month")
        .format(`${y}-MM-DD`);
    } else if (selectedJd == 2) {
      _startDate = moment().format(`${y}-04-01`);
      _endDate = moment()
        .month(5)
        .endOf("month")
        .format(`${y}-MM-DD`);
    } else if (selectedJd == 3) {
      _startDate = moment().format(`${y}-07-01`);
      _endDate = moment()
        .month(8)
        .endOf("month")
        .format(`${y}-MM-DD`);
    } else if (selectedJd == 4) {
      _startDate = moment().format(`${y}-10-01`);
      _endDate = moment()
        .month(11)
        .endOf("month")
        .format(`${y}-MM-DD`);
    }
    setPageLoading(true);
    qcOneService
      .qcPatientVisitGetPage({
        ...pageOptions,
        wardCode: authStore.selectedDeptCode,
        // quarter: selectedJd,
        startDate:
          _startDate ||
          (qcOneSelectViewModal.startDate
            ? moment(qcOneSelectViewModal.startDate).format(`${y}-MM-DD`)
            : ""),
        endDate:
          _endDate ||
          (qcOneSelectViewModal.endDate
            ? moment(qcOneSelectViewModal.endDate).format(`${y}-MM-DD`)
            : "")
      })
      .then(res => {
        setTotal(res.data.totalCount);
        setDataSource(res.data.list);
        setPageLoading(false);
      });
  };

  const onDetail = (record: any) =>
    editFollowUpModal.show({
      onOkCallBack: getData,
      data: record
    });

  useEffect(() => {
    // getData()
    // qcOneSelectViewModal.initNurseList()
  }, []);

  useEffect(() => {
    getData();
  }, [pageOptions.pageIndex, pageOptions.pageSize, selectedJd, authStore.selectedDeptCode, year]);

  // qcOneService
  return (
    <Wrapper>
      <PageHeader>
        <PageTitle>季度家庭随访表</PageTitle>
        <Place />
        <span className="label">科室:</span>
        <DeptSelect
          onChange={() => {
            qcOneSelectViewModal.initNurseList();
          }}
        />
        <span className="label">年度:</span>
        <YearPicker
          value={year}
          onChange={(value: any) => setYear(value)}
          allowClear={false}
          style={{ width: 80 }}
        />
        {/* <span className='label'>日期:</span>
        <DatePicker.RangePicker allowClear={false} style={{ width: 220 }} {...qcOneSelectViewModal.getDateOptions()} /> */}

        <span className="label">季度:</span>
        <Select
          value={selectedJd}
          onChange={(nurse: any) => {
            setselectedJd(nurse);
          }}
        >
          <Select.Option value={""}>全部</Select.Option>
          {jdList.map((item: any, index: any) => (
            <Select.Option value={item.code} key={index}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
        <Button type="primary" onClick={() => getData()}>
          查询
        </Button>
        <Button
          type="primary"
          onClick={() =>
            editFollowUpModal.show({
              onOkCallBack: getData
            })
          }
        >
          添加
        </Button>
      </PageHeader>

      <BaseTable
        loading={pageLoading}
        dataSource={dataSource}
        columns={columns}
        wrapperStyle={{ margin: "0 15px" }}
        type={["index", "fixedIndex"]}
        surplusWidth={200}
        surplusHeight={220}
        pagination={{
          current: pageOptions.pageIndex,
          pageSize: pageOptions.pageSize,
          total: total
        }}
        onChange={(pagination: PaginationConfig) => {
          setPageOptions({
            pageIndex: pagination.current,
            pageSize: pagination.pageSize
          });
        }}
        onRow={(record: any) => {
          return { onDoubleClick: () => onDetail(record) };
        }}
      />
      <editFollowUpModal.Component />
    </Wrapper>
  );
});
const Wrapper = styled.div``;
