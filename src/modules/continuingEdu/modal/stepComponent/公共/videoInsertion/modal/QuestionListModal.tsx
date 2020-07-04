import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button, Modal, message as Message, Radio } from "antd";
import BaseTable, { DoCon } from "src/components/BaseTable";
import { getFilePrevImg } from "src/utils/file/file";
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
  const { visible, onCancel, onOk } = props;
  const [editLoading, setEditLoading] = useState(false); //弹窗loading
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
      width: 100
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
            <span>查看</span>
            <span>修改</span>
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
        setAttachmentId(stepViewModal.stepData4.attachmentIds[0]?.id)
        getTableData(stepViewModal.stepData4.attachmentIds[0]?.id);
      }, 100);
    }
  }, [visible, query]);

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
      setTableLoading(false);
      setTableList(res.data.list || []);
      setDataTotal(res.data.totalCount || 0);
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
        setParams({createType,attachmentId})
        setEditVisible(true)
      }
    })
  }

  // 保存
  const checkForm = () => {
    onOk()
  };

  // 取消
  const handleCancel = () => {
    if (editLoading) return;
    onCancel && onCancel();
  };

  return (
    <Modal
      width={1200}
      visible={visible}
      onCancel={handleCancel}
      onOk={handleCancel}
      confirmLoading={editLoading}
      title="添加视频插题"
      footer={
        <div style={{ textAlign: "center" }}>
          <Button type="primary" onClick={checkForm} loading={editLoading}>
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
            {stepViewModal.stepData4.attachmentIds.map(
              (item: any, index: number) => (
                <div className="file-box">
                  <Radio value={item.id}>
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
              <Button style={{ marginRight: "10px" }}>播放视频</Button>
              <Button onClick={handleOpenCreate}>添加题目</Button>
            </div>
          </Header>
          <BaseTable
            loading={tableLoading}
            dataSource={tableList}
            columns={columns}
            surplusHeight={400}
            pagination={{
              onChange: (pageIndex, pageSize) =>
                setQuery({ ...query, pageIndex }),
              total: dataTotal,
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
