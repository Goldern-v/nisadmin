import { observer } from "mobx-react";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ColumnProps } from "antd/lib/table";
import {
  qcFormGzsrmService,
  IQcGradeParams,
  IQcGradeOutput,
} from "./api/qcFormGzsrmService";
import { DatePicker, Button, Select } from "antd";
import { PageTitle, Place, PageHeader } from "src/components/common";
import BaseTable from "src/components/BaseTable";
import { appStore, authStore } from "src/stores";
import moment from "moment";
import { currentMonth } from "src/utils/date/rangeMethod";

export default observer(function(props) {
  const columns: ColumnProps<IQcGradeOutput>[] = [
    {
      title: "序号",
      key: "",
      dataIndex: "",
      width: 50,
      align: "center",
      render: (text: any, record: any, index: number) => index + 1,
    },
    {
      title: "科室",
      key: "wardName",
      dataIndex: "wardName",
      width: 180,
    },
    {
      title: "护理素质",
      key: "nurseQuality",
      dataIndex: "nurseQuality",
      width: 110,
      align: "center",
    },
    {
      title: "护理单元",
      key: "nursingUnit",
      dataIndex: "nursingUnit",
      width: 110,
      align: "center",
    },
    {
      title: "分级护理",
      key: "gradedNursing",
      dataIndex: "gradedNursing",
      width: 110,
      align: "center",
    },
    {
      title: "护理文书",
      key: "nursingDocument",
      dataIndex: "nursingDocument",
      width: 110,
      align: "center",
    },
    {
      title: "感染管理",
      key: "infectionManagement",
      dataIndex: "infectionManagement",
      width: 110,
      align: "center",
    },
    {
      title: "病房护士长",
      key: "chargeNurse",
      dataIndex: "chargeNurse",
      width: 110,
      align: "center",
    },
    {
      title: "重点环节",
      key: "keyLink",
      dataIndex: "keyLink",
      width: 110,
      align: "center",
    },
    {
      title: "临床实境",
      key: "clinicalReality",
      dataIndex: "clinicalReality",
      width: 110,
      align: "center",
    },
    {
      title: "教学检查",
      key: "teachingInspection",
      dataIndex: "teachingInspection",
      width: 110,
      align: "center",
    },
    {
      title: "护理技能",
      key: "nNursingSkill",
      dataIndex: "nNursingSkill",
      width: 110,
      align: "center",
    },
    {
      title: "急救配合",
      key: "firstAidCooperation",
      dataIndex: "firstAidCooperation",
      width: 110,
      align: "center",
    },
    {
      title: "满意度",
      key: "satisfaction",
      dataIndex: "satisfaction",
      width: 110,
      align: "center",
    },
    {
      title: "平均分",
      key: "average",
      dataIndex: "average",
      width: 110,
      align: "center",
      fixed: "right",
      sorter: (a, b) => a.average - b.average,
    },
  ];

  const [startDate, endDate] = currentMonth();
  const defaultParams = (): IQcGradeParams => {
    return {
      wardCode: "",
      beginDate: startDate.format("YYYY-MM-DD"),
      endDate: endDate.format("YYYY-MM-DD"),
      order: "-1",
    };
  };
  const { deptList } = authStore;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IQcGradeOutput[]>([]);
  const [params, setParams] = useState<IQcGradeParams>(defaultParams);
  const getData = async () => {
    try {
      setLoading(true);
      const res = await qcFormGzsrmService.getQcGradeList(params);
      setData(res.data || []);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };
  const exportExcel = () => {
    qcFormGzsrmService.exportCountResult(params);
  };

  useEffect(() => {
    getData();
  }, [params]);

  return (
    <Wrapper>
      <PageHeader>
        <PageTitle>护理质量统计汇总</PageTitle>
        <Place />
        <span className="label">日期：</span>
        <DatePicker.RangePicker
          allowClear={false}
          value={[moment(params.beginDate), moment(params.endDate)]}
          onChange={([m0, m1]: any[]) => {
            setParams({
              ...params,
              beginDate: m0.format("YYYY-MM-DD") || "",
              endDate: m1.format("YYYY-MM-DD") || "",
            });
            console.log("test-params", params);
          }}
          style={{ width: 200 }}
        />
        <span className="label">质控科室：</span>
        <Select
          value={params.wardCode}
          style={{ width: 180, marginRight: 15 }}
          showSearch
          onChange={(wardCode: string) => setParams({ ...params, wardCode })}
          filterOption={(input: any, option: any) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {(authStore.isDepartment || authStore.isSupervisorNurse) && (
            <Select.Option value="">全部</Select.Option>
          )}
          {deptList.map((item: any, index: number) => (
            <Select.Option value={item.code} key={index}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
        <Button type="primary" className="statistics" onClick={getData}>
          查询
        </Button>
        <Button
          className="excel"
          onClick={() => {
            exportExcel();
          }}
        >
          导出Excel
        </Button>
      </PageHeader>
      <ContentCon>
        <div className="content-title">
          <div>全院护理质量检查成绩汇总表</div>
          <div>
            日期:
            {`${moment(params.beginDate).format("YYYY-MM-DD")}至${moment(
              params.endDate
            ).format("YYYY-MM-DD")}`}
          </div>
        </div>
        <BaseTable
          surplusWidth={1000}
          surplusHeight={260}
          loading={loading}
          dataSource={data}
          columns={columns}
        />
      </ContentCon>
    </Wrapper>
  );
});

const Wrapper = styled.div``;
const ContentCon = styled.div`
  background: #fff;
  margin: 0 15px 5px 15px;
  padding-top: 25px;
  .content-title {
    text-align: center;
    > div:first-child {
      font-size: 20px;
      color: #333;
      font-weight: bold;
      text-align: center;
    }
    > div:nth-child(2) {
      font-size: 13px;
      color: #333;
      text-align: center;
      margin: 8px 0 5px 0;
    }
  }
`;
