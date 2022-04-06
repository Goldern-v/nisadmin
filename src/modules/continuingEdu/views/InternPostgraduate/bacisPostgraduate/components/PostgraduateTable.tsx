import styled from "styled-components";
import { observer } from "mobx-react-lite";
import React, { useState, useEffect } from "react";
import BaseTable, { DoCon } from "src/components/BaseTable";
import { Button, Modal, message as Message } from "antd";
// import { formApplyModal } from "../FormApplyModal";
import { trainingSettingApi } from "../../api/TrainingSettingApi";
// import FormEditModal from "../modal/FormEditModal"; // 修改弹窗
import { appStore } from "src/stores";
import qs from "qs";

interface Props {}

export default observer(function ApplyTable(props: Props) {
  const [editVisible, setEditVisible] = useState(false); // 控制一弹窗状态
  const [editParams, setEditParams] = useState({} as any); //修改弹窗回显数据
  const [tableLoading, settableLoading] = useState(false); //tabel的loading的控制
  const [tableData, setTableData] = useState([] as any) //tabel的数据
  const [tablequery, setTableQuery] = useState({
    pageIndex: 1,
    pageSize: 20,
    quarter: '',
    keyWord: '',
  } as any)

  const columns: any = [
    {
      title: "序号",
      dataIndex: "",
      render: (text: any, record: any, index: number) => index + 1,
      align: "center",
      width: 50
    },
    {
      title: "学习性质",
      dataIndex: "perantName",
      align: "center",
      width: 100
    },
    {
      title: "姓名",
      dataIndex: "perantName",
      align: "center",
      width: 100
    },
    {
      title: "性别",
      dataIndex: "perantName",
      align: "center",
      width: 80
    },
    {
      title: "年龄",
      dataIndex: "perantName",
      align: "center",
      width: 80
    },
    {
      title: "职务",
      dataIndex: "perantName",
      align: "center",
      width: 80
    },
    {
      title: "职称",
      dataIndex: "perantName",
      align: "center",
      width: 80
    },
    {
      title: "学历",
      dataIndex: "perantName",
      align: "center",
      width: 80
    },
    {
      title: "选送单位",
      dataIndex: "perantName",
      align: "center",
      width: 80
    },
    {
      title: "进修科室",
      dataIndex: "perantName",
      align: "center",
      width: 100
    },
    {
      title: "开始时间",
      dataIndex: "perantName",
      align: "center",
      width: 150
    },
    {
      title: "结束时间",
      dataIndex: "perantName",
      align: "center",
      width: 150
    },
    {
      title: "时长",
      dataIndex: "perantName",
      align: "center",
      width: 80
    },
    {
      title: "进修特殊事宜",
      dataIndex: "perantName",
      align: "center",
      width: 150
    },
    {
      title: "联系电话",
      dataIndex: "perantName",
      align: "center",
      width: 120
    },
    {
      title: "带教老师",
      dataIndex: "perantName",
      align: "center",
      width: 120
    },
    {
      title: "操作成绩",
      dataIndex: "perantName",
      align: "center",
      width: 100
    },
    {
      title: "理论成绩",
      dataIndex: "perantName",
      align: "center",
      width: 100
    },
    {
      title: "备注",
      dataIndex: "auditRemark",
      align: "left",
      width: 220
    },
    {
      title: "操作",
      dataIndex: "cz",
      width: 150,
      align: "center",
      render(text: any, record: any) {
        let data: any = [{ text: "暂无操作" }];
        switch (record.status) {
          case 1:
            data = [
              {
                text: "修改",
                function: handReWrite
              },
              {
                text: "删除",
                function: handleDelete
              }
            ];
            break;
          case 2:
            data = [
              {
                text: "撤回",
                function: handleRevoke
              },
              {
                text: "查看",
                function: checkResult
              }
            ];
            break;
          case 3:
            data = [
              {
                text: "查看",
                function: checkResult
              },
              {
                text: "修改",
                function: handReWrite
              },
              {
                text: "删除",
                function: handleDelete
              }
            ];
            break;
          case 4:
            data = [
              {
                text: "查看",
                function: checkResult
              }
            ];
            break;
          default:
        }
        return (
          <DoCon>
            {data.map((item: any, index: any) => (
              <span
                key={index}
                onClick={() => (item.function ? item.function(record) : {})}
              >
                {item.text}
              </span>
            ))}
          </DoCon>
        );
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
        trainingSettingApi
          .deleteForm(record.formId)
          .then(res => {
            if (res.code == 200) {
              Message.success("文件删除成功");
              // formApplyModal.onload();
            } else {
              Message.error(`${res.dec}`);
            }
          })
          .catch(e => {});
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
        trainingSettingApi
          .revokeForm(record.formId)
          .then(res => {
            if (res.code == 200) {
              Message.success("文件撤销成功");
              // formApplyModal.onload();
            } else {
              Message.error(`${res.dec}`);
            }
          })
          .catch(err => {});
      }
    });
  };

  // 查看
  const checkResult = (record: any) => {
    let newQuery = {
      formId: record.formId,
      code: record.formCode,
      haveHeader: false,
      // title: formApplyModal.getTitle,
      statusName: record.statusName
    } as any;
    appStore.history.push(`/continuingEduFormCheck?${qs.stringify(newQuery)}`);
  };

  // 修改
  const handReWrite = (record: any) => {
    setEditParams({
      formId: record.formId
    });
    setEditVisible(true);
  };
  const handleEditCancel = () => {
    setEditVisible(false);
    setEditParams({});
  };
  const handleEditOk = () => {
    // formApplyModal.onload();
    handleEditCancel();
  };

  return (
    <Wrapper>
      <BaseTable
        loading={tableLoading}
        dataSource={tableData}
        columns={columns}
        surplusHeight={230}
        surplusWidth={100}
        onChange={pagination => {
         
        }}
      />
      {/* <FormEditModal
        visible={editVisible}
        params={editParams}
        onCancel={handleEditCancel}
        onOk={handleEditOk}
      /> */}
    </Wrapper>
  );
});
const Wrapper = styled.div`
  padding: 0 20px;
  box-sizing: border-box;
`;
