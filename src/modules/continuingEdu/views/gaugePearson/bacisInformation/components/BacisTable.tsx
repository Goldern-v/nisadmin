import styled from "styled-components";
import { observer } from "mobx-react-lite";
import React, { useState, useEffect } from "react";
import BaseTable, { DoCon } from "src/components/BaseTable";
import { Button, Modal, message as Message } from "antd";
import { bacisManagData } from "../bacisPostgraduate";
import { trainingSettingApi } from "../../api/TrainingSettingApi";
import AddInternModal from "../model/AddInternModal"; // 修改弹窗
import { appStore,authStore } from "src/stores";
import qs from "qs";

interface Props {}

export default observer(function ApplyTable(props: Props) {
  const [editVisible, setEditVisible] = useState(false); // 控制一弹窗状态
  const [editParams, setEditParams] = useState({} as any); //修改弹窗回显数据
  const [createClear, setCreateClear] = useState(true)
  const [isAdd,setIsAdd] = useState(false) //权限仅护理部主任和肖瑞芬护士长拥有

  useEffect(()=>{
    if(!authStore.isXiaoRuiFen && !authStore.isHoundSing && !authStore.isSuperAdmin){
      setIsAdd(true)
    }
  },[isAdd])


  const columns: any = [
    {
      title: "区域",
      dataIndex: "region",
      align: "center",
      width: 100
    },
    {
      title: "序号",
      dataIndex: "",
      render: (text: any, record: any, index: number) => index + 1,
      align: "center",
      width: 50
    },
    {
      title: "SAP代码",
      dataIndex: "sapCode",
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
      title: "科室",
      dataIndex: "studyDeptName",
      align: "center",
      width: 120
    },
    {
      title: "在职情况",
      dataIndex: "incumbency",
      align: "center",
      width: 120
    },
    {
      title: "性别",
      dataIndex: "sex",
      align: "center",
      width: 60
    },
    {
      title: "出生日期",
      dataIndex: "birthday",
      align: "center",
      width: 120
    },
    {
      title: "学历",
      dataIndex: "education",
      align: "center",
      width: 100
    },
    {
      title: "学位",
      dataIndex: "degree",
      align: "center",
      width: 100
    },
    {
      title: "分配日期",
      dataIndex: "distributionDate",
      align: "center",
      width: 120
    },
    {
      title: "转正日期",
      dataIndex: "formalDate",
      align: "center",
      width: 120
    },
    {
      title: "备注",
      dataIndex: "remark",
      align: "center",
      width: 200
    },
    {
      title: "操作",
      dataIndex: "cz",
      width: 120,
      align: "center",
      render(text: any, record: any) {
        let data: any =[
          {
            text: "修改",
            function: handReWrite
          },
          {
            text: "删除",
            function: handleDelete,
            color:'#f33'
          }
        ];
        return (
          <DoCon>
            {data.map((item: any, index: any) => (
              <span
                key={index}
                onClick={() => (item.function ? item.function(record) : {})}
                style={{color:item.color?item.color:'',}}
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
    // if(isAdd){
    //   Message.warning('这是要护士长权限才可以操作！');
    //   return
    // }
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
        trainingSettingApi
          .deleteForm(record.id)
          .then(res => {
            if (res.code == 200) {
              Message.success("文件删除成功");
              bacisManagData.onload();
            } else {
              Message.error(`${res.dec}`);
            }
          })
          .catch(e => {});
      }
    });
  };
  
  // 修改
  const handReWrite = (record: any) => {
    // if(isAdd){
    //   Message.warning('这是要护士长权限才可以操作！');
    //   return
    // }
    setEditParams(record);
    setEditVisible(true);
  };
  const handleEditOk = () => {
    setEditVisible(false);
    Message.success('修改成功！')
    bacisManagData.onload();
  };

  return (
    <Wrapper>
      <BaseTable
        loading={bacisManagData.tableLoading}
        dataSource={bacisManagData.tableList}
        columns={columns}
        surplusHeight={230}
        surplusWidth={100}
        pagination={{
          current: bacisManagData.pageIndex,
          total: bacisManagData.total,
          pageSize: bacisManagData.pageSize,
        }}
        onChange={(pagination) => {
          bacisManagData.pageIndex = pagination.current;
          bacisManagData.total = pagination.total;
          bacisManagData.pageSize = pagination.pageSize;
          bacisManagData.onload();
        }}
      />
       <AddInternModal
        allowClear={createClear}
        visible={editVisible}
        params={editParams}
        dataList={bacisManagData.teachingList || []}
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
