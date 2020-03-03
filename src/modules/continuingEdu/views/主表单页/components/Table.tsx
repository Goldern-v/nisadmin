import styled from "styled-components";
import React from "react";
import BaseTable, { TabledCon, DoCon } from "src/components/BaseTable";
import { message as Message, Modal } from "src/vendors/antd";
import { observer } from "src/vendors/mobx-react-lite";
import { mainPageModal } from "../MainPageModal";
import MergeTh from "../../../components/mergeTh/MergeTh";
import { mainPageApi } from "../api/MainPageApi";

interface Props {
  getId: any;
}

export default observer(function Table(props: Props) {
  let id = props.getId || "";

  const columns: any = [
    {
      title: "序号",
      width: 50,
      align: "center",
      render(text: string, record: any, index: number) {
        return index + 1;
      }
    },
    {
      title: "开始时间",
      dataIndex: "startTime",
      width: 130,
      align: "center"
    },
    {
      title: "结束时间",
      dataIndex: "endTime",
      width: 130,
      align: "center"
    },
    {
      title: "类型",
      dataIndex: "thirdLevelMenuName",
      width: 130,
      align: "center"
    },
    {
      title: "标题",
      dataIndex: "title",
      width: 130,
      align: "center"
    },
    {
      title: "教学方式",
      dataIndex: "teachingMethod",
      width: 130,
      align: "center",
      render(teachingMethod: any, record: any) {
        //1.学习、2培训、3考试、4练习、5实操、6演练
        const teachingMethodArray = [
          "学习",
          "培训",
          "考试",
          "练习",
          "实操",
          "演练"
        ];
        return teachingMethodArray[teachingMethod - 1];
      }
    },
    {
      title: () => {
        return (
          <MergeTh
            mainTitle="培训对象（必修√/选修△）"
            children={["N0", "N1", "N2", "N3", "N4", "其他"]}
          />
        );
      },
      colSpan: 7,
      width: 280
    },
    {
      title: "N0",
      colSpan: 0
    },
    {
      title: "N1",
      colSpan: 0
    },
    {
      title: "N2",
      colSpan: 0
    },
    {
      title: "N3",
      colSpan: 0
    },
    {
      title: "N4",
      colSpan: 0
    },
    {
      title: "其他",
      colSpan: 0
    },
    {
      title: "管理人员",
      dataIndex: "",
      width: 130,
      align: "center"
    },
    {
      title: () => {
        return <MergeTh mainTitle="组织方式" children={["线上", "线下"]} />;
      },
      colSpan: 3,
      width: 100
    },
    {
      title: "线上",
      colSpan: 0
    },
    {
      title: "线下",
      colSpan: 0
    },
    {
      title: () => {
        return (
          <MergeTh
            mainTitle="学习资料"
            children={["课件", "视频", "题库(题)"]}
          />
        );
      },
      colSpan: 4,
      width: 180
    },
    {
      title: "课件",
      colSpan: 0
    },
    {
      title: "视频",
      colSpan: 0
    },
    {
      title: "题库(题)",
      colSpan: 0
    },
    {
      title: "学分",
      dataIndex: "",
      width: 130,
      align: "center"
    },
    {
      title: "学时",
      dataIndex: "",
      width: 50,
      align: "center"
    },
    {
      title: "状态",
      dataIndex: "statusDesc",
      width: 80,
      align: "center",
      render(statusDesc: any, record: any) {
        switch (statusDesc) {
          case "待审核":
            return <span style={{ color: "#284fc2" }}>{statusDesc}</span>;
          case "进行中":
            return <span style={{ color: "#E63122" }}>({statusDesc}</span>;
          case "退回":
            return <span style={{ color: "##FF9C35" }}>{statusDesc}</span>;
          default:
            return <span style={{ color: "#000" }}>{statusDesc}</span>;
        }
      }
    },
    {
      title: "备注",
      dataIndex: "",
      width: 150,
      align: "center"
    },
    {
      title: "操作",
      dataIndex: "",
      width: 180,
      align: "center",
      render(text: any, record: any, index: number) {
        switch (record.statusDesc) {
          case "待审核":
            return (
              <DoCon>
                <span onClick={() => {}}>查看结果</span>
                <span onClick={() => {}}>查看信息</span>
                <span onClick={() => handleRevoke(record)}>撤销</span>
              </DoCon>
            );
          case "进行中":
            return (
              <DoCon>
                <span onClick={() => {}}>查看结果</span>
                <span onClick={() => {}}>查看信息</span>
                <span onClick={() => handleDelete(record)}>删除</span>
              </DoCon>
            );
          case "退回":
            return (
              <DoCon>
                <span onClick={() => {}}>修改</span>
                <span onClick={() => handleDelete(record)}>删除</span>
              </DoCon>
            );
          case "草稿":
            return (
              <DoCon>
                <span onClick={() => {}}>修改</span>
                <span onClick={() => handleDelete(record)}>删除</span>
              </DoCon>
            );
          case "已结束":
            return (
              <DoCon>
                <span onClick={() => {}}>查看结果</span>
                <span onClick={() => {}}>查看信息</span>
              </DoCon>
            );
          default:
            return (
              <DoCon>
                <span>暂无操作</span>
              </DoCon>
            );
        }
      }
    }
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
        mainPageApi
          .delMainData(record.id)
          .then(res => {
            if (res.code == 200) {
              Message.success("文件删除成功");
              mainPageModal.onload();
            } else {
              Message.error("文件删除失败");
            }
          })
          .catch(err => {
            Message.error("文件删除失败");
          });
      }
    });
  };

  //撤销
  const handleRevoke = (record: any) => {
    let content = (
      <div>
        <div>您确定要撤销选中的记录吗？</div>
      </div>
    );
    Modal.confirm({
      title: "提示",
      content,
      okText: "确定",
      okType: "danger",
      cancelText: "取消",
      onOk: () => {
        mainPageApi
          .delMainData(record.id)
          .then(res => {
            if (res.code == 200) {
              Message.success("文件撤销成功");
              mainPageModal.onload();
            } else {
              Message.error("文件撤销失败");
            }
          })
          .catch(err => {
            Message.error("文件撤销失败");
          });
      }
    });
  };

  return (
    <Wrapper>
      <BaseTable
        loading={mainPageModal.tableLoading}
        dataSource={mainPageModal.tableList}
        columns={columns}
        surplusWidth={250}
        surplusHeight={240}
        pagination={{
          current: mainPageModal.pageIndex,
          total: mainPageModal.total,
          pageSize: mainPageModal.pageSize
        }}
      />
    </Wrapper>
  );
});
const Wrapper = styled.div``;
