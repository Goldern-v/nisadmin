import { observer } from "mobx-react";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ColumnProps } from "antd/lib/table";
import { getPageI, getPageO, qualityControlKeyApi } from "./api";
import { DatePicker, Button, Select } from "antd";
import { PageTitle, Place, PageHeader } from "src/components/common";
import BaseTable from "src/components/BaseTable";
import { appStore, authStore } from "src/stores";
import moment from "moment";
import { currentMonth } from "src/utils/date/rangeMethod";
import service from "src/services/api";

export default observer(function QualityControlKey(props) {
  let { history } = appStore;

  const [startDate, endTime] = currentMonth();
  const defaultParams = (): any => {
    return {
      deptCode: "",
      beginTime: startDate.format("YYYY-MM-DD HH:mm:ss"),
      endTime: endTime.format("YYYY-MM-DD HH:mm:ss"),
    };
  };
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<getPageO[]>([]);
  const [params, setParams] = useState<getPageI>(defaultParams);
  const getData = async () => {
    try {
      setLoading(true);
      const res = await qualityControlKeyApi.getPage(params);
      console.log("test-res", res);
      setData((res.data && (res.data.list as getPageO[])) || []);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };
  const [deptList, setDeptList] = useState([]);

  const getBigDeptList = async () => {
    const res = await service.commonApiService.getBigDeptList();
    setDeptList(res.data || []);
  };
  const open = (record: getPageO | null = null, isWatch: boolean = false) => {
    let text: string = "";
    record && (text = `?id=${(record as getPageO).id}`);
    isWatch && (text = text + `&isWatch=${isWatch}`);

    history.push("/QualityControlKeyDetail" + text);
  };
  const columns: ColumnProps<getPageO>[] = [
    {
      title: "序号",
      key: "",
      dataIndex: "",
      width: 50,
      align: "center",
      render: (text: any, record: any, index: number) => index + 1,
    },
    {
      title: "片区",
      key: "deptName",
      dataIndex: "deptName",
      width: 200,
      align: "center",
    },
    {
      title: "创建时间",
      key: "createTime",
      dataIndex: "createTime",
      width: 120,
      align: "center",
    },
    {
      title: "创建人",
      key: "creatorName",
      dataIndex: "creatorName",
      width: 120,
      align: "center",
    },
    {
      title: "操作",
      key: "",
      dataIndex: "",
      width: 100,
      align: "center",
      render: (text: any, record: any, index: number) => {
        let watch = <div onClick={() => open(record, true)}>查看</div>;
        let change = <div onClick={() => open(record, false)}>修改</div>;
        return (
          <ButtonBox>
            {(authStore.isDepartment ||
              authStore.isSupervisorNurse ||
              authStore.isRoleManage) &&
              watch}
            {(authStore.isSupervisorNurse || authStore.isRoleManage) && change}
          </ButtonBox>
        );
      },
    },
  ];
  useEffect(() => {
    getBigDeptList();
  }, []);
  useEffect(() => {
    getData();
  }, [params]);

  return (
    <Wrapper>
      <PageHeader>
        <PageTitle>片区质控重点</PageTitle>
        <Place />
        <span className="label">片区：</span>
        <Select
          value={params.deptCode}
          style={{ width: 180, marginRight: 15 }}
          showSearch
          onChange={(deptCode: string) => setParams({ ...params, deptCode })}
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
        <span className="label">创建时间：</span>
        <DatePicker.RangePicker
          allowClear={false}
          value={[moment(params.beginTime), moment(params.endTime)]}
          onChange={([m0, m1]: any[]) => {
            setParams({
              ...params,
              beginTime: m0.format("YYYY-MM-DD HH:mm:ss") || "",
              endTime: m1.format("YYYY-MM-DD HH:mm:ss") || "",
            });
          }}
          style={{ width: 200 }}
        />
        <Button className="statistics" onClick={getData}>
          查询
        </Button>
        {authStore.isSupervisorNurse || authStore.isRoleManage ? (
          <Button
            type="primary"
            className=""
            onClick={() => {
              open();
            }}
          >
            新建
          </Button>
        ) : (
          ""
        )}
      </PageHeader>
      <ContentCon>
        <BaseTable
          surplusWidth={1000}
          surplusHeight={220}
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

  .ant-table-column-sorters {
    width: 100%;
  }
`;
const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  div {
    cursor: pointer;
    color: #8bcc7a;
  }
  & > div + div {
    padding-left: 10px;
  }
`;
