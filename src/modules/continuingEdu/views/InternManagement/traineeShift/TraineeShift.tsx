import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { TabledCon } from "src/components/BaseTable";
import {
  Input,
  Button,
  message as Message,
  Modal,
  Tooltip,
  DatePicker,
  Select
} from "src/vendors/antd";
import moment from "moment";
import { PageTitle } from "src/components/common";
import BaseTable, { DoCon } from "src/components/BaseTable";
import { traineeShiftApi } from "./api/TraineeShiftApi"; // 接口
import { traineeShiftModal } from "./TraineeShiftModal"; // 仓库数据
import EditDeptModal from "./modal/EditDeptModal"; // 添加修改弹窗
import EditGroupModal from "./modal/EditGroupModal"; // 添加修改弹窗
import AddGroupModal from "./modal/AddGroupModal"; // 添加分组弹窗
import AddSecondMenuModal from "./modal/AddSecondMenuModal"; // 添加新增轮转信息弹窗
import { appStore,authStore } from "src/stores";

interface Props {
  getTitle: any;
  getId: any;
}

const {Option}  = Select;
export default observer(function TraineeShift(props: Props) {
  const { getTitle, getId } = props; //获取当前页面标题
  const [tableList, setTableList] = useState(new Array()); //保存轮科时间表单入参
  const [showWeek, setShowWeek] = useState(false); //日期、周切换开关（true——周）
  const [editDeptBtn, setEditDeptBtn] = useState(false); //科室弹窗
  const [editGroupBtn, setEditGroupBtn] = useState(false); //小组弹窗
  const [addGroupBtn, setAddGroupBtn] = useState(false); //新建分组
  const [addTitleBtn, setAddTitleBtn] = useState(false); //新建轮转信息
  const [rowId, setRowId] = useState(""); //新建分组
  const [groupNum, setGroupNum] = useState(null); //小组名称
  const [titleList, setTitleList] = useState([] as any) //选择不同时段的值
  const [titleCurr, settitleCurr] = useState("" as any) //选择不同时段的值
  const [isAdd,setIsAdd] = useState(false) //权限仅护理部主任和肖瑞芬护士长拥有

  
  

  const handeldddd = () =>{
    // 查询二级子菜单
    traineeShiftApi.queryAllRotationScheduleSheets().then((res)=>{
      setTitleList(res.data)
      if(res.data){
        let list:any[] = res.data
        list.map((item:any,index:any)=>{
          if(index == 0){
          console.log(item);
          traineeShiftModal.sheetId = item.id
          settitleCurr(item.title)
          }
        })
        traineeShiftModal.onload()
      }
    })
  }
  // 初始化数据
  useEffect(() => {
    handeldddd()
    // traineeShiftModal.sheetId = getId;
    traineeShiftModal.initRaunchy();
    // traineeShiftModal.onload();
  }, []);

  useEffect(()=>{
    if(!authStore.isDepartment){
      setIsAdd(true)
    }
  },[isAdd])

 

  // 表格姓名函数分装
  const setTextData = (data: any) => {
    if (data && data.length) {
      let str = "";
      let str1 = "";
      let str2 = "";
      let semicolon = "";
      data.map((item: any, i: any) => {       
        let subDepartmentName = item.subDepartmentName && JSON.parse(item.subDepartmentName)
        let deptName = subDepartmentName && subDepartmentName.join("|")
        let text = item.empName || "";
        if(!deptName) {
          var text1 = `${item.empName}` || "";
        } else {
          var text1 = `${item.empName}:${deptName}` || "";
        }
        let semicolon1 = text && i !== data.length - 1 ? " 、" : "";
        if (data.length < 4) {
          semicolon = text && i !== data.length - 1 ? " 、" : "";
        } else {
          semicolon = text && i < 2 ? " 、" : "";
        }
          str1 += text + semicolon;
        
        str += text + semicolon1;
        str2 += text1 + semicolon1;
      });
      
      return data.length > 3 ? (
        <Tooltip placement="right" title={str2} overlayStyle={{minWidth: 1150}}>
          {`${str1}...`}
        </Tooltip>
      ) : (
        <Tooltip placement="right" title={str2} overlayStyle={{minWidth: 1150}}>
        {`${str}`}
      </Tooltip>
       
      );
    } else {
      return "";
    }
  };

  // 动态科室对应的列
  const rotateList = [] as any;
  if (traineeShiftModal.tableDeptList.length) {
    let tableDeptList = traineeShiftModal.tableDeptList;
    tableDeptList.map((item: any, index: number) => {
      rotateList.push({
        title: item.deptName,
        dataIndex: "rotateGroupsList",
        width: 320,
        align: "center",
        render: (text: any, record: any, idx: any) => {
          const rotateTimesList: any = record.rotateTimesList || [];
          const dataIndex = rotateTimesList.findIndex(
            (obj: any) => obj.deptCode === item.deptCode
          );
          const { beginTime = "", endTime = "", intervalOfWeeks = "" } =
            rotateTimesList[dataIndex] || {};
          return !showWeek ? (
            <DatePicker.RangePicker
              allowClear
              style={{ width: 250 }}
              value={beginTime ? [moment(beginTime), moment(endTime)] : []}
              onChange={(date: any) => {
                if (dataIndex >= 0) {
                  record.rotateTimesList[dataIndex].beginTime = date[0]
                    ? date[0].format("YYYY-MM-DD")
                    : null;
                  record.rotateTimesList[dataIndex].endTime = date[1]
                    ? date[1].format("YYYY-MM-DD")
                    : null;
                } else {
                  const { deptCode, sheetId, deptName } = item;
                  rotateTimesList.push({
                    beginTime: date[0] ? date[0].format("YYYY-MM-DD") : null,
                    endTime: date[1] ? date[1].format("YYYY-MM-DD") : null,
                    deptCode,
                    sheetId,
                    deptName
                  });
                }
                setTableList(traineeShiftModal.tableList);
                const arrOne = traineeShiftModal.tableList.slice();
                traineeShiftModal.tableList = [];
                traineeShiftModal.tableList = arrOne;
              }}
            />
          ) : (
            <Input
              style={{
                background: "#fff",
                color: "rgb(0,0,0,0.65)"
              }}
              disabled
              value={intervalOfWeeks || "-- --"}
            />
          );
        }
      });
    });
  }
  // input输入
  // if (traineeShiftModal.tableDeptList.length) {
  //   let tableDeptList = traineeShiftModal.tableDeptList;
  //   tableDeptList.map((item: any, index: number) => {
  //     rotateList.push({
  //       title: item.deptName,
  //       dataIndex: "rotateGroupsList",
  //       width: 120,
  //       align: "center",
  //       render: (text: any, record: any) => {
  //         const rotateTimesList: any = record.rotateTimesList || [];
  //         let dataIndex = rotateTimesList.findIndex(
  //           (obj: any) => item.deptCode === obj.deptCode
  //         );
  //         const { beginTime = "", endTime = "" } =
  //           rotateTimesList[dataIndex] || {};
  //         return (
  //           <Input
  //             defaultValue={beginTime ? `${beginTime} ~ ${endTime}` : ""}
  //             onChange={(e: any) => {
  //               const time = e.target.value;
  //               if (!time.trim()) return;
  //               const rotateTimesList: any = record.rotateTimesList || [];
  //               let dataIndex = rotateTimesList.findIndex(
  //                 (obj: any) => item.deptCode === obj.deptCode
  //               );
  //               const beginTime = time.substring(0, time.indexOf("~")).trim();
  //               const endTime = time.substring(time.indexOf("~") + 1).trim();
  //               if (dataIndex >= 0) {
  //                 record.rotateTimesList[dataIndex].beginTime = beginTime;
  //                 record.rotateTimesList[dataIndex].endTime = endTime;
  //               } else {
  //                 const { deptCode, sheetId, deptName } = item;
  //                 record.rotateTimesList.push({
  //                   deptCode,
  //                   sheetId,
  //                   beginTime,
  //                   endTime,
  //                   deptName,
  //                 });
  //               }
  //               const recordIndex = traineeShiftModal.tableList.findIndex(
  //                 (o: any) => record.id === o.id
  //               );
  //               traineeShiftModal.tableList[recordIndex] = record;
  //               setTableList(traineeShiftModal.tableList);
  //             }}
  //           />
  //         );
  //       },
  //     });
  //   });
  // }

  //表格数据
  const columns: any = [
    {
      title: "组别",
      dataIndex: "groupNum",
      width: 80,
      align: "center",
      fixed: "left",
      render: (text: any, record: any) => {
        return (
          <Input
            value={text ? text : undefined}
            onChange={(e: any) => {
              record.groupNum = Number(e.target.value);
              setTableList(traineeShiftModal.tableList);
              const arrOne = traineeShiftModal.tableList.slice();
              traineeShiftModal.tableList = [];
              traineeShiftModal.tableList = arrOne;
            }}
          />
        );
      }
    },
    {
      title: "姓名",
      dataIndex: "rotatePersonsList",
      width: 180,
      align: "center",
      fixed: "left",
      className: "rotatePersonsList",
      render(text: any) {  
        return setTextData(text);
      }
    },
    ...rotateList,
    // {
    //   title: "教学查房时间",
    //   dataIndex: "teachingRoundTime",
    //   width: traineeShiftModal.tableDeptList.length ? 280 : 850,
    //   align: "center",
    //   render(text: any, record: any) {
    //     return (
    //       <DatePicker
    //         disabled={showWeek}
    //         size="small"
    //         showTime
    //         allowClear
    //         value={text ? moment(text) : undefined}
    //         format="YYYY-MM-DD HH:mm"
    //         onChange={(value: any) => {
    //           record.teachingRoundTime = value
    //             ? value.format("YYYY-MM-DD HH:mm")
    //             : null;
    //           setTableList(traineeShiftModal.tableList);
    //           const arrOne = traineeShiftModal.tableList.slice();
    //           traineeShiftModal.tableList = [];
    //           traineeShiftModal.tableList = arrOne;
    //         }}
    //       />
    //     );
    //   }
    // },
    authStore.isDepartment && {
      title: "操作",
      key: "cz",
      width: 100,
      render(text: any, record: any) {
        return (
          <DoCon>
            <span onClick={() => handleDelete(record)}>删除</span>
          </DoCon>
        );
      }
    }
  ];

  //删除计划表单条数据
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
        traineeShiftApi
          .deleteGroup(record.id)
          .then(res => {
            if (res.code == 200) {
              Message.success("删除成功");
              traineeShiftModal.onload();
            } else {
              Message.error(`${res.dec}`);
            }
          })
          .catch(e => { });
      }
    });
  };

  // 保存轮科时间
  const saveAllRotateTimesYaXin = () => {
    let obj: any = {
      sheetId: traineeShiftModal.sheetId,
      rotateGroupList: tableList
    };
    traineeShiftApi
      .saveAllRotateTimesYaXin(obj)
      .then(res => {
        if (res.code == 200) {
          Message.success("保存成功");
          traineeShiftModal.onload();
        } else {
          Message.error(`${res.dec}`);
        }
      })
      .catch(e => { });
  };

  // 取消弹窗
  const handleEditCancel = () => {
    // setRowId("");
    setEditDeptBtn(false);
    setEditGroupBtn(false);
    setAddGroupBtn(false);
    
  };
  const handleEditOk = () => {
    traineeShiftModal.onload();
    handleEditCancel();
  };

  //双击表单
  const handleEdit = (record: any) => {
    setEditGroupBtn(true);
    setGroupNum(record.groupNum);
    traineeShiftModal.groupId = record.id;
  };

  // 选择不同时间的轮班
  const handRoun = (value:any) =>{
    console.log(value);
    titleList.map((item:any,index:any)=>{
      if(item.title == value){
        traineeShiftModal.sheetId = item.id;
        traineeShiftModal.onload()
      }
    })
    
  }

  return (
    <Wrapper>
      <PageHeader>
        <LeftIcon>
          <PageTitle maxWidth={1500}>
          <Select defaultValue={getTitle} style={{ width: 200 }} allowClear onChange={handRoun} disabled={isAdd}>
            {titleList.map((item:any)=>{
             return <Option value={item.title} key={item.id}>{item.title}</Option>
            })}
          </Select>
          <Button disabled={isAdd} type="primary" shape="circle" size="small" className="butAddlistYear" onClick={()=>{
            setAddTitleBtn(true);
          }}> 
            +
          </Button>
          </PageTitle>
        </LeftIcon>
        <RightIcon>
          <Input
            style={{ width: 280, marginLeft: 5, marginRight: -5 }}
            placeholder="请输入姓名关键字进行检索"
            value={traineeShiftModal.keyWord}
            onChange={e => {
              traineeShiftModal.keyWord = e.target.value;
            }}
            disabled={isAdd}
          />
          <Button
            type="primary"
            onClick={() => {
              traineeShiftModal.onload();
            }}
            disabled={isAdd}
          >
            查询
          </Button>
          <Button disabled={isAdd}  onClick={() => setEditDeptBtn(true)}>编辑实习科室</Button>
          <Button disabled={isAdd} onClick={() => setAddGroupBtn(true)}>添加分组</Button>
          <Button
            disabled={isAdd}
            onClick={() => {
              traineeShiftModal.getImportTemplate();
            }}>
            下载模板
          </Button>
          <Button
            disabled={isAdd}
            onClick={() => {
              traineeShiftModal.import();
            }}>
            导入
          </Button>
          <Button
            disabled={isAdd}
            onClick={() => {
              traineeShiftModal.export();
            }}
          >
            导出
          </Button>
          {showWeek ? (
            <Button onClick={() => setShowWeek(false)} disabled={isAdd}>显示日期</Button>
          ) : (
            <Button onClick={() => setShowWeek(true)} disabled={isAdd}>显示周数</Button>
          )}
          <Button
            disabled={showWeek || isAdd}
            type="primary"
            onClick={() => saveAllRotateTimesYaXin()}
          >
            保存
          </Button>
        </RightIcon>
      </PageHeader>
      <Content>
        <BaseTable
          loading={traineeShiftModal.tableLoading}
          dataSource={traineeShiftModal.tableList}
          columns={columns}
          surplusWidth={300}
          surplusHeight={230}
          onRow={(record: any) => {
            return {
              onDoubleClick: () => {
                if(isAdd){
                  Message.warning('只有护理部的成员才可以打开！')
                  return
                }
                setRowId(record.id);
                handleEdit(record);
              }
            };
          }}
          rowClassName={(record: any, index: any): string => {
            if (record.id == rowId) return "row__bg__color";
            return "";
          }}
        />
      </Content>
      <EditDeptModal
        visible={editDeptBtn}
        onCancel={handleEditCancel}
        onOk={handleEditOk}
      />
      <EditGroupModal
        groupNum={groupNum}
        visible={editGroupBtn}
        onCancel={handleEditCancel}
        onOk={handleEditOk}
      />
      <AddGroupModal
        visible={addGroupBtn}
        onCancel={handleEditCancel}
        onOk={handleEditOk}
      />
      <AddSecondMenuModal
        visible={addTitleBtn}
        onCancel={()=>{
          setAddTitleBtn(false);
        }}
        onOk={()=>{
          if(isAdd){
            Message.warning('只有护理部的成员才可以打开！')
            return
          }
          traineeShiftModal.onload();
          setAddTitleBtn(false);
          handeldddd()
        }}
      />
    </Wrapper>
  );
});
const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  .rotatePersonsList {
    cursor: pointer;
  }
`;
const PageHeader = styled.div`
  width: calc(100vw - 200px);
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
  .butAddlistYear{
    margin-left:-10px;
    font-weight:bold;
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
  .ant-table-tbody > .ant-table-row-hover {
    background: #fff !important;
    > td {
      background: #fff !important;
    }
  }

  .ant-table-tbody > tr:hover:not(.ant-table-expanded-row) > td {
    background: #fff !important;
  }

  .ant-table-tbody > .row__bg__color:hover:not(.ant-table-expanded-row) > td {
    background: #d4e5dd !important;
  }

  .ant-table-tbody > .row__bg__color.ant-table-row-hover {
    background: #d4e5dd !important;
    > td {
      background: #d4e5dd !important;
    }
  }

  .row__bg__color {
    td {
      background-color: #d4e5dd;

      .ant-calendar-picker-input,
      .ant-input {
        background-color: #d4e5dd;
      }
    }
  }

  .ant-input {
    border: 0;
    border-radius: 0;
    text-align: center;
    outline: 0;
    box-shadow: none !important;
    padding: 4px;
  }
  .ant-input-disabled {
    background: #fff !important;
    color: rgb(0, 0, 0, 0.65) !important;
  }
`;
