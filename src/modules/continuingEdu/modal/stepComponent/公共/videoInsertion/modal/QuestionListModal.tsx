import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button, Modal, message as Message, Radio, TimePicker } from "antd";
import moment from "moment";
import BaseTable, { DoCon } from "src/components/BaseTable";
import { getFilePrevImg } from "src/utils/file/file";
import ResultModal from "src/modules/continuingEdu/modal/stepComponent/考试/modal/components/modal/ResultModal";
import PreviewModal from "src/utils/file/modal/PreviewModal";
import createModal from "src/libs/createModal";
import { stepViewModal } from "../../../StepViewModal";
import QuestionContentModal from "./QuestionContentModal";
import { videoInsertionApi } from "../api/VideoInsertionApi";

export interface Props {
  visible: boolean;
  onCancel: any;
  onOk: any;
  onOkCallBack?: any;
}

export default function QuestionListModal(props: Props) {
  const PreviewModalWrapper = createModal(PreviewModal); //视频播放
  const { visible, onCancel, onOk } = props;
  const [attachmentId, setAttachmentId] = useState(""); // 附件id
  const [tableList, setTableList] = useState([]); //表格数据
  const [tableLoading, setTableLoading] = useState(false); //表格loading
  const [query, setQuery] = useState({
    pageSize: 20,
    pageIndex: 1
  } as any); // 页码 ，每页条数
  const [dataTotal, setDataTotal] = useState(0 as number); // 总条数
  const [params, setParams] = useState({} as any); //弹窗参数
  const [editVisible, setEditVisible] = useState(false); // 弹窗状态
  const [visibleCheck, setVisibleCheck] = useState(false);
  const [paramsCheck, setParamsCheck] = useState({});

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
      title: "题目",
      dataIndex: "questionContent",
      key: "questionContent",
      align: "left"
    },
    {
      title: "类型",
      dataIndex: "questionCategoryName",
      key: "questionCategoryName",
      align: "center",
      width: 100
    },
    {
      title: "类型插入时间",
      dataIndex: "broadcastPointName",
      key: "broadcastPointName",
      align: "center",
      width: 140,
      render(text: any, record: any) {
        return (
          <TimePicker
            defaultValue={text == "00" ? moment("00:00:00", "HH:mm:ss") : moment(text, "HH:mm:ss")}
            format="HH:mm:ss"
            allowClear={false}
            onChange={(time: any) =>
              setTimeout(() => {
                saveBroadCastPoint(record, time)
              }, 1000)
            }
          />
        )
      }
    },
    {
      title: "操作",
      dataIndex: "caozuo",
      key: "caozuo",
      align: "center",
      width: 150,
      render(text: any, record: any) {
        return (
          <DoCon>
            <span onClick={() => handleCheck(record)}>查看</span>
            <span onClick={() => handleDelete(record)}>删除</span>
          </DoCon>
        );
      }
    }
  ];

  //初始化
  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        setAttachmentId(stepViewModal.stepData4.videoList[0]?.id)
        getTableData(stepViewModal.stepData4.videoList[0]?.id);
      }, 100);
    }
  }, [visible, query]);

  //保存插入时间
  const saveBroadCastPoint = async (record: any, broadCastPoint: any) => {
    let obj: any = {
      id: record.id,
      taskCode: stepViewModal.taskCode,
      broadCastPointName: moment(broadCastPoint).format("HH:mm:ss")
    }
    await videoInsertionApi.saveBroadcastPoint(obj).then((res: any) => {
      if (res.code == 200) {
        Message.success("成功插入时间");
        getTableData(record.attachmentId);
      } else {
        Message.warning(`${res.desc}`);
      }
    })
  }

  // 查询表格数据
  const getTableData = (attachmentId?: any) => {
    setTableLoading(true);
    let obj: any = {
      attachmentId,
      taskCode: stepViewModal.taskCode,
      pageIndex: query.pageIndex,
      pageSize: query.pageSize
    };
    videoInsertionApi.getQuestionPageList(obj).then((res: any) => {
      if (res.code == 200) {
        setTableLoading(false);
        setTableList(res.data.list || []);
        setDataTotal(res.data.totalCount || 0);
      } else {
        Message.warning(`${res.desc}`);
      }
    });
  };

  // 删除
  const handleDelete = (record: any) => {
    let obj: any = {
      id: record.id,
      taskCode: stepViewModal.taskCode
    };
    videoInsertionApi.deleteQuestion(obj).then(res => {
      if (res.code == 200) {
        Message.success("文件删除成功");
        getTableData(record.attachmentId);
      } else {
        Message.warning(`${res.desc}`);
      }
    }).catch(err => {
      Message.error("文件删除失败");
    });
  }

  // 查看
  const handleCheck = (record: any) => {
    setParamsCheck({
      ...record,
      choiceQuestionList: record.choiceQuestionAnswerList || [],
      questionType: record.questionCategoryName || "",
    })
    setVisibleCheck(true)
  }

  // 添加题目
  const handleOpenCreate = () => {
    let createType = "choiceQuestion"
    let modalContent = <div style={{ marginTop: '30px' }}>
      <Radio.Group onChange={(e: any) => createType = e.target.value} defaultValue={createType}>
        <Radio value='choiceQuestion'>选择题</Radio>
        <Radio value='fillingQuestion'>填空题</Radio>
        <Radio value='shortQuestion'>问答题</Radio>
      </Radio.Group>
    </div>;
    Modal.confirm({
      title: '新建',
      centered: true,
      content: modalContent,
      onOk: () => {
        setParams({ createType, attachmentId })
        setEditVisible(true)
      }
    })
  }

  // 视频播放
  const handlePreview = (attachmentId: any) => {
    const attachmentData = stepViewModal.stepData4.videoList.filter((item: any) => item.id == attachmentId)
    PreviewModalWrapper.show({
      path: attachmentData[0].path,
      title: attachmentData[0].name || "视频播放"
    });
  };

  return (
    <Modal
      width={1200}
      visible={visible}
      onCancel={() => onCancel()}
      onOk={() => onCancel()}
      title="添加视频插题"
      footer={
        <div style={{ textAlign: "center" }}>
          <Button type="primary" onClick={() => onOk()}>
            确定
          </Button>
        </div>
      }
    >
      <Wrapper>
        <Label>
          <Radio.Group
            defaultValue={attachmentId}
            value={attachmentId}
            onChange={(e: any) => {
              setAttachmentId(e.target.value);
              getTableData(e.target.value);
            }}
          >
            {stepViewModal.stepData4.videoList.map(
              (item: any, index: number) => (
                <div className="file-box" key={index}>
                  <Radio value={item.id} key={item.id}>
                    <img
                      src={getFilePrevImg(item.path)}
                      className="type-img"
                      alt=""
                    />
                    <div className="name">{item.name}</div>
                    <div className="size">{item.size}</div>
                  </Radio>
                </div>
              )
            )}
          </Radio.Group>
        </Label>
        <Content>
          <Header>
            <div style={{ float: "left" }}>
              <span style={{ color: "red", lineHeight: "32px" }}>
                * 请在视频播放时长内插入考题
              </span>
            </div>
            <div style={{ float: "right" }}>
              <Button style={{ marginRight: "10px" }} onClick={() => handlePreview(attachmentId)}>播放视频</Button>
              <Button onClick={handleOpenCreate}>添加题目</Button>
            </div>
          </Header>
          <BaseTable
            loading={tableLoading}
            dataSource={tableList}
            columns={columns}
            surplusHeight={400}
            pagination={{
              pageSizeOptions: ['10', '20', '30', '40', '50'],
              onChange: (pageIndex, pageSize) =>
                setQuery({ ...query, pageIndex }),
              onShowSizeChange: (pageIndex, pageSize) => setQuery({ ...query, pageSize }),
              total: dataTotal,
              showSizeChanger: true,
              showQuickJumper: true,
              pageSize: query.pageSize,
              current: query.pageIndex
            }}
          />
        </Content>
        <QuestionContentModal
          visible={editVisible}
          params={params}
          onCancel={() => setEditVisible(false)}
          onOk={() => {
            setEditVisible(false);
            getTableData(attachmentId)
          }}
        />
        <ResultModal
          visible={visibleCheck}
          onCancel={() => setVisibleCheck(false)}
          onOk={() => setVisibleCheck(false)}
          params={paramsCheck}
        />
        <PreviewModalWrapper.Component />
      </Wrapper>
    </Modal>
  );
}
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: red;
  #baseTable {
    padding: 15px 0 0 0 !important;
  }
  .ant-table-tbody > tr:hover:not(.ant-table-expanded-row) > td,
  .ant-table-row-hover {
    background: #fff !important;
    > td {
      background: #fff !important;
    }
  }
  .ant-time-picker-input {
    padding-left: 42px !important;
    border: none !important;
    &:focus {
      border: none !important;
      box-shadow: none !important;
    }
  }
  .ant-time-picker-icon {
    display: none !important;
  }
`;
const Label = styled.div`
  float: left;
  width: 25%;
  padding: 0 10px;
  height: 100%;
  // background: green;
  .file-box {
    width: 260px;
    height: 65px;
    background: rgba(246, 246, 246, 1);
    border-radius: 2px;
    margin-right: 8px;
    margin-bottom: 8px;
    padding: 10px 12px;
    position: relative;
    .ant-radio {
      position: absolute !important;
      top: 15px;
    }
    .type-img {
      position: absolute;
      left: 28px;
      top: -15px;
      bottom: 0;
      width: 44px;
      height: 44px;
      margin: auto 0;
    }
    .name {
      margin: -15px 9px -3px 85px;
      font-size: 13px;
      color: #333;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .size {
      margin: 0 0px 0 85px;
      font-size: 13px;
      color: #999;
    }
  }
`;
const Content = styled.div`
  width: 75%;
  height: 100%;
  float: left;
  padding: 0 0 0 20px;
  border-left: 1px solid #eee;
`;
const Header = styled.div`
  height: 32px;
`;
