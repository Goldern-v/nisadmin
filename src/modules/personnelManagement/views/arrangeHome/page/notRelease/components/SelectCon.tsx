import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { notSelectViewModal } from "./SelectViewModal";
import { observer } from "mobx-react-lite";
import {
  DatePicker,
  Button,
  message,
} from "src/vendors/antd";
import { fileDownload } from "src/utils/file/file";
import { appStore, authStore } from "src/stores";
import DeptSelect from "src/components/DeptSelect";
import moment from "moment";
import { arrangeService } from "../../../services/ArrangeService";
import { notArrangeService } from "../../../services/notReleaseService";
import { sheetViewModal } from "../../../viewModal/SheetViewModal";
import service from "src/services/api";
import createModal from "src/libs/createModal";
import ShowStandardTimeModal from "../../../modal/ShowStandardTimeModal";

export interface Props {
}

export default observer(function SelectCon() {
  const [isInit, setIsInit] = useState(true);
  const [bigDeptList, setBigDeptList] = useState([]);
  const [date, setDate]: any = useState(() => {
    if (notSelectViewModal.params.startTime && notSelectViewModal.params.endTime) {
      return [
        moment(notSelectViewModal.params.startTime),
        moment(notSelectViewModal.params.endTime)
      ];
    } else {
      return [];
    }
  });
  const [deptCode, setDeptCode] = useState()
  const [modalVisible, setModalVisible] = useState(false)
  const [modalData, setModalData]: any[] = useState([])

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
      notSelectViewModal.setParams(
        "startTime",
        moment(dates[0]._d).format("YYYY-MM-DD")
      );
      notSelectViewModal.setParams(
        "endTime",
        moment(dates[1]._d).format("YYYY-MM-DD")
      );
    }
  };

  // 科室
  const handleChange = (value: any) => {
    setDeptCode(value);
    notSelectViewModal.setParams("deptCode", value);
    let obj = {
      deptCode: value
    };
    arrangeService.getByDeptCode(obj).then(res => {
      notSelectViewModal.params.groupList = res.data;
    });
  };

  // 导出排班Excel
  const exportRosterExcel = () => {
    let status = appStore.HOSPITAL_ID === "lcey"
    notArrangeService.exportRoster().then(res => {
      fileDownload(res);
    });
  };

  let handleStatusChange = () => {
    setDate([
      moment(getMonday(), "YYYY-MM-DD"),
      moment(getSunday(), "YYYY-MM-DD")
    ]);
    notSelectViewModal.setParams(
      "startTime",
      moment(getMonday(), "YYYY-MM-DD").format("YYYY-MM-DD")
    );
    notSelectViewModal.setParams(
      "endTime",
      moment(getSunday(), "YYYY-MM-DD").format("YYYY-MM-DD")
    );
    notSelectViewModal.setParams("group", "");
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
            <DeptSelect hasAllDept={true} onChange={handleChange} style={{ width: 160 }} />
          </div>
        </div>
        <div className="item">
          <Button
            type="primary"
            onClick={() => sheetViewModal.getData()}
            className="statistics"
          >
            查询
          </Button>
        </div>

        <React.Fragment>
          <div className="item">
            <Button className="statistics getExcel" onClick={exportRosterExcel}>
              导出排班
            </Button>
          </div>
        </React.Fragment>
      </LeftIcon>
      <showStandardTimeModal.Component />
    </Wrapper>
  );
});

const Wrapper = styled.div`
  height: 50px;
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
