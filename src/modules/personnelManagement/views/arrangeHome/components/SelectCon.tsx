import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { selectViewModal } from "../viewModal/SelectViewModal";
import { observer } from "mobx-react-lite";
import {
  DatePicker,
  Button,
  Select,
  message,
  Dropdown,
  Menu,
  Modal,
  Checkbox
} from "src/vendors/antd";
import { fileDownload } from "src/utils/file/file";
import { appStore, authStore } from "src/stores";
import DeptSelect from "src/components/DeptSelect";
import moment from "moment";
import { scheduleStore } from "src/stores";
import { arrangeService } from "../services/ArrangeService";
import { sheetViewModal } from "../viewModal/SheetViewModal";
import { printModal } from "../viewModal/PrintModal";
import service from "src/services/api";
import { DictItem } from "src/services/api/CommonApiService";
import createModal from "src/libs/createModal";
import ShowStandardTimeModal from "../modal/ShowStandardTimeModal";
export interface Props { }

export default observer(function SelectCon() {
  const [isInit, setIsInit] = useState(true);
  const [bigDeptList, setBigDeptList] = useState([]);
  const [date, setDate]: any = useState(() => {
    if (selectViewModal.params.startTime && selectViewModal.params.endTime) {
      return [
        moment(selectViewModal.params.startTime),
        moment(selectViewModal.params.endTime)
      ];
    } else {
      return [];
    }
  });
  const [deptCode, setDeptCode] = useState();

  const showStandardTimeModal = createModal(ShowStandardTimeModal);

  /** 日期*/
  // 获取星期一
  let getMonday = () => {
    let today: any = new Date();
    let weekday = today.getDay();
    let dd = new Date(1000 * 60 * 60 * 24 * (1 - weekday) + today.getTime());
    let y = dd.getFullYear();
    let m: any = dd.getMonth() + 1; //获取当前月份的日期
    m = parseInt(m, 10);
    if (m < 10) {
      m = "0" + m;
    }
    let d: any = dd.getDate();
    d = parseInt(d, 10);
    if (d < 10) {
      d = "0" + d;
    }
    return y + "-" + m + "-" + d;
  };
  // 获取星期日
  let getSunday = () => {
    var today = new Date();
    var weekday = today.getDay();
    var dd = new Date(1000 * 60 * 60 * 24 * (7 - weekday) + today.getTime());
    var y = dd.getFullYear();
    var m: any = dd.getMonth() + 1; //获取当前月份的日期
    m = parseInt(m, 10);
    if (m < 10) {
      m = "0" + m;
    }
    var d: any = dd.getDate();
    d = parseInt(d, 10);
    if (d < 10) {
      d = "0" + d;
    }
    return y + "-" + m + "-" + d;
  };
  // 日期变化函数
  const dateChange = (dates: any, dateString: any) => {
    if (dates && dates[0] && dates[1]) {
      let isOk =
        dates[1]._d.getTime() - dates[0]._d.getTime() > 2678400000 * 12;
      if (isOk) {
        dates[1]._d = new Date(dates[0]._d.getTime() + 2678400000 * 12);
        message.warning("日期范围不能超过一年！");
      }
      setDate(dates);
      selectViewModal.setParams(
        "startTime",
        moment(dates[0]._d).format("YYYY-MM-DD")
      );
      selectViewModal.setParams(
        "endTime",
        moment(dates[1]._d).format("YYYY-MM-DD")
      );
    }
  };

  // 科室
  const handleChange = (value: any) => {
    setDeptCode(value);
    selectViewModal.setParams("deptCode", value);
    let obj = {
      deptCode: value
    };
    arrangeService.getByDeptCode(obj).then(res => {
      selectViewModal.params.groupList = res.data;
    });
  };

  // 分组数据
  const handleGroupChange = (value: any) => {
    selectViewModal.setParams("group", value);
  };

  // 导出科室Excel
  const exportExcel = () => {
    let data = {
      deptCode: selectViewModal.params.deptCode,
      startTime: selectViewModal.params.startTime,
      endTime: selectViewModal.params.endTime
    };
    arrangeService.export(data).then(res => {
      fileDownload(res);
    });
  };

  // 导出片区Excel
  const exportBigDeptExcel = (param: any) => {
    console.log(param, "paramparam");
    let data = {
      deptCode: selectViewModal.params.deptCode,
      startTime: selectViewModal.params.startTime,
      endTime: selectViewModal.params.endTime,
      bigDeptCode: param.key,
      bigDeptName: param.item.props.children
    };
    arrangeService.export(data).then(res => {
      fileDownload(res);
    });
  };

  let handleStatusChange = () => {
    setDate([
      moment(getMonday(), "YYYY-MM-DD"),
      moment(getSunday(), "YYYY-MM-DD")
    ]);
    selectViewModal.setParams(
      "startTime",
      moment(getMonday(), "YYYY-MM-DD").format("YYYY-MM-DD")
    );
    selectViewModal.setParams(
      "endTime",
      moment(getSunday(), "YYYY-MM-DD").format("YYYY-MM-DD")
    );
    selectViewModal.setParams("group", "");
    setIsInit(false);
  };

  const getBigDept = () => {
    service.commonApiService.getBigDeptListSelfList().then(res => {
      setBigDeptList(res.data || []);
    });
  };

  useEffect(() => {
    if (appStore.queryObj.noRefresh == "1") {
      appStore.history.replace("/personnelManagement/arrangeHome");
    } else {
      if (isInit) {
        handleStatusChange();
      }
    }
    getBigDept();
  }, []);

  const toPrint = () => {
    if (appStore.HOSPITAL_ID == "nys") {
      let visibleArr = ['nurseHierarchy', 'newTitle', 'year', 'total1', 'thisWeekHoliday', 'totalHoliday']
      Modal.confirm({
        title: '选择要打印的列',
        centered: true,
        width: 600,
        content: <div style={{ marginTop: 30 }}>
          <Checkbox.Group
            defaultValue={visibleArr}
            onChange={(newArr: any[]) => visibleArr = newArr}>
            <Checkbox value="nurseHierarchy">层级</Checkbox>
            <Checkbox value="newTitle">职称</Checkbox>
            <Checkbox value="year">年限</Checkbox>
            <Checkbox value="total1">工时小计</Checkbox>
            <Checkbox value="thisWeekHoliday">本周积假</Checkbox>
            <Checkbox value="totalHoliday">累积积假</Checkbox>
            {/* <Checkbox value="total2">夜小时数</Checkbox> */}
          </Checkbox.Group>
        </div>,
        onOk: () => {
          console.log(visibleArr)
          printModal.printArrangeNys(visibleArr)
        }
      })
    } else {
      printModal.printArrange();
    }
  };

  const bigDeptmenu = (
    <Menu onClick={exportBigDeptExcel}>
      <Menu.Item key='全院'>全院</Menu.Item>
      {bigDeptList.map((item: DictItem) => (
        <Menu.Item key={item.code}>{item.name}</Menu.Item>
      ))}
    </Menu>
  );

  // 南医三批量导出
  const handleExport = () => {
    let obj = {
      deptCodes: sheetViewModal.deptCodeList,
      startTime: selectViewModal.params.startTime,
      endTime: selectViewModal.params.endTime,
    }
    if (sheetViewModal.deptCodeList && sheetViewModal.deptCodeList.length > 0) {
      arrangeService.exportNys(obj).then(res => {
        fileDownload(res);
      })
    } else {
      message.warning('批量导出前请先选择科室！');
    }
  };

  return (
    <Wrapper>
      <LeftIcon>
        <div className="item">
          <div className="label data">日期：</div>
          <div className="content">
            <DatePicker.RangePicker
              ranges={{
                本周: [moment().startOf("week"), moment().endOf("week")],
                上周: () => {
                  /** 判断是否是一周 */
                  let weeks = date[0].week();
                  let _date = date[0].format("YYYY-MM-DD");
                  if (
                    date[0].format("YYYY-MM-DD") ==
                    date[0].startOf("week").format("YYYY-MM-DD") ||
                    date[1].format("YYYY-MM-DD") ==
                    date[0].endOf("week").format("YYYY-MM-DD")
                  ) {
                    return [date[0].subtract(7, "d"), date[1].subtract(7, "d")];
                  }
                  return [
                    moment(_date)
                      .week(moment(_date).week() - 1)
                      .startOf("week"),
                    moment(_date)
                      .week(moment(_date).week() - 1)
                      .endOf("week")
                  ];
                },
                下周: () => {
                  /** 判断是否是一周 */
                  let weeks = date[0].week();
                  if (
                    date[0].format("YYYY-MM-DD") ==
                    date[0].startOf("week").format("YYYY-MM-DD") ||
                    date[1].format("YYYY-MM-DD") ==
                    date[0].endOf("week").format("YYYY-MM-DD")
                  ) {
                    return [date[0].add(7, "d"), date[1].add(7, "d")];
                  }
                  return [
                    moment()
                      .week(moment().week() + 1)
                      .startOf("week"),
                    moment()
                      .week(moment().week() + 1)
                      .endOf("week")
                  ];
                },
                本月: [moment().startOf("month"), moment().endOf("month")],
                上月: [
                  moment()
                    .month(moment().month() - 1)
                    .startOf("month"),
                  moment()
                    .month(moment().month() - 1)
                    .endOf("month")
                ],
                下月: [
                  moment()
                    .month(moment().month() + 1)
                    .startOf("month"),
                  moment()
                    .month(moment().month() + 1)
                    .endOf("month")
                ]
              }}
              style={{ width: 220 }}
              value={date}
              onChange={dateChange}
              allowClear={false}
            />
          </div>
        </div>
        <div className="item">
          <div className="label">科室：</div>
          <div className="content">
            <DeptSelect onChange={handleChange} style={{ width: 160 }} />
          </div>
        </div>
        <div className="item">
          <div className="label">分组：</div>
          <div className="content">
            <Select
              value={selectViewModal.params.group}
              onChange={handleGroupChange}
              showSearch
              style={{ width: 100 }}
            >
              <Select.Option key="全部" value="">
                全部
              </Select.Option>
              {selectViewModal.params.groupList.map((item: any) => (
                <Select.Option value={item.id} key={item.id}>
                  {item.groupName}
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>
        <div className="item">
          <Button
            type="primary"
            onClick={() => sheetViewModal.getSheetTableData()}
            className="statistics"
          >
            查询
          </Button>
        </div>
        {authStore.isRoleManage && (
          <div className="item">
            <Button
              className="statistics"
              onClick={() => {
                appStore.history.push(`/personnelManagement/EditArrangePage`);
              }}
            >
              编辑排班
            </Button>
          </div>
        )}

        <div className="item">
          <Button className="statistics getExcel" onClick={exportExcel}>
            导出科室
          </Button>
        </div>
        {appStore.HOSPITAL_ID == "nys" &&
          (authStore.isDepartment || authStore.isSupervisorNurse) && (
            <div className="item export">
              <Select
                style={{ width: '160px' }}
                mode="multiple"
                maxTagCount={0}
                allowClear={true}
                showSearch
                placeholder='选择批量导出科室'
                filterOption={(input: any, option: any) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
                onChange={(val: any[]) => {
                  sheetViewModal.deptCodeList = val
                }}
                value={sheetViewModal.deptCodeList}
              >
                {sheetViewModal.deptList.map((item: any) => (
                  <Select.Option value={item.code} key={item.name}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
              <span onClick={() => handleExport()}>批量导出</span>
            </div>
          )}
        {appStore.HOSPITAL_ID == "wh" &&
          (authStore.isDepartment || authStore.isSupervisorNurse) && (
            <div className="item">
              <Dropdown.Button
                className="statistics getExcel"
                overlay={bigDeptmenu}
              >
                导出片区
              </Dropdown.Button>
            </div>
          )}
        {appStore.HOSPITAL_ID == "wh" && (
          <div className="item">
            <Button
              className="item"
              onClick={() => showStandardTimeModal.show()}
            >
              标准工时
            </Button>
          </div>
        )}

        {(
          appStore.HOSPITAL_ID == "hj" ||
          appStore.HOSPITAL_ID == "nys"
        ) && (
            <div className="item">
              <Button
                className="statistics getExcel"
                disabled={sheetViewModal.tableLoading}
                onClick={toPrint}
              >
                打印
            </Button>
            </div>
          )}
      </LeftIcon>
      {/* <RightIcon>
        <span onClick={() => toPath('/personnelManagement/DeptBorrow')}>科室借用</span>
        <span> | </span>
        <span onClick={() => toPath('/personnelManagement/personnelSetting')}>人员分组</span>
        <span> | </span>
        <span onClick={() => toPath('/personnelManagement/nurseSetting')}>排班人员设置</span>
        <span> | </span>
        <span onClick={() => toPath('/personnelManagement/ShiftSettingView')}>班次设置</span>
        <span> | </span>
        <span onClick={() => toPath('/personnelManagement/mealSetting')}>排班套餐设置</span>
      </RightIcon> */}
      <showStandardTimeModal.Component />
    </Wrapper >
  );
});

const Wrapper = styled.div`
  height: 40px;
  padding-top: 15px;
  box-sizing: border-box;
  background: #fff;
  /* border-bottom: 1px solid #ccc; */
  .item {
    display: inline-block;
    margin-right: 10px;
    vertical-align: middle;
    & > div {
      display: inline-block;
      vertical-align: middle;
    }
  }
  .ant-select-selection--multiple {
      min-height: 30px !important;
    }

  .export {
    .ant-select-selection {
        border-radius: 4px 0 0 4px !important;
        padding-bottom: 0 !important;
        margin-top: -3px !important;
      }
    & > span {
      border: 1px solid #d9d9d9;
      border-left: none !important;
      border-radius: 0 4px 4px 0;
      display: inline-block;
      height: 30px;
      line-height: 30px;
      font-size: 13px;
      padding: 0 5px;
      & :hover {
        cursor:pointer;
      }
    }
  }
`;
const LeftIcon = styled.div`
  float: left;
  font-size: 13px;
  .getExcel {
    margin-right: 0;
  }
  .data {
    margin-left: 10px;
  }
  button,
  select,
  .ant-calendar-picker,
  .ant-input,
  .ant-select,
  .ant-select-selection--single {
    height: 28px;
  }
  .ant-select-selection__rendered {
    line-height: 27px;
  }
  .ant-input {
    line-height: 1.3;
  }
`;

const RightIcon = styled.div`
  float: right;
  font-size: 13px;
  height: 32px;
  vertical-align: middle;
  margin-top: 5px;
  margin-right: 5px;
  span {
    cursor: pointer;
    color: #00a680;
  }
`;
