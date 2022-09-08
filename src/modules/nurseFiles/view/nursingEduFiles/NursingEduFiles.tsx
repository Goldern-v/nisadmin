import styled from "styled-components";
import React, { useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react-lite";
import { TabledCon } from "src/components/BaseTable";
import YearPicker from "src/components/YearPicker";
import {
  Select,
  Input,
  Button,
  message as Message,
  Modal,
  Radio
} from "src/vendors/antd";
import BaseTable, { DoCon } from "src/components/BaseTable";
import { nursingEduFilesModal } from "./NursingEduFilesModal"; // 仓库数据
import { nursingEduFilesApi } from "./api/NursingEduFilesApi"; // 接口
import NursingEditModal from "./modal/NursingEditModal"; // 添加修改弹窗
import { appStore } from "src/stores";
// import HdNursingEditModal from "./modal/HdNursingEditModal"; // 花都添加修改弹窗
import createModal from "src/libs/createModal";
import QrCodeSubmitModal from "./modal/QrcodeSbmitModal"; //二维码扫描弹窗
import RefresherCheckModal from "./modal/RefresherCheckModal"; //检查进修生填写资料
import SheetDetailModal from "./modal/SheetDetailModal";

interface Props { }
export default observer(function NursingEduFiles(props: Props) {
  const [editParams, setEditParams] = useState({} as any); //修改弹窗回显数据
  const [editVisible, setEditVisible] = useState(false); //弹窗开关
  const qrCodeSubmitModal = createModal(QrCodeSubmitModal);
  const refresherCheckModal = useMemo(() => createModal(RefresherCheckModal), []);
  const sheetDetailModal = useMemo(() => createModal(SheetDetailModal), []);
  const [visible, setVisible] = useState(false);
  // const [hdParams, setHdParams] = useState({} as any);
  const [hdVisible, setHdVisible] = useState(false);

  // 初始化数据
  useEffect(() => {
    nursingEduFilesModal.init();
  }, []);

  const handleOk = () => {
    setVisible(true);
    onCancel();
  };
  const onCancel = () => {
    setHdVisible(false);
  };


  // 添加护士
  const addNurse = () => {
    if (appStore.HOSPITAL_ID == "gzhd") {
      setHdVisible(true)
    } else {
      setEditVisible(true)
    }
  }

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
      title: "进修编号",
      dataIndex: "identifier",
      width: 150,
      align: "center"
    },
    appStore.HOSPITAL_ID == "gzhd" && {
      title: "类型",
      dataIndex: "type",
      width: 120,
      align: "center",
      render(text: any) {
        return <span>{text == 1 ? '外来进修人员' : '外出进修人员'}</span>
      }
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
      title: "年龄",
      dataIndex: "age",
      width: 70,
      align: "center"
    },
    {
      title: "职称",
      dataIndex: "title",
      width: 100,
      align: "center"
    },
    appStore.HOSPITAL_ID == "gzhd" && {
      title: "层级",
      dataIndex: "nurseHierarchy",
      width: 80,
      align: "center"
    },
    {
      title: "学历",
      dataIndex: "education",
      width: 80,
      align: "center"
    },
    ['hj','qhwy', 'whhk'].includes(appStore.HOSPITAL_ID) &&{
      title: "在院状态",
      dataIndex: "isOnJob",
      width: 80,
      align: "center",
      render(text: any, record: any) {
        return <span style={{ color: text == 1 ? 'blue' : '#ccc' }}>{text == 1 ? '在院' : '离院'}</span>
      }
    },
    appStore.HOSPITAL_ID == "gzhd" && {
      title: "来自单位",
      dataIndex: "originalWorkUnit",
      width: 80,
      align: "center"
    },
    {
      title: "原单位名称",
      dataIndex: "originalWorkUnit",
      width: 150,
      align: "center"
    },
    {
      title: "原科室",
      dataIndex: "originalDepartment",
      width: 180,
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
      title: "进修时间",
      dataIndex: "进修时间",
      width: 210,
      align: "center",
      render(text: string, record: any) {
        return `${record.studyTimeBegin} ~ ${record.studyTimeEnd}`;
      }
    },
    appStore.HOSPITAL_ID == "gzhd" && {
      title: "项目名称",
      dataIndex: "projectName",
      width: 80,
      align: "center"
    },
    appStore.HOSPITAL_ID == "gzhd" && {
      title: "进修科目",
      dataIndex: "refresherSubject",
      width: 80,
      align: "center"
    },
    appStore.HOSPITAL_ID == "gzhd" && {
      title: "进修地点",
      dataIndex: "toWorkUnit",
      width: 180,
      align: "center"
    },
    {
      title: "进修科室一",
      dataIndex: "studyDeptName01",
      width: 200,
      align: "center"
    },
    ...appStore.hisMatch({
      map: {
        'qhwy,whhk': [],
        other: [
          {
            title: "进修科室二",
            dataIndex: "studyDeptName02",
            width: 200,
            align: "center"
          },
        ]
      },
      vague: true
    }),
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
        let obj: any = {
          id: record.id,
          type: appStore.HOSPITAL_ID == 'gzhd' ? record.type : 1
        }
        nursingEduFilesApi
          .deleteInfoById(obj)
          .then(res => {
            if (res.code == 200) {
              Message.success("记录删除成功");
              nursingEduFilesModal.pageIndex = 1;
              nursingEduFilesModal.onload();
            } else {
              Message.error(`${res.dec}`);
            }
          })
          .catch(e => { });
      }
    });
  };

  // 保存
  const saveOrUpload = (record: any) => {
    setEditParams(record);
    setEditVisible(true);
    // setHdParams(record)
    // setVisible(true);
  };

  // 弹窗
  const handleEditCancel = () => {
    setEditVisible(false);
    setEditParams({});
    // setHdParams({})
    // setVisible(false);
  };
  const handleEditOk = () => {
    nursingEduFilesModal.onload();
    handleEditCancel();
  };
  const handleOkByShowDetail = (data: any[]):void => {
    nursingEduFilesModal.batchSave(data, () => {
      sheetDetailModal.hide()
    })
  }
  const showDetail = (list: any) => {
    // console.log('test-list', list)
    sheetDetailModal.show({
      handleOk: handleOkByShowDetail,
      data: list,
    })
  }

  return (
    <Wrapper>
      <PageHeader>
        <LeftIcon> </LeftIcon>
        <RightIcon>
          {appStore.HOSPITAL_ID == 'gzhd' &&
            <span>
              <span>类型：</span>
              <Select
                style={{ width: 100 }}
                value={nursingEduFilesModal.selectdType}
                onChange={(val: string) => {
                  nursingEduFilesModal.selectdType = val;
                  nursingEduFilesModal.pageIndex = 1;
                  nursingEduFilesModal.onload();
                }}
              >
                <Select.Option value="">全部</Select.Option>
                {/* //1.外来进修人员、2外出进修人员 */}
                <Select.Option value={1}>外来进修生</Select.Option>
                <Select.Option value={2}>外出进修生</Select.Option>
              </Select>
            </span>
          }
          <span>年份：</span>
          <YearPicker
            allowClear={false}
            style={{ width: 90 }}
            value={nursingEduFilesModal.selectedYear}
            onChange={(year: any) => {
              nursingEduFilesModal.selectedYear = year;
              nursingEduFilesModal.onload();
            }}
          />
          <span>学历：</span>
          <Select
            style={{ width: 90 }}
            value={nursingEduFilesModal.selectdEdu}
            onChange={(val: string) => {
              nursingEduFilesModal.selectdEdu = val;
              nursingEduFilesModal.pageIndex = 1;
              nursingEduFilesModal.onload();
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
            style={{ width: 80 }}
            value={nursingEduFilesModal.selectdSex}
            onChange={(val: string) => {
              nursingEduFilesModal.selectdSex = val;
              nursingEduFilesModal.pageIndex = 1;
              nursingEduFilesModal.onload();
            }}
          >
            <Select.Option value="">全部</Select.Option>
            <Select.Option value="0">男</Select.Option>
            <Select.Option value="1">女</Select.Option>
          </Select>
          {
            ['hj','qhwy'].includes(appStore.HOSPITAL_ID) &&<React.Fragment>
              <span>在院状态：</span>
              <Select
                style={{ width: 90 }}
                value={nursingEduFilesModal.isOnJob}
                onChange={(val: string) => {
                  nursingEduFilesModal.isOnJob = val;
                  nursingEduFilesModal.pageIndex = 1;
                  nursingEduFilesModal.onload();
                }}
              >
                <Select.Option value="">全部</Select.Option>
                <Select.Option value="1">在院</Select.Option>
                <Select.Option value="0">离院</Select.Option>
              </Select>
            </React.Fragment>
          }
          <Input
            style={{ width: 180, marginLeft: 5, marginRight: -5 }}
            placeholder="请输入"
            value={nursingEduFilesModal.keyWord}
            onChange={e => {
              nursingEduFilesModal.keyWord = e.target.value;
            }}
          />
          <Button
            type="primary"
            onClick={() => {
              nursingEduFilesModal.onload();
            }}
          >
            查询
          </Button>
          {
           appStore.hisMatch({
            map: {
              'qhwy,whhk': <>
                <Button
                  onClick={() => {
                    nursingEduFilesModal.getImportTemplate();
                  }}>
                  下载模板
                </Button>
                <Button
                  onClick={() => {
                    nursingEduFilesModal.import(showDetail);
                  }}>
                  导入
                </Button>
              </>,
              'other': ''
            },
            vague: true
           })
          }
          <Button
            onClick={() => {
              nursingEduFilesModal.export();
            }}
          >
            导出
          </Button>
          <Button onClick={() => addNurse()}>添加进修生</Button>
          {['hj','qhwy', 'whhk'].includes(appStore.HOSPITAL_ID) &&
            <span>
              <Button onClick={() => qrCodeSubmitModal.show()}>填写二维码</Button>
              <Button
                onClick={() =>
                  refresherCheckModal.show({
                    closeCallback: () => nursingEduFilesModal.onload()
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
          loading={nursingEduFilesModal.tableLoading}
          dataSource={nursingEduFilesModal.tableList}
          columns={columns}
          surplusWidth={300}
          surplusHeight={230}
          pagination={{
            current: nursingEduFilesModal.pageIndex,
            total: nursingEduFilesModal.total,
            pageSize: nursingEduFilesModal.pageSize
          }}
          onChange={pagination => {
            nursingEduFilesModal.pageIndex = pagination.current;
            nursingEduFilesModal.total = pagination.total;
            nursingEduFilesModal.pageSize = pagination.pageSize;
            nursingEduFilesModal.onload();
          }}
        />
      </Content>
      <Modal
        visible={hdVisible}
        title='添加进修生'
        width="460px"
        onOk={handleOk}
        onCancel={onCancel}
      >
        <Radio.Group
          value={nursingEduFilesModal.showType}
          onChange={(e: any) => nursingEduFilesModal.showType = e.target.value}
        >
          <Radio value={2} style={{ margin: " 20px 80px 20px 70px" }}>
            外出进修生
            </Radio>
          <Radio value={1}>外来进修生</Radio>
        </Radio.Group>
      </Modal>
      <NursingEditModal
        visible={editVisible}
        params={editParams}
        onCancel={handleEditCancel}
        onOk={handleEditOk}
      />
      {/* <HdNursingEditModal
        visible={visible}
        params={hdParams}
        onCancel={handleEditCancel}
        onOk={handleEditOk}
      /> */}
      <qrCodeSubmitModal.Component />
      <refresherCheckModal.Component />
      <sheetDetailModal.Component />
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

const Content = styled(TabledCon)`
  box-sizing: border-box;
`;
