import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import BaseTable, { DoCon, TabledCon } from "src/components/BaseTable";
import MergeTh from "../../../../components/mergeTh/MergeTh";
import BreadcrumbBox from "src/layouts/components/BreadcrumbBox";
import { withRouter } from "react-router-dom";
import { appStore } from "src/stores/index";
import { Button } from "antd";
import qs from "qs";
export default withRouter(
  observer(function TypeManagement() {
    const [titleType, setTitleType] = useState({} as any);
    const [loading, setLoading] = useState(false); // loading
    const [tableList, setTableList] = useState([] as any); //表格数据
    const [totalCount, setTotalCount] = useState(Number); // 总页码
    const [query, setQuery] = useState({
      pageSize: 20,
      pageIndex: 1
    } as any);

    const columns: any = [
      {
        title: "序号",
        width: 50,
        render(text: string, record: any, index: number) {
          return index + 1;
        }
      },
      {
        title: "名称",
        dataIndex: "fileName",
        align: "left"
      },
      {
        title: "教学方式",
        dataIndex: "",
        align: "center",
        width: 200
      },
      {
        title: "显示顺序",
        dataIndex: "",
        align: "center",
        width: 120
      },

      {
        title: "操作",
        dataIndex: "",
        width: 80,
        align: "center",
        render(text: any, record: any, index: number) {
          return (
            <DoCon>
              <span onClick={() => {}}>操作</span>
            </DoCon>
          );
        }
      }
    ];

    // 初始化
    useEffect(() => {
      setTitleType(qs.parse(appStore.location.search.replace("?", "")));
      getTableData();
    }, [query, titleType]);

    // 查询
    const getTableData = () => {};

    return (
      <Wrapper>
        <Con>
          <TopHeader>
            <BreadcrumbBox
              style={{
                paddingLeft: 0,
                paddingTop: 10,
                paddingBottom: 2,
                background: "rgba(0, 0, 0, 0)"
              }}
              data={[
                {
                  name: `${titleType.type}`,
                  link: `/continuingEdu/${titleType.type}`
                },
                {
                  name: "类型管理"
                }
              ]}
            />
            <div className="topHeaderTitle">
              <div className="title">类型管理</div>
              <div className="topHeaderButton">
                <Button type="primary">添加类型</Button>
                <Button
                  onClick={() => {
                    appStore.history.push(`/continuingEdu/${titleType.type}`);
                  }}
                >
                  返回
                </Button>
              </div>
            </div>
          </TopHeader>
        </Con>

        <Content>
          <BaseTable
            loading={loading}
            columns={columns}
            dataSource={tableList}
            type={["index", "fixedIndex"]}
            surplusWidth={300}
            surplusHeight={260}
            pagination={{
              pageSizeOptions: ["10", "20", "30", "40", "50"],
              onShowSizeChange: (pageIndex, pageSize) =>
                setQuery({ ...query, pageSize }),
              onChange: (pageIndex, pageSize) =>
                setQuery({ ...query, pageIndex }),
              total: totalCount,
              showSizeChanger: true,
              showQuickJumper: true,
              pageSize: query.pageSize,
              current: query.pageIndex
            }}
          />
        </Content>
      </Wrapper>
    );
  })
);
const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  /deep/.gWDyQg {
    background: #red !important;
  }
`;
const Content = styled(TabledCon)`
  padding: 0 15px;
  box-sizing: border-box;
`;
const Con = styled.div`
  height: 76px;
  padding: 0 15px;
  box-sizing: border-box;
  margin-bottom: 10px;
`;
const TopHeader = styled.div`
  .topHeaderClass {
    font-size: 14px;
    margin-top: 13px;
    color: #999;
    .topHeaderSpan1 {
      cursor: pointer;
    }
    .topHeaderSpan1:hover {
      color: #00a680;
    }
    .topHeaderSpan2 {
      cursor: pointer;
    }
    .topHeaderSpan2:hover {
      color: #00a680;
    }
  }
  .topHeaderTitle {
    margin-top: 2px;
    font-size: 20px;
    font-weight: 500;
    color: #000;
    .topHeaderButton {
      position: absolute;
      top: 30px;
      right: 20px;
      button {
        margin-left: 10px;
      }
    }
    .title {
      font-weight: bold;
    }
  }
  .topHeaderStatus {
    height: 25px;
    line-height: 25px;
    color: #999;
  }
`;
