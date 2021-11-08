import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import BaseTable, { DoCon } from "src/components/BaseTable";
import { appStore, authStore } from "src/stores/index";
import { Checkbox, Modal, message as Message, Button } from "antd";
import { trainingManualModal } from "../TrainingManualModal";
import { trainingManualApi } from "../api/TrainingManualApi";
import SettingEditModal from "../modal/SettingEditModal";
interface Props {
  levelName: string;
  titleName: string;
}

export default observer(function Table(props: Props) {
  const { levelName, titleName } = props;
  const isTrainingManualSetting: boolean = !!appStore.queryObj.nameType;
  const [editParams, setEditParams] = useState({} as any); //修改弹窗回显数据
  let tableRef: any = React.createRef<HTMLDivElement>();
  useEffect(() => {
    trainingManualModal.tableRef = tableRef;
  }, []);
  //判断合并数据的行数
  // const mergeRowSpan = (text: any, arry: any, key: any) => {
  //   let i = 0;
  //   arry.forEach((item: any) => {
  //     item[key] == text ? i++ : ''
  //   });
  //   return i;
  // };

  // 操作特殊处理
  const handleArr = isTrainingManualSetting
    ? [
        {
          title: "操作 ",
          dataIndex: "id",
          width: 120,
          align: "center",
          render(text: any, record: any) {
            return (
              <DoCon>
                <span onClick={() => saveOrUpload(record)}>修改</span>
                <span onClick={() => handleDelete(text)}>删除</span>
              </DoCon>
            );
          },
        },
      ]
    : [
        {
          title: "状态",
          dataIndex: "status",
          width: 80,
          align: "center",
          render(text: string) {
            return <Checkbox checked={!!text} disabled />;
          },
        },
      ];

  // 表格数据
  const columns: any = [
    {
      title: "职级",
      dataIndex: "officialRank",
      align: "center",
      rowSpan: 7,
      width: isTrainingManualSetting ? 195 : 120,
      // render(text: any) {
      // const obj: any = {
      //   children: text,
      //   props: {
      //     rowSpan: 0
      //   },
      // };
      // obj.props.rowSpan = mergeRowSpan(text, isTrainingManualSetting ? trainingManualModal.allTableList : trainingManualModal.myTableList, 'officialRank');
      // return obj;
      // return <span>{levelName}</span>
      // }
    },
    {
      title: "教学模块划分",
      dataIndex: "modulesDivision",
      align: "center",
    },
    {
      title: "划分说明",
      dataIndex: "divisionExplain",
      align: "center",
    },
    {
      title: "教学方法划分",
      dataIndex: "methodDivision",
      width: isTrainingManualSetting ? 220 : 150,
      align: "center",
    },
    {
      title: "评价方法",
      dataIndex: "evaluateMethod",
      width: isTrainingManualSetting ? 220 : 150,
      align: "center",
    },
    // ...handleArr,
    ...appStore.hisMatch({
      map: {
        hj: [
          {
            title: "操作 ",
            dataIndex: "id",
            width: 120,
            align: "center",
            render(text: any, record: any) {
              return (
                <DoCon>
                  <Button
                    type="primary"
                    size="small"
                    disabled={!authStore.isHeadNurse}
                    onClick={() => saveOrUpload(record)}
                  >
                    修改
                  </Button>
                  <Button
                    type="danger"
                    size="small"
                    disabled={!authStore.isHeadNurse}
                    onClick={() => handleDelete(text)}
                  >
                    删除
                  </Button>
                </DoCon>
              );
            },
          },
        ],
        other: [],
      },
    }),
  ];

  // 修改
  const saveOrUpload = (record: any) => {
    setEditParams(record);
    trainingManualModal.modalBtn = true;
  };

  // 删除
  const handleDelete = (id: any) => {
    let content = (
      <div>
        <div>删除数据后将无法恢复</div>确认删除选中数据吗？
      </div>
    );
    Modal.confirm({
      title: "提示",
      content,
      okText: "确定",
      okType: "danger",
      cancelText: "取消",
      onOk: () => {
        trainingManualApi
          .deleteTrainingListRecord(id)
          .then((res: any) => {
            if (res.code == 200) {
              Message.success("删除成功！");
              appStore.HOSPITAL_ID == "hj"
                ? trainingManualModal.myOnload()
                : trainingManualModal.allOnload();
            } else {
              Message.error(`${res.dec}`);
            }
          })
          .catch((e) => {});
      },
    });
  };

  // 弹窗控制
  const handleEditCancel = () => {
    trainingManualModal.modalBtn = false;
    setEditParams({});
  };
  const handleEditOk = () => {
    appStore.HOSPITAL_ID == "hj"
      ? trainingManualModal.myOnload()
      : trainingManualModal.allOnload();
    handleEditCancel();
  };

  return (
    <Page ref={tableRef}>
      <div className="title">{`${titleName}`}层级护士培训清单</div>
      <BaseTable
        loading={
          isTrainingManualSetting
            ? trainingManualModal.allTableLoading
            : trainingManualModal.myTableLoading
        }
        dataSource={
          isTrainingManualSetting
            ? trainingManualModal.allTableList
            : trainingManualModal.myTableList
        }
        columns={columns}
        surplusHeight={280}
      />
      <SettingEditModal
        visible={trainingManualModal.modalBtn}
        params={editParams}
        onCancel={handleEditCancel}
        onOk={handleEditOk}
      />
    </Page>
  );
});

// 样式
const Page = styled.div`
  width: 100%;
  .title {
    text-align: center;
    margin: 25px 0 0 0;
    font-size: 15px;
    box-sizing: border-box;
  }
`;
