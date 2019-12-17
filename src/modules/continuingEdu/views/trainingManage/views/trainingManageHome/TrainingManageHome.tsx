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
  Popover
} from "src/vendors/antd";
import DeptSelect from "src/components/DeptSelect";
import { appStore, authStore } from "src/stores";
import { observer } from "mobx-react-lite";
import { DictItem } from "src/services/api/CommonApiService";
import BaseTabs, { ConfigItem } from "src/components/BaseTabs";
import TabTable from "./components/TabTable";
import createdSelectItem from "./components/createdSelectItem";
export interface Props {}
export default observer(function TrainingManageHome() {
  const [popoverVisible, setPopoverVisible]: any = useState(false);
  const [tableObj, setTableObj] = useState({
    pageLoading: false,
    pageIndex: 1,
    pageSize: 20,
    total: 0,
    dataSource: []
  });

  let jxdxSelectItem = createdSelectItem({
    label: "教学对象",
    list: [
      { code: "", name: "全部" },
      { code: "新职工培训", name: "新职工培训" }
    ],
    initValue: "",
    width: 100
  });

  let lxSelectItem = createdSelectItem({
    label: "类型",
    list: [
      { code: "", name: "全部" },
      { code: "新职工培训", name: "新职工培训" }
    ],
    initValue: "",
    width: 200
  });
  let nfSelectItem = createdSelectItem({
    label: "年份",
    list: [
      { code: "", name: "全部" },
      { code: "新职工培训", name: "新职工培训" }
    ],
    initValue: "",
    width: 100
  });
  let yfSelectItem = createdSelectItem({
    label: "月份",
    list: [
      { code: "", name: "全部" },
      { code: "新职工培训", name: "新职工培训" }
    ],
    initValue: "",
    width: 100
  });
  let cjzSelectItem = createdSelectItem({
    label: "创建者",
    list: [
      { code: "", name: "全部" },
      { code: "新职工培训", name: "新职工培训" }
    ],
    initValue: "",
    width: 100
  });
  let bmSelectItem = createdSelectItem({
    label: "报名",
    list: [
      { code: "", name: "全部" },
      { code: "新职工培训", name: "新职工培训" }
    ],
    initValue: "",
    width: 100
  });
  let qdSelectItem = createdSelectItem({
    label: "签到",
    list: [
      { code: "", name: "全部" },
      { code: "新职工培训", name: "新职工培训" }
    ],
    initValue: "",
    width: 100
  });

  const popoverContent = (
    <PopoverCon>
      <nfSelectItem.Component />
      <yfSelectItem.Component />
      <cjzSelectItem.Component />
      <bmSelectItem.Component />
      <qdSelectItem.Component />
    </PopoverCon>
  );

  let tabConfig: ConfigItem[] = [
    {
      title: "已发布",
      component: <TabTable tableObj={tableObj} setTableObj={setTableObj} />,
      index: 1
    }
  ];

  const getData = () => {
    // setPageLoading(true);
  };

  const onDetail = (record: any) => {};
  useEffect(() => {
    getData();
  }, []);

  return (
    <Wrapper>
      <PageHeader>
        <PageTitle>培训管理</PageTitle>
        <Place />
        <jxdxSelectItem.Component />
        <lxSelectItem.Component />
        <Input placeholder={"请输入标题关键字"} style={{ width: 150 }} />

        <Popover
          placement="bottomRight"
          title={""}
          content={popoverContent}
          visible={popoverVisible}
        >
          <Button onClick={() => setPopoverVisible(!popoverVisible)}>
            {popoverVisible ? "收起筛选" : "展开筛选"}
          </Button>
        </Popover>
        <Button type="primary" onClick={() => getData()}>
          查询
        </Button>
        <Button type="primary" onClick={() => {}}>
          添加
        </Button>
        <Button>导出</Button>
      </PageHeader>
      <BaseTabCon>
        <BaseTabs config={tabConfig} />
      </BaseTabCon>
    </Wrapper>
  );
});
const Wrapper = styled.div``;
const BaseTabCon = styled.div`
  margin: 0 15px;
`;

const PopoverCon = styled.div`
  display: flex;
  align-items: center;
`;
