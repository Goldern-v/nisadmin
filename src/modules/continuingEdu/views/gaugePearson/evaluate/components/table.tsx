import styled from "styled-components";
import { observer } from "mobx-react-lite";
import React, { useState, useEffect } from "react";
import BaseTable, { DoCon } from "src/components/BaseTable";
import { InputNumber, Modal, message as Message, DatePicker } from "antd";
import { trainingSettingApi } from "../../api/TrainingSettingApi";
import {evaluateDatas} from "../data"
import { appStore } from "src/stores";
import moment from 'moment';
import { getFileType, getFilePrevImg } from "src/utils/file/file";
import ReactZmage from "react-zmage";
import PreviewModal from "src/utils/file/modal/PreviewModal";
import createModal from "src/libs/createModal";

interface Props {}

export default observer(function ApplyTable(props: Props) {
  const [editVisible, setEditVisible] = useState(false); // 控制一弹窗状态
  const [editParams, setEditParams] = useState({} as any); //修改弹窗回显数据
  const [tablequery, setTableQuery] = useState({
    pageIndex: 1,
    pageSize: 20,
    quarter: '',
    keyWord: '',
  } as any)

  const columns: any = [
    {
      title: "姓名",
      dataIndex: "empName",
      align: "center",
      width: 120
    },
    {
      title: "科室",
      dataIndex: "deptName",
      align: "center",
      width: 120
    },
    {
      title: "规培时间",
      dataIndex: "planTrainBeginTime",
      align: "center",
      width: 180,
      render(text: any, record: any) {
        return (
          <span>{record.planTrainBeginTime}~{record.planTrainEndTime}</span>
          // <DatePicker.RangePicker
          //     allowClear
          //     style={{ width: 250 }}
          //     value={record.planTrainBeginTime ? [moment(record.planTrainBeginTime), moment(record.planTrainEndTime)] : []}
          //     onChange={(date: any[]) => {
          //       record.planTrainBeginTime = moment(date[0]).format("YYYY-MM-DD")
          //       record.planTrainEndTime = moment(date[1]).format("YYYY-MM-DD")

          //       const arrOne = evaluateDatas.tableList.slice();
          //       evaluateDatas.tableList = [];
          //       evaluateDatas.tableList = arrOne;
          //     }}
          //   />
        );
      },
	  onCell(record: any, rowIndex: any) {
		return {
			className: 'td-inner-time',
		}
		
	}
    },
    {
      title: "护士长",
      dataIndex: "headNurseScore",
      align: "center",
      width: 80,
      render(text: any, record: any) {
        return (
          <InputNumber step="0.1" min={0.0} value={record.headNurseScore} onChange={(value: any) => {
            editTableList(value,record,'headNurseScore')
          }}/>
        );
      }
    },
    {
      title: "带教",
      dataIndex: "teachScore",
      align: "center",
      width: 100,
      render(text: any, record: any) {
        return (
          <InputNumber step="0.1" min={0.0}  value={record.teachScore} onChange={(value: any) => {
            editTableList(value,record,'teachScore')
          }}/>
        );
      }
    },
    {
      title: "床边老师",
      dataIndex: "besideTeacherScore",
      align: "center",
      width: 100,
      render(text: any, record: any) {
        return (
          <InputNumber step="0.1" min={0.0} value={record.besideTeacherScore} onChange={(value: any) => {
            editTableList(value,record,'besideTeacherScore')
          }}/>
        );
      }
    },
    {
      title: "护士1",
      dataIndex: "nurse1Score",
      align: "center",
      width: 100,
      render(text: any, record: any) {
        return (
          <InputNumber step="0.1" min={0.0} value={record.nurse1Score} onChange={(value: any) => {
            editTableList(value,record,'nurse1Score')
          }}/>
        );
      }
    },
    {
      title: "护士2",
      dataIndex: "nurse2Score",
      align: "center",
      width: 100,
      render(text: any, record: any) {
        return (
          <InputNumber step="0.1" min={0.0} value={record.nurse2Score} onChange={(value: any) => {
            editTableList(value,record,'nurse2Score')
          }}/>
        );
      }
    },
    {
      title: "理论成绩",
      dataIndex: "theoryScore",
      align: "center",
      width: 100,
      render(text: any, record: any) {
        // console.log(record, text, 888)
        return (
          <InputNumber step="0.1" min={0.0} value={record.theoryScore} disabled style={{color:'#000'}}/>
        );
      }
    },
    {
      title: "操作成绩",
      dataIndex: "operationScore",
      align: "center",
      width: 100,
      render(text: any, record: any) {
        // console.log(record, text, 888)
        return (
          <InputNumber step="0.1" min={0.0} value={record.operationScore} disabled style={{color:'#000'}}/>
        );
      }
    },
    {
      title: "床边综合能力",
      dataIndex: "bedMultipleScore",
      align: "center",
      width: 100,
      render(text: any, record: any) {
        // console.log(record, text, 888)
        return (
          <InputNumber step="0.1" min={0.0} value={record.bedMultipleScore} disabled style={{color:'#000'}}/>
        );
      }
    },
    {
      title: "平均分",
      dataIndex: "averageScore",
      align: "center",
      width: 100,
      render(text: any, record: any) {
        // console.log(record, text, 888)
        return (
          <InputNumber step="0.1" min={0.0} value={record.averageScore} disabled style={{color:'#000'}}/>
        );
      }
    },
    {
      title: "操作",
      dataIndex: "cz",
      width: 100,
      align: "center",
      render(text: any, record: any) {
        let data: any = [
        {
          text: "删除",
          color:'#f44',
          function: handleDelete
        }];
        return (
          <DoCon>
            {data.map((item: any, index: any) => (
              <span
                key={index}
                style={{color:item.color?item.color:''}}
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

  const editTableList =(value:string, list:any, code:string) => {
    list[code] = value
    list.averageScore  = Number(list.headNurseScore + list.teachScore + list.besideTeacherScore + list.nurse1Score + list.nurse2Score) / 5
    const arrOne = evaluateDatas.tableList.slice();
    evaluateDatas.tableList = [];
    evaluateDatas.tableList = arrOne;
  }

  //删除
  const handleDelete = (record: any) => {
    let content = (
      <div>
        <div>您确定要清除选中记录的数据吗？</div>
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
          .deleteQueryPageList({
            "personId": record.personId,
    		"deptCode": record.deptCode
          })
          .then(res => {
            if (res.code == 200) {
              Message.success("数据清除成功");
              evaluateDatas.onload();
            } else {
              Message.error(`${res.dec}`);
            }
          })
          .catch(e => {});
      }
    });
  };

  const previewModal = createModal(PreviewModal);
   // 点击预览
   const handlePreview = (record:any) => {
    if (getFileType(record.coursePath) == "img")
      ReactZmage.browsing({
        backdrop: "rgba(0,0,0, .8)",
        set: [{ src: record.coursePath }],
      });
    else
    console.log(record);
      previewModal.show({
        title: record.courseName,
        path: record.coursePath,
      });
  };

  // 下载
  const handDownload = (record: any) => {
    console.log(record.coursePath);
    let a = document.createElement("a");
    a.href = record.coursePath;
    a.download = record.courseName; // 自定义文件名
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a); // 移除a元素
  };
  const handleEditCancel = () => {
    setEditVisible(false);
    setEditParams({});
  };
  const handleEditOk = () => {
    handleEditCancel();
  };

  return (
    <Wrapper>
      <BaseTable
        loading={evaluateDatas.tableLoading}
        dataSource={evaluateDatas.tableList}
        columns={columns}
        surplusHeight={230}
        // pagination={{
        //   current: evaluateDatas.pageIndex,
        //   total: evaluateDatas.total,
        //   pageSize: evaluateDatas.pageSize,
        // }}
        onChange={(pagination) => {
          evaluateDatas.onload();
        }}
      />
      <previewModal.Component />
    </Wrapper>
  );
});
const Wrapper = styled.div`
  padding: 0 20px;
  box-sizing: border-box;
  .ant-input-number{
    border: none;
  }
  .ant-input-number-input{
    text-align: center;
  }
  .ant-table-wrapper td.td-inner-time{
	padding: 0 !important;
  }
  .ant-input-number-handler-wrap{
    display: none;
  }
  .ant-input-number{
    background-color: transparent !important;
  }
  .ant-input-number{
    box-shadow: 0 0 0 0 rgb(0 166 128 / 20%) !important;
  }
`
