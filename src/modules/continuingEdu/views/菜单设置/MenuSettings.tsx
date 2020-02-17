import styled from "styled-components";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { observer } from "mobx-react-lite";
import BaseTable, { DoCon, TabledCon } from "src/components/BaseTable";
import { appStore } from "src/stores/index";
import { Button, Modal, message as Message } from "antd";
import { meunSettingApi } from "./api/MeunSettingApi";
import qs from "qs";
export default observer(function MenuSettings() {
  const [effect, setEffect] = useState(true);
  const [loading, setLoading] = useState(false); // loading
  const [tableList, setTableList] = useState([] as any); //表格数据
  const [totalCount, setTotalCount] = useState(Number); // 总页码
  const [empName, setEmpName] = useState(String);
  const [query, setQuery] = useState({
    pageSize: 20,
    pageIndex: 1
  } as any);

  const columns: any = [
    {
      title: "菜单设置",
      key: "0",
      dataIndex: "name",
      align: "left"
    },
    {
      title: "排序",
      key: "1",
      dataIndex: "sort",
      align: "center",
      width: 50
    },
    {
      title: "提交人",
      key: "2",
      dataIndex: "",
      align: "center",
      width: 175,
      render(text: any, record: any, index: number) {
        if (record.submitEmployees) {
          for (let i = 0; i < record.submitEmployees.length; i++) {
            setEmpName(record.submitEmployees[i].empName);
          }
        }
        return empName;
      }
    },
    {
      title: "一级审核",
      key: "3",
      dataIndex: "",
      align: "center",
      width: 175
    },
    {
      title: "二级审核",
      key: "4",
      dataIndex: "",
      align: "center",
      width: 175
    },
    {
      title: "三级审核",
      key: "5",
      dataIndex: "",
      align: "center",
      width: 175
    },
    {
      title: "操作",
      key: "6",
      dataIndex: "",
      width: 120,
      align: "center",
      render(text: any, record: any, index: number) {
        return (
          <DoCon>
            <span onClick={() => {}}>修改</span>
            <span onClick={() => handleDelete(record)}>删除</span>
          </DoCon>
        );
      }
    }
  ];

  const qqq = (record: any) => {
    console.log(record);
  };
  // for (let i = 0; i < sheetViewModal.arrangeMenu.length; i++) {
  //   let obj: any = {
  //     name: sheetViewModal.arrangeMenu[i].name
  //   };
  //   for (let d of sheetViewModal.dateList) {
  //     obj[d] = allCell.filter(
  //       (item: any) => item.workDate == d && item.rangeName == obj.name
  //     );
  //   }
  //   list.push(obj);

  useLayoutEffect(() => {
    setEffect(false);
  }, []);

  // 初始化
  useEffect(() => {
    setEffect(true);
    getTableData();
  }, [query]);

  // 查询
  const getTableData = () => {
    if (effect) {
      setLoading(true);
      meunSettingApi.getGetData().then((res: any) => {
        setLoading(false);
        if (res.data) {
          console.log(res.data);
          setTableList(res.data || []);
        }
      });
    }
  };

  //删除
  const handleDelete = (record: any) => {
    console.log(record);
    meunSettingApi.whetherPlan(record.id).then(res => {
      console.log(res.data.flag);
      if (!res.data.flag) {
        Modal.confirm({
          title: "提示",
          content: "【新护士培训】已创建教学记录，无法删除",
          okText: "确定",
          onOk: () => {}
        });
      } else {
        Modal.confirm({
          title: "提示",
          content,
          okText: "确定",
          okType: "danger",
          cancelText: "取消",
          onOk: () => {
            meunSettingApi
              .del(record.id)
              .then(res => {
                if (res.code == 200) {
                  Message.success("文件删除成功");
                  getTableData();
                } else {
                  Message.error("文件删除失败");
                }
              })
              .catch(err => {
                Message.error("文件删除失败");
              });
          }
        });
      }
    });
    let content = (
      <div>
        <div>【操作培训】没有创建教学记录，确定是否删除？</div>
        <div> 删除后无法恢复。</div>
      </div>
    );
  };

  return (
    <Wrapper>
      <Con>
        <TopHeader>
          <div className="topHeaderTitle">
            <div className="title">菜单设置</div>
            <div className="topHeaderButton">
              <Button type="primary">添加一级菜单</Button>
              <Button type="primary">添加二级菜单</Button>
            </div>
          </div>
        </TopHeader>
      </Con>
      <Content>
        <BaseTable
          loading={loading}
          columns={columns}
          dataSource={tableList}
          childrenColumnName="childList"
          type={[]}
          surplusWidth={300}
          surplusHeight={240}
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
});
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
  height: 50px;
  padding: 0 15px;
  box-sizing: border-box;
  margin-bottom: 10px;
  line-height: 50px;
`;
const TopHeader = styled.div`
  .topHeaderTitle {
    margin-top: 2px;
    font-size: 20px;
    font-weight: 500;
    color: #000;
    .topHeaderButton {
      position: absolute;
      top: 5px;
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
