import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button } from "antd";
import BreadcrumbBox from "src/layouts/components/BreadcrumbBox";
import { Place } from "src/components/common";
import BaseTable from "src/components/BaseTable";
import { DoCon } from "src/components/BaseTable";
import { ColumnProps, PaginationConfig, Select } from "src/vendors/antd";
import createModal from "src/libs/createModal";
import PersonelSecondModal from "./modal/PersonelSecondModal";
import { personelSecondServices } from "./service/PersonelSecondServices";
import { appStore, authStore } from "src/stores";
import DeptSelect from "src/components/DeptSelect";
export interface Props { }

export default function PersonnelSecondment() {
  const [dataSource, setDataSource] = useState([]);
  const [status, setStatus] = useState("1");
  const [pageLoading, setPageLoading] = useState(false);
  const personelSecondModal = createModal(PersonelSecondModal);
  const [pageOptions, setPageOptions]: any = useState({
    pageIndex: 1,
    pageSize: 20
  });
  const [total, setTotal] = useState(0);
  const columns: ColumnProps<any>[] = [
    {
      title: "新科室",
      dataIndex: "deptNameTransferTo",
      width: 150
    },
    {
      title: "原科室",
      dataIndex: "deptName",
      width: 150
    },
    {
      title: "借出护士",
      dataIndex: "empNameTransferTo",
      width: 100,
      align: "center"
    },
    {
      title: "借出日期",
      dataIndex: "startDate",
      width: 120,
      align: "center"
    },
    {
      title: "借出说明",
      dataIndex: "detailTransferTo",
      width: 300
    },
    ...appStore.hisMatch({
      map: {
        'qhwy,dglb,dghm': [
          {
            title: "护士总数",
            dataIndex: "nurseNum",
            width: 100,
            align: "center"
          },
          {
            title: "患者总数",
            dataIndex: "patientNum",
            width: 100,
            align: "center"
          },
          {
            title: "审核状态",
            dataIndex: "status",
            width: 100,
            align: "center"
          },
        ],
        other: [],
      },
      vague: true
    }),
    {
      title: "操作人",
      dataIndex: "empName",
      width: 150,
      align: "center",

    },
    ...appStore.hisMatch({
      map: {
        'qhwy,dglb,dghm': [
          {
            title: "操作",
            dataIndex: "",
            width: 100,
            align: "center",
            render(text: any, record: any) {
              return (
                <DoCon>
                  {record.status == '驳回' && <span
                    onClick={() => {
                      personelSecondModal.show({
                        onOkCallBack: getData,
                        recordData: record
                      })
                    }}
                  >
                    编辑
                  </span>}
                </DoCon>
              );
            }
          },
        ],
        other: [],
      },
      vague: true
    }),
  ];

  const getData = () => {
    setPageLoading(true);
    personelSecondServices
      .getByDeptCode({
        ...pageOptions,
        deptCode: authStore.selectedDeptCode,
        status
      })
      .then(res => {
        setTotal(res.data.totalCount);
        setDataSource(res.data.list);
        setPageLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, [pageOptions.pageIndex, pageOptions.pageSize, status]);

  return (
    <Wrapper>
      <div>
        <BreadcrumbBox
          data={[
            {
              name: "排班管理",
              link: "/personnelManagement/arrangeHome"
            },
            {
              name: "临时人员借调"
            }
          ]}
        />
      </div>
      <Head>
        <div className="title">临时人员借调</div>
        <Place />
        <span className="label">科室：</span>
        <DeptSelect
          onChange={() => {
            getData();
          }}
        />
        <span className="label">类型：</span>
        <Select
          style={{ width: 80 }}
          value={status}
          onChange={(value: any) => setStatus(value)}
        >
          <Select.Option value="1">借出</Select.Option>
          <Select.Option value="2">借入</Select.Option>
        </Select>
        {
          !['gzsrm'].includes(appStore.HOSPITAL_ID) ?
            <Button
              onClick={() => personelSecondModal.show({ onOkCallBack: getData })}
              style={{ marginLeft: 10 }}
            >
              人员借出
            </Button> : ""
        }
        <Button onClick={() => getData()} style={{ marginLeft: 10 }}>
          刷新
        </Button>
      </Head>
      <BaseTable
        loading={pageLoading}
        columns={columns}
        dataSource={dataSource}
        surplusHeight={220}
        surplusWidth={220}
        type={["index"]}
        pagination={{
          current: pageOptions.pageIndex,
          pageSize: pageOptions.pageSize,
          total: total
        }}
        onChange={(pagination: PaginationConfig) => {
          setPageOptions({
            pageIndex: pagination.current,
            pageSize: pagination.pageSize,
            total: total
          });
        }}
      />
      <personelSecondModal.Component />
    </Wrapper>
  );
}
const Wrapper = styled.div``;
const Head = styled.div`
  display: flex;
  padding: 0 20px;
  align-items: center;
  .title {
    font-size: 20px;
    font-weight: bold;
  }
  .label {
    margin: 0 0 0 15px;
  }
`;
