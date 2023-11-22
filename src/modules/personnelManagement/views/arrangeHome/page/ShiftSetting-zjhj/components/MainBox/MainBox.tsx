import update from 'immutability-helper'
import createModal from 'src/libs/createModal'
import emitter from 'src/libs/ev'
import service from 'src/services/api'
import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { RouteComponentProps } from 'react-router'
import { message, Switch, Tag } from 'antd'
import { appStore, authStore, scheduleStore } from 'src/stores'
import { globalModal } from 'src/global/globalModal'
import { Icon } from 'src/vendors/antd'
import moment from "moment";
import AddShiftModal from '../../modal/AddShiftModal'

export interface Props extends RouteComponentProps {
}

interface colorMap  {color:string, item:string, code:number}

let colorLumpMap: colorMap[] = [
  {item: '未提交', code: 0, color:''},
  {item: '待审核', code: 1, color:'#c87e15'},
  {item: '已通过', code: 2, color:'#04a580'},
  {item: '驳回', code: -1, color:'#ed564e'},
  {item: '已撤销', code: -2, color:'#adb7b5'},
]

export default function MainBox() {
  const [tableLoading, setTableLoading] = useState(false);
  const [shiftList, setShiftList] = useState(new Array());
  const pathName:boolean = appStore.location.pathname.includes('/ShiftSettingViewNewZJHJ')

  /** 禁用的班次 */
  const [disableArrangeList, setDisableArrangeList]: any = useState([]);

  /** 颜色 */
  const [colorMapCN, setColorMapCN]: [any, any] = useState({});

  const addShiftModal = createModal(AddShiftModal);

  const columns = [
    {
      title: "序号",
      dataIndex: "index",
      key: "index",
      width: 50,
      render: (text: string, record: any, index: any) => index + 1
    },
    {
      title: () => {
        return (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span>列入排班</span>
          </div>
        )
      },
      dataIndex: "status",
      key: "是否排班",
      width: 100,
      render: (text: any, record: any, index: any) =>
        record.id ? (
          <span>
            <Switch
              size="small"
              onChange={(check: any) => {
                record.status = check;
                setShiftList([...shiftList]);
              }}
              checked={text}
            />
          </span>
        ) : (
          ""
        )
    },
    {
      title: "班次名称",
      dataIndex: "name",
      key: "name",
      width: 150,
    },
    {
      title: "类别",
      dataIndex: "shiftType",
      key: "shiftType",
      width: 100,
    },
    {
      title: "颜色标记",
      dataIndex: "nameColor",
      key: "nameColor",
      width: 100,
      render: (text: string, record: any) =>
        text && text.length > 0 ? (
          <span>
              <Tag color={record.nameColor} key={text}>
                {colorMapCN[text]}
              </Tag>
          </span>
        ) : (
          ""
        )
    },
    {
      title: "上班时间",
      dataIndex: "workTime",
      key: "workTime",
      width: 200
    },
    {
      title: "工时(小时）",
      dataIndex: "effectiveTime",
      key: "effectiveTime",
      width: 90
    },
    {
      title: "白小时数",
      dataIndex: "settingMorningHour",
      key: "settingMorningHour",
      width: 90
    },
    {
      title: "夜小时数",
      dataIndex: "settingNightHour",
      key: "settingNightHour",
      width: 90
    },
    {
      title: "审核状态",
      dataIndex: "auditStatus",
      key: "auditStatus",
      width: 100,
      render: (text: string, record: any) =>{
        let data:colorMap | undefined = colorLumpMap.find((item: any)=> item.code == text)
        return (
          data && <span style={{color: data.color}}>
              {data.item}
            </span>
        )
      }
    },
  ]
  // 编辑排班设置
  let promise = (authStore.user && authStore.user.post) == "护理部" ||
      (authStore.user && authStore.user.empName) == "管理员" ||
      authStore.isRoleManage;
  if (promise) {
      columns.push({
        title: pathName ? "操作" : '审核流程',
        dataIndex: "title",
        width: 100,
        key: "title",
        render: (text: string, record: any) => {
          if (disableArrangeList.includes(record.name) || !shiftList.length || !record.id) {
            return "";
          } else {
            return (
              <DoCon>
                <span
                  onClick={(e: any) => {
                    addShiftModal.show({
                      editData: record,
                      clickType:"editForm",
                      identity:
                        authStore.isRoleManage &&
                        (authStore.user && authStore.user.empName) !== "管理员",
                      onOkCallBack: () => {
                        getShiftList();
                      }
                    });
                  }}
                >
                  查看
                </span>
                {
                  record.auditStatus == 1 && pathName ? 
                  <span
                  onClick={() => {
                    globalModal
                      .confirm("确认撤销", "确认撤销该套餐？")
                      .then(res => {
                        service.scheduleShiftApiService
                          .cancelZJHJ(record.id)
                          .then(res => {
                            emitter.emit("更新班次zjhj");
                          });
                        message.success(`撤销${record.name}成功`);
                      });
                  }}
                >
                  撤销
                </span>
                  : pathName &&<span
                  onClick={() => {
                    if(record.auditStatus == 2 ) return
                    globalModal
                      .confirm("确认删除", "确认删除该套餐？")
                      .then(res => {
                        service.scheduleShiftApiService
                          .deleteZJHJ({id: record.id, deptCode: scheduleStore.getDeptCode()})
                          .then(res => {
                            emitter.emit("更新班次zjhj");
                          });
                        message.success(`删除${record.name}成功`);
                      });
                  }}
                  style={{color: record.auditStatus == 2 ? '#adb7b5' : '#ed564e'}}
                >
                  删除
                </span>
                }
                
              </DoCon>
            );
          }
          
        }
      });
    
  }
  if(!pathName){
    columns.splice(2,0, {
      title: "科室",
      dataIndex: "deptName",
      key: "deptName",
      width: 120
    })
  }
  let allUser = new Array();
  let tableData = new Array();
  let selectedRowsArray = new Array();
  useEffect(() => {
    getShiftList();
    service.commonApiService.dictInfo("sch_range_no_change").then(res => {
      setDisableArrangeList(res.data.map((item: any) => item.name));
    });

    service.commonApiService.dictInfo("sch_range_color").then(res => {
      let colorMap: any = {};
      let colorMapCN: any = {};
      res.data.map((item: any) => {
        colorMap[item.name] = item.code;
        colorMapCN[item.code] = item.name;
      });
      setColorMapCN(colorMapCN);
    });
    //
  }, []); // <= 执行初始化操作，需要注意的是，如果你只是想在渲染的时候初始化一次数据，那么第二个参数必须传空数组。

  emitter.removeAllListeners("获取选中班次列表zjhj");
  emitter.removeAllListeners("更新班次zjhj");

  emitter.addListener("获取选中班次列表zjhj", (callback: any) => {
    if (callback) {
      callback(shiftList);
    }
  });

  emitter.addListener("更新班次zjhj", (data?:any) => {
    getShiftList(data||'');
  });
  const getShiftList = (data?:any) => {
    let deptCode = scheduleStore.getDeptCode(); // '2508' ||
    if(!pathName && !data){
      data = {
        deptCode: '',
        auditStatus: '1',
        startDate: moment().startOf('month').format("YYYY-MM-DD"),
        endDate:  moment().format("YYYY-MM-DD")
      }
    }
    setTableLoading(true);
    let obj = {
      deptCode,
      ...data
    }
    service.scheduleShiftApiService.getShiftListByCode(obj).then(res => {
      setTableLoading(false);

      let oneUser = new Object();
      allUser = new Array();
      selectedRowsArray = new Array();

      if (res && res.data) {
         tableData = res.data.list;
        
        let rowKeys = new Array();
        tableData.map((oneObj: any, index: number) => {
          if (oneObj.status === true) {
            rowKeys.push(oneObj.id);
          } else {
            oneObj.status = false;
          }
          oneUser = new Object();
          for (const key in data) {
            if (data.hasOwnProperty(key) && oneObj.hasOwnProperty(key)) {
              (oneUser as any)[key] = oneObj[key];
            }
            if (key === "id") {
              (oneUser as any).key = oneObj[key];
            }
          }
          (allUser as any).push(oneUser);
          selectedRowsArray.push(oneUser);
        });
        setShiftList(tableData);
      }
    });
  };

  const moveRow = (dragIndex: number, hoverIndex: number) => {
    const dragRow = shiftList[dragIndex];
    if (!dragRow) return;
    setShiftList(
      update(shiftList, {
        $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]]
      })
    );
  };

  const rowSelection = {
    onChange: (selectedRowKeys:any, selectedRows:any) => {
      emitter.emit('添加审核', selectedRows)
    },
    getCheckboxProps: (record:any) => ({
      disabled: record.auditStatus !== 1, // Column configuration not to be checked
      name: record.auditStatus,
    }),
  };
  return (
    <Wrapper>
      <div>
      {pathName ?<BaseTable
        bordered
        size="small"
        columns={columns}
        dataSource={shiftList}
        pagination={false}
        surplusHeight={272}
        fixedFooter={true}
        moveRow={moveRow}
        type={["diagRow", "spaceRow"]}
        loading={tableLoading}
        footer={() => (
          <span>
            <Icon
              type="info-circle"
              style={{ color: "#fa8c16", marginRight: "5px" }}
            />
            可以通过拖拽排序,修改数据后需保存
          </span>
        )}
      /> :
      <BaseTable
        bordered
        size="small"
        columns={columns}
        rowSelection={rowSelection}
        dataSource={shiftList}
        pagination={false}
        surplusHeight={272}
        fixedFooter={true}
        moveRow={moveRow}
        type={["diagRow", "spaceRow"]}
        loading={tableLoading}
        footer={() => (
          <span>
            <Icon
              type="info-circle"
              style={{ color: "#fa8c16", marginRight: "5px" }}
            />
            可以通过拖拽排序,修改数据后需保存
          </span>
        )}
      />}
      </div>

      <addShiftModal.Component />

    </Wrapper>
  );
}
const Wrapper = styled.div`
  /* background:green; */
  /* height: 100%; */
  /* padding: 0 20px 20px 20px; */
  table,
  tr,
  td,
  th,
  th div {
    text-align: center !important;
    padding: 3px !important;
    

  }
  table {
    width:1300px;
  }
  /* 表格前端打勾样式 */
  .ant-table-thead > tr > th.ant-table-selection-column,
  .ant-table-tbody > tr > td.ant-table-selection-column,
  .ant-table-thead > tr:first-child > th:first-child {
    width: 60px !important;
    max-width: 60px !important;
  }
`;
