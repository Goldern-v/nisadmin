import styled from "styled-components";
import React from "react";
import BaseTable, { DoCon } from "src/components/BaseTable";
import { message as Message, Modal } from "src/vendors/antd";
import { observer } from "src/vendors/mobx-react-lite";
import { mainPageModal } from "../MainPageModal";
import { mainPageApi } from "../api/MainPageApi";
import { appStore, authStore } from "src/stores";
import { stepServices } from "../../../modal/stepComponent/services/stepServices";

interface Props {
  getId: any;
  addRecordModal: any;
}

export default observer(function Table(props: Props) {
  let id = props.getId || "";
  //培训对象函数封装
  const setTableConfig = () => {
    let array = [];
    for (let i = 0; i < 7; i++) {
      array.push({
        title: i === 6 ? "其他" : `N${i}`,
        dataIndex: i === 6 ? "nurseOther" : `nurse${i}`,
        width: 40,
        align: "center",
        render(value: any) {
          return value === 1 ? <span>√</span> : <span>△</span>;
        }
      });
    }
    return array;
  };

  //教育方式背景颜色函数封装
  const typeBackground = (data: any) => {
    const background = [
      "#EEFDEE",
      "#FDF8E6",
      "#FCECE9",
      "#EEF1FF",
      "#F0F8F8",
      "#FAEAFB",
      "#DEF8FD"
    ];
    return background[data - 1];
  };

  const columns: any = [
    {
      title: "序号",
      dataIndex: "",
      key: "",
      render: (text: any, record: any, index: number) => index + 1,
      align: "center",
      width: 40
    },
    {
      title: "开始时间",
      dataIndex: "startTime",
      width: 130,
      align: "center",
      render(startTime: string) {
        return startTime.substr(0, 16);
      }
    },
    {
      title: "结束时间",
      dataIndex: "endTime",
      width: 130,
      align: "center",
      render(endTime: string) {
        return endTime.substr(0, 16);
      }
    },
    {
      title: "类型",
      dataIndex: "thirdLevelMenuName",
      width: 100,
      align: "center"
    },
    appStore.HOSPITAL_ID == "wh" && {
      title: "类别",
      dataIndex: "category",
      width: 120,
      align: "center",
      render(category: any) {
        return category === 1 ? <span>中医类</span> : <span>非中医类</span>;
      }
    },
    {
      title: "标题",
      dataIndex: "title",
      width: 300,
      align: "left"
    },
    {
      title: "教学方式",
      dataIndex: "teachingMethod",
      width: 80,
      align: "center",
      onCell: (record: any, rowIndex: any) => ({
        style: {
          backgroundColor: typeBackground(record.teachingMethod)
        }
      }),
      render(teachingMethod: any, record: any) {
        //1.学习、2培训、3考试、4练习、5实操、6演练
        const teachingMethodArray = [
          "学习",
          "培训",
          "考试",
          "练习",
          "实操",
          "演练",
          "实践"
        ];
        const color = [
          "#4CA21D",
          "#DD7316",
          "#EA3838",
          "#2754A8",
          "#006667",
          "#AB2892",
          "#0F9790"
        ];
        return (
          <span
            style={{
              color: color[teachingMethod - 1]
            }}
          >
            {teachingMethodArray[teachingMethod - 1]}
          </span>
        );
      }
    },
    {
      title: "培训对象（必修√/选修△）",
      children: setTableConfig()
    },
    {
      title: "管理人员",
      children: [
        {
          title: "讲师",
          dataIndex: "teachers",
          width: 130,
          align: "center"
        }
      ]
    },
    {
      title: "组织方式",
      // 1线上 2线下
      children: [
        {
          title: "线上",
          dataIndex: "isOnLine",
          width: 40,
          align: "center",
          render(value: any) {
            return value === 1 ? <span>√</span> : "";
          }
        },
        {
          title: "线下",
          dataIndex: "isDownLine",
          width: 40,
          align: "center",
          render(value: any) {
            return value === 1 ? <span>√</span> : "";
          }
        }
      ]
    },
    {
      title: "学习资料",
      children: [
        {
          title: "课件",
          dataIndex: "coursewareCount",
          width: 40,
          align: "center"
        },
        {
          title: "视频",
          dataIndex: "videoCount",
          width: 40,
          align: "center"
        },
        {
          title: "题库(题)",
          dataIndex: "questionCount",
          width: 40,
          align: "center"
        }
      ]
    },
    {
      title: "学分",
      dataIndex: "credit",
      width: 150,
      align: "center"
    },
    {
      title: "学时",
      dataIndex: "classHours",
      width: 50,
      align: "center"
    },
    {
      title: "备注",
      dataIndex: "auditRemark",
      width: 150,
      align: "left"
    },
    {
      title: "状态",
      dataIndex: "statusDesc",
      width: 80,
      align: "center",
      // fixed: "right",
      render(statusDesc: any, record: any) {
        let color = "";
        switch (statusDesc) {
          case "待开始":
            color = "#39A133";
            break;
          case "已结束":
            color = "rgba(0, 0, 0, 0.65)";
            break;
          case "待审核":
            color = "#284fc2";
            break;
          case "进行中":
            color = "#ED8628";
            break;
          case "退回":
            color = "#E63122";
            break;
          default:
            color = "#000000";
        }
        return <span style={{ color }}>{statusDesc}</span>;
      }
    },
    {
      title: "操作",
      dataIndex: "",
      width: 200,
      align: "center",
      // fixed: "right",
      render(text: any, record: any, index: number) {
        let data: any = authStore.isAd
          ? [
              {
                text: "删除",
                function: handleDelete
              }
            ]
          : [];
        switch (record.statusDesc) {
          case "待开始":
            data = [
              {
                text: "查看结果",
                function: checkResult
              },
              {
                text: "查看信息",
                function: checkMessage
              },
              {
                text: "删除",
                function: handleDelete
              },
              {
                text: "复制",
                function: handleCopy
              }
            ];
            break;
          case "待审核":
            if (record.auditStatus === 1) {
              data = [
                {
                  text: "查看结果",
                  function: checkResult
                },
                {
                  text: "查看信息",
                  function: checkMessage
                },
                {
                  text: "撤销",
                  function: handleRevoke
                },
                {
                  text: "复制",
                  function: handleCopy
                },
                ...data
              ];
            } else {
              data = [
                {
                  text: "查看结果",
                  function: checkResult
                },
                {
                  text: "查看信息",
                  function: checkMessage
                },
                {
                  text: "复制",
                  function: handleCopy
                },
                ...data
              ];
            }
            break;
          case "进行中":
            data = [
              {
                text: "查看结果",
                function: checkResult
              },
              {
                text: "查看信息",
                function: checkMessage
              },
              {
                text: "删除",
                function: handleDelete
              },
              {
                text: "复制",
                function: handleCopy
              }
            ];
            break;
          case "退回":
            data = [
              {
                text: "查看信息",
                function: checkMessage
              },
              {
                text: "修改",
                function: handReWrite
              },
              {
                text: "删除",
                function: handleDelete
              },
              {
                text: "复制",
                function: handleCopy
              }
            ];
            break;
          case "草稿":
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
          case "已结束":
            data = [
              {
                text: "查看结果",
                function: checkResult
              },
              {
                text: "查看信息",
                function: checkMessage
              },
              {
                text: "复制",
                function: handleCopy
              },
              ...data
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
        mainPageApi
          .revokeMainData(record.id)
          .then(res => {
            if (res.code == 200) {
              Message.success("文件撤销成功");
              mainPageModal.onload();
            } else {
              Message.error(`${res.dec}`);
            }
          })
          .catch(err => {
            Message.error("文件撤销失败");
          });
      }
    });
  };

  // 查看结果
  const checkResult = (record: any) => {
    const teachingMethodArray = [
      "studyResultReview",
      "trainingResultReview",
      "testingResultReview",
      "practiceResultReview",
      "operateResultReview",
      "simulateResultReview"
    ];
    let router = teachingMethodArray[record.teachingMethod - 1];
    appStore.history.push(`/${router}?id=${record.id}`);
  };

  // 修改
  const handReWrite = (record: any) => {
    props.addRecordModal.show({
      id: record.id,
      onOkCallBack: () => {
        Message.success("修改成功");
        mainPageModal.onload();
      }
    });
  };

  //trainingInfoReview 查看详情(所有类型)
  // 查看信息
  const checkMessage = (record: any) => {
    appStore.history.push(`/trainingInfoReview?id=${record.id}`);
  };

  // 处理复制入参数据
  const copyData = (data: any, record: any) => {
    let ajaxMap: any = {
      1: "addTeachingPlanInfoStudy",
      2: "addTeachingPlanInfoTrain",
      3: "addTeachingPlanInfoExam",
      4: "addTeachingPlanInfoExercise",
      5: "addTeachingPlanInfoPractise",
      6: "addTeachingPlanInfoWalkthrough"
    };
    data.id && delete data.id;
    data.archiveTime && delete data.archiveTime;
    data.createTime && delete data.createTime;
    data.endTime && delete data.endTime;
    data.submitTime && delete data.submitTime;
    data.status = 1;
    return (stepServices as any)[ajaxMap[record.teachingMethod as any] as any](
      data
    );
  };

  // 复制
  const handleCopy = (record: any) => {
    let content = (
      <div>
        <div>您确定要复制选中的记录吗？</div>
      </div>
    );
    Modal.confirm({
      title: "提示",
      content,
      okText: "确定",
      cancelText: "取消",
      onOk: () => {
        mainPageApi.copyTeachingPlan(record.id).then(res => {
          if (res.code === "200") Message.success("复制成功");
          mainPageModal.onload();
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
        surplusWidth={300}
        surplusHeight={270}
        // scroll={{ x: 895 }}
        pagination={{
          current: mainPageModal.pageIndex,
          total: mainPageModal.total,
          pageSize: mainPageModal.pageSize
        }}
        onChange={pagination => {
          mainPageModal.pageIndex = pagination.current;
          mainPageModal.total = pagination.total;
          mainPageModal.pageSize = pagination.pageSize;
          mainPageModal.onload();
        }}
      />
    </Wrapper>
  );
});
const Wrapper = styled.div``;
