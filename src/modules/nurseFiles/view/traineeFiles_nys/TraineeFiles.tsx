import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { TabledCon } from "src/components/BaseTable";
import YearPicker from "src/components/YearPicker";
import {
  Select,
  Input,
  Button,
  message as Message,
  Modal
} from "src/vendors/antd";
import BaseTable, { DoCon } from "src/components/BaseTable";
import { traineeFilesModal } from "./TraineeFilesModal"; // 仓库数据
import { traineeFilesApi } from "./api/TraineeFilesApi"; // 接口
import TraineeFilesEditModal from "./modal/TraineeFilesEditModal"; // 添加修改弹窗
import createModal from "src/libs/createModal";
import QrcodeSbmitModal from "./modal/QrcodeSbmitModal"; //二维码扫描弹窗
import TraineeCheckModal from "./modal/TraineeCheckModal"; //检查实习生填写资料
import { appStore } from "src/stores";

interface Props { }
export default observer(function TraineeFiles(props: Props) {
  const [editParams, setEditParams] = useState({} as any); //修改弹窗回显数据
  const [editVisible, setEditVisible] = useState(false); //弹窗开关
  const [editable, setEditable] = useState(true)

  const qrcodeSbmitModal = createModal(QrcodeSbmitModal);
  const traineeCheckModal = createModal(TraineeCheckModal);

  // 初始化数据
  useEffect(() => {
    traineeFilesModal.onload();
  }, []);

  //表格数据
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
      title: "实习编号",
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
      title: "性别",
      dataIndex: "sex",
      width: 60,
      align: "center"
    },
    {
      title: "院校",
      dataIndex: "schoolName",
      width: 150,
      align: "center"
    },
    {
      title: "专业",
      dataIndex: "major",
      width: 120,
      align: "center"
    },
    {
      title: "学历",
      dataIndex: "education",
      width: 80,
      align: "center"
    },
    {
      title: "身份证号码",
      dataIndex: "idCardNo",
      width: 180,
      align: "center"
    },
    {
      title: "联系电话",
      dataIndex: "phone",
      width: 120,
      align: "center"
    },
    {
      title: "是否住宿",
      dataIndex: "isResident",
      width: 80,
      align: "center"
    },
    {
      title: "宿舍编号",
      dataIndex: "dormitoryNumber",
      width: 180,
      align: "center"
    },
    {
      title: "实习时间",
      dataIndex: "实习时间",
      width: 210,
      align: "center",
      render(text: string, record: any) {
        return record.internshipBegin && record.internshipEnd ? `${record.internshipBegin} ~ ${record.internshipEnd}` : '';
      }
    },
    {
      title: "实习科室",
      dataIndex: "studyDeptName",
      width: 200,
      align: "center"
    },
    {
      title: "是否组长",
      dataIndex: "isGroupLeader",
      width: 80,
      align: "center"
    },
    {
      title: "家庭住址",
      dataIndex: "address",
      width: 250,
      align: "center"
    },
    {
      title: "紧急联系人",
      dataIndex: "emergencyContactPerson",
      width: 100,
      align: "center"
    },
    {
      title: "紧急联系人电话",
      dataIndex: "emergencyContactPhone",
      width: 150,
      align: "center"
    },
    {
      title: "备注",
      dataIndex: "remark",
      width: 200,
      align: "center"
    },
    {
      title: "操作",
      dataIndex: "",
      width: 120,
      align: "center",
      render(text: any, record: any) {
        return (
          <DoCon>
            <span onClick={() => saveOrUpload(record, false)}>查看</span>
            <span onClick={() => saveOrUpload(record, true)}>修改</span>
            <span onClick={() => handleDelete(record)}>删除</span>
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
        traineeFilesApi
          .deleteInfoById(record.id)
          .then(res => {
            if (res.code == 200) {
              Message.success("记录删除成功");
              traineeFilesModal.pageIndex = 1;
              traineeFilesModal.onload();
            } else {
              Message.error(`${res.dec}`);
            }
          })
          .catch(e => { });
      }
    });
  };

  // 保存
  const saveOrUpload = (record: any, editable: boolean) => {
    setEditable(editable)
    setEditParams(record);
    setEditVisible(true);
  };

  // 弹窗
  const handleEditCancel = () => {
    setEditVisible(false);
    setEditParams({});
  };
  const handleEditOk = () => {
    traineeFilesModal.onload();
    handleEditCancel();
  };

  return (
    <Wrapper>
      <PageHeader>
        <LeftIcon> </LeftIcon>
        <RightIcon>
          <span>年份：</span>
          <YearPicker
            allowClear={false}
            style={{ width: 120 }}
            value={traineeFilesModal.selectedYear}
            onChange={(year: any) => {
              traineeFilesModal.selectedYear = year;
              traineeFilesModal.onload();
            }}
          />
          <span>学历：</span>
          <Select
            style={{ width: 120 }}
            value={traineeFilesModal.selectdEdu}
            onChange={(val: string) => {
              traineeFilesModal.selectdEdu = val;
              traineeFilesModal.pageIndex = 1;
              traineeFilesModal.onload();
            }}
          >
            <Select.Option value="">全部</Select.Option>
            <Select.Option value="9">博士</Select.Option>
            <Select.Option value="8">研究生</Select.Option>
            <Select.Option value="7">本科</Select.Option>
            <Select.Option value="6">大专</Select.Option>
            <Select.Option value="5">中专</Select.Option>
          </Select>
          <span>性别：</span>
          <Select
            style={{ width: 120 }}
            value={traineeFilesModal.selectdSex}
            onChange={(val: string) => {
              traineeFilesModal.selectdSex = val;
              traineeFilesModal.pageIndex = 1;
              traineeFilesModal.onload();
            }}
          >
            <Select.Option value="">全部</Select.Option>
            <Select.Option value="0">男</Select.Option>
            <Select.Option value="1">女</Select.Option>
          </Select>
          <Input
            style={{ width: 180, marginLeft: 5, marginRight: -5 }}
            placeholder="请输入"
            value={traineeFilesModal.keyWord}
            onChange={e => {
              traineeFilesModal.keyWord = e.target.value;
            }}
          />
          <Button
            type="primary"
            onClick={() => {
              traineeFilesModal.onload();
            }}
          >
            查询
          </Button>
          <Button
            onClick={() => {
              traineeFilesModal.export();
            }}
          >
            导出
          </Button>
          <Button onClick={() => setEditVisible(true)}>添加实习生</Button>
          {appStore.HOSPITAL_ID == 'hj' &&
            <span>
              <Button onClick={() => qrcodeSbmitModal.show()}>填写二维码</Button>
              <Button
                onClick={() =>
                  traineeCheckModal.show({
                    closeCallback: () => traineeFilesModal.onload()
                  })
                }
              >
                待检查
              </Button>
            </span>
          }
        </RightIcon>
      </PageHeader>
      <Content>
        <BaseTable
          loading={traineeFilesModal.tableLoading}
          dataSource={traineeFilesModal.tableList}
          columns={columns}
          surplusWidth={300}
          surplusHeight={230}
          pagination={{
            current: traineeFilesModal.pageIndex,
            total: traineeFilesModal.total,
            pageSize: traineeFilesModal.pageSize
          }}
          onChange={pagination => {
            traineeFilesModal.pageIndex = pagination.current;
            traineeFilesModal.total = pagination.total;
            traineeFilesModal.pageSize = pagination.pageSize;
            traineeFilesModal.onload();
          }}
        />
      </Content>
      <TraineeFilesEditModal
        editable={editable}
        visible={editVisible}
        params={editParams}
        onCancel={handleEditCancel}
        onOk={handleEditOk}
      />
      <qrcodeSbmitModal.Component />
      <traineeCheckModal.Component />
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
`;

const RightIcon = styled.div`
  padding: 0 0 0 15px;
  float: right;
`;

// @ts-ignore
const Content = styled(TabledCon)`
  box-sizing: border-box;
`;
