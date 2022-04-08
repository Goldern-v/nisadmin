import styled from "styled-components";
import { observer } from "mobx-react-lite";
import React, { useState, useEffect } from "react";
import BaseTable, { DoCon } from "src/components/BaseTable";
import { Button, Modal, message as Message } from "antd";
import { bacisPostgraduateData } from "../bacisPostgraduate";
// import FormEditModal from "../modal/FormEditModal"; // 修改弹窗
import { appStore } from "src/stores";
import AddPostgraduateModal from "../model/AddPostgraduateModal";
import createModal from "src/libs/createModal";
import {internPostgraduateApi} from "../../api/InternPostgraduate"
import qs from "qs";

interface Props {}

export default observer(function ApplyTable(props: Props) {
  const addPostgraduateModal = createModal(AddPostgraduateModal); // 添加弹窗
  const [createClear, setCreateClear] = useState(true)
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
      dataIndex: "natureOfLearning",
      align: "center",
      width: 100
    },
    {
      title: "姓名",
      dataIndex: "name",
      align: "center",
      width: 100
    },
    {
      title: "性别",
      dataIndex: "sex",
      align: "center",
      width: 80
    },
    {
      title: "年龄",
      dataIndex: "age",
      align: "center",
      width: 80
    },
    {
      title: "职务",
      dataIndex: "post",
      align: "center",
      width: 80
    },
    {
      title: "职称",
      dataIndex: "title",
      align: "center",
      width: 80
    },
    {
      title: "学历",
      dataIndex: "education",
      align: "center",
      width: 80
    },
    {
      title: "选送单位",
      dataIndex: "originalWorkUnit",
      align: "center",
      width: 80
    },
    {
      title: "进修科室",
      dataIndex: "studyDeptName01",
      align: "center",
      width: 180
    },
    {
      title: "开始时间",
      dataIndex: "studyTimeBegin",
      align: "center",
      width: 150
    },
    {
      title: "结束时间",
      dataIndex: "studyTimeEnd",
      align: "center",
      width: 150
    },
    {
      title: "时长",
      dataIndex: "duration",
      align: "center",
      width: 80
    },
    {
      title: "进修特殊事宜",
      dataIndex: "mattersForStudy",
      align: "center",
      width: 150
    },
    {
      title: "联系电话",
      dataIndex: "phone",
      align: "center",
      width: 120
    },
    {
      title: "带教老师",
      dataIndex: "teachingTeacher",
      align: "center",
      width: 120
    },
    {
      title: "操作成绩",
      dataIndex: "operationScore",
      align: "center",
      width: 100
    },
    {
      title: "理论成绩",
      dataIndex: "theoryScore",
      align: "center",
      width: 100
    },
    {
      title: "备注",
      dataIndex: "remark",
      align: "left",
      width: 220
    },
    {
      title: "操作",
      dataIndex: "cz",
      width: 150,
      align: "center",
      render(text: any, record: any) {
        let data: any = [  
          {
            text: "修改",
            function: handReWrite
          },
          {
            text: "删除",
            function: handleDelete,
            color:'#f33'
          }];
        return (
          <DoCon>
            {data.map((item: any, index: any) => (
              <span
                key={index}
                onClick={() => (item.function ? item.function(record) : {})}
                style={{color:item.color?item.color:''}}
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
      cancelText: "取消",
      onOk: () => {
        internPostgraduateApi
          .deleteFormData(record.id)
          .then(res => {
            if (res.code == 200) {
              Message.success("文件删除成功");
              bacisPostgraduateData.onload();
            } else {
              Message.error(`${res.dec}`);
            }
          })
          .catch(e => {});
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
    setEditParams(record),
    setEditVisible(true);
    // addPostgraduateModal.show({
    //   id: record.id,
    //   onOkCallBack: () => {
    //     Message.success("修改成功");
    //     bacisPostgraduateData.onload();
    //   }
    // });
  };

  const handleEditOk = () => {
    setEditVisible(false);
    Message.success("修改成功");
    bacisPostgraduateData.onload();/*  */
    
  };

  return (
    <Wrapper>
      <BaseTable
        loading={bacisPostgraduateData.tableLoading}
        dataSource={bacisPostgraduateData.tableList}
        columns={columns}
        surplusHeight={230}
        surplusWidth={100}
        pagination={{
          current: bacisPostgraduateData.pageIndex,
          total: bacisPostgraduateData.total,
          pageSize: bacisPostgraduateData.pageSize,
        }}
        onChange={(pagination) => {
          bacisPostgraduateData.pageIndex = pagination.current;
          bacisPostgraduateData.total = pagination.total;
          bacisPostgraduateData.pageSize = pagination.pageSize;
          bacisPostgraduateData.onload();
        }}
      />
     <AddPostgraduateModal
        visible={editVisible}
        allowClear={createClear}
        params={editParams}
        onCancel={() => setEditVisible(false)}
        onOk={handleEditOk}
      />
    </Wrapper>
  );
});
const Wrapper = styled.div`
  padding: 0 20px;
  box-sizing: border-box;
`;
