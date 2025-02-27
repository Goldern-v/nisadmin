import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button, Select, Input, message } from "antd";
import BaseTabs from "src/components/BaseTabs";
import BaseTable, { DoCon } from "src/components/BaseTable";
import { auditEduPlantService } from "./api/AuditEduPlantService";
import { Place } from "src/components/common";
import { appStore, authStore } from "src/stores";
import { observer } from "mobx-react-lite";
import qs from "qs";
import createModal from "src/libs/createModal";
import AuditModal from "./components/AuditModal";

const Option = Select.Option;

export interface Props {
  btntop?: string | number,
  height?: string | number,
  surplusHeight?: number,
  handleRefresh?: Function,
}

export default observer(function AuditEduPlan(props: Props) {
  const { surplusHeight, handleRefresh, height, btntop } = props
  const auditModal = createModal(AuditModal);

  const { queryObj } = appStore;
  const [tableData, setTableData] = useState([] as any[]);
  const [loading, setLoading] = useState(false);
  const [dataTotal, setDataTotal] = useState(0);
  const [selectedRowKeys, setSelectRowKeys] = useState([] as any[]);
  const [selectedRows, setSelectRows] = useState([] as any[]);
  const [firstLevelMenu, setFirstLevelMenu] = useState([] as any[]);
  const [secondLevelMenu, setSecondLevelMenu] = useState([] as any[]);
  const [query, setQuery] = useState({
    firstLevelMenuId: queryObj.firstLevelMenuId || "",
    secondLevelMenuId: queryObj.secondLevelMenuId || "",
    keyWord: queryObj.keyWord || "",
    pageSize: queryObj.pageSize ? Number(queryObj.pageSize) : 20,
    pageIndex: queryObj.pageIndex ? Number(queryObj.pageIndex) : 1
  });
  const [activeKey, setActiveKey]: any = useState(queryObj.activeKey || "0");

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      setSelectRowKeys(selectedRowKeys);
      setSelectRows(selectedRows);
    }
  };

  const columns: any = [
    {
      title: "序号",
      dataIndex: "",
      key: "",
      render: (text: any, record: any, index: number) =>
        (query.pageIndex - 1) * query.pageSize + index + 1,
      align: "center",
      width: 40
    },
    {
      title: "一级分类",
      dataIndex: "firstLevelMenuName",
      align: "center",
      width: 100
    },
    {
      title: "二级分类",
      dataIndex: "secondLevelMenuName",
      align: "center",
      width: 100
    },
    {
      title: "培训类型",
      dataIndex: "thirdLevelMenuName",
      align: "center",
      width: 100
    },
    {
      title: "教学方式",
      dataIndex: "teachingMethodName",
      align: "center",
      className: "teaching-method-name",
      width: 60,
      render: (text: string) => {
        let bgColor = "";
        let textColor = "";

        switch (text) {
          case "学习":
            bgColor = "#EEFDEE";
            textColor = "#4CA21D";
            break;
          case "培训":
            bgColor = "#FDF8E6";
            textColor = "#DD7316";
            break;
          case "考试":
            bgColor = "#FCECE9";
            textColor = "#EA3838";
            break;
          case "练习":
            bgColor = "#EEF1FF";
            textColor = "#2754A8";
            break;
          case "实操":
            bgColor = "#F0F8F8";
            textColor = "#006667";
            break;
          case "演练":
            bgColor = "#FAEAFB";
            textColor = "#AB2892";
            break;
          default:
        }

        return (
          <div
            className="teaching-method-item"
            style={{ backgroundColor: bgColor }}
          >
            <span style={{ color: textColor }}>{text}</span>
          </div>
        );
      }
    },
    {
      title: "标题",
      dataIndex: "title",
      align: "left",
      width: 180
    },
    {
      title: "状态",
      dataIndex: "statusDesc",
      width: 100,
      align: "center",
      render: (text: string) => {
        let textColor = "";
        switch (text) {
          case "发布":
            textColor = "#00F";
            break;
          case "退回":
            textColor = "#F00";
            break;
          default:
        }

        return <span style={{ color: textColor }}>{text}</span>;
      }
    },
    {
      title: "提交人",
      dataIndex: "submitterEmpName",
      width: 90,
      align: "center"
    },
    {
      title: "提交时间",
      dataIndex: "submitTime",
      width: 130,
      align: "center"
    },
    {
      title: "操作",
      key: "8",
      width: 60,
      align: "center",
      render: (text: any, record: any, c: any) => {
        return (
          <DoCon>
            <span onClick={() => handleDetail(record)}>
              {activeKey == 0 ? "审核" : "查看"}
            </span>
          </DoCon>
        );
      }
    }
  ];

  const handlePageChange = (pageIndex: number) => {
    setQuery({ ...query, pageIndex });
  };

  const handlePageSizeChange = (pageIndex: number, pageSize: number) => {
    setQuery({ ...query, pageSize, pageIndex: 1 });
  };

  const handleAuditOpen = () => {
    if (selectedRowKeys.length <= 0) {
      message.warning("未选择审核项目");
      return;
    }

    let taskIdList = selectedRows.map((item: any) => item.taskId);

    auditModal.show({
      taskIdList,
      onOkCallBack: () => getTableData(query)
    });
  };

  const handleDetail = (record: any) => {
    let newQuery = {
      id: record.cetpId,
      taskId: record.taskId,
      statusDesc: record.statusDesc
    } as any;

    if (activeKey == "0") newQuery.audit = true;

    appStore.history.push(`/trainingInfoReview?${qs.stringify(newQuery)}`);
  };

  const AuditPannel = (
    <div>
      <GroupPostBtn
        btntop={btntop || ''}
        onClick={() => getTableData(query)}>
        刷新
        </GroupPostBtn>
      {activeKey == 0 && (
        <GroupPostBtn
          btntop={btntop || ''}
          onClick={handleAuditOpen}
          style={{ right: 110 }}>
          批量审核
        </GroupPostBtn>
      )}
      <BaseTable
        surplusHeight={surplusHeight || 280}
        dataSource={tableData}
        loading={loading}
        columns={columns}
        onRow={(record: any) => {
          return {
            onDoubleClick: () => handleDetail(record)
          };
        }}
        rowSelection={activeKey == 0 ? rowSelection : undefined}
        pagination={{
          pageSizeOptions: ["10", "15", "20", "30", "50"],
          total: dataTotal,
          onChange: handlePageChange,
          onShowSizeChange: handlePageSizeChange,
          current: query.pageIndex,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSize: query.pageSize
        }}
      />
    </div>
  );

  const tabList = [
    {
      title: "待我审核",
      component: AuditPannel
    },
    {
      title: "我已审核",
      component: AuditPannel
    }
  ];

  const getTableData = (query: any) => {
    setLoading(true);
    setSelectRowKeys([]);
    setSelectRows([]);
    appStore.history.replace(
      `/continuingEdu/审核发布?${qs.stringify({
        ...appStore.queryObj,
        ...query,
        activeKey,
        tagId: '1'
      })}`
    );
    let req = (query: any) => {
      if (activeKey == 0) {
        return auditEduPlantService.queryToAuditPageList(query);
      } else {
        return auditEduPlantService.queryAuditedPageList(query);
      }
    };

    req({
      ...query,
      firstLevelMenuId: query.firstLevelMenuId
        ? Number(query.firstLevelMenuId)
        : "",
      secondLevelMenuId: query.secondLevelMenuId
        ? Number(query.secondLevelMenuId)
        : ""
    }).then(
      res => {
        setLoading(false);
        if (res.data) {
          setDataTotal(res.data.totalCount);
          setTableData(res.data.list);
        }
      },
      () => setLoading(false)
    );
  };

  const handleSearch = () => {
    setQuery({ ...query, pageIndex: 1 });
  };
  const getMenuInfo = () => {
    auditEduPlantService.getMenuTree().then(res => {
      if (res.data) {
        setFirstLevelMenu(res.data);
        let target = res.data.find(
          (item: any) => item.id == query.firstLevelMenuId
        );
        if (target) setSecondLevelMenu(target.childList || []);
      }
    });
  };

  useEffect(() => {
    getTableData(query);
  }, [query, activeKey]);

  useEffect(() => {
    handleRefresh && handleRefresh()
  }, [tableData])

  useEffect(() => {
    getMenuInfo();
  }, []);

  return (
    <Wrapper height={height || ''}>
      <HeaderCon>
        <Title>审核发布</Title>
        <Place />
        <span style={{ marginLeft: 15 }}>一级分类：</span>
        <Select
          value={query.firstLevelMenuId}
          style={{ width: 120 }}
          onChange={(id: string | number) => {
            setQuery({
              ...query,
              pageIndex: 1,
              firstLevelMenuId: id,
              secondLevelMenuId: ""
            });
            let newArr = [] as any[];
            let target = firstLevelMenu.find((item: any) => item.id == id);
            if (target && target.childList) newArr = target.childList;
            setSecondLevelMenu(newArr);
          }}
        >
          <Option value="">全部</Option>
          {firstLevelMenu.map((item: any, idx: number) => (
            <Option value={item.id.toString()} key={idx}>
              {item.name}
            </Option>
          ))}
        </Select>
        <span style={{ marginLeft: 15 }}>二级分类：</span>
        <Select
          value={query.secondLevelMenuId}
          style={{ width: 120 }}
          onChange={(id: number) =>
            setQuery({ ...query, pageIndex: 1, secondLevelMenuId: id })
          }
        >
          <Option value="">全部</Option>
          {secondLevelMenu.map((item: any, idx: number) => (
            <Option value={item.id.toString()} key={idx}>
              {item.name}
            </Option>
          ))}
        </Select>
        <Input
          placeholder="输入关键字，包括标题、提交人"
          style={{ width: 240, marginLeft: 15 }}
          allowClear
          defaultValue={query.keyWord}
          onBlur={(e: any) =>
            setQuery({ ...query, pageIndex: 1, keyWord: e.target.value })
          }
        />
        <Button
          type="primary"
          onClick={handleSearch}
          style={{ marginLeft: 15 }}
        >
          搜索
        </Button>
      </HeaderCon>
      <ScrollCon>
        <BodyWarpper>
          <MainCon>
            <BaseTabs
              defaultActiveKey={activeKey}
              config={tabList}
              onChange={(key: any) => {
                setActiveKey(key);
                setQuery({ ...query, pageIndex: 1 });
              }}
            />
          </MainCon>
        </BodyWarpper>
      </ScrollCon>
      <auditModal.Component />
    </Wrapper>
  );
});

const Wrapper = styled.div<{ height?: string | number }>`
  padding: ${p => p.theme.$mcp};
  padding-bottom: 0;
  height: ${p => p.height || 'calc(100% - 49px)'};
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 195px;

  .teaching-method-name {
    position: relative;
    .teaching-method-item {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      span {
        cursor: default;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
`;

const HeaderCon = styled.div`
  display: flex;
  align-items: center;
  color: #333;
  height: 32px;
`;
const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #333;
`;

const ScrollCon = styled.div`
  flex: 1;
  overflow: auto;
  margin: 0 -15px;
  /* padding: ${p => p.theme.$mcp}; */
`;

const BodyWarpper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const MainCon = styled.div`
  flex: 1;
  align-items: stretch;
  display: flex;
  margin: 20px;
`;

const GroupPostBtn = styled(Button) <{ btntop?: string | number }>`
  position: fixed !important;
  top: ${p => p.btntop || '121px'};
  right: 33px;
`;
