import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { TabledCon } from "src/components/BaseTable";
import YearPicker from "src/components/YearPicker";
import {
  Select,
  Button,
  message,
  Modal
} from "src/vendors/antd";
import BaseTable, { DoCon } from "src/components/BaseTable";
import { workloadModal } from "./WorkloadModal";
import { workloadApi } from "./api/WorkloadApi";
import WorkloadEditModal from "./modal/WorkloadEditModal";
import { authStore } from "src/stores";

interface Props {
  getTitle: string;
  indexKey: any;
}

export default observer(function TraineeFiles(props: Props) {
  const { getTitle, indexKey } = props;
  const titleArr = ['服务之星', '技术能手'];
  const [editParams, setEditParams] = useState({} as any); //修改弹窗回显数据
  const [editVisible, setEditVisible] = useState(false); //弹窗开关
  const monthList = (() => {
    let currentMonth = 12;
    let monthArr = []
    while (currentMonth--) {
      monthArr.push(currentMonth + 1)
    }
    return monthArr
  })(); //月份
  const specialColumn = titleArr.includes(getTitle) ? [
    {
      title: "创建时间",
      dataIndex: "createDate",
      width: 100,
      align: "center"
    },
    {
      title: "操作",
      dataIndex: "",
      width: 100,
      align: "center",
      render(text: any, record: any) {
        return (
          <DoCon>
            <span onClick={() => saveOrUpload(record)}>修改</span>
            <span onClick={() => handleDelete(record)}>删除</span>
          </DoCon>
        );
      }
    }
  ] : [
    {
      title: "工作量",
      dataIndex: "workSize",
      width: 100,
      align: "center"
    }
  ]; //单独处理特殊列

  // 初始化数据
  useEffect(() => {
    workloadModal.indexKey = indexKey;
    workloadModal.title = getTitle;
    workloadModal.init();
  }, [indexKey]);

  //表格列
  const columns: any = [
    {
      title: "序号",
      dataIndex: "",
      key: "",
      render: (text: any, record: any, index: number) => index + 1,
      align: "center",
      width: 60
    },
    {
      title: "标题",
      dataIndex: "title",
      width: 100,
      align: "center"
    },
    {
      title: "姓名",
      dataIndex: "empName",
      width: 80,
      align: "center"
    },
    {
      title: "科室",
      dataIndex: "deptName",
      width: 150,
      align: "center"
    },
    {
      title: "月份",
      dataIndex: "month",
      width: 120,
      align: "center",
      render: (text: string, record: any) => text ? `${record.year}年${text}月` : ''
    },
    ...specialColumn
  ];

  //删除
  const handleDelete = (record: any) => {
    let content = (
      <div>
        <div>您确定要删除选中的记录吗？</div>
      </div>
    );
    Modal.confirm({
      title: "提示",
      content,
      okText: "确定",
      okType: "danger",
      cancelText: "取消",
      onOk: () => {
        const deleteReq = ((indexKey: string) => {
          switch (indexKey) {
            case '2':
              return workloadApi.deleteInfoJsns.bind(workloadApi)
            case '3':
              return workloadApi.deleteInfoGzltj.bind(workloadApi)
            default:
              return workloadApi.deleteInfoFwzx.bind(workloadApi)
          }
        })(indexKey)

        deleteReq(record.id).then((res: any) => {
          message.success("记录删除成功")
          workloadModal.onload()
        }).catch((e: any) => { });
      }
    });
  };

  // 保存
  const saveOrUpload = (record: any) => {
    setEditParams(record);
    setEditVisible(true);
  };

  // 弹窗
  const handleEditCancel = () => {
    setEditVisible(false);
    setEditParams({});
  };
  const handleEditOk = () => {
    workloadModal.onload();
    handleEditCancel();
  };

  return (
    <Wrapper>
      <PageHeader>
        <LeftIcon>{getTitle}</LeftIcon>
        <RightIcon>
          <span>年份：</span>
          <YearPicker
            allowClear={false}
            style={{ width: 120 }}
            value={workloadModal.selectedYear}
            onChange={(year: any) => {
              workloadModal.selectedYear = year;
              workloadModal.onload();
            }}
          />
          <span>月份：</span>
          <Select
            style={{ width: 100 }}
            value={workloadModal.month}
            onChange={(val: string) => {
              workloadModal.month = val;
              workloadModal.pageIndex = 1;
              workloadModal.onload();
            }}
          >
            <Select.Option value="">全部</Select.Option>
            {monthList.map((month: number) =>
              <Select.Option value={`${month}`} key={month}>{month}月</Select.Option>
            )}
          </Select>
          <span>科室：</span>
          <Select
            style={{ width: 150 }}
            showSearch
            filterOption={(input: any, option: any) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            value={workloadModal.deptCode}
            onChange={(val: string) => {
              workloadModal.deptCode = val;
              workloadModal.pageIndex = 1;
              workloadModal.onload();
            }}
          >
            <Select.Option value="">全部</Select.Option>
            {authStore.deptList.map((dept) => <Select.Option value={dept.code} key={dept.code}>{dept.name}</Select.Option>)}
          </Select>
          <Button
            type="primary"
            onClick={() => {
              workloadModal.onload();
            }}
          >
            查询
          </Button>
          <Button
            onClick={() => {
              workloadModal.export();
            }}
          >
            导出
          </Button>
          <Button onClick={() => setEditVisible(true)}>新建</Button>
        </RightIcon>
      </PageHeader>
      <Content>
        <BaseTable
          loading={workloadModal.tableLoading}
          dataSource={workloadModal.tableList}
          columns={columns}
          surplusWidth={300}
          surplusHeight={230}
          pagination={{
            current: workloadModal.pageIndex,
            total: workloadModal.total,
            pageSize: workloadModal.pageSize
          }}
          onChange={pagination => {
            workloadModal.pageIndex = pagination.current;
            workloadModal.total = pagination.total;
            workloadModal.pageSize = pagination.pageSize;
            workloadModal.onload();
          }}
        />
      </Content>
      <WorkloadEditModal
        visible={editVisible}
        params={editParams}
        onCancel={handleEditCancel}
        onOk={handleEditOk}
      />
    </Wrapper>
  );
});
const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;
const PageHeader = styled.div`
  width: calc(100vw - 200px);
  justify-content: space-between;
  height: 55px;
  font-size: 13px;
  color: #333;
  padding: 12px 20px 0 20px;
  .ant-select {
    width: 150px;
    margin-right: 15px;
  }
  .ant-calendar-picker {
    margin-right: 15px;
  }
  button {
    margin-left: 10px;
  }
  .checkButton {
    margin-left: 0px;
  }
  .ant-select-selection-selected-value span {
    color: #000 !important;
  }
`;
const LeftIcon = styled.div`
  padding: 0;
  float: left;
  font-size: 20px;
  font-weight: bold;
`;

const RightIcon = styled.div`
  padding: 0 0 0 15px;
  float: right;
  .dept {
    width: 180;
    display: inline-block !important
  }
`;

// @ts-ignore
const Content = styled(TabledCon)`
  box-sizing: border-box;
`;
