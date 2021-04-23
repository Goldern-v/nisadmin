import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { TabledCon } from "src/components/BaseTable";
import YearPicker from "src/components/YearPicker";
import {
  Select,
  Button,
  message as Message,
  Modal
} from "src/vendors/antd";
import BaseTable, { DoCon } from "src/components/BaseTable";
import DeptSelect from "src/components/DeptSelect";
import { workloadModal } from "./WorkloadModal";
import { workloadApi } from "./api/WorkloadApi";
import WorkloadEditModal from "./modal/WorkloadEditModal";
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
      dataIndex: "identifier",
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
      dataIndex: "identifier",
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
      dataIndex: "identifier",
      width: 100,
      align: "center"
    },
    {
      title: "姓名",
      dataIndex: "name",
      width: 80,
      align: "center"
    },
    {
      title: "病区",
      dataIndex: "sex",
      width: 60,
      align: "center"
    },
    {
      title: "科室",
      dataIndex: "schoolName",
      width: 150,
      align: "center"
    },
    {
      title: "月份",
      dataIndex: "major",
      width: 120,
      align: "center"
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
        let ajaxMap: any = {
          1: "deleteInfoFwzx",
          2: "deleteInfoJsns",
          3: "deleteInfoGzltj"
        };
        (workloadApi as any)[ajaxMap[indexKey as any] as any](record.id).then((res: any) => {
          //     if (res.code == 200) {
          //       Message.success("记录删除成功");
          //       workloadModal.pageIndex = 1;
          //       workloadModal.onload();
          //     } else {
          //       Message.error(`${res.dec}`);
          //     }
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
          <span>月：</span>
          <Select
            style={{ width: 100 }}
            value={workloadModal.selectedMonth}
            onChange={(val: string) => {
              workloadModal.selectedMonth = val;
              workloadModal.pageIndex = 1;
              workloadModal.onload();
            }}
          >
            <Select.Option value="">全部</Select.Option>
            {monthList.map((month: number) =>
              <Select.Option value={`${month}`} key={month}>{month}</Select.Option>
            )}
          </Select>
          <span>病区：</span>
          <Select
            style={{ width: 150 }}
            value={workloadModal.selectedBq}
            onChange={(val: string) => {
              workloadModal.selectedBq = val;
              workloadModal.pageIndex = 1;
              workloadModal.onload();
            }}
          >
            <Select.Option value="">全部</Select.Option>
          </Select>

          {/* 工作量统计单独有科室下拉框 */}
          {getTitle === '工作量统计' &&
            <React.Fragment>
              <span>科室：</span>
              <div className="dept">
                <DeptSelect
                  onChange={(val: string) => {
                    workloadModal.selectedDept = val;
                    workloadModal.pageIndex = 1;
                    workloadModal.onload();
                  }}
                />
              </div>
            </React.Fragment>
          }

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
  width: calc(100vw-200px);
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
  font-size: 18px;
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
